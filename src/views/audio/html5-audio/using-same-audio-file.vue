<template>
  <div class="title" @touchmove.prevent>{{ text }}</div>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import * as Phaser from "Phaser"

import Example from "../../../components/audio/html5-audio/usingSameAudioFile"

let myCanvas = ref(null)
let canvasBox = ref(null)
let game
let exampleScene
let text = ref("")

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
  exampleScene = new Example(canvasBox.value.clientWidth, canvasBox.value.clientHeight)
  let config = {
    type: Phaser.AUTO,
    width: canvasBox.value.clientWidth,
    height: canvasBox.value.clientHeight,
    parent: myCanvas.value,
    backgroundColor: "#2d2d2d",
    scene: [exampleScene],
    pixelArt: true, //将 antialias 设置为 false 并将 roundPixels 设置为 true。 这是像素艺术游戏的最佳设置
    audio: {
      // 音频配置对象
      disableWebAudio: true,
      // noAudio: false, // if this is true, it works, with audio enabled it fails
    },
  }
  game = new Phaser.Game(config)
})

onUnmounted(() => {
  for (let key in game.scene.keys) {
    if (game.scene.keys.hasOwnProperty(key)) {
      game.scene.stop(key)
      game.scene.keys[key] = undefined
    }
  }
  // 暂停所有audio
  game.sound.stopAll()
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
