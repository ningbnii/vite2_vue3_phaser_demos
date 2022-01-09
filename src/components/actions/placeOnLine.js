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
    this.line = new Phaser.Geom.Line(100, 200, 600, 400);

    this.group = this.add.group({ key: "ball", frameQuantity: 32 });
    Phaser.Actions.PlaceOnLine(this.group.getChildren(), this.line);
  }
}

export default Example;
