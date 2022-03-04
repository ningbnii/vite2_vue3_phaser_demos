export default class Pickups extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene)

    // 一个矩形
    this.outer = new Phaser.Geom.Rectangle(64, 64, 672, 472)
    // 保存坐标
    this.target = new Phaser.Geom.Point()
  }

  start() {
    // 创建甜甜圈
    this.create(400, 100, 'assets', 'ring')
    this.create(100, 380, 'assets', 'ring')
    this.create(700, 380, 'assets', 'ring')
    this.create(300, 500, 'assets', 'ring')
    this.create(500, 500, 'assets', 'ring')
  }

  /**
   * 收集甜甜圈
   * @param {*} pickup
   */
  collect(pickup) {
    //  Move the pick-up to a new location
    // 生成随机点
    this.outer.getRandomPoint(this.target)

    // 将甜甜圈设置到随机点上
    pickup.body.reset(this.target.x, this.target.y)
  }
}
