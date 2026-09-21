const { pageLabels, lang } = require('../../configs').default

/**
 * The heading above a ~~~console block.
 *
 * The lessons were written over several years, and the caption above console
 * output came out differently almost every time: four phrase-book entries that
 * all mean "Result" (two of them missing a translation), each wrapped in some
 * combination of ◘◘, ** and ^^ — and 88 blocks with no caption at all.
 *
 * The heading is not written in the lesson any more. The block says what it is
 * and the heading comes with it, in the reader's language, the same shape as
 * the example heading beside it.
 */
export function createConsoleHeader () {
  const figure = document.createElement('figure')
  figure.className = 'bordered'

  const icon = document.createElement('span')
  icon.classList.add('ico-25', 'mdi-console')

  const caption = document.createElement('b')
  caption.textContent = pageLabels.consoleOutput[lang()] || pageLabels.consoleOutput.ru

  figure.append(icon, document.createTextNode(' '), caption)

  return figure
}
