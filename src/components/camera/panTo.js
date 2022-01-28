class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("map", "assets/camera/earthbound-scarab.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1024, 2048)

    this.add.image(0, 0, "map").setOrigin(0)

    this.cameras.main.setZoom(4)
    this.cameras.main.centerOn(0, 0) // 中心设置到(0,0)

    console.log(this.cameras.main.getScroll(767, 1096))
    this.text = this.add.text(this.center.x, this.center.y).setOrigin(0.5).setText("click to move").setScrollFactor(0)

    this.text.setShadow(1, 1, "#000000", 2)

    let pos = 0
    this.input.on(
      "pointerdown",
      function () {
        const cam = this.cameras.main
        if (pos === 0) {
          cam.pan(767, 1096, 2000, "Power2")
          pos++
        } else if (pos === 1) {
          cam.pan(703, 1621, 2000, "Elastic")
          pos++
        } else if (pos === 2) {
          cam.pan(256, 623, 2000, "Sine.easeInOut")
          pos++
        } else if (pos === 3) {
          cam.pan(166, 304, 2000)
          pos++
        } else if (pos === 4) {
          cam.pan(624, 158, 2000)
          pos++
        } else if (pos === 5) {
          cam.pan(680, 330, 2000)
          pos++
        } else if (pos === 6) {
          cam.pan(748, 488, 2000)
          pos++
        } else if (pos === 7) {
          cam.pan(1003, 1719, 2000)
          pos = 0
        }
      },
      this
    )
  }

  update() {
    const cam = this.cameras.main
    this.text.setText(["click to move", "x: " + cam.scrollX, "y: " + cam.scrollY])
  }
}

export default Example
