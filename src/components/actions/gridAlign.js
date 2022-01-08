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
      frameQuantity: 20, // 每一帧中重复多少次
    });

    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 10, // 每行数量
      height: 10, // 每列数量
      cellWidth: 32, // 每个cell的宽度
      cellHeight: 32, // 每个cell的高度
      x: 20, // 原点位置x
      y: 24, // 原点位置y
    });
  }
}

export default Example;
