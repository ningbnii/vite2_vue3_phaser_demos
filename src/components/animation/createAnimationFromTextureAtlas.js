import sea_png from "../../assets/sea_creatures_json.png"
// import sea_json from "../../assets/sea_creatures_json.json?raw"
import undersea from "../../assets/undersea.jpg"
import coral from "../../assets/seabed.png"

class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    const sea_json = new URL("../../assets/sea_creatures_json.json", import.meta.url).href
    this.load.atlas("sea", sea_png, sea_json)
    this.load.image("undersea", undersea)
    this.load.image("coral", coral)
  }

  create() {
    this.add.image(0, 0, "undersea").setOrigin(0)

    this.anims.create({ key: "jellyfish", frames: this.anims.generateFrameNames("sea", { prefix: "blueJellyfish", end: 32, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: "crab", frames: this.anims.generateFrameNames("sea", { prefix: "crab1", end: 25, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: "octopus", frames: this.anims.generateFrameNames("sea", { prefix: "octopus", end: 24, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: "purpleFish", frames: this.anims.generateFrameNames("sea", { prefix: "purpleFish", end: 20, zeroPad: 4 }), repeat: -1 })
    this.anims.create({ key: "stingray", frames: this.anims.generateFrameNames("sea", { prefix: "stingray", end: 23, zeroPad: 4 }), repeat: -1 })

    const jellyfish = this.add.sprite(400, 300, "seacreatures").play("jellyfish")
    const bigCrab = this.add.sprite(550, 480, "seacreatures").setOrigin(0).play("crab")
    const smallCrab = this.add.sprite(730, 515, "seacreatures").setScale(0.5).setOrigin(0).play("crab")
    const octopus = this.add.sprite(100, 100, "seacreatures").play("octopus")
    const fish = this.add.sprite(600, 200, "seacreatures").play("purpleFish")
    const ray = this.add.sprite(100, 300, "seacreatures").play("stingray")

    this.add.image(0, 466, "coral").setOrigin(0)
  }
}

export default Example
