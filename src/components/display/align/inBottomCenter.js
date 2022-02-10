class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("pic", "assets/pics/barbarian-loading.png")
    this.load.image("block", "assets/sprites/block.png")
  }

  create() {
    const pic = this.add.image(0, 0, "pic").setOrigin(0, 0)

    const block = this.add.image(0, 0, "block").setOrigin(0, 0)

    // pic居中
    /**
     * 创建一个新的区域游戏对象并将其添加到场景中。
     * 注意：此方法仅在 Zone Game Object 已内置到 Phaser 时可用。
     */
    Phaser.Display.Align.In.Center(pic, this.add.zone(0, 0, 800, 600).setOrigin(0, 0))

    /**
     * BottomCenter 把block放到pic底部中间位置
     */
    // Phaser.Display.Align.In.BottomCenter(block, pic)

    /**
     * 显示到左下角
     */
    // Phaser.Display.Align.In.BottomLeft(block, pic)

    /**
     * 显示到右下角
     */
    // Phaser.Display.Align.In.BottomRight(block, pic)

    /**
     * 显示到pic中间
     */
    // Phaser.Display.Align.In.Center(block, pic)

    /**
     * 显示到pic左边中间
     */
    // Phaser.Display.Align.In.LeftCenter(block, pic)

    /**
     * 显示到pic右边中间
     */
    // Phaser.Display.Align.In.RightCenter(block, pic)

    /**
     * 显示到pic顶部中间
     */
    // Phaser.Display.Align.In.TopCenter(block, pic)

    /**
     * 显示到左上角
     */
    // Phaser.Display.Align.In.TopLeft(block, pic)

    /**
     * 显示到右上角
     */
    Phaser.Display.Align.In.TopRight(block, pic)
  }
}

export default Example
