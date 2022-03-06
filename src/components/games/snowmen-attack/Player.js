export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, track) {
    super(scene, 900, track.y, "sprites", "idle000")

    // 游戏对象的原点
    this.setOrigin(0.5, 1)

    // 添加到场景中
    scene.add.existing(this)
    // 添加到物理系统中
    scene.physics.add.existing(this)

    // 活着
    this.isAlive = true
    // 正在扔雪球
    this.isThrowing = false

    // 声音
    this.sound = scene.sound
    // 当前轨道
    this.currentTrack = track

    // 空格
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    // 上
    this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    // 下
    this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    // 播放动画
    this.play("idle")
  }

  start() {
    // 活着
    this.isAlive = true
    // 没有扔雪球
    this.isThrowing = false

    // 第一条轨道
    this.currentTrack = this.scene.tracks[0]
    // y值和第一条轨道一样
    this.y = this.currentTrack.y
    // 完成开始扔雪球动画
    this.on("animationcomplete-throwStart", this.releaseSnowball, this)
    // 完成结束扔雪球动画
    this.on("animationcomplete-throwEnd", this.throwComplete, this)

    // 播放动画战力
    this.play("idle", true)
  }

  // 上移
  moveUp() {
    // 循环移动，第一个，往上，是最后一个
    if (this.currentTrack.id === 0) {
      this.currentTrack = this.scene.tracks[3]
    } else {
      this.currentTrack = this.scene.tracks[this.currentTrack.id - 1]
    }

    // 设置y坐标
    this.y = this.currentTrack.y

    // 播放move声音
    this.sound.play("move")
  }

  // 下移
  moveDown() {
    if (this.currentTrack.id === 3) {
      this.currentTrack = this.scene.tracks[0]
    } else {
      this.currentTrack = this.scene.tracks[this.currentTrack.id + 1]
    }

    this.y = this.currentTrack.y

    this.sound.play("move")
  }

  // 扔雪球
  throw() {
    // 正在扔
    this.isThrowing = true

    // 播放开始扔雪球动画
    this.play("throwStart")

    // 播放扔雪球声音
    this.sound.play("throw")
  }

  // 释放雪球
  releaseSnowball() {
    // 扔雪球结束
    this.play("throwEnd")

    // 当前轨道扔雪球，设置为玩家的x坐标
    this.currentTrack.throwPlayerSnowball(this.x)
  }

  // 扔雪球结束
  throwComplete() {
    // 扔雪球结束
    this.isThrowing = false

    // 播放站立动画
    this.play("idle")
  }

  // 停止
  stop() {
    // 死了
    this.isAlive = false

    // 停止
    this.body.stop()

    // 播放die动画
    this.play("die")
  }

  // 更新之前
  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    // 死了，不再更新
    if (!this.isAlive) {
      return
    }

    // 下移动
    if (Phaser.Input.Keyboard.JustDown(this.up)) {
      this.moveUp()
    } else if (Phaser.Input.Keyboard.JustDown(this.down)) {
      // 上移动
      this.moveDown()
    } else if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.isThrowing) {
      // 扔雪球
      this.throw()
    }
  }
}
