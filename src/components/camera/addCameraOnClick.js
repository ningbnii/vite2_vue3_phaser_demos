class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("einstein", "assets/pics/ra-einstein.png")
  }

  create() {
    this.image = this.add.image(100, 70, "einstein")
    this.cameras.main.setSize(100, 150)

    let x = 100
    let y = 0

    this.input.on("pointerdown", function () {
      if (this.cameras.getTotal() < 32) {
        // getTotal()获取相机数量
        this.cameras.add(x, y, 100, 150)
        x += 100
        // 换行
        if (x === 800) {
          x = 0
          y += 150
        }
      }
    })
  }

  update() {
    this.image.rotation += 0.01
  }
}

export default Example
