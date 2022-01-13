import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = "assets/"
    this.load.bitmapFont("atari-classic", "atari-classic.png", "atari-classic.xml")
    this.load.image("streets", "cyberpunk-street.png")
    this.load.atlas("speakers", "speakers.png", "speakers.json")

    this.load.audio("bass", ["audio/bass.mp3"])
    this.load.audio("drums", ["audio/drums.mp3"])
    this.load.audio("percussion", ["audio/percussion.mp3"])
    this.load.audio("synth1", ["audio/synth1.mp3"])
    this.load.audio("synth2", ["audio/synth2.mp3"])
    this.load.audio("top1", ["audio/top1.mp3"])
    this.load.audio("top2", ["audio/top2.mp3"])
  }

  create() {
    this.sound.audioPlayDelay = 0.1
    this.sound.loopEndOffset = 0.05

    let streets = this.add.image(0, 0, "streets").setOrigin(0)
    streets.setScale(this.height / 192)

    this.topLeftSpeaker = this.add.image(100, this.height - 100, "speakers")
    this.topRightSpeaker = this.add.image(120, this.height - 50, "speakers")
    this.middleSpeaker = this.add.image(250, this.height - 100, "speakers")
    this.bottomSpeaker = this.add.image(270, this.height - 50, "speakers")

    this.bass = this.sound.add("bass")
    let drums = this.sound.add("drums")
    let percussion = this.sound.add("percussion")
    let synth1 = this.sound.add("synth1")
    let synth2 = this.sound.add("synth2")
    let top1 = this.sound.add("top1")
    let top2 = this.sound.add("top2")

    this.gui = new dat.GUI()
    let sm = this.gui.addFolder("Sound Manager")
    sm.add(this.sound, "rate", 0.5, 2).listen()
    sm.add(this.sound, "detune", -1200, 1200).step(50).listen()

    let loopMarker = {
      name: "loop",
      start: 0,
      duration: 7.68,
      config: {
        loop: true,
      },
    }

    if (this.sound.locked) {
      // let text = this.add.bitmapText(400, 70, "atari-classic", "tap to start", 40)
      // text.x -= Math.round(text.width / 2)
      // text.y -= Math.round(text.height / 2)
      let text = this.add.text(this.center.x, 80, ["atari-classic", "tap to start", "只支持pc打开"], { color: "#00ff00" }).setOrigin(0.5, 0)

      this.sound.once(
        "unlocked",
        function (soundManager) {
          text.visible = false
          this.startStem.call(this, this.bass, "Bass", this.bottomSpeaker)
        },
        this
      )
    } else {
      this.startStem.call(this, this.bass, "Bass", this.bottomSpeaker)
    }

    //在当前声音中添加一个标记。 标记由名称、开始时间、持续时间和可选的配置对象表示。
    this.bass.addMarker(loopMarker)

    this.bass.play("loop", {
      delay: 0,
    })

    this.bass.once(
      "looped",
      function (sound) {
        this.startStem.call(this, drums, "Drums", this.middleSpeaker)
      },
      this
    )

    drums.addMarker(loopMarker)
    drums.play("loop", {
      delay: loopMarker.duration,
    })
    drums.once(
      "looped",
      function (sound) {
        this.startStem.call(this, percussion, "Percussion", this.middleSpeaker)
      },
      this
    )

    percussion.addMarker(loopMarker)
    percussion.play("loop", {
      delay: loopMarker.duration * 2,
    })
    percussion.once(
      "looped",
      function (sound) {
        this.startStem.call(this, synth1, "Synth 1", this.topRightSpeaker)
      },
      this
    )

    synth1.addMarker(loopMarker)
    synth1.play("loop", {
      delay: loopMarker.duration * 3,
    })
    synth1.once(
      "looped",
      function (sound) {
        this.startStem.call(this, synth2, "Synth 2", this.topRightSpeaker)
      },
      this
    )

    synth2.addMarker(loopMarker)
    synth2.play("loop", {
      delay: loopMarker.duration * 4,
    })
    synth2.once(
      "looped",
      function (sound) {
        this.startStem.call(this, top1, "Top 1", this.topLeftSpeaker)
      },
      this
    )

    top1.addMarker(loopMarker)
    top1.play("loop", {
      delay: loopMarker.duration * 5,
    })
    top1.once(
      "looped",
      function (sound) {
        this.startStem.call(this, top2, "Top 2", this.topLeftSpeaker)
        sm.open()
      },
      this
    )

    top2.addMarker(loopMarker)
    top2.play("loop", {
      delay: loopMarker.duration * 6,
    })
  }

  update() {
    this.middleSpeaker.y = this.bottomSpeaker.y - this.bottomSpeaker.height * this.bottomSpeaker.scaleY
    this.topLeftSpeaker.y = this.topRightSpeaker.y = this.middleSpeaker.y - this.middleSpeaker.height * this.middleSpeaker.scaleY

    this.tweens.setGlobalTimeScale(this.bass.totalRate)
  }

  startStem(stem, text, speaker) {
    let s = this.gui.addFolder(text)
    s.add(stem, "seek", 0, stem.duration).step(0.01).listen()
    s.add(stem, "mute").listen()
    s.open()

    this.tweens.add({
      targets: speaker,
      scaleX: 1.3,
      scaleY: 1.1,
      duration: 241,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    })
  }
}

export default Example
