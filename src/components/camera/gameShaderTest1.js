import BendWavesPostFX from "./BendWavesPostFX"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.player = null
    this.cursors = null
    this.score = 0
    this.scoreText = null
  }

  preload() {
    this.load.image("sky", "assets/sky.png")
    this.load.image("ground", "assets/platform.png")
    this.load.image("star", "assets/star.png")
    this.load.image("bomb", "assets/bomb.png")
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(400, 300, "sky")

    const platforms = this.physics.add.staticGroup()
    // platforms是静态组,变动的时候不会自动更新,需要刷新body
    platforms.create(400, 568, "ground").setScale(2).refreshBody()
    platforms.create(600, 400, "ground")
    platforms.create(50, 250, "ground")
    platforms.create(750, 220, "ground")

    const player = this.physics.add.sprite(100, 450, "dude")

    player.setBounce(0.2)
    // 边界碰撞检测
    player.setCollideWorldBounds(true)

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    })

    this.cursors = this.input.keyboard.createCursorKeys()

    const stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    stars.children.iterate(function (child) {
      // Phaser.Math.Between()
      child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(player, platforms)
    this.physics.add.collider(stars, platforms)

    this.scoreText = this.add.text(16, 16, "score:0", { fontSize: "32px", fill: "#000" })

    // 重叠
    this.physics.add.overlap(player, stars, this.collectStar, null, this)
    this.player = player
    // 着色器
    this.cameras.main.setPostPipeline(BendWavesPostFX)
  }

  update() {
    const cursors = this.cursors
    const player = this.player
    if (cursors.left.isDown) {
      player.setVelocityX(-160)
      player.anims.play("left", true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(160)
      player.anims.play("right", true)
    } else {
      player.setVelocityX(0)
      player.anims.play("turn")
    }

    // 跳起来，碰到上面的地板，快速下落
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330)
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true)
    this.score += 10
    this.scoreText.setText("score: " + this.score)
  }
}

export default Example
