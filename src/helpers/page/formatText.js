export function formatText (line) {
  this.symbols.forEach(current => {
    const regexpr = new RegExp(current.reg + '.[^' + current.reg + ']+' + current.reg, 'g')
    const matches = line.match(regexpr)
    matches ? matches.forEach(item => line = line.split(item).join(item.replace(current.symb, current.tag[0]).replace(current.symb, current.tag[1]))) : null
  })

  return line
}
