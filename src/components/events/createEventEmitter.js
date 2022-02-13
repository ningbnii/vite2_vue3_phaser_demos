class Example extends Phaser.Scene {
  constructor() {
    super()
    this.alive = 0
  }

  preload() {
    this.load.image("plush", "assets/pics/profil-sad-plush.png")
    this.load.image("bg", "assets/skies/sky4.png")
    this.load.image("crate", "assets/sprites/crate.png")
  }

  create() {
    // var emitter = new Phaser.Events.EventEmitter()
    // // 创建监听事件addImage，执行方法this.handler
    // emitter.on("addImage", this.handler, this)
    // 触发一个事件
    // emitter.emit("addImage", 200, 300)
    // emitter.emit("addImage", 400, 300)
    // emitter.emit("addImage", 600, 300)
    // this.events.on("addImage", this.handler, this)
    // this.events.emit("addImage", 300, 400)

    this.add.image(400, 300, "bg")
    for (let i = 0; i < 64; i++) {
      let x = Phaser.Math.Between(0, 800)
      let y = Phaser.Math.Between(0, 600)

      let box = this.add.image(x, y, "crate")

      box.setInteractive()

      box.on("clicked", this.clickHandler, this)

      this.alive++
    }

    this.input.on("gameobjectup", (pointer, gameObject) => {
      gameObject.emit("clicked", gameObject)
    })

    this.info = this.add.text(10, 10, "", { font: "48px Arial", fill: "#000" })

    this.timer = this.time.addEvent({ delay: 10000, callback: this.gameOver, callbackScope: this })
  }

  update() {
    this.info.setText("Alive: " + this.alive + "\nTime: " + Math.floor(10000 - this.timer.getElapsed()))
  }

  gameOver() {
    // 移除事件监听
    this.input.off("gameobjectup")
  }

  clickHandler(box) {
    this.alive--

    box.off("clicked", this.clickHandler)
    box.input.enabled = false
    box.setVisible(false)
  }
}

export default Example
