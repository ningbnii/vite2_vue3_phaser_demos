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
    this.rect = new Phaser.Geom.Rectangle(100, 100, 256, 256);

    this.group = this.add.group({
      key: "ball",
      frameQuantity: 32,
    });
    Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), this.rect);
  }
}

export default Example;
