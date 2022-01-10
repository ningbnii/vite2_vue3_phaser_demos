import diamond_png from "../../assets/diamond.png"
import diamond_json from "../../assets/diamond.json"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.atlas("gems", diamond_png, diamond_json)
  }

  create() {
    this.anims.create({
      key: "diamond",
      frames: this.anims.generateFrameNames("gems", { prefix: "diamond_", end: 15, zeroPad: 4 }),
      frameRate: 16,
      yoyo: true,
      repeat: -1,
      repeatDelay: 300,
    })

    this.gem = this.add.sprite(this.center.x, this.center.y, "gems").play("diamond").setScale(4)

    this.debug = this.add.graphics()
  }

  update() {
    this.debug.clear()

    const size = this.width

    // this.debug.fillStyle(0x2d2d2d)
    // this.debug.fillRect(64, 64, size, 48)

    this.debug.fillStyle(0xff00ff)
    // 动画进度
    this.debug.fillRect(0, 64, size * this.gem.anims.getProgress(), 48)
  }
}

export default Example
