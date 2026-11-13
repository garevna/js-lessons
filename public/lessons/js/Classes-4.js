class SVG {
  constructor (w, h) {
    SVG.createCanvas()
    SVG.setSize(w, h)
  }
  static #canvas = null
  static #attrs = {
    line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
    circle: ['cx', 'cy', 'r', 'stroke', 'stroke-width', 'fill']
  }

  static createCanvas () {
    if (this.#canvas) return
    this.#canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(SVG.#canvas)
  }

  static setSize (w, h) {
    this.#canvas.setAttribute('width', w)
    this.#canvas.setAttribute('height', h)
  }

  drawFigure (figure, params) {
    if (!SVG.#attrs[figure]) {
      console.error('Invalid figure:', figure)
    }
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    SVG.#canvas.appendChild(elem)
    for (const attr of SVG.#attrs[figure]) {
      if (params[attr]) {
        elem.setAttribute(attr, params[attr])
      }
    }
    return elem
  }
}

class ExtendedSVG extends SVG {
  constructor () {
    super(320, 280)
  }

  line (x1, y1, x2, y2, stroke = '#777', strokeWidth = 2) {
    super.drawFigure('line', {
      x1,
      y1,
      x2,
      y2,
      stroke,
      'stroke-width': strokeWidth
    })
  }
  circle (cx, cy, r, stroke = '#777', strokeWidth = 2, fill = '#fff5') {
    super.drawFigure('circle', {
      cx,
      cy,
      r,
      stroke,
      'stroke-width': strokeWidth,
      fill
    })
  }
}

const canvas = new ExtendedSVG
const picture = new ExtendedSVG

canvas.circle(150, 150, 100, '#090', 5, '#ff0d')
picture.line(20, 30, 180, 270, '#f50', 4)
