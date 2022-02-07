class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("volcano", "assets/pics/the-end-by-iloe-and-made.jpeg")
    this.load.image("hotdog", "assets/sprites/hotdog.png")
  }

  create() {
    this.add.image(400, 300, "volcano")

    // setScrollFactor(0) 不跟随相机滚动，相对于视口是固定的
    this.add.image(400, 300, "hotdog").setScrollFactor(0)
    var cursors = this.input.keyboard.createCursorKeys()

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    // 控制相机移动
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
