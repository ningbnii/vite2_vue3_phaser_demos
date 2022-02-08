import BendPostFX from "./BendPostFX"
import HueRotatePostFX from "./HueRotatePostFX"

class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    const pic = this.add.image(400, 300, "einstein")

    this.cameras.main.setPostPipeline(HueRotatePostFX)
    let shader = 1
    this.input.on(
      "pointerdown",
      function () {
        shader++
        if (shader === 0) {
          this.cameras.main.resetPostPipeline()
        } else if (shader === 1) {
          this.cameras.main.resetPostPipeline()
          this.cameras.main.setPostPipeline(HueRotatePostFX)
        } else if (shader === 2) {
          this.cameras.main.resetPostPipeline()
          this.cameras.main.setPostPipeline(BendPostFX)
        } else if (shader === 3) {
          this.cameras.main.resetPostPipeline()
          // 可以同时设置多个渲染效果
          this.cameras.main.setPostPipeline([BendPostFX, HueRotatePostFX])
          shader = -1
        }
      },
      this
    )

    // 匀速旋转360度
    this.tweens.add({
      targets: pic,
      angle: 360,
      ease: "Linear",
      duration: 6000,
      repeat: -1,
    })
  }
}

export default Example
