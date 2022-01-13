// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('gems', 'gems.png', 'gems.json')
  }

  create() {
    const diamond = this.anims.create({
      key: 'diamond',
      frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
      repeat: -1,
    })

    const prism = this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 })
    const ruby = this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
    const square = this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 })

    let keys = ['diamond', 'prism', 'ruby', 'square', 'square']

    let x = 30
    let y = 100
    for (let i = 0; i < 35; i++) {
      this.add.sprite(x, y, 'gems').play(keys[Phaser.Math.Between(0, 4)])
      x += 100
      if (x >= this.width) {
        x = 30
        y += 100
      }
    }

    // 监听动画移除事件
    this.anims.on(
      Phaser.Animations.Events.REMOVE_ANIMATION,
      function (key, anim) {
        this.changeText('Animation ' + key + ' has been removed')
      },
      this
    )

    this.input.on(
      'pointerdown',
      function () {
        // 把square动画给移除了
        this.anims.remove('square')
      },
      this
    )
  }
}

export default Example
