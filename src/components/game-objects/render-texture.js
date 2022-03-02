var result
var boxX = 0
var boxY = 0
class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA")
  }
  preload() {
    this.load.image("block", "assets/sprites/block.png")
  }

  create() {
    var image = this.add.image(100, 100, "block")

    var tween = this.tweens.add({
      targets: image,
      x: 600,
      paused: false,
      yoyo: true,
      repeat: -1,
    })

    this.input.once(
      Phaser.Input.Events.POINTER_DOWN,
      function () {
        console.log("stopped?")
        tween.stop()
      },
      this
    )

    this.add.text(20, 20, "Click and see the console")
  }
}

export { SceneA }
