const { createPath, createElem, search, getMainMenuData } = require('../helpers').default

const { mainMenuStyles } = require('../styles').default
const { mainMenuTemplate } = require('../templates').default

class MainMenuComponent extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, {
      shadow: this.attachShadow({ mode: 'closed' }),
      view: document.getElementsByTagName('page-element')[0],
      menuOptions: [],
      submenuOptions: [],
      state: 'close'
    })
  }

  switchLang (newVal) {
    this.menuOptions.forEach((option, index) => {
      option.textElement.innerText = this.menuData[index][newVal]
      option.submenuOptions
        .forEach((item, num) => Object.assign(item, {
          innerText: this.menuData[index].items[num][newVal]
        }))
    })
  }

  static get observedAttributes () {
    return ['lang']
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    newValue && this.switchLang(newValue)
  }

  connectedCallback () {
    this.shadow.innerHTML += mainMenuTemplate

    Object.assign(this, {
      lang: localStorage.getItem('lang') || this.getAttribute('lang'),
      view: document.getElementsByTagName('page-element')[0],
      donate: this.shadow.querySelector('#top-donate'),
      checkbox: this.shadow.querySelector('#menuToggle > input[type="checkbox"]'),
      menu: this.shadow.querySelector('#menu'),
      searchInput: this.shadow.getElementById('search-input'),
      homeButton: this.shadow.querySelector('.go-to-home'),
      result: this.shadow.getElementById('search-result'),
      search: search.bind(this)
    })

    this.setStyles()

    this.switchLang(this.lang)

    this.addEventListener('scroll', function (event) {
      Object.assign(this.donate.style, { display: event.offset <= 200 ? 'none' : 'block' })
    }.bind(this))

    this.checkbox.onclick = function (event) {
      this.state = this.state === 'close' ? 'expand' : 'close'
      this.shadow.querySelector('#main-menu-shadow').style.display = this.state === 'expand' ? 'block' : 'none'
      this.menu.style['transition-delay'] = this.state === 'expand' ? '1s' : '0s'
      this.shadow.querySelector('svg-nav-panel').dispatchEvent(new Event(this.state))
      this.donate.style.right = this.state === 'expand' ? '348px' : '108px'

      const activeLesson = this.menuOptions.find(option => option.active)
      if (activeLesson) {
        setTimeout(() => activeLesson.dispatchEvent(new Event('click')))
      }
    }.bind(this)

    this.homeButton.onclick = function (event) {
      event.preventDefault()
      this.checkbox.checked = !this.checkbox.checked
      this.checkbox.dispatchEvent(new Event('click'))

      // const state = [{ route: event.target.href }, 'home', event.target.href]
      //
      // window.history.pushState(...state)

      this.view.setAttribute('src', `${createPath('lessons', 'start-page.md' )}`)
    }.bind(this)

    this.getData(this.getAttribute('lang')).then(() => this.searchInput.oninput = this.search)
  }

  setStyles () {
    createElem('style', this.shadow).textContent = mainMenuStyles
  }
}

Object.assign(MainMenuComponent.prototype, { getData: getMainMenuData })

customElements.define('main-menu-component', MainMenuComponent)
