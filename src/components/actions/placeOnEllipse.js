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
    this.ellipse = new Phaser.Geom.Ellipse(
      this.width / 2,
      this.height / 2,
      200,
      500
    );
    this.group = this.add.group({ key: "ball", frameQuantity: 48 });

    Phaser.Actions.PlaceOnEllipse(this.group.getChildren(), this.ellipse);

    this.tween = this.tweens.add({
      targets: this.ellipse,
      width: 700,
      height: 100,
      duration: 2000,
      delay: 0,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    Phaser.Actions.PlaceOnEllipse(this.group.getChildren(), this.ellipse);
  }
}

export default Example;
