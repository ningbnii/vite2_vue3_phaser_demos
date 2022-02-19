class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.atlas("atlas", "assets/fruit/veg.png", "assets/fruit/veg.json")
    this.numbers = []
    this.iter = 0
  }
}

export default Example
