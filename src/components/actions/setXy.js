import phaser from "../../assets/phaser2.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
  }

  preload() {
    this.load.image("phaser", phaser);
  }

  create() {
    const group = this.add.group();

    // add an existing image into the group
    const image = this.add.image(0, 0, "phaser");
    group.add(image);
    // 对组执行的任何操作现在都由图像反映
    // 例如，这会将图像的位置设置为相应的坐标
    Phaser.Actions.SetXY(group.getChildren(), this.center.x, this.center.y);
  }
}

export default Example;
