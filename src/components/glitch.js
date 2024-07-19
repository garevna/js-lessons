const { glitchLogoStyles } = require('../styles').default
const { createElem } = require('../helpers').default

class GlitchLogo extends HTMLElement {
  constructor () {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = glitchLogoStyles

    shadow.innerHTML += `
      <div class="logo-box">
        <span class="over">Client-side</span>
        <span class="glitch">JS</span>
        <span class="noise"></span>
      </div>
    `
  }
}

customElements.define('glitch-logo', GlitchLogo)

export default GlitchLogo
