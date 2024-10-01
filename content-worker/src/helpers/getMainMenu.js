const { mainMenu } = require('../assets').default
const { pages, ua, eng } = require('../configs').default

export function getMainMenu () {
  return mainMenu.map(lesson => ({
    ref: lesson.ref,
    title: lesson[self.lang],
    items: lesson.items
      .filter(item => pages.includes(item.ref))
      .map(item => ({
        ref: item.ref,
        title: item[self.lang],
        translated: eng.includes(item.ref) && ua.includes(item.ref)
      }))
  }))
}
