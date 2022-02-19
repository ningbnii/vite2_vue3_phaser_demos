class Example extends Phaser.Scene {
  constructor() {
    super()
    this.move = 0
  }

  preload() {
    this.load.image('elephant', 'assets/sprites/elephant.png')
    this.load.image('splat', 'assets/pics/splat1.png')
  }

  create() {
    const elephantLayer = this.add.layer()

    const graphics = this.add.graphics()
    graphics.fillStyle(0xffffff, 0.5)
    graphics.fillCircle(400, 300, 300)

    const mask = graphics.createGeometryMask()
    elephantLayer.setMask(mask)

    for (let i = 0; i < 64; i++) {
      let x = Phaser.Math.Between(600, 800)
      let y = Phaser.Math.Between(0, 600)

      let sprite = elephantLayer.add(this.make.sprite({ x, y, key: 'elephant' }))

      let dx = x - 600
      this.tweens.add({
        targets: sprite,
        x: dx,
        ease: 'Sine.inOut',
        duration: 4000,
        delay: i * 50,
        yoyo: true,
        repeat: -1,
      })
    }
  }
}

export default Example
