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
    this.add.text(this.center.x, 32, 'animation from json object', { color: '#00ff00' }).setOrigin(0.5, 0)

    this.anims.fromJSON(this.getGemsData())

    this.add.sprite(this.center.x, 200, 'gems').play('diamond')
    this.add.sprite(this.center.x, 300, 'gems').play('prism')
    this.add.sprite(this.center.x, 400, 'gems').play('ruby')
    this.add.sprite(this.center.x, 500, 'gems').play('square')
  }

  getGemsData() {
    const data = {
      anims: [
        {
          key: 'diamond',
          type: 'frame',
          frames: [
            {
              key: 'gems',
              frame: 'diamond_0000',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0001',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0002',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0003',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0004',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0005',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0006',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0007',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0008',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0009',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0010',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0011',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0012',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0013',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0014',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'diamond_0015',
              duration: 0,
              visible: false,
            },
          ],
          frameRate: 24,
          duration: 1.5,
          skipMissedFrames: true,
          delay: 0,
          repeat: -1,
          repeatDelay: 0,
          yoyo: false,
          showOnStart: false,
          hideOnComplete: false,
        },
        {
          key: 'prism',
          type: 'frame',
          frames: [
            {
              key: 'gems',
              frame: 'prism_0000',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0001',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0002',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0003',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0004',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0005',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'prism_0006',
              duration: 0,
              visible: false,
            },
          ],
          frameRate: 24,
          duration: 3.4285714285714284,
          skipMissedFrames: true,
          delay: 0,
          repeat: -1,
          repeatDelay: 0,
          yoyo: false,
          showOnStart: false,
          hideOnComplete: false,
        },
        {
          key: 'ruby',
          type: 'frame',
          frames: [
            {
              key: 'gems',
              frame: 'ruby_0000',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0001',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0002',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0003',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0004',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0005',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'ruby_0006',
              duration: 0,
              visible: false,
            },
          ],
          frameRate: 24,
          duration: 3.4285714285714284,
          skipMissedFrames: true,
          delay: 0,
          repeat: -1,
          repeatDelay: 0,
          yoyo: false,
          showOnStart: false,
          hideOnComplete: false,
        },
        {
          key: 'square',
          type: 'frame',
          frames: [
            {
              key: 'gems',
              frame: 'square_0000',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0001',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0002',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0003',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0004',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0005',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0006',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0007',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0008',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0009',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0010',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0011',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0012',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0013',
              duration: 0,
              visible: false,
            },
            {
              key: 'gems',
              frame: 'square_0014',
              duration: 0,
              visible: false,
            },
          ],
          frameRate: 24,
          duration: 1.6,
          skipMissedFrames: true,
          delay: 0,
          repeat: -1,
          repeatDelay: 0,
          yoyo: false,
          showOnStart: false,
          hideOnComplete: false,
        },
      ],
      globalTimeScale: 1,
    }
    return data
  }
}

export default Example
