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
    this.load.image("grid", "assets/sprites/128x128-v2.png")
  }

  create() {
    this.add.image(400.8, 300.3, "grid").setScale(1.9)
    // 渲染游戏对象时，相机是否应将像素值四舍五入为整数？
    // 在某些类型的游戏中，尤其是像素艺术，这是防止子像素混叠所必需的。
    this.cameras.main.setRoundPixels(true)
    this.cameras.main.setZoom(1.3)
  }
}

export default Example
