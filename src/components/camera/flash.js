class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("pic", "assets/pics/a-new-link-to-the-past-by-ptimm.jpeg")
    this.load.image("logo", "assets/sprites/phaser3-logo.png")
  }

  create() {
    this.add.image(400, 300, "pic")

    const logo = this.add.image(400, 200, "logo").setVisible(false)

    // 监听闪烁开始状态
    this.cameras.main.on("cameraflashstart", function (cam, fx, duration) {
      logo.setVisible(true)
    })

    // 监听闪烁完成状态
    this.cameras.main.on("cameraflashcomplete", function () {
      logo.setVisible(false)
    })
    this.input.on(
      "pointerdown",
      function () {
        // 画面闪烁
        // flash 通过立即将其设置为给定颜色来闪烁相机，然后在指定的持续时间内再次快速消失。
        this.cameras.main.flash(2000, 123)
      },
      this
    )
  }
}

export default Example
