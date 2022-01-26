class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "ui" })
  }

  create() {
    const text = this.add.text(10, 10).setText("click to move")
    text.setShadow(1, 1, "#000000", 2)

    // 获取world场景的相机
    const worldCamera = this.scene.get("world").cameras.main

    this.input.on("pointermove", function (pointer) {
      // 将当前场景中的pointer转换成world场景中坐标
      const pos = worldCamera.getWorldPoint(pointer.x, pointer.y)
      text.setText(["world: " + pos.x + " x " + pos.y, "Camera: " + worldCamera.midPoint.x + " x " + worldCamera.midPoint.y])
    })
  }
}

class WorldScene extends Phaser.Scene {
  constructor(width, height, changeText) {
    super({ key: "world" })
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("map", "assets/camera/earthbound-scarab.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1024, 2048)
    this.add.image(0, 0, "map").setOrigin(0)
    this.cameras.main.setZoom(1)
    this.cameras.main.centerOn(0, 0)

    let pos = 0
    this.input.on("pointerdown", function () {
      var cam = this.cameras.main
      if (pos === 0) {
        cam.pan(767, 1096, 2000, "Power2")
        cam.zoomTo(4, 3000)
        pos++
      } else if (pos === 1) {
        cam.pan(703, 1621, 2000, "Elastic")
        cam.zoomTo(2, 3000)
        pos++
      } else if (pos === 2) {
        cam.pan(256, 623, 2000, "Sine.easeInOut")
        cam.zoomTo(1, 3000)
        pos++
      } else if (pos === 3) {
        cam.pan(166, 304, 2000)
        cam.zoomTo(4, 1500)
        pos++
      } else if (pos === 4) {
        cam.pan(624, 158, 2000)
        cam.zoomTo(0.8, 3000)
        pos++
      } else if (pos === 5) {
        cam.pan(600, 330, 2000)
        pos++
      } else if (pos === 6) {
        cam.pan(748, 488, 2000)
        cam.zoomTo(1, 1000)
        pos++
      } else if (pos === 7) {
        cam.pan(1003, 1719, 2000)
        pos++
      } else if (pos === 8) {
        cam.pan(0, 0, 500)
        pos = 0
      }
    })
    this.scene.launch("ui")
  }
}

export { UIScene, WorldScene }
