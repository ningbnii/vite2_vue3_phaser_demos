class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const soldier_png = new URL("../../assets/soldier.png", import.meta.url).href
    const soldier_json = new URL("../../assets/soldier.json", import.meta.url).href
    const bg = new URL("../../assets/town-wreck.jpg", import.meta.url).href
    this.load.atlas("soldier", soldier_png, soldier_json)
    this.load.image("bg", bg)
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)

    const rambo = this.add.sprite(500, 500, "soldier")

    // The following animation is created directly on the 'rambo' Sprite.
    //  It cannot be used by any other sprite, and the key ('walk') is never added to
    //  the global Animation Manager, as it's kept local to this Sprite.
    rambo.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("soldier", { prefix: "soldier_3_shoot_up_", start: 1, end: 5 }),
      frameRate: 12,
      repeat: -1,
    })

    //  现在让我们创建一个存储在全局动画管理器中的新“行走”动画：
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("soldier", { prefix: "Soldier_2_walk_", start: 1, end: 8 }),
      frameRate: 12,
      repeat: -1,
    })

    // 因为 rambo Sprite 有自己的“行走”动画，它会播放它：
    rambo.play("walk")

    //  However, this Sprite will play the global 'walk' animation, because it doesn't have its own:
    this.add.sprite(200, 500, "soldier").play("walk")
  }
}

export default Example
