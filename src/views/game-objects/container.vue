cont
<template>
  <div class="title" @touchmove.prevent>{{ text }}</div>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as Phaser from 'Phaser'

import { SceneA, SceneC, SceneB } from '../../components/game-objects/container'

let myCanvas = ref(null)
let canvasBox = ref(null)
let game
let sceneA, sceneC, sceneB
let text = ref('')

onMounted(() => {
  // This is revert of https://github.com/photonstorm/phaser/commit/7cbf3840af296c2f1f510be15b39a2519f7a72cf
  // If remove below, safari doesn't play sounds
  Phaser.Scenes.SceneManager.prototype.loadComplete = function (loader) {
    const scene = loader.scene
    if (this.game.sound && this.game.sound.onBlurPausedSounds) {
      this.game.sound.unlock()
    }
    this.create(scene)
  }

  sceneA = new SceneA()
  sceneC = new SceneC()
  sceneB = new SceneB()

  // console.log(exampleScene.sprite)
  // overlayScene = new Overlay()

  let config = {
    type: Phaser.AUTO,
    scale: {
      // mode: Phaser.DOM.FIT, // 自适应
      parent: myCanvas.value,
      autoCenter: Phaser.DOM.CENTER_BOTH, // 自动居中
      width: 800,
      height: 600,
    },
    // 渲染之前清除
    // clearBeforeRender: false,
    // 显示到console中
    title: 'shock and awesome',
    url: 'http://wxbuluo.com',
    version: '1.2b',
    // banner: {
    //   text: "#ffffff",
    //   background: ["#fff200", "#38f0e8", "#00bff3", "#ec008c"],
    //   hidePhaser: true,
    // },
    banner: false,
    backgroundColor: '#2d2d2d',
    // transparent: true, // 透明，backgroundColor失效
    scene: {
      create: create,
      update: update,
    },
    pixelArt: true, //将 antialias 设置为 false 并将 roundPixels 设置为 true。 这是像素艺术游戏的最佳设置
    roundPixels: true,
    audio: {
      // 音频配置对象
      // disableWebAudio: false,
      // noAudio: false, // if this is true, it works, with audio enabled it fails
    },
    physics: {
      default: 'matter',
      matter: {
        debug: true,
        gravity: {
          y: 0.3,
        },
      },
    },
  }
  var Point = function (x, y, time) {
    this.x = x
    this.y = y
    this.time = time
  }

  var normalizeValue = function (value, min, max) {
    return (value - min) / (max - min)
  }
  var linearInterpolation = function (norm, min, max) {
    return (max - min) * norm + min
  }

  var trail
  var points = []
  var head = { x: 0, y: 0 }

  game = new Phaser.Game(config)

  function create() {
    trail = this.add.graphics()
    this.input.on('pointermove', (pointer) => {
      head.x = pointer.x
      head.y = pointer.y
      points.push(new Point(head.x, head.y, 4))
    })
  }

  function update() {
    trail.clear()

    // 为什么要大于4个点
    // 因为要收尾，收尾效果用到了4个点
    if (points.length > 4) {
      trail.lineStyle(1, 0xffff00, 1)
      trail.beginPath()
      trail.lineStyle(0, 0xffff00, 1)
      // 移动到第一个点的位置
      trail.moveTo(points[0].x, points[0].y)

      // 从第二个点开始，一直到倒数第4个点停止
      for (let index = 1; index < points.length - 4; ++index) {
        var point = points[index]

        // 计算线条宽度，通过一个线性差值算法
        // 透明度0.5
        trail.lineStyle(linearInterpolation(index / (points.length - 4), 0, 20), ((0xff & 0x0ff) << 16) | ((((linearInterpolation(index / points.length, 0x00, 0xff) | 0) & 0x0ff) << 8) | (0x00 & 0x0ff)), 0.5)
        trail.lineTo(point.x, point.y)
      }
      var count = 0
      // 剩下的4个点，收尾轨迹
      for (let index = points.length - 4; index < points.length; ++index) {
        var point = points[index]
        // console.log(linearInterpolation(count++ / 4, 20, 0))
        trail.lineStyle(linearInterpolation(count++ / 4, 20, 0), ((0xff & 0x0ff) << 16) | ((((linearInterpolation(index / points.length, 0x00, 0xff) | 0) & 0x0ff) << 8) | (0x00 & 0xff)), 1.0)
        trail.lineTo(point.x, point.y)
      }

      trail.strokePath()
      trail.closePath()
    }
    for (var index = 0; index < points.length; ++index) {
      var point = points[index]

      // 控制线显示的长度，这个值越小，显示的长度会越长
      point.time -= 0.5
      if (point.time <= 0) {
        // 移除该点
        points.splice(index, 1)
        index -= 1
      }
    }
  }
})

onUnmounted(() => {
  game.destroy(true)
})

function changeText(value) {
  text.value = value
}
</script>
<style lang="less" scoped>
.canvas_box {
  width: 100vw;
  height: 100vh;
}
.title {
  color: #00ff00;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
