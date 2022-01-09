import balls from "../../assets/balls.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.i = 0;
  }

  preload() {
    this.load.spritesheet("balls", balls, { frameWidth: 17, frameHeight: 17 });
  }

  create() {
    this.rect = new Phaser.Geom.Rectangle(64, 32, 100, 412);

    this.group = this.add.group({
      key: "balls",
      frame: [0, 1, 2, 3, 4, 5],
      frameQuantity: 10,
    });
    this.tweens.add({
      targets: this.rect,
      x: 200,
      y: 200,
      width: 412,
      height: 100,
      delay: 0,
      duration: 3000,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    Phaser.Actions.PlaceOnRectangle(
      this.group.getChildren(),
      this.rect,
      this.i
    );
    this.i++;
    if (this.i === this.group.length) {
      this.i = 0;
    }
  }
}

export default Example;
