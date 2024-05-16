export function createScriptSnippet (fragment) {
  const lang = fragment.slice(3, fragment.search(String.fromCharCode(10)))

  const elem = lang.trim() === 'console'
    ? this.createConsoleOutput(fragment)
    : this.createCodeSnippet(fragment.slice(3 + lang.length, fragment.length - 3), lang)

  return this.main.appendChild(elem)
}
