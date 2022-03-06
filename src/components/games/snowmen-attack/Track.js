import Snowman from "./Snowman.js"
import PlayerSnowball from "./PlayerSnowball.js"
import EnemySnowball from "./EnemySnowball.js"

export default class Track {
  constructor(scene, id, trackY) {
    this.scene = scene
    this.id = id
    this.y = trackY

    // 巣
    this.nest = scene.physics.add.image(1024, trackY - 10, "sprites", "nest").setOrigin(1, 1)

    // 大雪人
    this.snowmanBig = new Snowman(scene, this, "Big")
    // 小雪人
    this.snowmanSmall = new Snowman(scene, this, "Small")

    // 玩家的雪球pool
    this.playerSnowballs = scene.physics.add.group({
      frameQuantity: 8,
      key: "sprites",
      frame: "snowball2",
      active: false,
      visible: false,
      classType: PlayerSnowball,
    })

    // 敌人的雪球
    this.enemySnowballs = scene.physics.add.group({
      frameQuantity: 8,
      key: "sprites",
      frame: "snowball3",
      active: false,
      visible: false,
      classType: EnemySnowball,
    })

    // 玩家的雪球和敌人的雪球碰撞
    this.snowBallCollider = scene.physics.add.overlap(this.playerSnowballs, this.enemySnowballs, this.hitSnowball, null, this)
    // 小雪人和玩家雪球的碰撞
    this.snowmanSmallCollider = scene.physics.add.overlap(this.snowmanSmall, this.playerSnowballs, this.hitSnowman, null, this)
    // 大雪人和玩家雪球的碰撞
    this.snowmanBigCollider = scene.physics.add.overlap(this.snowmanBig, this.playerSnowballs, this.hitSnowman, null, this)

    // 释放小雪人
    this.releaseTimerSmall
    // 释放大雪人
    this.releaseTimerBig
  }

  start(minDelay, maxDelay) {
    // 延迟时间
    const delay = Phaser.Math.Between(minDelay, maxDelay)

    // 小雪人的延迟时间
    this.releaseTimerSmall = this.scene.time.addEvent({
      delay: delay,

      callback: () => {
        this.snowmanSmall.start()
      },
    })

    // 大雪人的延迟时间
    this.releaseTimerBig = this.scene.time.addEvent({
      delay: delay * 3,

      callback: () => {
        this.snowmanBig.start()
      },
    })
  }

  // 停止
  stop() {
    // 小雪人停止
    this.snowmanSmall.stop()
    // 大雪人停止
    this.snowmanBig.stop()

    // 玩家的雪球停止
    for (let snowball of this.playerSnowballs.getChildren()) {
      snowball.stop()
    }

    // 敌人的雪球停止
    for (let snowball of this.enemySnowballs.getChildren()) {
      snowball.stop()
    }

    // 移除计时器
    this.releaseTimerSmall.remove()
    this.releaseTimerBig.remove()
  }

  // 雪球碰撞
  hitSnowball(ball1, ball2) {
    // 俩雪球都停止
    ball1.stop()
    ball2.stop()
  }

  // 雪球打上雪人
  hitSnowman(snowman, ball) {
    // 雪人活着 && 雪人坐标.x>0
    if (snowman.isAlive && snowman.x > 0) {
      // 雪球停止
      ball.stop()
      // 雪人被打中
      snowman.hit()
    }
  }

  // 玩家扔雪球
  throwPlayerSnowball(x) {
    // 获取一个雪球
    let snowball = this.playerSnowballs.getFirstDead(false)

    if (snowball) {
      // 雪球发射
      snowball.fire(x, this.y)
    }
  }

  // 敌人扔雪球
  throwEnemySnowball(x) {
    // 获取一个敌人的雪球
    let snowball = this.enemySnowballs.getFirstDead(false)

    // 雪球发射
    if (snowball) {
      snowball.fire(x, this.y)
    }
  }
}
