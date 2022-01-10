import poo from "../../assets/poo.png"
import mummy from "../../assets/mummy37x45.png"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.image("poo", poo)
    this.load.spritesheet("mummy", mummy, { frameWidth: 37, frameHeight: 45 })
  }

  create() {
    const mummyAnimation = this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("mummy"),
      frameRate: 16,
    })

    const sprite = this.add.sprite(50, 300, "mummy").setScale(4)

    // 动画重复7次
    sprite.play({ key: "walk", repeat: 7 })

    // 缓动动画
    this.tweens.add({
      targets: sprite,
      x: this.width - 50, // 终点
      duration: 8800, // 耗时
      ease: "Linear", // 线性
    })

    sprite.on(
      "animationrepeat",
      function () {
        const poop = this.add.image(sprite.x - 32, 300, "poo").setScale(0.5)

        this.tweens.add({
          targets: poop,
          props: {
            x: {
              value: "-=64",
              ease: "Power1",
            },
            y: {
              value: "+=50",
              ease: "Bounce.easeOut",
            },
          },
          duration: 750,
        })
      },
      this
    )
  }
}

export default Example
