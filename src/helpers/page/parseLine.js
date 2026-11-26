export function parseLine (line) {
  if (line.match(/[-_]{3,5000}/)) return document.createElement('hr')

  // ♦♦♦4♦♦♦ — the heading of an example block. Only the number is written;
  // the icon, the border and the word come from the renderer, so the word is
  // never copied into a lesson and never sent to a translator.
  if (line.match(/^\s*♦{3}/)) {
    const number = line.split('♦♦♦').find(str => str.trim()) || ''
    return this.createExampleHeader(number.trim())
  }

  // ※※※tests quiz/var※※※ — the button that sends a reader to the tests or the
  // exercises. Only the address is written; the icon and the word for the
  // current language come from the renderer.
  if (line.match(/^\s*※{3}/)) {
    const body = (line.split('※※※').find(str => str.trim()) || '').trim()
    const space = body.indexOf(' ')
    return space === -1
      ? this.createLinkButton(body, '')
      : this.createLinkButton(body.slice(0, space), body.slice(space + 1).trim())
  }

  if (line.match(/[☼]{3}/)) {
    const text = line.split('☼☼☼').find(str => str.length).trim()
    const elem = document.createElement('funny-slogan')
    elem.setAttribute('text', text)
    return elem
  }

  if (line.match(/[→→→]{3}/)) {
    const text = line.split('→→→').find(str => str.length).trim()
    // Read from the right: the answer is last, the choices before it, and
    // everything left over is the question. Splitting into three from the
    // left loses any question with a pipe in it, and a lesson about coercion
    // asks about `[!!{}] || true` — the || was read as two empty separators,
    // so the choices came out empty and the test showed one blank button.
    const parts = text.split('|')
    const right = (parts.pop() || '').trim()
    const variants = (parts.pop() || '').split(',').map(variant => variant.trim())
    const quiz = parts.join('|').trim()
    const elem = document.createElement('test-component')
    elem.setAttribute('quiz-question', quiz)
    elem.setAttribute('choice-variants', JSON.stringify(variants))
    elem.setAttribute('right-choice', right)
    return elem
  }

  // ![scroll](illustrations/lighthouse-report.png) — a picture too tall to
  // stand on the page whole: a report, a long listing, a panel photographed
  // from top to bottom. It goes into a box the reader scrolls instead of
  // pushing the rest of the lesson a screen and a half down.
  //
  // Written on a line of its own, and the alt slot says `scroll` and nothing
  // else: ![anything] elsewhere in a line is an icon, and `[![ico-70
  // youtube]](https://…)` would answer a looser pattern.
  //
  // The line is handed to parseImage with the slot emptied, so the address is
  // resolved the one way every other picture's is — aliases, schemes and the
  // slogan fallback included.
  if (line.match(/^\s*!\[scroll\]\(.+\)\s*$/)) {
    const picture = this.parseImage(line.replace('![scroll]', '![]'))

    if (picture) {
      const box = document.createElement('div')
      box.classList.add('scroll-box')
      box.appendChild(picture)
      return box
    }
  }

  const img = this.parseImage(line)

  if (img) return img

  const { level, text } = this.parseHeader(line)

  const lineElem = document.createElement(level > 0 ? `h${level}` : 'div')
  const element = this.parseAnchors(text)

  if (element) {
    typeof element === 'string'
      ? lineElem.innerHTML = element
      : lineElem.appendChild(element)
  }

  return lineElem
}
