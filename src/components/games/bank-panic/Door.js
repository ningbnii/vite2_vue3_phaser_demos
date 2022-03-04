export default class Door extends Phaser.GameObjects.Container {
  // 容器
  constructor(name, scene, x, y) {
    super(scene, x, y)

    // 名字
    this.name = name

    // 背景
    this.background = scene.add.image(0, 0, 'assets', 'doorBackground')
    // 门
    this.door = scene.add.sprite(0, 0, 'assets', 'door1')
    // 人物
    this.character = scene.add.image(0, 0, 'assets', 'bandit1')
    // 人物的帧
    this.characterFrame = 'bandit1'

    // 门是否打开
    this.isOpen = false
    // 是不是土匪
    this.isBandit = false
    // 是福不是帽子
    this.isHats = false
    // 是否死亡
    this.isDead = false

    this.wasBandit = scene.doors.length % 2 ? true : false

    // 帽子数量
    this.hats = 0
    this.timeToOpen = Number.MAX_SAFE_INTEGER
    this.timeToClose = Number.MAX_SAFE_INTEGER
    this.timeToKill = 0

    // 人物的key数组
    this.characters = ['bandit1', 'bandit2', 'cowboy1', 'cowboy2', 'hat']

    // 添加到容器中
    this.add([this.background, this.character, this.door])

    // 设置大小
    this.setSize(200, 400)

    // 设置可以点击
    this.setInteractive()

    // 点击事件
    this.on('pointerup', this.shoot, this)

    // 容器添加到场景中
    scene.add.existing(this)
  }

  // 不能加destroy，会报错
  // destroy() {
  //   // 移除事件监听
  //   this.off('pointerup')
  // }

  start(time) {
    // 获取门开的时间
    this.timeToOpen = time + Phaser.Math.RND.between(500, 4000)
  }

  reset(time) {
    // 门初始化
    this.isOpen = false
    this.isBandit = false
    this.isHats = false
    this.isDead = false

    this.door.play('doorClose')

    // 获取开门时间
    this.timeToOpen = time + Phaser.Math.RND.between(500, 4000)
  }

  /**
   * 开门
   * @param {开门时间} time
   */
  openDoor(time) {
    // 开门
    this.isOpen = true
    // 不是土匪
    this.isBandit = false
    // 不是帽子
    this.isHats = false
    // 没有死亡
    this.isDead = false

    // 随机获取人物帧
    this.characterFrame = Phaser.Utils.Array.GetRandom(this.characters)

    //  When should this door close again?
    // 门开duration时长，获取一个随机值
    const duration = Phaser.Math.RND.between(this.scene.closeDurationLow, this.scene.closeDurationHigh)

    // 关门时间
    this.timeToClose = time + duration

    // 如果是土匪，土匪有两种
    if (this.characterFrame === 'bandit1' || this.characterFrame === 'bandit2') {
      // 设置为土匪
      this.isBandit = true
    } else if (this.characterFrame === 'hat') {
      // 设置成帽子
      this.isHats = true

      //  Pick random number of hats
      // 帽子的值
      this.hats = Phaser.Math.RND.between(2, 5)

      // 帽子的帧
      this.characterFrame += this.hats.toString()
    } else {
      // 门开着的时间减少一半
      this.timeToClose = time + duration / 2
    }

    //  If we had a citizen or hats on our last go, we have to have a bandit now
    // 如果我们最后一次有公民或者帽子，就必须出一个土匪
    // 最后一次是不是土匪，这次不是土匪
    if (!this.wasBandit && !this.isBandit) {
      // 不是帽子
      this.isHats = false
      // 帽子0
      this.hats = 0
      // 设置为土匪
      this.isBandit = true
      // 土匪的帧随机获取一个
      this.characterFrame = Math.random() > 0.5 ? 'bandit1' : 'bandit2'
      // 关门时间
      this.timeToClose = time + duration
    }

    // 设置任务的帧
    this.character.setFrame(this.characterFrame)
    // 设置缩放和透明度
    // this.character.setScale(1).setAlpha(1)

    // 如果是土匪
    if (this.isBandit) {
      // 土匪射击时间，当前时间+门开着的时间*一个延时参数
      this.timeToKill = time + duration * this.scene.killDelay
    }

    this.scene.sound.play('door')

    // 开门
    this.door.play('doorOpen')
  }

  /**
   * 关门
   * @param {关门时间} time
   */
  closeDoor(time) {
    // 关门
    this.door.play('doorClose')

    // 关门状态
    this.isOpen = false
    // 上一次是不是土匪
    this.wasBandit = this.isBandit

    // 不是土匪 && 不是帽子 && 不是死者
    if (!this.isBandit && !this.isHats && !this.isDead) {
      // 获得金子
      this.scene.addGold(this.x, this.y)
    }

    //  When should this door open again?
    this.timeToOpen = time + Phaser.Math.RND.between(2000, 4000)
  }

  /**
   * 射击
   * @returns
   */
  shoot() {
    // 门关着 || 游戏暂停
    if (!this.isOpen || this.scene.isPaused) {
      return
    }

    // 播放射击
    this.scene.sound.play('shot')

    // 如果是死者
    if (this.isDead) {
      //  We will want to hear the gunshot, but not actually do anything with it
      return
    }

    // 如果是土匪
    if (this.isBandit) {
      // 射击关门
      this.shootCharacter(true)
    } else {
      // 帽子
      if (this.isHats) {
        // 射击帽子
        this.shootHat()
      } else {
        // 射击不关门，游戏失败
        this.shootCharacter(false)
      }
    }
  }

  shootCharacter(closeDoor) {
    // 死亡
    this.isDead = true

    // 人物帧换成dead
    this.characterFrame += 'Dead'

    // 设置帧
    this.character.setFrame(this.characterFrame)

    // 播放声音
    this.scene.sound.play('scream' + Phaser.Math.RND.between(1, 3))

    // 人物动画，缩放一半
    this.scene.tweens.add({
      targets: this.character,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 300,
      onComplete: () => {
        // 如果关门
        if (closeDoor) {
          // 关门
          this.closeDoor(this.scene.game.getTime())
        } else {
          // 当前等级挑战失败
          this.scene.levelFail()
        }
      },
    })

    //  No more shots at this door
    // 如果不关门
    if (!closeDoor) {
      // 取消这扇门的鼠标监听
      this.off('pointerup')
      // 游戏暂停
      this.scene.isPaused = true
    }
  }

  shootHat() {
    // 帽子数量>0
    if (this.hats > 0) {
      // 添加帽子
      this.scene.addHat(this.x, this.y, this.hats)

      // 帽子数量减少一个
      this.hats--

      // 更改人物帧
      this.characterFrame = 'hat' + this.hats
    }

    // 设置人物帧
    this.character.setFrame(this.characterFrame)
  }

  /**
   * 土匪射击
   */
  shootYou() {
    // 你不能点击了
    this.off('pointerup')

    // 游戏暂停
    this.scene.isPaused = true

    //  Shots

    // 添加子弹
    let shot1 = this.scene.add.image(this.x, this.y, 'assets', this.characterFrame + 'shot1')
    let shot2 = this.scene.add.image(this.x, this.y, 'assets', this.characterFrame + 'shot2')

    // 播放土匪射击声音
    this.scene.sound.play('banditShot')
    // 延迟0.25秒再播放
    this.scene.sound.play('banditShot', { delay: 0.25 })
    // 延迟0.5秒再播放
    this.scene.sound.play('banditShot', { delay: 0.5 })

    // 子弹动画，消失
    this.scene.tweens.add({
      targets: shot1,
      alpha: 0,
      duration: 200,
      ease: 'Power2',
    })

    // 子弹动画，消失
    this.scene.tweens.add({
      targets: shot2,
      alpha: 0,
      duration: 200,
      delay: 200, // 子弹1动画结束后再子弹2
      ease: 'Power2',
      onComplete: () => {
        // 执行killed
        this.scene.killed(this.x, this.y)
      },
    })

    //  Gun smoke rising from the bandit

    // 烟雾
    let smoke1 = this.scene.add.image(this.x, this.y, 'assets', this.characterFrame + 'smoke1')
    let smoke2 = this.scene.add.image(this.x, this.y, 'assets', this.characterFrame + 'smoke2')

    // 子弹烟雾动画，y，透明度
    this.scene.tweens.add({
      targets: smoke1,
      props: {
        y: { value: 150, duration: 1000, ease: 'Sine.easeInOut' },
        alpha: { value: 0, duration: 250, ease: 'Power2', delay: 750 },
      },
    })

    this.scene.tweens.add({
      targets: smoke2,
      props: {
        y: { value: 150, duration: 1000, ease: 'Sine.easeInOut', delay: 500 },
        alpha: { value: 0, duration: 250, ease: 'Power2', delay: 1250 },
      },
    })
  }

  /**
   * 随事件线更改状态
   * @param {*} time
   */
  update(time) {
    // 如果门关着，到了开门的时间
    if (!this.isOpen && time >= this.timeToOpen) {
      // 开门，传当前时间
      this.openDoor(time)
    } else if (this.isOpen && time >= this.timeToClose) {
      // 判断是不是该关门了，门开着，并且到关门时间了
      this.closeDoor(time)
    } else if (this.isOpen && this.isBandit && !this.isDead && time >= this.timeToKill) {
      // 门开着 && 土匪 && 人物没有死 && 土匪能射击了
      this.shootYou()
    }
  }
}
