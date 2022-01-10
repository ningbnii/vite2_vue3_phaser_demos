import paladin_png from "../../assets/paladin.png"
import paladin_json from "../../assets/paladin.json"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    // Aseprite 是一个强大的动画精灵编辑器和像素艺术工具。
    this.load.aseprite("paladin", paladin_png, paladin_json)
  }

  create() {
    let tags = this.anims.createFromAseprite("paladin")
    let sprite = this.add.sprite(this.center.x, this.center.y).play({ key: "Magnum Break", repeat: -1 }).setScale(6)

    for (let i = 0; i < tags.length; i++) {
      let label = this.add.text(32, 32 + i * 16, tags[i].key, { color: "#00ff00" })
      // 将此游戏对象传递给输入管理器以启用输入
      label.setInteractive()
    }

    this.input.on("gameobjectdown", function (pointer, obj) {
      sprite.play({
        key: obj.text,
        repeat: -1,
      })
    })

    this.input.on("gameobjectover", function (pointer, obj) {
      obj.setColor("#ff00ff")
    })

    this.input.on("gameobjectout", function (pointer, obj) {
      obj.setColor("#00ffff")
    })
  }
}

export default Example
