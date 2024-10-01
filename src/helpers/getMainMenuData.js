import { createPath } from './createPath'
import { createElem } from './createElem'
import { createSubmenuItem } from './createSubmenuItem'
import { closeCallback } from './closeCallback'
import { createSubmenuItemClass } from './createSubmenuItemClass'

const { pages } = require('../configs').default

const { getLessonTemplate } = require('../templates').default

export async function getMainMenuData (lang) {
  const urls = ['ua', 'eng']
    .map(lang => createPath('files', null, lang))

  urls.push(createPath('', 'main-menu.json'), createPath('', 'keywords.json'))

  const promises = urls.map(url => fetch(url))

  window[Symbol.for('content.worker')].postMessage({ route: 'lang', param: lang })

  const results = (await Promise.all(promises))
    .map(response => response.json())

  const [ua, eng, menuData, keywords] = await Promise.all(results)

  Object.assign(this, { keywords })

  const errors = Object.keys(this.keywords).filter(key => !pages.includes(key))

  location.protocol === 'http:' && console.warn('Keywords reference Error: there are no such pages:\n', errors)

  const referenceErrors = menuData
    .flatMap(chapter => chapter.items.filter(item => !pages.includes(item.ref)).map(item => ({ [item.ref]: chapter.ref })))
    .reduce((res, item) => Object.assign(res, item), {})

  location.protocol === 'http:' && console.warn('Main menu: invalid page references:\n', referenceErrors)

  this.menuData = menuData
    .map(lesson => Object.assign(lesson, {
      items: lesson.items.filter(item => pages.includes(item.ref))
    }))

  this.refs = this.menuData
    .flatMap(chapter => chapter.items.map(item => ({ [item.ref]: chapter.ref })))
    .reduce((res, item) => Object.assign(res, item), {})

  const activeSubItemRef = location.search.slice(1) || ''
  const activeItemRef = activeSubItemRef ? this.refs[activeSubItemRef] : ''

  console.log(this.menu)

  for (const lesson of this.menuData) {
    const lessonItem = Object.assign(createElem('li', this.menu), {
      innerHTML: getLessonTemplate(lesson[lang], lesson.ref),
      id: lesson.ref,
      active: lesson.ref === activeItemRef
    })

    lessonItem.addEventListener('close', closeCallback)

    Object.assign(lessonItem, {
      subLevel: lessonItem.querySelector('ul.sub-level'),
      icon: lessonItem.querySelector('small'),
      textElement: lessonItem.querySelector('b'),
      submenuOptions: lesson.items.map(item => createSubmenuItem.call(this, item, this.getAttribute('lang'), ua, eng)),

      onclick: function (elems, event) {
        const active = elems.find(elem => elem.active)
        if (active) active.dispatchEvent(new Event('close'))

        this.active = true
        this.icon.className = 'icon-active'
        this.textElement.className = 'lesson-menu-item--active'

        const activeRef = location.search.slice(1)

        let index = 0
        for (const option of this.submenuOptions) {
          setTimeout(function () {
            this.subLevel.appendChild(option)
            Object.assign(option, {
              className: createSubmenuItemClass(option.ref, ua, eng)
            })
          }.bind(this), 100 * index++)
        }
      }.bind(lessonItem, this.menuOptions)
    })

    this.menuOptions.push(lessonItem)
    if (lessonItem.ref && lessonItem.ref === activeItemRef) lessonItem.dispatchEvent(new Event('click'))
  }
}
