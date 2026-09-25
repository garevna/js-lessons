import { getMainMenu } from './getMainMenu'

const { keywords } = require('../assets').default

/**
 * Narrows the menu to the lessons whose keywords contain what was typed.
 *
 * The keywords live in assets/keywords.js, one list per lesson. A lesson with
 * no list there cannot be found by search at all — which is why the list is
 * worth filling in when a page is added.
 *
 * Asynchronous because the menu is: it is filtered against the registry of
 * pages, and that registry is fetched rather than compiled in.
 */
export async function search (searchValue) {
  const mainMenu = await getMainMenu()

  if (!searchValue) return self.postMessage({ route: 'main-menu', response: mainMenu })

  // The search box lowercases what was typed; the lists are not lowercased at
  // all. So a keyword written parseInt or scrollHeight could never match
  // anything — 47 of them across 27 lessons, and scroll could not be found by
  // any of the eight property names the lesson is about.
  const wanted = searchValue.toLowerCase()

  const options = Object.keys(keywords)
    .filter(key => keywords[key].some(keyword => keyword.toLowerCase().includes(wanted)))

  const response = mainMenu
    .map(lesson => Object.assign(lesson, {
      items: lesson.items.filter(item => options.includes(item.ref))
    }))
    .filter(lesson => lesson.items.length)

  self.postMessage({ route: 'main-menu', response })
}
