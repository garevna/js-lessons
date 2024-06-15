import { createPath } from './createPath'
import { createElem } from './createElem'
import { createSubmenuItem } from './createSubmenuItem'
import { closeCallback } from './closeCallback'

const {
  lang,
  pages,
  defaults: {
    mainMenu: {
      activeLessonColor,
      activeSubmenuOptionColor,
      normalColor
    }
  }
} = require('../configs').default

const { getLessonTemplate } = require('../templates').default

export async function getMainMenuData () {
  const menuData = await (await fetch(createPath('', 'main-menu.json'))).json()
  this.keywords = await (await fetch(createPath('', 'keywords.json'))).json()

  const errors = Object.keys(this.keywords).filter(key => !pages.includes(key))

  location.protocol === 'http:' && console.warn('Keywords reference Error: there are no such pages:\n', errors)

  const referenceErrors = menuData
    .flatMap(chapter => chapter.items.filter(item => !pages.includes(item.ref)).map(item => ({ [item.ref]: chapter.ref })))
    .reduce((res, item) => Object.assign(res, item), {})

  location.protocol === 'http:' && console.warn('Main menu: invalid page references:\n', referenceErrors)

  this.menuData = menuData
    .map(chapter => Object.assign(chapter, {
      items: chapter.items.filter(item => pages.includes(item.ref))
    }))

  this.refs = this.menuData
    .flatMap(chapter => chapter.items.map(item => ({ [item.ref]: chapter.ref })))
    .reduce((res, item) => Object.assign(res, item), {})

  const activeSubItemRef = location.search.slice(1) || ''
  const activeItemRef = activeSubItemRef ? this.refs[activeSubItemRef] : ''

  for (const lesson of this.menuData) {
    const lessonItem = Object.assign(createElem('li', this.menu), {
      innerHTML: getLessonTemplate(lesson[this.lang], lesson.ref),
      id: lesson.ref,
      active: lesson.ref === activeItemRef
    })

    lessonItem.addEventListener('close', closeCallback)

    Object.assign(lessonItem, {
      subLevel: lessonItem.querySelector('ul.sub-level'),
      icon: lessonItem.querySelector('small'),
      textElement: lessonItem.querySelector('b'),
      submenuOptions: lesson.items.map(item => createSubmenuItem.call(this, item)),

      onclick: function (elems, event) {
        // if (this.active && event.target.className !== 'sub-level-item') return this.dispatchEvent(new Event('close'))
        const active = elems.find(elem => elem.active)
        if (active) active.dispatchEvent(new Event('close'))

        this.active = true
        this.icon.className = 'icon-active'
        this.textElement.style.color = activeLessonColor

        const activeRef = location.search.slice(1)

        let index = 0
        for (const option of this.submenuOptions) {
          setTimeout(function () {
            this.subLevel.appendChild(option)
            Object.assign(option, {
              className: 'sub-level-item' + (activeRef === option.ref ? ' sub-level-item--active' : '')
            })
          }.bind(this), 100 * index++)
        }
      }.bind(lessonItem, this.menuOptions)
    })

    this.menuOptions.push(lessonItem)
    if (lessonItem.ref === activeItemRef) lessonItem.dispatchEvent('click')
  }
}
