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
    this.load.spritesheet('diamonds', 'diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
  }

  create() {
    this.anims.create({
      key: 'flash',
      frames: this.anims.generateFrameNumbers('diamonds', { start: 0, end: 4 }),
      frameRate: 1,
      repeat: -1,
    })

    let group = this.add.group()
    group.createMultiple({ key: 'diamonds', frame: 0, repeat: 279 })
    Phaser.Actions.GridAlign(group.getChildren(), { width: 20, height: 20, cellWidth: 38, cellHeight: 38, y: 50 })

    // 获取具有动画组件的游戏对象数组，然后开始播放给定的动画flash，每个游戏对象的开始时间以stagger的量递增地偏移
    this.anims.staggerPlay('flash', group.getChildren(), 60)
  }
}

export default Example
