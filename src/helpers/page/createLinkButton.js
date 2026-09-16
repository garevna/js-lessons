const { pageLabels, lang } = require('../../configs').default

/**
 * The button that sends a reader to the tests or the exercises: ※※※tests quiz/var※※※
 *
 * Renders what thirty pages spelled out by hand,
 *
 *   [![ico-30 hw] **Тесты**](quiz/var)
 *
 * where the only thing that differed was the address — and, on half of them,
 * whether the word was bold, which nobody meant as a distinction.
 *
 * The markup is handed to parseAnchors rather than built here, so the button
 * is the same anchor as any other link: same classes, same handling of page/,
 * external/ and quiz/ targets, same behaviour when one of them changes.
 */
export function createLinkButton (kind, target) {
  const label = pageLabels[kind] && (pageLabels[kind][lang()] || pageLabels[kind].ru)

  if (!label) {
    const warning = document.createElement('div')
    warning.textContent = `unknown button "${kind}" — expected one of ${Object.keys(pageLabels).join(', ')}`
    warning.style = 'color: #c00'
    return warning
  }

  return this.parseAnchors(`[![ico-30 hw] **${label}**](${target})`)
}
