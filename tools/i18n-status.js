#!/usr/bin/env node
/**
 * What is translated, what is not, and what is waiting on DeepL.
 *
 *   node tools/i18n-status.js           every page
 *   node tools/i18n-status.js --todo    only pages with work left
 *   node tools/i18n-status.js --done    only finished pages
 *   node tools/i18n-status.js --next    the shortest unfinished pages first
 *
 * A page is one file holding all three languages per key. A key counts as
 * translated when its entry for that language is not empty — which is what the
 * importer writes when a translation comes back and passes its checks, and
 * what the exporter writes for a segment with nothing in it to translate.
 *
 * The arrow marks a page that has been exported and is waiting for its
 * .out.txt, so the folder listing is not something to keep comparing by hand.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const OUT = path.join(root, 'translate')

const LANGS = ['eng', 'ua']

const flags = process.argv.slice(2)
const only = flags.find((f) => ['--todo', '--done', '--next'].includes(f))

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const exported = fs.existsSync(OUT) ? fs.readdirSync(OUT) : []

const pages = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .sort()

const rows = pages.map((page) => {
  const entries = readJson(path.join(MESSAGES, `${page}.json`)) || {}
  const values = Object.values(entries)
  const total = values.length

  const per = {}
  for (const lang of LANGS) {
    const done = values.filter((e) => e[lang]).length

    const waiting = exported.some((f) => f.startsWith(`${page}.${lang}.`) && f.endsWith('.txt') && !f.endsWith('.out.txt')) &&
      !exported.some((f) => f.startsWith(`${page}.${lang}.`) && f.endsWith('.out.txt'))

    per[lang] = { done, waiting }
  }

  return { page, total, per }
})

const pct = (done, total) => total ? Math.round(100 * done / total) : 100
const complete = (r) => LANGS.every((l) => r.per[l].done >= r.total)

let shown = rows
if (only === '--todo' || only === '--next') shown = rows.filter((r) => !complete(r))
if (only === '--done') shown = rows.filter(complete)
if (only === '--next') {
  const left = (r) => LANGS.reduce((n, l) => n + (r.total - r.per[l].done), 0)
  shown = shown.sort((a, b) => left(a) - left(b))
}

const width = Math.max(12, ...shown.map((r) => r.page.length))

console.log('')
console.log(`  ${'page'.padEnd(width)}  ${'keys'.padStart(5)}   ${LANGS.map((l) => l.padStart(8)).join('')}`)
console.log(`  ${'─'.repeat(width)}  ${'─'.repeat(5)}   ${'─'.repeat(8 * LANGS.length)}`)

for (const r of shown) {
  const cells = LANGS.map((l) => {
    const { done, waiting } = r.per[l]
    const value = r.total ? `${pct(done, r.total)}%` : '—'
    return `${value}${waiting ? ' →' : '  '}`.padStart(8)
  }).join('')

  console.log(`  ${r.page.padEnd(width)}  ${String(r.total).padStart(5)}   ${cells}`)
}

const totals = { keys: rows.reduce((n, r) => n + r.total, 0) }
for (const lang of LANGS) totals[lang] = rows.reduce((n, r) => n + Math.min(r.per[lang].done, r.total), 0)

console.log(`  ${'─'.repeat(width)}  ${'─'.repeat(5)}   ${'─'.repeat(8 * LANGS.length)}`)
console.log(
  `  ${`${shown.length} of ${rows.length} pages`.padEnd(width)}  ${String(totals.keys).padStart(5)}   ` +
  LANGS.map((l) => `${pct(totals[l], totals.keys)}%  `.padStart(8)).join('')
)

const waitingCount = rows.reduce(
  (n, r) => n + LANGS.filter((l) => r.per[l].waiting).length, 0)

console.log('')
for (const lang of LANGS) {
  const left = totals.keys - totals[lang]
  console.log(`  ${lang}: ${totals[lang]} of ${totals.keys} translated, ${left} to go`)
}

// The shared phrases are not in any page's count, and they are the cheapest
// work on the list: 274 short lines that between them stand in for 877
// occurrences across the course.
const common = readJson(path.join(root, 'content/common.json'))
if (common) {
  const all = Object.values(common)
  const short = LANGS.map((l) => `${l} ${all.filter((e) => e[l]).length}/${all.length}`).join(', ')
  const behind = LANGS.filter((l) => all.some((e) => !e[l]))
  console.log(`\n  shared phrases (content/common.json): ${short}`)
  if (behind.length) {
    console.log(`  these are the cheapest segments in the course — one short line each,`)
    console.log(`  reused everywhere:  node tools/i18n-export.js --common ${behind[0]}`)
  }
}

if (waitingCount) {
  const example = rows.find((r) => LANGS.some((l) => r.per[l].waiting))
  const lang = LANGS.find((l) => example.per[l].waiting)

  console.log(`
  →  ${waitingCount} page${waitingCount > 1 ? 's have' : ' has'} been exported but not yet translated.
     Exporting only writes the text out; the page stays untranslated until
     DeepL's answer is saved as .out.txt and imported. For ${example.page}:

       1. open translate/${example.page}.${lang}.01.txt, copy it
       2. paste into DeepL, target language ${lang}
       3. save the answer as translate/${example.page}.${lang}.01.out.txt
       4. node tools/i18n-import.js ${example.page} ${lang}
       5. npm run lessons   — importing files the text under content/;
                              this is what writes public/lessons/`)
}
console.log('')
