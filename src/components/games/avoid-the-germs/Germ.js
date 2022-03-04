export default class Germ extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, animation, speed) {
    super(scene, x, y, 'assets')

    // 播放animation动画
    this.play(animation)

    // 设置随机缩放
    this.setScale(Phaser.Math.FloatBetween(1, 2))

    // 速度
    this.speed = speed

    // 透明度
    this.alpha = 0
    // 生命周期
    this.lifespan = 0
    // 是否在追逐
    this.isChasing = false

    // 存储坐标
    this.target = new Phaser.Math.Vector2()
  }

  start(chaseDelay) {
    // 设置碰撞检测为一个圆圈
    this.setCircle(14, 6, 2)
    if (!chaseDelay) {
      // 延迟多少秒开始追逐
      chaseDelay = Phaser.Math.RND.between(3000, 8000)
      this.scene.sound.play('appear')
    }

    // 逐渐显示
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 2000,
      ease: 'Linear',
      // hold: chaseDelay,
      delay: chaseDelay,
      onComplete: () => {
        // 如果player还活着
        if (this.scene.player.isAlive) {
          // 设置个生命周期，每个germ的生命周期是随机的
          this.lifespan = Phaser.Math.RND.between(6000, 12000)
          // 显示出来之后就开始追逐player
          this.isChasing = true
        }
      },
    })

    return this
  }

  restart(x, y) {
    // 重新设置坐标
    this.body.reset(x, y)

    // 激活
    this.setActive(true)
    // 可见
    this.setVisible(true)
    // 透明度为0
    this.setAlpha(0)

    // 在开始
    return this.start()
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    // 如果正在追逐
    if (this.isChasing) {
      // 生命周期递减
      this.lifespan -= delta
      // 如果生命走完了
      if (this.lifespan <= 0) {
        // 设置为停止追逐
        this.isChasing = false
        // 停止移动
        this.body.stop()

        // 消失
        this.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 1000,
          ease: 'Linear',
          onComplete: () => {
            // 设置为非激活
            this.setActive(false)
            // 设置为不可见
            this.setVisible(false)
          },
        })
      } else {
        // 生命没有走完，获取player的坐标
        this.scene.getPlayer(this.target)
        //  Add 90 degrees because the sprite is drawn facing up
        // 追逐player
        this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966
      }
    }
  }

  stop() {
    // 停止追逐
    this.isChasing = false
    // 停止运动
    this.body.stop()
  }
}
