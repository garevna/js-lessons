const { menuStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default

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
  }

  connectedCallback () {
    this.menuContent = this.shadow.getElementById('main-nav')
  }

  static get observedAttributes() {
    return ['options']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    const container = Object.assign(this.shadow.querySelector('.dropdown'), {
      innerHTML: ''
    })

    if (!newVal) return

    this.options = JSON.parse(this.getAttribute('options'))
    this.setAttribute('options', '')
    this.options.forEach((option, index) => {
      const li = Object.assign(createElem('li', container), {
        className: `option${option.level}`
      })
      li.style['animation-delay'] = index < 10 ? `0.${index}s` : `1.${index-9}s`
      const ref = Object.assign(createElem('a', li), {
        innerHTML: option.text,
        href: `#${encodeURI(option.text)}`
      })
    })
  }
}

MenuComponent.prototype.template = `
<nav id="nav" class="main-nav">
  <li>
	  <ul class="dropdown"></ul>
  </li>
</nav>
`

customElements.define('menu-component', MenuComponent)

export default MenuComponent
