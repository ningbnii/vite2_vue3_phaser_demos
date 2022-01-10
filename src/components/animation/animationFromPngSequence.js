import cat1 from "../../assets/cat1.png"
import cat2 from "../../assets/cat2.png"
import cat3 from "../../assets/cat3.png"
import cat4 from "../../assets/cat4.png"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.image("cat1", cat1)
    this.load.image("cat2", cat2)
    this.load.image("cat3", cat3)
    this.load.image("cat4", cat4)
  }

  create() {
    this.anims.create({
      key: "snooze",
      frames: [{ key: "cat1" }, { key: "cat2" }, { key: "cat3" }, { key: "cat4", duration: 50 }],
      frameRate: 8,
      repeat: -1,
    })

    this.add.sprite(this.center.x, this.center.y, "cat1").play("snooze")
  }
}

export default Example
