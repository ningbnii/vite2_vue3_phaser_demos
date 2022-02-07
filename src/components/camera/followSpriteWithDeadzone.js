class Example extends Phaser.Scene {
  constructor(width, height, changeText) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.changeText = changeText
  }

  preload() {
    this.load.image("bg", "assets/pics/uv-grid-diag.png")
    this.load.image("block", "assets/sprites/block.png")

    this.moveCam = false
  }

  create() {
    // 设置主相机的边界
    this.cameras.main.setBounds(0, 0, 1024 * 4, 1024 * 4)

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        this.add
          .image(1024 * x, 1024 * y, "bg")
          .setOrigin(0)
          .setAlpha(0.75)
      }
    }

    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = this.physics.add.image(1024, 1024, "block")

    // 设置主相机跟随玩家
    this.cameras.main.startFollow(this.player, true)

    // 在镜头跟随的基础上，可以设置一个矩形，作为触发镜头移动的区域dead zone，当角色到达dead zone边界时，镜头就触发往相应方向移动的效果，角色在dead zone内移动时，镜头不会跟随移动
    this.cameras.main.setDeadzone(400, 200)

    // 相机缩放一半，视野扩大一倍
    this.cameras.main.setZoom(0.5)

    this.input.on(
      "pointerdown",
      function () {
        this.moveCam = !this.moveCam
      },
      this
    )

    // 标记出deadzone的位置
    if (this.cameras.main.deadzone) {
      console.log(this.cameras.main.deadzone)
      const graphics = this.add.graphics().setScrollFactor(0)
      graphics.lineStyle(2, 0x00ff00, 1)
      graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height)
    }

    // setScrollFactor(0) 不跟随相机移动
    this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(64).setColor("#ffffff")
  }

  update() {
    const cam = this.cameras.main

    if (cam.deadzone) {
      this.text.setText([
        "Cam Control: " + this.moveCam, // 是否允许控制camera
        "ScrollX: " + cam.scrollX,
        "ScrollY: " + cam.scrollY,
        "MidX: " + cam.midPoint.x,
        "MidY: " + cam.midPoint.y,
        "deadzone left: " + cam.deadzone.left,
        "deadzone right: " + cam.deadzone.right,
        "deadzone top: " + cam.deadzone.top,
        "deadzone bottom: " + cam.deadzone.bottom,
      ])
    } else if (cam._tb) {
      // _tb是什么
      this.text.setText([
        "Cam Control: " + this.moveCam, // 控制cam
        "ScrollX: " + cam.scrollX,
        "ScrollY: " + cam.scrollY,
        "MidX: " + cam.midPoint.x,
        "MidY: " + cam.midPoint.y,
        "tb x: " + cam._tb.x,
        "tb y: " + cam._tb.y,
        "tb right: " + cam._tb.right,
        "tb bottom: " + cam._tb.bottom,
      ])
    }

    // 设置速度为0
    this.player.setVelocity(0)
    if (this.moveCam) {
      // 移动相机
      if (this.cursors.left.isDown) {
        cam.scrollX -= 4
      } else if (this.cursors.right.isDown) {
        cam.scrollX += 4
      }
      if (this.cursors.up.isDown) {
        cam.scrollY -= 4
      } else if (this.cursors.down.isDown) {
        cam.scrollY += 4
      }
    } else {
      // 移动角色
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-800)
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(800)
      }
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-800)
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(800)
      }
    }
  }
}

export default Example
