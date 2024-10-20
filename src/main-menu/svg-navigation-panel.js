import { createElem } from './createElem'

const defs = `
<defs>
  <filter id="shadow">
    <feDropShadow dx="-8" dy="0.0" stdDeviation="5" flood-color="#0009" />
  </filter>
</defs>
`

class SvgNavigationPanel extends HTMLElement {
  constructor(){
    super()

    const root = getComputedStyle(document.documentElement)

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = `<svg><path /></svg>`

    createElem('style', this.shadow).textContent = `
      svg {
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 0;
        box-sizing:border-box;
      }
    `

    Object.assign(this, {
      svg: this.shadow.querySelector('svg'),
      status: 'norm',
      maxWidth: parseInt(root.getPropertyValue('--main-menu-width')),
      minWidth: 50,
      step: 5,
      d: 50
    })

    this.addEventListener('expand', function(event) {
      this.path.dispatchEvent(new Event(event.type))
    })

    this.addEventListener('close', function (event) {
      this.path.dispatchEvent(new Event(event.type))
    })
  }

  get path () {
    return this.shadow.querySelector('svg > path')
  }

  get randomStep () {
    return Math.round(Math.random() * this.h * 0.3)
  }
  get randomWidth () {
    return Math.round(Math.random() * this.maxWidth * 0.4)
  }

  setListeners () {
    this.path.addEventListener('expand', this.movie.bind(this))
    this.path.addEventListener('close', this.reverse.bind(this))
  }

  setStatic ( expand ) {
    this.svg.style.width = expand ? '100%' : '0'
    this.status = expand ? 'wide' : 'norm'
    const width = this.w - (expand ? this.maxWidth : this.minWidth)
    this.svg.innerHTML = defs + `<path d="M${this.w} 0 L${width} 0 L${width} ${this.h} L${this.w} ${this.h} Z" style="filter:url(#shadow);" />`
    this.setListeners()
    this.rand1 = this.randomStep
    this.rand2 = this.rand1 + this.randomStep
    this.offset = this.randomWidth
  }

  movie () {
    this.svg.style.width = '100%'
    this.d += this.step + 1
    this.createPath(this.w - this.minWidth - this.offset, this.w - this.minWidth - this.offset * 2)
    this.d < this.maxWidth ? requestAnimationFrame(this.movie.bind(this)) : this.setStatic(true)
  }

  reverse () {
    this.d -= this.step + 1
    this.createPath(this.w - this.minWidth - this.d, this.w - this.minWidth - this.d)
    this.d > 0 ? requestAnimationFrame(this.reverse.bind(this)) : this.setStatic(false)
  }

  createPath (p1, p6) {
    this.rand1 += 4
    this.rand2 += 5

    const [p2, p3, p4, p5] = [
      this.w - this.d + this.offset,
      this.rand1,
      this.w - this.d,
      this.rand2,
      this.w - this.minWidth - this.d
    ]

    this.svg.innerHTML = defs + `<path d="M${this.w} 0 L${p1} 0 C${p2} ${p3} ${p4} ${p5} ${p6} ${this.h} L${this.w} ${this.h} Z" />`
  }

  connectedCallback () {
    Object.assign(this, {
      w: window.innerWidth,
      h: window.innerHeight,
      offset: this.randomWidth
    })

    this.rand1 = this.randomStep
    this.rand2 = this.rand1 + this.randomStep

    this.svg.innerHTML = defs + `<path d="M${this.w} 0 L${this.w - this.minWidth} 0 L${this.w - this.minWidth} ${this.h} L${this.w} ${this.h} Z" />`

    this.setListeners()

    window.addEventListener('resize', function () {
      this.setStatic(status === 'wide')
    }.bind(this))
  }
}

customElements.define('svg-nav-panel', SvgNavigationPanel)
