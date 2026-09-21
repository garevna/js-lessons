const { createElem } = require('../').default

/**
 * The icon a black block opens with when its fence does not say otherwise.
 *
 * Exported because getIconList has to ask for the style: icons are fetched by
 * scanning the page for ![ico-NN name] markers, and a block that draws one
 * without writing a marker would render a blank 20px gap. Naming it once means
 * the two cannot drift apart.
 */
export const BLACK_BLOCK_ICON = 'ico-20 speach'

const SIZE = BLACK_BLOCK_ICON.split(' ')[0]
const DEFAULT_NAME = BLACK_BLOCK_ICON.split(' ')[1]

/** •••• / •••• bash / •••• none — what the opening fence asks for. */
export const blackBlockIcon = (fence) => {
  const named = (fence.match(/•{4}[ \t]*([a-z_-]+)/) || [])[1]
  if (!named) return DEFAULT_NAME
  return named === 'none' ? null : named
}

// A first line that carries an icon of its own keeps it, and the default stays
// out of the way rather than drawing a second one.
const OPENS_WITH_ICON = /^\s*!\[ico-\d+\s+[a-z_-]+\]/i

/**
 * ••••  …  ••••  — a paragraph on the black ground.
 *
 * The inline form, ••one line••, could only ever hold one line, so anything
 * longer was written as a single message with <br /> between its lines. That
 * made the message file unreadable and forced a translator to take the whole
 * paragraph in one bite.
 *
 * Here the lines between the fences are ordinary lines: each becomes its own
 * key, each is formatted the usual way — bold, icons, inline code — and they
 * stack inside one black figure.
 *
 * The block opens with a speech bubble unless the fence says otherwise. Of the
 * 207 black lines in the course 75 carry a terminal icon and 106 carry none,
 * so the fence takes a name — •••• bash, •••• none — and the default is only
 * what saves writing the common one out every time.
 */
export function createBlackBlock (fragment) {
  const figure = Object.assign(createElem('figure', this.main), {
    className: 'black'
  })

  const lines = fragment.split('\n')
  const icon = blackBlockIcon(lines[0])

  let first = true

  for (let line of lines.slice(1, -1)) {
    // A blank line between paragraphs is spacing, not an empty line to parse.
    if (!line.trim()) {
      figure.appendChild(document.createElement('br'))
      continue
    }

    if (first) {
      first = false
      // Written into the line rather than built as an element, so the icon
      // goes through parseIcons exactly as a hand-written one does.
      if (icon && !OPENS_WITH_ICON.test(line)) line = `![${SIZE} ${icon}] ${line}`
    }

    const element = figure.appendChild(this.parseLine(line))

    // parseLine hands back a block element with the page's own spacing on it.
    // Inside the figure the lines are one paragraph, so they sit tight.
    Object.assign(element.style, {
      margin: '0',
      padding: '0',
      border: '0',
      background: 'none',
      boxShadow: 'none'
    })
  }

  return figure
}
