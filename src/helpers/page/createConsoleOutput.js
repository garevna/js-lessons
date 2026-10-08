function spanKey (val) {
  return `<span class="console-keys">${val}</span>`
}
function spanValue (val) {
  return `<span class="console-values">${val}</span>`
}
function spanPrototype (val) {
  return `<span class="console-prototype">${val}</span>`
}
function spanProtoVal (val) {
  return `<span class="console-prototype-value">${val}</span>`
}

/**
 * What the console printed in red or in yellow, written as a marked line:
 *
 *   ~~~console
 *   ? Who was called before figure (0)
 *   figure
 *   ! Uncaught TypeError: Cannot add property 2, object is not extensible
 *   ~~~
 *
 * The same two marks the ~~~demo sessions use, so a warning reads the same way
 * wherever it is written. It replaces writing the paragraph out by hand —
 * <p class="warning-message">…</p> — which needed the class remembered, and
 * needed every colon in the text written as &colon; so that the halving below
 * would not cut the markup in two. Twenty-five lines in the course were
 * written that way.
 *
 * The text is escaped: this is what a console printed, not markup, and
 * ~~~error and ~~~warn have always treated it as text.
 */
const MARKED = /^([!?])\s+(.*)$/
const LEVEL = { '!': 'error', '?': 'warning' }

const escape = (text) => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const message = (level, text) => `<p class="${level}-message">${escape(text)}</p>`

/**
 * A line of console output, coloured in two halves at the colon.
 *
 * The halves are joined back together rather than searched for. They used to
 * be put in with line.replace(parts[0], …).replace(parts[1], …), and replace
 * with a string looks for the first match anywhere in the line — including in
 * the span just inserted ahead of it. Three ways that went wrong:
 *
 *   ► constructor: class   the value is " class", and the first " class" in
 *                          the line is now inside class="console-keys". The
 *                          attribute was cut in half and class="console-keys">
 *                          appeared on the page as text.
 *
 *   ► canvas: canvas       the value also reads as part of the key, so the
 *                          value span was nested inside the key span and the
 *                          real value was left uncoloured.
 *
 *   Users:                 an empty value, and replace('') inserts at position
 *                          zero, so every such line opened with an empty span.
 *
 * 82 lines across the course were wrong this way, 67 of them the empty one.
 * A line that splits into anything other than two halves is left alone, as
 * before: a value with a colon of its own is not a key and a value.
 */
export function createConsoleOutput (fragment) {
  const lines = fragment.split('\n')
    .map(line => {
      const marked = MARKED.exec(line.trimStart())

      if (marked) return message(LEVEL[marked[1]], marked[2])

      const parts = line.split(':')

      if (parts.length !== 2) return line

      const [key, value] = parts

      return key.indexOf('[[Prototype]]') !== -1
        ? `${spanPrototype(key)}:${spanProtoVal(value)}`
        : `${spanKey(key)}:${spanValue(value)}`
    })

  // Closed, not self-closed. HTML has no self-closing span: <span … /> is read
  // as an opening tag and the slash is dropped, so each glyph swallowed the
  // rest of its line and the </span> meant for the key closed the glyph
  // instead. The key never closed, and the value ended up nested inside it.
  // Nothing moved on screen — these four classes style only :before, so the
  // text kept inheriting the right colour — but the shape was a trap for the
  // first rule written against .console-collapsed itself.
  fragment = lines.join('\n')
    .replaceAll('►', `<span class="console-collapsed"></span>`)
    .replaceAll('▼', `<span class="console-expanded"></span>`)
    .replaceAll('ƒ', `<span class="console-func-symbol"></span>`)
    .replaceAll('(...)', `<span class="console-calculated"></span>`)

  return Object.assign(document.createElement('pre'), {
    innerHTML: fragment.slice(10, fragment.length - 3).trim(),
    className: 'black'
  })
}
