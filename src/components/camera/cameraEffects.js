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
    this.add.image(0, 0, "CherilPerils")

    // 设置相机的可视范围
    this.cameras.main.setViewport(5, 5, 390, 290)

    this.fadeCamera = this.cameras.add(405, 5, 390, 290)
    this.flashCamera = this.cameras.add(5, 305, 390, 290)
    this.shakeCamera = this.cameras.add(405, 305, 390, 290)

    // 淡出
    this.fadeCamera.fade(2000)
    // 闪烁
    this.flashCamera.flash(2000)
  }

  update() {
    this.flashCamera.flash(2000)
    // instensity 强度
    this.shakeCamera.shake(1000, 0.0025)
    if (this.fadeCamera.fadeEffect.alpha >= 1) {
      // 淡出，将alpha从0升到1，alpha=0，相机就又显示了
      this.fadeCamera.fadeEffect.alpha = 0
      // 循环淡出显示
      this.fadeCamera.fade(2000)
    }
  }
}

export default Example
