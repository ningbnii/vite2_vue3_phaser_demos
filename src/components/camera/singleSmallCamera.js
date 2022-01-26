import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
    this.moveStatus = false
  }

  preload() {
    this.load.image("pic", "assets/pics/skull-and-bones.jpeg")
    this.load.image("vulkaiser", "assets/pics/vulkaiser-red.png")
    this.load.image("mushroom", "assets/sprites/mushroom2.png")
  }

  create() {
    this.pic = this.add.image(0, 0, "pic").setOrigin(0)
    this.scroller = this.add.image(0, 0, "vulkaiser").setScale(4).setAlpha(0.3).setOrigin(0)

    // in the corners
    // 用于定位
    this.add.image(0, 0, "mushroom").setOrigin(0, 0)
    this.add.image(800, 0, "mushroom").setOrigin(1, 0)
    this.add.image(0, 600, "mushroom").setOrigin(0, 1)
    this.add.image(800, 600, "mushroom").setOrigin(1, 1)

    this.changeZoomAndPos(0.5, 0, 0)
    // test 1 - change the x/y and keep w/h the same and the scene is cropped properly
    // the x/y appear to offset from the top left
    // 此方法在一次调用中设置相机视口的位置和大小。
    // cam.setViewport(0, 0, 800, 600)

    //  Test 2 - Combine Test 1 with 'zoom' and the scene is no longer cropped and the viewport size is scaled wrong
    // cam.zoom = 0.5

    //  Test 3 - Try half zoom and a half viewport size together - appears broken, image still pops out of the top, placement seems wrong
    this.input.on(
      "pointerdown",
      function () {
        this.moveStatus = true
      },
      this
    )

    this.input.on(
      "pointerup",
      function () {
        this.moveStatus = false
      },
      this
    )

    this.input.on(
      "pointermove",
      function (pointer) {
        if (this.moveStatus) this.changeZoomAndPos(null, pointer.x, pointer.y)
      },
      this
    )

    this.input.keyboard.on(
      "keydown-Z",
      function () {
        let cam = this.cameras.main
        let zoom = cam.zoom
        zoom -= 0.01
        this.changeZoomAndPos(zoom)
      },
      this
    )

    this.input.keyboard.on(
      "keydown-X",
      function () {
        let cam = this.cameras.main
        let zoom = cam.zoom
        zoom += 0.01
        this.changeZoomAndPos(zoom)
      },
      this
    )

    //  Test 4 - Change position as if zoom is applied to the camera center, but keep original w/h
    //  Seems to place the camera in the correct position, but scaled items appear outside of the viewport (because scissor width = 800x600)
    // cam.setViewport(-200, -150, 800, 600)
    // cam.zoom = 0.5

    //  Test 5 - Change position and viewport with zoom. Gets scissored properly but scale is all wrong (half size it should be) and weirdly offset.
    // cam.setViewport(-200, -150, 400, 300)
    // cam.zoom = 0.5
  }

  changeZoomAndPos(zoom, x, y) {
    let cam = this.cameras.main
    x = x || cam.x
    y = y || cam.y
    cam.zoom = zoom || cam.zoom

    // 缩放
    // camera zoom and the image 跟随相机缩放
    cam.setViewport(x, y, this.pic.width * cam.zoom, this.pic.height * cam.zoom)
    cam.setBackgroundColor("#ff00ff")

    // 缩放后图像位置会发生偏移，需要调整scroll，使图像到正确的位置
    cam.scrollX = (this.pic.width / 2) * (1 - cam.zoom)
    cam.scrollY = (this.pic.height / 2) * (1 - cam.zoom)
  }
}

export default Example
