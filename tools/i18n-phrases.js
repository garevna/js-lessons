#!/usr/bin/env node
/**
 * The phrase book: lines that repeat, translated once.
 *
 *   node tools/i18n-phrases.js              rebuild content/phrases.json
 *   node tools/i18n-phrases.js --conflicts  only report disagreements
 *
 * Two sections, because repetition on its own does not mean a phrase belongs
 * to the whole course.
 *
 *   common   stock wording, turning up in lessons that have nothing to do with
 *            each other. "Результат в консоли:" is on twelve different pages
 *            and means the same thing on all of them.
 *
 *   topic    wording that repeats inside one lesson. "строгий режим:" appears
 *            twelve times, all of them on the page about strict mode. Worth
 *            writing once, but it is that lesson's wording, not the course's,
 *            and the table says so.
 *
 * The first version of this table had only one section and used repetition as
 * the whole test, which put "События элементов DOM" in a file called common.
 * The difference is not how often a phrase repeats but whether the pages it
 * repeats on have anything to do with each other.
 */

const fs = require('fs')
const path = require('path')
const { core } = require('./lib/phrases')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const PHRASES = path.join(root, 'content/phrases.json')
const IGNORE = path.join(root, 'content/phrases-ignore.json')

const LANGS = ['eng', 'ua']

// common: seen in this many different lessons, and short enough to be a label
const COMMON_LESSONS = 3
const COMMON_LONGEST = 60

// topic: said this many times, within at most this many lessons. The length
// limit matters more than the counts: what belongs here is a label or a stock
// caption, not a paragraph. A phrase in the book is edited for every page at
// once, which is the point for "Результат:" and a trap for anything the author
// might want to reword in one place.
const TOPIC_TIMES = 3
const TOPIC_LESSONS = 2
const TOPIC_LONGEST = 60

const conflictsOnly = process.argv.includes('--conflicts')

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

// A phrase with no Cyrillic in it has nothing to translate: a bare number, a
// method name, a table rule. They repeat constantly and would fill the book
// with entries whose answer is the question.
const worthTranslating = (s) => /[Ѐ-ӿ]/.test(s.replace(/⟦f\d+⟧/g, '').replace(/&[a-zA-Z]+;|&#\d+;/g, ''))

// ⟦f5⟧ is an index into the page's own fragment table, and the tables differ
// from page to page. A phrase carrying one cannot be shared even between two
// pages that spell it identically, because the number would resolve to a
// different snippet on each.
const hasCode = (s) => /⟦f\d+⟧/.test(s)

// Translations scraped off the pages are only as good as the pages, and some
// of those pages are misaligned: "Результат" is filed with the English for a
// paragraph two lines further down. Two things rule that out cheaply.
const placeholders = (s) => (s.match(/⟦f\d+⟧/g) || []).sort().join(' ')
const hasLetters = (s) => /[a-zA-Zа-яА-ЯёЁіїєґІЇЄҐ]/.test(s)

const plausible = (phrase, candidate) =>
  placeholders(phrase) === placeholders(candidate) &&
  hasLetters(candidate) === hasLetters(phrase) &&
  candidate.length <= phrase.length * 3 + 24 &&
  candidate.length * 3 + 24 >= phrase.length

const before = readJson(PHRASES) || { common: {}, topic: {} }
const ignored = new Set(readJson(IGNORE) || [])

/** phrase -> { n, pages:Set, seen: { eng: Map<text,count>, ua: … } } */
const table = new Map()

for (const file of fs.readdirSync(MESSAGES).filter((f) => f.endsWith('.json')).sort()) {
  const page = file.replace(/\.json$/, '')
  const entries = readJson(path.join(MESSAGES, file)) || {}

  for (const entry of Object.values(entries)) {
    if (!entry.ru) continue
    const phrase = core(entry.ru)
    if (!phrase || !worthTranslating(phrase) || hasCode(phrase)) continue

    const slot = table.get(phrase) || { n: 0, pages: new Set(), seen: { eng: new Map(), ua: new Map() } }
    slot.n += 1
    slot.pages.add(page)

    for (const lang of LANGS) {
      if (!entry[lang]) continue
      const translated = core(entry[lang])
      // A "translation" identical to the Russian is the build's fallback
      // showing through, not an answer.
      if (!translated || translated === phrase) continue
      slot.seen[lang].set(translated, (slot.seen[lang].get(translated) || 0) + 1)
    }

    table.set(phrase, slot)
  }
}

// A phrase already moved out of the pages is no longer in any message file, so
// counting message files alone would report it as having stopped repeating —
// and every run after the first would show an empty book. The skeletons say
// where those phrases went; count their references too.
const LESSONS = path.join(root, 'content/lessons')

for (const file of fs.existsSync(LESSONS) ? fs.readdirSync(LESSONS).filter((f) => f.endsWith('.md')) : []) {
  const page = file.replace(/\.md$/, '')
  const skeleton = fs.readFileSync(path.join(LESSONS, file), 'utf8')

  for (const [, section, id] of skeleton.matchAll(/\{\{(common|topic)\.([a-z]\d+)\}\}/g)) {
    const entry = (before[section] || {})[id]
    if (!entry || !entry.ru) continue

    const slot = table.get(entry.ru) || { n: 0, pages: new Set(), seen: { eng: new Map(), ua: new Map() } }
    slot.n += 1
    slot.pages.add(page)
    table.set(entry.ru, slot)
  }
}

// Latin letters in a Russian phrase mean it names something on the page — a
// function, a variable, a tool. "Что итерирует функция showProto?" stops being
// true the moment showProto is renamed or deleted, and the book would go on
// holding a translation of a question about a function that no longer exists.
// Nothing tied to a page's code goes in, which costs a couple of otherwise
// harmless captions and is worth it.
const namesSomething = (phrase) => /[a-zA-Z]/.test(phrase)

const isCommon = (phrase, s) =>
  s.pages.size >= COMMON_LESSONS &&
  phrase.length <= COMMON_LONGEST &&
  !namesSomething(phrase)

const isTopic = (phrase, s) =>
  s.n >= TOPIC_TIMES &&
  s.pages.size <= TOPIC_LESSONS &&
  phrase.length <= TOPIC_LONGEST &&
  !namesSomething(phrase)

const chosen = { common: [], topic: [] }
for (const [phrase, s] of table) {
  if (ignored.has(phrase)) continue
  if (isCommon(phrase, s)) chosen.common.push([phrase, s])
  else if (isTopic(phrase, s)) chosen.topic.push([phrase, s])
}
for (const section of Object.keys(chosen)) chosen[section].sort((a, b) => b[1].n - a[1].n)

// Ids are pointed at by the skeletons, so one is assigned once, by Russian
// text, and never reused. A phrase that stops repeating keeps its entry rather
// than leaving a page pointing at nothing.
const idOf = new Map()
const next = { common: 0, topic: 0 }

for (const section of ['common', 'topic']) {
  for (const [id, entry] of Object.entries(before[section] || {})) {
    if (!entry || !entry.ru) continue
    idOf.set(entry.ru, id)
    const n = Number(String(id).slice(1))
    if (Number.isFinite(n) && n >= next[section]) next[section] = n + 1
  }
}

const out = { common: {}, topic: {} }
const conflicts = []
let harvested = 0
let kept = 0

for (const section of ['common', 'topic']) {
  const prefix = section === 'common' ? 'c' : 't'

  for (const [phrase, slot] of chosen[section]) {
    const id = idOf.get(phrase) || `${prefix}${next[section]++}`
    idOf.set(phrase, id)

    const previous = (before[section] || {})[id] || {}
    const entry = { ru: phrase }
    if (section === 'topic') entry.lessons = [...slot.pages].sort()

    for (const lang of LANGS) {
      if (previous[lang]) {
        entry[lang] = previous[lang]
        kept += 1
        continue
      }

      const candidates = [...slot.seen[lang].entries()]
        .filter(([text]) => plausible(phrase, text))
        .sort((a, b) => b[1] - a[1])

      entry[lang] = candidates.length ? candidates[0][0] : ''
      if (candidates.length) harvested += 1
      if (candidates.length > 1) conflicts.push({ phrase, lang, candidates })
    }

    out[section][id] = entry
  }

  // Keep anything a skeleton may still point at.
  for (const [id, entry] of Object.entries(before[section] || {})) {
    if (!out[section][id]) out[section][id] = entry
  }
}

if (!conflictsOnly) {
  fs.writeFileSync(PHRASES, JSON.stringify(out, null, 2) + '\n')
}

const say = (section, list) => {
  const entries = Object.values(out[section])
  const occurrences = list.reduce((n, [, s]) => n + s.n, 0)
  const done = LANGS.map((l) => `${l} ${entries.filter((e) => e[l]).length}/${entries.length}`).join(', ')
  console.log(`  ${section.padEnd(7)} ${String(list.length).padStart(4)} phrases, ${String(occurrences).padStart(4)} occurrences   ${done}`)
}

console.log('')
say('common', chosen.common)
say('topic', chosen.topic)
const saved = [...chosen.common, ...chosen.topic].reduce((n, [, s]) => n + s.n - 1, 0)
console.log(`\n  writing them once instead of every time saves ${saved} segments`)
if (!conflictsOnly) console.log(`  written: content/phrases.json  (${harvested} taken from the pages, ${kept} kept)`)
if (ignored.size) console.log(`  ${ignored.size} phrase${ignored.size === 1 ? '' : 's'} skipped, listed in content/phrases-ignore.json`)

console.log('\n  common — stock wording, shared by the whole course:\n')
for (const [phrase, s] of chosen.common) {
  console.log(`    ${String(s.n).padStart(3)}× / ${String(s.pages.size).padStart(2)} lessons   ${JSON.stringify(phrase)}`)
}

console.log('\n  topic — repeated inside one lesson, kept with it:\n')
for (const [phrase, s] of chosen.topic.slice(0, 20)) {
  console.log(`    ${String(s.n).padStart(3)}× ${[...s.pages].join(', ').padEnd(28).slice(0, 28)} ${JSON.stringify(phrase).slice(0, 60)}`)
}
if (chosen.topic.length > 20) console.log(`    … and ${chosen.topic.length - 20} more`)

if (conflicts.length) {
  console.log(`\n  ${conflicts.length} phrase${conflicts.length === 1 ? '' : 's'} translated more than one way. The most`)
  console.log('  common reading was taken; edit content/phrases.json to change it:\n')
  for (const c of conflicts.slice(0, 10)) {
    console.log(`    ${JSON.stringify(c.phrase)}  (${c.lang})`)
    for (const [text, n] of c.candidates) console.log(`      ${String(n).padStart(3)}×  ${JSON.stringify(text)}`)
    console.log('')
  }
  if (conflicts.length > 10) console.log(`    … and ${conflicts.length - 10} more\n`)
}
