class Example extends Phaser.Scene {
  constructor() {
    super()
    this.t = 0.0
  }

  preload() {
    this.load.image("pic", "assets/pics/turkey-1985086.jpeg")
    // this.load.image('swirl', 'assets/pics/mask.png');
    this.load.image("swirl", "assets/pics/gridmask.png")
    this.load.image("titan", "assets/pics/titan-mech.png")
  }

  create() {
    var pic = this.add.sprite(400, 300, "pic")

    //  We hide it because we don't need it rendering as well
    // var swirl = this.add.image(0, 0, 'swirl');
    var swirl = this.add.image(0, 0, "swirl").setVisible(false)
    var mask = swirl.createBitmapMask()
    pic.setMask(mask)
    this.add.sprite(400, 300, "titan")

    this.input.on("pointermove", function (pointer) {
      swirl.x = pointer.x
      swirl.y = pointer.y
    })
  }
}

export default Example
