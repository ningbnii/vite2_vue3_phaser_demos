class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    })
    this.balls = []
  }

  create() {
    this.graphics = this.add.graphics()
    this.graphics.fillStyle(0x9966ff, 1)
    for (let i = 0; i < 2000; i++) {
      let x = Math.random() * this.game.config.width
      let y = Math.random() * this.game.config.height
      let a = Math.random() * 2 * Math.PI
      let ball = this.graphics.fillCircle(x, y, a)
      ball.a = a
      this.balls.push(ball)
    }
  }

  update() {
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i]
      ball.x += Math.cos(ball.a)
      ball.y += Math.sin(ball.a)
      ball.a += 0.03
    }
  }
}

export { SceneA }
