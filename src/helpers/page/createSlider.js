const { createElem } = require('../createElem')

export function createSlider (fragment) {
  const sliderStart = Object.assign(createElem('button', this.main), {
    className: 'slider-button',
    onclick: function (event) {
      createElem('picture-slider', this.main)
        .setAttribute('pictures', JSON.stringify(fragment.slice(3, -1).split(',')))
    }.bind(this)
  })
}
