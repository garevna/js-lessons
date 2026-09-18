const { externalLinks } = require('../configs').default

const available = {
  page: 'page/',
  lessons: 'lessons/',
  help: 'help/',
  icons: 'icons/',
  images: 'images/',
  slogans: 'images/slogans/',
  sounds: 'sounds/',
  illustrations: 'images/lessons/',
  demo: 'lessons/js',
  external: 'external/',
  inside_the_page: '',
  externalIcons: 'icons/',
  files: 'files/',
  '404': 'page not found'
}

export const createPath = (function () {
  const origin = location.href.split('?')[0]

  return function (alias, fileName, ...rest) {
    const language = rest[0]
    const lang = language || localStorage.getItem('lang') || 'eng'
    switch (alias) {
      case 'files':
        return `${origin}${alias}/${language}.json`
      case '404':
        // Built per language like any other page now.
        return `${origin}lessons/${lang}/404.md`
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
      case 'slogans':
        // A slogan is one drawing lettered twice, so the lesson names the
        // drawing — slogans/funcs-call-girls.svg — and the copy is picked
        // here: -ua for a reader in Ukrainian, -en for everyone else.
        return `${origin}${available.slogans}${fileName.replace(/\.svg$/, '')}-${lang === 'ua' ? 'ua' : 'en'}.svg`
      default:
        const folder = available[alias] || ''
        // Everything past the alias is path, not a language: a nested folder
        // used to be swallowed as the file name and the file itself lost.
        return `${origin}${folder}${[fileName, ...rest].join('/')}`
    }
  }
})()
