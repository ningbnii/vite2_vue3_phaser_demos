class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("turkey", "assets/pics/turkey-1985086.jpeg")
  }

  create() {
    // 需要学习wegGL相关的知识
    const gl = this.sys.game.renderer.gl

    const renderer = this.sys.game.renderer

    // 两种模式以ADD方式叠加
    // 需要学习一下各种混合模式
    const modeIndex = renderer.addBlendMode([gl.ZERO, gl.SRC_COLOR], gl.FUNC_ADD)
    const graphics = this.add.graphics()
    const color = 0xffffff
    const alpha = 1

    graphics.fillStyle(color, alpha)
    graphics.fillCircle(400, 300, 256)

    this.add.image(400, 300, "turkey").setBlendMode(modeIndex)
  }
}

export default Example
