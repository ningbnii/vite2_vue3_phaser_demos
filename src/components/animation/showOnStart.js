// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.path = 'assets/'
    this.load.atlas('bird', 'bird.png', 'bird.json')
  }

  create() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('bird', { prefix: 'frame', end: 9 }),
      repeat: -1,
      showOnStart: true,
    })

    //创建一堆随机精灵
    let rect = new Phaser.Geom.Rectangle(this.center.x - 100, this.center.y - 100, 200, 200)

    let group = this.add.group()
    group.createMultiple({ key: 'bird', frame: 0, quantity: 64, visible: false, active: false })

    // randomly position the sprites within the rectangle
    Phaser.Actions.RandomRectangle(group.getChildren(), rect)

    this.input.on(
      'pointerdown',
      function () {
        // 获取组中第一个active状态为false的成员
        let bird = group.getFirstDead()
        if (bird) {
          // 激活
          bird.active = true
          // 深度值
          bird.setDepth(bird.y)

          // as soon as we play the animation, the sprite will be made visible
          bird.play('walk')
        }
      },
      this
    )
  }
}

export default Example
