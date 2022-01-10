import diamonds from "../../assets/diamonds32x24x5.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.container;
    this.center = { x: this.width / 2, y: this.height / 2 };
    this.rotateSpeed = 0.02;
  }

  preload() {
    this.load.spritesheet("diamonds", diamonds, {
      frameWidth: 32,
      frameHeight: 24,
    });
  }

  create() {
    this.add.sprite(this.center.x, this.center.y, "diamonds", 1); // 中心点，我们将绕着它旋转
    this.container = this.add.container(this.center.x, this.center.y); // 创建一个容器
    const text = this.add.text(-10, -50, "phaser");
    const diamond1 = this.add.sprite(0, 0, "diamonds", 1);
    diamond1.setScale(2);
    const diamond2 = this.add.sprite(15, 0, "diamonds", 2);
    diamond2.setScale(2);
    const diamond3 = this.add.sprite(-15, 0, "diamonds", 3);
    diamond3.setScale(2);

    this.container.add([diamond1, diamond2, diamond3, text]);

    // stop container on click
    this.input.on(
      "pointerdown",
      function () {
        this.rotateSpeed = this.rotateSpeed > 0 ? 0 : 0.02;
      },
      this
    );
  }

  update() {
    Phaser.Actions.RotateAroundDistance(
      [this.container],
      this.center,
      this.rotateSpeed,
      180
    );
    const angleDeg =
      (Math.atan2(
        this.container.y - this.center.y,
        this.container.x - this.center.x
      ) *
        180) /
      Math.PI;
    this.container.angle = angleDeg + 90; // container should face the center point
  }
}

export default Example;
