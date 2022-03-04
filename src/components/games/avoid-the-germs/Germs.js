import Germ from './Germ'

export default class Germs extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene)

    // 类的类型为germ
    this.classType = Germ

    // 设置一个对象存储animation和speed
    this.germConfig = [
      { animation: 'germ1', speed: 60 },
      { animation: 'germ2', speed: 90 },
      { animation: 'germ3', speed: 120 },
      { animation: 'germ4', speed: 180 },
    ]
  }

  start() {
    // 创建三个germ
    let germ1 = new Germ(this.scene, 100, 100, 'germ1')
    let germ2 = new Germ(this.scene, 700, 600, 'germ1')
    let germ3 = new Germ(this.scene, 200, 400, 'germ1')

    // 添加到group中
    this.add(germ1, true)
    this.add(germ2, true)
    this.add(germ3, true)

    // 动起来
    germ1.start(1000)
    germ2.start(2000)
    germ3.start()

    // 创建一个计时器，每隔2秒中执行一次
    this.timeEvent = this.scene.time.addEvent({ delay: 2000, callback: this.releaseGerm, callbackScope: this, loop: true })
  }

  stop() {
    // 销毁计时器
    this.timeEvent.remove()
    // 停止所有对象移动
    this.getChildren().forEach((child) => {
      child.stop()
    })
  }

  releaseGerm() {
    // 生成随机坐标
    const x = Phaser.Math.RND.between(0, 800)
    const y = Phaser.Math.RND.between(0, 600)

    let germ
    // 获取对象中的一个随机值
    let config = Phaser.Math.RND.pick(this.germConfig)
    this.getChildren().forEach((child) => {
      // 非激活的，重新给激活，就不生成新的了
      if (child.anims.getName() === config.animation && !child.active) {
        germ = child
      }
    })

    if (germ) {
      // 重新开始就ok
      germ.restart(x, y)
    } else {
      // 重新生成一个
      germ = new Germ(this.scene, x, y, config.animation, config.speed)
      // 添加到group中
      this.add(germ, true)
      // 启动
      germ.start()
    }
  }
}
