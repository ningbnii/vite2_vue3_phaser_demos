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
    this.cameras.main.on("camerafadeoutstart", function (cam, fx, duration) {
      logo.setVisible(true)
    })

    // 监听闪烁完成状态
    this.cameras.main.on("camerafadeoutcomplete", function () {
      logo.setVisible(false)
    })
    this.input.on(
      "pointerdown",
      function () {
        // get a random color
        let red = Phaser.Math.Between(50, 255)
        let green = Phaser.Math.Between(50, 255)
        let blue = Phaser.Math.Between(50, 255)
        this.cameras.main.fade(2000, red, green, blue)
      },
      this
    )
  }
}

export default Example
