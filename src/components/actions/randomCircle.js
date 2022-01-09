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
    this.circle = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 130);

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 300,
    });
    Phaser.Actions.RandomCircle(this.group.getChildren(), this.circle);
  }
}

export default Example;
