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
    this.load.atlas('ryu', 'sf2ryu.png', 'sf2ryu.json')
    this.load.image('sea', 'sf2boat.png')
    this.load.image('ground', 'sf2floor.png')
  }

  create() {
    this.add.image(100, 130, 'sea').setScale(3)
    this.add.image(400, 500, 'ground').setScale(3)

    let info = ['click to toggle animation.yoyo', 'yoyo:true']
    let text = this.add.text(this.center.x, 32, info, { color: '#113355', align: 'center' }).setOrigin(0.5, 0)

    this.anims.create({
      key: 'hadoken',
      frames: this.anims.generateFrameNames('ryu', { prefix: 'frame_', end: 15, zeroPad: 2 }),
      repeat: -1,
      yoyo: true,
    })

    let ryu = this.add.sprite(this.center.x, 350).play('hadoken').setScale(2)

    this.input.on(
      'pointerup',
      function () {
        ryu.anims.yoyo = !ryu.anims.yoyo
        info[1] = 'yoyo: ' + ryu.anims.yoyo
        text.setText(info)
      },
      this
    )
  }
}

export default Example
