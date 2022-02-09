class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("gem", "assets/sprites/gem.png")
  }

  create() {
    this.data.set("lives", 3)
    this.data.set("level", 5)
    this.data.set("score", 2000)

    var text = this.add.text(100, 100, "", { font: "64px Courier", fill: "#00ff00" })
    text.setText([
      "Level: " + this.data.get("level"), //
      "Lives: " + this.data.get("lives"),
      "Score: " + this.data.get("score"),
    ])
  }
}

export default Example
