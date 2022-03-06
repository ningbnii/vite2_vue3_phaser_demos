import Track from "./Track.js"
import Player from "./Player.js"

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("MainGame")

    // 玩家
    this.player
    // 跟踪
    this.tracks

    // 得分
    this.score = 0
    // 最高分
    this.highscore = 0
    // 信息板
    this.infoPanel

    // 分数计时器
    this.scoreTimer
    // 分数文本
    this.scoreText
    // 最高分文本
    this.highscoreText
  }

  create() {
    // 得分归0
    this.score = 0
    // 最高分
    this.highscore = this.registry.get("highscore")

    // 背景图
    this.add.image(512, 384, "background")

    // 轨道
    this.tracks = [new Track(this, 0, 196), new Track(this, 1, 376), new Track(this, 2, 536), new Track(this, 3, 700)]

    // 玩家
    this.player = new Player(this, this.tracks[0])

    this.add.image(0, 0, "overlay").setOrigin(0)

    this.add.image(16, 0, "sprites", "panel-score").setOrigin(0)
    this.add.image(1024 - 16, 0, "sprites", "panel-best").setOrigin(1, 0)

    this.infoPanel = this.add.image(512, 384, "sprites", "controls")
    this.scoreText = this.add.text(140, 2, this.score, { fontFamily: "Arial", fontSize: 32, color: "#ffffff" })
    this.highscoreText = this.add.text(820, 2, this.highscore, { fontFamily: "Arial", fontSize: 32, color: "#ffffff" })

    this.input.keyboard.once("keydown-SPACE", this.start, this)
    this.input.keyboard.once("keydown-UP", this.start, this)
    this.input.keyboard.once("keydown-DOWN", this.start, this)
  }

  start() {
    // 移除所有键盘监听
    this.input.keyboard.removeAllListeners()

    this.tweens.add({
      targets: this.infoPanel,
      y: 700,
      alpha: 0,
      duration: 500,
      ease: "Power2",
    })

    // 玩家开始
    this.player.start()

    this.tracks[0].start(4000, 8000)
    this.tracks[1].start(500, 1000)
    this.tracks[2].start(5000, 9000)
    this.tracks[3].start(6000, 10000)

    // 分数计时器，1秒中执行一次，看小企鹅坚持多长时间
    this.scoreTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.score++
        this.scoreText.setText(this.score)
      },
      callbackScope: this,
      repeat: -1,
    })
  }

  // 游戏结束
  gameOver() {
    // 信息板显示gameover
    this.infoPanel.setTexture("gameover")

    // 信息板出现
    this.tweens.add({
      targets: this.infoPanel,
      y: 384,
      alpha: 1,
      duration: 500,
      ease: "Power2",
    })

    // 停止每条轨道
    this.tracks.forEach((track) => {
      track.stop()
    })

    // 停止所有声音
    this.sound.stopAll()
    // 播放gameover
    this.sound.play("gameover")

    // 停止玩家
    this.player.stop()

    // 销毁分数计时器
    this.scoreTimer.destroy()

    // 是否超过最高分了
    if (this.score > this.highscore) {
      this.highscoreText.setText("NEW!")

      this.registry.set("highscore", this.score)
    }

    // 空格，重新开始
    this.input.keyboard.once(
      "keydown-SPACE",
      () => {
        this.scene.start("MainMenu")
      },
      this
    )

    // 点击重新开始
    this.input.once(
      "pointerdown",
      () => {
        this.scene.start("MainMenu")
      },
      this
    )
  }
}
