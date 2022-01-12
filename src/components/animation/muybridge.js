// import cybercity_json from '../../assets/cybercity/cybercity-multi.json'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.data = {}
  }

  preload() {
    this.load.spritesheet('muybridge', 'assets/muybridge01.png', { frameWidth: 119, frameHeight: 228 })
  }

  create() {
    this.anims.create({
      key: 'run',
      frames: 'muybridge',
      frameRate: 5,
      repeat: -1,
    })

    let group = this.add.group()

    //创建多个游戏对象并将它们添加到该组
    group.createMultiple({
      key: 'muybridge',
      frame: 10,
      repeat: 7,
      setOrigin: { x: 0, y: 0.5 },
      setXY: { x: 0, y: 300, stepX: 119 }, //从 `setXY.x` 开始，将每个游戏对象的水平位置从前一个增加这个量
    })

    //获取具有动画组件的游戏对象数组，然后开始在它们上播放给定的动画。 每个游戏对象的开始时间以“交错”量递增。
    //stragger:每次播放时间偏移的时间量（以毫秒为单位）。 如果给出一个负值，它会以相反的顺序应用到孩子身上。
    //straggerFirst:第一个孩子也应该错开吗？ 默认为真。
    this.anims.staggerPlay('run', group.getChildren(), -100, false)
  }
}

export default Example
