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
    this.load.path = 'assets/cybercity/'
    this.load.multiatlas('cybercity', 'cybercity-multi.json', this.load.path)
  }

  create() {
    this.anims.create({ key: 'fly', frames: this.anims.generateFrameNames('cybercity', { start: 0, end: 98 }), repeat: -1 })
    this.add.sprite(this.center.x, this.center.y).play('fly')
  }
}

export default Example
