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
    this.load.image("CherilPerils", "assets/camera/CherilPerils.png")
    this.load.image("clown", "assets/sprites/clown.png")
  }

  create() {
    this.image = this.add.image(0, 0, "CherilPerils").setOrigin(0)
    this.cameras.main.setSize(400, 300)

    this.horizontalCamera = this.cameras.add(400, 0, 400, 300)
    this.verticalCamera = this.cameras.add(0, 300, 400, 300)
    this.circleCamera = this.cameras.add(400, 300, 400, 300)

    for (let i = 0; i < 1000; i++) {
      this.add.image(Math.random() * 1000, Math.random() * 1240, "clown")
    }
  }

  update() {
    var halfWidth = this.image.texture.source[0].width / 2
    var quarterWidth = halfWidth / 2
    var halfHeight = this.image.texture.source[0].height / 2
    var quarterHeight = halfHeight / 2

    // |0 二进制运算，取整
    this.horizontalCamera.scrollX = (quarterWidth + Math.cos(this.iter) * quarterWidth) | 0
    this.verticalCamera.scrollY = (quarterHeight + Math.sin(this.iter) * quarterHeight) | 0
    this.circleCamera.scrollX = (quarterWidth + Math.cos(this.iter) * quarterWidth) | 0
    this.circleCamera.scrollY = (quarterHeight + Math.sin(this.iter) * quarterHeight) | 0

    this.iter += 0.02
  }
}

export default Example
