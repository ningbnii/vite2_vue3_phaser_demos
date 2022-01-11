class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const gems_png = new URL('../../assets/gems.png', import.meta.url).href
    const gems_json = new URL('../../assets/gems.json', import.meta.url).href
    this.load.atlas('gems', gems_png, gems_json)
  }

  create() {
    this.add.text(this.center.x, 32, 'check the console', { color: '#00ff00' }).setOrigin(0.5, 0)

    this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 })

    this.add.sprite(this.center.x, 200, 'gems').play('diamond')
    this.add.sprite(this.center.x, 300, 'gems').play('prism')
    this.add.sprite(this.center.x, 400, 'gems').play('ruby')
    this.add.sprite(this.center.x, 500, 'gems').play('square')

    //获取单个动画或所有动画的 JSON 表示：
    //您可以提取动画：
    let ruby = this.anims.get('ruby')
    console.log(JSON.stringify(ruby))
    //Or call toJSON directly (this returns an Object)
    console.log(ruby.toJSON())
    //You can also call 'this.anims.toJSON' and pass it the key of the animation you want:
    console.log(this.anims.toJSON('ruby'))

    //  Or dump out ALL animations in the Animation Manager:
    console.log(JSON.stringify(this.anims))
  }
}

export default Example
