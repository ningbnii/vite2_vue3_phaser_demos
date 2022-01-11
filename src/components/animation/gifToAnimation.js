class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.data = {}
  }

  init() {
    this.data = {
      r: -0.05,
      s: -0.0012,
      sx: 0.25,
      x: 400,
      y: 100,
    }
  }

  preload() {
    const sao0_png = new URL('../../assets/sao0.png', import.meta.url).href
    const sao0_json = new URL('../../assets/sao0.json', import.meta.url).href
    const sao1_png = new URL('../../assets/sao1.png', import.meta.url).href
    const sao1_json = new URL('../../assets/sao1.json', import.meta.url).href

    this.load.atlas('sao0', sao0_png, sao0_json)
    this.load.atlas('sao1', sao1_png, sao1_json)
  }

  create() {
    //  Our animation consists of 50 frames split across 2 texture atlases:
    //  sao0 contains frames: 0, 1, 4, 7, 8, 9, 10, 11, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33, 38, 39, 40, 45, 46, 47, 48
    //  sao1 contains frames: 2, 3, 5, 6, 12, 13, 14, 20, 21, 22, 27, 28, 29, 34, 35, 36, 37, 41, 42, 43, 44, 49, 50
    //  Let's create an array to hold them all:
    var frames = []

    const sao0 = [0, 1, 4, 7, 8, 9, 10, 11, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33, 38, 39, 40, 45, 46, 47, 48]
    const sao1 = [2, 3, 5, 6, 12, 13, 14, 20, 21, 22, 27, 28, 29, 34, 35, 36, 37, 41, 42, 43, 44, 49, 50]

    for (let i = 0; i <= 50; i++) {
      if (sao0.indexOf(i) > -1) {
        frames.push({ key: 'sao0', frame: i.toString() })
      } else {
        frames.push({ key: 'sao1', frame: i.toString() })
      }
    }

    //  All the 'frames' array needs are objects that contain the key of the texture and the 'frame'
    //  property, which is the name of our frame within the atlas (in this case they're just numbers)
    this.anims.create({
      key: 'swish',
      frames: frames,
      repeat: -1,
    })

    this.group = this.add.group()

    //创建多个游戏对象并将它们添加到该组中。
    this.group.createMultiple({ key: 'sao', repeat: 10, setXY: { x: this.center.x, y: this.center.y }, setAlpha: { value: 0, step: 0.05 } })

    this.group.playAnimation('swish')

    // tweens生成数据
    this.tweens.add({
      targets: this.data,
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      props: {
        r: {
          value: 0.05,
        },
        s: {
          value: 0.0012,
        },
        sx: {
          value: 2.5,
        },
        y: {
          value: 400,
          duration: 4000,
        },
      },
    })
  }

  update() {
    let children = this.group.getChildren()

    Phaser.Actions.Rotate(children, this.data.r, this.data.s)
    Phaser.Actions.SetScale(children, this.data.sx, this.data.sx, this.data.s, this.data.s)
    Phaser.Actions.SetXY(children, this.data.x, this.data.y, this.data.s, this.data.s)
  }
}

export default Example
