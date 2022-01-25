class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("map", "assets/camera/earthbound-scarab.png")
  }

  create() {
    // 设置相机的边界
    this.cameras.main.setBounds(0, 0, 1024, 2048)
    this.add.image(0, 0, "map").setOrigin(0)
    // 设置缩放比例
    this.cameras.main.setZoom(1)
    // 设置中心点
    this.cameras.main.centerOn(0, 0)
    // setScrollFactor 设置相机的滚动因子，如果设置成1，就是随相机完全同步，0表示不跟随相机移动
    this.text = this.add.text(this.center.x, 230).setText("CLICK TO MOVE").setScrollFactor(0).setOrigin(0.5)
    this.text.setShadow(1, 1, "#000000", 2)

    let pos = 0
    this.input.on("pointerdown", function () {
      const cam = this.cameras.main
      console.log(pos)
      if (pos == 0) {
        // 滚动相机，定位到给定的坐标，在2s内完成，执行的tweens动画
        cam.pan(767, 1096, 2000)
        // 此效果将在指定的持续时间内轻松地将相机缩放到给定的比例。
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
        cam.zoomTo(0.5, 3000)
        pos++
      } else if (pos === 5) {
        cam.pan(680, 330, 2000)
        pos++
      } else if (pos === 6) {
        cam.pan(748, 488, 2000)
        pos++
      } else if (pos === 7) {
        cam.pan(1003, 1719, 2000)
        pos = 0
      }
    })
  }

  update() {
    let cam = this.cameras.main
    this.text.setText(["click to move", "x: " + cam.scrollX, "y: " + cam.scrollY])
    this.changeText(["click to move", "x: " + cam.scrollX, "y: " + cam.scrollY])
  }
}

export default Example
