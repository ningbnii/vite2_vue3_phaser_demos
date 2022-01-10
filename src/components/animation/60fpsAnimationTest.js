import walker_png from "../../assets/walker.png";
import walker_json from "../../assets/walker.json";
import sky from "../../assets/ms3-sky.png";
import trees from "../../assets/ms3-trees.png";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
  }

  preload() {
    this.load.atlas("walker", walker_png, walker_json);
    this.load.image("sky", sky);
    this.load.image("trees", trees);
  }

  create() {
    // 创建一个新的 TileSprite 游戏对象并将其添加到场景中
    this.bg = this.add
      .tileSprite(0, 38, this.width, 296, "sky")
      .setOrigin(0, 0);
    this.trees = this.add
      .tileSprite(0, 280, this.width, 320, "trees")
      .setOrigin(0, 0);

    const animConfig = {
      key: "walk",
      frames: "walker",
      frameRate: 60,
      repeat: -1,
    };

    this.anims.create(animConfig);

    const sprite = this.add.sprite(this.center.x, 484, "walker", "frame_0000");
    sprite.play("walk");
  }

  update() {
    this.bg.tilePositionX -= 2;
    this.trees.tilePositionX -= 6;
  }
}

export default Example;
