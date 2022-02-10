class Example extends Phaser.Scene {
  constructor() {
    super()
    this.sprites = []
  }

  preload() {
    this.load.image("turkey", "assets/pics/turkey-1985086.jpeg")
  }

  create() {
    this.add.image(400, 300, "turkey")
    const graphics = this.add.graphics()

    const color = 0x0000ff // mult
    const thickness = 4
    const alpha = 1

    graphics.lineStyle(thickness, 0x00000, 1)
    graphics.fillStyle(color, alpha)
    // new Phaser.Geom.Point(400, 300)

    graphics.fillCircle(400, 300, 128)
    // graphics.strokeCircle(400, 300, 128)

    // graphics.setBlendMode(Phaser.BlendModes.SCREEN)
    graphics.setBlendMode(Phaser.BlendModes.MULTIPLY)
    // graphics.setBlendMode(Phaser.BlendModes.DIFFERENCE)
  }
}

export default Example
