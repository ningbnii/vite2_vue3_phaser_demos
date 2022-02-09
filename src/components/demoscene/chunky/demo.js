class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
    })
  }

  preload() {
    this.load.image("raster", "assets/demoscene/raster-bw-64.png")
  }

  create() {
    // 创建一个组
    var group = this.add.group()
    // 添加多个对象，一共9个
    group.createMultiple({ key: "raster", repeat: 8 })

    var ci = 0
    var colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c]

    // 遍历group中的每个对象
    group.children.iterate((child) => {
      child.x = 100
      child.y = 300
      // 分成不同的层级，最上面的层级最高
      child.depth = 9 - ci

      child.tint = colors[ci]

      ci++

      // 给每一个条添加动画，每个之间有个delay
      this.tweens.add({
        targets: child,
        x: 700,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        duration: 1500,
        delay: 100 * ci,
      })
    })
  }
}

export default Demo
