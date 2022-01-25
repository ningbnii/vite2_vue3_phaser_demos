class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.text("data", "assets/loader-tests/test.txt")
  }

  create() {
    console.log(this.cache.text.get("data"))
  }
}

export default Example
