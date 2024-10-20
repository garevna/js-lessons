const { createElem, getContentWorker, getIconStyles } = require('../helpers').default
const { pageStyles } = require('../styles').default

const lib = require('../helpers/page').default

const { parsePageContent, getIconList, ...methods } = lib

class PageComponent extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, methods, {
      parsePageContent,
      worker: getContentWorker(),
      main: createElem('main', this),
      menu: document.getElementsByTagName('menu-component')[0]
    })

    pageStyles.then(css => createElem('style', this).textContent = css)
  }

  async connectedCallback () {
    await this.init()

    const page = localStorage.getItem('active-topic') || location.search.slice(1) || 'start-page'

    const { pathname, search, hash } = location

    this.worker.addEventListener('message', this.messageCallback.bind(this))

    location.hash && this.scrollPage()
  }

  messageCallback (event) {
    const { route, response } = event.data

    if (route !== 'lesson') return

    getIconStyles('page', getIconList(response))
      .then(textContent => Object.assign(createElem('style', this), { textContent }))

    this.main.innerHTML = ''
    this.parsePageContent(response)
    this.scrollPage()
  }

  scrollPage () {
    const elem = document.getElementById(location.hash.slice(1))
    elem && setTimeout(() => elem.scrollIntoView(), 800)
  }

  async init () {
    Object.assign(this, {
      fragments: {},
      pageContent: '',
      pageContentList: []
    })
  }
}

customElements.define('page-element', PageComponent)
