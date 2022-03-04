export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'assets', 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCircle(14, 3, 6)
    this.setCollideWorldBounds(true)

    // 是否活着
    this.isAlive = false

    // 速度
    this.speed = 280
    // 用来存储点
    this.target = new Phaser.Math.Vector2()
    console.log(this.target)
  }

  start() {
    // 开始，活着
    this.isAlive = true

    // 监听移动
    this.scene.input.on('pointermove', (pointer) => {
      // 如果活着，移动
      if (this.isAlive) {
        this.target.x = pointer.x
        this.target.y = pointer.y
        //  Add 90 degrees because the sprite is drawn facing up
        // 以稳定的速度将给定的显示对象移动到目标对象上
        this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966
      }
    })
  }

  kill() {
    // 更改状态
    this.isAlive = false
    // Sets acceleration, velocity, and speed to zero.
    // 不再动了
    this.body.stop()
  }

  preUpdate() {
    // this.body.speed>0，速度大于0，并且是isAlive
    if (this.body.speed > 0 && this.isAlive) {
      // this.target保存的是鼠标的点，计算鼠标点和player坐标的距离，当小于6的时候，直接将player的坐标设置为鼠标点的坐标，鼠标不动，player不动，如果没有这步，player会一直动下去
      if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6) {
        this.body.reset(this.target.x, this.target.y)
      }
    }
  }
}
