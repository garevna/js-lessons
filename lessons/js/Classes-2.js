class Picture {
  constructor (url, width) {
    this.elem = document.createElement('img')
    this.elem.src = url
    this.elem.width = width
  }
}

const x = new Picture('images/hong-kong-1990268__340.jpg', 200)
document.body.appendChild(x.elem)
