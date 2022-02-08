const sceneConfig = {
  key: "Example",
  cameras: [
    {
      width: 400,
      height: 300,
      backgroundColor: "#ff0000",
    },
    {
      x: 400,
      y: 0,
      width: 400,
      height: 300,
      backgroundColor: "#ff00ff",
    },
    {
      x: 0,
      y: 300,
      width: 400,
      height: 300,
      backgroundColor: "#ffff00",
    },
    {
      x: 400,
      y: 300,
      width: 400,
      height: 300,
      backgroundColor: "#00ff00",
    },
  ],
}
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    // SettingsConfig
    super(sceneConfig)
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("mech", "assets/pics/titan-mech.png")
  }

  create() {
    this.image = this.add.image(200, 150, "mech")
  }

  update() {
    this.image.rotation += 0.01
  }
}

export default Example
