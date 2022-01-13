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
    this.load.atlas('sf2', 'sf2.png', 'sf2.json')
  }

  create() {
    this.anims.create({
      key: 'ryu',
      frames: this.anims.generateFrameNames('sf2', { prefix: 'frame_', end: 22 }),
      repeat: 3,
      frameRate: 20,
    })

    let sprite = this.add.sprite(this.center.x, this.center.y, 'sf2', 'frame_0').setScale(2)
    let text = this.add.text(this.center.x, 32, 'click to start animation', { color: '#00ff00' }).setOrigin(0.5, 0)

    let log = []
    let u = 0
    let ui = 0

    // 动画开始时候
    sprite.on(Phaser.Animations.Events.ANIMATION_START, function (anim, frame, gemeObject) {
      log.push('ANIMATION_START')
      text.setText(log)
      u = 0
      ui = 0
    })

    // 动画结束
    sprite.on(Phaser.Animations.Events.ANIMATION_STOP, function (anim, frame, gameObject) {
      log.push('ANIMATION_STOP')
      text.setText(log)
      u = 0
      ui = 0
    })

    // 动画更新
    sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
      if (u === 0) {
        log.push('ANIMATION_UPDATE x0')
        ui = log.length - 1 // log的数量
      } else {
        log[ui] = 'ANIMATION_UPDATE x' + u.toString()
      }
      u++
      text.setText(log)
    })

    // 动画重复
    sprite.on(Phaser.Animations.Events.ANIMATION_REPEAT, function (anim, frame, gameObject) {
      u = 0
      log.push('ANIMATION_REPEAT')
      text.setText(log)
    })

    // 动画完成
    sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (anim, frame, gameObject) {
      log.push('ANIMATION_COMPLETE')
      text.setText(log)
    })

    this.input.on('pointerdown', function () {
      if (sprite.anims.isPlaying) {
        sprite.stop()
      } else {
        log = []
        sprite.play('ryu')
      }
    })
  }
}

export default Example
