class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
    })
  }

  preload() {
    this.load.image("raster", "assets/demoscene/raster-bw-800x16.png")
  }

  create() {
    // 创建一个组
    var group = this.add.group()
    // 添加多个对象，一共9个
    group.createMultiple({ key: "raster", repeat: 64 })
    var hsv = Phaser.Display.Color.HSVColorWheel()
    console.log(hsv)

    var i = 0
    group.children.iterate((child) => {
      child.x = 500
      child.y = 100
      child.depth = 64 - 1
      child.scaleX = 0.6

      child.setTint(hsv[i * 4].color)

      i++

      this.tweens.add({
        targets: child,
        props: {
          x: { value: 300, duration: 700 },
          y: { value: 500, duration: 2500 },
          scaleX: { value: Math.min(0.1, child.depth / 64), duration: 4000, hold: 2000, delay: 2000 },
          // y: { value: 500, duration: 1500 },
          // scaleX: { value: child.depth / 64, duration: 6000, hold: 2000, delay: 2000 },
        },
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: 38 * i,
      })
    })
  }
}

export default Demo
