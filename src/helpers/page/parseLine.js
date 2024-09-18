export function parseLine (line) {
  if (line.match(/[-_]{3,5000}/)) return document.createElement('hr')
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
