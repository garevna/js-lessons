const { createPath, createElem } = require('../helpers').default
const { pageRegExpr, pageSymbols, pages } = require('../configs').default
const { pageStyles, iconStyles } = require('../styles').default

const methods = require('../helpers/page').default

class PageComponent extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, methods, {
      main: createElem('main', this),
      menu: document.getElementsByTagName('menu-component')[0],
      regExprs: pageRegExpr,
      symbols: pageSymbols
    })
  }

  async connectedCallback () {
    await this.init()

    const { pathname, search, hash } = location

    let [path, fileName, place] = [
      pathname.split('/js-lessons').join (''),
      search ? search.slice(1) : pathname === '/' ? 'start-page' : pathname.slice(1),
      hash.slice(1)
    ]

    this.setSource(fileName)

    createElem('style', this).textContent = pageStyles + iconStyles

    if (location.hash) {
      setTimeout(() => {
        const elem = document.getElementById(location.hash.slice(1))
        elem && elem.scrollIntoView()
      }, 1000)
    }
  }

  static get observedAttributes () {
    return ['src', 'lang']
  }

  async init () {
    Object.assign(this, {
      fragments: {},
      pageContent: '',
      pageContentList: []
    })

    this.lang = localStorage.getItem('lang') || this.getAttribute('lang')
    this.fileList = await (await fetch(createPath('files', null, this.lang))).json()
  }

  async attributeChangedCallback (attrName, oldVal, newVal) {
    if (oldVal === newVal) return

    if (attrName === 'src') {
      const src = this.testSource(newVal)
      this.setAttribute('src', src)
      await this.init()
      this.main.innerHTML = ''
      this.menu.setAttribute('options', '')
      this.getData(src)
    } else {
      this.lang = newVal
      await this.switchLang()
    }
  }

  testSource (sourceURL) {
    const fileName = sourceURL.split('/').slice(-1)[0].slice(0, -3)
    const src = !this.fileList.includes(fileName)
      ? pages.includes(fileName)
        ? `${createPath('lessons', '404')}.md`
        : createPath('404')
      : `${createPath('lessons', fileName)}.md`

    return src
  }

  setSource (fileName) {
    const src = !this.fileList.includes(fileName)
      ? pages.includes(fileName)
        ? `${createPath('lessons', '404')}.md`
        : createPath('404')
      : `${createPath('lessons', fileName)}.md`

    this.setAttribute('src', src)
  }

  async switchLang () {
    await this.init()
    const src = this.getAttribute('src')
    const fileName = location.search.slice(1)
    this.setSource(fileName)
  }

  getData (file) {
    fetch(file)
      .catch(error => console.warn(error))
      .then(response => response.text())
      .then(response => this.parsePageContent(response))
  }
}

customElements.define('page-element', PageComponent)
