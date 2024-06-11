const { menuStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { convertStringForAnchor } = require('../configs').default

class MenuComponent extends HTMLElement {
  constructor () {
    super()

    this.shadow = Object.assign(this.attachShadow({ mode: 'open' }), {
      innerHTML: `
        <nav id="navigation">
          <ul id="main-nav" class="dropdown"></ul>
        </nav>
        `
    })

    createElem('style', this.shadow).textContent = menuStyles
    this.container = this.shadow.querySelector('.dropdown')
  }

  connectedCallback () {
    this.menuContent = this.shadow.getElementById('main-nav')
  }

  static get observedAttributes() {
    return ['options']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    Object.assign(this.container, { innerHTML: '' })

    if (!newVal) return

    this.options = JSON.parse(this.getAttribute('options'))
    this.setAttribute('options', '')
    this.options.forEach((option, index) => {
      const li = Object.assign(createElem('li', this.container), {
        className: `option${option.level}`
      })
      li.style['animation-delay'] = index < 10 ? `0.${index}s` : `1.${index-9}s`

      const href = `#${convertStringForAnchor(option.text)}`

      const ref = Object.assign(createElem('a', li), {
        innerHTML: option.text,
        href
      })
    })
  }
}

customElements.define('menu-component', MenuComponent)

export default MenuComponent
