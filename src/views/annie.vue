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
      // activePointers: 1, // 多指触摸限制
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

    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 6
    // ctx.fillRect(0, (this.cameras.main.height - this.cameras.main.width) / 2, this.cameras.main.width, this.cameras.main.width)
    ctx.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    // ctx.stroke()

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh()

    let img = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'gradient'
      )
      .setInteractive({ draggable: true })

    this.input.addPointer(1)
    let temp1 = {}
    let temp2 = {}

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        img.x = dragX
        img.y = dragY
      }
    })

    this.input.on('pointerdown', (pointer) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        temp1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        temp2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }
      } else {
        ctx.beginPath()

        ctx.moveTo(pointer.x, pointer.y)
      }
    })

    this.input.on('pointermove', (pointer, localX, localY, event) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        let newPoint1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        let newPoint2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }

        let preLen = Phaser.Math.Distance.Between(
          temp1.x,
          temp1.y,
          temp2.x,
          temp2.y
        )
        let newLen = Phaser.Math.Distance.Between(
          newPoint1.x,
          newPoint1.y,
          newPoint2.x,
          newPoint2.y
        )

        img.scale *= newLen / preLen
        let rad1 = Phaser.Math.Angle.BetweenPoints(temp1, temp2)
        let deg1 = Phaser.Math.RadToDeg(rad1)
        let rad2 = Phaser.Math.Angle.BetweenPoints(newPoint1, newPoint2)
        let deg2 = Phaser.Math.RadToDeg(rad2)
        let deg = Phaser.Math.Angle.ShortestBetween(deg1, deg2)
        let angle = Phaser.Math.DegToRad(deg)
        img.rotation += angle

        temp1 = newPoint1
        temp2 = newPoint2
      } else {
        ctx.lineTo(pointer.x, pointer.y)
        ctx.stroke()
      }
    })

    this.input.on('pointerup', () => {
      if (!this.input.pointer1.isDown && !this.input.pointer2.isDown) {
        temp1 = {}
        temp2 = {}
      } else {
        ctx.closePath()
      }
    })
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
