class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image('bg', 'assets/pics/uv-grid-diag.png')
    this.load.image('block', 'assets/sprites/block.png')
  }

  create() {
    // 设置相机的视口
    this.cameras.main.setBounds(0, 0, 1024 * 2, 1024 * 2)
    // 添加4个图片拼接到一起
    this.add.image(0, 0, 'bg').setOrigin(0)
    this.add.image(1024, 0, 'bg').setOrigin(0)
    this.add.image(0, 1024, 'bg').setOrigin(0)
    this.add.image(1024, 1024, 'bg').setOrigin(0)

    // 键盘对象
    this.cursors = this.input.keyboard.createCursorKeys()
    // 添加键盘监听，wasd控制移动
    this.keys = this.input.keyboard.addKeys('W,A,S,D')

    // 中心点设置到相机窗口范围的中心
    // 相机会定位到4张图片的交点处(1024,1024)
    this.cameras.main.centerToBounds()

    this.text = this.add
      .text(32, 32)
      .setScrollFactor(0) // 不跟随相机变化位置
      .setFontSize(32)
      .setColor('#ffffff')
  }

  update() {
    const cam = this.cameras.main

    this.text.setText([
      'ScrollX: ' + cam.scrollX,
      'ScrollY: ' + cam.scrollY,
      'MidX: ' + cam.midPoint.x,
      'MidY: ' + cam.midPoint.y,
    ])

    // this.input.keyboard.on('keydown-A',function(){})
    // 键盘按下事件 isDown
    if (this.keys.A.isDown) {
      cam.scrollX -= 6
    } else if (this.keys.D.isDown) {
      cam.scrollX += 6
    } else if (this.keys.W.isDown) {
      cam.scrollY -= 6
    } else if (this.keys.S.isDown) {
      cam.scrollY += 6
    }

    if (this.cursors.left.isDown) {
      cam.rotation -= 0.01
    } else if (this.cursors.right.isDown) {
      cam.rotation += 0.01
    }
  }
}

export default Example
