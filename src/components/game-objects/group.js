class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image('phaser', 'assets/sprites/phaser.png')
    this.load.image('atari', 'assets/sprites/atari400.png')
    this.load.image('bikku', 'assets/sprites/bikkuriman.png')
    this.load.image('block', 'assets/sprites/block.png')
    this.load.image('can', 'assets/sprites/cokecan.png')
  }

  create() {
    var group = this.add.group()

    group.create(230, 200, 'atari')
    group.create(400, 200, 'phaser')
    group.create(480, 200, 'bikku')
    group.create(540, 200, 'block')
    group.create(600, 200, 'can')

    this.input.on('pointerdown', () => {
      Phaser.Actions.Shuffle(group.getChildren())
      var children = group.getChildren()
      for (let i = 0; i < children.length; i++) {
        children[i].setDepth(i)
      }
    })
  }
}

export default Example
