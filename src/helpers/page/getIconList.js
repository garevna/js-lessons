export function getIconList (pageText) {
  const icons = pageText.match(/!\[ico-\d+[^\]]+\]/gm)
  const names = icons
    ? icons.map(icon => icon.slice(2, -1).split(' ')).map(arr => arr[1])
    : []
  // ♦♦♦N♦♦♦ draws the cup without writing an icon marker into the page, so
  // the style for it has to be asked for here or the heading renders blank.
  if (/^[ 	]*♦{3}/m.test(pageText)) names.push('cap')

  const links = pageText.match(/\[(.)+\]\(.+\)/gm)

  links && names.push('open-in-new')
  links && links.forEach(link => {
    link.includes('►')
      ? names.push('page_next')
      : link.includes('◄')
        ? names.push('page-previous')
        : link.includes('%')
          ? names.push('link-ico')
          : link.includes(':')
            ? names.push('coffee')
            : null
  })

  return Array.from(new Set(names))
}
