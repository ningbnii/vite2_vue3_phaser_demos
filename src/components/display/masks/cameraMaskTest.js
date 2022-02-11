class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("image", "assets/pics/sao-sinon.png")
    this.load.image("phaser2", "assets/sprites/phaser2.png")
    this.load.image("asuna", "assets/sprites/asuna_by_vali233.png")
  }

  create() {
    const shape1 = this.make.graphics().fillStyle(0xffffff).fillRect(200, 150, 400, 500)
    const shape2 = this.make.graphics().fillStyle(0x00ff00).fillCircle(400, 300, 200)
    const shape3 = this.make.graphics().fillStyle(0x0000fff).fillRect(500, 50, 100, 400)

    const mask1 = shape1.createGeometryMask()
    const mask2 = shape2.createGeometryMask()
    const mask3 = shape3.createGeometryMask()

    this.cameras.main.setMask(mask1)

    const bg = this.add.image(300, 300, "image").setTint(0xff0000)

    this.tweens.add({
      targets: bg,
      x: 500,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      duration: 2000,
    })

    const logo = this.add.image(400, 100, "phaser2")
    const logo2 = this.add.image(300, 150, "asuna")
    const logo3 = this.add.image(500, 50, "asuna")

    this.tweens.add({
      targets: [logo, logo2, logo3], // 可以是数组
      y: 500,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      duration: 2000,
    })

    logo.setMask(mask2)

    logo3.setMask(mask3)
  }
}

export default Example
