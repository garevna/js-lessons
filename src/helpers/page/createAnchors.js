import { createSoundButton } from './createSoundButton'

const { convertStringForAnchor, localizedLinks, lang } = require('../../configs').default
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
      // An address with a scheme stands as written — http, https, and the ones
      // a phone answers: mailto:, tel:, viber:, whatsapp:. Only http was
      // recognised before, so [Viber](viber://chat?number=…) was handed to
      // createPath, which read "viber:" as a folder alias and sent the reader
      // to a page that does not exist.
      //
      // Everything without a scheme is one of the aliases — page/, external/,
      // quiz/, images/ — and goes to createPath as before.
      const address = /^[a-z][a-z0-9+.-]*:/i.test(ref)
        ? ref
        : createPath(...ref.split('/'))

      // Send a reader to the page in the language they are reading, where the
      // site has one. The lessons hold the English address; which translations
      // exist is a question for the sites, asked once by tools/i18n-links.js
      // and answered here — Wikipedia titles its articles differently in every
      // language, and MDN has a Russian translation of some pages and not
      // others. This covers addresses written in a lesson and the ones behind
      // external/ alike, because it happens after both have been resolved.
      const translated = localizedLinks[address]
      const href = (translated && translated[lang()]) || address
      Object.assign(link, { href })
    }
    return res
  }, document.createElement('div'))

  rest && Object.assign(createElem('span', result), {
    innerHTML: this.parseIcons(this.formatText(rest))
  })

  return result
}
