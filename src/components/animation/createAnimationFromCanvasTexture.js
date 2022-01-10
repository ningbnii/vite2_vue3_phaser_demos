class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const framesPerRow = 8
    const frameTotal = 32

    const canvasFrame = this.textures.createCanvas("dynamicFrames", 256, 128)

    let radius = 0
    const radiusInc = 16 / frameTotal

    let x = 0
    let y = 0
    let ctx = canvasFrame.context

    ctx.fillStyle = "#ffff00"

    for (let i = 0; i <= frameTotal; i++) {
      // draw an arc to the CanvasTexture
      ctx.beginPath()
      ctx.arc(x + 16, y + 16, Math.max(1, radius), 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()

      // now we add a frame to the CanvasTexture
      canvasFrame.add(i, 0, x, y, 32, 32)

      x += 32
      radius += radiusInc

      if ((i + 1) % framesPerRow === 0) {
        x = 0
        y += 32
      }
    }

    canvasFrame.refresh()

    this.add.image(0, 0, "dynamicFrames", "__BASE").setOrigin(0)

    this.anims.create({
      key: "pulse",
      frames: this.anims.generateFrameNumbers("dynamicFrames", { start: 0, end: frameTotal }),
      frameRate: 28,
      repeat: -1,
      yoyo: true,
    })

    for (let i = 0; i < 50; i++) {
      let ball = this.add.sprite(8 + i * 16, 164, "dynamicFrames").play("pulse")
      this.tweens.add({
        targets: ball,
        y: 584,
        duration: 2000,
        ease: "Quad.easeInOut",
        delay: i * 30,
        yoyo: true,
        repeat: -1,
      })
    }
  }
}

export default Example
