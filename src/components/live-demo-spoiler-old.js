import SpoilerClass from './spoiler-class'

import templates from '../templates'

const { createElem } = require('../helpers').default

class LiveDemoSpoiler extends SpoilerClass {
  constructor() {
    super()

    createElem('style', this.shadow).textContent = `
      .live-demo-section {
        background: #222;
        border: solid 36px transparent;
        box-sizing: border-box;
        font-family: monospace;
        font-size: 14px;
        line-height: 1.4;
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

    Object.assign(this, {
      header: this.shadow.querySelector('#header'),
      wrapper: this.shadow.querySelector('.collapsible-content')
    })

    this.section = Object.assign(createElem('section', this.wrapper), {
      className: 'live-demo-section',
      innerHTML: `<img src="${location.origin + location.pathname}/images/console.png" width="100%"/>`
    })
  }

  connectedCallback () {
    //
  }

  static get observedAttributes () {
    return ['header', 'template']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    if (attrName === 'header') {
      // this.header.innerText = this.getAttribute('header')
    } else {
      this.section.innerHTML = `<img src="${location.origin + location.pathname}/images/console.png" width="100%"/>`
      const name = this.getAttribute('template')
      if (name && templates[name]) {
        this.section.innerHTML += templates[name]
      }
      this.show()
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
