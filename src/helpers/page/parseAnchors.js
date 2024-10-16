import { createAnchors } from './createAnchors'

export function parseAnchors (line) {
  const create = createAnchors.bind(this)
  const anchors = line.match(/\[.[^(]+\]\(.[^\)]+\)/g)
  return anchors ? create(line, anchors) : this.parseIcons(this.formatText(line))
}
