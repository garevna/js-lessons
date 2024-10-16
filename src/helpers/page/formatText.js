export function formatText (line) {
  line = line
    .replaceAll('◧', '&#10072;&#10072;')
    .replaceAll('◨', '&#10072;&#10072;')

  this.symbols.forEach(current => {
    const { reg, symb, tag } = current

    const regexpr = new RegExp(reg + '.[^' + reg + ']+' + reg, 'g')
    const matches = line.match(regexpr)

    matches && matches
      .forEach(item => line = line.replaceAll(item, item.replace(symb, tag[0]).replace(symb, tag[1])))
  })

  return line
}
