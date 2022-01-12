// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('gems', 'gems.png', 'gems.json')
  }

  create() {
    let diamond = this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })
    let prism = this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 })
    let ruby = this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
    let square = this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 })

    let keys = ['diamond', 'prism', 'ruby', 'square', 'square']

    let x = 0
    let y = 116

    for (let i = 0; i < 35; i++) {
      this.add.sprite(x, y, 'gems').play(keys[Phaser.Math.Between(0, 4)])
      x += 100
      if (x >= this.width) {
        x = 0
        y += 100
      }
    }

    this.input.on('pointerdown', function () {
      // 只暂停方块
      if (square.paused) {
        square.resume()
      } else {
        square.pause()
      }
    })
  }
}

export default Example
