import dat from "dat.gui"
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
    this.load.image("pic", "assets/pics/a-new-link-to-the-past-by-ptimm.jpeg")
    this.load.image("logo", "assets/sprites/phaser3-logo.png")
  }

  create() {
    this.add.image(0, 0, "pic").setOrigin(0)

    const logo = this.add.image(this.center.x, 200, "logo").setVisible(false)

    // let's show the logo when the camera shakes, and hide it when it completes
    this.cameras.main.on("camerashakestart", function () {
      logo.setVisible(true)
    })

    this.cameras.main.on("camerashakecomplete", function () {
      logo.setVisible(false)
    })

    this.input.on(
      "pointerdown",
      function () {
        this.cameras.main.shake(500)
      },
      this
    )
  }
}

export default Example
