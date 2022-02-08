class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("robota", "assets/pics/robota-uxo-by-made-of-bomb.jpeg")
  }

  create() {
    const image = this.add.image(900, 300, "robota")
    this.tweens.add({
      targets: image,
      x: 100,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      duration: 3000,
    })

    this.cameras.main.once("camerafadeincomplete", function (camera) {
      // 6s内完成淡出
      camera.fadeOut(6000)
    })

    // 6s内完成淡入
    this.cameras.main.fadeIn(6000)
  }
}

export default Example
