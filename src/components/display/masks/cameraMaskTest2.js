class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    const shape = this.make.graphics()

    shape.fillStyle(0xffffff)
    // 将给定的角度从度数转换为等效的弧度角。
    shape.slice(400, 300, 200, Phaser.Math.DegToRad(340), Phaser.Math.DegToRad(30), true)
    shape.fillPath()

    // 创建一个几何形状的遮罩蒙版
    const mask = shape.createGeometryMask()

    this.cameras.main.setMask(mask)

    const worldWidth = 1600
    const worldHeight = 1200
    // 设置物理世界的边界
    this.matter.world.setBounds(0, 0, worldWidth, worldHeight)

    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, worldWidth)
      const y = Phaser.Math.Between(0, worldHeight)

      if (Math.random() < 0.7) {
        const sides = Phaser.Math.Between(3, 14)
        const radius = Phaser.Math.Between(8, 50)

        this.matter.add.polygon(x, y, sides, radius, { restitution: 0.9 })
      } else {
        const width = Phaser.Math.Between(16, 128)
        const height = Phaser.Math.Between(8, 64)

        this.matter.add.rectangle(x, y, width, height, { restitution: 0.9 })
      }
    }

    this.matter.add.mouseSpring()

    const cursors = this.input.keyboard.createCursorKeys()

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

    this.input.keyboard.on(
      "keydown-Z",
      function (event) {
        this.cameras.main.rotation += 0.01
      },
      this
    )

    this.input.keyboard.on(
      "keydown-X",
      function (event) {
        this.cameras.main.rotation -= 0.01
      },
      this
    )
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
