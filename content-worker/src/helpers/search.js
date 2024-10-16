import { getMainMenu } from './getMainMenu'

const { translate } = require('./search-helpers').default
const { keywords } = require('../assets').default

export function search (searchValue) {
  const mainMenu = getMainMenu()

  if (!searchValue) return self.postMessage({ route: 'main-menu', response: getMainMenu() })

  const options = Object.keys(keywords)
    .filter(key => keywords[key].filter(keyword => keyword.includes(searchValue)).length)

  const response = mainMenu
    .map(lesson => Object.assign(lesson, {
      items: lesson.items.filter(item => options.includes(item.ref))
    }))
    .filter(lesson => lesson.items.length)

  self.postMessage({ route: 'main-menu', response })
}
