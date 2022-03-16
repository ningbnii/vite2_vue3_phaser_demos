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
import AlloyFinger from 'alloyfinger'

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
    type: Phaser.CANVAS,
    render: {
      antialias: true, // 抗锯齿
      transparent: false, // 背景透明
      // batchSize: 1024,
    },
    // canvasStyle: 'overflow:hidden;', // canvas的行内样式
    scale: {
      mode: Phaser.Scale.FIT, // 自适应

      parent: myCanvas.value,
      autoCenter: Phaser.Scale.BOTH, // 自动居中
      width: window.innerWidth,
      height: window.innerHeight,
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
    }, // 初始化完成后，默认加载第一个scene
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
  }

  game = new Phaser.Game(config)

  var Trig = {
    distanceBetween2Points: function (point1, point2) {
      var dx = point2.x - point1.x
      var dy = point2.y - point1.y
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    },

    angleBetween2Points: function (point1, point2) {
      var dx = point2.x - point1.x
      var dy = point2.y - point1.y
      return Math.atan2(dx, dy)
    },
  }

  function create() {
    let shape = new annie.Shape()
    shape.beginFill('#ff0000')
    shape.drawCircle(0, 0, 30)
    shape.endFill()

    texture = this.textures.createCanvas(
      'gradient',
      this.cameras.main.width,
      this.cameras.main.height
    )

    //  We can access the underlying Canvas context like this:
    // var grd = texture.context.createLinearGradient(0, 0, 0, 256)

    // grd.addColorStop(0, '#8ED6FF')
    // grd.addColorStop(1, '#004CB3')
    let ctx = texture.context

    ctx.fillStyle = 'white'
    ctx.fillRect(
      0,
      (this.cameras.main.height - this.cameras.main.width) / 2,
      this.cameras.main.width,
      this.cameras.main.width
    )
    // ctx.stroke()

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh()

    this.add.image(0, 0, 'gradient').setOrigin(0)

    this.input.addPointer(3)

    new AlloyFinger(texture, {
      rotate: function (evt) {
        this.cameras.main.rotation += evt.angle
      },
    })

    // let temp1 = {}
    // let temp2 = {}
    // this.input.on('pointerdown', (pointer, gameObject) => {
    //   if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
    //     temp1 = {
    //       x: this.input.pointer1.worldX,
    //       y: this.input.pointer1.worldY,
    //     }
    //     temp2 = {
    //       x: this.input.pointer2.worldX,
    //       y: this.input.pointer2.worldY,
    //     }
    //   }
    // })

    // this.input.on('pointermove', () => {
    //   let newPoint1 = {
    //     x: this.input.pointer1.worldX,
    //     y: this.input.pointer1.worldY,
    //   }
    //   let newPoint2 = {
    //     x: this.input.pointer2.worldX,
    //     y: this.input.pointer2.worldY,
    //   }
    //   let res1 = (newPoint1.x - temp1.x) * (newPoint2.x - temp2.x)
    //   let res2 = (newPoint1.y - temp1.y) * (newPoint2.y - temp2.y)

    //   let angle1 = Trig.angleBetween2Points(temp1, temp2)
    //   let angle2 = Trig.angleBetween2Points(newPoint1, newPoint2)

    //   let angle =
    //     (angle2.toFixed(2) * 180) / Math.PI -
    //     (angle1.toFixed(2) * 180) / Math.PI

    //   if (res1 < 1000 || res2 < 1000) {
    //     if (res1 > 0 || res2 > 0) {
    //       // 移动
    //       let offsetX = newPoint1.x - temp1.x
    //       let offsetY = newPoint1.y - temp1.y
    //       this.cameras.main.x += offsetX
    //       this.cameras.main.y += offsetY
    //     }

    //     if (res1 <= 0 || res2 <= 0) {
    //       this.cameras.main.zoom += 0.1
    //     }
    //   }
    // })

    // this.input.on('pointerup', () => {
    //   temp1 = {}
    //   temp2 = {}
    // })
  }

  function update() {}
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
