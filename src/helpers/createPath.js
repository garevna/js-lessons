const { externalLinks } = require('../configs').default

const available = {
  page: 'page/',
  lessons: 'lessons/',
  help: 'help/',
  icons: 'icons/',
  images: 'images/',
  sounds: 'sounds/',
  illustrations: 'images/lessons/',
  demo: 'lessons/js',
  external: 'external/',
  externalIcons: 'icons/',
  files: 'files/',
  '404': 'page not found'
}

export const createPath = (function () {
  const origin = location.href.split('?')[0]

  return function (alias, fileName, language) {
    const lang = language || localStorage.getItem('lang') || 'eng'
    switch (alias) {
      case 'files':
        return `${origin}${alias}/${language}.json`
      case '404':
        return `${origin}lessons/404.md`
      case 'quiz':
      case 'samples':
        return externalLinks[alias](fileName)
      case 'test':
      case 'external':
        return externalLinks[fileName]
      case 'help':
        return `${origin}help/${fileName}.html`
      case 'page':
        return `${origin}?${fileName.replace('.md', '')}`
      case 'lessons':
        return `${origin}lessons/${lang}/${fileName}`
      case 'demo':
        return `${origin}lessons/js/${fileName}`
      default:
        const folder = available[alias] || ''
        return `${origin}${folder}${fileName}`
    }
  }
})()
