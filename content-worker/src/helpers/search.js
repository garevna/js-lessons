import { getMainMenu } from './getMainMenu'
import { termsOf, finds, says } from './match'

const { keywords, uses, dictionary, mainMenu: written } = require('../assets').default

/**
 * Narrows the menu to the lessons a query finds.
 *
 * A lesson is found by:
 *
 *   — its keywords (assets/keywords.js, by hand): what it is about;
 *   — what it uses (assets/uses.js, written by tools/uses.js from its text
 *     and its code): a lesson that builds its objects with a factory is found
 *     by "factory" even though factories are not its subject;
 *   — its title, in all three languages;
 *   — its section's title, so "асинхронщина" brings the section called that.
 *
 * A keyword or a use that names a concept in assets/dictionary.js brings every
 * word of the concept with it, in every language: closure in a lesson's list
 * is also замыкание and замикання, async is also асинхронщина, fabric is also
 * factory and фабрика. The words are written once, in the dictionary, and a
 * lesson only names the concept.
 *
 * The titles were not searched at all before, and a word taken straight from
 * a lesson's own name found that lesson a third of the time in Russian and
 * Ukrainian. How a word is compared — endings, both directions — is in
 * match.js.
 *
 * Asynchronous because the menu is: it is filtered against the registry of
 * pages, and that registry is fetched rather than compiled in.
 */

// Every name a concept goes by — its key and its English words — pointing at
// the entry, so a lesson's cycle reaches the same entry as loop.
const concepts = new Map()

for (const [key, entry] of Object.entries(dictionary || {})) {
  for (const name of [key, ...(entry.eng || [])]) concepts.set(name.toLowerCase(), entry)
}

const wordsOf = (entry) => [...(entry.eng || []), ...(entry.ru || []), ...(entry.ua || [])]

const expand = (list) => (list || []).flatMap((word) => {
  const entry = concepts.get(String(word).toLowerCase())
  return entry ? [word, ...wordsOf(entry)] : [word]
})

// Worked out once: the words do not change while the worker lives.
let index = null

const lessonTerms = () => {
  if (index) return index

  index = {}

  for (const section of written) {
    for (const item of section.items) {
      index[item.ref] = termsOf([
        item.ref,
        ...expand(keywords[item.ref]),
        ...expand(uses && uses[item.ref]),
        item.ru, item.eng, item.ua,
        section.ru, section.eng, section.ua
      ])
    }
  }

  return index
}

export async function search (searchValue) {
  const mainMenu = await getMainMenu()

  // The search box sends what was typed as it is, trailing space included,
  // and "closure " used to find nothing.
  const wanted = String(searchValue || '').trim()

  if (!wanted) return self.postMessage({ route: 'main-menu', response: mainMenu })

  const terms = lessonTerms()

  // Several words: first as one phrase, and only if no lesson has the phrase,
  // word by word — see says() in match.js.
  const phrase = /\s/.test(wanted)
    ? Object.keys(terms).filter(ref => says(wanted, terms[ref]))
    : []

  const found = phrase.length
    ? ref => phrase.includes(ref)
    : ref => finds(wanted, terms[ref])

  const response = mainMenu
    .map(lesson => Object.assign(lesson, {
      items: lesson.items.filter(item => terms[item.ref] && found(item.ref))
    }))
    .filter(lesson => lesson.items.length)

  self.postMessage({ route: 'main-menu', response })
}
