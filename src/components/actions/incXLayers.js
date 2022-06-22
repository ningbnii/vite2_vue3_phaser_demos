import veg_png from '../../assets/veg.png'
import veg_json from '../../assets/veg.json'

class Example extends Phaser.Scene {
  constructor() {
    super()
    this.move = 0
  }

  preload() {
    // 地图
    this.load.atlas('atlas', veg_png, veg_json)
  }

  create() {
    // 组A
    this.groupA = this.add.group()
    // 组B
    this.groupB = this.add.group()

    // 添加1000个元素到组A
    for (let i = 0; i < 1000; i++) {
      // 往组中添加元素
      this.groupA.create(
        100 + Math.random() * 600, // x坐标
        100 + Math.random() * 400, // y坐标
        'atlas', // 图片名称
        'veg0' + Math.floor(1 + Math.random() * 9) // 图片帧
      )
    }

    // 添加1000个元素到组B
    for (let i = 0; i < 1000; i++) {
      this.groupB.create(
        100 + Math.random() * 600, // x坐标
        100 + Math.random() * 400, // y坐标
        'atlas',
        'veg0' + Math.floor(1 + Math.random() * 9)
      )
    }
  }

  update() {
    // 每帧更新一次
    // 每次更新时，移动组A的元素
    Phaser.Actions.IncX(this.groupA.getChildren(), Math.cos(this.move)) // 给group中的每个元素都设置一个坐标值，IncX，x坐标
    Phaser.Actions.IncY(this.groupA.getChildren(), Math.sin(this.move)) // y坐标
    Phaser.Actions.Rotate(this.groupA.getChildren(), -0.01) // 旋转角度

    Phaser.Actions.IncX(this.groupB.getChildren(), -Math.cos(this.move))
    Phaser.Actions.IncY(this.groupB.getChildren(), -Math.sin(this.move))
    Phaser.Actions.Rotate(this.groupB.getChildren(), 0.01)

    this.move += 0.01
  }
}

export default Example
