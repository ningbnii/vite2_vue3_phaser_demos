class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.bitmapFont("ice", "assets/fonts/bitmap/iceicebaby.png", "assets/fonts/bitmap/iceicebaby.xml")
  }

  create() {
    const text = this.add.bitmapText(400, 300, "ice", "", 16).setOrigin(0.5).setRightAlign().setInteractive()
    text.setText(["Phaser 3", "BitmapText", "Click to change size"])
    text.setDropShadow(0, 6, 0xff00ff, 0.7)
    text.setMaxWidth(500)

    this.input.on("pointerdown", () => {
      text.setFontSize(text.fontSize + 2)
      // text.setOrigin(0.5)
    })
  }
}

export default Example
