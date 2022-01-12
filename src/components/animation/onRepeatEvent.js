// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.data = {}
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('knight', 'knight.png', 'knight.json')
    this.load.image('bg', 'clouds.png')
    this.load.spritesheet('tiles', 'fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0)
    for (let i = 0; i < 13; i++) {
      this.add.image(64 * i, this.height - 64, 'tiles', 1).setOrigin(0)
    }
    this.add.text(this.center.x, 8, 'click to repeat animation', { color: '#ffffff' }).setOrigin(0.5, 0)

    // 攻击动画
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('knight', { prefix: 'attack_A/frame', end: 13, zeroPad: 4 }),
      frameRate: 12,
      repeat: -1,
    })

    // 硬币动画
    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNames('tiles', { start: 42, end: 47 }),
      frameRate: 12,
      repeat: -1,
    })

    let lancelot = this.add.sprite(0, this.height - 60, 'knight', 'attack_A/frame0000')
    lancelot.setOrigin(0, 1)
    lancelot.setScale(4)

    // event handler for when the animation completes on our sprite
    lancelot.on(
      Phaser.Animations.Events.ANIMATION_REPEAT,
      function () {
        this.releaseItem()
      },
      this
    )

    // add a click handler to start the animation playing
    // 只触发一次
    this.input.once('pointerdown', function () {
      // @param ignoreIfPlaying If an animation is already playing then ignore this call. Default false.
      // ignoreIfPlaying=true,动画播放完才能再次播放，false，则可以中断播放，从头开始
      lancelot.play('attack')
    })
  }

  releaseItem() {
    let item = this.add.sprite(this.center.x - 32, this.height - 100).play('coin')

    this.tweens.add({
      targets: item,
      props: {
        y: {
          value: -64,
          ease: 'Linear',
          duration: 3000,
        },
        x: {
          value: '+=128',
          ease: 'Sine.inOut',
          duration: 500,
          yoyo: true,
          repeat: 4,
        },
      },
      onComplete: function () {
        item.destroy()
      },
    })
  }
}

export default Example
