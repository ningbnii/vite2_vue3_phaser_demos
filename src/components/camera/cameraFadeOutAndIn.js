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
    this.load.image("neuromancer", "assets/pics/neuromancer.jpeg")
  }

  create() {
    this.add.image(400, 300, "robota")

    this.cameras.main.once(
      "camerafadeoutcomplete",
      function (camera) {
        // 添加一个image覆盖掉之前的image
        this.add.image(400, 300, "neuromancer")
        // 再淡入
        camera.fadeIn(6000, 255)
      },
      this
    )

    // 淡出
    this.cameras.main.fadeOut(6000, 255)
  }
}

export default Example
