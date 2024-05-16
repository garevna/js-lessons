import { Slide } from './Slide'

const { pictureSliderStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default

class PictureSlider extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    Object.assign(this, {
      pictures: [],
      currentIndex: 0,
      currentSlide: 0,
      container: createElem('figure', shadow)
    })

    createElem('style', shadow).textContent = pictureSliderStyles

    Object.assign(this, {
      btnClose: Object.assign(createElem('button', this.container), {
        id: 'close',
        className: 'close-button',
        onclick: function (event) { this.remove() }.bind(this)
      }),
      btnLeft: Object.assign(createElem('button', this.container), {
        id: 'left',
        onclick: function (event) { this.changePicture('left') }.bind(this)
      }),
      btnRight: Object.assign(createElem('button', this.container), {
        id: 'right',
        onclick: function (event) { this.changePicture('right') }.bind(this)
      })
    })
  }

  static get observedAttributes () {
    return ['pictures']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    const pictures = JSON.parse(this.getAttribute('pictures'))
      .map(path => path.trim().split('/').map(item => item.trim()))
      .map(arr => arr.length > 1 ? arr : ['lessons', arr[0]])
      .map(picture => createPath(...picture))

    Object.assign(this, {
      pictures,
      slides: pictures.slice(0, 2).map(picture => new Slide(picture, this.container))
    })

    this.slides[0].mcFromTo(100, 10)
    this.slides[1].init(100)
  }

  changePicture (direction) {
    const to = direction === 'left' ? 100 : -100
    const nextSlide = this.currentSlide === 0 ? 1 : 0

    const nextIndex = this.getNextIndex(direction)

    this.slides[nextSlide].setPicture(this.pictures[nextIndex])
    this.slides[nextSlide].init(-to)
    this.slides[this.currentSlide].mcFromTo(10, to, 0)
    this.slides[nextSlide].mcFromTo(-to, 10, 1)
    setTimeout(function () {
      this.currentSlide = nextSlide
      this.currentIndex = nextIndex
    }.bind(this), 1000)
  }

  getNextIndex (dir) {
    return dir === 'left'
      ? this.currentIndex === 0
        ? this.pictures.length - 1
        : this.currentIndex - 1
      : this.currentIndex === this.pictures.length - 1
        ? 0
        : this.currentIndex + 1
  }
}
customElements.define('picture-slider', PictureSlider)

export default PictureSlider
