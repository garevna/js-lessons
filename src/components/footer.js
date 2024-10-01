const { footerStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { footerTemplate } = require('../templates').default

class Footer extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = footerStyles

    shadow.innerHTML += footerTemplate
  }
}

customElements.define('footer-component', Footer)
