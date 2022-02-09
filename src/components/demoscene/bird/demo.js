// var track
// var bird
// this.egg = 0 // 全局变量，页面返回后，值仍然在
// var chick1
// var chick2
// var chick3
// var loadImage
class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "demo",
      active: false,
      visible: false,
    })
    this.egg = 0 // 全局变量，页面返回后，值仍然在
  }

  preload() {
    this.loadImage = this.add.image(0, 0, "loader").setOrigin(0)
    this.load.audio("jungle", ["assets/audio/jungle.mp3"])
    this.load.animation("birdyAnims", "assets/demoscene/birdy.json")
    this.load.image("bg1", "assets/demoscene/birdy-nam-nam-bg1.png")
    this.load.image("bg2", "assets/demoscene/birdy-nam-nam-bg2.png")
    this.load.atlas("birdy", "assets/demoscene/budbrain.png", "assets/demoscene/budbrain.json")
  }

  create() {
    // 页面失去焦点，仍然播放
    this.sound.pauseOnBlur = false

    this.track = this.sound.add("jungle")

    this.anims.create({
      key: "lay",
      frames: this.anims.generateFrameNames("birdy", { prefix: "lay", start: 0, end: 19 }),
      frameRate: 28,
    })

    if (this.sound.locked) {
      // 更换纹理
      this.loadImage.setTexture("click")
      this.sound.once("unlocked", () => {
        this.startDemo()
      })
    } else {
      this.startDemo()
    }
  }

  startDemo() {
    // 隐藏加载页面
    this.loadImage.setVisible(false)
    // 显示背景1
    this.add.image(0, 0, "bg1").setOrigin(0)
    // 显示鸟，设置鸟的层级为10，这样，鸟会在蛋上面
    this.bird = this.add.sprite(328, 152, "birdy", "lay0").setOrigin(0).setDepth(10)
    this.bird.on("animationcomplete", this.dropEgg, this)
    // 2250毫秒后开始播放动画lay
    this.bird.anims.playAfterDelay("lay", 2250)
    this.track.play()
  }

  /**
   * 下蛋
   */
  dropEgg() {
    console.log("dropEgg")

    // 添加一个蛋
    var smallEgg = this.add.image(this.bird.x + 116, 228, "birdy", "egg-small").setOrigin(0)
    // 下蛋动画
    this.tweens.add({
      targets: smallEgg,
      y: 288,
      ease: "Linear",
      delay: 800,
      duration: 200,
      completeDelay: 800,
      onComplete: this.moveBird,
      callbackScope: this,
    })
    this.egg++
  }

  /**
   * 移动
   */
  moveBird() {
    console.log("moveBird", this.egg, this.bird.x)

    if (this.egg < 3) {
      // 往左移动124
      this.bird.x -= 124
      // 动画设置到第一帧
      this.bird.setFrame("lay0")
      // 播放动画
      this.bird.anims.play("lay")
    } else {
      // 更换背景
      // 添加一个时间监听事件，800毫秒后，执行changeScene
      this.time.addEvent({ delay: 800, callback: this.changeScene, callbackScope: this })
    }
  }

  changeScene() {
    // 移除所有对象
    this.children.removeAll()
    this.add.image(0, 0, "bg2").setOrigin(0)

    this.chick1 = this.add.sprite(100, 72, "birdy", "hatch1").setOrigin(0)
    this.chick2 = this.add.sprite(260, 72, "birdy", "hatch1").setOrigin(0)
    this.chick3 = this.add.sprite(420, 72, "birdy", "hatch1").setOrigin(0)

    this.chick1.anims.playAfterDelay("hatch", 1000 - 200)
    this.chick2.anims.playAfterDelay("hatch", 2000 - 200)
    this.chick3.anims.playAfterDelay("hatch", 3000 - 200)

    this.time.addEvent({ delay: 4500, callback: this.checkDisOut, callbackScope: this })
  }

  checkDisOut() {
    this.chick1.anims.play("lookRight")
    this.chick2.anims.play("checkDisOut")
    this.chick3.anims.play("lookLeft")
  }
}

export default Demo
