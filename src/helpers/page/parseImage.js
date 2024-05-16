const { createPath } = require('../').default

export function parseImage (line) {
  const string = line.match(/!\[\]\(.+\)/)
  const url = string ? line.match(/!\[\]\(.+\)/)[0].slice(4, -1) : null

  if (!url) return null

  const src = !url.indexOf('https://')
    ? url
    : createPath(...url.split('/'))

  return Object.assign(document.createElement('img'), { src })
}
