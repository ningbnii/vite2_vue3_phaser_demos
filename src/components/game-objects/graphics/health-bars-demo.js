class HealthBar {
  constructor(scene, x, y) {
    this.bar = new Phaser.GameObjects.Graphics(scene)

    this.x = x
    this.y = y
    this.value = 100
    this.p = 76 / 100

    this.draw()
    scene.add.existing(this.bar)
  }

  decrease(amount) {
    this.value -= amount
    if (this.value < 0) {
      this.value = 0
    }
    this.draw()
    return this.value === 0
  }

  draw() {
    this.bar.clear()

    //bg
    this.bar.fillStyle(0x000000)
    this.bar.fillRect(this.x, this.y, 80, 16)
    // health
    this.bar.fillStyle(0xfffff)
    this.bar.fillRect(this.x + 2, this.y + 2, 76, 12)

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000)
    } else {
      this.bar.fillStyle(0x00ff00)
    }
    var d = Math.floor(this.p * this.value)
    this.bar.fillRect(this.x + 2, this.y + 2, d, 12)
  }
}

class Elf extends Phaser.GameObjects.Sprite {
  constructor(scene, color, x, y) {
    super(scene, x, y)
    this.greens = []
    this.blues = []
    this.greensAlive = 4
    this.bluesAlive = 4
    this.color = color
    this.setTexture('elves')
    this.setPosition(x, y)
    this.play(this.color + 'Idle')
    scene.add.existing(this)

    this.on('animationcomplete', this.animComplete, this)
    this.alive = true
    var hx = this.color === 'blue' ? 100 : -40
    this.hp = new HealthBar(scene, x - hx, y - 100)

    this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire(), callbackScope: this })
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
  }

  animComplete(animation) {
    if (animation.key === this.color + 'Attack') {
      this.play(this.color + 'Idle')
    }
  }

  damage(amount) {
    if (this.hp.decrease(amount)) {
      this.alive = false
      this.play(this.color + 'Dead')
      this.color === 'blue' ? this.bluesAlive-- : this.greensAlive--
    }
  }

  fire() {
    var target = this.color === 'blue' ? this.getGreen() : this.getBlue()

    if (target && this.alive) {
      this.play(this.color + 'Attack')
      var offset = this.color === 'blue' ? 20 : -20
      var targetX = this.color === 'blue' ? target.x + 30 : target.x - 30

      this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true)

      this.scene.tweens.add({
        targets: this.missile,
        x: targetX,
        ease: 'Linear',
        duration: 500,
        onComplete: function (tween, targets) {
          targets[0].setVisible(false)
        },
      })

      target.damage(Phaser.Math.Between(2, 8))
      this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this })
    }
  }

  getGreen() {
    if (this.greensAlive) {
      this.greens = Phaser.Utils.Array.Shuffle(this.greens)

      for (var i = 0; i < this.greens.length; i++) {
        if (this.greens[i].alive) {
          return this.greens[i]
        }
      }
    }

    return false
  }

  getBlue() {
    if (this.bluesAlive) {
      this.blues = Phaser.Utils.Array.Shuffle(this.blues)

      for (var i = 0; i < this.blues.length; i++) {
        if (this.blues[i].alive) {
          return this.blues[i]
        }
      }
    }

    return false
  }
}

class Missile extends Phaser.GameObjects.Image {
  constructor(scene, frame) {
    super(scene, 0, 0, 'elves', frame)
    this.visible = false
  }
}

class BlueElf extends Elf {
  constructor(scene, x, y) {
    super(scene, 'blue', x, y)
    this.missile = new Missile(scene, 'blue-missile')
    scene.add.existing(this.missile)
  }
}

class GreenElf extends Elf {
  constructor(scene, x, y) {
    super(scene, 'green', x, y)
    this.missile = new Missile(scene, 'green-missile')
    scene.add.existing(this.missile)
  }
}

export { BlueElf, GreenElf }
