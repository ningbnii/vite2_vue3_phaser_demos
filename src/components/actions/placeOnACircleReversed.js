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
    this.group1 = this.add.group({ key: "ball", frameQuantity: 36 });
    this.group2 = this.add.group({ key: "ball", frameQuantity: 32 });
    this.group3 = this.add.group({ key: "ball", frameQuantity: 26 });
    this.group4 = this.add.group({ key: "ball", frameQuantity: 16 });

    this.circle1 = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 200);
    this.circle2 = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 160);
    this.circle3 = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 120);
    this.circle4 = new Phaser.Geom.Circle(this.width / 2, this.height / 2, 80);

    Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), this.circle1);
    Phaser.Actions.PlaceOnCircle(this.group2.getChildren(), this.circle2);
    Phaser.Actions.PlaceOnCircle(this.group3.getChildren(), this.circle3);
    Phaser.Actions.PlaceOnCircle(this.group4.getChildren(), this.circle4);
  }

  update() {
    // 以圆形轨迹旋转
    Phaser.Actions.RotateAroundDistance(
      this.group1.getChildren(),
      this.circle1,
      -0.03,
      this.circle1.radius
    );
    Phaser.Actions.RotateAroundDistance(
      this.group2.getChildren(),
      this.circle2,
      -0.025,
      this.circle2.radius
    );
    Phaser.Actions.RotateAroundDistance(
      this.group3.getChildren(),
      this.circle3,
      -0.02,
      this.circle3.radius
    );
    Phaser.Actions.RotateAroundDistance(
      this.group4.getChildren(),
      this.circle4,
      -0.015,
      this.circle4.radius
    );
  }
}

export default Example;
