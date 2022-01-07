import diamonds from "../../assets/diamonds32x24x5.png";

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet("diamonds", diamonds, {
      frameWidth: 32,
      frameHeight: 24,
    });
  }

  create() {
    const group = this.add.group({
      key: "diamonds",
      frame: [0, 1, 2, 3, 4],
      frameQuantity: 20,
    });

    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 10,
      height: 10,
      cellWidth: 32,
      cellHeight: 32,
      x: 100,
      y: 100,
    });
  }
}

export default Example;
