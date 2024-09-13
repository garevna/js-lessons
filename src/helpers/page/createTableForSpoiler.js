const { createElem } = require('../createElem')

export function createTableForSpoiler (fragment) {
  const tableFragment = fragment.slice(fragment.match(/\n\n\|/).index + 2)
  const table = document.createElement('table')

  tableFragment.match(/.[^\n]*/g)
    .filter(string => string.trim().indexOf('|') === 0)
    .forEach(item => {
      const row = createElem('tr', table)
      item.split('|')
        .filter(cell => cell.length)
        .map(cell => cell.trim())
        .forEach(cellContent => createElem('td', row).appendChild(this.parseLine(cellContent)))
    })
  return table.outerHTML
}
