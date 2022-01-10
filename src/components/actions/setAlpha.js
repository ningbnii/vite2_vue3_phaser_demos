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
    const group = this.add.group({
      key: "diamonds",
      frame: 0,
      frameQuantity: 50,
      setXY: { x: 32, y: 32, stepX: 14 },
    });
    // 可选的 `step` 属性以递增方式应用，乘以数组中的每个项目，效果类似线性渐变
    Phaser.Actions.SetAlpha(group.getChildren(), 0, 1 / 50);
  }
}

export default Example;
