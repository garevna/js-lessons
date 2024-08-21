let section = document.body

section.style.height = "600px!important"
section.style.padding = 0

class Canvas extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.mode = 'draw'
  }

  async connectedCallback () {
    this.canvas = this.shadow
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
    this.canvas.maxDistance = Math.min(this.canvas.width, this.canvas.height)
    this.canvas.points = []
    this.staticPoints = []

    this.ctx = this.canvas.getContext('2d')
    this.staticText = this.getAttribute('text') || ''
    window.addEventListener('resize', this.resizeCanvas.bind(this))
  }

  static get observedAttributes () {
    return ['text']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    this.staticText = newVal
    if (!this.canvas.points.length) {
      this.init()
      this.mode =  'draw'
    } else this.mode = 'break'

    this.loop()
  }

  init () {
    this.createStaticPoints()
    this.canvas.points = []
    this.staticPoints
      .forEach(target => this.canvas.points.push(new CanvasPoint(this.canvas, this.ctx, target)))
  }

  loop () {
    if (this.mode) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this[this.mode]()
    }

    requestAnimationFrame(this.loop.bind(this))
  }

  draw () {
    if (this.mode !== 'draw') return
    this.play = this.canvas.points.filter(point => point.move()).length
    this.mode = this.play ? 'draw' : null
  }

  break () {
    if (this.mode !== 'break') return
    this.play = this.canvas.points.filter(point => point.break()).length
    if (!this.play) {
      this.init()
      this.mode = 'draw'
    }
  }

  createStaticPoints () {
    this.staticPoints = []

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    Object.assign(this.ctx, {
      font: 'bold 100px Arial',
      lineWidth: 2,
      strokeStyle: '#111'
    })

    this.ctx.strokeText(this.staticText, 50, 200)

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    let ctxData = imageData.data

    for (let point = 0; point < ctxData.length; point += 4) {
      if (ctxData[point] || ctxData[point + 1] || ctxData[point + 2]) {
        this.staticPoints.push({
          x: Math.round((point % (this.canvas.width * 4)) / 4),
          y: Math.round(point / (this.canvas.width * 4))
        })
      }
    }
  }

  resizeCanvas () {
    this.canvas.width = this.canvas.height =
      Math.round(Math.min(section.offsetWidth, section.offsetHeight))
    this.canvas.points &&
      this.canvas.points.forEach(point => point.draw())
  }
}


class CanvasPoint {
  constructor (canvas, ctx, target) {
    Object.assign(this, {
      canvas,
      ctx,
      target,
      color: this.colors[Math.round(Math.random() * (this.colors.length - 1))]
    })
    this.color[3] = 255

    Object.defineProperty(this, 'distance', {
      get () {
        return Math.round(Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2)))
      },
      set (radius) {
        this.color[3] = Math.round(255 * ((this.maxDistance - radius) / this.maxDistance))
        let angle = (Math.PI / 2) * Math.random()
        ;[this.x, this.y] = [
          this.target.x + Math.round ( radius * Math.sin ( angle ) ),
          this.target.y + Math.round ( radius * Math.cos ( angle ) )
        ]
      }
    })

    this.distance = this.maxDistance
    this.draw()
  }

  move () {
    if (!this.distance) return this.draw()

    this.distance = Math.max(0, Math.round(this.distance - this.velocity * Math.random()))
    this.color[3] = Math.round(255 * ((this.maxDistance - this.distance) / this.maxDistance))

    this.draw()

    return Boolean(this.distance)
  }

  break () {
    let angle = (Math.PI / 2) * Math.random()
    let radius = Math.round(this.velocity * Math.random())
    ;[this.x, this.y] = [
      this.x + Math.round(radius * Math.sin(angle)),
      this.y + Math.round(radius * Math.cos(angle))
    ]
    this.color[3] = Math.round(255 * ((this.maxDistance - this.distance) / this.maxDistance))
    this.draw()
    return Math.max(this.maxDistance - this.distance , 0)
  }

  draw () {
    const imageData = this.ctx.getImageData(this.x, this.y, 1, 1)
    const point = imageData.data
    for (let index = 0; index < 4; index++) point[index] = this.color[index]
    this.ctx.putImageData(imageData, this.x, this.y)
  }
}

CanvasPoint.prototype.colors = [
  [255, 0, 255, 255],
  [130, 255, 130, 255],
  [255, 90, 0, 255],
  [0, 150, 200, 255],
  [255, 255, 170, 255]
]

CanvasPoint.prototype.velocity = 8

Object.defineProperty(CanvasPoint.prototype, 'maxDistance', {
  get () {
    return Math.round(Math.min(this.canvas.width * 0.5, this.canvas.height * 0.5))
  }
})


customElements.define('canvas-element', Canvas)


let canvas = section.appendChild(document.createElement('canvas-element'))

canvas.setAttribute('text', '✈')

canvas.onclick = function (event) {
  const currentText = event.target.getAttribute('text')
  event.target.setAttribute('text', currentText === 'JS' ? '✈' : 'JS')
}
