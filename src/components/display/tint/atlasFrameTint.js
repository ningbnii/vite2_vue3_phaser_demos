class Example extends Phaser.Scene {
  constructor() {
    super()
    this.i = 0
    this.tilesprites = []
  }

  preload() {
    this.load.atlas("atlas", "assets/atlas/megaset-2.png", "assets/atlas/megaset-2.json")
    this.load.image("pixel", "assets/sprites/16x16.png")
    this.load.image("face", "assets/pics/bw-face.png")
    this.load.image("sonic", "assets/sprites/sonic.png")
    this.load.image("lulu", "assets/pics/shocktroopers-lulu2.png")
  }

  create() {
    // this.image1 = this.add.image(400, 150, "atlas", "atari400")
    // this.image2 = this.add.image(400, 400, "atlas", "hotdog")
    // set the tint like this (topLeft,topRight,bottomLeft,bottomRight)
    // this.image1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    // this.image2.setTint(0x0000ff, 0xff0000, 0xff00ff, 0xffff00)
    // this.add.image(400, 300, "pixel").setScale(16).setTint(0xff0000, 0x00ff00, 0x0000ff, 0xff0000)
    // this.add.image(400, 300, "pixel").setScale(16).setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff)
    // this.add.image(400, 300, "pixel").setScale(16).setTint(0xff0000, 0x0000ff, 0xff0000, 0x0000ff)
    // this.add.image(300, 300, "pixel").setTint(0xff0000)
    // this.add.image(400, 300, "pixel").setTint(0x00ff00)
    // this.add.image(500, 300, "pixel").setTint(0x0000ff)
    // 色轮
    // const hsv = Phaser.Display.Color.HSVColorWheel()
    // const image = this.add.image(400, 300, "face")
    // image.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    // this.input.on("pointerdown", () => {
    //   // hsv数组360个元素，从0到359
    //   const a = Phaser.Math.Between(0, 359)
    //   const b = Phaser.Math.Between(0, 359)
    //   const c = Phaser.Math.Between(0, 359)
    //   const d = Phaser.Math.Between(0, 359)
    //   image.setTint(hsv[a].color, hsv[b].color, hsv[c].color, hsv[d].color)
    // })
    // const source = this.textures.get("sonic").source[0].image
    // const canvas = this.textures.createCanvas("pad", 38, 42).source[0].image
    // const ctx = canvas.getContext("2d")
    // ctx.drawImage(source, 0, 0)
    // const imageData = ctx.getImageData(0, 0, 38, 42)
    // let x = 0
    // let y = 0
    // const color = new Phaser.Display.Color()
    // for (let i = 0; i < imageData.data.length; i++) {
    //   const r = imageData.data[i]
    //   const g = imageData.data[i + 1]
    //   const b = imageData.data[i + 2]
    //   const a = imageData.data[i + 3]
    //   if (a > 0) {
    //     const startX = Phaser.Math.Between(0, 1024)
    //     const startY = Phaser.Math.Between(0, 768)
    //     const dx = x * 16
    //     const dy = y * 16
    //     const image = this.add.image(startX, startY, "pixel").setScale(0)
    //     color.setTo(r, g, b, a)
    //     image.setTint(color.color)
    //     this.tweens.add({
    //       targets: image,
    //       duration: 2000,
    //       x: dx,
    //       y: dy,
    //       scaleX: 1,
    //       scaleY: 1,
    //       angle: 360,
    //       delay: i / 1.5,
    //       yoyo: true,
    //       repeat: -1,
    //       repeatDelay: 6000,
    //       hold: 6000,
    //     })
    //   }
    //   x++
    //   if (x === 38) {
    //     x = 0
    //     y++
    //   }
    // }
    // this.hsv = Phaser.Display.Color.HSVColorWheel()
    // this.text1 = this.add.text(50, 100, "Rainbow Text", { font: "74px Arial Black", fill: "#fff" })
    // this.text1.setStroke("#00f", 16) // 描边
    // this.text1.setShadow(2, 2, "#333", 2, true, true)
    // //  Rainbow Stroke
    // this.text2 = this.add.text(50, 300, "Rainbow Stroke", { font: "74px Arial Black", fill: "#000" })
    // this.text2.setStroke("#fff", 16)
    // this.text2.setShadow(2, 2, "#333333", 2, true, true)
    // this.add
    //   .image(400, 150 - 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0x000000, 0x000000, 0xff0000, 0xff0000)
    // this.add
    //   .image(400, 150 + 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0xff0000, 0xff0000, 0x000000, 0x000000)
    // //  Green raster
    // this.add
    //   .image(400, 300 - 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0x000000, 0x000000, 0x00ff00, 0x00ff00)
    // this.add
    //   .image(400, 300 + 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0x00ff00, 0x00ff00, 0x000000, 0x000000)
    // //  Blue raster
    // this.add
    //   .image(400, 450 - 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0x000000, 0x000000, 0x0000ff, 0x0000ff)
    // this.add
    //   .image(400, 450 + 32, "pixel")
    //   .setDisplaySize(800, 64)
    //   .setTintFill(0x0000ff, 0x0000ff, 0x000000, 0x000000)
    // const text1 = this.add.text(100, 100, "Phaser Text with Tint")
    // text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    // const text2 = this.add.text(100, 200, "Phaser Text with Tint", { font: "64px Arial" })
    // text2.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    // const text3 = this.add.text(100, 400, "Phaser Text with Tint Fill", { font: "64px Arial" })
    // text3.setTintFill(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)

    // const frames = ["atari400", "bunny", "cokecan", "copy-that-floppy", "hotdog"]

    // for (let i = 0; i < frames.length; i++) {
    //   this.tilesprites[i] = this.add.tileSprite(i * 160, 0, 160, 600, "atlas", frames[i])
    //   this.tilesprites[i].setOrigin(0).setAlpha(0.5)

    //   this.tilesprites[i].setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    // }

    const image1 = this.add.image(140, 300, "lulu").setScale(2).setInteractive({ pixelPerfect: true })
    const image2 = this.add
      .image(140 + 260, 300, "lulu")
      .setScale(2)
      .setInteractive({ pixelPerfect: true })
    const image3 = this.add
      .image(140 + 260 + 260, 300, "lulu")
      .setScale(2)
      .setInteractive({ pixelPerfect: true })

    this.add.text(20, 20).setColor("#ffffff").setText("Click sprites to toggle tint mode")

    this.add.text(30, 500).setColor("#ffffff").setText("Single Tint Fill")
    this.add.text(290, 500).setColor("#ffffff").setText("Multi Tint Fill")
    this.add.text(550, 500).setColor("#ffffff").setText("Merge Tint Fill")

    image1.on("pointerdown", function () {
      if (this.isTinted) {
        this.clearTint()
      } else {
        this.setTintFill(0xffffff)
      }
    })

    image2.on("pointerdown", function () {
      if (this.isTinted) {
        this.clearTint()
      } else {
        this.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000)
      }
    })

    image3.on("pointerdown", function () {
      if (this.isTinted) {
        this.clearTint()
      } else {
        this.setTint(0xff00ff, 0xff0000, 0x00ff00, 0x0000ff)
      }
    })

    this.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 5000,
      onUpdate: (tween) => {
        const value = Math.floor(tween.getValue())
        image1.setTint(Phaser.Display.Color.GetColor(value, value, value))
      },
    })
  }

  update() {
    // const top = this.hsv[this.i].color
    // const bottom = this.hsv[359 - this.i].color
    // this.text1.setTint(top, top, bottom, bottom)
    // this.text2.setTint(top, bottom, top, bottom)
    // this.i++
    // if (this.i === 360) {
    //   this.i = 0
    // }
    // let x = 1
    // for (let i = 0; i < this.tilesprites.length; i++) {
    //   this.tilesprites[i].tilePositionX += x
    //   this.tilesprites[i].tilePositionY += x
    //   x *= -1
    // }
  }
}

export default Example
