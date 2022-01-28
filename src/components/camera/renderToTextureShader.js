import HueRotatePostFX from "./HueRotatePostFX"
import BendRotationWavesPostFX from "./BendRotationWavesPostFX"
import BendWavesPostFX from "./BendWavesPostFX"
import PlasmaPost2FX from "./PlasmaPost2FX"
import ScalinePostFX from "./ScalinePostFX"
import LazersPostFX from "./LazersPostFX"

class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("volcano", "assets/pics/rick-and-morty-by-sawuinhaff-da64e7y.png")
    this.load.image("hotdog", "assets/sprites/hotdog.png")
  }

  create() {
    this.add.image(400, 400, "volcano")
    this.add.image(400, 300, "hotdog").setScrollFactor(0)

    // this.cameras.main.setPostPipeline(HueRotatePostFX)
    // this.cameras.main.setPostPipeline(BendRotationWavesPostFX)
    // this.cameras.main.setPostPipeline(BendWavesPostFX)
    // this.cameras.main.setPostPipeline(PlasmaPost2FX)
    // this.cameras.main.setPostPipeline(ScalinePostFX)
    this.cameras.main.setPostPipeline(LazersPostFX)

    this.cameras.main.setZoom(0.5)
    // const shader = this.cameras.main.getPostPipeline(ScalinePostFX)
    // this.input.on("pointermove", (pointer) => {
    //   shader.mouseX = pointer.x
    //   shader.mouseY = pointer.y
    // })

    const cursors = this.input.keyboard.createCursorKeys()
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1,
    }
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
