/**
 * ♠♠♠♠ … ♠♠♠♠ — broken code the reader repairs, and the checks that grade it.
 *
 *   ♠♠♠♠ Обработчик теряет контекст: клик должен менять надпись на кнопке
 *   class CustomButton {
 *     …
 *   }
 *
 *   const btn = new CustomButton('Click me!')
 *   ???
 *   ? 3 | кнопка появилась на странице
 *   document.querySelector('button') !== null
 *
 *   ? 5 | клик меняет надпись на самой кнопке
 *   document.querySelector('button').click()
 *   document.querySelector('button').textContent === 'Clicked: 1'
 *
 *   ? 2 | контекст связан полем-стрелкой, а не bind
 *   /handleClick\s*=\s*\(/.test(SOURCE)
 *   ♠♠♠♠
 *
 * The opening fence carries the task. Then the code, exactly as the reader
 * will first see it. Then ??? on a line of its own, and after it the checks.
 *
 * A check is a ? line — how many points it is worth, a pipe, and what the
 * reader is told it is testing — followed by the JavaScript that decides it.
 * The last line of that JavaScript is the answer: true if the check passed.
 * The lines before it are there to make something happen first, like clicking
 * the button.
 *
 * The checks run inside the frame the code ran in, so they can see what it
 * declared and the document it built. They are also handed SOURCE, the text
 * the reader wrote, which is how a check can ask whether a repair was done
 * elegantly rather than merely done.
 *
 * Why the code is not compared with a correct version: see code-fix.js.
 */

const SPLIT = /^[ \t]*\?{3}[ \t]*$/m

// ? 5 | клик меняет надпись
const HEAD = /^[ \t]*\?[ \t]*(\d+)?[ \t]*\|?[ \t]*(.*)$/

export function createCodeFix (fragment) {
  const markup = (text) => {
    const out = this.parseAnchors(text)
    if (typeof out === 'string') return out
    const box = document.createElement('div')
    box.appendChild(out)
    return box.innerHTML
  }

  const lines = fragment.split('\n')

  // The opening fence may carry the task; the closing one never does.
  const task = (lines[0].replace(/^[ \t]*♠{4}[ \t]*/, '') || '').trim()
  const body = lines.slice(1, -1).join('\n')

  const at = body.search(SPLIT)

  // Without ??? the whole block is code and nothing can be graded. Rendering
  // it anyway, as an editor with no checks, would look like it worked.
  if (at === -1) return null

  const code = body.slice(0, at).replace(/^\n+|\s+$/g, '')
  const rest = body.slice(at).split('\n').slice(1)

  const checks = []
  let current = null

  for (const line of rest) {
    const head = line.match(HEAD)

    if (head) {
      current = {
        points: Number(head[1] || 1),
        title: markup(head[2].trim()),
        lines: []
      }
      checks.push(current)
      continue
    }

    if (!current) continue
    if (line.trim()) current.lines.push(line)
  }

  const ready = checks
    .filter((check) => check.lines.length)
    .map(({ points, title, lines: body }) => ({
      points,
      title,
      // Everything but the last line runs for its effect; the last line is the
      // verdict. Wrapped in a function so the earlier lines may declare things
      // without leaking into the frame the next check will look at.
      body: `(function () {\n${body.slice(0, -1).join('\n')}\nreturn (${body[body.length - 1].trim()})\n})()`
    }))

  if (!code || !ready.length) return null

  const element = document.createElement('code-fix')
  this.main.appendChild(element)
  element.fill({ task: markup(task), code, checks: ready })

  return element
}
