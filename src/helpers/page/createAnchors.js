import { createSoundButton } from './createSoundButton'

const { convertStringForAnchor } = require('../../configs').default
const { createPath, createElem } = require('../').default

export function createAnchors (line, anchors) {
  let [text, rest] = ['', line]

  if (line.includes('](sounds/')) return createSoundButton(line)

  const result = anchors.reduce((res, anchor) => {
    ;[text, rest] = rest.split(anchor)

    text && Object.assign(createElem('span', res), {
      innerHTML: this.parseIcons(this.formatText(text))
    })

    const [refText, ref] = anchor.slice(1, -1).split('](')

    const link = Object.assign(createElem('a', res), {
      target: '_blank',
      innerHTML: this.parseIcons(this.formatText(refText)),
      className: 'visible-anchor'
    })

    if (ref.split('/')[0] === 'page') {
      const [fileName, hash] = ref.split('/')[1].split('#')
      const href = createPath('page', fileName) + (hash ? `#${convertStringForAnchor(hash)}` : '')
      Object.assign(link, {
        style: 'text-decoration: none; color: #555;',
        page: document.querySelector('page-element'),
        className: 'page-link',
        href
      })
    } else {
      const href = !ref.indexOf('https://')
        ? ref.slice(0, -1)
        : createPath(...ref.split('/'))
      Object.assign(link, { href })
    }
    return res
  }, document.createElement('div'))

  rest && Object.assign(createElem('span', result), {
    innerHTML: this.parseIcons(this.formatText(rest))
  })

  return result
}
