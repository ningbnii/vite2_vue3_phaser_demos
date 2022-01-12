// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.isRunning = true
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('knight', 'knight.png', 'knight.json')
    this.load.image('bg', 'clouds.png')
    this.load.spritesheet('tiles', 'fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    //创建一个新的 TileSprite 游戏对象并将其添加到场景中。
    //TileSprite本质上还是一个sprite对象，不过这个sprite的贴图是可以移动的，并且会自动平铺来弥补移动后的空缺，所以我们的素材图片要是平铺后看不出有缝隙，就可以拿来当做TileSprite的移动贴图了
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0)
    this.ground = this.add.tileSprite(0, this.height - 64, this.width, 64, 'tiles', 1).setOrigin(0)
    this.add.text(this.center.x, 8, 'click to stop animation', { color: '#ffffff' }).setOrigin(0.5, 0)

    // 闲置
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', end: 5, zeroPad: 4 }),
      frameRate: 14,
      repeat: -1,
    })

    // 跑
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('knight', { prefix: 'run/frame', end: 7, zeroPad: 4 }),
      frameRate: 12,
      repeat: -1,
    })

    let lancelot = this.add.sprite(0, this.height - 60, 'knight', 'attack_A/frame0000')
    lancelot.setOrigin(0, 1)
    lancelot.setScale(4)
    lancelot.play('run')

    // event handler for when the animation completes on our sprite
    // 监听下面的ANIMATION_START，如果将lancelot.play('idle')放到这段代码下面，也会执行
    lancelot.on(
      Phaser.Animations.Events.ANIMATION_STOP,
      function () {
        this.isRunning = false
      },
      this
    )
    lancelot.on(
      Phaser.Animations.Events.ANIMATION_START,
      function () {
        this.isRunning = true
      },
      this
    )

    // add a click handler to start the animation playing
    this.input.on(
      'pointerdown',
      function () {
        if (this.isRunning) {
          lancelot.stop()
        } else {
          lancelot.play('run')
        }
      },
      this
    )
  }

  update() {
    if (this.isRunning) {
      this.bg.tilePositionX += 4
      this.ground.tilePositionX += 8
    }
  }
}

export default Example
