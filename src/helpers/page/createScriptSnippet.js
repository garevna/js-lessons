/**
 * Turns one ~~~lang … ~~~ block into the elements it renders as.
 *
 * It returns a list rather than an element because console output is two
 * things: its heading and the output itself. The heading used to be written by
 * hand above the block, in four different wordings and half a dozen wrappings;
 * it belongs to the block, so the block brings it.
 *
 * Kept separate from appending, because a spoiler holds its content in a list
 * of its own and cannot let a snippet append itself to the page.
 */
export function buildSnippet (fragment) {
  const lang = fragment.slice(3, fragment.search(String.fromCharCode(10))).trim()

  if (lang === 'console') {
    return [this.createConsoleHeader(), this.createConsoleOutput(fragment)]
  }

  if (lang === 'error') return [this.createErrorOutput(fragment)]
  if (lang === 'warn' || lang === 'warning') return [this.createWarningOutput(fragment)]

  return [this.createCodeSnippet(fragment.slice(3 + lang.length, fragment.length - 3), lang)]
}

export function createScriptSnippet (fragment) {
  const elements = buildSnippet.call(this, fragment)
  for (const element of elements) this.main.appendChild(element)
  return elements[elements.length - 1]
}
