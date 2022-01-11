class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.data = {}
  }

  preload() {
    const invader = new URL("../../assets/invader1.png", import.meta.url).href
    const boom = new URL("../../assets/explosion.png", import.meta.url).href
    this.load.spritesheet("invader", invader, { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("boom", boom, { frameWidth: 64, frameHeight: 64, endFrame: 23 })
  }

  create() {
    let config1 = {
      key: "move",
      frames: "invader",
      frameRate: 4,
      repeat: -1,
    }

    let config2 = {
      key: "explode",
      frames: "boom",
      hideOnComplete: true, // 动画结束后隐藏
    }

    this.anims.create(config1)
    this.anims.create(config2)

    let colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c]

    //  Create a load of random sprites
    for (let i = 0; i < 128; i++) {
      let x = Phaser.Math.Between(50, 750)
      let y = Phaser.Math.Between(100, 550)

      let ship = this.add.sprite(x, y, "invader")
      ship.play("move")
      //在此游戏对象上设置附加色调。
      // Phaser.Utils.Array.GetRandom从数组中随机取一个值
      ship.setTint(Phaser.Utils.Array.GetRandom(colors))
      //将此游戏对象传递给输入管理器以启用输入。
      ship.setInteractive()

      ship.once("pointerdown", function () {
        this.clearTint()
        //Sprite will have visible = false set when the animation finishes repeating because of 'hideOnComplete' property
        this.play("explode")
      })
    }
  }

  update() {}
}

export default Example
