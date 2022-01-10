import gems_png from "../../assets/gems.png"
import gems_json from "../../assets/gems.json"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.atlas("gems", gems_png, gems_json)
  }

  create() {
    this.add.text(this.center.x, 32, "click to add frames to current animation", { color: "#00ff00" }).setOrigin(0.5, 0)
    // 创建一个 5 帧的动画
    this.anims.create({ key: "diamond", frames: this.anims.generateFrameNames("gems", { prefix: "diamond_", end: 15, zeroPad: 4 }), repeat: -1 })
    const group = this.add.group({
      key: "gems",
      frame: "diamond_0000",
      frameQuantity: 36,
    })
    group.playAnimation("diamond")
    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 6,
      height: 6,
      cellWidth: 64,
      cellHeight: 64,
      x: 60,
      y: 164,
    })

    this.input.on(
      "pointerup",
      function () {
        const diamond = this.anims.get("diamond")
        // add in the new frames to the current animation
        const newFrames = this.anims.generateFrameNames("gems", { prefix: "square_", end: 14, zeroPad: 4 })
        diamond.addFrame(newFrames)
      },
      this
    )
  }
}

export default Example
