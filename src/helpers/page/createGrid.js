const { createElem } = require('../').default

export function createGrid (fragment) {
  const columns = Number(fragment.slice(5, 6)) || 2

  const content = fragment.split('\n').filter(item => !!item).slice(1, -1)

  const rows = Math.round(content.length / columns) + (content.length % columns > 0)

  const templateColumns = (Math.round(100 / columns) + '% ').repeat(columns).trim()

  const grid = Object.assign(createElem('figure', this.main), {
    className: 'grid-component',
    templateColumns
  })

  grid.onresize = function (event) {
    if (window.innerWidth > 600) {
      this.style = `
        display: grid;
        grid-template-columns: ${this.templateColumns};
        grid-template-rows: auto;
        justify-items: center;
        align-items: stretch;
      `
    } else {
      this.style = 'display: block;'
    }
  }.bind(grid)

  for (const line of content) {
    grid.content = Object.assign(grid.appendChild(this.parseLine(line)), {
      style: `
        display: block;
        width: max-content;
        height: max-content;
        padding: 0;
        margin:0;
        border: 0;
        box-shadow: none;
      `
    })
  }

  grid.dispatchEvent(new Event('resize'))
}
