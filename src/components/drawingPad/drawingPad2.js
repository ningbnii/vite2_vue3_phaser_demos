class DrawingPad extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    const cam = this.cameras.main

    // cam.setZoom(1)

    // let graphics = this.add.graphics()
    // graphics.fillStyle(0x0000aa)
    // graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    let scale = window.devicePixelRatio / 2

    this.canvas = this.add
      .rexCanvas(0, 0, cam.width * scale, cam.height * scale)
      .setInteractive()
      .setOrigin(0, 0)
      .setScale(1 / scale)
      .needRedraw()
    //  We can access the underlying Canvas context like this:
    // var grd = texture.context.createLinearGradient(0, 0, 0, 256)

    // grd.addColorStop(0, '#8ED6FF')
    // grd.addColorStop(1, '#004CB3')
    this.ctx = this.canvas.getContext('2d')

    this.ctx.fillStyle = 'red'
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1 * scale
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'

    // ctx.fillRect(0, (this.cameras.main.height - this.cameras.main.width) / 2, this.cameras.main.width, this.cameras.main.width)

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    // ctx.stroke()

    //  Call this if running under WebGL, or you'll see nothing change
    // this.texture.refresh()
    // let img = this.add
    //   .image(
    //     this.cameras.main.width / 2,
    //     this.cameras.main.height / 2,
    //     'gradient'
    //   )
    //   .setScale(1 / scale)
    //   .setInteractive()
    // 设置相机的位置
    // cam.y = (cam.height - cam.width) / 2

    this.input.addPointer(1)
    let start1 = {}
    let start2 = {}
    // 控制模式
    let controlMode = false

    this.input.on('pointerdown', (pointer) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        controlMode = true
        start1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        start2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }
      } else {
        if (!controlMode) {
          this.ctx.beginPath()

          this.ctx.moveTo(pointer.worldX * scale, pointer.worldY * scale)
        }
      }
    })

    this.input.on('pointermove', (pointer, localX, localY, event) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        // console.log(this.input.pointer1)
        let end1 = {
          x: this.input.pointer1.worldX,
          y: this.input.pointer1.worldY,
        }
        let end2 = {
          x: this.input.pointer2.worldX,
          y: this.input.pointer2.worldY,
        }

        let offsetX = end1.x - start1.x
        let offsetY = end1.y - start1.y

        let res1 = (end1.x - start1.x) * (end2.x - start2.x)
        let res2 = (end1.y - start1.y) * (end2.y - start2.y)

        cam.scrollX -= (offsetX * 0.2) / cam.zoom
        cam.scrollY -= (offsetY * 0.2) / cam.zoom

        if (Math.abs(res1) < 1000 || Math.abs(res2) < 1000) {
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
          if (
            cam.zoom + (newLen - preLen) / 1000 < 5 &&
            cam.zoom + (newLen - preLen) / 1000 > 0.5
          ) {
            cam.zoom += (newLen - preLen) / 1000
          }

          let rad1 = Phaser.Math.Angle.BetweenPoints(start1, start2)
          let deg1 = Phaser.Math.RadToDeg(rad1)
          let rad2 = Phaser.Math.Angle.BetweenPoints(end1, end2)
          let deg2 = Phaser.Math.RadToDeg(rad2)
          let deg = Phaser.Math.Angle.ShortestBetween(deg1, deg2)
          let angle = Phaser.Math.DegToRad(deg)

          cam.rotation += angle * 0.1
        }
      } else {
        if (!controlMode) {
          this.ctx.lineTo(pointer.worldX * scale, pointer.worldY * scale)
          this.ctx.stroke()
        }
      }
    })

    this.input.on('pointerup', () => {
      // 两个触点抬起来
      if (
        controlMode &&
        !this.input.pointer1.isDown &&
        !this.input.pointer2.isDown
      ) {
        controlMode = false
        start1 = {}
        start2 = {}
      } else {
        if (!controlMode) {
          this.ctx.closePath()
        }
      }
    })
  }

  update() {
    this.canvas.updateTexture()
  }
}

export default DrawingPad
