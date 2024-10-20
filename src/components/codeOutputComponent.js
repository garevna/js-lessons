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

    this.button.className = 'start'

    Object.assign(this.section.style, {
      height: '0px',
      opacity: '0.4',
      padding: '0'
    })
  }

  connectedCallback () {
    Object.assign(this, {
      startHandler: function (event) {
        Object.assign(event.target, {
          innerText: '⛌',
          onclick: this.stopHandler
        })

        this.section.stop = false

        this.button.className = 'stop'

        Object.assign(this.section.style, {
          height: '320px',
          opacity: '1',
          padding: '16px'
        })

        eval(this.code)
      }.bind(this),

      stopHandler: function (event) {
        Object.assign(event.target, {
          innerText: '►',
          onclick: this.startHandler
        })

        this.button.className = 'start'

        Object.assign(this.section.style, {
          height: '0px',
          opacity: '0.4',
          padding: '0'
        })

        Object.assign(this.section, { stop: true, innerHTML: '' })
      }.bind(this)
    })

    Object.assign(this.button, {
      innerText: '►',
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
