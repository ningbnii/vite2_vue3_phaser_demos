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
    this.load.image("block", "assets/sprites/block.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2)

    this.add.image(0, 0, "bg").setOrigin(0)
    this.add.image(1920, 0, "bg").setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, "bg").setOrigin(0).setFlipY(true)
    this.add.image(1920, 1080, "bg").setOrigin(0).setFlipX(true).setFlipY(true)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.player = this.physics.add.image(400, 300, "block")
    this.player.setCollideWorldBounds(true)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
  }

  update() {
    this.player.setVelocity(0)
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500)
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-500)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(500)
    }
  }
}

export default Example
