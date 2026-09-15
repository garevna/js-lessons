const { pageLabels, lang } = require('../../configs').default

/**
 * The heading of an example block: ♦♦♦4♦♦♦
 *
 * Renders what the lessons used to spell out by hand,
 *
 *   ◘◘![ico-25 cap] **Пример 4**◘◘
 *
 * which is a bordered figure holding the coffee-cup icon and a bold caption.
 * Only the number ever differed.
 */
export function createExampleHeader (number) {
  const figure = document.createElement('figure')
  figure.className = 'bordered'

  const icon = document.createElement('span')
  icon.classList.add('ico-25', 'cap')

  const caption = document.createElement('b')
  const word = pageLabels.example[lang()] || pageLabels.example.ru
  caption.textContent = number ? `${word} ${number}` : word

  figure.append(icon, document.createTextNode(' '), caption)

  return figure
}
