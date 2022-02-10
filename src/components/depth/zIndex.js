class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("ayu", "assets/pics/ayu2.png")
  }

  create() {
    const image1 = this.add.image(100, 300, "ayu")
    const image2 = this.add.image(200, 300, "ayu")
    const image3 = this.add.image(300, 300, "ayu")
    const image4 = this.add.image(400, 300, "ayu")
    const image5 = this.add.image(500, 300, "ayu")
    const image6 = this.add.image(600, 300, "ayu")
    const image7 = this.add.image(700, 300, "ayu")

    this.input.on("pointerdown", () => {
      image3.setDepth(1)
    })
  }
}

export default Example
