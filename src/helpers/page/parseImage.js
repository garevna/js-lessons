const { createPath } = require('../').default

/**
 * A picture line: ![](slogans/funcs-call-girls.svg)
 *
 * The first segment is an alias, not a folder — illustrations/, images/,
 * icons/, slogans/ — and createPath turns it into a real address.
 *
 * Slogans are the one alias that answers differently per language, because
 * every slogan is lettered twice. Not all of them have been lettered in
 * Ukrainian yet, so the English copy stands by: if the -ua file is missing,
 * the image swaps to -en instead of leaving a hole in the page. Dropping a
 * new -ua drawing into images/slogans/ is enough to make it appear — there is
 * no list of them to keep in step.
 */
export function parseImage (line) {
  const string = line.match(/!\[\]\(.+\)/)
  const url = string ? string[0].slice(4, -1) : null

  if (!url) return null

  // Any scheme, not https alone: the http:// pictures used to be handed to
  // createPath, which read "http:" as an alias and lost them.
  const src = /^[a-z][a-z0-9+.-]*:/i.test(url)
    ? url
    : createPath(...url.split('/'))

  const image = Object.assign(new Image(), { src, alt: 'Picture' })

  const [alias, fileName] = url.split('/')

  if (alias === 'slogans') {
    const english = createPath('slogans', fileName, 'eng')

    if (src !== english) {
      image.onerror = function () {
        this.onerror = null
        this.src = english
      }
    }
  }

  return image
}
