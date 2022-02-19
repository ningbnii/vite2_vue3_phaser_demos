class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    })
  }

  preload() {
    // this.add.image('pic', 'assets/pic/bw-face.png')
  }

  create() {
    let graphics = this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 800, 100)
    graphics.generateTexture('pic', 800, 100)
    graphics.destroy()
    this.add.image(400, 300, 'pic')
  }
}

export { SceneA }
