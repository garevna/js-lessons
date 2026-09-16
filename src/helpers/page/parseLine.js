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
    let [quiz, variants, right] = text.split('|').map(item => item.trim())
    variants = variants.split(',').map(variant => variant.trim())
    const elem = document.createElement('test-component')
    elem.setAttribute('quiz-question', quiz)
    elem.setAttribute('choice-variants', JSON.stringify(variants))
    elem.setAttribute('right-choice', right)
    return elem
  }

  if (line.match(/[§]{4}/)) {
    const text = line.split('§§§§').find(str => str.length).trim()
    let [header, template] = text.split('|').map(item => item.trim())
    const elem = document.createElement('live-demo-spoiler')
    elem.setAttribute('header', header)
    elem.setAttribute('template', template)
    return elem
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
