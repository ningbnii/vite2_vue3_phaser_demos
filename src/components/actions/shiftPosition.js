import sky from "../../assets/deepblue.png";
import ball from "../../assets/ball-tlb.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
    this.move = 0;
    this.x = 0;
    this.y = 0;
  }

  preload() {
    this.load.image("sky", sky);
    this.load.image("ball", ball);
  }

  create() {
    this.add.image(0, 0, "sky").setOrigin(0);
    this.group = this.add.group({ key: "ball", frameQuantity: 50 });

    this.input.on(
      "pointermove",
      function (pointer) {
        this.x = pointer.x;
        this.y = pointer.y;
      },
      this
    );
  }

  /**
   *
   * @param {*} time
   * @param {*} delta 自上一帧以来的增量时间（以毫秒为单位）。这是一个基于 FPS 速率的平滑和上限值。
   */
  update(time, delta) {
    this.move += delta;
    // this.move越大，间隔时间越长
    if (this.move > 6) {
      // 按顺序移动到设置的点的位置，类似贪吃蛇的效果
      Phaser.Actions.ShiftPosition(this.group.getChildren(), this.x, this.y);
      this.move = 0;
    }
  }
}

export default Example;
