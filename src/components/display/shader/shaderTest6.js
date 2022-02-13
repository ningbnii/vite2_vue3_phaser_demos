class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image("metal", "assets/textures/alien-metal.jpeg")
    this.load.image("grass", "assets/textures/grass.png")
    this.load.image("tiles", "assets/textures/tiles.jpeg")
    this.load.image("logo", "assets/sprites/phaser3-logo-small.png")
    this.load.image("pic", "assets/pics/rick-and-morty-by-sawuinhaff-da64e7y.png")
    this.load.glsl("bundle", "assets/shaders/bundle.glsl.js") // shader集合
    this.load.glsl("bundle2", "assets/shaders/bundle2.glsl.js") // shader集合
  }

  create() {
    // this.add.image(400, 300, "pic")
    // const shader = this.add.shader("Tunnel", 400, 300, 512, 512, ["metal"])
    // // shader.uniforms.origin.value = 0.5
    // shader.setInteractive()
    // shader.on("pointerdown", function () {
    //   // iChannel0的渲染纹理,texturekey
    //   if (shader.uniforms.iChannel0.textureKey === "metal") {
    //     // setChannel0修改纹理
    //     shader.setChannel0("grass")
    //   } else if (shader.uniforms.iChannel0.textureKey === "grass") {
    //     shader.setChannel0("tiles")
    //   } else {
    //     shader.setChannel0("metal")
    //   }
    // })
    // this.add.image(400, 300, "logo")

    const shader = this.add.shader("Stripes", 400, 300, 800, 600)
    // .setVisible(false);
    // 横纹的数量
    shader.setUniform("size.value", 1)

    const mask = shader.createBitmapMask()
    const pic = this.add.image(400, 300, "pic").setMask(mask)

    // logo在mask上面
    this.add.image(400, 300, "logo")
    this.tweens.add({
      targets: shader.uniforms.size,
      value: 32,
      duration: 6000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    })
  }
}

export default Example
