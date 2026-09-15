export function formatText (line) {
  line = line
    .replaceAll('◧', '&#10072;&#10072;')
    .replaceAll('◨', '&#10072;&#10072;')

  this.symbols.forEach(current => {
    const { reg, symb, tag, pattern } = current

    // Built from the marker unless the symbol brings its own. There used to be
    // a "." in front of the character class, which quietly required at least
    // two characters between the markers: ~.~ did not match, its tildes were
    // left in the text, and the next pass paired one of them with the marker
    // after it — so "~имя объекта~ + ~.~ + ~имя свойства~" rendered with "+ ~."
    // as plain text and the " + " after it in a code box. 617 lines across 101
    // pages were doing something like that.
    const regexpr = pattern || new RegExp(reg + '[^' + reg + ']+' + reg, 'g')
    const matches = line.match(regexpr)

    matches && matches
      .forEach(item => line = line.replaceAll(item, item.replace(symb, tag[0]).replace(symb, tag[1])))
  })

  return line
}
