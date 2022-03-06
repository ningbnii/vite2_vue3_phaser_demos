export default class EnemySnowball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)

    // 缩小0.5
    this.setScale(0.5)
  }

  fire(x, y) {
    // 激活
    this.body.enable = true
    // 设置位置
    this.body.reset(x + 10, y - 44)

    // 激活
    this.setActive(true)
    // 设置可见
    this.setVisible(true)

    // x轴速度
    this.setVelocityX(200)
  }

  /**
   * 停止
   */
  stop() {
    // 非激活
    this.setActive(false)
    // 不可见
    this.setVisible(false)

    // x轴速度为0
    this.setVelocityX(0)
    // 非激活
    this.body.enable = false
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    // 子弹超过970了，就停止，游戏结束
    if (this.x >= 970) {
      this.stop()

      this.scene.gameOver()
    }
  }
}
