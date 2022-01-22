import dat from 'dat.gui'
class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.path = 'assets/'
    this.load.image('title', 'catastrophi.png')
    this.load.spritesheet('button', 'flixel-button.png', { frameWidth: 80, frameHeight: 20 })
    this.load.bitmapFont('nokia', 'nokia16black.png', 'nokia16black.xml')
    // audioSprite加载一个json文件，里面将音频进行了打标，可以播放对应标签的音乐段落
    this.load.audioSprite('sfx', 'audio/SoundEffects/fx_mixdown.json', ['audio/SoundEffects/fx_mixdown.mp3'])
  }

  create() {
    this.add.image(0, 0, 'title').setOrigin(0)
    // this.cache 对全局缓存的引用
    // this.cache.json 存储所有 JSON 数据文件的缓存，通常通过 Loader 添加。
    const spritemap = this.cache.json.get('sfx').spritemap
    let i = 0
    // 遍历json
    for (let spriteName in spritemap) {
      if (!spritemap.hasOwnProperty(spriteName)) {
        continue
      }
      this.makeButton(spriteName, 680, 115 + i * 40)
      i++
    }

    this.input.on(
      'gameobjectover',
      function (pointer, button) {
        this.setButtonFrame(button, 0)
      },
      this
    )

    this.input.on(
      'gameobjectout',
      function (pointer, button) {
        this.setButtonFrame(button, 1)
      },
      this
    )

    this.input.on(
      'gameobjectdown',
      function (pointer, button) {
        // 播放对应的声音
        this.sound.playAudioSprite('sfx', button.name)
        this.setButtonFrame(button, 2)
      },
      this
    )

    this.input.on(
      'gameobjectup',
      function (pointer, button) {
        this.setButtonFrame(button, 0)
      },
      this
    )
  }

  makeButton(name, x, y) {
    // setInteractive 将此游戏对象传递给输入管理器以启用输入。可以使用this.input.on('gameobjectover',function(pointer,object){},this)等监听按下按钮
    const button = this.add.image(x, y, 'button', 1).setInteractive()
    button.name = name
    button.setScale(2, 1.5)
    const text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16)
    text.x += (button.width - text.width) / 2
  }

  /**
   * 设置帧动画
   * @param {*} button
   * @param {*} frame
   */
  setButtonFrame(button, frame) {
    button.frame = button.scene.textures.getFrame('button', frame)
  }
}

export default Example
