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
    // 设置相对于相机的滚动参数
    // 背景图随相机以1:1的比例滚动
    this.add.image(400, 300, "volcano")
    //一个精灵，以相机速度的一半滚动
    this.add.image(400, 300, "hotdog").setScrollFactor(0.5)
    // 一个精灵，以相机速度的四分之一滚动
    this.add.image(400, 300, "hotdog").setScrollFactor(0.25)
    // 一个精灵，不随相机滚动（固定在相机上）
    this.add.image(400, 300, "hotdog").setScrollFactor(0)

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
