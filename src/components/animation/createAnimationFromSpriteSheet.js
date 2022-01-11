import brawler from "../../assets/brawler48x48.png"
import grid from "../../assets/grid-ps2.png"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.spritesheet("brawler", brawler, { frameWidth: 48, frameHeight: 48 })
    this.load.image("grid", grid)
  }

  create() {
    this.add.tileSprite(0, 0, this.width, this.height, "grid").setOrigin(0)
    this.add.image(0, 0, "brawler", "__BASE").setOrigin(0)
    // 绘制网格线，setOutlineStyle，设置网格线的颜色，16进制格式
    this.add.grid(0, 0, 192, 384, 48, 48).setOrigin(0).setOutlineStyle(0x00ff00)

    // setOrigin(0.0.5) 文字上下居中
    this.add.text(200, 24, "<- walk", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 72, "<- idle", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 120, "<- kick", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 168, "<- punch", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 216, "<- jump", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 264, "<- jump kick", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 312, "<- win", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(200, 360, "<- die", { color: "#00ff00" }).setOrigin(0, 0.5)
    this.add.text(this.center.x, 440, "click to change animation", { color: "#00ff00" }).setOrigin(0.5, 0)

    let current = this.add.text(this.center.x, 460, "playing: walk", { color: "#00ff00" }).setOrigin(0.5, 0)

    // animation set
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [5, 6, 7, 8] }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "kick",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [10, 11, 12, 13, 10] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000,
    })

    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [15, 16, 17, 18, 17, 15] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000,
    })

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [20, 21, 22, 23] }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "jumpkick",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [20, 21, 22, 23, 25, 23, 22, 21] }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "win",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [30, 31] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000,
    })

    // die animation don't repeat
    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("brawler", { frames: [35, 36, 37] }),
      frameRate: 8,
    })

    let keys = ["walk", "idle", "kick", "punch", "jump", "jumpkick", "win", "die"]

    let cody = this.add.sprite(this.center.x, 400)
    cody.play("walk") // 播放动画

    let c = 0
    // 监听点击事件
    this.input.on("pointerdown", function () {
      c++
      if (c === keys.length) {
        c = 0 // 循环
      }
      cody.play(keys[c])
      current.setText("playing: " + keys[c])
    })
  }
}

export default Example
