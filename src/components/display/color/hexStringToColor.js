class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    const color1 = Phaser.Display.Color.HexStringToColor("#ff00ff")
    console.log(color1)

    const color2 = Phaser.Display.Color.RGBStringToColor("rgba(255,155,55,0.5)")
    console.log(color2)

    const color3 = Phaser.Display.Color.ValueToColor(0xffeedd)
    console.log(color3)

    const color4 = Phaser.Display.Color.ValueToColor("#ff00ff")
    console.log(color4)

    const color5 = Phaser.Display.Color.ValueToColor("rgba(255,155,55,0.5)")
    console.log(color5)

    const color6 = new Phaser.Display.Color(150, 0, 0)
    console.log(color6)
    const color7 = new Phaser.Display.Color(150, 0, 0)
    console.log(color7)

    // const rect1 = this.add.rectangle(200, 300, 200, 400, color6.color)
    // const rect2 = this.add.rectangle(420, 300, 200, 400, color7.color)

    // this.input.on("pointerup", () => {
    //   // color7.brighten(10)
    //   // color7.darken(10)
    //   color7.lighten(10)
    //   // 需要重新设置rect2的颜色
    //   rect2.setFillStyle(color7.color)
    // })

    // 随机颜色
    // 只需要创建一个color对象，用它去获取随机颜色
    const color = new Phaser.Display.Color()
    for (let i = 0; i < 100; i++) {
      // 生成随机颜色值
      // color.random(50)

      // 随机灰度值
      color.randomGray(50)
      this.add.rectangle(400, i * 6, 800, 6, color.color)
    }
  }
}

export default Example
