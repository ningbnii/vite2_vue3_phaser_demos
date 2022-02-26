var graphics
var point
var points
var a = 0

var angle = 0
class SceneA extends Phaser.Scene {
  constructor() {
    super('SceneA')
  }
  create() {
    var graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x2266aa }, fillStyle: { color: 0x2266aa } })

    var point = new Phaser.Geom.Point(400, 300)

    var text = this.add.text(50, 50, '')

    this.input.on('pointermove', function (pointer) {
      Phaser.Geom.Point.CopyFrom(pointer, point)

      redraw()
    })

    redraw()

    function redraw() {
      graphics.clear()

      graphics.fillPointShape(point, 20)

      graphics.lineBetween(0, 0, point.x, point.y)

      var magnitude = Phaser.Geom.Point.GetMagnitude(point)

      text.setText('Point Magnitude: ' + magnitude)
    }
  }
}

export { SceneA }
