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
    this.load.atlas('knight', 'knight.png', 'knight.json')
    this.load.image('bg', 'clouds.png')
    this.load.spritesheet('tiles', 'fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0).setScale(1, 1.2)
    this.ground = this.add.tileSprite(0, this.height - 64, this.width, 64, 'tiles', 1).setOrigin(0)

    this.add.text(this.center.x, 8, 'tweening the animation.timescale', { color: '#ffffff' }).setOrigin(0.5, 0)

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('knight', { prefix: 'run/frame', end: 7, zeroPad: 4 }),
      frameRate: 12,
      repeat: -1,
    })

    this.lancelot = this.add
      .sprite(this.center.x, this.height - 64, 'knight')
      .setOrigin(0.5, 1)
      .setScale(4)
      .play('run')

    this.tweens.add(
      {
        targets: this.lancelot.anims,
        timeScale: { from: 0.5, to: 2 }, // 加速度
        ease: 'Sine.inOut',
        yoyo: true, // 加速跑，然后缓慢停下来
        repeat: -1,
        repeatDelay: 1000,
        hold: 1000, //在 yoyo'ing 之前保持补间的毫秒数。
        duration: 3000,
      },
      this
    )
  }

  update() {
    this.bg.tilePositionX += 3 * this.lancelot.anims.timeScale
    this.ground.tilePositionX += 6 * this.lancelot.anims.timeScale
  }
}

export default Example
