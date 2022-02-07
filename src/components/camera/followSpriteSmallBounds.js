class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.moveCam = false
  }

  preload() {
    this.load.image("bg", "assets/pics/backscroll.png")
    this.load.image("block", "assets/sprites/crate32.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 720 * 2, 176)

    for (let x = 0; x < 2; x++) {
      this.add.image(720 * x, 0, "bg").setOrigin(0)
    }

    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = this.physics.add.image(400, 100, "block")
    // this.player.setCollideWorldBounds(true)
    // 将相机位置四舍五入为整数以避免亚像素渲染, 默认假。
    this.cameras.main.startFollow(this.player, true)
    // 放大2倍
    this.cameras.main.setZoom(2)
  }

  update() {
    const cam = this.cameras.main

    this.player.setVelocity(0)

    if (this.moveCam) {
      if (this.cursors.left.isDown) {
        cam.scrollX -= 4
      } else if (this.cursors.right.isDown) {
        cam.scrollX += 4
      }

      if (this.cursors.up.isDown) {
        cam.scrollY -= 4
      } else if (this.cursors.down.isDown) {
        cam.scrollY += 4
      }
    } else {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-400)
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(400)
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-400)
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(400)
      }
    }
  }
}

export default Example
