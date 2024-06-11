const { createPath, createElem } = require('../helpers').default

const { mainMenuStyles } = require('../styles').default
const { mainMenuTemplate, getLessonTemplate } = require('../templates').default

class MainMenuComponent extends HTMLElement {
  constructor () {
    super()

    this.lang = localStorage.getItem('lang') || 'eng'

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
      result: this.shadow.getElementById('search-result')
    })

    this.setStyles()

    this.checkbox.onclick = function (event) {
      this.state = this.state === 'close' ? 'expand' : 'close'
      this.menu.style['transition-delay'] = this.state === 'expand' ? '1s' : '0s'
      this.shadow.querySelector('svg-nav-panel').dispatchEvent(new Event(this.state))
    }.bind(this)

    this.homeButton.onclick = function (event) {
      event.preventDefault()
      this.checkbox.checked = !this.checkbox.checked
      this.checkbox.dispatchEvent(new Event('click'))

      const state = [{ route: event.target.href }, 'home', event.target.href]

      window.history.pushState(...state)

      this.view.setAttribute('src', `${createPath('lessons', 'start-page.md' )}`)
    }.bind(this)

    this.getData().then(() => this.searchInput.oninput = this.search.bind(this))
  }

  search (event) {
    this.result.innerHTML = ''
    if (!event.target.value) {
      for (const item of this.menuOptions) this.show(item)
      for (const item of this.submenuOptions) this.show(item)
      return
    }
    let strings = this.keywords.getAll(event.target.value.toLowerCase())
    if (strings.length === 0) {
      result.innertext = 'Not found...'
      for (const item of this.menuOptions) this.hide(item)
      for (const item of this.submenuOptions) this.hide(item)
      return
    }
    const items = strings.map(item => JSON.parse(item))
    for (const option of this.menuOptions) {
      items.find(item => option.firstElementChild.id === item.lesson)
        ? this.show(option)
        : this.hide(option)
    }
    for (const option of this.submenuOptions) {
      const content = option.querySelector('a').textContent
      items.find(item => content === item.topic)
        ? this.show(option)
        : this.hide(option)
      }
  }

  setStyles () {
    createElem('style', this.shadow).textContent = mainMenuStyles
  }

  hide (elem) {
    elem.dispatchEvent(new Event('hide'))
  }
  show (elem) {
    elem.dispatchEvent(new Event('show'))
  }
  hideCallback (event) {
    event.target.style.display = 'none'
  }
  showCallback ( event ) {
    event.target.style.display = 'block'
  }
  setListeners ( elem ) {
    elem.addEventListener('show', this.showCallback)
    elem.addEventListener('hide', this.hideCallback)
  }

  async getData () {
    this.menuData = await (await fetch(createPath('', 'main-menu.json'))).json()
    const keywords = await (await fetch(createPath('', 'keywords.json'))).json()
    console.log(keywords)

    this.menuData
    this.keywords = new FormData

    for (const lesson of this.menuData) {
      const lessonItem = Object.assign(createElem('li', this.menu), {
      innerHTML: getLessonTemplate(lesson.id)
    })

    Object.assign(lessonItem, { subLevel: lessonItem.querySelector('ul.sub-level') })

    this.menuOptions.push(lessonItem)
      this.setListeners(lessonItem)
      let index = 0
      for (const item of lesson.items) {
        const elem = createElem('li', lessonItem.subLevel)
        this.submenuOptions.push(elem)
        this.setListeners(elem)
        elem.style['animation-delay'] = index++ < 10 ? `0.${index}s` : `1.${index - 9}s`
        const anchor = Object.assign(createElem('a', elem), {
          href: item.ref,
          textContent: item.title,
          fileName: item.ref,
          onclick: function ( event ) {
            event.preventDefault()
            this.checkbox.checked = !this.checkbox.checked
            this.checkbox.dispatchEvent(new Event('click'))
            const ref = location.host === 'js-lessons.glitch.me' ? event.target.href : `?${event.target.fileName}`
            window.history.pushState({ route: ref}, event.target.innerText, ref)

            const shutter = createElem('shutter-element', document.body)
            shutter.style = `position: absolute; top: 0; left: 0;`
            setTimeout(() => shutter.remove(), 1000)
            this.view.setAttribute('src', `${createPath('lessons', event.target.fileName + '.md')}`)
          }.bind(this)
        })

        for (const keyword of item.keywords) {
          this.keywords.append(keyword, JSON.stringify({
            lesson: lesson.id,
            topic: item.title,
            url: item.ref
          }))
        }
      }
    }
  }
}

customElements.define('main-menu-component', MainMenuComponent)

export default MainMenuComponent
