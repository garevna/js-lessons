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
  inside_the_page: '',
  externalIcons: 'icons/',
  files: 'files/',
  '404': 'page not found'
}

export const createPath = (function () {
  const origin = location.href.split('?')[0]

  return function (alias, fileName, language) {
    const lang = language || localStorage.getItem('lang') || 'eng'
    switch (alias) {
      case 'help':
        return `${origin}help/${fileName}.html`
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
