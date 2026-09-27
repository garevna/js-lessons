const { createElem } = require('../createElem')
const { tableRows } = require('./tableRows')

export function createTableForSpoiler (fragment) {
  const tableFragment = fragment.slice(fragment.match(/\n\n\|/).index + 2)
  const table = document.createElement('table')

  tableRows(tableFragment)
    .forEach(item => {
      const row = createElem('tr', table)
      item.split('|')
        .filter(cell => cell.length)
        .map(cell => cell.trim())
        .forEach(cellContent => createElem('td', row).appendChild(this.parseLine(cellContent)))
    })
  return table.outerHTML
}
