class Example extends Phaser.Scene {
  constructor() {
    super()
    this.detail = 7
    this.size = Math.pow(2, this.detail) + 1
    this.max = this.size - 1
    this.map = new Float32Array(this.size * this.size)
    this.roughness = 0.6
    this.width = 0
    this.height = 0
  }

  create() {
    this.graphics = this.add.graphics({ x: 400, y: 100 })
    this.generate()
    this.draw()
  }

  generate() {
    this.set(0, 0, this.max)
    this.set(this.max, 0, this.max / 2)
    this.set(this.max, this.max, 0)
    this.set(0, this.max, this.max / 2)

    this.divide(this.max)
  }

  divide(size) {
    let x
    let y
    let half = size / 2
    let scale = this.roughness * size

    if (half < 1) {
      return
    }

    for (y = half; y < this.max; y += size) {
      for (x = half; x < this.max; x += size) {
        this.square(x, y, half, Math.random() * scale * 2 - scale)
      }
    }

    for (y = 0; y <= this.max; y += half) {
      for (x = (y + half) % size; x <= this.max; x += size) {
        this.diamond(x, y, half, Math.random() * scale * 2 - scale)
      }
    }

    this.divide(size / 2)
  }

  // 钻石
  diamond(x, y, size, offset) {
    let avg = this.average([
      this.get(x, y - size), // top
      this.get(x + size, y), // right
      this.get(x, y + size),
      this.get(x - size, y),
    ])
    this.set(x, y, avg + offset)
  }

  // 正方形
  square(x, y, size, offset) {
    let avg = this.average([
      this.get(x - size, y - size), // upper left
      this.get(x + size, y - size),
      this.get(x + size, y + size),
      this.get(x - size, y + size),
    ])

    this.set(x, y, avg + offset)
  }

  get(x, y) {
    if (x < 0 || x > this.max || y < 0 || y > this.max) {
      return -1
    }
    return this.map[x + this.size * y]
  }

  average(values) {
    let valid = values.filter((val) => {
      return val !== -1
    })

    let total = valid.reduce((sum, val) => {
      return sum + val
    }, 0)

    return total / valid.length
  }

  set(x, y, val) {
    this.map[x + this.size * y] = val
  }

  draw() {
    this.graphics.clear()
    let waterVal = this.size * 0.3

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let val = this.get(x, y)
        let top = this.project(x, y, val)
        let bottom = this.project(x + 1, y, 0)
        let style = this.brightness(x, y, this.get(x + 1, y) - val)

        this.rect(top, bottom, style)
      }
    }
  }

  rect(a, b, style) {
    if (b.y < a.y) {
      return
    }
    let rgb = Phaser.Display.Color.RGBStringToColor(style)
    this.graphics.fillStyle(rgb.color, rgb.alphaGL)
    this.graphics.fillRect(a.x, a.y, b.x - a.x, b.y - a.y)
  }

  brightness(x, y, slope) {
    if (y === this.max || x === this.max) {
      return "#000"
    }
    let b = ~~(slope * 50) + 128
    return ["rgba(", b, ",", b, ",", b, ",1)"].join("")
  }

  project(flatX, flatY, flatZ) {
    let point = this.iso(flatX, flatY)
    let x0 = this.width * 0.5
    let y0 = this.height * 0.2
    //  Original
    // var z = size * 0.5 - flatZ + point.y * 0.75;
    // var x = (point.x - size * 0.5) * 6;
    // var y = (size - point.y) * 0.005 + 1;

    let z = this.size * 0.5 - flatZ + point.y * 0.75
    let x = (point.x - this.size * 0.5) * 6
    let y = (this.size - point.y) * 0.005 + 1

    return {
      x: x0 + x / y,
      y: y0 + z / y,
    }
  }

  iso(x, y) {
    return {
      x: 0.5 * (this.size + x - y),
      y: 0.5 * (x + y),
    }
  }
}

export default Example
