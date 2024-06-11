const { externalLinks } = require('../configs').default

const available = {
  page: 'page/',
  lessons: 'lessons/',
  help: 'help/',
  icons: 'icons/',
  images: 'images/',
  illustrations: 'images/lessons/',
  external: 'external/',
  externalIcons: 'icons/'
}

export const createPath = (function () {
  const origin = location.href.split('?')[0]

  return function (alias, fileName) {
    if (alias === 'quiz' || alias === 'samples') return externalLinks[alias](fileName)
    if (alias === 'test' || alias === 'external') return externalLinks[fileName]
    if (alias === 'help') return `${origin}/help/${fileName}.html`
    if (alias === 'page') return `${origin}?${fileName}`
    const folder = available[alias] || ''
    return `${origin}${folder}${fileName}`
  }
})()
