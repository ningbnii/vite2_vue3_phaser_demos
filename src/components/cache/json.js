class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = "assets/"
    this.load.json("jsondata", "atlas/megaset-0.json")
  }

  create() {
    console.log(this.cache.json.get("jsondata"))
  }
}

export default Example
