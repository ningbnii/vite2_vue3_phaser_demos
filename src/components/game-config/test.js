class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("pic", "assets/pics/baal-loader.png")
    this.load.spritesheet("fish", "assets/sprites/fish-136x80.png", { frameWidth: 136, frameHeight: 80 })
  }

  create() {
    // this.add.image(400, 300, "pic")
    // let text = this.add.text(80, 500, "", { font: "16px Courier", fill: "#fff" })
    // text.setText(["Game Title: " + this.game.config.gameTitle])

    var image1 = this.add.image(100, 80, "fish", 0)
    var image2 = this.add.image(100, 180, "fish", 1)
    var image3 = this.add.image(100, 280, "fish", 2)
    var image4 = this.add.image(100, 380, "fish", 1)
    var image5 = this.add.image(100, 480, "fish", 0)

    var tween = this.tweens.add({
      targets: [image1, image2, image3, image4, image5],
      x: 700,
      duration: 4000,
      ease: "Sine.easeInOut",
      flipX: true, // 水平翻转
      yoyo: true,
      repeat: -1,
      delay: function (target, key, value, targetIndex) {
        return targetIndex * 1000
      },
    })
  }
}

export default Example
