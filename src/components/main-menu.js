const { createPath, createElem, search, getMainMenuData } = require('../helpers').default

const { lang } = require('../configs').default

const { mainMenuStyles } = require('../styles').default
const { mainMenuTemplate } = require('../templates').default

class MainMenuComponent extends HTMLElement {
  constructor () {
    super()

    this.lang = localStorage.getItem('lang') || 'eng'
    lang(this.lang)

    Object.assign(this, {
      shadow: this.attachShadow({ mode: 'closed' }),
      view: document.getElementsByTagName('page-element')[0],
      menuOptions: [],
      submenuOptions: [],
      state: 'close'
    })
  }

  connectedCallback () {
    this.shadow.innerHTML += mainMenuTemplate

    Object.assign(this, {
      view: document.getElementsByTagName('page-element')[0],
      checkbox: this.shadow.querySelector('#menuToggle > input[type="checkbox"]'),
      menu: this.shadow.querySelector('#menu'),
      searchInput: this.shadow.getElementById('search-input'),
      homeButton: this.shadow.querySelector('.go-to-home'),
      result: this.shadow.getElementById('search-result'),
      search: search.bind(this)
    })

    this.setStyles()

    this.checkbox.onclick = function (event) {
      this.state = this.state === 'close' ? 'expand' : 'close'
      this.menu.style['transition-delay'] = this.state === 'expand' ? '1s' : '0s'
      this.shadow.querySelector('svg-nav-panel').dispatchEvent(new Event(this.state))

      const activeLesson = this.menuOptions.find(option => option.active)
      console.dir(activeLesson)
      if (activeLesson) {
        setTimeout(() => activeLesson.dispatchEvent(new Event('click')))
      }
    }.bind(this)

    this.homeButton.onclick = function (event) {
      event.preventDefault()
      this.checkbox.checked = !this.checkbox.checked
      this.checkbox.dispatchEvent(new Event('click'))

      const state = [{ route: event.target.href }, 'home', event.target.href]

      window.history.pushState(...state)

      this.view.setAttribute('src', `${createPath('lessons', 'start-page.md' )}`)
    }.bind(this)

    this.getData().then(() => this.searchInput.oninput = this.search)
  }

  // search (event) {
  //   this.result.innerHTML = ''
  //   if (!event.target.value) {
  //     for (const item of this.menuOptions) this.show(item)
  //     for (const item of this.submenuOptions) this.show(item)
  //     return
  //   }
  //   let strings = this.keywords.getAll(event.target.value.toLowerCase())
  //   if (strings.length === 0) {
  //     result.innertext = 'Not found...'
  //     for (const item of this.menuOptions) this.hide(item)
  //     for (const item of this.submenuOptions) this.hide(item)
  //     return
  //   }
  //   const items = strings.map(item => JSON.parse(item))
  //   for (const option of this.menuOptions) {
  //     items.find(item => option.firstElementChild.id === item.lesson)
  //       ? this.show(option)
  //       : this.hide(option)
  //   }
  //   for (const option of this.submenuOptions) {
  //     const content = option.querySelector('a').textContent
  //     items.find(item => content === item.topic)
  //       ? this.show(option)
  //       : this.hide(option)
  //     }
  // }

  setStyles () {
    createElem('style', this.shadow).textContent = mainMenuStyles
  }

  // hide (elem) {
  //   elem.dispatchEvent(new Event('hide'))
  // }

  // show (elem) {
  //   elem.dispatchEvent(new Event('show'))
  // }

  // hideCallback (event) {
  //   event.target.style.display = 'none'
  // }

  // showCallback (event) {
  //   event.target.style.display = 'block'
  // }

  // setListeners (elem) {
  //   elem.addEventListener('show', this.showCallback)
  //   elem.addEventListener('hide', this.hideCallback)
  // }
}

Object.assign(MainMenuComponent.prototype, { getData: getMainMenuData })

customElements.define('main-menu-component', MainMenuComponent)

export default MainMenuComponent
