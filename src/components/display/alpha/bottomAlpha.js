class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("turkey", "assets/pics/turkey-1985086.jpeg")
    this.load.image("face", "assets/pics/bw-face.png")
  }

  create() {
    const face = this.add.image(0, 0, "face").setOrigin(0)
    const sea = this.add.image(0, 0, "turkey").setOrigin(0)

    // top left,top right,bottom left,bottom right
    // 渐变效果
    // sea.setAlpha(0, 1, 0, 0)

    // 只有一个值，就是对整个图片设置统一的透明度
    // sea.setAlpha(0.2)

    // sea.alphaTopLeft = 0
    // sea.alphaTopRight = 0
    // sea.alphaBottomLeft = 0
    // sea.alphaBottomRight = 0
    // sea.clearAlpha()
  }
}

export default Example
