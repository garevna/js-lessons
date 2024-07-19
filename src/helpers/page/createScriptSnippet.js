export function createScriptSnippet (fragment) {
  const lang = fragment.slice(3, fragment.search(String.fromCharCode(10))).trim()

  const elem = lang === 'console'
    ? this.createConsoleOutput(fragment)
    : lang === 'error'
      ? this.createErrorOutput(fragment)
      : this.createCodeSnippet(fragment.slice(3 + lang.length, fragment.length - 3), lang)

  return this.main.appendChild(elem)
}
