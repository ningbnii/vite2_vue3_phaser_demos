class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.data = {}
  }

  preload() {
    const knight_png = new URL('../../assets/knight.png', import.meta.url).href
    const knight_json = new URL('../../assets/knight.json', import.meta.url).href
    const clouds = new URL('../../assets/clouds.png', import.meta.url).href
    const tiles = new URL('../../assets/fantasy-tiles.png', import.meta.url).href

    this.load.atlas('knight', knight_png, knight_json)
    this.load.image('bg', clouds)
    this.load.spritesheet('tiles', tiles, { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    // 云
    this.add.image(0, 0, 'bg').setOrigin(0)
    // 地
    for (let i = 0; i < 13; i++) {
      this.add.image(64 * i, this.height - 64, 'tiles', 1).setOrigin(0)
    }
    let text = this.add.text(this.center.x, 8, 'Click to play\nIdle to Run mix: 1500ms\nRun to Idle mix: 500ms', { color: '#00ff00', align: 'center' }).setOrigin(0.5, 0)

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', end: 5, zeroPad: 4 }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('knight', { prefix: 'run/frame', end: 7, zeroPad: 4 }),
      frameRate: 12,
      repeat: -1,
    })

    //  Set a mix between 'idle' and 'run'.

    //  When transitioning from idle to run it will wait 1500ms before starting the run animation
    this.anims.addMix('idle', 'run', 1500)
    //  When transitioning from run to idle it will wait 500ms before starting the idle animation
    // 从跑的状态暂停，时间很短暂，只有500毫秒
    this.anims.addMix('run', 'idle', 500)

    let lancelot = this.add.sprite(this.center.x - 32, this.height - 60)
    lancelot.setOrigin(0, 1)
    // lancelot.setScale
    lancelot.play('idle')

    this.input.on('pointerdown', function () {
      // lancelot.anims.getName() 获取当前正在播放的动画
      if (lancelot.anims.getName() === 'idle') {
        lancelot.play('run')
      } else if (lancelot.anims.getName() === 'run') {
        lancelot.play('idle')
      }
    })
  }
}

export default Example
