#!/usr/bin/env node
/**
 * Finds translations that sit under the wrong key, and puts back the ones it
 * can prove.
 *
 *   node tools/i18n-repair.js            what it would do, page by page
 *   node tools/i18n-repair.js <page>     one page, with every match shown
 *   node tools/i18n-repair.js --write    apply it
 *
 * Keys are positional — s2.p18 is the eighteenth paragraph of the third
 * section — so re-splitting a page into different sections moves every
 * paragraph's key while the translations stay on the old names. That is what
 * happened to async-await: the English for "Посмотрим, что делает await" is
 * filed two sections away, and the paragraph it now sits on is about something
 * else entirely. The translations are correct; only their addresses are wrong.
 *
 * What can be matched back, and what cannot:
 *
 *   ⟦fN⟧ and ![ico-NN name] survive translation unchanged, so a value
 *   carrying them can be matched to the Russian paragraph carrying the same
 *   ones. Plain prose carries no such mark and cannot be placed — DeepL does
 *   not leave fingerprints on a sentence.
 *
 * A match is only taken when it is the only one in both directions. The first
 * version of this took the only candidate for each displaced value, and
 * produced a wrong move within seven: two different values both fitted one
 * vacant key, and it took whichever it saw first.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')

const LANGS = ['eng', 'ua']

const args = process.argv.slice(2)
const write = args.includes('--write')
const only = args.find((a) => !a.startsWith('--'))

/** What a translation must keep, and what therefore identifies it. */
const marks = (s) => ({
  ph: (s.match(/⟦f\d+⟧/g) || []).sort(),
  ico: (s.match(/!\[ico-\d+ [\w:-]+\]/g) || []).sort(),
  br: (s.match(/<br>/g) || []).length
})

const print = (s) => JSON.stringify(marks(s))
const EMPTY = print('')

/** Enough of a mark to identify anything at all. */
const distinctive = (s) => {
  const m = marks(s)
  return m.ph.length > 0 || m.ico.length > 0
}

const plausible = (ru, text) =>
  text.length <= ru.length * 3 + 24 && text.length * 3 + 24 >= ru.length

/** One page, one language: what is displaced and where it belongs. */
function examine (entries, lang) {
  const displaced = []
  const vacant = []

  for (const [key, entry] of Object.entries(entries)) {
    if (!entry.ru) continue
    if (entry[lang]) {
      if (print(entry.ru) !== print(entry[lang])) displaced.push(key)
    } else {
      vacant.push(key)
    }
  }

  // Candidates both ways, so a tie can be seen rather than guessed through.
  const fits = new Map()      // displaced key -> [vacant keys]
  const claims = new Map()    // vacant key -> [displaced keys]

  for (const from of displaced) {
    const text = entries[from][lang]
    if (!distinctive(text)) continue

    const found = vacant.filter((to) =>
      print(entries[to].ru) === print(text) && plausible(entries[to].ru, text))

    if (!found.length) continue
    fits.set(from, found)
    for (const to of found) claims.set(to, [...(claims.get(to) || []), from])
  }

  const moves = []
  const ties = []

  for (const [from, found] of fits) {
    if (found.length > 1) { ties.push({ from, to: found }); continue }
    const to = found[0]
    if ((claims.get(to) || []).length > 1) { ties.push({ from, to: [to] }); continue }
    moves.push({ from, to })
  }

  const stuck = displaced.filter((k) => !moves.some((m) => m.from === k) && !ties.some((t) => t.from === k))

  return { displaced, vacant, moves, ties, stuck }
}

const pages = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((p) => !only || p === only)
  .sort()

const totals = { displaced: 0, moves: 0, ties: 0, stuck: 0 }
const rows = []
const detail = []

for (const page of pages) {
  const file = path.join(MESSAGES, `${page}.json`)
  const entries = JSON.parse(fs.readFileSync(file, 'utf8'))
  let touched = false

  for (const lang of LANGS) {
    const found = examine(entries, lang)
    if (!found.displaced.length) continue

    totals.displaced += found.displaced.length
    totals.moves += found.moves.length
    totals.ties += found.ties.length
    totals.stuck += found.stuck.length

    rows.push({ page, lang, ...found })

    for (const move of found.moves) {
      detail.push({
        page, lang, from: move.from, to: move.to,
        ru: entries[move.to].ru,
        text: entries[move.from][lang],
        wasOn: entries[move.from].ru
      })
    }

    if (write) {
      for (const move of found.moves) {
        entries[move.to][lang] = entries[move.from][lang]
        entries[move.from][lang] = ''
        touched = true
      }
      // Anything left displaced is a translation of something else; leaving it
      // in place is worse than falling back to Russian, which at least says so.
      for (const key of [...found.stuck, ...found.ties.map((t) => t.from)]) {
        entries[key][lang] = ''
        touched = true
      }
    }
  }

  if (write && touched) fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n')
}

/* ---------------------------------------------------------------- report */

const cut = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

if (only) {
  const mine = rows.filter((r) => r.page === only)
  if (!mine.length) {
    console.log(`\n  ${only}: ничего не смещено\n`)
    process.exit(0)
  }

  for (const r of mine) {
    console.log(`\n  ${r.page} — ${r.lang}`)
    console.log(`    не на своём месте ${r.displaced.length}, свободных ключей ${r.vacant.length}\n`)

    for (const m of r.moves.length ? r.moves : []) {
      const d = detail.find((x) => x.page === r.page && x.lang === r.lang && x.from === m.from)
      console.log(`    ${m.from}  →  ${m.to}`)
      console.log(`       лежит под : ${cut(d.wasOn, 64)}`)
      console.log(`       а переводит: ${cut(d.ru, 64)}`)
      console.log(`       текст      : ${cut(d.text, 64)}`)
      console.log('')
    }
    if (r.ties.length) console.log(`    неоднозначных (несколько кандидатов): ${r.ties.length}`)
    if (r.stuck.length) console.log(`    без зацепки (проза без плейсхолдеров): ${r.stuck.length}`)
  }
  process.exit(0)
}

rows.sort((a, b) => b.displaced.length - a.displaced.length)

console.log(`\n  ${write ? '' : 'ПРОБНЫЙ ПРОГОН — '}смещённых переводов: ${totals.displaced}`)
console.log(`    возвращается на место : ${totals.moves}`)
console.log(`    неоднозначно          : ${totals.ties}`)
console.log(`    без зацепки           : ${totals.stuck}`)
console.log(`\n  файл                                  смещено  вернуть  неясно  без зацепки`)

for (const r of rows.slice(0, 20)) {
  console.log(`  ${`${r.page}.${r.lang}`.padEnd(36)} ${String(r.displaced.length).padStart(7)}` +
    ` ${String(r.moves.length).padStart(8)} ${String(r.ties.length).padStart(7)} ${String(r.stuck.length).padStart(12)}`)
}
if (rows.length > 20) console.log(`  … ещё ${rows.length - 20} файлов`)

fs.writeFileSync(path.join(root, 'translate/repair-plan.json'), JSON.stringify({ totals, rows, detail }, null, 2))

console.log(`\n  подробности: translate/repair-plan.json`)
if (!write) console.log(`  node tools/i18n-repair.js <страница>   посмотреть одну`)
console.log(`  node tools/i18n-repair.js --write      применить\n`)
