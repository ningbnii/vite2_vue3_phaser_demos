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
    this.load.atlas('cube', 'cube.png', 'cube.json')
  }

  create() {
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNames('cube', { prefix: 'frame', start: 1, end: 23 }),
      frameRate: 50,
      repeat: -1,
    })

    const colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c]

    const sprite1 = this.add.sprite(this.center.x, 200, 'cube').setTint(colors[0])
    const sprite2 = this.add.sprite(this.center.x, 300, 'cube').setTint(colors[1])
    const sprite3 = this.add.sprite(this.center.x, 400, 'cube').setTint(colors[2])

    //  Play the 'spin' animation
    sprite1.play({ key: 'spin' })

    // 可以动态修改动画的配置
    //  Play the animation and override the default frameRate with a new one
    sprite2.play({ key: 'spin', frameRate: 20 })

    //  Play the animation and set the repeatDelay to 250ms
    sprite3.play({ key: 'spin', repeatDelay: 250 })
  }
}

export default Example
