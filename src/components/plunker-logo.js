const { plunkerLogoStyles } = require('../styles').default
const { createElem } = require('../helpers').default

class PlunkerLogo extends HTMLElement {
  constructor () {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = plunkerLogoStyles
    const container = shadow.appendChild(document.createElement('div'))
    container.className = 'plunker-logo'
    Object.assign(container, {
      // className: 'plunker-logo',
      innerHTML: `
      <div class="plunker-logo--background"></div>
      <div class="plunker-logo--right"></div>
      <div class="plunker-logo--middle"></div>
      <div class="plunker-logo--left"></div>
      `
    })
  }
}

customElements.define('plunker-logo', PlunkerLogo)
