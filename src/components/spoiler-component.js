import SpoilerClass from './spoiler-class'

const { createElem, createPath } = require('../helpers').default

class SpoilerComponent extends SpoilerClass {
  constructor () {
    super()
  }

  connectedCallback () {
    Object.assign(this, {
      header: this.shadow.querySelector('#header'),
      wrapper: this.shadow.querySelector('.collapsible-content'),
    })
  }

  static get observedAttributes () {
    return ['type', 'header', 'ready']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    switch (attrName) {
      case 'header':
        Object.assign(this.header, { innerHTML: newVal })
        break
      case 'ready':
        (() => this.content.forEach(item => this.wrapper.appendChild(item)))()
        break
      default:
        break
    }
  }
}

customElements.define('spoiler-component', SpoilerComponent)

export default SpoilerComponent
