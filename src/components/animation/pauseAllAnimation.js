// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('soldier', 'soldier.png', 'soldier.json')
    this.load.image('bg', 'grass.jpg')
  }

  create() {
    this.add.image(0, 0, 'bg').setScale(1, 1.5).setOrigin(0)

    this.anims.create({
      key: 'shoot1',
      frames: this.anims.generateFrameNames('soldier', { prefix: 'Soldier_2_shot_up_', start: 1, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'shoot2',
      frames: this.anims.generateFrameNames('soldier', { prefix: 'soldier_3_shoot_front_', start: 1, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    //生成一些随机的玩具士兵
    for (let i = 0; i < 32; i++) {
      let x = Phaser.Math.Between(0, 800)
      let y = Phaser.Math.Between(200, 500)
      let rd = Phaser.Math.Between(200, 2000) // 动画间隔时间

      let troop
      if (i < 16) {
        troop = this.add.sprite(x, y, 'soldier', 'Soldier_2_shot_up_1')
        troop.setDepth(y)
        troop.playAfterDelay({ key: 'shoot1', repeatDelay: rd }, rd)
      } else {
        troop = this.add.sprite(x, y, 'soldier', 'soldier_3_shoot_front_1')
        troop.setDepth(y)
        troop.playAfterRepeat({ key: 'shoot2', repeatDelay: rd }, rd)
      }
    }

    this.input.on(
      'pointerdown',
      function () {
        if (this.anims.paused) {
          this.anims.resumeAll()
        } else {
          this.anims.pauseAll()
        }
      },
      this
    )
  }
}

export default Example
