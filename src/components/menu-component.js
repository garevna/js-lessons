const { menuStyles } = require('../styles').default
const { createElem, createPath, getContentWorker } = require('../helpers').default
const { convertStringForAnchor } = require('../configs').default

class MenuComponent extends HTMLElement {
  constructor () {
    super()

    this.shadow = Object.assign(this.attachShadow({ mode: 'closed' }), {
      innerHTML: `
        <nav id="page-navigation-menu"></nav>
        <ul id="page-navigation-menu-container"></ul>
      `
    })

    this.addEventListener('goto-on-page', function (event) {
      const { header } = event
    })

    menuStyles.then(css => createElem('style', this.shadow).textContent = css)

    Object.assign(this, {
      worker: getContentWorker(),
      button: this.shadow.querySelector('#page-navigation-menu'),
      menuContent: this.shadow.querySelector('#page-navigation-menu-container'),
      options: []
    })

    this.addEventListener('main-menu-expand', function (event) {
      this.button.style.display = 'block'
    })
    this.addEventListener('main-menu-close', function (event) {
      this.button.style.display = 'none'
    })
  }

  connectedCallback () {
    this.worker.addEventListener('message', function (event) {
      const { route, response } = event.data
      if (route !== 'page-menu') return
      event.stopImmediatePropagation()
      this.options = response
      this.buildMenu()
    }.bind(this))

    this.icon = this.shadow.querySelector('#page-navigation-menu')
    this.hide()

    this.button.onclick = this.show.bind(this)

    window.addEventListener('mouseup', this.clickHandler.bind(this))
  }

  show () {
    Object.assign(this.menuContent.style, {
      height: 'max-content',
      padding: '24px 16px'
    })
    Array.from(this.menuContent.children).forEach((li, index) => setTimeout(() => Object.assign(li.style, {
      opacity: 1,
      transform: 'translate(0, 0)'
    }), 100 * index))
  }

  hide () {
    Array.from(this.menuContent.children).forEach((li, index) => setTimeout(() => Object.assign(li.style, {
      opacity: 0,
      transform: 'translate(0, 0)'
    }), 100 * index))
    Object.assign(this.menuContent.style, {
      height: '0px',
      padding: '0px'
    })
  }

  clickHandler (event) {
    if (event.target.tagName !== 'menu-component') {
      Array.from(this.menuContent.children)
        .forEach(li => Object.assign(li.style, { opacity: 0 }))
      this.hide()

      window.removeEventListener('mouseup', this.clickHandler)
    }
  }

  buildMenu () {
    Object.assign(this.menuContent, { innerHTML: '' })

    if (!this.options.length) return

    this.options.forEach((option, index, arr) => {
      const char = arr[index + 1] && arr[index + 1].level > option.level ? '▼' : '►'
      Object.assign(option, { char })
    })
    const maxLevel = Math.max(...this.options.map(option => option.level))
    const notFound = !!this.options.find(option => option.text.indexOf('404') !== -1)
    const visible = !!location.search && !notFound
    this.style.visibility = visible ? 'visible' : 'hidden'

    this.options.forEach((option, index) => {
      const li = createElem('li', this.menuContent)
      Object.assign(li.style, {
        paddingLeft: `${16 * (option.level - 1)}px`,
        opacity: 0
      })

      const href = `#${convertStringForAnchor(option.text)}`

      const ref = Object.assign(createElem('a', li), {
        innerHTML: option.char + ' ' + option.text,
        href
      })
    })
  }
}

customElements.define('menu-component', MenuComponent)

export default MenuComponent
