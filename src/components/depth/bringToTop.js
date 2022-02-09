class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("block", "assets/sprites/block.png")
  }

  create() {
    const group = this.add.group({ key: "block", frameQuantity: 12 })
    Phaser.Actions.SetXY(group.getChildren(), 48, 500, 64, 0)

    this.input.on("pointerdown", () => {
      // getAt(0) 获取第一个
      const child = this.children.getAt(0)
      child.y -= 32
      // 移动到最上层，搞到了队尾
      this.children.bringToTop(child)
    })
  }
}

export default Example
