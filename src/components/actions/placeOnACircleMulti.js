import balls from '../../assets/balls.png'

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  preload() {
    this.load.spritesheet('balls', balls, {
      frameWidth: 17,
      frameHeight: 17,
    })
  }

  create() {
    // 创建一个圆形轨迹
    const circle = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 200)
    this.group = this.add.group({ key: 'balls', frame: [0, 1, 5], repeat: 20 })
    Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle) // 将group元素，沿着圆排列

    // 补间动画
    this.tween = this.tweens.addCounter({
      from: 200, // 从半径多大开始
      to: 0, // 到半径多大停止
      duration: 2000, // 动画耗时1秒，越小越快
      delay: 0, // 等几秒动画开始
      ease: 'Sine.easeInOut',
      repeat: -1, // 重复次数，-1则不会停止
      yoyo: true, // 悠悠球效果
    })
  }

  update() {
    // 以圆形轨迹旋转
    Phaser.Actions.RotateAroundDistance(
      this.group.getChildren(),
      {
        x: this.width / 2, // 旋转中心
        y: this.height / 2,
      },
      0.01, // 旋转角度
      this.tween.getValue() // 圆的半径
    )
  }
}

export default Example
