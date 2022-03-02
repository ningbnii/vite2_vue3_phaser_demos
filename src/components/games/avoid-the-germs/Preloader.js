export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader")
  }

  preload() {
    this.load.setPath("assets/games/germs/")
    this.load.atlas("assets", "germs.png", "germs.json")
    this.load.glsl("goo", "goo.glsl.js")

    this.load.setPath("assets/games/germs/sounds/")
    this.load.audio("appear", ["appear.mp3"])
    this.load.audio("fail", ["fail.mp3"])
    this.load.audio("laugh", ["laugh.mp3"])
    this.load.audio("music", ["music.mp3"])
    this.load.audio("pickup", ["pickup.mp3"])
    this.load.audio("start", ["start.mp3"])
    this.load.audio("victory", ["victory.mp3"])
  }

  create() {
    this.add.image(400, 300, "background").setScale(2)
    this.loadText = this.add.bitmapText(400, 300, "slime", "Loading...", 80).setOrigin(0.5)

    // create our global animation
    this.anims.create({
      key: "germ1",
      frames: this.anims.generateFrameNames("assets", { prefix: "red", start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "germ2",
      frames: this.anims.generateFrameNames("assets", { prefix: "green", start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "germ3",
      frames: this.anims.generateFrameNames("assets", { prefix: "blue", start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: "germ4",
      frames: this.anims.generateFrameNames("assets", { prefix: "purple", start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    })

    if (this.sound.locked) {
      this.loadText.setText("click to start")
      this.input.once("pointerdown", () => {
        this.scene.start("MainMenu")
      })
    } else {
      this.scene.start("MainMenu")
    }
  }
}
