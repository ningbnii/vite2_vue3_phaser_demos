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
    const volcano = this.add.image(400, 300, "volcano")
    // 不跟随相机滚动
    const hotdog = this.add.image(400, 300, "hotdog").setScrollFactor(0)

    // hotdog不会被main相机渲染
    this.cameras.main.ignore(hotdog)
    const PixelatedFX = this.renderer.pipelines.getPostPipeline("PixelatedFX")
    this.cameras.main.setPostPipeline(PixelatedFX)

    // 添加一个相机，hotdog会渲染出来
    const cam1 = this.cameras.add(0, 0, 800, 600)

    // cam1中只有一个hotdog,没有背景，main中只有背景图，没有hotdog
    cam1.ignore(volcano)

    const cursors = this.input.keyboard.createCursorKeys()

    const controlConfig = {
      camera: this.cameras.main, // 控制main相机的移动
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
