const { createElem } = require('../').default
const { convertStringForAnchor } = require('../../configs').default

/**
 * ⟪…⟫ — the anchor the build worked out for this heading.
 *
 * It is the English one in all three languages, so the address in the bar
 * still points at the section after the reader switches language. Without it
 * the id came from whatever the heading said here, and the same section was
 * #super_v_lyteralakh_obъektov in Russian and #super_in_object_literals in
 * English.
 *
 * A page with no marker — anything static, or built before this — still gets
 * an id the old way, so nothing loses its anchors while the pages catch up.
 */
const ANCHOR = /⟪([^⟫]*)⟫/

export function parseHeader (line) {
  const headerLevel = line.match(/^[#]{1,6}/)

  if (!headerLevel) return { level: 0, text: line }

  const stamped = line.match(ANCHOR)
  if (stamped) line = line.replace(ANCHOR, '')

  let text = line.slice(headerLevel[0].length)

  const [icons, refs] = [
    text.match(/!\[.[^\]]+\]/g),
    text.match(/\[.[^(]+\]\(.[^\)]+\)/g)
  ]

  icons && icons.forEach(icon => { text = text.split(icon).join('') })

  refs && refs.forEach(ref => {
    const content = ref.split('](')[0].slice(1)
    text = content.split(']').slice(-1)[0].trim()
  })

  const id = stamped ? stamped[1] : convertStringForAnchor(text)

  Object.assign(createElem('a', this.main), { name: id, id })

  this.pageContentList.push({
    level: headerLevel[0].length,
    text,
    id
  })

  const set = new Set(this.pageContentList.map(item => JSON.stringify(item)))
  this.pageContentList = Array.from(set).map(item => JSON.parse(item))

  return {
    level: headerLevel[0].length,
    text: line = line.split(headerLevel[0]).join('')
  }
}
