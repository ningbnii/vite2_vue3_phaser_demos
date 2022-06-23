class DrawingPad extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    // this.cameras.main.setBounds(
    //   0,
    //   0,
    //   this.cameras.main.width,
    //   this.cameras.main.height
    // )
    const cam = this.cameras.main
    let graphics = this.add.graphics()
    graphics.fillStyle(0x0000aa)
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)

    let texture = this.textures.createCanvas(
      'gradient',
      this.cameras.main.width,
      this.cameras.main.height
    )

    //  We can access the underlying Canvas context like this:
    // var grd = texture.context.createLinearGradient(0, 0, 0, 256)

    // grd.addColorStop(0, '#8ED6FF')
    // grd.addColorStop(1, '#004CB3')
    let ctx = texture.context

    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 0.1
    // ctx.fillRect(0, (this.cameras.main.height - this.cameras.main.width) / 2, this.cameras.main.width, this.cameras.main.width)
    ctx.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    // ctx.stroke()

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh()

    let img = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'gradient'
      )
      .setInteractive({ draggable: true })
    this.input.addPointer(1)
    let start1 = {}
    let start2 = {}

    // this.input.on('dragonStart', (pointer, gameObject) => {

    // }
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      console.log(pointer, gameObject, dragX, dragY)
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        // img.x = dragX
        // img.y = dragY
      }
    })

    this.input.on('pointerdown', (pointer) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        start1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        start2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }
      } else {
        ctx.beginPath()
        let worldPoint = cam.getWorldPoint(pointer.x, pointer.y)
        ctx.moveTo(worldPoint.x + 0.5, worldPoint.y + 0.5)
      }
    })

    this.input.on('pointermove', (pointer, localX, localY, event) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        let end1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        let end2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }

        var offsetX = end1.x - start1.x
        var offsetY = end1.y - start1.y
        if (offsetX < 10 && offsetX > -10) {
          cam.offsetX += offsetX * 5
        }
        if (offsetY < 10 && offsetY > -10) {
          cam.offsetY += offsetY * 5
        }

        let preLen = Phaser.Math.Distance.Between(
          start1.x,
          start1.y,
          start2.x,
          start2.y
        )
        let newLen = Phaser.Math.Distance.Between(
          end1.x,
          end1.y,
          end2.x,
          end2.y
        )
        // cam.scale *= newLen / preLen
        let rad1 = Phaser.Math.Angle.BetweenPoints(start1, start2)
        let deg1 = Phaser.Math.RadToDeg(rad1)
        let rad2 = Phaser.Math.Angle.BetweenPoints(end1, end2)
        let deg2 = Phaser.Math.RadToDeg(rad2)
        let deg = Phaser.Math.Angle.ShortestBetween(deg1, deg2)
        let angle = Phaser.Math.DegToRad(deg)

        cam.rotation += angle

        if (res1 < 1000 || res2 < 1000) {
          if (res1 > 0 || res2 > 0) {
          }
          if (res1 <= 0 || res2 <= 0) {
            // s.test_mc.scaleY += evt.scale
            // s.test_mc.scaleX += evt.scale
          }
        }

        start1 = end1
        start2 = end2
      } else {
        let worldPoint = cam.getWorldPoint(pointer.x, pointer.y)
        // lineTo
        ctx.lineTo(worldPoint.x, worldPoint.y)
        // ctx.lineTo(pointer.x + 0.5, pointer.y + 0.5)
        ctx.stroke()
      }
    })

    this.input.on('pointerup', () => {
      if (!this.input.pointer1.isDown && !this.input.pointer2.isDown) {
        start1 = {}
        start2 = {}
      } else {
        ctx.closePath()
      }
    })
  }
}

export default DrawingPad
