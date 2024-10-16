import './main-menu-item'
import './search-component'

const {
  createPath,
  createElem,
  getContentWorker
} = require('../helpers').default

const { mainMenuStyles } = require('../styles').default
const { mainMenuTemplate } = require('../templates').default

class MainMenuComponent extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    Object.assign(this, {
      worker: getContentWorker(),
      shadow: Object.assign(createElem('div', shadow), {
        className: 'main-menu-wrapper'
      }),
      view: document.getElementsByTagName('page-element')[0],
      menuOptions: [],
      state: 'close'
    })

    mainMenuStyles.then(css => createElem('style', shadow).textContent = css)

    this.addEventListener('sublevel-item-clicked', this.sublevelItemClickHandler.bind(this))

    window.addEventListener('popstate', function (event) {
      const page = location.search.slice(1)
      this.worker.postMessage({ route: 'lesson', param: page })
    }.bind(this))
  }

  getKeywords (keywords) {
    Object.assign(this, { keywords })
  }

  getRefs (data) {
    this.refs = data
      .flatMap(lesson => lesson.items.map(item => ({ [item.ref]: lesson.ref })))
      .reduce((res, item) => Object.assign(res, item), {})
  }

  getMainMenuData (data) {
    this.menuOptions.forEach(option => option.remove())
    this.menuOptions = []
    this.activeRef = localStorage.getItem('active-ref') || ''
    this.getRefs(data)

    const activeSubItemRef = location.search.slice(1) || ''
    const activeItemRef = activeSubItemRef ? this.refs[activeSubItemRef] : ''

    for (const lesson of data) {
      const { ref, title, items } = lesson
      const lessonItem = Object.assign(document.createElement('main-menu-item'), {
        mainMenu: this,
        ref,
        title,
        items
      })

      this.menuOptions.push(lessonItem)
    }

    for (const option of this.menuOptions) this.menu.appendChild(option)
  }

  lessonClickHandler (event) {
    // const { menuOption: { status, ref } } = event
    // if (status === 'expanded') return
    // for (const folder of this.menuOptions) folder.expanded && folder.collapse()
    // event.menuOption.expand()
    // localStorage.setItem('expanded', ref)
  }

  sublevelItemClickHandler (event) {
    event.stopImmediatePropagation()
    const { sublevelItem: { ref } } = event
    this.navigateTo(ref)
  }

  connectedCallback () {
    this.shadow.innerHTML += mainMenuTemplate

    const [svg, backShadow, donate, checkbox, menu, searchInput, homeButton] = [
      'svg-nav-panel',
      '#main-menu-shadow',
      '#top-donate',
      '#menuToggle > input[type="checkbox"]',
      '#menu',
      '#search-input',
      '#go-to-home'
    ].map(selector => this.shadow.querySelector(selector))

    Object.assign(this, {
      svg,
      backShadow,
      donate,
      checkbox,
      menu,
      searchInput,
      homeButton,
      pageMenu: document.getElementsByTagName('menu-component')[0]
    })

    this.worker.addEventListener('message', this.workerMessageHandler.bind(this))
    this.addEventListener('scroll', this.scrollHandler.bind(this))
    this.checkbox.onclick = this.checkboxClickHandler.bind(this)
    this.homeButton.onclick = this.homeButtonClickHandler.bind(this)

    this.addEventListener('lesson-clicked', this.lessonClickHandler)
  }

  removeOption (elem, index) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        this.menu.removeChild(elem)
        resolve(index)
      }.bind(this), index * 20)
    }.bind(this))
  }

  hide () {
    this.state = 'close'
    this.backShadow.style.display = 'none'
    this.menu.style['transition-delay'] = '0s'
    this.checkbox.checked = false

    const promises = this.menuOptions.map(function (option, index) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          this.menu.removeChild(option)
          resolve(index)
        }.bind(this), index * 20)
      }.bind(this))
    }.bind(this))

    Promise.all(promises)
      .then(function () {
        this.menu.style.opacity = '0'
        this.svg.dispatchEvent(new Event('close'))
        this.donate.style.right = '108px'
      }.bind(this))
  }

  show () {
    this.state = 'expand'
    this.backShadow.style.display = 'block'
    this.svg.dispatchEvent(new Event('expand'))
    this.donate.style.right = '387px'
    this.menu.style['transition-delay'] = '1s'
    this.menuOptions
      .forEach((elem, index) => setTimeout(function () { this.menu.appendChild(elem) }.bind(this), index * 20))
    this.menu.style.opacity = '1'
    this.checkbox.checked = true
    const activeLesson = this.menuOptions.find(option => option.active)
    if (activeLesson) {
      setTimeout(() => activeLesson.dispatchEvent(new Event('click')))
    }
  }

  scrollHandler (event) {
    Object.assign(this.donate.style, { display: event.offset <= 200 ? 'none' : 'block' })
  }

  checkboxClickHandler (event) {
    ;[this.pageMenu, this.donate]
      .forEach(elem => elem.dispatchEvent(new Event('main-menu-' + this.state)))

    this.state === 'close' ? this.show() : this.hide()
  }

  navigateTo (page = 'start-page') {
    this.checkbox.checked = !this.checkbox.checked
    this.checkbox.dispatchEvent(new Event('click'))
    history.pushState(null, null, `${location.pathname}?${page}`)
    this.worker.postMessage({ route: 'lesson', param: page })
  }

  homeButtonClickHandler (event) {
    event.stopImmediatePropagation()
    this.navigateTo()
  }

  workerMessageHandler (event) {
    const { route, response } = event.data
    if (route !== 'main-menu' && route !== 'keywords') return
    const method = route === 'main-menu' ? 'getMainMenuData' : 'getKeywords'
    this[method](response)
  }
}

customElements.define('main-menu-component', MainMenuComponent)
