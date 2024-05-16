const { createElem } = require('../createElem')

export function createScriptSpoiler (fragment) {
  const lang = fragment.slice(4, fragment.search(String.fromCharCode(10)))

  const scriptSpoiler = createElem('script-spoiler', this.main)

  const childElement = lang.trim() === 'console'
    ? this.createConsoleOutput(fragment.slice(1, -1))
    : this.createCodeSnippet(fragment.slice(4 + lang.length, fragment.length - 4), lang)

  const scriptSpoilerContent = this.main.appendChild(childElement)
  scriptSpoiler.setAttribute('header', lang)
  scriptSpoiler.content = scriptSpoilerContent
  scriptSpoiler.setAttribute('content', 'ready')
}
