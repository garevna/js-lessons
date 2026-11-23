import './main-menu-item'
import './search-component'
import './author-widget'

const { lang } = require('../configs').default

/** mdi-sitemap-outline, the same mark the lesson map wears. */
const MAP_ICON = 'M9 2V8H7V10H11V8H9V4H15V8H13V10H17V8H15V2H9M2 14V20H8V14H6V12H4V14H2M4 16H6V18H4V16M9 14V20H15V14H13V12H11V14H9M11 16H13V18H11V16M16 14V20H22V14H20V12H18V14H16M18 16H20V18H18V16Z'
import { createPath } from './createPath'
import { createElem } from './createElem'
import { getContentWorker } from './getContentWorker'

import { mainMenuStyles } from './mainMenuStyles'
import { mainMenuTemplate } from './mainMenuTemplate'

import './svg-navigation-panel'

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

    createElem('style', shadow).textContent = mainMenuStyles

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

    const [svg, backShadow, author, checkbox, menu, searchInput, homeButton] = [
      'svg-nav-panel',
      '#main-menu-shadow',
      '#top-author',
      '#menuToggle > input[type="checkbox"]',
      '#menu',
      '#search-input',
      '#go-to-home'
    ].map(selector => this.shadow.querySelector(selector))

    Object.assign(this, {
      svg,
      backShadow,
      author,
      checkbox,
      menu,
      searchInput,
      homeButton,
      pageMenu: document.getElementsByTagName('menu-component')[0]
    })

    // The course map, from the menu. The element itself hangs off the body
    // (start.js), because the map is wanted on the start page too, where
    // there is no lesson to hang it on.
    const mapLink = this.shadow.querySelector('#course-map-link')
    if (mapLink) {
      const words = { ru: 'Карта курса', ua: 'Карта курсу', eng: 'The course map' }
      mapLink.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="${MAP_ICON}"/>
        </svg>
        <span>${words[lang()] || words.eng}</span>
      `
      mapLink.onclick = () => {
        this.checkbox.checked && this.checkbox.dispatchEvent(new Event('click'))
        const map = document.querySelector('course-map')
        map && map.open()
      }
    }

    this.worker.addEventListener('message', this.workerMessageHandler.bind(this))
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
        this.author.style.right = '108px'
      }.bind(this))
  }

  show () {
    this.state = 'expand'
    this.backShadow.style.display = 'block'
    this.svg.dispatchEvent(new Event('expand'))
    this.author.style.right = '388px'
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

  // There was a scrollHandler here that hid the donate button until the page
  // had been scrolled 200px. Sensible for asking money: let them read first.
  // The button is not only about money now - it is also the way to write to
  // the author - and a reader who has a question about the first screen
  // should not have to scroll to find out that asking is possible. So it
  // stays visible, and the handler is gone with the hiding it did.

  checkboxClickHandler (event) {
    ;[this.pageMenu, this.author]
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
