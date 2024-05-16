export function parseLine (line) {
  if (line.match(/[-_]{3,5000}/)) return document.createElement('hr')
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
