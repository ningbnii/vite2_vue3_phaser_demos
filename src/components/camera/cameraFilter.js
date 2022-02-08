var UIText1, UIText2, UIText3, UI_CAM_1, UI_CAM_2
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    const image = this.add.image(400, 300, "einstein")
    UIText1 = this.add.text(0, 32, "0")
    UIText2 = this.add.text(0, 64, "0")
    UIText3 = this.add.text(500, 64, "0")

    UI_CAM_1 = this.cameras.add()
    UI_CAM_2 = this.cameras.add()

    // 获取所有相机的数组
    this.camlist = this.cameras.cameras

    // 给某个对象添加相机滤镜，给相机添加相应的效果后，就会应用到这些对象上面
    // 控制此游戏对象是否由相机绘制的位掩码。
    // 通常不直接设置，而是调用`Camera.ignore`，但是你可以
    // 直接使用 Camera.id 属性设置此属性：
    UIText1.cameraFilter = this.setCamera(UI_CAM_1)
    UIText2.cameraFilter = this.setCamera(UI_CAM_1)
    UIText3.cameraFilter = this.setCamera(UI_CAM_2)

    image.cameraFilter = this.setCamera(this.cameras.main)
  }

  update() {
    UIText1.setText("UI Camera 1")
    UIText2.setText("main camera rotation: " + this.cameras.main.rotation)
    UIText3.setText("UI Camera 2")

    UI_CAM_1.scrollY = Math.sin(this.time.now / 100) * 10
    UI_CAM_2.scrollX = Math.sin(this.time.now / 100) * 10

    this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
    this.cameras.main.rotation += 0.01
  }

  setCamera(cam) {
    let l = (1 << this.camlist.length) - 1
    return l & ~cam.id
  }
}

export default Example
