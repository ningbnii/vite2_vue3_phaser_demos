import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.image("robot", "assets/pics/robota-uxo-by-made-of-bomb.jpeg")
  }

  create() {
    const gui = new dat.GUI()

    this.add.image(0, 0, "robot").setOrigin(0)
    const camera1 = this.cameras.add(0, 0, this.width, this.height)
    gui.addFolder("Camera 1")
    gui.add(camera1, "x")
    gui.add(camera1, "y")
    gui.add(camera1, "width")
    gui.add(camera1, "height")
    gui.add(camera1, "centerToSize")
    // 图片是1920x989
    gui.add(camera1, "scrollX", -1920, 1920)
    gui.add(camera1, "scrollY", -989, 989)
    gui.add(camera1, "zoom", 0, 1, 2).step(0.1)
    gui.add(camera1, "rotation").step(0.01)
    gui.addColor(camera1, "backgroundColor").onChange(function (value) {
      value.a = 255
      camera1.setBackgroundColor(value)
    })
  }
}

export default Example
