import HueRotatePostFX from "./HueRotatePostFX"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.moveStatus = false
  }

  preload() {
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    this.image = this.add.image(128, 256, "einstein")
    let cam = this.cameras.main

    // with shader
    // 设置相机的宽高
    cam.setSize(256, 512)
    cam.setPostPipeline(HueRotatePostFX)

    // no shader
    cam = this.cameras.add(256, 0, 256, 512)

    // with shader
    cam = this.cameras.add(512, 0, 256, 512)
    cam.setPostPipeline(HueRotatePostFX)

    // no shader
    cam = this.cameras.add(768, 0, 256, 512)
  }
}

export default Example
