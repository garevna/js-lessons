const available = ['eng', 'ua', 'ru']

const FALLBACK = 'eng'

/**
 * The language the reader is reading in.
 *
 * This used to keep the answer in a module variable that nothing ever set, so
 * it always said "eng" — harmless while nothing read it, and wrong the moment
 * something did: example headings and the tests button came out in English on
 * Russian pages, and a link never found its translated version.
 *
 * The real answer has always been in localStorage, which is what the language
 * switcher writes and what all three copies of createPath read. This now reads
 * the same place, so there is one source rather than two that disagree.
 */
export function lang (data) {
  if (!data) {
    try {
      return localStorage.getItem('lang') || FALLBACK
    } catch {
      // A page opened from the file system, or a browser with site data
      // blocked, still has to render.
      return FALLBACK
    }
  }

  if (!available.includes(data)) return

  try {
    localStorage.setItem('lang', data)
  } catch {}
}
