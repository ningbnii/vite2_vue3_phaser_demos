class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.iter = 0
  }

  preload() {
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    this.add.image(200, 150, "einstein")
    this.cameras.main.setSize(400, 300)

    // 添加了3个相机，加上main相机，一共是4个，每个相机大小都一样
    this.camera0 = this.cameras.main
    this.camera1 = this.cameras.add(400, 0, 400, 300)
    this.camera2 = this.cameras.add(0, 300, 400, 300)
    this.camera3 = this.cameras.add(400, 300, 400, 300)
  }

  update() {
    // 可以单独控制每个相机的参数值，zoom,scrollX,scrollY,rotation
    this.camera0.zoom = 0.5 + Math.abs(Math.sin(this.iter))
    this.camera0.scrollX = Math.sin(this.iter) * 400

    this.camera1.rotation = this.iter
    this.camera2.scrollX = Math.cos(this.iter) * 100
    this.camera2.scrollY = Math.sin(this.iter) * 100
    this.camera2.zoom = 0.5 + Math.abs(Math.sin(this.iter))
    this.camera2.rotation = -this.iter

    this.camera3.zoom = 0.5 + Math.abs(Math.sin(this.iter))

    this.iter += 0.01
  }
}

export default Example
