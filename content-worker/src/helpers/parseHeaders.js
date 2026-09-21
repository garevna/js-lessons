// ⟪…⟫ — the anchor the build worked out for this heading, the same in all
// three languages so that the address survives a change of language. It is
// markup, not words. The page strips it; this parser did not, because the menu
// is built here and not there — so every item in the navigation menu carried
// the marker as visible text, and its link went nowhere, the id having been
// transliterated from the text with the marker still in it.
const ANCHOR = /⟪([^⟫]*)⟫/

export function parseHeaders (text) {
  const headers = text.match(/^[#]{1,6}.*/gm)
    .map(header => ({
      level: header.match(/^[#]{1,6}/)[0].length,
      text: header.slice(header.match(/^[#]{1,6}/)[0].length)
    }))
    .map(header => {
      const stamped = header.text.match(ANCHOR)

      if (stamped) {
        header.id = stamped[1]
        header.text = header.text.replace(ANCHOR, '')
      }

      const [icons, refs] = [
        header.text.match(/!\[.[^\]]+\]/g),
        header.text.match(/\[.[^(]+\]\(.[^\)]+\)/g)
      ]

      icons && icons.forEach(icon => {
        header.text = header.text.replace(icon, '').trim()
      })

      return header
    })
  return headers
}
