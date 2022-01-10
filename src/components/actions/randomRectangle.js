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
    this.rectangle = new Phaser.Geom.Rectangle(100, 100, 300, 200);

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 300,
    });
    Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rectangle);
  }
}

export default Example;
