class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  // init() {
  //   Phaser.GameObjects.GameObjectFactory.register('robot', function (x, y) {
  //     let sprite = new EnemyRobot(this.scene, x, y)
  //     this.displayList.add(sprite)
  //     this.updateList.add(sprite)

  //     return sprite
  //   })
  // }

  preload() {
    this.load.image('p0', 'assets/particles/red.png')
    this.load.image('p1', 'assets/particles/yellow.png')
    this.load.image('bunny', 'assets/sprites/bunny.png')
  }

  create() {
    this.image = this.add.image(400, 300, 'bunny')
    console.log(this.image.getBounds())
  }
}

export default Example
