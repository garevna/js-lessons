const { createPath, createElem } = require('../helpers').default
const { pageRegExpr, pageSymbols } = require('../configs').default
const { pageStyles, iconStyles } = require('../styles').default

const methods = require('../helpers/page').default

class PageComponent extends HTMLElement {
  constructor () {
    super()

    this.init()

    Object.assign(this, methods, {
      main: createElem('main', this),
      menu: document.getElementsByTagName('menu-component')[0],
      regExprs: pageRegExpr,
      symbols: pageSymbols
    })
  }

  connectedCallback () {
    const { pathname, search, hash } = location
    const [path, fileName, place] = [
      pathname.split('/js-lessons').join (''),
      search ? search.slice(1) : path === '/' ? 'start-page' : location.pathname.slice(1),
      hash.slice(1)
    ]

    const src = `${createPath('lessons', fileName)}.md`
    this.setAttribute('src', src)

    createElem('style', this).textContent = pageStyles + iconStyles
  }

  static get observedAttributes () {
    return ['src']
  }

  init () {
    Object.assign(this, {
      fragments: {},
      pageContent: '',
      pageContentList: []
    })
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    this.init()

    this.main.innerHTML = ''
    this.menu.setAttribute('options', '')
    this.getData(newVal)
  }

  getData (file) {
    fetch(file)
      .then(response => response.text())
      .then(response => this.parsePageContent(response))
  }
}

customElements.define('page-element', PageComponent)
