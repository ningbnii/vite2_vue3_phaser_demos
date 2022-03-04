import Door from './Door.js'

export default class MainGame extends Phaser.Scene {
  constructor() {
    super('MainGame')

    // 帽子
    this.hats
    // 得分
    this.goals
    // 金子
    this.gold
    // 保存门
    this.doors

    // 暂停
    this.isPaused = false
    // 得分完成
    this.goalsComplete = 0
    // 登录图片
    this.sign

    // 等级
    this.level = 1
    // 等级图片
    this.levelImage

    // 土匪射击延迟
    this.killDelay = 0.7
    // 门最低开多长时间
    this.closeDurationLow = 2000
    // 门最多开多长时间
    this.closeDurationHigh = 4000
  }

  create() {
    this.add.image(512, 384, 'background')

    //  Level text
    this.add.image(450, 650, 'assets', 'levelText')

    this.levelImage = this.add.image(600, 650, 'assets', '1')

    // 创建得分
    this.createGoals()
    // 创建门
    this.createDoors()

    // 创建一个帽子的组
    this.hats = this.add.group({
      defaultKey: 'assets',
      defaultFrame: 'hat',
      key: 'assets',
      frame: 'hat',
      active: false,
      visible: false,
      repeat: 32,
      maxSize: 32,
    })

    // 创建一个金子的组
    this.gold = this.add.group({
      defaultKey: 'assets',
      defaultFrame: 'gold',
      key: 'assets',
      frame: 'gold',
      active: false,
      visible: false,
      repeat: 11,
      maxSize: 12,
    })

    // 设置为开始状态
    this.isPaused = false

    // 等级1
    this.level = 1
    // 土匪延迟0.8射击
    this.killDelay = 0.8
    // 门最低开多长时间
    this.closeDurationLow = 2000
    // 门最多开多长时间
    this.closeDurationHigh = 4000

    // 门打开
    this.doors.forEach((door) => {
      door.start(this.game.getTime())
    })
  }

  /**
   * 创建得分
   */
  createGoals() {
    // 初始化，保存得分的数组设置为空
    this.goals = []
    // 得分完成设置为0
    this.goalsComplete = 0

    for (let i = 1; i <= 12; i++) {
      this.goals.push(this.add.image(0, 0, 'assets', i))
    }

    // 等间距排列
    Phaser.Actions.GridAlign(this.goals, {
      width: 12,
      height: 1,
      cellWidth: 80,
      cellHeight: 36,
      x: 80,
      y: 86,
    })
  }

  createDoors() {
    // 保存门
    this.doors = []

    // 门的宽度
    let doorWidth = 200
    // 门的间距，一共有4个门，有5个空
    let doorSpace = Math.floor((1024 - doorWidth * 4) / 5)

    // 第一个门的横坐标
    let x = 100 + doorSpace
    let y = 352

    // 4个门
    for (let i = 1; i <= 4; i++) {
      this.doors.push(new Door('Door' + i, this, x, y))

      x += doorWidth + doorSpace
    }
  }

  /**
   * 获取金子
   * @param {*} x
   * @param {*} y
   */
  addGold(x, y) {
    // 当前要完成的目标
    let target = this.goals[this.goalsComplete]

    // 获取一个金子
    let gold = this.gold.get(x + 50, y + 100)

    // 设置金子可见
    gold.setActive(true).setVisible(true)

    // 播放money
    this.sound.play('money')

    // 金子跑到目标数字上
    this.tweens.add({
      targets: gold,
      x: target.x,
      y: target.y,
      duration: 600,
      ease: 'Quad.easeOut',
      onComplete: () => {
        // 隐藏数字
        target.setVisible(false)
      },
    })

    // 要完成的目标+1
    this.goalsComplete++

    // 如果要完成的目标=12了，升级
    if (this.goalsComplete === 12) {
      this.levelComplete()
    }
  }

  /**
   * 添加帽子
   * @param {*} x
   * @param {*} y
   * @param {*} stackPosition
   */
  addHat(x, y, stackPosition) {
    // 帽子位置
    y = 180 + 30 * (5 - stackPosition)

    // 获取一个帽子
    let hat = this.hats.get(x, y)

    // 激活
    hat.setActive(true).setVisible(true)
    hat.setScale(1).setAlpha(1)

    // 目标x，y
    const destX = Phaser.Math.RND.between(x - 400, x + 400)
    const destY = y - 400

    // 帽子动画
    this.tweens.add({
      targets: hat,
      x: destX,
      y: destY,
      angle: 960, // 旋转
      duration: 1000,
      ease: 'Quad.easeOut',
      onComplete: () => {
        hat.setActive(false)
        hat.setVisible(false)
      },
    })
  }

  /**
   * 当前等级挑战失败
   */
  levelFail() {
    // 游戏暂停
    this.isPaused = true

    // 出现sign画面
    this.sign = this.add.image(512, -200, 'assets', 'gameOver')

    // 播放gameOver
    this.sound.play('gameOver')

    // sign动画
    this.tweens.add({
      targets: this.sign,
      y: 384,
      ease: 'Bounce.easeOut',
      duration: 1500,
      onComplete: () => {
        // 点击重新开始MainMenu
        this.input.once('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      },
    })
  }

  /**
   * 完成当前等级
   */
  levelComplete() {
    // 游戏暂停
    this.isPaused = true

    // 显示升级图片
    this.sign = this.add.image(512, -200, 'assets', 'levelComplete')

    // 播放升级声音
    this.sound.play('levelComplete')

    // 升级图片动画
    this.tweens.add({
      targets: this.sign,
      y: 384,
      ease: 'Bounce.easeOut',
      duration: 1500,
      onComplete: () => {
        // 动画结束后，点击执行nextLevel()
        this.input.once('pointerdown', () => this.nextLevel())
      },
    })
  }

  /**
   * 下一级
   */
  nextLevel() {
    // 目标初始化
    this.goals.forEach((goal, index) => {
      goal.setFrame((index + 1).toString())
      goal.setVisible(true)
    })

    // 金子隐藏
    this.gold.getChildren().forEach((gold) => {
      gold.setVisible(false)
      gold.setActive(false)
    })

    //  Reset everything
    // 门重置
    this.doors.forEach((door) => {
      door.reset(this.game.getTime())
    })

    // 要完成的目标初始化
    this.goalsComplete = 0

    //  Change difficulty
    // 改变难度
    // 5级之前，土匪射击越来越快
    if (this.level < 5) {
      this.killDelay -= 0.1
    }

    // 10级之间，同时，门开的时间越来越短
    if (this.level < 10) {
      this.closeDurationLow -= 100
      this.closeDurationHigh -= 200
    }

    //  Change level counter
    // 升级
    this.level++

    // 设置等级
    this.levelImage.setFrame(this.level)

    // 隐藏登录
    this.sign.setVisible(false)

    // 取消暂停
    this.isPaused = false
  }

  killed(x, y) {
    //  Bullet holes on the screen

    let offsetX = 100

    // 三个弹孔
    for (let i = 0; i < 3; i++) {
      let x = Phaser.Math.RND.between(offsetX, offsetX + 200)
      let y = Phaser.Math.RND.between(200, 600)
      // 弹孔
      let hole = this.add.image(x, y, 'bulletHole').setAlpha(0)

      // 弹孔动画，每个弹孔间隔200ms
      this.tweens.add({
        targets: hole,
        alpha: 1,
        duration: 30,
        delay: 200 * i,
      })

      // 弹孔水平偏移
      offsetX += 340
    }

    // 升级失败
    this.levelFail()
  }

  update(time) {
    // 游戏不暂停，门就会一直开
    if (!this.isPaused) {
      this.doors.forEach((door) => {
        door.update(time)
      })
    }
  }
}
