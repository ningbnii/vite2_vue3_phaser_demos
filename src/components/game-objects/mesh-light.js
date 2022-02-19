class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA")
  }
  preload() {
    this.load.image("bg", "assets/skies/gradient13.png")
    this.load.image("brick", ["assets/normal-maps/brick.jpeg", "assets/normal-maps/brick_n.png"])
  }

  create() {
    this.lights.enable()
    this.lights.setAmbientColor(0x808080)

    var spotlight = this.lights.addLight(400, 300, 280).setIntensity(3)

    this.input.on("pointermove", function (pointer) {
      spotlight.x = pointer.x
      spotlight.y = pointer.y
    })

    this.add.image(400, 300, "bg").setFlip(false, true)

    const mesh = this.add.mesh(400, 300, "brick")

    Phaser.Geom.Mesh.GenerateGridVerts({
      mesh,
      widthSegments: 10,
    })

    mesh.hideCCW = false

    mesh.panZ(4.5)
    mesh.setPipeline("Light2D")

    this.debug = this.add.graphics()

    this.add.text(16, 16, "Rotate with mouse (+ Shift to pan)\nWheel to zoom\nD to toggle debug")

    // 控制网格显示隐藏
    this.input.keyboard.on("keydown-D", () => {
      if (mesh.debugCallback) {
        mesh.setDebug()
      } else {
        mesh.setDebug(this.debug)
      }
    })

    const rotateRate = 1
    const panRate = 1
    const zoomRate = 4

    this.input.on("pointermove", (pointer) => {
      if (!pointer.isDown) {
        return
      }

      if (!pointer.event.shiftKey) {
        // 三维旋转
        mesh.modelRotation.y += pointer.velocity.x * (rotateRate / 800)
        mesh.modelRotation.x += pointer.velocity.y * (rotateRate / 600)
      } else {
        // 平移
        mesh.panX(pointer.velocity.x * (panRate / 800))
        mesh.panY(pointer.velocity.y * (panRate / 600))
      }
    })

    // 滚轮z轴缩放
    this.input.on("wheel", (pointer, over, deltaX, deltaY, deltaZ) => {
      mesh.panZ(deltaY * (zoomRate / 600))
    })
  }

  update() {
    // 清除网格
    this.debug.clear()
    // 设置网格颜色
    // 画板也可以设置网格
    this.debug.lineStyle(1, 0x00ff00)
  }
}

export { SceneA }
