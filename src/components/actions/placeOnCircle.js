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
    const circle = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 260);
    this.group = this.add.group({ key: "ball", frameQuantity: 32 });

    Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle);

    this.tween = this.tweens.addCounter({
      from: 260,
      to: 0,
      duration: 3000,
      delay: 0,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    Phaser.Actions.RotateAroundDistance(
      this.group.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      this.tween.getValue()
    );
  }
}

export default Example;
