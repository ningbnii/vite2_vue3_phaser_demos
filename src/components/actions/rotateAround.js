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
        Phaser.Math.Between(0, this.width / 2),
        Phaser.Math.Between(0, this.height / 2),
        "diamonds",
        Phaser.Math.Between(0, 4)
      );
    }
  }

  update() {
    Phaser.Actions.RotateAround(
      this.group.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.01
    );
  }
}

export default Example;
