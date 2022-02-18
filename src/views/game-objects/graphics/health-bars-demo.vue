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

import { GreenElf, BlueElf } from '../../../components/game-objects/graphics/health-bars-demo'

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
      preload: preload,
      create: create,
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
  var blues = []
  var greens = []

  var bluesAlive = 4
  var greensAlive = 4
  game = new Phaser.Game(config)

  function preload() {
    this.load.image('background', 'assets/pics/fairy-background-craft-pixel.png')
    this.load.atlas('elves', 'assets/animations/elves-craft-pixel.png', 'assets/animations/elves-craft-pixel.json')
  }

  function create() {
    this.anims.create({ key: 'greenIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'green_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 })
    this.anims.create({ key: 'blueIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 })

    this.anims.create({ key: 'greenAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'green_attack_', start: 0, end: 5 }), frameRate: 10 })
    this.anims.create({ key: 'blueAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_attack_', start: 0, end: 4 }), frameRate: 10 })

    this.anims.create({ key: 'greenDead', frames: this.anims.generateFrameNames('elves', { prefix: 'green_die_', start: 0, end: 4 }), frameRate: 6 })
    this.anims.create({ key: 'blueDead', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_die_', start: 0, end: 4 }), frameRate: 6 })
    this.add.image(0, 0, 'background').setOrigin(0)

    blues.push(new BlueElf(this, 120, 476))
    blues.push(new BlueElf(this, 220, 480))
    blues.push(new BlueElf(this, 320, 484))
    blues.push(new BlueElf(this, 440, 480))

    greens.push(new GreenElf(this, 560, 486))
    greens.push(new GreenElf(this, 670, 488))
    greens.push(new GreenElf(this, 780, 485))
    greens.push(new GreenElf(this, 890, 484))
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
