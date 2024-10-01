const itemClass = 'sub-level-item'
const activeItemClass = 'sub-level-item sub-level-item--active'

export function createSubmenuItemClass (data) {
  const { ref, translated } = data
  console.log(ref, translated)

  const activeSubItem = location.search.slice(1) || ''

  const className = (activeSubItem !== ref ? itemClass : activeItemClass) + (translated ? ' translated' : '')

  return className
}
