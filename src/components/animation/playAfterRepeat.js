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
    this.load.atlas('alien', 'alien.png', 'alien.json')
    this.load.image('bg', 'space-wreck.jpg')
  }

  create() {
    this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0).setScale(1, 1.5)

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('alien', { prefix: '01_Idle_', end: 17, zeroPad: 3 }),
      repeat: -1,
      repeatDelay: 500,
      frameRate: 18,
    })

    this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('alien', { prefix: '02_Turn_to_walk_', end: 3, zeroPad: 3 }), frameRate: 12 })
    this.anims.create({ key: 'walk', frames: this.anims.generateFrameNames('alien', { prefix: '03_Walk_', end: 12, zeroPad: 3 }), repeat: -1, frameRate: 18 })

    let ripley = this.add.sprite(this.center.x, this.center.y, 'alien').play('idle')

    this.input.on('pointerdown', function () {
      // ripley.anims.getName() 获取当前帧的名称
      if (ripley.anims.getName() === 'idle') {
        ripley.anims.playAfterRepeat('turn')
        // 设置一个动画或一组动画，在当前动画完成或停止后在未来播放。
        // turn结束后播放walk
        ripley.anims.chain('walk')
      } else {
        ripley.anims.play('idle')
      }
    })
  }
}

export default Example
