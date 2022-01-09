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
    this.group1 = this.add.group({ key: "ball", frameQuantity: 16 });
    this.group2 = this.add.group({ key: "ball", frameQuantity: 16 });
    this.group3 = this.add.group({ key: "ball", frameQuantity: 16 });
    this.group4 = this.add.group({ key: "ball", frameQuantity: 16 });

    Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), {
      x: this.width / 2,
      y: this.height / 2,
      radius: 200,
    });
    Phaser.Actions.PlaceOnCircle(this.group2.getChildren(), {
      x: this.width / 2,
      y: this.height / 2,
      radius: 160,
    });
    Phaser.Actions.PlaceOnCircle(this.group3.getChildren(), {
      x: this.width / 2,
      y: this.height / 2,
      radius: 120,
    });

    Phaser.Actions.PlaceOnCircle(this.group4.getChildren(), {
      x: this.width / 2,
      y: this.height / 2,
      radius: 80,
    });
  }

  update() {
    Phaser.Actions.RotateAroundDistance(
      this.group1.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      200
    );
    Phaser.Actions.RotateAroundDistance(
      this.group2.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      160
    );
    Phaser.Actions.RotateAroundDistance(
      this.group3.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      120
    );
    Phaser.Actions.RotateAroundDistance(
      this.group4.getChildren(),
      { x: this.width / 2, y: this.height / 2 },
      0.02,
      80
    );
  }
}

export default Example;
