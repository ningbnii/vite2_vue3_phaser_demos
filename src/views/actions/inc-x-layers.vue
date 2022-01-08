<template>
  <div class="canvas_box" ref="canvasBox">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as Phaser from "Phaser";

import Example from "../../components/actions/incXLayers.js";

let myCanvas = ref(null);
let canvasBox = ref(null);

onMounted(() => {
  let config = {
    type: Phaser.AUTO,
    width: canvasBox.value.clientWidth,
    height: canvasBox.value.clientHeight,
    parent: myCanvas.value,
    backgroundColor: "#2d2d2d",
    scene: [Example],
  };
  const game = new Phaser.Game(config);
});
</script>
<style lang="less" scoped>
.canvas_box {
  width: 100vw;
  height: 100vh;
}
</style>
