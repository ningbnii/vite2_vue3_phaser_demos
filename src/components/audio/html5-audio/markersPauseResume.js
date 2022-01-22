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
    this.load.image("bg", "cougar-dragonsun.png")
    this.load.spritesheet("button", "flixel-button.png", { frameWidth: 80, frameHeight: 20 })
    this.load.bitmapFont("nokia", "nokia16black.png", "nokia16black.xml")
    this.load.audio("sfx", ["audio/SoundEffects/magical_horror_audiosprite.mp3"])
  }

  create() {
    this.markers = [
      { name: "charm", start: 0, duration: 2.7, config: {} },
      { name: "curse", start: 4, duration: 2.9, config: {} },
      { name: "fireball", start: 8, duration: 5.2, config: {} },
      { name: "spell", start: 14, duration: 4.7, config: {} },
      { name: "soundscape", start: 20, duration: 18.8, config: {} },
    ]

    let bg = this.add.image(0, 0, "bg").setOrigin(0)
    bg.setScale(this.width / bg.width, this.height / bg.height)

    this.fx = this.sound.add("sfx")

    // 给audio添加标记
    for (let i = 0; i < this.markers.length; i++) {
      let marker = this.markers[i]
      this.fx.addMarker(marker)
      this.makeButton.call(this, marker.name, this.center.x, 115 + i * 40)
    }

    this.makePauseResumeButton.call(this)

    this.input.on(
      "gameobjectover",
      function (pointer, button) {
        this.setButtonName(button, 0)
      },
      this
    )

    this.input.on(
      "gameobjectout",
      function (pointer, button) {
        this.setButtonName(button, 1)
      },
      this
    )

    this.input.on(
      "gameobjectdown",
      function (pointer, button) {
        // 点击暂停按钮，如果正在播放，暂停，如果正在暂停，播放，如果停止，就是停止状态
        if (button.name == "pause") {
          if (this.fx.isPaused) {
            this.fx.resume()
          } else if (this.fx.isPlaying) {
            this.fx.pause()
          } else {
            this.setButtonName(button, 0)
            return
          }
          this.setButtonName(button, 2)
        } else {
          // 点击各个声音按钮，播放对应标记的声音
          this.fx.play(button.name)
          // 按钮按下状态
          this.setButtonName(button, 2)
        }
      },
      this
    )

    this.input.on(
      "gameobjectup",
      function (pointer, button) {
        this.setButtonName(button, 0)
      },
      this
    )
  }

  update() {
    if (this.fx.isPaused) {
      this.pauseResumeButtonText.text = "resume"
    } else if (this.fx.isPlaying) {
      this.pauseResumeButtonText.text = "pause"
    } else {
      this.pauseResumeButtonText.text = "stopped"
    }
    this.pauseResumeButtonText.x = this.center.x - 40 + (this.pauseResumeButton.width - this.pauseResumeButtonText.width) / 2
  }

  makeButton(name, x, y) {
    let button = this.add.image(x, y, "button", 0).setInteractive()
    button.name = name
    button.setScale(2, 1.5)
    let text = this.add.bitmapText(x - 40, y - 8, "nokia", name, 16)
    text.x += (button.width - text.width) / 2
  }

  makePauseResumeButton() {
    this.pauseResumeButton = this.add.image(this.center.x, 395, "button", 1).setInteractive()
    this.pauseResumeButton.name = "pause"
    this.pauseResumeButton.setScale(2, 1.5)

    this.pauseResumeButtonText = this.add.bitmapText(this.center.x - 40, 387, "nokia", "", 16)
  }

  setButtonName(button, frame) {
    button.frame = button.scene.textures.getFrame("button", frame)
  }
}

export default Example
