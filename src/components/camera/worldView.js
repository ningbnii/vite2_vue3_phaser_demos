import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("grid", "assets/camera/uv-grid-4096-ian-maclachlan.png")
  }

  create() {
    this.add.image(0, 0, "grid").setOrigin(0)

    let cursors = this.input.keyboard.createCursorKeys()
    let controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.02, // 加速度
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

    let cam = this.cameras.main
    cam.setBounds(0, 0, 4096, 4096).setZoom(1)
    this.gui = new dat.GUI()
    this.gui.addFolder("Camera")
    this.gui.add(cam.midPoint, "x").listen() // 中心点的坐标
    this.gui.add(cam.midPoint, "y").listen()
    this.gui.add(cam, "scrollX").listen()
    this.gui.add(cam, "scrollY").listen()
    this.gui.add(cam, "width").listen()
    this.gui.add(cam, "height").listen()
    this.gui.add(cam, "displayWidth").listen()
    this.gui.add(cam, "displayHeight").listen()
    this.gui.add(cam, "zoom").listen()
    this.gui.add(cam.worldView, "left").listen()
    this.gui.add(cam.worldView, "right").listen()
    this.gui.add(cam.worldView, "top").listen()
    this.gui.add(cam.worldView, "bottom").listen()
  }

  destroyGui() {
    this.gui.destroy()
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
