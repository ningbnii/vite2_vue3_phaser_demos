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
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    this.image = this.add.image(0, 0, "einstein")
    this.cameras.main.setViewport(200, 150, 400, 300)
  }

  update() {
    this.image.x = Math.sin(this.iter) * 200
    this.image.y = Math.cos(this.iter) * 200
    this.iter += 0.04
  }
}

export default Example
