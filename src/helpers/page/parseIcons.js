export function parseIcons (line) {
  const icons = line.match(/!\[.[^\]]+\]/g)
  icons && icons.forEach(icon => {
    const ico = document.createElement('span')
    icon.slice(2, -1).split(' ').forEach(item => ico.classList.add(item))
    line = line.split(icon).join(ico.outerHTML)
  })

  return line
}
