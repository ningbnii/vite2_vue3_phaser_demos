import knight_png from "../../assets/knight.png"
import knight_json from "../../assets/knight.json"
import bg from "../../assets/clouds.png"
import tiles from "../../assets/fantasy-tiles.png"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.atlas("knight", knight_png, knight_json)
    this.load.image("bg", bg)
    this.load.spritesheet("tiles", tiles, { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    // the background and floor
    // setOrigin(0,0) = setOrigin(0)
    this.add.image(0, 0, "bg").setOrigin(0)

    for (let i = 0; i < 13; i++) {
      this.add.image(64 * i, this.height - 64, "tiles", 1).setOrigin(0)
    }

    let text = this.add.text(this.center.x, 8, "click to plan animation chain", { color: "#00ff00" }).setOrigin(0.5, 0)

    this.anims.create({
      key: "guardStart",
      frames: this.anims.generateFrameNames("knight", { prefix: "guard_start/frame", end: 3, zeroPad: 4 }),
      frameRate: 8,
    })

    this.anims.create({
      key: "guard",
      frames: this.anims.generateFrameNames("knight", { prefix: "guard/frame", end: 5, zeroPad: 4 }),
      frameRate: 8,
      repeat: 2,
    })

    this.anims.create({
      key: "guardEnd",
      frames: this.anims.generateFrameNames("knight", { prefix: "guard_end/frame", end: 3, zeroPad: 4 }),
      frameRate: 8,
    })

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("knight", { prefix: "idle/frame", end: 5, zeroPad: 4 }),
      frameRate: 8,
      repeat: -1,
    })

    let lancelot = this.add.sprite(this.center.x, this.height - 60)
    lancelot.setOrigin(0.5, 1)
    lancelot.setScale(2)
    lancelot.play("idle")

    lancelot.on(Phaser.Animations.Events.ANIMATION_START, function (anim) {
      text.setText("playing " + anim.key)
    })

    this.input.on(
      "pointerdown",
      function () {
        if (lancelot.anims.getName() === "idle") {
          // 等待当前动画完成“repeatCount”重复周期数，然后开始播放给定动画。
          lancelot.playAfterRepeat("guardStart")
          // 设置动画或动画数组，在当前动画完成或停止后立即播放。按照顺序执行
          lancelot.chain(["guard", "guardEnd", "idle"])
        }
      },
      this
    )
  }
}

export default Example
