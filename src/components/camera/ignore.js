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

    this.UIText1 = this.add.text(0, 32, "0")
    this.UIText2 = this.add.text(0, 64, "0")

    // add in a new camera, the same size and position as the main camera
    const UICam = this.cameras.add(0, 0, 800, 600)

    // the main camera will not render the UI Text objects
    this.cameras.main.ignore([this.UIText1, this.UIText2])

    // the new UI camera will not render the background image
    UICam.ignore(image)
  }

  update() {
    this.UIText1.setText("main camera rotation: " + this.cameras.main.rotation)
    this.UIText2.setText("main camera zoom: " + this.cameras.main.zoom)

    this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
    // 旋转主相机，UICam不动
    // 不同的对象可以放到不同的相机中控制
    this.cameras.main.rotation += 0.01
  }
}

export default Example
