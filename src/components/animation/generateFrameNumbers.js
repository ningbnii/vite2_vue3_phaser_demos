class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const boom = new URL('../../assets/explosion.png', import.meta.url).href
    this.load.spritesheet('boom', boom, { frameWidth: 64, frameHeight: 64, endFrame: 23 }) // 最后两帧为空
  }

  create() {
    //  Our 'boom' spritesheet has 23 frames in it.
    //  This animation will use them all by just giving it the sprite sheet key:
    const config1 = {
      key: 'explode1',
      frames: 'boom',
      frameRate: 20,
      repeat: -1,
    }

    //  Here we use the 'generateFrameNumbers' function instead to set the start and end frame:
    const config2 = {
      key: 'explode2',
      frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
      frameRate: 20,
      repeat: -1,
    }

    //这里我们使用 'frames' 数组，因为我们想指定要使用的确切帧：
    const config3 = {
      key: 'explode3',
      frames: this.anims.generateFrameNumbers('boom', { frames: [0, 1, 2, 1, 2, 3, 4, 0, 1, 2] }),
      frameRate: 20,
      repeat: -1,
    }

    this.anims.create(config1)
    this.anims.create(config2)
    this.anims.create(config3)

    this.add.sprite(this.center.x, 200, 'boom').play('explode1')
    this.add.sprite(this.center.x, 300, 'boom').play('explode2')
    this.add.sprite(this.center.x, 400, 'boom').play('explode3')
  }
}

export default Example
