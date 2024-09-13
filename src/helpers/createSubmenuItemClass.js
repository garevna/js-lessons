const itemClass = 'sub-level-item'
const activeItemClass = 'sub-level-item sub-level-item--active'

export function createSubmenuItemClass (ref, ua, eng) {
  const translated = ua.includes(ref) && eng.includes(ref)

  const activeSubItem = location.search.slice(1) || ''

  const className = (activeSubItem !== ref ? itemClass : activeItemClass) + (translated ? ' translated' : '')

  return className
}
