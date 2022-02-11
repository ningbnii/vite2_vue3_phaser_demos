class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    const color1 = Phaser.Display.Color.HexStringToColor("#ff00ff")
    console.log(color1)
  }
}

export default Example
