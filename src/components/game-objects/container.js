class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    })
    // super('SceneA')
    this.time1 = 0
    this.inc = 0
  }

  preload() {
    this.load.image('metal', 'assets/textures/alien-metal.jpg')
    this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json')
  }

  create() {
    this.graphics = this.add.graphics({ x: 400, y: 300 })

    this.palette = [0, 1911635, 8267091, 34641, 11227702, 6248271, 12764103, 16773608, 16711757, 16753408, 16772135, 58422, 2731519, 8615580, 16742312, 16764074]
  }
  cos(f) {
    return Math.cos(f * (Math.PI * 2))
  }

  sin(f) {
    return Math.sin(f * (Math.PI * 2))
  }
  update() {
    this.time1 += 0.03

    this.time1 = Phaser.Math.Wrap(this.time1, -32765, 32765)
    this.graphics.clear()

    let f = this.time1 / 9
    let n = 650 + 60 * this.sin(f / 3)

    for (let i = 0; i < n; i++) {
      let a = f + Math.random()
      let d = 0.3 + Math.random() * 2
      let y = -2

      if (i > 400) {
        let j = i - 400
        y = (y * 2) / n - 1
        a = (j * 40) / n + f + j / 3
        d = (j * 3) / n
      }

      let x = d * this.cos(a)
      let z = 2 + this.cos(f) + d * this.sin(a)
      x = 64 + (x * 64) / z
      y = 64 + (y * 64) / z

      let c = 6 + (i % 5)
      let e = 5 / z

      if (z > 0.1) {
        this.graphics.fillStyle(this.palette[c])
        if (i > 400) {
          this.graphics.fillCircle(x, y, e)
        } else {
          this.graphics.fillRect(x, y, e, e)
        }
      }
    }
  }

  drawStar(graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor) {
    var rot = (Math.PI / 2) * 3 // 初始弧度
    var x = cx
    var y = cy
    var step = Math.PI / spikes // 每个角之间的弧度间隔
    graphics.lineStyle(10, lineColor, 1)
    graphics.fillStyle(color, 1)
    graphics.beginPath()
    graphics.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      graphics.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      rot += step
    }

    graphics.lineTo(cx, cy - outerRadius)
    graphics.closePath()
    graphics.fillPath()
    graphics.strokePath()
  }
}

class SceneB extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneB', active: false })
  }

  create() {
    // this.cameras.main.setBackgroundColor(0xff0000);
    this.cameras.main.setViewport(100, 100, 600, 400)

    var graphics = this.add.graphics()

    graphics.fillStyle(0x00ff00, 1)

    graphics.beginPath()

    graphics.moveTo(400, 100)
    graphics.lineTo(200, 278)
    graphics.lineTo(340, 430)
    graphics.lineTo(650, 300)
    graphics.lineTo(700, 180)
    graphics.lineTo(600, 80)

    graphics.closePath()
    graphics.fillPath()
  }
}

class SceneC extends Phaser.Scene {
  constructor() {
    super('SceneC')
  }

  create() {
    this.add.image(400, 300, 'megaset', 'cactuar')

    const graphics = this.add.graphics()

    graphics.fillStyle(0xffff00, 0.8)
    graphics.fillTriangle(400, 400, 690, 50, 780, 300)
  }
}

export { SceneA, SceneC, SceneB }
