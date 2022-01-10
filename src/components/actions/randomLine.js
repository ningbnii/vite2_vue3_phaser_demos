import ball from "../../assets/orb-blue.png";

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
    this.line = new Phaser.Geom.Line(100, 100, 400, 400);

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 300,
    });
    Phaser.Actions.RandomLine(this.group.getChildren(), this.line);
  }
}

export default Example;
