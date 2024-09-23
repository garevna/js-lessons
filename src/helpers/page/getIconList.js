export function getIconList (pageText) {
  const icons = pageText.match(/!\[ico-\d+[^\]]+\]/gm)
  const names = icons
    .map(icon => icon.slice(2, -1).split(' '))
    .map(arr => arr[1])
  return icons ? Array.from(new Set(names)) : []
}
