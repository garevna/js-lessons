import './main-menu-sublevel-item'

const { createElem, storageState } = require('../helpers').default
const { getLessonTemplate } = require('../templates').default

class MainMenuItem extends HTMLElement {
  constructor () {
    super()

    addEventListener('storage', this.storageEventCallback.bind(this))
  }

  connectedCallback () {
    this.active = localStorage.getItem('active-lesson') === this.ref
    this.expanded = localStorage.getItem('expanded') === this.ref

    const { mainMenu, title, ref, items } = this
    if (!mainMenu) return console.warn('Error: mainMenu is not defined', this.mainMenu)

    this.innerHTML = getLessonTemplate(title, ref)

    Object.assign(this, {
      clickableArea: Object.assign(this.querySelector(`#${ref}`), {
        onclick: this.clickCallback.bind(this)
      }),
      subLevel: this.querySelector('ul.sub-level'),
      status: 'not-expanded',

      submenuOptions: items.map(item => {
        const { ref, title, translated } = item
        return Object.assign(document.createElement('main-menu-sublevel-item'), {
          mainMenu: this.mainMenu,
          lesson: this,
          ref,
          title,
          translated
        })
      })
    })

    window.addEventListener('storage', this.storageEventCallback.bind(this))

    this.active && this.expand()
  }

  storageEventCallback (event) {
    const { key, value } = event
    if (key === 'active-lesson') {
      this.ref === value
        ? !this.active && this.activate()
        : this.active && this.deactivate()
      return
    }
    if (key === 'expanded') {
      this.expanded && this.ref !== value && this.collapse()
    }
  }

  activate () {
    this.active = true
    this.stylize()
  }

  deactivate () {
    this.active = true
    this.stylize()
  }

  expand () {
    storageState('expanded', this.ref)

    this.expanded = true

    let index = 0
    for (const option of this.submenuOptions) {
      setTimeout(function () {
        this.subLevel.appendChild(option)
        this.stylizeSubitem.call(option)
      }.bind(this), 100 * index++)
    }
    this.stylize()
  }

  collapse () {
    if (!this.expanded || !this.subLevel.children.length) return
    this.expanded = false
    let index = 0
    for (const option of this.submenuOptions) {
      setTimeout(function () {
        this.subLevel.removeChild(option)
      }.bind(this), 100 * index++)
    }
    this.stylize()
  }

  stylize () {
    if (this.clickableArea) this.clickableArea.className = this.active
      ? 'lesson-menu-item--active' + (this.expanded ? '--expanded' : '')
      : 'lesson-menu-item' + (this.expanded ? '--expanded' : '')
  }

  stylizeSubitem () {
    const active = localStorage.getItem('active-topic')
    this.active = this.ref === active
  }

  clickCallback (event) {
    this.expanded = !this.expanded
    this.expanded ? this.expand() : this.collapse()

    const activeRef = location.search.slice(1)
  }

  closeCallback (event) {
    event.target.icon.className = 'icon'

    let index = 0

    for (const option of event.target.querySelectorAll('li.sub-level-item')) {
      setTimeout(function () {
        option.remove()
      }.bind(this), 40 * index++)
    }

    this.textElement.className = 'lesson-menu-item'
    event.target.active = false
  }
}

customElements.define('main-menu-item', MainMenuItem)
