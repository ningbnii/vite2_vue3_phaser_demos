class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.spritesheet("diamonds", "assets/sprites/diamonds32x5.png", { frameWidth: 64 })
  }

  create() {
    const group = this.make.group({
      key: "diamonds",
      frame: [0, 1, 2, 3, 4],
      frameQuantity: 22, // 每个`frame`应该与一个`key`组合的次数。0有22个，1有22个。。。
      max: 108, // 最多108个
    })

    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 12, // x轴12个
      height: 9, // y轴9个
      cellWidth: 64, // 每一个的宽度64
      cellHeight: 64, // 每一个的高度64
      x: 48, // 整体的x坐标
      y: 32, // 整体的y坐标
    })

    const timeEvent = this.time.addEvent({
      delay: 500, // 延迟500毫秒执行
      callback: this.onEvent, // 回调方法
      callbackScope: this, // 回调作用域
      loop: true, // 是否循环执行
    })
  }

  onEvent() {
    // 从group中随机获取一个child
    const child = this.children.getRandom()
    if (child) {
      this.children.remove(child)
    }
  }
}

export default Example
