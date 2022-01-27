import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.iter = 0 // 迭代器
  }

  preload() {
    this.load.image("pic", "assets/pics/lazur-skkaay3.png")
  }

  create() {
    this.add.image(0, 200, "pic").setOrigin(0)

    // set the camera bounds to be the size of the image
    // in this case we can scroll horizontally,but not vertically
    this.cameras.main.setBounds(0, 0, 1280, 200)

    // camera controls
    const cursors = this.input.keyboard.createCursorKeys()
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
