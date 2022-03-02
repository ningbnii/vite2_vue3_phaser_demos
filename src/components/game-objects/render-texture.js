class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA")
  }

  preload() {
    this.load.image("ship", "assets/sprites/phaser-ship.png")
  }

  create() {
    //  Create an RTree

    var tree = new Phaser.Structs.RTree()

    for (var i = 0; i < 512; i++) {
      var ship = this.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 590), "ship")

      var bounds = ship.getBounds()

      //  Insert our entry into the RTree:
      tree.insert({ left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom, sprite: ship })
    }
    console.log(tree)
    var debug = this.add.graphics()

    debug.lineStyle(1, 0x00ff00)

    var results = []

    this.input.on(
      "pointermove",
      function (pointer) {
        //  First clear the previous results
        results.forEach(function (entry) {
          entry.sprite.setTint(0xffffff)
        })

        debug.clear()

        //  Update the search area

        var bbox = {
          minX: pointer.x - 100,
          minY: pointer.y - 100,
          maxX: pointer.x + 100,
          maxY: pointer.y + 100,
        }

        //  Search the RTree

        results = tree.search(bbox)

        //  Set Tint on intersecting Sprites

        results.forEach(function (entry) {
          entry.sprite.setTint(0xff0000)
        })

        //  Draw debug

        debug.strokeRect(bbox.minX, bbox.minY, 200, 200)
      },
      this
    )
  }
}

export { SceneA }
