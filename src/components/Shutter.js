const { createElem } = require('../helpers').default
const { shutterStyles } = require('../styles').default

class Shutter extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.polygones = []
  }

  connectedCallback () {
    createElem('style', this.shadow).textContent = shutterStyles
    const main = createElem('main', this.shadow)
    this.createPolygones(main)
    this.polygones.forEach(elem => Object.assign(elem.style, { ['animation-name']: elem.movie }))
  }

  getSegmentHeight (totalHeight) {
    return totalHeight > 50
      ? Math.max( 50, Math.min(150, Math.random() * totalHeight))
      : totalHeight
  }

  getRandomColor () {
    const clr = [0, 1, 2].map(() => Math.round(Math.random() * 200))
    return `rgba(${clr[0]}, ${clr[1]}, ${clr[2]}, 0.8)`
  }

  createFigure (container, class_name) {
    return Object.assign(createElem('figure', container), { className: class_name || null })
  }

  createPolygones (container) {
    const num = Math.max(5, Math.round(Math.random() * 10))
    let totalHeight = container.offsetHeight

    do {
      const height = this.getSegmentHeight(totalHeight)
      const section = createElem('section', container)
      section.style.height = height + 'px'
      totalHeight -= height

      let width = Math.round(Math.max(0.3, Math.min(Math.random(), 0.7)) * section.offsetWidth)

      const mc = ['movie-left', 'movie-right']

      const elems = ['left-figure', 'right-figure']
        .map((className, index) => Object.assign(this.createFigure(section, className), { movie: mc[index] }))

      const ws = [width, section.offsetWidth - width]

      elems.forEach((elem, index) => Object.assign(elem.style, {
        ['animation-duration']: Math.max(0.5, Math.random()) + 's',
        width: ws[index] + 'px'
      }))

      this.polygones.push(...elems)
    } while (totalHeight > 0)
  }
}

customElements.define('shutter-element', Shutter)

export default Shutter
