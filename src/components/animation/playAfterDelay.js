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
    this.load.atlas('zombie', 'zombie.png', 'zombie.json')
    this.load.image('bg', 'soil.png')
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setAlpha(0.8).setOrigin(0)

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('zombie', { prefix: 'walk_', end: 8, zeroPad: 3 }),
      repeat: -1,
      frameRate: 8,
    })

    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNames('zombie', { prefix: 'Death_', end: 5, zeroPad: 3 }),
      frameRate: 12,
    })

    this.rob = this.add
      .sprite(this.center.x, this.center.y + 200, 'zombie')
      .setOrigin(0.5, 1)
      .play('walk')

    this.input.on(
      'pointerdown',
      function () {
        // 回调函数修改text的值
        this.changeText('Playing death animation in 2000 ms')
        // 2秒后death
        this.rob.anims.playAfterDelay('death', 2000)
      },
      this
    )
  }
}

export default Example
