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
    // animation set in json
    const gems_animation = new URL('../../assets/animations/gems.json', import.meta.url).href
    this.load.atlas('gems', gems_png, gems_json)
    this.load.animation('gemData', gems_animation)
  }

  create() {
    this.add.text(this.center.x, 32, 'animations from animation JSON file', { color: '#00ff00' }).setOrigin(0.5, 0)

    this.add.sprite(this.center.x, 200, 'gems').play('diamond')
    this.add.sprite(this.center.x, 300, 'gems').play('prism')
    this.add.sprite(this.center.x, 400, 'gems').play('ruby')
    this.add.sprite(this.center.x, 500, 'gems').play('square')
  }
}

export default Example
