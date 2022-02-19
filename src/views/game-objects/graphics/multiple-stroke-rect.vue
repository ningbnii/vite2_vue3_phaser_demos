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

let myCanvas = ref(null)
let canvasBox = ref(null)
let game
let sceneA
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

  game = new Phaser.Game(config)
  var start
  var hsv
  var graphics
  var size = 64 * 2
  var historyX = Array(size)
  var historyY = Array(size)
  var index = 0
  function create() {
    graphics = this.add.graphics()

    start = new Phaser.Geom.Point(400, 100)
    var top = new Phaser.Geom.Point(400, 100)
    var left = new Phaser.Geom.Point(100, 300)
    var right = new Phaser.Geom.Point(700, 300)
    var bottom = new Phaser.Geom.Point(400, 500)

    hsv = Phaser.Display.Color.HSVColorWheel()

    this.tweens.timeline({
      targets: start,
      loop: -1,
      duration: 2000,
      tweens: [
        { x: left.x, y: left.y, ease: 'Sine.easeOut' },
        { x: bottom.x, y: bottom.y, ease: 'Sine.easeInOut' },
        { x: right.x, y: right.y, ease: 'Sine.easeInOut' },
        { x: top.x, y: top.y, ease: 'Sine.easeIn' },
      ],
    })
    //  Fill the history array
    for (var i = 0; i < size; i++) {
      historyX[i] = start.x
      historyY[i] = start.y
    }
  }

  function update() {
    historyX[index] = start.x
    historyY[index] = start.y

    index++

    if (index === size) {
      index = 0
    }

    graphics.clear()

    for (var i = 0; i < 64; i++) {
      graphics.fillStyle(hsv[i * 2].color, 1)
      graphics.fillCircle(historyX[i * 2], historyY[i * 2], 64)
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
