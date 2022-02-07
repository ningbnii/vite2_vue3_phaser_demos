class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("bg", "assets/pics/the-end-by-iloe-and-made.jpeg")
    this.load.image("ship", "assets/sprites/x2kship.png")
  }

  create() {
    // 设置相机的边界和物理世界的边界，两个边界设置成一样的
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2)

    // this.cameras.main.setZoom(0.2)
    this.add.image(0, 0, "bg").setOrigin(0)
    // setFlipX 水平翻转, setFlipY 水平翻转
    this.add.image(1920, 0, "bg").setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, "bg").setOrigin(0).setFlipY(true)
    this.add.image(1920, 1080, "bg").setOrigin(0).setFlipX(true).setFlipY(true)

    // 键盘控制
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = this.physics.add.image(400, 300, "ship")
    // 不能出边界
    this.player.setCollideWorldBounds(true)

    this.cameras.main.startFollow(this.player, true)
    /**
     * 正常位置应该是位于相机的中心，-300表示向x轴负方向偏移300
     * 将相机从实际目标 x/y 坐标偏移这个量。
     * y 轴坐标不变，仍在视口中心位置
     */
    this.cameras.main.followOffset.set(-300, 0)
  }

  update() {
    this.player.setVelocity(0)

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500)
      // 水平翻转
      this.player.setFlipX(true)
      this.cameras.main.followOffset.x = 300
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500)
      this.player.setFlipX(false)
      this.cameras.main.followOffset.x = -300
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-500)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(500)
    }
  }
}

export default Example
