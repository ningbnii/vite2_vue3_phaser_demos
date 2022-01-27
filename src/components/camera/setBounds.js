class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("pic", "assets/pics/the-end-by-iloe-and-made.jpeg")
  }

  create() {
    this.add.image(0, 0, "pic").setOrigin(0)

    // 设置相机的边界为图片的尺寸
    this.cameras.main.setBounds(0, 0, 1920, 1080)

    // 键盘控制相机移动，移动端触屏如何控制移动？
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
