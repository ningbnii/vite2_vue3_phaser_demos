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
    this.ellipse = new Phaser.Geom.Ellipse(
      this.width / 2,
      this.height / 2,
      100,
      200
    );

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 300,
    });
    Phaser.Actions.RandomEllipse(this.group.getChildren(), this.ellipse);
  }
}

export default Example;
