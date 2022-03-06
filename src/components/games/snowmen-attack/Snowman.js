export default class Snowman extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, track, size) {
    // 根据site区分frame
    const frame = size === "Small" ? "snowman-small-idle0" : "snowman-big-idle0"
    // 开始坐标的位置，small：80，big：-100
    const x = size === "Small" ? 80 : -100

    super(scene, x, track.y, "sprites", frame)

    this.setOrigin(0.5, 1)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // 设置大小，偏移
    if (size === "Small") {
      this.body.setSize(100, 100)
      this.body.setOffset(20, 40)
    } else {
      this.body.setSize(100, 120)
      this.body.setOffset(50, 50)
    }

    // 场景时间
    this.time = scene.time
    // 场景音乐
    this.sound = scene.sound

    // 活着
    this.isAlive = true
    // 正在扔雪球
    this.isThrowing = false

    // 大小
    this.size = size
    // 速度
    this.speed = 50

    //  0 = walk, 1 = idle, 2 = throw
    // 之前的动作
    this.previousAction = 0

    // 当前的轨道
    this.currentTrack = track
    this.maxHitpoints = 2

    // 播放动画
    this.play("snowmanIdle" + this.size)
  }

  start() {
    // 活着
    this.isAlive = true
    // 正在扔雪球
    this.isThrowing = false
    // 之前的动作
    this.previousAction = 0
    // 当前生命值=最大生命值
    this.currentHitpoints = this.maxHitpoints

    // 放到当前轨道上
    this.y = this.currentTrack.y

    // 雪人开始扔雪球动画，释放雪球
    this.on("animationcomplete-snowmanThrowStart" + this.size, this.releaseSnowball, this)
    // 雪人结束扔雪球动画
    this.on("animationcomplete-snowmanThrowEnd" + this.size, this.throwComplete, this)

    // 激活
    this.setActive(true)
    // 可见
    this.setVisible(true)

    // 播放雪人走的动画
    this.play("snowmanWalk" + this.size)

    // 设置x轴的速度
    this.setVelocityX(this.speed)

    // 延迟计时器
    this.chooseEvent = this.time.delayedCall(Phaser.Math.Between(3000, 6000), this.chooseAction, [], this)
  }

  // 选择动作
  chooseAction() {
    //  In case it was disabled by a hit
    // 活着
    this.isAlive = true

    // 启用
    this.body.enable = true

    // x轴速度为0，不走了
    this.setVelocityX(0)

    //  0 - 50 = Throw snowball
    //  51 - 60 = Idle
    //  61 - 100 = Walk
    // 生成一个随机数，根据这个随机数判断，要执行的动作
    const t = Phaser.Math.Between(0, 100)

    if (t < 50) {
      //  If it threw last time, we don't throw again
      // 如果上次扔了，就不再扔了
      if (this.previousAction === 2) {
        // 走
        this.walk()
      } else {
        // 扔
        this.throw()
      }
    } else if (t > 60) {
      // 走
      this.walk()
    } else {
      //  If it was idle last time, we don't go idle again
      // 如果上次闲着，这次就不再闲着了
      if (this.previousAction === 1) {
        if (t > 55) {
          // 走
          this.walk()
        } else {
          // 扔
          this.throw()
        }
      } else {
        // 闲着
        this.goIdle()
      }
    }
  }

  // 走
  walk() {
    // 动作是0
    this.previousAction = 0

    // 播放大小雪人走的动画
    this.play("snowmanWalk" + this.size, true)

    // 设置x轴速度
    this.setVelocityX(this.speed)

    // 选择动作
    this.chooseEvent = this.time.delayedCall(Phaser.Math.Between(3000, 6000), this.chooseAction, [], this)
  }

  goIdle() {
    // 动作是1
    this.previousAction = 1

    // 播放动画
    this.play("snowmanIdle" + this.size, true)

    // 随机选择之后的动作
    this.chooseEvent = this.time.delayedCall(Phaser.Math.Between(2000, 4000), this.chooseAction, [], this)
  }

  /**
   * 扔雪球
   */
  throw() {
    // 动作是2
    this.previousAction = 2

    // 正在扔
    this.isThrowing = true

    // 播放动画
    this.play("snowmanThrowStart" + this.size)
  }

  // 释放雪球
  releaseSnowball() {
    // 死了，return
    if (!this.isAlive) {
      return
    }

    // 播放扔雪球结束动画
    this.play("snowmanThrowEnd" + this.size)

    // 当前轨道扔雪球
    this.currentTrack.throwEnemySnowball(this.x)
  }

  /**
   * 扔雪球完成
   * @returns
   */
  throwComplete() {
    if (!this.isAlive) {
      return
    }

    // 没有在扔雪球
    this.isThrowing = false

    // 播放动画
    this.play("snowmanIdle" + this.size)

    // 之后的随机动作
    this.chooseEvent = this.time.delayedCall(Phaser.Math.Between(2000, 4000), this.chooseAction, [], this)
  }

  /**
   * 打中
   */
  hit() {
    // 如果有计时器，则移除
    if (this.chooseEvent) {
      this.chooseEvent.remove()
    }

    // 死了
    this.isAlive = false
    // 之前的动作-1
    this.previousAction = -1

    // 播放死的动画
    this.play("snowmanDie" + this.size)

    // 播放打中雪人的声音
    this.sound.play("hit-snowman")

    // 雪人停止
    this.body.stop()

    // 非激活状态
    this.body.enable = false

    // 后退
    const knockback = "-=" + Phaser.Math.Between(100, 200).toString()

    // 后退，1秒内完成
    this.scene.tweens.add({
      targets: this,
      x: knockback,
      ease: "sine.out",
      duration: 1000,
      onComplete: () => {
        // 如果小于-100了，就不再动了
        if (this.x < -100) {
          this.x = -100
        }
      },
    })

    // 之后的动作
    this.chooseEvent = this.time.delayedCall(Phaser.Math.Between(1000, 3000), this.chooseAction, [], this)
  }

  /**
   * 停止
   */
  stop() {
    // 如果有计时器，则移除
    if (this.chooseEvent) {
      this.chooseEvent.remove()
    }
    // 死了
    this.isAlive = false
    // 播放站立动画
    this.play("snowmanIdle" + this.size)
    // x轴速度为0
    this.setVelocityX(0)
  }

  // 更新之前
  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    // 雪人走到头，停止
    if (this.x >= 880) {
      this.stop()

      // 游戏结束
      this.scene.gameOver()
    }
  }
}
