cont
<template>
  <div class="title" @touchmove.prevent>{{ text }}</div>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas" id="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as Phaser from 'Phaser'
import CanvasPlugin from 'phaser3-rex-plugins/plugins/canvas-plugin.js'
import DrawingPad from '../../components/drawingPad/drawingPad2.js'

let myCanvas = ref(null)
let canvasBox = ref(null)
let game
let text = ref('')
let texture

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
    render: {
      antialias: true, // 抗锯齿
      transparent: true, // 背景透明
      // batchSize: 1024,
    },
    // canvasStyle: 'overflow:hidden;', // canvas的行内样式
    scale: {
      mode: Phaser.Scale.FIT, // 自适应

      parent: myCanvas.value,
      autoCenter: Phaser.Scale.BOTH, // 自动居中
      width: window.innerWidth,
      height: window.innerHeight,
      // max: {
      //   // 指定适配后的最大尺寸，这里限制一下，在pc端会美观一点(不会出现尺寸特别大的情况)
      //   width: 1080,
      //   height: 1920,
      // },
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
    scene: [DrawingPad], // 初始化完成后，默认加载第一个scene
    pixelArt: true, //将 antialias 设置为 false 并将 roundPixels 设置为 true。 这是像素艺术游戏的最佳设置
    roundPixels: true,
    audio: {
      // 音频配置对象
      // disableWebAudio: false,
      // noAudio: false, // if this is true, it works, with audio enabled it fails
    },
    physics: {
      // default: 'matter',
      // matter: {
      //   debug: true,
      //   gravity: {
      //     y: 0.3,
      //   },
      // },
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    input: {
      // mouse: false, // 移动端项目一般关掉mouse，不然会出点透bug
      activePointers: 1, // 多指触摸限制
    },
    disableContextMenu: true, // 禁用鼠标右键菜单
    loader: {
      crossOrigin: 'anonymous', // 避免图片跨域
    },
    plugins: {
      global: [
        {
          key: 'rexCanvasPlugin',
          plugin: CanvasPlugin,
          start: true,
        },
      ],
    },
  }

  game = new Phaser.Game(config)
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
