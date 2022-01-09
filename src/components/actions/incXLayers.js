import veg_png from "../../assets/veg.png";
import veg_json from "../../assets/veg.json";

class Example extends Phaser.Scene {
  constructor() {
    super();
    this.move = 0;
  }

  preload() {
    // 地图
    this.load.atlas("atlas", veg_png, veg_json);
  }

  create() {
    this.groupA = this.add.group();
    this.groupB = this.add.group();

    for (let i = 0; i < 1000; i++) {
      this.groupA.create(
        100 + Math.random() * 600, // x坐标
        100 + Math.random() * 400, // y坐标
        "atlas",
        "veg0" + Math.floor(1 + Math.random() * 9)
      );
    }

    for (let i = 0; i < 1000; i++) {
      this.groupB.create(
        100 + Math.random() * 600, // x坐标
        100 + Math.random() * 400, // y坐标
        "atlas",
        "veg0" + Math.floor(1 + Math.random() * 9)
      );
    }
  }

  update() {
    Phaser.Actions.IncX(this.groupA.getChildren(), Math.cos(this.move)); // 给group中的每个元素都设置一个坐标值，IncX，x坐标
    Phaser.Actions.IncY(this.groupA.getChildren(), Math.sin(this.move)); // y坐标
    Phaser.Actions.Rotate(this.groupA.getChildren(), -0.01); // 旋转角度

    Phaser.Actions.IncX(this.groupB.getChildren(), -Math.cos(this.move));
    Phaser.Actions.IncY(this.groupB.getChildren(), -Math.sin(this.move));
    Phaser.Actions.Rotate(this.groupB.getChildren(), 0.01);

    this.move += 0.01;
  }
}

export default Example;
