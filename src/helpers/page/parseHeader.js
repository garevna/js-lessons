const { createElem } = require('../').default
const { convertStringForAnchor } = require('../../configs').default

export function parseHeader (line) {
  const headerLevel = line.match(/^[#]{1,6}/)

  if (!headerLevel) return { level: 0, text: line }

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

  const id = convertStringForAnchor(text)

  Object.assign(createElem('a', this.main), { name: id, id })

  this.pageContentList.push({
    level: headerLevel[0].length,
    text
  })

  return {
    level: headerLevel[0].length,
    text: line = line.split(headerLevel[0]).join('')
  }
}
