var max = 16
var emitters = []
class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA")
  }

  preload() {
    this.load.atlas("flares", "assets/particles/flares.png", "assets/particles/flares.json")
    this.load.image("logo", "assets/sprites/phaser2.png")
    this.load.image("space", "assets/skies/space.jpeg")
  }

  create() {
    var textures = this.textures

    this.add.image(400, 300, "space")

    var logo = this.add.image(400, 300, "logo")

    var origin = logo.getTopLeft()

    var logoSource = {
      getRandomPoint: function (vec) {
        do {
          var x = Phaser.Math.Between(0, logo.width - 1)
          var y = Phaser.Math.Between(0, logo.height - 1)
          var pixel = textures.getPixel(x, y, "logo")
        } while (pixel.alpha < 255)

        return vec.setTo(x + origin.x, y + origin.y)
      },
    }

    var particles = this.add.particles("flares")

    particles.createEmitter({
      x: 0,
      y: 0,
      lifespan: 1000,
      gravityY: 10,
      scale: { start: 0, end: 0.25, ease: "Quad.easeOut" },
      alpha: { start: 1, end: 0, ease: "Quad.easeIn" },
      blendMode: "ADD",
      emitZone: { type: "random", source: logoSource },
    })
  }
}

export { SceneA }
