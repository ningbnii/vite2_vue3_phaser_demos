class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("star", "assets/demoscene/star2.png")
    this.load.image("dude", "assets/sprites/phaser-dude.png")
  }

  create() {
    this.w = this.cameras.main.width
    this.h = this.cameras.main.height

    var bg = this.add.group({ key: "star", frameQuantity: 300 })
    this.sky = new Phaser.Display.Color(120, 120, 255)
    this.space = new Phaser.Display.Color(0, 0, 0)
    console.log(this.sky)

    this.player = this.add.sprite(this.w / 2, 0, "dude")

    // 相机跟随角色，角色会显示到画面的中心位置
    this.cameras.main.startFollow(this.player)
    // 中心点在页面中心处
    var rect = new Phaser.Geom.Rectangle(0, -2 * this.h, this.w, 2 * this.h)

    Phaser.Actions.RandomRectangle(bg.getChildren(), rect)
  }

  update() {
    this.player.y = Math.cos(this.time.now / 1000) * (this.h - 10) - this.h
    // 在提供的长度上在两个给定颜色对象之间进行插值。
    var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -this.h * 2, this.player.y)
    this.cameras.main.setBackgroundColor(hexColor)
  }
}

export default Example
