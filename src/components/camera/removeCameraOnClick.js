class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("einstein", "assets/pics/monika-krawinkel-amberstar-title.png")
  }

  create() {
    this.image = this.add.image(100, 70, "einstein")

    // we're going to create 32 cameras in a 8x4 grid, making each 100x150 in size
    this.cameras.main.setSize(100, 150)
    this.cameras.main.name = "Cam0"

    let i = 0
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (x === 0 && y === 0) {
          continue
        }
        let tx = x * 100
        let ty = y * 150
        this.cameras.add(tx, ty, 100, 150, false, "Cam" + i)
        i++
      }
    }

    // this.input.on('pointerup')
    this.input.on(
      Phaser.Input.Events.POINTER_UP,
      function (pointer) {
        // 使用 floor 将值捕捉到最近的网格切片。
        // 示例：如果您的间隔间隙为 5，位置为 12...您将捕捉到 10。14 将捕捉到 10...但 16 将捕捉到 15。
        const x = Phaser.Math.Snap.Floor(pointer.x, 100)
        const y = Phaser.Math.Snap.Floor(pointer.y, 150)

        // 移除触点的相机
        const total = this.cameras.remove(pointer.camera)
        console.log(total)
        if (total === 0) {
          const newCam = this.cameras.add(x, y, 100, 150)
          console.log("Added Camera ID", newCam.id)
        } else {
          console.log("remove camera id", pointer.camera.id)
        }
      },
      this
    )
  }

  update() {
    this.image.rotation += 0.01
  }
}

export default Example
