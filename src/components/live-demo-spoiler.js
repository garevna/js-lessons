import SpoilerClass from './spoiler-class'

import templates from '../templates'

const { createElem } = require('../helpers').default

class LiveDemoSpoiler extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    createElem('style', this.shadow).textContent = `
      .live-demo-section {
        background: #222;
        border: solid 16px transparent;
        box-sizing: border-box;
        font-family: monospace;
        font-size: 14px;
        line-height: 1.4;
        margin-top: -4px;
        opacity: 0;
        transition:  all .4s ease-in-out;
      }
      #live-demo-header {
        cursor: pointer;
      }
      .live-demo-help {
        color: #09b;
        text-align: center;
      }
      .prompt-input, .prompt-output {
        padding-right: 4px;
        color: #aaa;
      }
      .prompt-input:before {
        content: '❯';
      }
      .prompt-output:before {
        content: '❮•';
      }
    `

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
}

customElements.define('live-demo-spoiler', LiveDemoSpoiler)
