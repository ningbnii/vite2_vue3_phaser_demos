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
    this.load.atlas('lazer', 'lazer.png', 'lazer.json')
  }

  create() {
    this.anims.create({
      key: 'blast',
      frames: this.anims.generateFrameNames('lazer', { prefix: 'lazer_', end: 22, zeroPad: 2 }),
      repeat: -1,
    })

    let group = this.add.group()
    //创建多个游戏对象并将它们添加到该组中。
    group.createMultiple({ key: 'lazer', frame: 'lazer_22', repeat: 39, setScale: { x: 0.25, y: 0.25 } })
    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 20,
      height: 2,
      cellWidth: 32,
      cellHeight: 280,
      x: -50,
      y: -220,
    })

    this.anims.staggerPlay('blast', group.getChildren(), 20)
  }
}

export default Example
