const { spoilerClassStyles, rainbowStyles, iconStyles } = require('../styles').default
const { createElem } = require('../helpers').default

export default class SpoilerClass extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    createElem('style', this.shadow).textContent = rainbowStyles + spoilerClassStyles + iconStyles

    this.shadow.innerHTML += `
      <section id="component">
        <div class="wrap-collabsible">
          <input id="collapsible" class="toggle" type="checkbox">
          <label for="collapsible" class="lbl-toggle">
            <span id="header"></span>
          </label>
          <div class="collapsible-content"></div>
        </div>
      </section>
      `
    }
    connectedCallback () {
      Object.assign(this, {
        header: this.shadow.querySelector('#header'),
        script: this.shadow.querySelector('#scriptContent'),
        wrapper: this.shadow.querySelector('.collapsible-content')
      })
    }
}
