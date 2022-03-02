var player
var cursors
var text
class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA")
  }

  preload() {
    this.load.image("eye", "assets/pics/lance-overdose-loader-eye.png")
  }

  create() {
    this.input.setDefaultCursor("url(assets/input/cursors/blue.cur), pointer")

    var sprite = this.add.sprite(400, 300, "eye").setInteractive({ cursor: "url(assets/input/cursors/pen.cur), pointer" })

    sprite.on("pointerover", function (event) {
      this.setTint(0xff0000)
    })

    sprite.on("pointerout", function (event) {
      this.clearTint()
    })
  }
}

export { SceneA }
