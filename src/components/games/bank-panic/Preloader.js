export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  preload() {
    this.loading = this.add.image(512, 384, 'loading')
    this.load.setPath('assets/games/bank-panic/')

    this.load.image('start')
    this.load.image('title')
    this.load.image('logo')
    this.load.image('background')
    this.load.image('bulletHole', 'bullet-hole.png')
    this.load.atlas('assets', 'bank-panic.png', 'bank-panic.json')

    this.load.audio('shot', ['shot.mp3'])
    this.load.audio('banditShot', ['50cal.mp3'])
    this.load.audio('money', ['money.mp3'])
    this.load.audio('levelComplete', ['complete.mp3'])
    this.load.audio('gameOver', ['gameover.mp3'])
    this.load.audio('music', ['music.mp3'])
    this.load.audio('door', ['door.mp3'])
    this.load.audio('scream1', ['scream1.mp3'])
    this.load.audio('scream2', ['scream2.mp3'])
    this.load.audio('scream3', ['scream3.mp3'])
  }

  create() {
    //  Create our global animations

    this.anims.create({
      key: 'doorOpen',
      frames: this.anims.generateFrameNames('assets', { prefix: 'door', start: 1, end: 5 }),
      frameRate: 20,
    })

    this.anims.create({
      key: 'doorClose',
      frames: this.anims.generateFrameNames('assets', { prefix: 'door', start: 5, end: 1 }),
      frameRate: 20,
    })

    this.loading.setTexture('start')
    this.loading.setInteractive()
    this.loading.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
    this.scene.start('MainMenu')
  }
}
