import ball from "../../assets/shinyball.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
  }

  preload() {
    this.load.image("ball", ball);
  }

  create() {
    this.rect = new Phaser.Geom.Rectangle(100, 100, 256, 256);
    this.group = this.add.group({ key: "ball", frameQuantity: 32 });
    Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);
  }

  update() {
    this.children = this.group.getChildren();

    Phaser.Actions.IncXY(this.children, 1, 1);
    Phaser.Actions.WrapInRectangle(this.children, this.rect);
  }
}

export default Example;
