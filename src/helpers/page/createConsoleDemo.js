/**
 * ~~~demo … ~~~ — a browser console session that types itself.
 * ~~~bash … ~~~ — the same, in a terminal.
 *
 * Deliberately a fence word rather than a block of its own. Every block
 * pattern in pageRegExpr is another chance to match more than it meant to,
 * and one of them had been quietly eating six test questions off a lesson for
 * months. ~~~ already reads the word after the fence — console, error, bash —
 * so a session needs no new pattern at all.
 *
 * The two flavours are one component. What differs is the prompts and the
 * ground they are drawn on; the parser, the tokenizer and the colours are the
 * same, because the code in the session is the same code.
 */
export function createConsoleDemo (fragment, title, flavour) {
  const start = fragment.search(String.fromCharCode(10))
  const session = fragment.slice(start + 1, fragment.length - 3)

  const demo = document.createElement('console-demo')
  demo.setAttribute('session', session)
  if (title) demo.setAttribute('header', title)
  if (flavour) demo.setAttribute('flavour', flavour)

  return demo
}
