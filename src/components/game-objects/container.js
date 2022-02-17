class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    })
    // super('SceneA')
    this.stars = []
    this.cameraRotation = 0
  }

  preload() {
    this.load.image('metal', 'assets/textures/alien-metal.jpg')
    this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json')
  }

  create() {
    var colorsTable = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00, 0x00ffff]
    for (var i = 0; i < 500; ++i) {
      let starGraphics = this.add.graphics({ x: Math.random() * 800, y: Math.random() * 600 })
      this.drawStar(starGraphics, 0, 0, 5, 100, 50, colorsTable[Math.floor(Math.random() * 6)], 0xff0000)
      starGraphics.fillRect(100, 100, 100, 100)
      starGraphics.rotation = Math.random()
      starGraphics.scaleX = 0.1 + Math.abs(Math.sin(starGraphics.rotation)) * 0.2
      starGraphics.scaleY = 0.1 + Math.abs(Math.sin(starGraphics.rotation)) * 0.2
      this.stars.push(starGraphics)
    }
  }
  update() {
    for (var i = 0; i < this.stars.length; ++i) {
      var star = this.stars[i]
      star.rotation += 0.01
      star.scaleX = 0.1 + Math.abs(Math.sin(star.rotation)) * 0.2
      star.scaleY = 0.1 + Math.abs(Math.sin(star.rotation)) * 0.2
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
