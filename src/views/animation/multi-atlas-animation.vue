<template>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as Phaser from 'Phaser'

import Example from '../../components/animation/multiAtlasAnimation'

let myCanvas = ref(null)
let canvasBox = ref(null)
let game

onMounted(() => {
  let exampleScene = new Example(canvasBox.value.clientWidth, canvasBox.value.clientHeight)
  let config = {
    type: Phaser.AUTO,
    width: canvasBox.value.clientWidth,
    height: canvasBox.value.clientHeight,
    parent: myCanvas.value,
    backgroundColor: '#2d2d2d',
    scene: [exampleScene],
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
})
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
