class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("star", "assets/demoscene/star2.png")
    this.load.image("bigStar", "assets/demoscene/star3.png")
    this.load.image("ship", "assets/sprites/shmup-ship2.png")
    this.load.spritesheet("face", "assets/sprites/metalface78x92.png", { frameWidth: 78, frameHeight: 92 })
  }

  create() {
    // 设置物理世界的边界
    this.matter.world.setBounds(0, 0, 3200, 600)
    // 设置相机的边界
    this.cameras.main.setBounds(0, 0, 3200, 600).setName("main")
    this.minimapWidth = 400
    this.minimapZoom = 0.2
    this.minimap = this.cameras
      .add(this.center.x - this.minimapWidth / 2, 0, this.minimapWidth, 100)
      .setZoom(this.minimapZoom)
      .setName("mini")
    this.minimap.setBackgroundColor(0x002244)
    // this.minimap.scrollX = 3200 // 移动到世界的中心位置
    this.minimap.scrollY = 300

    // 添加星星背景
    this.createStarfield()
    // 添加风景
    this.createLandscape()
    // 画外形人
    this.createAliens()

    // add a player ship and camera follow
    this.player = this.matter.add.sprite(1600, 200, "ship")
    // 设置固定旋转将主体惯性设置为无穷大，这会在对其施加力时阻止其旋转。
    this.player.setFixedRotation()
    this.player.setFrictionAir(0.1)
    this.player.setMass(30)

    // 将相机设置为跟随游戏对象。
    // 启用后，相机将自动调整其滚动位置以将目标游戏对象保持在其中心。
    this.cameras.main.startFollow(this.player, false, 0.2, 0.2)
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      // 将推力施加到身体的后部位置。
      //根据质量和所需速度使用非常小的值，例如 0.1。
      this.player.thrustBack(0.1)
      // 游戏对象的水平翻转状态。
      //水平翻转的游戏对象将在水平轴上反转。 翻转总是从纹理的中间进行，不会影响比例值。 如果这个游戏对象有一个物理体，它不会改变这个体。 这只是一个渲染切换。
      this.player.flipX = true
    } else if (this.cursors.right.isDown) {
      this.player.thrust(0.1)
      this.player.flipX = false
    } else if (this.cursors.up.isDown) {
      // 将推力施加到身体的左侧位置。
      // 面向坐标原点，身体的左侧
      this.player.thrustLeft(0.1)
    } else if (this.cursors.down.isDown) {
      // 面向坐标原点，身体的右侧
      this.player.thrustRight(0.1)
    }

    // clamp 通过将值限制在最小值、最大值范围内来强制边界内的值。
    // 小相机的宽度是400
    // 超出滚动范围后，小视图就不再滚动了
    // 滚动最小值：(x*(1-y))/(2*y)
    let minScrollX = (this.minimapWidth * (1 - this.minimapZoom)) / (2 * this.minimapZoom)
    // 滚动最大值3200 - x*(1+y)/(2*y)
    let maxScrollX = 3200 - (this.minimapWidth * (1 + this.minimapZoom)) / (2 * this.minimapZoom)
    this.minimap.scrollX = Phaser.Math.Clamp(this.player.x - this.minimapWidth / 2, minScrollX, maxScrollX)
    // this.minimap.scrollX = this.player.x - this.minimapWidth / 2
  }

  createStarfield() {
    // 创建256个小星星
    var group = this.add.group({ key: "star", frameQuantity: 256 })
    // 创建32个大星星
    group.createMultiple({ key: "bigStar", frameQuantity: 32 })
    var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550)
    // 将group随机摆放在矩形区域内
    Phaser.Actions.RandomRectangle(group.getChildren(), rect)
    group.children.iterate(function (child, index) {
      // 最大0.3
      var sf = Math.max(0.3, Math.random())
      // 大星星
      if (child.texture.key === "bigStar") {
        sf = 0.2
      }
      // 跟随背景移动的参数，越小移动越慢
      child.setScrollFactor(sf)
      // 小相机中不显示星星
      this.minimap.ignore(child)
    }, this)
  }

  // 画一个山
  createLandscape() {
    // 画一个随机的图形
    var landscape = this.add.graphics()
    landscape.fillStyle(0x008800, 1)
    landscape.lineStyle(2, 0x00ff00, 1)

    landscape.beginPath()
    landscape.fillRect(1600, 0, 50, this.height)
    landscape.closePath()
    landscape.strokePath()

    landscape.beginPath()

    var maxY = 550
    var minY = 400
    var x = 0
    var y = maxY
    var range = 0
    var up = true

    landscape.moveTo(0, 600)
    landscape.lineTo(0, 550)
    do {
      range = Phaser.Math.Between(20, 100)
      if (up) {
        y = Phaser.Math.Between(y, minY)
        up = false
      } else {
        y = Phaser.Math.Between(y, maxY)
        up = true
      }
      landscape.lineTo(x + range, y)
      x += range
    } while (x < 3100)

    landscape.lineTo(3200, maxY)
    landscape.lineTo(3200, 600)

    landscape.closePath()

    landscape.strokePath()
    landscape.fillPath()
  }

  createAliens() {
    // create some random aliens
    let config = {
      key: "metaleyes",
      frames: this.anims.generateFrameNumbers("face", { start: 0, end: 3 }),
      frameRate: 20,
      repeat: -1,
    }
    this.anims.create(config)
    for (let i = 0; i < 32; i++) {
      let x = Phaser.Math.Between(100, 3100)
      let y = Phaser.Math.Between(100, 300)

      const face = this.matter.add.sprite(x, y, "face").play("metaleyes")
      // setFrictionAir : 为此游戏对象的物质体设置新的空气阻力。 值 0 表示 Body 在空间中移动时永远不会减速。 该值越高，身体在空间中移动时减速越快。
      face.setFrictionAir(0)
      // 设置游戏对象的物质体的质量。
      face.setMass(1)
      //设置此游戏对象的比例。
      face.setScale(0.5)

      const direction = Math.random() > 0.5 ? -1 : 1
      // 设置物理体的水平和垂直速度。
      face.setVelocity(Phaser.Math.Between(1, 5) * direction, Phaser.Math.Between(1, 5) * direction)
    }
  }
}

export default Example
