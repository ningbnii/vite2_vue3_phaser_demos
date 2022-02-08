class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("gem", "assets/sprites/gem.png")
  }

  create() {
    const text = this.add.text(350, 250, "", { font: "16px Courier", fill: "#00ff00" })
    this.gem = this.add.image(300, 300, "gem")

    // store some data about this gem
    // 将数据管理器组件添加到此游戏对象。
    this.gem.setDataEnabled()

    this.gem.data.set("name", "Red Gem Stone")
    this.gem.data.set("level", 2)
    this.gem.data.set("owner", "Link")
    this.gem.data.set("gold", 50)

    text.setText([
      "Name: " + this.gem.data.get("name"), // 获取属性值
      "Level: " + this.gem.data.get("level"),
      "Value: " + this.gem.data.get("gold") + " gold",
      "Owner: " + this.gem.data.get("owner"),
    ])

    // whenever the 'gold' property is updated we call this function after the change has happend
    this.gem.on("changedata-gold", (gameObject, value) => {
      if (value > 500) {
        // 不能超过500
        gameObject.data.values.gold = 500
      } else {
        // 重新设置一遍
        text.setText([
          "Name: " + this.gem.data.get("name"), // 获取属性值
          "Level: " + this.gem.data.get("level"),
          "Value: " + this.gem.data.get("gold") + " gold",
          "Owner: " + this.gem.data.get("owner"),
        ])
      }
    })

    // change the value property when the mouse is clicked
    this.input.on("pointerdown", () => {
      this.gem.data.values.gold += 50
      if (this.gem.data.values.gold % 200 === 0) {
        // 到200升一级
        this.gem.data.values.level++
      }
    })
  }
}

export default Example
