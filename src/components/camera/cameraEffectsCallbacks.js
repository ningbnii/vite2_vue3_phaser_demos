class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("CherilPerils", "assets/camera/CherilPerils.png")
  }

  create() {
    const image = this.add.image(0, 0, "CherilPerils")
    this.cameras.main.setViewport(5, 5, 390, 290)
    // 两个相机重叠了
    this.camera = this.cameras.add(5, 5, 390, 290)
    this.camera.flash(1000, 1, 1, 1, false, this.flashCallback)
  }

  flashCallback(cam = null, progress = 0) {
    if (progress === 1) {
      console.log("flash completed, starting shake effect")
      this.camera.shake(1000, 0.05, false, this.shakeCallback)
    }
  }

  shakeCallback(cam = null, progress = 0) {
    if (progress === 1) {
      console.log("shake completed,starting fade effect")
      this.camera.fade(1000, 0, 0, 0, false, this.fadeCallback)
    }
  }

  fadeCallback(cam = null, progress = 0) {
    if (progress === 1) {
      console.log("fade completed,end of example")
    }
  }
}

export default Example
