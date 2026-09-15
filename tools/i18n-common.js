#!/usr/bin/env node
/**
 * The phrases that repeat across the course, translated once.
 *
 *   node tools/i18n-common.js            rebuild content/common.json
 *   node tools/i18n-common.js --conflicts   only report disagreements
 *
 * "Результат в консоли:" appears 33 times on 12 pages. Sending it to DeepL 33
 * times costs 33 answers, and they are not the same answer — a two-word
 * heading has no context, so it comes back as "Result", "Outcome" or "The
 * result depending on what surrounded it that day. Translating it once and
 * reusing it is less work and, more to the point, the only way it reads the
 * same on every page.
 *
 * The table is keyed by the phrase with its markup stripped, so "Результат",
 * "**Результат**" and "◘◘^^Результат^^◘◘" share one entry and each occurrence
 * gets its own markup back when the exporter fills it in.
 *
 * This is a translator's aid, not a layer the build knows about: the filled-in
 * text is written into the page's own message file, so a page still holds
 * every word it shows.
 */

const fs = require('fs')
const path = require('path')
const { core } = require('./lib/phrases')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const COMMON = path.join(root, 'content/common.json')

const LANGS = ['eng', 'ua']
const MIN = 2

const conflictsOnly = process.argv.includes('--conflicts')

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

// A phrase with no Cyrillic in it has nothing to translate: a bare number, a
// method name, a table rule. They repeat constantly and would fill the table
// with entries whose answer is the question.
const worthTranslating = (s) => /[Ѐ-ӿ]/.test(s.replace(/⟦f\d+⟧/g, '').replace(/&[a-zA-Z]+;|&#\d+;/g, ''))

// Translations scraped off the pages are only as good as the pages, and some
// of those pages are misaligned: "Результат" is filed with the English for a
// paragraph two lines further down. Two things rule that out cheaply.
//
//   placeholders  a phrase with no ⟦fN⟧ cannot have a translation with one
//   length        a translation runs longer or shorter than its source, but
//                 not four times longer — that is a different sentence
const placeholders = (s) => (s.match(/⟦f\d+⟧/g) || []).sort().join(' ')

const hasLetters = (s) => /[a-zA-Zа-яА-ЯёЁіїєґІЇЄҐ]/.test(s)

const plausible = (phrase, candidate) =>
  placeholders(phrase) === placeholders(candidate) &&
  hasLetters(candidate) === hasLetters(phrase) &&
  candidate.length <= phrase.length * 3 + 24 &&
  candidate.length * 3 + 24 >= phrase.length

const existing = readJson(COMMON) || {}

const pages = fs.readdirSync(MESSAGES).filter((f) => f.endsWith('.json')).sort()

/** phrase -> { n, pages:Set, seen: { eng: Map<text, count>, ua: ... } } */
const table = new Map()

for (const file of pages) {
  const page = file.replace(/\.json$/, '')
  const entries = readJson(path.join(MESSAGES, file)) || {}

  for (const entry of Object.values(entries)) {
    if (!entry.ru) continue
    const phrase = core(entry.ru)
    if (!phrase || !worthTranslating(phrase)) continue

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

const repeated = [...table.entries()]
  .filter(([, s]) => s.n >= MIN)
  .sort((a, b) => b[1].n - a[1].n)

const conflicts = []
const out = {}
let harvested = 0
let kept = 0

// Ids, not the phrase itself, because a skeleton points at them: content/
// lessons carry {{common.c17}} where a repeated phrase used to be spelled out,
// and an id that moved would silently change what a page says. An id is
// assigned once, by Russian text, and never reused.
const idOf = new Map()
let nextId = 0
for (const [id, entry] of Object.entries(existing)) {
  if (!entry || !entry.ru) continue
  idOf.set(entry.ru, id)
  const n = Number(String(id).replace(/^c/, ''))
  if (Number.isFinite(n) && n >= nextId) nextId = n + 1
}

for (const [phrase, slot] of repeated) {
  const entry = { ru: phrase, eng: '', ua: '' }
  const id = idOf.get(phrase) || `c${nextId++}`
  idOf.set(phrase, id)
  const before = existing[id] || {}

  for (const lang of LANGS) {
    // A translation already in the table wins: it was reviewed, the ones
    // scraped off the pages were not.
    if (before[lang]) {
      entry[lang] = before[lang]
      kept += 1
      continue
    }

    const candidates = [...slot.seen[lang].entries()]
      .filter(([text]) => plausible(phrase, text))
      .sort((a, b) => b[1] - a[1])
    if (!candidates.length) continue

    entry[lang] = candidates[0][0]
    harvested += 1

    if (candidates.length > 1) {
      conflicts.push({ phrase, lang, candidates })
    }
  }

  out[id] = entry
}

// A phrase that stopped repeating keeps its entry: a skeleton may still point
// at it, and dropping the id would break the page rather than tidy the table.
for (const [id, entry] of Object.entries(existing)) {
  if (!out[id]) out[id] = entry
}

if (!conflictsOnly) {
  fs.writeFileSync(COMMON, JSON.stringify(out, null, 2) + '\n')
}

const instances = repeated.reduce((n, [, s]) => n + s.n, 0)
const done = { eng: 0, ua: 0 }
for (const e of Object.values(out)) for (const l of LANGS) if (e[l]) done[l] += 1

console.log(`\n  ${repeated.length} phrases repeat ${MIN}+ times — ${instances} occurrences in all`)
console.log(`  translating them once saves ${instances - repeated.length} segments\n`)
console.log(`  eng: ${done.eng} of ${repeated.length} already have a translation`)
console.log(`  ua:  ${done.ua} of ${repeated.length}`)
if (!conflictsOnly) console.log(`\n  written: content/common.json  (${harvested} taken from the pages, ${kept} kept)`)

if (conflicts.length) {
  console.log(`\n  ${conflicts.length} phrase${conflicts.length === 1 ? '' : 's'} translated more than one way. The most`)
  console.log('  common reading was taken; edit content/common.json to change it:\n')
  for (const c of conflicts.slice(0, 12)) {
    console.log(`    ${JSON.stringify(c.phrase)}  (${c.lang})`)
    for (const [text, n] of c.candidates) {
      console.log(`      ${String(n).padStart(3)}×  ${JSON.stringify(text)}`)
    }
    console.log('')
  }
  if (conflicts.length > 12) console.log(`    … and ${conflicts.length - 12} more\n`)
}
