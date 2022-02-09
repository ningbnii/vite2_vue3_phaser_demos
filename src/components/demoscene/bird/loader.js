class Loader extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
    })
  }

  preload() {
    this.load.image("loader", "assets/demoscene/birdy-nam-nam-loader.png")
    this.load.image("click", "assets/demoscene/birdy-nam-nam-click.png")
  }

  create() {
    // 跳转到demo场景
    this.scene.start("demo")
    this.loaderTest = "ning"
  }
}

export default Loader
