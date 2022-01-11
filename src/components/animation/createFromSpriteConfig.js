class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const gems_png = new URL("../../assets/gems.png", import.meta.url).href
    const gems_json = new URL("../../assets/gems.json", import.meta.url).href
    this.load.atlas("gems", gems_png, gems_json)
  }

  create() {
    // 首先定义动画
    this.anims.create({ key: "ruby", frames: this.anims.generateFrameNames("gems", { prefix: "ruby_", end: 6, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: "square", frames: this.anims.generateFrameNames("gems", { prefix: "square_", end: 14, zeroPad: 4 }), repeat: -1 })

    // The Sprite config
    const config = {
      key: "gems",
      x: { randInt: [0, this.width] },
      y: { randInt: [0, this.height] },
      scale: { randFloat: [0.5, 1.5] },
      anims: "ruby",
    }

    //Make 16 sprites using the config above
    for (let i = 0; i < 16; i++) {
      this.make.sprite(config)
    }

    //  A more complex animation config object.
    //  This time with a call to delayedPlay that's a function.
    const config2 = {
      key: "gems",
      frame: "square_0000",
      x: { randInt: [0, this.width] },
      y: { randInt: [0, this.height] },
      scale: { randFloat: [0.5, 1.5] },
      anims: {
        key: "square",
        repeat: -1,
        repeatDelay: { randInt: [1000, 4000] }, // 动画重复间隔时间
        delayedPlay: function () {
          return Math.random() * 6000 // 延迟播放，返回0，不播放动画
        },
      },
    }

    //Make 16 sprites using the config above
    for (let i = 0; i < 16; i++) {
      this.make.sprite(config2)
    }
  }
}

export default Example
