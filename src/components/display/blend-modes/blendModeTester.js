class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("turkey", "assets/pics/turkey-1985086.jpeg")
    this.load.image("logo", "assets/sprites/phaser-large.png")
  }

  create() {
    /**
     * 渲染器的底层 WebGL 上下文。
     */
    const gl = this.sys.game.renderer.gl

    const consts = [
      gl.ZERO, // 常量
      gl.ONE,
      gl.SRC_COLOR,
      gl.ONE_MINUS_SRC_COLOR,
      gl.DST_COLOR,
      gl.ONE_MINUS_DST_COLOR,
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.DST_ALPHA,
      gl.ONE_MINUS_DST_ALPHA,
      gl.CONSTANT_COLOR,
      gl.ONE_MINUS_CONSTANT_COLOR,
      gl.CONSTANT_ALPHA,
      gl.ONE_MINUS_CONSTANT_ALPHA,
      gl.SRC_ALPHA_SATURATE,
    ]
    // 一些数值
    console.log(consts)

    const equations = [
      gl.FUNC_ADD, // 添加
      gl.FUNC_SUBTRACT,
      gl.FUNC_REVERSE_SUBTRACT,
    ]
    // 一些数值
    console.log(equations)

    const list = [
      "ZERO", // 对应consts
      "ONE",
      "SRC_COLOR",
      "ONE_MINUS_SRC_COLOR",
      "DST_COLOR",
      "ONE_MINUS_DST_COLOR",
      "SRC_ALPHA",
      "ONE_MINUS_SRC_ALPHA",
      "DST_ALPHA",
      "ONE_MINUS_DST_ALPHA",
      "CONSTANT_COLOR",
      "ONE_MINUS_CONSTANT_COLOR",
      "CONSTANT_ALPHA",
      "ONE_MINUS_CONSTANT_ALPHA",
      "SRC_ALPHA_SATURATE",
    ]

    const list2 = [
      "FUNC_ADD", // 对应equations
      "FUNC_SUBTRACT",
      "FUNC_REVERSE_SUBTRACT",
    ]

    let srcRGBIndex = 1
    let dstRGBIndex = 7
    let srcAlphaIndex = 1
    let dstAlphaIndex = 1
    let equationIndex = 0

    let srcRGB = consts[srcRGBIndex]
    let dstRGB = consts[dstRGBIndex]
    let srcAlpha = consts[srcAlphaIndex]
    let dstAlpha = consts[dstAlphaIndex]

    let newMode = [srcRGB, dstRGB, srcAlpha, dstAlpha]
    let equation = equations[equationIndex]

    let renderer = this.sys.game.renderer

    // 为渲染器创建一个新的自定义混合模式。
    let modeIndex = renderer.addBlendMode(newMode, equation)

    this.add.image(400, 300, "turkey")

    // 画线，点击的时候，获取x的坐标，拟合到网格
    this.add.rectangle(200, 300, 1, 600, 0xefefef)
    this.add.rectangle(400, 300, 1, 600, 0xefefef)
    this.add.rectangle(600, 300, 1, 600, 0xefefef)
    this.add.rectangle(400, 300, 800, 1, 0xefefef)

    this.add.image(400, 300, "logo").setBlendMode(modeIndex)
    var text = this.add.text(0, 0, "Blend Mode", { color: "#ffffff" })

    text.setText([
      srcRGBIndex + " = " + list[srcRGBIndex], //
      dstRGBIndex + " = " + list[dstRGBIndex],
      srcAlphaIndex + " = " + list[srcAlphaIndex],
      dstAlphaIndex + " = " + list[dstAlphaIndex],
      "",
      equationIndex + " = " + list2[equationIndex] + " - ASR",
    ])

    // 监听键盘按键keydown-A 注意：中间是短横线，不是下划线
    this.input.keyboard.on("keydown-A", (event) => {
      equationIndex = 0
      equation = equations[equationIndex]

      renderer.updateBlendMode(modeIndex, newMode, equation)
      text.setText([
        srcRGBIndex + " = " + list[srcRGBIndex], //
        dstRGBIndex + " = " + list[dstRGBIndex],
        srcAlphaIndex + " = " + list[srcAlphaIndex],
        dstAlphaIndex + " = " + list[dstAlphaIndex],
        "",
        equationIndex + " = " + list2[equationIndex] + " - ASR",
      ])
    })

    this.input.keyboard.on("keydown-S", function (event) {
      equationIndex = 1
      equation = equations[equationIndex]

      renderer.updateBlendMode(modeIndex, newMode, equation)

      text.setText([
        srcRGBIndex + " = " + list[srcRGBIndex], //
        dstRGBIndex + " = " + list[dstRGBIndex],
        srcAlphaIndex + " = " + list[srcAlphaIndex],
        dstAlphaIndex + " = " + list[dstAlphaIndex],
        "",
        equationIndex + " = " + list2[equationIndex] + " - ASR",
      ])
    })

    this.input.keyboard.on("keydown-R", function (event) {
      equationIndex = 2
      equation = equations[equationIndex]

      renderer.updateBlendMode(modeIndex, newMode, equation)

      text.setText([
        srcRGBIndex + " = " + list[srcRGBIndex], //
        dstRGBIndex + " = " + list[dstRGBIndex],
        srcAlphaIndex + " = " + list[srcAlphaIndex],
        dstAlphaIndex + " = " + list[dstAlphaIndex],
        "",
        equationIndex + " = " + list2[equationIndex] + " - ASR",
      ])
    })

    this.input.on("pointerup", function (pointer) {
      // 拟合数据到网格，网格的间隙是200，从0开始
      // 设置为true，就是拟合数据/间隙
      var x = Phaser.Math.Snap.Floor(pointer.x, 200, 0, true)
      var y = pointer.y
      console.log(x)

      if (y > 300) {
        if (x === 0) {
          // Wrap，就是将值限定到一个范围里面，不能超出这个范围
          srcRGBIndex = Phaser.Math.Wrap(srcRGBIndex + 1, 0, 15)
        } else if (x === 1) {
          dstRGBIndex = Phaser.Math.Wrap(dstRGBIndex + 1, 0, 15)
        } else if (x === 2) {
          srcAlphaIndex = Phaser.Math.Wrap(srcAlphaIndex + 1, 0, 15)
        } else if (x === 3) {
          dstAlphaIndex = Phaser.Math.Wrap(dstAlphaIndex + 1, 0, 15)
        }
      } else {
        if (x === 0) {
          srcRGBIndex = Phaser.Math.Wrap(srcRGBIndex - 1, 0, 15)
        } else if (x === 1) {
          dstRGBIndex = Phaser.Math.Wrap(dstRGBIndex - 1, 0, 15)
        } else if (x === 2) {
          srcAlphaIndex = Phaser.Math.Wrap(srcAlphaIndex - 1, 0, 15)
        } else if (x === 3) {
          dstAlphaIndex = Phaser.Math.Wrap(dstAlphaIndex - 1, 0, 15)
        }
      }

      srcRGB = consts[srcRGBIndex]
      dstRGB = consts[dstRGBIndex]
      srcAlpha = consts[srcAlphaIndex]
      dstAlpha = consts[dstAlphaIndex]

      newMode = [srcRGB, dstRGB, srcAlpha, dstAlpha]

      renderer.updateBlendMode(modeIndex, newMode, equation)

      text.setText([
        srcRGBIndex + " = " + list[srcRGBIndex], //
        dstRGBIndex + " = " + list[dstRGBIndex],
        srcAlphaIndex + " = " + list[srcAlphaIndex],
        dstAlphaIndex + " = " + list[dstAlphaIndex],
        "",
        equationIndex + " = " + list2[equationIndex] + " - ASR",
      ])
    })
  }
}

export default Example
