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
    this.load.spritesheet('boom', 'explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 })
  }

  create() {
    this.anims.create({
      key: 'explode',
      frames: 'boom',
      frameRate: 20,
      repeat: -1,
      repeatDelay: 2000,
    })

    for (let i = 0; i < 256; i++) {
      let x = Phaser.Math.Between(0, this.width)
      let y = Phaser.Math.Between(0, this.height)

      let boom = this.add.sprite(x, y, 'boom', 23)
      //  Each one can have a random start delay
      boom.play({
        key: 'explode',
        delay: Math.random() * 3000,
      })
    }
  }
}

export default Example
