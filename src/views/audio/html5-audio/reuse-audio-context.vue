<template>
  <div class="title" @touchmove.prevent>{{ text }}</div>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import * as Phaser from "Phaser"

let myCanvas = ref(null)
let canvasBox = ref(null)
let game
let exampleScene
let text = ref("")
let center

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
  center = {
    x: canvasBox.value.clientWidth / 2,
    y: canvasBox.value.clientHeight / 2,
  }

  var audioContext
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  } catch (e) {
    console.error(e)
  }
  let config = {
    type: Phaser.AUTO,
    width: canvasBox.value.clientWidth,
    height: canvasBox.value.clientHeight,
    parent: myCanvas.value,
    backgroundColor: "#2d2d2d",
    scene: {
      preload: preload,
      create: create,
    },
    pixelArt: true, //将 antialias 设置为 false 并将 roundPixels 设置为 true。 这是像素艺术游戏的最佳设置
    audio: {
      // 音频配置对象
      disableWebAudio: true,
      context: audioContext,
      // noAudio: false, // if this is true, it works, with audio enabled it fails
    },
  }
  game = new Phaser.Game(config)

  function preload() {
    this.load.path = "assets/"
    this.load.spritesheet("explosion", "explosion.png", { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet("bomb", "xenon2_bomb.png", { frameWidth: 8, frameHeight: 16 })
    this.load.audio("explosion", ["audio/SoundEffects/explosion.mp3"])
  }

  function create() {
    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("bomb", { start: 0, end: 3, first: 3 }),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 23, first: 23 }),
      frameRate: 20,
    })

    var bomb = this.add.sprite(center.x, center.y, "bomb")
    bomb.setScale(6, -6)
    bomb.anims.play("rotate")

    this.input.once(
      "pointerdown",
      function () {
        bomb.visible = false
        bomb = this.add.sprite(center.x, center.y, "explosion")
        bomb.setScale(6)
        bomb.anims.play("explode")

        // 声音
        var explosion = this.sound.add("explosion", { volume: 0.5 })

        explosion.on(
          "complete",
          function (sound) {
            setTimeout(
              function () {
                this.sys.game.destroy(true)
                document.addEventListener("mousedown", function newGame() {
                  game = new Phaser.Game(config)
                  document.removeEventListener("mousedown", newGame)
                })
              }.bind(this)
            )
          },
          this
        )

        explosion.play()
      },
      this
    )
  }
})

onUnmounted(() => {
  // for (let key in game.scene.keys) {
  //   if (game.scene.keys.hasOwnProperty(key)) {
  //     game.scene.stop(key)
  //     game.scene.keys[key] = undefined
  //   }
  // }
  game.destroy(true)
  // // 暂停所有audio
  // game.sound.stopAll()
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
