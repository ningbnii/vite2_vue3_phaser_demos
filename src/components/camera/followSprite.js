class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("CherilPerils", "assets/camera/CherilPerils.png")
    this.load.image("clown", "assets/sprites/clown.png")
    this.iter = 3.14
  }

  create() {
    this.add.image(0, 0, "CherilPerils").setOrigin(0)
    // 设置相机窗口大小
    this.cameras.main.setSize(400, 300)

    // 新增一个相机
    const cam2 = this.cameras.add(400, 0, 400, 300)
    const cam3 = this.cameras.add(0, 300, 400, 300)
    const cam4 = this.cameras.add(400, 300, 400, 300)

    this.clown = this.add.image(450 + Math.cos(this.iter) * 200, 510 + Math.sin(this.iter) * 200, "clown")

    // 相机跟随精灵移动
    this.cameras.main.startFollow(this.clown)
    cam2.startFollow(this.clown, false, 0.5, 0.5)
    cam3.startFollow(this.clown, false, 0.1, 0.1)
    // lerpX，介于0和1之间，默认是1，表示相机跟踪的速度，越大则越快，越小则越慢，为0则相机不动
    cam4.startFollow(this.clown, false, 0.05, 0.05)
  }

  update() {
    this.clown.x = 450 + Math.cos(this.iter) * 200
    this.clown.y = 510 + Math.sin(this.iter) * 200
    this.iter += 0.02
  }
}

export default Example
