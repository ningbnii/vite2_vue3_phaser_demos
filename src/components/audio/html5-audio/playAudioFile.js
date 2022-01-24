import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = "assets/"
    this.load.audio("theme", ["audio/oedipus_wizball_highscore.mp3"])
    this.load.image("wizball", "wizball.png")
  }

  create() {
    this.add.image(this.center.x, this.center.y, "wizball").setOrigin().setScale(4)
    this.music = this.sound.add("theme")
    this.input.on(
      "pointerdown",
      function () {
        if (!this.music.isPlaying) {
          this.music.play()
        }
      },
      this
    )
  }
}

export default Example
