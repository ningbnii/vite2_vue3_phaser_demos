class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("grid", "assets/pics/uv-grid-4096-ian-maclachlan.png")
  }

  create() {
    this.add.image(0, 0, "grid").setOrigin(0)

    this.cursors = this.input.keyboard.createCursorKeys()

    const controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      acceleration: 0.02,
      drag: 0.0005,
      maxSpeed: 1,
    }
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

    const cam = this.cameras.main
    cam.setBounds(0, 0, 4096, 4096)
    cam.setZoom(2)

    this.input.on("pointerdown", function (pointer) {
      let p = cam.getWorldPoint(pointer.x, pointer.y)
      // 世界坐标和缩放没有关系
      console.log(p)
      // pointer是相对与可视窗口的坐标系而言
      // getWorldPoint 是相对于camera而言
      console.log({ x: pointer.x, y: pointer.y })
    })
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
