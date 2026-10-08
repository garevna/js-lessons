const { createElem } = require('../').default

/**
 * The @@@@ block: pictures or short paragraphs side by side. The number after
 * the fence is how many columns; @@@@ on its own is two.
 *
 * The layout is .grid-component in pageStyles.js. It used to be written here as
 * inline styles, which beat the stylesheet, so the class could not be edited
 * into having any effect.
 */
export function createGrid (fragment) {
  const columns = Number(fragment.slice(5, 6)) || 2

  const content = fragment.split('\n').filter(item => !!item).slice(1, -1)

  const grid = Object.assign(createElem('figure', this.main), {
    className: 'grid-component'
  })

  grid.dataset.columns = columns

  for (const line of content) grid.appendChild(this.parseLine(line))
}
