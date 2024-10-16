import SpoilerClass from './spoiler-class'

import templates from '../templates'

const { liveDemoSpoilerStyles } = require('../styles').default

const { createElem } = require('../helpers').default

class TabElement extends HTMLElement  {
  constructor () {
    super()

    this.innerHTML = '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
  }
}

customElements.define('tab-span', TabElement)

class VarElement extends HTMLElement  {
  constructor () {
    super()

    this.innerHTML = '<span style="color: #a5f">var&nbsp;</span>'
  }
}

customElements.define('var-span', VarElement)

class ConsoleElement extends HTMLElement  {
  constructor () {
    super()

    this.innerHTML = '<span style="color: #eee">console</span>'
  }
}

customElements.define('console-span', ConsoleElement)

class LiveDemoSpoiler extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    createElem('style', this.shadow).textContent = liveDemoSpoilerStyles

    this.shadow.innerHTML += `
      <div class="live-demo-help">▼</div>
      <img src="${location.origin + location.pathname}/images/console.png" width="100%" id="live-demo-header"/>
    `

    this.section = Object.assign(createElem('section', this.shadow), {
      className: 'live-demo-section'
    })
  }

  connectedCallback () {
    this.section.innerHTML = this.template
    const { height } = this.section.getBoundingClientRect()
    Object.assign(this, { height })
    this.section.innerHTML = ''

    this.helpPointer = this.shadow.querySelector('.live-demo-help')

    this.header = Object.assign(this.shadow.querySelector('#live-demo-header'), {
      onclick: function (event) {
        this.expanded = !this.expanded
        this.helpPointer.innerText = this.expanded ? '▲' : '▼'
        this.helpPointer.style.color = this.expanded ? '#f50' : '#09b'
        if (this.expanded) {
          this.section.innerHTML = this.template
          Object.assign(this.section.style, {
            height: this.height + 'px',
            opacity: 1
          })

          this.show()
        } else {
          this.section.innerHTML = ''
          Object.assign(this.section.style, {
            height: 0,
            opacity: 0
          })
        }
      }.bind(this)
    })

    this.expanded = false
  }

  static get observedAttributes () {
    return ['template']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    const name = this.getAttribute('template')
    if (name && templates[name]) {
      this.template = templates[name]
    }
  }

  show () {
    const lines = this.section.getElementsByTagName('p')
    let counter = 0

    for (let line of lines) {
      const words = line.getElementsByTagName('span')
      for (let word of words) {
        counter++
        setTimeout(() => Object.assign(word.style, {
          visibility: 'visible'
        }), 500 * counter)
      }
    }
  }

  parseTemplate (template) {
    const lines = template.split('\n')
  }
}

customElements.define('live-demo-spoiler', LiveDemoSpoiler)
