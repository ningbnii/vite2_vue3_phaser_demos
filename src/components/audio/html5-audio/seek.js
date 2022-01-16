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
    this.load.image("bg", "bg.png")
    this.load.image("rainbow", "rainbow.png")
    this.load.spritesheet("cat", "cat.png", { frameWidth: 97, frameHeight: 59 })
    this.load.audio("CatAstroPhi", ["/audio/CatAstroPhi_shmup_normal.mp3", "/audio/CatAstroPhi_shmup_normal.m4a", "/audio/CatAstroPhi_shmup_normal.ogg"])
  }

  create() {
    this.catAstroPhi = this.sound.add("CatAstroPhi")
    this.input.on(
      "pointerdown",
      function () {
        this.catAstroPhi.play({
          seek: 2.55,
        })
      },
      this
    )

    this.add
      .image(0, 0, "bg")
      .setOrigin(0)
      .setScale(this.width / 800, this.height / 600)

    if (this.sound.locked) {
      let text = this.add.text(this.center.x, 32, "tap to start").setOrigin(0.5, 0)
      this.sound.once(
        "unlocked",
        function (soundManager) {
          text.visible = false
          this.setup.call(this)
        },
        this
      )
    } else {
      this.setup.call(this)
    }
  }

  setup() {
    let gui = new dat.GUI()
    let sm = gui.addFolder("CatAstroPhi Sound")
    sm.add(this.catAstroPhi, "seek", 0, this.catAstroPhi.duration).step(0.01).listen()
    sm.add(this.catAstroPhi, "rate", 0.5, 2).listen()
    sm.add(this.catAstroPhi, "detune", -1200, 1200).step(50).listen()
    sm.add(this.catAstroPhi, "loop").listen()
    sm.add(this.catAstroPhi, "play")
    sm.add(this.catAstroPhi, "pause")
    sm.add(this.catAstroPhi, "resume")
    sm.add(this.catAstroPhi, "stop")

    this.rainbowMask = this.make.graphics()
    let rainbow = this.add.image(0, this.center.y, "rainbow").setOrigin(0)
    rainbow.mask = new Phaser.Display.Masks.GeometryMask(this, this.rainbowMask) // 遮罩
    this.anims.create({
      key: "cat",
      frames: this.anims.generateFrameNumbers("cat", { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      repeat: -1,
    })

    this.cat = this.add.sprite(0, this.center.y, "cat").setInteractive()

    this.cat.play("cat")

    this.input.setDraggable(this.cat)

    this.input.on(
      "drag",
      function (pointer, cat, dragX, dragY) {
        this.cat.x = Math.min(Math.max(this.cat.width / 2, dragX), this.height - this.cat.width / 2)
        this.catAstroPhi.seek = ((this.cat.x - this.cat.width / 2) / (800 - this.cat.width)) * this.catAstroPhi.duration
      },
      this
    )
  }

  update() {
    if (this.cat) {
      this.cat.x = this.cat.width / 2 + (this.catAstroPhi.seek / this.catAstroPhi.duration) * (800 - this.cat.width)
      this.rainbowMask.clear()
      this.rainbowMask.fillRect(0, 0, this.cat.x - 15, this.center.y + 200)

      if (!this.catAstroPhi.isPlaying && this.cat.anims.isPlaying) {
        this.cat.anims.pause()
      } else if (this.catAstroPhi.isPlaying && !this.cat.anims.isPlaying) {
        this.cat.anims.resume()
      }

      this.cat.anims.timeScale = this.catAstroPhi.totalRate
    }
  }
}

export default Example
