import SpoilerClass from './spoiler-class'

const { parseIcons, parseImage } = require('../helpers/page').default

const { createElem, createPath, getIconStyles } = require('../helpers').default

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

  /**
   * The pictures for the icons the spoiler turned out to hold.
   *
   * A spoiler keeps its content in a shadow root, and a shadow root does not
   * inherit the page's stylesheet — so an ![ico-20 warn] inside ^^^ … ^^^ was
   * a span twenty pixels wide with nothing in it. The page has the style; it
   * simply cannot reach in here.
   *
   * The names are read off the elements rather than out of the text, so this
   * sees exactly what was built, markers and aliases and all.
   */
  dressIcons () {
    const names = new Set()

    for (const element of this.wrapper.querySelectorAll('[class*="ico-"]')) {
      for (const name of element.classList) {
        if (!/^ico-\d+$/.test(name)) names.add(name)
      }
    }

    if (!names.size) return

    getIconStyles('page', [...names])
      .then((textContent) => Object.assign(createElem('style', this.shadow), { textContent }))
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
        this.dressIcons()
        break
      default:
        break
    }
  }
}

customElements.define('spoiler-component', SpoilerComponent)
