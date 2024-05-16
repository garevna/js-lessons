// const github = 'https://garevna.github.io'
const { externalLinks } = require('../configs').default

const available = {
  lessons: 'lessons/',
  icons: 'icons/',
  images: 'images/',
  illustrations: 'images/lessons/',
  externalIcons: 'icons/'
}

export const createPath = (function () {
  const origin = location.href.split('?')[0]

  return function (alias, fileName) {
    if (alias === 'quiz' || alias === 'samples') return externalLinks[alias](fileName)
    if (alias === 'test') return externalLinks[fileName]
    const folder = available[alias] || ''
    return `${origin}${folder}${fileName}`
  }
})()
