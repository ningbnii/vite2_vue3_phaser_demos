import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.horseFrames = []
    for (let i = 0; i < 12; i++) {
      this.horseFrames.push({
        key: "horse" + ("0" + i).slice(-2),
        frame: "__BASE",
      })
    }
  }

  preload() {
    this.load.path = "assets/"
    this.load.bitmapFont("atari-classic", "atari-classic.png", "atari-classic.xml")
    // loading horse animation
    for (let i = 0; i < this.horseFrames.length; i++) {
      this.load.image(this.horseFrames[i].key, "horse/frame_" + ("0" + i).slice(-2) + "_delay-0.05s.png")
    }

    // loading audio
    this.load.audio("left", ["audio/left.mp3"])
    this.load.audio("right", ["audio/right.mp3"])
  }

  create() {
    this.anims.create({
      key: "horse",
      frames: this.horseFrames,
      frameRate: 20,
      repeat: -1,
    })

    this.horseLeft = this.add.sprite(200, 300, "horse09")
    this.horseLeft.setScale(400 / 480)

    this.horseRight = this.add.sprite(600, 300, "horse10")
    this.horseRight.setScale(400 / 480)

    this.soundLeft = this.sound.add("left")
    this.soundLeft.play({
      loop: true,
    })

    this.soundRight = this.sound.add("right")
    this.soundRight.play({
      loop: true,
    })

    if (this.sound.locked) {
      let text = this.add.bitmapText(this.center.x, 50, "atari-classic", "tap to start", 20).setOrigin(0.5)
      // text.x -= Math.round(text.width / 2)
      // text.y -= Math.round(text.height / 2)

      this.sound.once(
        "unlocked",
        function (soundManager) {
          text.visible = false
          this.start.call(this)
        },
        this
      )
    } else {
      this.start.call(this)
    }
  }

  start() {
    this.horseLeft.play("horse")
    this.horseRight.play("horse")

    let gui = new dat.GUI()
    let sm = gui.addFolder("sound manager")
    sm.add(this.sound, "mute").listen() // 静音
    sm.add(this.sound, "volume", 0, 1).listen() // 音量
    sm.add(this.sound, "rate", 0.5, 2).listen() // 音频速率
    sm.add(this.sound, "detune", -1200, 1200).step(50).listen() // 代表振荡频率的失谐量
    // sm.open()

    let sl = gui.addFolder("left")
    sl.add(this.soundLeft, "mute").listen()
    sl.add(this.soundLeft, "volume", 0, 1).listen()
    sl.add(this.soundLeft, "rate", 0.5, 2).listen()
    sl.add(this.soundLeft, "detune", -1200, 1200).step(50).listen()
    // sl.open()

    let sr = gui.addFolder("right")
    sr.add(this.soundRight, "mute").listen()
    sr.add(this.soundRight, "volume").listen()
    sr.add(this.soundRight, "rate", 0.5, 2).listen()
    sr.add(this.soundRight, "detune", -1200, 1200).step(50).listen()
    // sr.open()
  }

  update() {
    // 马跑的快，音乐放的快，马跑的慢，音乐放的慢
    this.horseLeft.anims.timeScale = this.soundLeft.totalRate
    this.horseRight.anims.timeScale = this.soundRight.totalRate

    // 音量控制透明度
    this.horseLeft.setAlpha(this.sound.volume * this.soundLeft.volume)
    this.horseRight.setAlpha(this.sound.volume * this.soundRight.volume)

    // 同时不静音才显示
    this.horseLeft.visible = !this.sound.mute && !this.soundLeft.mute
    this.horseRight.visible = !this.sound.mute && !this.soundRight.mute
  }
}

export default Example
