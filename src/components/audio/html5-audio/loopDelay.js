class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = 'assets/'
    this.load.bitmapFont('atari-classic', 'atari-classic.png', 'atari-classic.xml')
    this.load.image('streets', 'cyberpunk-street.png')
    this.load.atlas('speakers', 'speakers.png', 'speakers.json')

    this.load.audio('bass', ['audio/bass.mp3'])
    this.load.audio('drums', ['audio/drums.mp3'])
    this.load.audio('percussion', ['audio/percussion.mp3'])
    this.load.audio('synth1', ['audio/synth1.mp3'])
    this.load.audio('synth2', ['audio/synth2.mp3'])
    this.load.audio('top1', ['audio/top1.mp3'])
    this.load.audio('top2', ['audio/top2.mp3'])
  }

  create() {
    this.sound.audioPlayDelay = 0.1
    this.sound.loopEndOffset = 0.05

    let streets = this.add.image(0, 0, 'streets').setOrigin(0)
    streets.setScale(this.height / 192)

    this.topLeftSpeaker = this.add.image(100, this.height - 100, 'speakers')
    this.topRightSpeaker = this.add.image(120, this.height - 50, 'speakers')
    this.middleSpeaker = this.add.image(250, this.height - 100, 'speakers')
    this.bottomSpeaker = this.add.image(270, this.height - 50, 'speakers')

    let bass = this.sound.add('bass')
    let drums = this.sound.add('drums')
    let percussion = this.sound.add('percussion')
    let synth1 = this.sound.add('synth1')
    let synth2 = this.sound.add('synth2')
    let top1 = this.sound.add('top1')
    let top2 = this.sound.add('top2')
  }
}

export default Example
