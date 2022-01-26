import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.hitShape = null
  }

  preload() {
    this.load.image("eye", "assets/pics/lance-overdose-loader-eye.png")
    this.sprites = []
  }

  create() {
    this.graphics = this.add.graphics()

    this.bounds = new Phaser.Geom.Rectangle(0, 0, 1600, 1200)
    this.rect1 = new Phaser.Geom.Rectangle(200, 200, 600, 100)
    this.rect2 = new Phaser.Geom.Rectangle(1010, 800, 60, 300)
    this.circle1 = new Phaser.Geom.Circle(1200, 200, 160)
    this.circle2 = new Phaser.Geom.Circle(400, 900, 80)
    this.triangle1 = new Phaser.Geom.Triangle.BuildEquilateral(800, 500, 200)

    this.drawScene()

    for (let i = 0; i < 32; i++) {
      let x = Phaser.Math.Between(this.bounds.left, this.bounds.right)
      let y = Phaser.Math.Between(this.bounds.top, this.bounds.bottom)

      this.sprites.push(this.add.sprite(x, y, "eye").setInteractive())
    }

    this.input.on("gameobjectover", function (pointer, gameObject) {
      gameObject.setTint(0xff0000) // 叠加颜色
    })

    this.input.on("gameobjectout", function (pointer, gameObject) {
      gameObject.clearTint() // 清除叠加
    })

    this.input.on(
      "pointermove",
      function (pointer) {
        const p = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
        const px = p.x
        const py = p.y

        this.hitShape = null

        // 点(px,py)是否包含在this.rect1内
        if (this.rect1.contains(px, py)) {
          this.hitShape = this.rect1
        } else if (this.rect2.contains(px, py)) {
          this.hitShape = this.rect2
        } else if (this.circle1.contains(px, py)) {
          this.hitShape = this.circle1
        } else if (this.circle2.contains(px, py)) {
          this.hitShape = this.circle2
        } else if (this.triangle1.contains(px, py)) {
          this.hitShape = this.triangle1
        }

        this.drawScene()
      },
      this
    )

    const cursors = this.input.keyboard.createCursorKeys()
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q), // 缩小
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E), // 放大
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

    this.input.keyboard.on(
      "keydown-X",
      function () {
        this.cameras.main.rotation -= 0.01 // 旋转角度
      },
      this
    )
    this.input.keyboard.on(
      "keydown-Z",
      function (event) {
        this.cameras.main.rotation += 0.01
      },
      this
    )
  }

  update(time, delta) {
    this.controls.update(delta)
    this.sprites.forEach(function (sprite, i) {
      sprite.rotation += i % 2 ? 0.005 : -0.005
    })
  }

  drawScene() {
    this.graphics.clear()

    // camera maker
    this.graphics.lineStyle(1, 0x00ff00)
    this.graphics.strokeRectShape(this.bounds)
    this.graphics.lineBetween(0, 0, 1600, 1200)
    this.graphics.lineBetween(1600, 0, 0, 1200)

    // shapes
    if (this.hitShape === this.rect1) {
      // 鼠标移动到里面是红色
      this.graphics.fillStyle(0xff0000)
      this.graphics.fillRectShape(this.rect1)
    } else {
      // 默认是黄色
      this.graphics.fillStyle(0xffff00)
      this.graphics.fillRectShape(this.rect1)
    }

    if (this.hitShape === this.rect2) {
      this.graphics.fillStyle(0xff0000)
      this.graphics.fillRectShape(this.rect2)
    } else {
      this.graphics.fillStyle(0xffff00)
      this.graphics.fillRectShape(this.rect2)
    }

    if (this.hitShape === this.circle1) {
      this.graphics.fillStyle(0xff0000)
      this.graphics.fillCircleShape(this.circle1)
    } else {
      this.graphics.fillStyle(0xffff00)
      this.graphics.fillCircleShape(this.circle1)
    }

    if (this.hitShape === this.circle2) {
      this.graphics.fillStyle(0xff0000)
      this.graphics.fillCircleShape(this.circle2)
    } else {
      this.graphics.fillStyle(0xffff00)
      this.graphics.fillCircleShape(this.circle2)
    }

    if (this.hitShape === this.triangle1) {
      this.graphics.fillStyle(0xff0000)
      this.graphics.fillTriangleShape(this.triangle1)
    } else {
      this.graphics.fillStyle(0xffff00)
      this.graphics.fillTriangleShape(this.triangle1)
    }
  }
}

export default Example
