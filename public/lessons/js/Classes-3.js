class SVG {
  static #canvas = null

  constructor (w, h) {
    SVG.createCanvas()
    SVG.setSize(w, h)
  }

  static #attrs = {
    line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
    circle: ['cx', 'cy', 'r', 'stroke', 'stroke-width', 'fill']
  }

  static createCanvas () {
    if (this.#canvas) return
    this.#canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(this.#canvas)
  }

  static setSize (w, h) {
    this.#canvas.setAttribute('width', w)
    this.#canvas.setAttribute('height', h)
  }

  static getCanvas () {
    return this.#canvas
  }

  static getAttrs (figure) {
    return this.#attrs[figure]
  }

  drawFigure (figure, params) {
    if (!SVG.getAttrs(figure)) {
      console.error('Invalid figure:', figure)
      return null
    }
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    SVG.getCanvas().appendChild(elem)
    for (const attr of SVG.getAttrs(figure)) {
      if (params[attr]) {
        elem.setAttribute(attr, params[attr])
      }
    }
    return elem
  }
}

const picture = new SVG(360, 360)
picture.drawFigure('circle', { cx: 100, cy: 150, r: 80, stroke: '#090', 'stroke-width': 5, fill: '#ff0d' })
const image = new SVG(300, 300)
image.drawFigure('line', { x1: 20, y1: 30, x2: 180, y2: 270, stroke: '#f50', 'stroke-width': 4 })
