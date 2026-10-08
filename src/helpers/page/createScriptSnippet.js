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

  // A session that types itself, rather than output that is already there.
  // The fence may carry a title after the word: ~~~demo Сравнение операторов
  const [word, ...title] = lang.split(/\s+/)
  if (word === 'demo') return [this.createConsoleDemo(fragment, title.join(' '))]

  // The same session in a terminal. Worth a word of its own because a terminal
  // is not a browser console: run node in it and a private field behaves as the
  // language says, where a browser console reads one from outside its class and
  // prints it. What else gets run there — webpack, git, npm — is the block's
  // business, not this one's.
  if (word === 'bash') return [this.createConsoleDemo(fragment, title.join(' '), 'bash')]

  // A block of questions, shown one at a time rather than as a wall.
  if (word === 'tests') return [this.createTestSeries(fragment, title.join(' '))]

  if (lang === 'error') return [this.createErrorOutput(fragment)]
  if (lang === 'warn' || lang === 'warning') return [this.createWarningOutput(fragment)]

  return [this.createCodeSnippet(fragment.slice(3 + lang.length, fragment.length - 3), lang)]
}

export function createScriptSnippet (fragment) {
  const elements = buildSnippet.call(this, fragment)
  for (const element of elements) this.main.appendChild(element)
  return elements[elements.length - 1]
}
