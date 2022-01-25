class Example extends Phaser.Scene {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.center = { x: this.width / 2, y: this.height / 2 }
  }

  preload() {
    this.load.xml("data", "assets/loader-tests/test.xml")
  }

  create() {
    const catalog = this.cache.xml.get("data")
    const books = catalog.getElementsByTagName("book")
    Array.from(books).forEach((book) => {
      console.log(book.getAttribute("id"))
    })
  }
}

export default Example
