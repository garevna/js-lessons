const { createElem } = require('../createElem')
const { tableRows } = require('./tableRows')

export function createTable (fragment) {
  const tableFragment = fragment.slice(fragment.match(/\n\n\|/).index + 2)
  const wrapper = Object.assign(createElem('div', this.main), {
    style: 'overflow-y: auto;'
  })
  const table = createElem('table', wrapper)

  tableRows(tableFragment)
    .forEach(item => {
      const row = createElem('tr', table)
      item.split('|')
        .filter(cell => cell.length)
        .map(cell => cell.trim())
        .forEach(cellContent => createElem('td', row).appendChild(this.parseLine(cellContent)))
    })
  return wrapper
}
