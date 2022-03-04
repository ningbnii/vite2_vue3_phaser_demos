import Germs from './Germs'
import Player from './Player.js'
import Pickups from './Pickups.js'

export default class MainGame extends Phaser.Scene {
  constructor() {
    super('MainGame')

    this.player
    this.germs
    this.pickups

    this.introText
    this.scoreText
    this.score = 0
    this.highscore = 0
    this.newHighscore = false
  }

  create() {
    this.score = 0
    this.highscore = this.registry.get('highscore')
    this.newHighscore = false

    this.add.image(400, 300, 'background').setScale(2)

    this.germs = new Germs(this.physics.world, this)
    this.pickups = new Pickups(this.physics.world, this)

    this.player = new Player(this, 400, 400)

    this.scoreText = this.add.bitmapText(16, 32, 'slime', 'Score   0', 40).setDepth(1)

    this.introText = this.add.bitmapText(400, 300, 'slime', 'Avoid the Germs\nCollect the Rings', 60).setOrigin(0.5).setCenterAlign().setDepth(1)

    this.pickups.start()

    this.input.once('pointerdown', () => {
      this.player.start()
      this.germs.start()

      this.sound.play('start')

      this.tweens.add({
        targets: this.introText,
        alpha: 0,
        duration: 300,
      })
    })

    // 检测player和pickups是否碰撞
    this.physics.add.overlap(this.player, this.pickups, (player, pickup) => this.playerHitPickup(player, pickup))
    this.physics.add.overlap(this.player, this.germs, (player, germ) => this.playerHitGerm(player, germ))
  }

  playerHitGerm(player, germ) {
    //  We don't count a hit if the germ is fading in or out
    if (player.isAlive && germ.alpha === 1) {
      this.gameOver()
    }
  }

  playerHitPickup(player, pickup) {
    // 吃一个甜甜圈，加一分
    this.score++
    // 更新分数文字显示
    this.scoreText.setText('Score   ' + this.score)

    // 没有设置新的最高分，并且当前分数大于最高分
    if (!this.newHighscore && this.score > this.highscore) {
      // 最高分大于0
      if (this.highscore > 0) {
        //  Only play the victory sound if they actually set a new highscore
        this.sound.play('victory')
      } else {
        this.sound.play('pickup')
      }

      // 超过了设置的最高分，创造了新的记录
      this.newHighscore = true
    } else {
      this.sound.play('pickup')
    }

    // 给甜甜圈重新设置一个新的位置，这样甜甜圈的总数量始终保持5个
    this.pickups.collect(pickup)
  }

  gameOver() {
    this.player.kill()
    this.germs.stop()

    // 停止所有声音
    this.sound.stopAll()
    // 播放失败的声音
    this.sound.play('fail')

    // 更新文字game over
    this.introText.setText('Game Over!')

    // 开始文字再显示出来
    this.tweens.add({
      targets: this.introText,
      alpha: 1,
      duration: 300,
    })

    // 如果创造了新的记录，将最高分设置为获得的分数
    if (this.newHighscore) {
      this.registry.set('highscore', this.score)
    }

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }

  getPlayer(target) {
    target.x = this.player.x
    target.y = this.player.y
    // 获取player的坐标
    return target
  }
}
