import diamonds from "../../assets/diamonds32x24x5.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
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
      frame: 3,
      frameQuantity: 50,
      setXY: {
        x: 32,
        y: 32,
        stepX: 14,
      },
    });

    console.log(group.getChildren());
    // 使用基于字符串的属性在 2 个给定值之间展开子项，渐变效果
    Phaser.Actions.Spread(group.getChildren(), "alpha", 0, 1);
    // 从小到大排列，效果可以叠加
    Phaser.Actions.Spread(group.getChildren(), "scale", 0, 1);
  }
}

export default Example;
