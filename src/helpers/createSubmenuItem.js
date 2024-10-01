import { createElem } from './createElem'
import { createPath } from './createPath'
import { createSubmenuItemClass } from './createSubmenuItemClass'

export function createSubmenuItem (data) {
  const activeSubItem = location.search.slice(1) || ''

  const elem = Object.assign(document.createElement('li'), {
    innerText: data.title,
    className: createSubmenuItemClass(data),
    ref: data.ref,
    onclick: function (event) {
      this.checkbox.checked = !this.checkbox.checked
      this.checkbox.dispatchEvent(new Event('click'))

      const ref = location.host !== 'garevna.github.io' ? event.target.ref : `?${event.target.ref}`
      window.history.pushState({ route: ref}, event.target.innerText, ref)

      // const shutter = createElem('shutter-element', document.body)
      // shutter.style = `position: absolute; top: 0; left: 0;`
      // setTimeout(() => shutter.remove(), 1000)
      // this.view.setAttribute('src', `${createPath('lessons', event.target.ref + '.md')}`)
    }.bind(this)
  })

  return elem
}
