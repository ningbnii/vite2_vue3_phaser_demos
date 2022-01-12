// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.flowers = []
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

    for (let i = 0; i < 8; i++) {
      let flower = this.add.image(this.center.x, this.height - 128 - i * 52, 'tiles', 31).setOrigin(0)
      this.flowers.push(flower)
    }
    this.add.text(this.center.x, 8, 'Click to play. Update Event on frame0004', { color: '#ffffff' }).setOrigin(0.5, 0)

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('knight', { prefix: 'attack_B/frame', end: 12, zeroPad: 4 }),
      frameRate: 16,
    })

    // 硬币动画
    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNames('tiles', { start: 42, end: 47 }),
      frameRate: 12,
      repeat: -1,
    })

    let lancelot = this.add.sprite(0, this.height - 60, 'knight', 'attack_C/frame0000')
    lancelot.setOrigin(0, 1)
    lancelot.setScale(4)

    // event handler for when the animation completes on our sprite
    lancelot.on(
      Phaser.Animations.Events.ANIMATION_UPDATE,
      function (anim, frame, sprite, frameKey) {
        // 可以控制到某一帧的时候执行操作
        // we can run our effect whe we get frame0004
        if (frameKey === 'attack_B/frame0004') {
          this.releaseItem()
        }
      },
      this
    )

    // add a click handler to start the animation playing
    this.input.on(
      'pointerdown',
      function () {
        lancelot.play('attack', true)
      },
      this
    )
  }

  releaseItem() {
    if (this.flowers.length === 0) {
      return
    }
    let flower = this.flowers.pop()
    this.tweens.add({
      targets: flower,
      x: this.center.x + 50,
      ease: 'Quad.out',
      duration: 500,
    })
  }
}

export default Example
