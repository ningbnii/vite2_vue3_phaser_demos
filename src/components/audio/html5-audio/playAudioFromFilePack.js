class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.filePackObject = this.getFilePackObject()
  }

  getFilePackObject() {
    return {
      pack: {
        files: [
          {
            type: "audio",
            key: "theme",
            url: ["assets/audio/oedipus_wizball_highscore.mp3"],
          },
          {
            type: "image",
            key: "wizball",
            url: "assets/wizball.png",
          },
        ],
      },
      meta: {
        generated: "1401380327373",
        app: "Phaser 3 Asset Packer",
        url: "https://phaser.io",
        version: "1.0",
        copyright: "Photon Storm Ltd. 2021",
      },
    }
  }

  preload() {
    this.load.pack("pack1", this.filePackObject)
  }

  create() {
    this.add.image(this.center.x, this.center.y, "wizball").setScale(4)
    let music = this.sound.add("theme")
    music.play()
  }
}

export default Example
