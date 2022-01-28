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
    this.load.image("ship", "assets/sprites/fmship.png")
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1024, 2048)
    this.add.image(0, 0, "map").setOrigin(0).setScrollFactor(1)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.ship = this.physics.add.image(400.5, 301.3, "ship")

    this.cameras.main.startFollow(this.ship, true, 0.09, 0.09)
    this.cameras.main.setZoom(4)
  }

  update() {
    this.ship.setVelocity(0)
    if (this.cursors.left.isDown) {
      this.ship.setAngle(-90).setVelocityX(-200)
    } else if (this.cursors.right.isDown) {
      this.ship.setAngle(90).setVelocityX(200)
    } else if (this.cursors.up.isDown) {
      this.ship.setAngle(0).setVelocityY(-200)
    } else if (this.cursors.down.isDown) {
      this.ship.setAngle(-180).setVelocityY(200)
    }
  }
}

export default Example
