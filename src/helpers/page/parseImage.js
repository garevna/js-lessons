const { createPath } = require('../').default

export function parseImage (line) {
  const string = line.match(/!\[\]\(.+\)/)
  const url = string ? line.match(/!\[\]\(.+\)/)[0].slice(4, -1) : null

  if (!url) return null

  const src = !url.indexOf('https://')
    ? url
    : createPath(...url.split('/'))

  // return new Promise(resolve => {
  //   const img = Object.assign(new Image(), {
  //     src,
  //     alt: 'Picture',
  //     onload (event) {
  //       const { width, height } = event.target
  //       resolve(event.target)
  //     }
  //   })
  // })

  return Object.assign(new Image(), { src, alt: 'Picture' })
}
