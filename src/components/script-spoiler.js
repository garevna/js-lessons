import SpoilerClass from './spoiler-class'

const { rainbowStyles } = require('../styles').default
const { createElem } = require('../helpers').default

class ScriptSpoiler extends SpoilerClass {
  constructor() {
    super()
    createElem('style', this.shadow).textContent = rainbowStyles
  }

  connectedCallback () {
    Object.assign(this, {
      header: this.shadow.querySelector('#header'),
      wrapper: this.shadow.querySelector('.collapsible-content')
    })
  }

  static get observedAttributes () {
    return ['header', 'content']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    attrName === 'content'
      ? this.wrapper.appendChild ( this.content )
      : attrName === 'header' || !newVal
        ? this.header.innerText = this.getAttribute('header')
        : null
    }
}

customElements.define('script-spoiler', ScriptSpoiler)

export default ScriptSpoiler
