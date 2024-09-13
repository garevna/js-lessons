import SpoilerClass from './spoiler-class'

const { parseIcons, parseImage } = require('../helpers/page').default

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
        const [image, icon] = [parseImage(newVal), parseIcons(newVal)]

        image && Object.assign(image, { className: 'spoiler-label' })

        Object.assign(this.header, { innerHTML: image ? image.outerHTML : icon ? icon : newVal })
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
