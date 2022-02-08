class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("gem", "assets/sprites/gem.png")
  }

  create() {
    const text = this.add.text(350, 270, "", { font: "16px Courier", fill: "#00ff00" })
    const gem = this.add.image(300, 300, "gem")

    this.data.set("test", "ning")
    console.log(this.data.get("test"))

    // store some data about this Gem
    // gem.setData("name", "Red Gem Stone")
    // gem.setData("level", 2)
    // gem.setData("owner", "Link")

    // 可以以对象的方式，设置多个值
    //  Store some data about this Gem:
    gem.setData({ name: "Red Gem Stone", level: 2, owner: "Link", gold: 50 })

    // whenever a data value is updated we call this function
    gem.on("setdata", function (gameObject, key, value) {
      text.setText([
        "Name: " + gem.getData("name"), // 设置文字
        "Level: " + gem.getData("level"),
        "Value: " + gem.getData("gold") + " gold",
        "Owner: " + gem.getData("owner"),
      ])
    })

    // set the value, this will emit the `setdata` event
    gem.setData("gold", 50)

    // change the value property when the mouse is clicked
    this.input.on("pointerdown", function () {
      gem.data.values.gold += 50
      if (gem.data.values.gold % 200 === 0) {
        // 到200升一级
        gem.data.values.level++
      }
    })
  }
}

export default Example
