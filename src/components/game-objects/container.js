class Example extends Phaser.Scene {
  constructor() {
    super()
    this.iter = 0
  }

  preload() {
    this.load.image('mushroom', 'assets/sprites/mushroom2.png')
  }

  create() {
    var image1 = this.add.image(0, -30, 'mushroom')
    var image2 = this.add.image(-40, 30, 'mushroom')
    var image3 = this.add.image(40, 30, 'mushroom')
    this.container = this.add.container(400, 200, [image1, image2, image3]).setSize()
    this.container.setSize(128, 64)
    this.physics.world.enable(this.container)
    this.container.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true)
  }
}

export default Example
