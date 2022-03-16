class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    })
  }

  preload() {
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  }

  create() {
    //  We need 2 extra pointers, as we only get 1 by default
    this.input.addPointer(2)

    var sprite1 = this.add
      .sprite(0, 0, 'logo')
      .setOrigin(0, 0)
      .setInteractive({ draggable: true })
    sprite1.setName('sprite1')

    /**
     * 判断两个触点是否都在sprite1上
     */
    // sprite1.on('drag', (pointer, dragX, dragY) => {
    //   let pointer1Sprite = this.input.hitTestPointer(this.input.pointer1)
    //   let pointer2Sprite = this.input.hitTestPointer(this.input.pointer2)
    //   if (
    //     pointer1Sprite.length > 0 &&
    //     pointer1Sprite[0].name == 'sprite1' &&
    //     pointer2Sprite.length > 0 &&
    //     pointer2Sprite[0].name == 'sprite1'
    //   ) {
    //     console.log('两个触点都在sprite1上')
    //     console.log('pointer1', this.input.pointer1.isDown)
    //     console.log('pointer2', this.input.pointer2.isDown)
    //     if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
    //       sprite1.x = dragX
    //       sprite1.y = dragY
    //     }
    //   }
    // })

    sprite1.on('drag', (pointer, dragX, dragY) => {
      console.log(this.input.pointer1)
      console.log(this.input.pointer2)
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
        sprite1.x = dragX
        sprite1.y = dragY
      }
    })
  }
}

export { SceneA }
