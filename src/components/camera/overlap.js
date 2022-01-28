class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("CherilPerils", "assets/camera/CherilPerils.png")
    this.iter = 0
  }

  create() {
    this.image = this.add.image(0, 0, "CherilPerils").setOrigin(0)
    console.log(this.image)
    // 添加一个小相机，这个小相机会叠加到main相机上面
    this.smallCamera = this.cameras.add(570, 30, 200, 200)
    // 设置个透明度
    this.smallCamera.setAlpha(0.5)
  }

  update() {
    // this.image.texture.source[0].width 和 this.image.width 区别
    let halfWidth = this.image.texture.source[0].width / 2
    let quarterWidth = halfWidth / 2
    let halfHeight = this.image.texture.source[0].height / 2
    let quarterHeight = halfHeight / 2

    this.smallCamera.scrollX = halfWidth + Math.cos(this.iter) * halfWidth
    this.iter += 0.02
  }
}

export default Example
