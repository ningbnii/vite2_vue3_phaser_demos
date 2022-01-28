class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("ship", "assets/sprites/fmship.png")
    this.load.tilemapTiledJSON("map", "assets/tilemaps/maps/super-mario.json")
    this.load.image("tiles1", "assets/tilemaps/tiles/super-mario.png")
  }

  create() {
    // 相机边界
    this.cameras.main.setBounds(0, 0, 3392, 100)
    // 物理世界边界
    this.physics.world.setBounds(0, 0, 3392, 240)

    var map = this.make.tilemap({ key: "map" })
    var tileset = map.addTilesetImage("SuperMarioBros-World1-1", "tiles1")
    var layer = map.createLayer("World1", tileset, 0, 0)

    this.cursors = this.input.keyboard.createCursorKeys()

    // 不能超出边界
    this.ship = this.physics.add.image(400, 100, "ship").setAngle(90).setCollideWorldBounds(true)

    this.cameras.main.startFollow(this.ship, true, 0.08, 0.08)
    this.cameras.main.setZoom(2.5)
  }

  update() {
    this.ship.setVelocity(0)
    if (this.cursors.left.isDown) {
      this.ship.setAngle(-90).setVelocityX(-200)
    } else if (this.cursors.right.isDown) {
      this.ship.setAngle(90).setVelocityX(200)
    }
    if (this.cursors.up.isDown) {
      this.ship.setVelocityY(-200)
    } else if (this.cursors.down.isDown) {
      this.ship.setVelocityY(200)
    }
  }
}

export default Example
