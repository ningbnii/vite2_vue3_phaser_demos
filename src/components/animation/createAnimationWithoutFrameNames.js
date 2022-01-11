class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const zombie_png = new URL("../../assets/zombie-no-pivot.png", import.meta.url).href
    const zombie_json = new URL("../../assets/zombie-no-pivot.json", import.meta.url).href
    this.load.atlas("zombie", zombie_png, zombie_json)
  }

  create() {
    // 在这里，我们只是将纹理图集键传递给`create`，它将从中提取所有帧，对它们进行数字排序以用于动画。
    this.anims.create({
      key: "walk",
      frames: "zombie",
      frameRate: 12,
      repeat: -1,
    })
    this.add.sprite(this.center.x, this.center.y).play("walk")
  }
}

export default Example
