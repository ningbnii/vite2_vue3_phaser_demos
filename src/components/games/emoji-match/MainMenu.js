export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu")

    this.music
  }

  create() {
    let scaleX = this.game.config.width / 800
    let scaleY = this.game.config.height / 600
    let background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(scaleX, scaleY)

    // 背景图透明度从0到1
    this.tweens.add({
      targets: background,
      alpha: { from: 0, to: 1 },
      duration: 1000,
    })

    // 文字样式
    const fontStyle = {
      fontFamily: "Arial",
      fontSize: 30,
      color: "#ffffff",
      fontStyle: "bold",
      padding: 16,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 2,
        offsetY: 2,
        blur: 4,
      },
    }

    this.add.text(20, 20, "High Score: " + this.registry.get("highscore"), fontStyle)

    let logo = this.add.image(400 * scaleX, -200 * scaleY, "logo").setScale(0.5)

    if (!this.music) {
      this.music = this.sound.play("music", { loop: true })
    }

    this.tweens.add({
      targets: logo,
      y: 300 * scaleY,
      ease: "bounce.out",
      duration: 1200,
    })

    this.input.once("pointerdown", () => {
      this.scene.start("MainGame")
    })
  }
}
