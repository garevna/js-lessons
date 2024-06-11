const { funnySloganStyles } = require('../styles').default
const { createElem } = require('../helpers').default

const colors = ['#f50f', '#090', '#09b', '#fa0']

function getColor () {
  return colors[getPositive(colors.length - 1)]
}

function getPositive (maxVal, minVal = 0) {
  return Math.max(minVal, Math.round(Math.random() * maxVal))
}

function getPositiveFloat (maxVal, minVal = 0) {
  return Math.max(minVal, Math.random() * maxVal)
}

function getSigned (maxVal, minVal) {
  return (Math.random() > 0.5 ? -1 : 1) * getPositive(maxVal, minVal)
}

function generateCharStyle () {
  const delay = getPositiveFloat(20, .5)
  return `
    font-size: ${getPositive(32, 20)}px;
    display: inline-block;
    transform: rotate(${getSigned(5)}deg);
    text-shadow: 0px 0px 4px #0009;
    animation: shrink-jump 0.8s ${delay}s ease-in-out;
  `
}

function generateWordStyle () {
  return `
    display: inline-block;
    margin-top: ${getSigned(24)}px;
    margin-left: 16px;
    color: ${getColor()};
    transform: rotate(${getSigned(10)}deg);
  `
}

function generateContainerTransform () {
  return `rotate(${getSigned(8)}deg)`
}

class FunnySlogan extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', this.shadow).textContent = funnySloganStyles
  }

  createInnerText (text) {
    const words = text.split(' ')

    const figure = Object.assign(createElem('figure', this.shadow), {
      className: 'slogan-container',
      style: `transform: ${generateContainerTransform()}`
    })

    words.forEach((word, index) => {
      const elem = Object.assign(createElem('span', figure), {
        id: `word-${index}`,
        style: generateWordStyle()
      })
      const letters = word.split('')
      letters
        .forEach((letter, num) => Object.assign(createElem('span', elem), {
          style: generateCharStyle(),
          innerText: letter
        }))
    })
  }

  connectedCallback () {
    this.text = this.getAttribute('text')
    this.createInnerText(this.text)
  }
}

customElements.define('funny-slogan', FunnySlogan)
//
// export default FunnySlogan
