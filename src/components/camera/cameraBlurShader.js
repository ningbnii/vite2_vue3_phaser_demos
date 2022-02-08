class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("volcano", "assets/pics/bw-face.png")
    this.load.image("hotdog", "assets/sprites/hotdog.png")
  }

  create() {
    const volcano = this.add.image(400, 300, "volcano").setAlpha(0.5)
    const hotdog = this.add.image(400, 300, "hotdog").setScrollFactor(0)

    let cam = this.cameras.main

    // WebGL管道
    this.blurPipeline = this.renderer.pipelines.getPostPipeline("BlurPostFX")
    cam.setPostPipeline("BlurPostFX")

    const extracam = this.cameras.add()
    this.cameras.main.ignore(hotdog)
    extracam.ignore(volcano)
  }

  update() {
    // const r = Math.abs(2 * Math.sin(this.time.now * 10))
    // this.blurPipeline.set1f("radius", 1000)
  }
}

export default Example
