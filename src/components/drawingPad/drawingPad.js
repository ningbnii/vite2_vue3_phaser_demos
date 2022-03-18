class DrawingPad extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    let texture = this.textures.createCanvas('gradient', this.cameras.main.width, this.cameras.main.height)

    //  We can access the underlying Canvas context like this:
    // var grd = texture.context.createLinearGradient(0, 0, 0, 256)

    // grd.addColorStop(0, '#8ED6FF')
    // grd.addColorStop(1, '#004CB3')
    let ctx = texture.context

    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 6
    // ctx.fillRect(0, (this.cameras.main.height - this.cameras.main.width) / 2, this.cameras.main.width, this.cameras.main.width)
    ctx.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    // ctx.stroke()

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh()

    let img = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'gradient').setInteractive({ draggable: true })

    this.input.addPointer(1)
    let temp1 = {}
    let temp2 = {}

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        img.x = dragX
        img.y = dragY
      }
    })

    this.input.on('pointerdown', (pointer) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        temp1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        temp2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }
      } else {
        ctx.beginPath()

        ctx.moveTo(pointer.x, pointer.y)
      }
    })

    this.input.on('pointermove', (pointer, localX, localY, event) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        let newPoint1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        let newPoint2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }

        let preLen = Phaser.Math.Distance.Between(temp1.x, temp1.y, temp2.x, temp2.y)
        let newLen = Phaser.Math.Distance.Between(newPoint1.x, newPoint1.y, newPoint2.x, newPoint2.y)

        img.scale *= newLen / preLen
        let rad1 = Phaser.Math.Angle.BetweenPoints(temp1, temp2)
        let deg1 = Phaser.Math.RadToDeg(rad1)
        let rad2 = Phaser.Math.Angle.BetweenPoints(newPoint1, newPoint2)
        let deg2 = Phaser.Math.RadToDeg(rad2)
        let deg = Phaser.Math.Angle.ShortestBetween(deg1, deg2)
        let angle = Phaser.Math.DegToRad(deg)
        img.rotation += angle

        temp1 = newPoint1
        temp2 = newPoint2
      } else {
        ctx.lineTo(pointer.x, pointer.y)
        ctx.stroke()
      }
    })

    this.input.on('pointerup', () => {
      if (!this.input.pointer1.isDown && !this.input.pointer2.isDown) {
        temp1 = {}
        temp2 = {}
      } else {
        ctx.closePath()
      }
    })
  }
}

export default DrawingPad
