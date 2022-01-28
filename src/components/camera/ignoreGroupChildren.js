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
    this.UIText3 = this.add.text(540, 64, "3")

    // 容器包含对象
    this.cont1 = this.add.container()
    this.cont2 = this.add.container()

    this.cont1.add(this.UIText1)
    this.cont1.add(this.UIText2)
    this.cont2.add(this.UIText3)

    // 组包含容器
    this.group = this.add.group()
    this.group.add(this.cont1)
    this.group.add(this.cont2)

    const UICam = this.cameras.add(0, 0, 800, 600)
    // 忽略整个组
    this.cameras.main.ignore(this.group.getChildren())

    UICam.ignore(image)
  }

  update() {
    this.UIText1.setText("main camera rotation: " + this.cameras.main.rotation)
    this.UIText2.setText("main camera zoom: " + this.cameras.main.zoom)
    this.UIText3.setText("lol: " + this.cont2.y)

    // 摇晃容器
    this.cont2.y = Math.sin(this.time.now / 100) * 10
    this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
    this.cameras.main.rotation += 0.01
  }
}

export default Example
