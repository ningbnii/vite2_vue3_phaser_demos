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
    this.load.image("prometheus", "Prometheus Brings Fire To Mankind.jpeg")
    this.load.audio("overture", ["audio/ludwig/Overture.mp3"], { instance: 2 }) // instance 2个实例
    this.load.audioSprite("creatures", "audio/ludwig/sprites.json", ["audio/ludwig/sprites.mp3"])
  }

  create() {
    // 当游戏失去焦点时，应暂停指示声音的标志，例如当用户切换到另一个选项卡/程序/应用程序时。
    this.sound.pauseOnBlur = false
    this.prometheus = this.add.image(0, 0, "prometheus").setOrigin(0)
    this.prometheus.setScale(this.width / this.prometheus.width, this.height / this.prometheus.height) // 全屏

    this.text = this.add
      .text(this.center.x, this.center.y, "Loading...", {
        fontSize: 50,
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5)
      .setShadow(0, 3, "#888", 2) // 阴影

    // 两个实例
    this.first = this.sound.add("overture", { loop: true })
    this.second = this.sound.add("overture", { loop: true })
    this.audioSprite = this.sound.addAudioSprite("creatures")

    this.enableInput()

    this.tests = [
      function (fn) {
        this.first.once(
          "play",
          function (sound) {
            this.text.setText("playing")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.play()
      },
      function (fn) {
        this.first.once(
          "pause",
          function (sound) {
            this.text.setText("paused")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.pause()
      },
      function (fn) {
        this.first.once(
          "resume",
          function (sound) {
            this.text.setText("resuming")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.resume()
      },
      function (fn) {
        this.first.once(
          "stop",
          function (sound) {
            this.text.setText("stopped")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.stop()
      },
      function (fn) {
        this.first.once(
          "play",
          function (sound) {
            this.text.setText("play from start")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.play()
      },
      function (fn) {
        this.first.once(
          "rate", // 播放速率
          function (sound, value) {
            this.text.setText("speed up rate")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.rate = 1.5
      },
      function (fn) {
        this.first.once(
          "detune",
          function (sound, value) {
            this.text.setText("slow down detune")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.detune = 0 //代表振荡频率的失谐量
      },
      function (fn) {
        this.tweens.add({
          // 动画开始的时候，需要bind this
          onStart: function () {
            this.text.setText("fade out")
          }.bind(this),
          targets: this.first,
          volume: 0,
          ease: "Linear",
          duration: 2000,
          onComplete: fn,
        })
      },
      function (fn) {
        this.tweens.add({
          onStart: function () {
            this.text.setText("fade in")
          }.bind(this),
          targets: this.first,
          volume: 1,
          ease: "Linear",
          duration: 2000,
          onComplete: fn,
        })
      },
      function (fn) {
        this.first.once(
          "mute", // 静音
          function () {
            this.text.setText("mute")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.mute = true
      },
      function (fn) {
        this.first.once(
          "mute",
          function () {
            this.text.setText("unmute")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.mute = false
      },
      function (fn) {
        this.first.once(
          "volume",
          function () {
            this.text.setText("half volume")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.volume = 0.5
      },
      function (fn) {
        this.first.once(
          "volume",
          function () {
            this.text.setText("full volume")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.volume = 1
      },
      function (fn) {
        this.first.once(
          "seek", // 从哪里开始播放
          function () {
            this.text.setText("seek to start")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.first.seek = 0
      },
      function (fn) {
        // 播放第二个
        this.second.once(
          "play",
          function () {
            this.text.setText("play 2nd")
            // 播放第二个的时候，第一个就停了
            console.log(this.first.isPlaying)
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.second.play()
      },
      function (fn) {
        this.sound.once(
          "mute",
          function (soundManager, value) {
            this.text.setText("mute global")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.sound.mute = true // 全局静音
      },
      function (fn) {
        this.sound.once(
          "mute",
          function (soundManager, value) {
            this.text.setText("unmute global")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.sound.mute = false
      },
      function (fn) {
        this.sound.once(
          "volume",
          function (soundManager, value) {
            this.text.setText("half volume global")
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.sound.volume = 0.5
      },
      function (fn) {
        this.tweens.add({
          onStart: function () {
            this.text.setText("fade out global")
          }.bind(this),
          targets: this.sound,
          volume: 0,
          ease: "Linear",
          duration: 2000,
          onComplete: fn,
        })
      },
      function (fn) {
        this.tweens.add({
          onStart: function () {
            this.text.setText("fade in global")
          }.bind(this),
          targets: this.sound,
          volume: 1,
          ease: "Linear",
          duration: 2000,
          onComplete: fn,
        })
      },
      function (fn) {
        this.sound.once(
          "pauseall",
          function (soundManager) {
            this.text.setText("pause all")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        // 暂停所有
        this.sound.pauseAll()
      },
      function (fn) {
        this.sound.once(
          "resumeall",
          function (soundManager) {
            this.text.setText("resume all")
            console.log("this first :" + this.first.isPlaying)
            console.log("this second : " + this.second.isPlaying)
            this.time.addEvent({
              delay: 2000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        // 从暂停恢复所有
        this.sound.resumeAll()
      },
      function (fn) {
        this.sound.once(
          "stopall",
          function (soundManager) {
            this.text.setText("stop all")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.sound.stopAll()
      },
      function (fn) {
        this.audioSprite.once(
          "play",
          function (sound) {
            this.text.setText("play sprite")
            this.time.addEvent({
              delay: 1000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.audioSprite.play("07")
      },
      function (fn) {
        this.audioSprite.once(
          "pause",
          function (sound) {
            this.text.setText("pause sprite")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.audioSprite.pause()
      },
      function (fn) {
        this.audioSprite.once(
          "resume",
          function (sound) {
            this.text.setText("resume sprite")
            this.time.addEvent({
              delay: 1500,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.audioSprite.resume()
      },
      function (fn) {
        this.audioSprite.once(
          "play",
          function (sound) {
            this.text.setText("multiple sprites")
            this.time.addEvent({
              delay: 10000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        let sounds = ["01", "02", "03", "03", "05"]
        for (let i = 0; i < sounds.length; i++) {
          this.time.addEvent({
            delay: i * 2000,
            callback: this.audioSprite.play.bind(this.audioSprite, sounds[i]),
            callbackScope: this.audioSprite,
          })
        }
      },
      function (fn) {
        this.audioSprite.once(
          "play",
          function (sound) {
            this.text.setText("loop sprite")
            this.time.addEvent({
              delay: 4000,
              callback: fn,
              callbackScope: this,
            })
          },
          this
        )
        this.audioSprite.play("06", { loop: true })
      },
      function (fn) {
        this.tweens.add({
          onStart: function () {
            this.text.setText("fade out sprite")
          }.bind(this),
          targets: this.audioSprite,
          volume: 0,
          ease: "Linear",
          duration: 4000,
          onComplete: function () {
            this.audioSprite.volume = 1
            this.audioSprite.stop()
            fn()
          }.bind(this),
        })
      },
    ]
  }

  chain(i) {
    return function () {
      if (this.tests[i]) {
        // 按照顺序执行this.tests中的方法
        this.tests[i].call(this, this.chain(++i))
      } else {
        // 如果方法不存在，设置完成
        this.text.setText("complete")
        this.time.addEvent({
          delay: 5000,
          callback: this.enableInput,
          callbackScope: this,
        })
      }
    }.bind(this)
  }

  enableInput() {
    this.text.setText("click to start")
    // this.first.stop()
    // this.second.stop()
    this.input.once(
      "pointerdown",
      function (pointer) {
        // 执行this.tests中的第一个方法
        this.tests[0].call(this, this.chain(1))
      },
      this
    )
  }
}

export default Example
