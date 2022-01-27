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
    this.image = this.add.image(128, 64, "einstein")

    const hueRotatePipeline = this.renderer.pipelines.getPostPipeline("HueRotatePostFX")

    let cam = this.cameras.main
    cam.setSize(256, 128)
    cam.setPostPipeline(hueRotatePipeline)

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        cam = this.cameras.add(x * 256, y * 128, 256, 128)
        if (x % 2 == 1) {
          if (y % 2 == 0) {
            cam.setPostPipeline(hueRotatePipeline)
          }
        } else {
          if (y % 2 == 1) {
            cam.setPostPipeline(hueRotatePipeline)
          }
        }
      }
    }
  }

  update() {
    this.image.rotation += 0.01
  }
}

export default Example
