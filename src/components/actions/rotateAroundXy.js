import diamonds from "../../assets/diamonds32x24x5.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.spritesheet("diamonds", diamonds, {
      frameWidth: 32,
      frameHeight: 24,
    });
  }

  create() {
    this.group = this.add.group();

    for (let i = 0; i < 256; i++) {
      this.group.create(
        Phaser.Math.Between(0, this.width),
        Phaser.Math.Between(0, this.height),
        "diamonds",
        Phaser.Math.Between(0, 4)
      );
    }

    this.geomPoint = new Phaser.Geom.Point(this.width / 2, this.height / 2);
    this.input.on(
      "pointermove",
      function (pointer) {
        this.geomPoint.setTo(pointer.x, pointer.y);
      },
      this
    );
  }

  update() {
    Phaser.Actions.RotateAroundDistance(
      this.group.getChildren(),
      this.geomPoint,
      0.1,
      100
    );
  }
}

export default Example;
