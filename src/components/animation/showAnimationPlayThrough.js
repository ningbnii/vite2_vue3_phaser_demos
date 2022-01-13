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
    this.load.spritesheet('mummy', 'mummy37x45.png', { frameWidth: 37, frameHeight: 45 })
  }

  create() {
    // frame debug view
    this.frameView = this.add.graphics({ fillStyle: { color: 0xff00ff }, x: 32, y: 32 })

    // show the whole animation sheet
    this.add.image(32, 32, 'mummy', '__BASE').setOrigin(0)

    this.anim = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mummy'),
      frameRate: 8,
      yoyo: true,
      repeat: -1,
    })

    this.sprite = this.add.sprite(this.center.x, this.center.y, 'mummy').setScale(4)

    // debug text
    this.progress = this.add.text(100, 100, 'progress: 0%', { color: '#00ff00' })

    // 键盘输入,监听的建名必须大写
    this.input.keyboard.on(
      'keydown-SPACE',
      function (event) {
        this.sprite.play('walk')
      },
      this
    )

    this.input.keyboard.on(
      'keydown-R',
      function (event) {
        this.sprite.anims.restart()
      },
      this
    )

    // 暂停
    this.input.keyboard.on(
      'keydown-P',
      function (event) {
        if (this.sprite.anims.isPaused) {
          this.sprite.anims.resume()
        } else {
          this.sprite.anims.pause()
        }
      },
      this
    )
  }

  update() {
    this.updateFrameView()
    const debug = [
      'SPACE to start animation, P to pause/resume, R to restart',
      '',
      'Progress: ' + this.sprite.anims.getProgress() * 100 + '%', // this.sprite.anims.getProgress() 进度
      'Accumulator: ' + this.sprite.anims.accumulator, // 累加器
      'NextTick: ' + this.sprite.anims.nextTick, // 下一个勾选
    ]

    // setText 可以设置数组，每个item一行
    this.progress.setText(debug)
  }

  updateFrameView() {
    // 正在播放动画 anims.isPlaying
    if (this.sprite.anims.isPlaying) {
      // 清空图层
      this.frameView.clear()
      // this.sprite.frame.cutX 要从中剪切的源图像中的 X 位置
      this.frameView.fillRect(this.sprite.frame.cutX, 0, 37, 45)
    }
  }
}

export default Example
