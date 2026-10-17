const Sample = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
    this.canvas.style.border = '1px solid #aaa'
    this.canvas.style.background = '#fff'
    this.area = this.canvas.getContext('2d')
  }

  resizeCanvas (event) {
    this.canvas.width = 320
    this.canvas.height = 280
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const pict = new Sample ()
window.onresize = pict.resizeCanvas.bind(pict)

pict.drawLine([{ x: 50, y: 30 }, { x: 250, y: 200 }])
setTimeout(() => pict.drawLine([{ x: 250, y: 200 }, { x: 50, y: 200 }]), 500)
setTimeout(() => pict.drawLine([{ x: 50, y: 200 }, { x: 50, y: 30 }]), 1000)
