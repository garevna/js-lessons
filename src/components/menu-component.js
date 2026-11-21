const { menuStyles } = require('../styles').default
const { createElem, createPath, getContentWorker } = require('../helpers').default
const { convertStringForAnchor, lang } = require('../configs').default

/** mdi-sitemap-outline, the same mark the map window wears. */
const MAP_ICON = 'M9 2V8H7V10H11V8H9V4H15V8H13V10H17V8H15V2H9M2 14V20H8V14H6V12H4V14H2M4 16H6V18H4V16M9 14V20H15V14H13V12H11V14H9M11 16H13V18H11V16M16 14V20H22V14H20V12H18V14H16M18 16H20V18H18V16Z'

/**
 * "Карта", not "ментальная схема": the word is a metaphor the reader
 * already owns, and the panel is narrow.
 */
const MAP_LABEL = {
  ru: 'Карта урока',
  ua: 'Карта уроку',
  eng: 'Lesson map'
}

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

    const { left } = this.button.getBoundingClientRect()
    Object.assign(this.menuContent.style, {
      left: (left - 24) + 'px'
    })
  }

  show () {
    const { left } = this.button.getBoundingClientRect()
    Object.assign(this.menuContent.style, {
      left: (left - 24) + 'px',
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

    // The map, at the head of the contents.
    //
    // A reader finding their way around a lesson has two ways to do it: the
    // list below, which is the order the lesson is written in, and the
    // picture, which is the shape it has. They are the same errand, so they
    // open from the same place; a second navigation button in another
    // corner of the screen would only split the question in two.
    const first = createElem('li', this.menuContent)
    first.className = 'lesson-map'

    // Only where there is a map. It is written by hand, one file per lesson,
    // and most lessons do not have one yet; a line that opens an apology is
    // worse than no line. Put in first and taken out if the file is not
    // there, because the contents are built before anything can be fetched
    // and this panel is shut at the time anyway.
    const owner = document.querySelector('page-element')
    const map = owner && owner.map
    map && map.exists
      ? map.exists().then(yes => { if (!yes) first.remove() })
      : first.remove()

    // No href: this goes nowhere, it opens something. A "#" would put a
    // stray hash in the address bar and a javascript: URL is the kind of
    // thing a content policy refuses.
    Object.assign(createElem('a', first), {
      innerHTML: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${MAP_ICON}"/></svg><span>${MAP_LABEL[lang()] || MAP_LABEL.eng}</span>`,
      onclick: event => {
        event.preventDefault()
        this.hide()
        const page = document.querySelector('page-element')
        page && page.map && page.map.open()
      }
    })

    this.options.forEach((option, index) => {
      const li = createElem('li', this.menuContent)
      Object.assign(li.style, {
        paddingLeft: `${16 * (option.level - 1)}px`,
        opacity: 0
      })

      // The id the heading actually carries. The build makes it from the
      // English wording, so it is the same in all three languages and the
      // address survives switching. A page without one — anything static —
      // still falls back to transliterating what the heading says here.
      const href = `#${option.id || convertStringForAnchor(option.text)}`

      const ref = Object.assign(createElem('a', li), {
        innerHTML: option.char + ' ' + option.text,
        href
      })
    })
  }
}

customElements.define('menu-component', MenuComponent)

export default MenuComponent
