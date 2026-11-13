const BaseClass = class Canvas {
  constructor (w = 300, h = 300) {
    Canvas.create(w, h)
  }

  static #context = null

  static getContext = () => this.#context

  static create (width, height) {
    if (this.#context) return
    const canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(canvas, { width, height })
    this.#context = canvas.getContext('2d')
  }

  setLineWidth (width = 2) {
    const context = Canvas.getContext()
    context.lineWidth = width
  }
  setLineColor (color = '#09b') {
    const context = Canvas.getContext()
    context.strokeStyle = color
  }
  setFillColor (color = '#ff0') {
    const context = Canvas.getContext()
    context.fillStyle = color
  }

  drawLine (points, lineWidth, lineColor) {
    const context = Canvas.getContext()
    context.beginPath()
    this.setLineWidth(lineWidth)
    this.setLineColor(lineColor)
    context.moveTo(points[0].x, points[0].y)
    context.lineTo(points[1].x, points[1].y)
    context.stroke()
  }
}

class ExtendedCanvas extends BaseClass {
  drawCircle (center, radius, lineWidth, lineColor, fill) {
    const context = BaseClass.getContext()
    context.beginPath()
    this.setLineWidth(lineWidth)
    this.setLineColor(lineColor)
    this.setFillColor(fill)
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }
}

const newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], 5, '#f0f')
