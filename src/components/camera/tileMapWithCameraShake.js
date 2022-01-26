import dat from "dat.gui"
class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("tiles", "assets/tilemaps/tiles/cybernoid.png")
    this.load.tilemapTiledJSON("map", "assets/tilemaps/maps/cybernoid.json")
  }

  create() {
    const map = this.make.tilemap({ key: "map" })
    const tiles = map.addTilesetImage("cybernoid", "tiles")
    const layer = map.createLayer(0, tiles, 0, 0)
    // 设置相机的边界
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    const cursors = this.input.keyboard.createCursorKeys()
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    }
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig)

    // every time you click,shake the camera
    this.input.on(
      "pointerdown",
      function () {
        this.cameras.main.shake(500) // 在指定的持续时间内以给定的强度摇动相机。
      },
      this
    )
  }

  update(time, delta) {
    this.controls.update(delta)
  }
}

export default Example
