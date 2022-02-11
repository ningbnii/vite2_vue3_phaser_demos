class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("image", "assets/pics/sao-sinon.png")
    this.load.image("phaser2", "assets/sprites/phaser2.png")
    this.load.image("mask", "assets/tests/camera/soft-mask.png")
    this.load.image("bg", "assets/ui/undersea-bg.png")
    this.load.spritesheet("fish", "assets/sprites/fish-136x80.png", { frameWidth: 136, frameHeight: 80 })
  }

  create() {
    // 蒙版图片
    const maskImage = this.make.image({
      x: 400,
      y: 300,
      key: "mask",
      add: false,
    })

    const mask = maskImage.createBitmapMask()
    const bg = this.add.image(400, 300, "bg")

    const maskImage2 = this.make.image({
      x: 400,
      y: 300,
      key: "phaser2",
      add: false,
    })

    const mask2 = maskImage2.createBitmapMask()

    // 创建一个新的粒子发射器管理器游戏对象并将其添加到场景中。
    const particles = this.add.particles("fish")

    // 创建一个新的粒子发射器对象，将其添加到此发射器管理器并返回对它的引用。
    const emitter1 = particles.createEmitter({
      frame: { frames: [0, 1, 2], cycle: true, quantity: 4 }, // 循环的
      x: -70,
      y: { min: 100, max: 500, steps: 8 }, // 最小100，最大500，间隔8
      lifespan: 5000, // 寿命
      speedX: { min: 200, max: 400, steps: 8 },
      quantity: 4,
      frequency: 500, // 频率
    })

    const emitter2 = particles.createEmitter({
      frame: { frames: [0, 1, 2], cycle: true, quantity: 4 },
      x: 870,
      y: { min: 100, max: 500, steps: 8 },
      lifespan: 5000,
      speedX: { min: -200, max: -400, steps: 8 },
      quantity: 4,
      frequency: 500,
    })

    // 控制显示隐藏
    // particles.visible = false
    // bg.mask = new Phaser.Display.Masks.BitmapMask(this, particles)
    // 给背景图添加一个光晕效果遮罩，alpha为1，则镂空

    const shape1 = this.make.graphics().fillRect(50, 50, 700, 500)
    const shape2 = this.make.graphics().fillCircle(400, 300, 300)
    const shape3 = this.make.graphics().fillCircle(400, 300, 100)

    // 创建几何图形蒙版
    const geomask1 = shape1.createGeometryMask()
    const geomask2 = shape2.createGeometryMask()
    const geomask3 = shape3.createGeometryMask()

    // 反转蒙版
    // geomask1.invertAlpha = true
    // emitter1.setMask(geomask1)
    // emitter2.setMask(geomask2)

    // particles.setMask(geomask1)

    // 可以给主相机设置蒙版，可以给粒子发射器管理器设置蒙版，可以给每一个粒子发射器设置蒙版
    this.cameras.main.setMask(geomask1)

    bg.setMask(mask)
    // 只能添加几何图形遮罩
    particles.setMask(geomask2)

    emitter2.setMask(geomask3)

    const cursors = this.input.keyboard.createCursorKeys()

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      acceleration: 0.03,
      drag: 0.0005,
      maxSpeed: 1.0,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

    this.input.keyboard.on("keydown-Z", () => {
      this.cameras.main.rotation += 0.01
    })

    this.input.keyboard.on("keydown-X", () => {
      this.cameras.main.rotation -= 0.01
    })
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
