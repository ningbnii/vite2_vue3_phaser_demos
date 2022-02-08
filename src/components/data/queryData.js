class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("gem", "assets/sprites/gem.png")
  }

  create() {
    const image = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "gem")

    image.setDataEnabled()
    image.data.set("name", "Red GemStone")
    image.data.set("value_armor", true)
    image.data.set("armor_head", 50)
    image.data.set("armor_body", 250)
    image.data.set("armor_feet", 15)

    // 正则匹配
    console.log(image.data.query(/^armor/))
  }
}

export default Example
