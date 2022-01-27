class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("bg", "assets/pics/uv-grid-diag.png")
    this.load.image("block", "assets/sprites/block.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1024 * 2, 1024 * 2)
    this.add.image(0, 0, "bg").setOrigin(0)
    this.add.image(1024, 0, "bg").setOrigin(0)
    this.add.image(0, 1024, "bg").setOrigin(0)
    this.add.image(1024, 1024, "bg").setOrigin(0)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys = this.input.keyboard.addKeys("W,A,S,D")

    // 中心点设置到相机窗口范围的中心
    this.cameras.main.centerToBounds()

    this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor("#ffffff")
  }

  update() {
    const cam = this.cameras.main

    this.text.setText(["ScrollX: " + cam.scrollX, "ScrollY: " + cam.scrollY, "MidX: " + cam.midPoint.x, "MidY: " + cam.midPoint.y])

    if (this.keys.A.isDown) {
      cam.scrollX -= 6
    } else if (this.keys.D.isDown) {
      cam.scrollX += 6
    } else if (this.keys.W.isDown) {
      cam.scrollY -= 6
    } else if (this.keys.S.isDown) {
      cam.scrollY += 6
    }

    if (this.cursors.left.isDown) {
      cam.rotation -= 0.01
    } else if (this.cursors.right.isDown) {
      cam.rotation += 0.01
    }
  }
}

export default Example
