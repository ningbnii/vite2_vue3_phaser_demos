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
    this.load.audio("synth1", ["audio/synth1.mp3"])
  }

  create() {
    let sound1 = this.sound.add("synth1", { loop: true })
    let sound2 = this.sound.add("synth1", { loop: true })
    if (this.sound.locked) {
      this.input.on(
        "pointerup",
        function () {
          if (sound1.isPlaying) {
            sound2.play()
          } else {
            sound1.play()
          }
          console.log("sound1:" + sound1.isPlaying)
          console.log("sound2:" + sound2.isPlaying)
        },
        this
      )
    }
  }
}

export default Example
