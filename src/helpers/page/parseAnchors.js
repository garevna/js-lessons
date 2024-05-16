const { createPath, createElem } = require('../').default

function create (line, anchors) {
  let [text, rest] = ['', line]

  const result = anchors.reduce((res, anchor) => {
    ;[text, rest] = rest.split(anchor)

    text && Object.assign(createElem('span', res), {
      innerHTML: this.parseIcons(this.formatText(text))
    })

    const [refText, ref] = anchor.slice(1, -1).split('](')

    const link = Object.assign(createElem('a', res), {
      target: '_blank',
      innerHTML: this.parseIcons(this.formatText(refText)),
      className: 'visible-anchor'
    })

    if (ref.split('/')[0] === 'page') {
      Object.assign(link, {
        page: document.getElementsByTagName('page-element')[0],
        className: 'page-link',
        onclick: function (event) {
          event.preventDefault()
          event.target
            .parentElement
            .page.setAttribute('src', `${createPath('lessons', ref.split('/')[1])}`)
        }
      })
    } else {
      const href = !ref.indexOf('https://')
        ? ref.slice(0, -1)
        : createPath(...ref.split('/'))
      Object.assign(link, { href })
    }
    return res
  }, document.createElement('div'))

  rest && Object.assign(createElem('span', result), {
    innerHTML: this.parseIcons(this.formatText(rest))
  })

  return result
}

export function parseAnchors (line) {
  const createAnchors = create.bind(this)
  const anchors = line.match(/\[.[^(]+\]\(.[^\)]+\)/g)
  return anchors ? createAnchors(line, anchors) : this.parseIcons(this.formatText(line))
}
