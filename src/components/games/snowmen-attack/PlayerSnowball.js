export default class PlayerSnowball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)

    // 缩小0.5
    this.setScale(0.5)
  }

  /**
   * 射击
   * @param {*} x
   * @param {*} y
   */
  fire(x, y) {
    // 子弹激活
    this.body.enable = true
    // 设置位置
    this.body.reset(x + 10, y - 44)

    // 激活
    this.setActive(true)
    // 可见
    this.setVisible(true)

    // x轴速度
    this.setVelocityX(-600)
    // x轴加速度
    this.setAccelerationX(-1400)
  }

  /**
   * 停止
   */
  stop() {
    // 非激活
    this.setActive(false)
    // 不可见
    this.setVisible(false)

    // x轴速度
    this.setVelocityX(0)

    // 非激活
    this.body.enable = false
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    // 子弹小于-64了，就stop了
    if (this.x <= -64) {
      this.stop()
    }
  }
}
