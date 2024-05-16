const { createElem } = require('../createElem')

export function createCodeComponent (fragment) {
  const lang = fragment.slice(4, fragment.search(String.fromCharCode(10)))

  const snippet = Object.assign(createElem('code-snippet', this.main), {
    textContent: fragment.slice(4 + lang.length, fragment.length - 4)
  })

  snippet.setAttribute('header', lang)
  snippet.setAttribute('lang', lang)
}
