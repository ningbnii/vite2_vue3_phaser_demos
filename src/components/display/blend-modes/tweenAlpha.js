class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("turkey", "assets/pics/turkey-1985086.jpeg")
    this.load.image("face", "assets/pics/bw-face.png")
  }

  create() {
    const face = this.add.image(0, 0, "face").setOrigin(0)
    const sea = this.add.image(0, 0, "turkey").setOrigin(0).setAlpha(0)

    this.tweens.add({
      targets: sea,
      alphaTopLeft: { value: 1, duration: 5000, ease: "Power1" },
      alphaBottomRight: { value: 1, duration: 10000, ease: "Power1" },
      alphaBottomLeft: { value: 1, duration: 5000, ease: "Power1", delay: 5000 },
      yoyo: true,
      loop: -1,
    })
  }
}

export default Example
