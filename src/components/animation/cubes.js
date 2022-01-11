class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const cube_png = new URL("../../assets/cube.png", import.meta.url).href
    const cube_json = new URL("../../assets/cube.json", import.meta.url).href
    this.load.atlas("cube", cube_png, cube_json)
  }

  create() {
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNames("cube", { prefix: "frame", start: 1, end: 23 }),
      frameRate: 50,
      repeat: -1,
    })

    let group = this.add.group({ key: "cube", frame: "frame1", repeat: 35, setScale: { x: 0.55, y: 0.55 } })

    Phaser.Actions.GridAlign(group.getChildren(), { width: 6, cellWidth: 70, cellHeight: 70, position: Phaser.Display.Align.CENTER })

    let i = 1
    let ci = 0
    let colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c]

    group.children.iterate(function (child) {
      child.tint = colors[ci] // 设置颜色

      if (i % 12 === 0) {
        i = 1
        ci++
      } else {
        i++
      }
    })

    // 交错播放，按顺序延迟1秒播放
    this.anims.staggerPlay("spin", group.getChildren(), 100)
    this.cameras.main.zoom = 0.5

    this.tweens.add({
      targets: this.cameras.main,
      props: {
        zoom: { value: 2.5, duration: 4000, ease: "Sine.easeInOut" },
        rotation: { value: 2.3, duration: 8000, ease: "Cubic.easeInOut" },
      },
      delay: 2000,
      yoyo: true,
      repeat: -1,
    })
  }
}

export default Example
