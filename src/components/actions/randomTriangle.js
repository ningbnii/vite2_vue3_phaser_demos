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
    this.triangle = new Phaser.Geom.Triangle.BuildEquilateral(
      this.width / 2,
      this.height / 2 - 100,
      200
    );

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 300,
    });
    Phaser.Actions.RandomTriangle(this.group.getChildren(), this.triangle);
  }
}

export default Example;
