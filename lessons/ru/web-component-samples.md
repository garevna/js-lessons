## ![ico-30 icon] Примеры веб-компонентов

[![ico-30 cap] Slider](https://garevna.github.io/js-samples/#19)

[![ico-30 cap] Spoiler](https://repl.it/@garevna/web-component)

[![ico-30 cap] Game](https://github.com/garevna/game/wiki)


◘◘![ico-30 cap] Canvas◘◘
~~~js
class Canvas extends HTMLElement {
  constructor (pointsNum = 200) {
    super()
    
    Object.assign(this, {
      this.shadow: this.attachShadow({ mode: 'closed' })
      pointsNum: pointsNum
      points: []
      loop: this.loop.bind(this)
    })
  }
    
  connectedCallback () {      
    this.canvas = this.shadow
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
        
    this.ctx = this.canvas.getContext('2d')
        
    while (this.points.length < this.pointsNum) {
      this.points.push(new CanvasPoint(this.canvas, this.ctx))
    }
        
    window.addEventListener('resize', this.resizeCanvas.bind(this) 
    this.loop()
  }
    
  loop () {
    this.draw()
    requestAnimationFrame(this.loop)
  }
    
  resizeCanvas () {
    Object.assign(this, {
      w: window.innerWidth * 0.8,
      h: window.innerHeight * 0.8
    })

    Object.assign(this.canvas, {
      width: this.w,
      height: this.h
    })
  }
    
  async movie () {
    this.draw()
    requestAnimationFrame(this.movie)
  }
    
  drawPoint (point) {
    point.draw()
    this.points.forEach(target => point.drawLine(target))
  }
    
  draw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.globalCompositeOperation = 'lighter'
    this.points.forEach(point => this.drawPoint(point))
  }
}


function CanvasPoint (canvas, ctx) {
  Object.assign(this, {
    canvas,
    ctx,
    maxVelocity: { x: 5, y: 5 },

    random: num => Math.round(Math.random() * num),

    setPosition: function () {
      Object.assign(this, {
        x: this.random(this.canvas.width),
        y: this.random(this.canvas.height)
      })
    },
    
    changePosition = function () {
      this.x = this.x + this.vx > this.canvas.width
        ? 0
        : this.x + this.vx < 0
          ? this.canvas.width
          : this.x + this.vx

      this.y = this.y + this.vy > this.canvas.height
        ? 0
        : this.y + this.vy < 0
          ? this.canvas.height
          : this.y + this.vy
    },
    
    getDistance: function (point) {
      return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
    }
  })
  
  this.setPosition()
  
  Object.assign(this, {
    radius: this.random(1),
    rgba: this.colors[this.random(this.colors.length - 1)],
    vx: this.random(this.maxVelocity.x),
    vy: this.random(this.maxVelocity.y),
    
    draw: function () {
      Object.assign(this.ctx, {
        fillStyle: this.rgba,
        strokeStyle: this.rgba
      })

      
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, true)
      this.ctx.fill()
      this.ctx.closePath()
        
      this.changePosition()
    },
    
    drawLine: function (target) {
      const dist = this.getDistance(target)

      if (this.rgba == target.rgba && dist < 200) {
        Object.assign(this.ctx, {
          lineWidth: 0.2,
          strokeStyle: this.rgba
        })

        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(target.x, target.y)
        this.ctx.stroke()
      }
    }
  })
}

CanvasPoint.prototype.colors = ['#f0f','#8f8','#f50','#09b','#ff9']

customElements.define('canvas-element', Canvas)

document.body.style.background = '#000'

document.body.appendChild(document.createElement('canvas-element'))
~~~

{{{web-component-samples.js}}}