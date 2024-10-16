export function parseHeaders (text) {
  const headers = text.match(/^[#]{1,6}.*/gm)
    .map(header => ({
      level: header.match(/^[#]{1,6}/)[0].length,
      text: header.slice(header.match(/^[#]{1,6}/)[0].length)
    }))
    .map(header => {
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
