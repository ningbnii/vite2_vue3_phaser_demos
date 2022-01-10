import gems_png from "../../assets/gems.png";
import gems_json from "../../assets/gems.json";

class Example extends Phaser.Scene {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.center = { x: this.width / 2, y: this.height / 2 };
    this.y = 160;
  }

  preload() {
    this.load.atlas("gems", gems_png, gems_json);
  }

  create() {
    this.add
      .text(this.center.x, 32, "click to create animations", {
        color: "#00ff00",
      })
      .setOrigin(0.5, 0); // 将中心设置到文字整体的中间位置，0.5是一个比例值

    //每次将新动画添加到动画管理器时，我们都会调用此函数
    this.anims.on(
      Phaser.Animations.Events.ADD_ANIMATION,
      this.addAnimation,
      this
    );

    this.i = 0;
    // 点击添加动画
    // generateFrameNames:从纹理键和配置对象生成 Phaser.Types.Animations.AnimationFrame 对象数组
    // 生成具有基于字符串的框架名称的对象，由给定的配置
    // 这是一个辅助方法，旨在让您更轻松地从纹理图集中提取所有帧名称。 如果您正在使用精灵表，请参阅 generateFrameNumbers 方法。
    // 如果你加载了一个名为 gems 的纹理图集，它包含 6 个名为 ruby_0001、ruby_0002 等的帧，那么你可以使用以下方法调用此方法：this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6、zeroPad：4}）
    // 结束值告诉它寻找 6 帧，递增编号，都以前缀 ruby_ 开头。 zeroPad 值告诉它有多少个零填充了数字。 要使用此方法创建动画，您可以执行以下操作：
    this.input.on(
      "pointerup",
      function () {
        switch (this.i) {
          case 0:
            this.anims.create({
              key: "diamond",
              frames: this.anims.generateFrameNames("gems", {
                prefix: "diamond_",
                end: 15, // diamond_0015，到15停止
                zeroPad: 4, //diamond_0001，_后面四个数字
              }),
              repeat: -1,
            });
            break;
          case 1:
            this.anims.create({
              key: "prism",
              frames: this.anims.generateFrameNames("gems", {
                prefix: "prism_",
                end: 6,
                zeroPad: 4,
              }),
              repeat: -1,
            });
            break;
          case 2:
            this.anims.create({
              key: "ruby",
              frames: this.anims.generateFrameNames("gems", {
                prefix: "ruby_",
                end: 6,
                zeroPad: 4,
              }),
              repeat: -1,
            });
            break;
          case 3:
            this.anims.create({
              key: "square",
              frames: this.anims.generateFrameNames("gems", {
                prefix: "square_",
                end: 14,
                zeroPad: 4,
              }),
              repeat: -1,
            });
            break;
        }
        this.i++;
      },
      this
    );
  }

  addAnimation(key) {
    this.add.sprite(this.center.x, this.y, "gems").play(key);
    this.y += 100;
  }
}

export default Example;
