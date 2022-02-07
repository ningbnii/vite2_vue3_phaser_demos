class MapScene extends Phaser.Scene {
  constructor(width, height, changeText) {
    // 场景名字MapScene
    super("MapScene")
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText

    // 二维空间中向量的表示。
    //  Sphinx
    this.location1 = new Phaser.Math.Vector2(766, 1090)

    //  Oasis
    this.location2 = new Phaser.Math.Vector2(225, 1552)

    //  Tomb
    this.location3 = new Phaser.Math.Vector2(700, 1592)

    //  City Gates
    this.location4 = new Phaser.Math.Vector2(323, 480)

    //  Chair
    this.location5 = new Phaser.Math.Vector2(593, 274)

    //  River Hormuz
    this.location6 = new Phaser.Math.Vector2(180, 1087)

    //  Guard Outpost
    this.location7 = new Phaser.Math.Vector2(168, 163)
  }

  preload() {
    this.load.image("map", "assets/camera/earthbound-scarab.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1024, 2048)
    this.add.image(0, 0, "map").setOrigin(0)

    this.cameras.main.setZoom(1)
    this.cameras.main.centerOn(0, 0)

    var pos = 1

    this.cameras.main.pan
    this.input.on(
      "pointerdown",
      function () {
        var cam = this.cameras.main
        var location = this["location" + pos]

        var rndZoom = Phaser.Math.FloatBetween(0.5, 4)
        // 此效果将滚动相机，使其视口的中心在给定的目的地完成，
        cam.pan(location.x, location.y, 3000, "Sine.easeInOut")
        cam.zoomTo(rndZoom, 3000)
        pos++
        if (pos === 8) {
          pos = 1
        }
      },
      this
    )

    // 加载其他场景
    this.scene.launch("UIScene")
  }
}

class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene")

    this.mapScene
  }

  create() {
    this.mapScene = this.scene.get("MapScene")
    this.mapCamera = this.mapScene.cameras.main

    this.graphics = this.add.graphics()

    this.tooltip1 = this.add.text(0, 0).setText("Sphinx")
    this.tooltip2 = this.add.text(0, 0).setText("Oasis")
    this.tooltip3 = this.add.text(0, 0).setText("Tomb of Ket")
    this.tooltip4 = this.add.text(0, 0).setText("City Gates")
    this.tooltip5 = this.add.text(0, 0).setText("Rest Easy")
    this.tooltip6 = this.add.text(0, 0).setText("River Hormuz")
    this.tooltip7 = this.add.text(0, 0).setText("Guard Outpost")
  }

  update() {
    this.graphics.clear()
    this.updateToolTip(this.mapScene.location1, this.tooltip1)
    this.updateToolTip(this.mapScene.location2, this.tooltip2)
    this.updateToolTip(this.mapScene.location3, this.tooltip3)
    this.updateToolTip(this.mapScene.location4, this.tooltip4)
    this.updateToolTip(this.mapScene.location5, this.tooltip5)
    this.updateToolTip(this.mapScene.location6, this.tooltip6)
    this.updateToolTip(this.mapScene.location7, this.tooltip7)
  }

  updateToolTip(source, tooltip) {
    var basePosition = source
    var camera = this.mapCamera

    // 计算相机移动，缩放之后的相对坐标
    var x = (basePosition.x - camera.worldView.x) * camera.zoom
    var y = (basePosition.y - camera.worldView.y) * camera.zoom

    var graphics = this.graphics

    graphics.fillStyle(0x000000, 0.8)
    graphics.lineStyle(4, 0x000000, 0.8)

    var width = tooltip.width + 32
    var height = tooltip.height + 32

    var bx = x - width / 2
    var by = y - (height + 32)

    // 画一个矩形，把文字框在里面
    graphics.fillRect(bx, by, width, height)
    tooltip.x = bx + 16
    tooltip.y = by + 16
    graphics.lineBetween(bx + 16, by + height, x, y)
  }
}

export { MapScene, UIScene }
