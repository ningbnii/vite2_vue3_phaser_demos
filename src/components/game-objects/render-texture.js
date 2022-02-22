class SceneA extends Phaser.Scene {
  constructor() {
    super('SceneA')
  }

  preload() {
    this.load.video('wormhole', 'assets/video/wormhole.mp4', 'loadeddata', false, true)
  }

  create() {
    var vid = this.add.video(400, 300, 'wormhole')

    vid.play(true)

    // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
    vid.setPaused(false)
  }
}

export { SceneA }
