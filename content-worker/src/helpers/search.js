import { getMainMenu } from './getMainMenu'
import { termsOf, finds, says } from './match'

const { keywords, rings, dictionary, mainMenu: written } = require('../assets').default

/**
 * Narrows the menu to the lessons a query finds.
 *
 * A lesson is found by what it is about, never by what it merely uses: a
 * reader who types a concept wants the lesson on it, not every page that
 * happens to call it. What it is about is:
 *
 *   — its keywords (assets/keywords.js, by hand);
 *   — where it sits on the course map (assets/rings.js, written by
 *     tools/rings.js from public/maps/course.json): the title of every place
 *     on the way there, in each language. inheritance-model is found by
 *     «Прототипное наследование», «Модель наследования» and «Цепочка
 *     прототипов», so «наследование» finds the whole ring and «цепочка
 *     прототипов» the one point;
 *   — its title, in all three languages;
 *   — its section's title, so "асинхронщина" brings the section called that.
 *
 * A keyword, a ring or a satellite that names a concept in
 * assets/dictionary.js brings every word of the concept with it, in every
 * language: closure in a lesson's list is also замыкание and замикання, the
 * ring of asynchrony is also async, the ring of functional programming is also
 * fp and func staff. The words are written once, in the dictionary, and a
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

// The titles of every place on the map a lesson sits under, and the concepts
// of the rings and satellites among them.
const placesOf = (ref) => {
  const map = rings || {}
  const places = (map.lessons && map.lessons[ref]) || []

  return places.flatMap((place) => [
    ...((map.nodes && map.nodes[place]) || []),
    ...expand(map.concepts && map.concepts[place] ? [map.concepts[place]] : [])
  ])
}

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
        ...placesOf(item.ref),
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
