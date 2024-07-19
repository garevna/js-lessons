const { createElem, createPath } = require('../helpers').default

const { codeOutputStyles } = require('../styles').default

class CodeOutput extends HTMLElement {
  constructor () {
    super ()

    const shadow = this.attachShadow({ mode: 'open' })
    createElem('style', shadow).textContent = codeOutputStyles

    Object.assign(this, {
      button: createElem('button', shadow),
      section: createElem('section', shadow)
    })
  }

  connectedCallback () {
    Object.assign(this, {
      startHandler: function (event) {
        Object.assign(event.target, {
          innerText: 'Stop',
          onclick: this.stopHandler
        })
        this.section.stop = false
        eval(this.code)
      }.bind(this),

      stopHandler: function (event) {
        Object.assign(event.target, {
          innerText: 'Start',
          onclick: this.startHandler
        })
        Object.assign(this.section, { stop: true, innerHTML: '' })
      }.bind(this)
    })

    Object.assign(this.button, {
      innerText: 'Start',
      onclick: this.startHandler
    })
  }

  static get observedAttributes () {
    return ['script']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    fetch(`${createPath('demo', newVal)}`)
      .then(response => response.text())
      .then(response => {
        response = response.replace(/document.body/g, 'this.section')
        response = response.replace(/document.head/g, 'this.section')

        Object.assign(this, { code: response })
      })
    }
}

customElements.define('code-output', CodeOutput)

export default CodeOutput
