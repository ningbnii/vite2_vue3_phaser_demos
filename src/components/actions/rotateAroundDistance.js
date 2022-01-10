import ball from "../../assets/shinyball.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image("ball", ball);
  }

  create() {
    this.group = this.add.group();

    for (let i = 0; i < 32; i++) {
      this.group.create(i * 32, 0, "ball");
    }
  }

  update() {
    Phaser.Actions.RotateAroundDistance(
      this.group.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      200
    );
  }
}

export default Example;
