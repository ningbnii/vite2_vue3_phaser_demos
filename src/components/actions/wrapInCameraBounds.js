class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
  }

  create() {
    this.graphics = this.add.graphics();

    this.shapes = new Array(15)
      .fill(null)
      .map(
        () =>
          new Phaser.Geom.Circle(
            Phaser.Math.Between(0, this.center.x),
            Phaser.Math.Between(0, this.center.y),
            Phaser.Math.Between(25, 75)
          )
      );

    this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
  }

  update() {
    this.shapes.forEach(function (shape, i) {
      shape.x += 1 + 0.1 * i;
      shape.y += 1 + 0.1 * i;
    });
    Phaser.Actions.WrapInRectangle(this.shapes, this.rect, 72);
    this.draw();
  }

  color(i) {
    return 0x001100 * (i * 15) + 0x000033 * (i % 5);
  }

  draw() {
    this.graphics.clear();

    this.shapes.forEach((shape, i) => {
      this.graphics.fillStyle(this.color(i), 0.5).fillCircleShape(shape);
    }, this);
  }
}

export default Example;
