import { storageState } from './storageState'
import { getContentWorker } from './getContentWorker'
import { createElem } from './createElem'

class MainMenuSublevelItem extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, {
      worker: getContentWorker(),
      active: this.ref === location.search.slice(1)
    })

    addEventListener('storage', function (event) {
      const { key, value } = event
      key === 'active-topic' && this.ref !==  value && this.active && this.deactivate()
    }.bind(this))
  }

  getClassName () {
    return 'sub-level-item' + (this.active ? '--active' : '') + (this.translated ? ' translated' : '')
  }

  activate () {
    this.active = true
    this.className = this.getClassName()
  }

  deactivate () {
    this.active = false
    this.className = this.getClassName()
  }

  switchActive () {
    const currentTopicRef = localStorage.getItem('active-topic')
    this.active = currentTopicRef === this.ref
    this.className = this.getClassName()
  }

  connectedCallback () {
    this.switchActive()
    const { mainMenu, lesson, ref, title: innerText, translated } = this

    Object.assign(this, {
      innerText,
      className: this.getClassName(),
      ref,
      translated,
      onclick: this.clickHandler.bind(this)
    })
  }

  clickHandler (event) {
    storageState('active-topic', this.ref)
    storageState('active-lesson', this.lesson.ref)

    this.mainMenu.dispatchEvent(Object.assign(new Event('sublevel-item-clicked'), {
      sublevelItem: this
    }))
  }
}

customElements.define('main-menu-sublevel-item', MainMenuSublevelItem)
