import ball from "../../assets/chunk.png";

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
    // this.triangle = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);
    // 等边三角形
    this.triangle = new Phaser.Geom.Triangle.BuildEquilateral(
      this.width / 2,
      this.height / 2 - 190,
      380
    );

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 64,
    });
    Phaser.Actions.PlaceOnTriangle(this.group.getChildren(), this.triangle);
  }
}

export default Example;
