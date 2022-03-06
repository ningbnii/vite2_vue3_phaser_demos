export default class MainGame extends Phaser.Scene {
  constructor() {
    super("MainGame")

    this.emojis

    this.circle1
    this.circle2

    this.child1
    this.child2

    // 选择的图标
    this.selectedEmoji = null
    // 是否匹配
    this.matched = false

    // 得分
    this.score = 0
    // 最高分
    this.highscore = 0
    // 分数文字
    this.scoreText

    // 倒计时
    this.timer

    // 时间文字
    this.timerText
    this.scaleX
    this.scaleY
  }

  create() {
    this.scaleX = this.game.config.width / 800
    this.scaleY = this.game.config.height / 600

    this.add.image(0, 0, "background").setOrigin(0, 0).setScale(this.scaleX, this.scaleY)

    // 创建2个圆圈
    this.circle1 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0xf8960e)
    this.circle2 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0x00ff00)

    // 隐藏圆圈
    this.circle1.setVisible(false)
    this.circle2.setVisible(false)

    //  Create a 4x4 grid aligned group to hold our sprites

    // 创建4x4的表情阵列
    this.emojis = this.add.group({
      key: "emojis",
      frameQuantity: 1,
      repeat: 15,
      gridAlign: {
        width: 4,
        height: 4,
        cellWidth: 90,
        cellHeight: 90,
        x: (this.game.config.width - 248) / 2, // (屏幕宽度-(4-1)*90-90/4)
        y: (this.game.config.height - 270) / 2,
      },
    })
    // this.emojis.setOrigin(0, 0)

    // 设置文字样式
    const fontStyle = {
      fontFamily: "Arial",
      fontSize: 30,
      color: "#ffffff",
      fontStyle: "bold",
      padding: 16,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 2,
        offsetY: 2,
        blur: 4,
      },
    }

    this.timerText = this.add.text(20, 20, "30:00", fontStyle)
    this.scoreText = this.add.text(450 * this.scaleX, 20, "Found: 0", fontStyle)

    // 表情
    let children = this.emojis.getChildren()

    children.forEach((child) => {
      // 表情可点击
      child.setInteractive()
    })

    // 选择表情
    this.input.on("gameobjectdown", this.selectEmoji, this)
    // 游戏开始
    this.input.once("pointerdown", this.start, this)

    // 最高分
    this.highscore = this.registry.get("highscore")

    // 初始化表情组
    this.arrangeGrid()
  }

  start() {
    // 分数重置为0
    this.score = 0
    // 状态设置为，未匹配
    this.matched = false

    // 计时器，30s后，游戏结束
    this.timer = this.time.addEvent({ delay: 30000, callback: this.gameOver, callbackScope: this })

    this.sound.play("countdown", { delay: 27 })
  }

  selectEmoji(pointer, emoji) {
    // 匹配
    if (this.matched) {
      return
    }

    //  Is this the first or second selection?
    // 如果this.selectedEmoji有值，则是第二次选择
    if (!this.selectedEmoji) {
      //  Our first emoji
      // 第一个圈套在选中的表情上
      this.circle1.setPosition(emoji.x, emoji.y)
      this.circle1.setVisible(true)
      // 将第一个选中的emoji赋值给this.selectedEmoji
      this.selectedEmoji = emoji
    } else if (emoji !== this.selectedEmoji) {
      // 保证选择的不是同一个
      //  Our second emoji

      //  Is it a match?
      // 根据frame.name,检查是否匹配
      if (emoji.frame.name === this.selectedEmoji.frame.name) {
        // 设置圆圈的颜色
        this.circle1.setStrokeStyle(3, 0x00ff00)
        // 第二个圈套在第二个表情上
        this.circle2.setPosition(emoji.x, emoji.y)
        this.circle2.setVisible(true)

        // 给两个圆圈添加动画，放大1.4，角度旋转
        this.tweens.add({
          targets: [this.child1, this.child2],
          scale: 1.4,
          angle: "-=30",
          yoyo: true,
          ease: "sine.inout",
          duration: 200,
          completeDelay: 200,
          onComplete: () => this.newRound(),
        })

        this.sound.play("match")
      } else {
        this.circle1.setPosition(emoji.x, emoji.y)
        this.circle1.setVisible(true)

        this.selectedEmoji = emoji
      }
    }
  }

  /**
   * 重新生成
   */
  newRound() {
    // 初始化
    this.matched = false

    // 分数加1
    this.score++

    // 设置文本
    this.scoreText.setText("Found: " + this.score)

    // 圆圈1设置成没选中的颜色
    this.circle1.setStrokeStyle(3, 0xf8960e)

    // 隐藏圆圈
    this.circle1.setVisible(false)
    this.circle2.setVisible(false)

    //  Stagger tween them all out
    // 原来的表情都赶走
    this.tweens.add({
      targets: this.emojis.getChildren(),
      scale: 0,
      ease: "power2",
      duration: 600,
      delay: this.tweens.stagger(100, { grid: [4, 4], from: "center" }),
      onComplete: () => this.arrangeGrid(),
    })
  }

  arrangeGrid() {
    //  We need to make sure there is only one pair in the grid
    //  Let's create an array with all possible frames in it:

    let frames = Phaser.Utils.Array.NumberArray(1, 40)
    let selected = Phaser.Utils.Array.NumberArray(0, 15)
    let children = this.emojis.getChildren()

    //  Now we pick 16 random values, removing each one from the array so we can't pick it again
    //  and set those into the sprites

    for (let i = 0; i < 16; i++) {
      // 从给定的数组中删除一个随机对象并返回它
      let frame = Phaser.Utils.Array.RemoveRandomElement(frames)

      children[i].setFrame("smile" + frame)
    }

    //  Finally, pick two random children and make them a pair:
    // 获取两个随机下标
    let index1 = Phaser.Utils.Array.RemoveRandomElement(selected)
    let index2 = Phaser.Utils.Array.RemoveRandomElement(selected)

    this.child1 = children[index1]
    this.child2 = children[index2]
    console.log(children)

    //  Set the frame to match
    this.child2.setFrame(this.child1.frame.name)

    console.log("Pair: ", index1, index2)

    //  Clear the currently selected emojis (if any)
    this.selectedEmoji = null

    //  Stagger tween them all in
    this.tweens.add({
      targets: children,
      scale: { start: 0, from: 0, to: 1 },
      ease: "bounce.out",
      duration: 600,
      delay: this.tweens.stagger(100, { grid: [4, 4], from: "center" }),
    })
  }

  update() {
    if (this.timer) {
      if (this.timer.getProgress() === 1) {
        this.timerText.setText("00:00")
      } else {
        const remaining = (30 - this.timer.getElapsedSeconds()).toPrecision(4)
        const pos = remaining.indexOf(".")

        let seconds = remaining.substring(0, pos)
        let ms = remaining.substr(pos + 1, 2)

        seconds = Phaser.Utils.String.Pad(seconds, 2, "0", 1)

        this.timerText.setText(seconds + ":" + ms)
      }
    }
  }

  // 游戏结束
  gameOver() {
    //  Show them where the match actually was
    // 两个圆圈设置到匹配的表情上，显示
    this.circle1.setStrokeStyle(4, 0xfc29a6).setPosition(this.child1.x, this.child1.y).setVisible(true)
    this.circle2.setStrokeStyle(4, 0xfc29a6).setPosition(this.child2.x, this.child2.y).setVisible(true)

    // 取消监听
    this.input.off("gameobjectdown", this.selectEmoji, this)

    console.log(this.score, this.highscore)

    // 如果超过了最高分，刷新纪录，设置最高分为当前分数
    if (this.score > this.highscore) {
      console.log("high set")

      this.registry.set("highscore", this.score)
    }

    // 匹配的连个表情，动画
    this.tweens.add({
      targets: [this.circle1, this.circle2],
      alpha: 0,
      yoyo: true,
      repeat: 2, // 重复2次
      duration: 250, // 250ms
      ease: "sine.inout",
      onComplete: () => {
        // 动画结束，一点击，重新开MainMenu
        this.input.once(
          "pointerdown",
          () => {
            this.scene.start("MainMenu")
          },
          this
        )
      },
    })
  }
}
