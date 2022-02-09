class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
    })
  }

  preload() {
    this.load.spritesheet("raster", "assets/phaser3/bars.png", { frameWidth: 46, frameHeight: 2 })
  }

  create() {
    var group = this.add.group()

    var x = 200
    var y = 0
    var frame = 0

    for (let i = 0; i < 180; i++) {
      var bar = group.create(x, y, "raster", frame)
      bar.setOrigin(0)
      // 600 是视图的高度
      // 显示高度越来越低
      bar.displayHeight = 600 - y
      y += 3
      frame++
      // 使用前面9帧
      if (frame === 9) {
        frame = 0
      }
    }

    this.tweens.add({
      targets: group.getChildren(),
      x: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 1500,
      delay: function (target, key, value, targetIndex) {
        // targetIndex 从0开始，当前group数组的下标
        return targetIndex * 30
      },
    })
  }
}

export default Demo
