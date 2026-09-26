/**
 * ~~~demo … ~~~ — a console session that types itself.
 *
 * Deliberately a fence word rather than a block of its own. Every block
 * pattern in pageRegExpr is another chance to match more than it meant to,
 * and one of them had been quietly eating six test questions off a lesson for
 * months. ~~~ already reads the word after the fence — console, error, bash —
 * so a session needs no new pattern at all.
 */
export function createConsoleDemo (fragment, title) {
  const start = fragment.search(String.fromCharCode(10))
  const session = fragment.slice(start + 1, fragment.length - 3)

  const demo = document.createElement('console-demo')
  demo.setAttribute('session', session)
  if (title) demo.setAttribute('header', title)

  return demo
}
