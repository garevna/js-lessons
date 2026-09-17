#!/usr/bin/env node
/**
 * Reads translations back from the DeepL round trip and writes them into the
 * message file — but only the segments that survived it intact.
 *
 *   node tools/i18n-import.js var eng
 *
 * Reads every translate/<page>.<lang>.NN.out.txt, matches each line to a key
 * through the index written by i18n-export, and checks the things a machine
 * translator is known to damage:
 *
 *   ⟦fN⟧ placeholders  hidden code and link targets — must return unchanged
 *   ** _ ^^ markers    emphasis — the count has to match the source
 *   ⟦BLOCK⟧            must never appear in a message at all
 *
 * A segment that fails a check is reported and left out of the message file,
 * so a damaged translation cannot reach the site. Nothing is guessed: an
 * unmatched number is an error, not an excuse to fall back on line order.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const PHRASES = path.join(root, 'content/phrases.json')
const OUT = path.join(root, 'translate')

const [typed, lang] = process.argv.slice(2)

if (!typed || !lang) {
  console.error('usage: node tools/i18n-import.js <page|--phrases> <lang>')
  process.exit(1)
}

const isBook = typed === '--phrases'

// Same reason as in the exporter: a name typed in the wrong case opens the
// right file on Windows and then writes a second one beside it, which on
// GitHub is a different file entirely.
const known = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))

const page = isBook
  ? 'phrases'
  : (known.includes(typed)
      ? typed
      : (known.find((k) => k.toLowerCase() === typed.toLowerCase()) || typed))

if (!isBook && page !== typed) console.log(`  (using "${page}" — that is how the page is spelled)`)

const indexFile = path.join(OUT, `${page}.${lang}.index.json`)
if (!fs.existsSync(indexFile)) {
  console.error(`no ${page}.${lang}.index.json — run i18n-export.js first`)
  process.exit(1)
}

const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'))
const keyOf = new Map(index.map(({ n, key }) => [n, key]))

// An export records a fingerprint of the Russian it sent, so a stale index
// can be recognised instead of quietly filing a translation under a
// paragraph that has changed since.
const digest = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8)
const hashOf = new Map(index.filter((x) => x.ru).map(({ n, ru }) => [n, ru]))
const stale = []

// One file per page holds all three languages; the common table holds the
// repeated phrases keyed by the Russian itself. Either way what the checks
// need is a key-to-Russian lookup.
// The book is two sections; flattened to section.id so a key reads here the
// same way it reads in a skeleton.
const book = isBook ? JSON.parse(fs.readFileSync(PHRASES, 'utf8')) : null
const entries = {}
if (isBook) {
  for (const section of ['common', 'topic']) {
    for (const [id, entry] of Object.entries(book[section] || {})) entries[`${section}.${id}`] = entry
  }
} else {
  Object.assign(entries, JSON.parse(fs.readFileSync(path.join(MESSAGES, `${page}.json`), 'utf8')))
}

const source = {}
for (const key of Object.keys(entries)) source[key] = entries[key].ru

const outFiles = fs.readdirSync(OUT)
  .filter((f) => f.startsWith(`${page}.${lang}.`) && f.endsWith('.out.txt'))
  .sort()

if (!outFiles.length) {
  console.error(`no ${page}.${lang}.NN.out.txt in translate/`)
  process.exit(1)
}

// Matching on the segment number only works while the numbers still mean what
// they meant when the file was sent. DeepL sometimes splits or merges a line
// and renumbers the whole list to keep it sequential, and what comes back
// looks perfectly well formed while every segment past the change sits one
// place from home. arrow-function.ua came back with 31 numbered lines for the
// 30 it was sent; three of them passed every other check, because the
// neighbour they had slid onto happened to carry the same placeholders, and
// they reached the live page as translations of the wrong paragraph.
//
// So the count is checked first, per file, and a mismatch stops the import
// instead of salvaging what it can. A renumbered list cannot be repaired by
// reading numbers out of it.
const numbered = (text) => text.split(/\r?\n/)
  .filter((line) => /^\s*\d+\s*[.)]/.test(line.trim())).length

const counts = []

for (const file of outFiles) {
  const part = Number((file.match(/\.(\d+)\.out\.txt$/) || [])[1])
  const sent = index.filter((x) => x.chunk === part).length
  // An index written before chunk numbers were recorded cannot answer this
  // per file. Those exports predate the check and go on as before.
  if (sent) counts.push({ file, sent, back: numbered(fs.readFileSync(path.join(OUT, file), 'utf8')) })
}

const miscounted = counts.filter((c) => c.sent !== c.back)

if (miscounted.length) {
  console.error(`\n  ${page} → ${lang}: the translation came back with a different number of lines than it was sent.\n`)
  for (const c of miscounted) {
    console.error(`    ${c.file}: sent ${c.sent} segments, got ${c.back} lines`)
  }
  console.error(`
  Nothing has been imported. This is not a partial translation: when the count
  changes, the list has been renumbered, and every segment after the change
  belongs to a different key than its number claims. The checks below cannot
  catch that, because a shifted line is still a valid translation of
  something — just not of the paragraph it would be filed under.

  Open the file beside the .txt it came from and find where they diverge: a
  line was either split in two or merged with its neighbour. Restore one line
  per segment, keep the original numbers, and run this again.
`)
  process.exit(1)
}

/** Everything that has to come back exactly as it went in. */
const placeholders = (s) => (s.match(/⟦f\d+⟧/g) || []).sort()

// HTML inside prose. Seven segments across the pages exported so far carry a
// <br> in the middle of a sentence — "он видит пиксели.<br>Эти…" — and a
// translator that drops one runs two lines together with nothing to show for
// it. The tag itself cannot be hidden the way inline code is: where the break
// falls is part of the sentence, and the translator has to see it.
const tags = (s) => (s.match(/<\/?[a-zA-Z][^>]*>/g) || [])
  .map((t) => t.toLowerCase())
  .sort()

// ![ico-20 speach] names an icon, and getIcon falls back to a default for any
// name it does not know. DeepL read the name as a word and corrected the
// author's typo to "speech", which is not an asset: 42 speech balloons across
// three English pages had quietly become the default icon. Nothing complained,
// because a default icon is exactly what the code shows when it cannot find
// the one it was asked for.
const icons = (s) => (s.match(/!\[ico-\d+ [\w:-]+\]/g) || []).sort()

// A URL must return character for character. DeepL usually leaves them alone,
// but "usually" is not a property worth relying on for a link.
const urls = (s) => (s.match(/https?:\/\/[^\s)*_`'"<]+/g) || []).sort()

// Italic is counted as whole _spans_, not as single underscores, and the
// boundary test is Unicode-aware.
//
// Counting underscores with \w was wrong in a way that only showed up on
// translation: \w is ASCII in JavaScript, so a marker beside "Локальная" was
// counted and the same marker beside "Local" was not. Every _курсив_ becoming
// _italic_ then looked like damage — the first real import rejected a perfectly
// good segment with "italic 2→0".
//
// Identifiers like snake_case are not a worry here: inline code is hidden as
// ⟦fN⟧ before a message is ever written.
const ITALIC = /(?<![\p{L}\p{N}_])_(?!\s)[^_\n]*(?<!\s)_(?![\p{L}\p{N}_])/gu

const marks = (s) => ({
  bold: (s.match(/\*\*/g) || []).length,
  small: (s.match(/\^\^/g) || []).length,
  italic: (s.match(ITALIC) || []).length
})

const accepted = {}
const problems = []
const added = []
const seen = new Set()

for (const file of outFiles) {
  const text = fs.readFileSync(path.join(OUT, file), 'utf8')

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    if (!line.trim()) continue

    const m = line.match(/^\s*(\d+)\s*[.)]\s*(.*)$/)
    if (!m) {
      problems.push({ file, why: 'line has no segment number', text: line.slice(0, 70) })
      continue
    }

    const n = Number(m[1])
    const translated = m[2]
    const key = keyOf.get(n)

    if (!key) {
      problems.push({ file, why: `number ${n} is not in the index`, text: translated.slice(0, 70) })
      continue
    }
    if (seen.has(n)) {
      problems.push({ file, why: `number ${n} appears twice`, text: translated.slice(0, 70) })
      continue
    }
    seen.add(n)

    const original = source[key]

    // The index was written by an export; the page has been edited since if a
    // key it names is gone. That happens legitimately — the phrase moved into
    // content/phrases.json, or the page was re-extracted and renumbered — and
    // it used to crash here on undefined rather than say so.
    if (original === undefined) {
      stale.push(n)
      problems.push({
        file,
        why: `${key} is no longer a key of this page — it moved to the phrase book, or the page was re-extracted`,
        text: translated.slice(0, 90),
        where: { file, n }
      })
      continue
    }

    // Worse than a missing key: a key that still exists and now holds
    // different Russian. The number would line up, every check would pass, and
    // the page would get a translation of a paragraph that has been rewritten.
    if (hashOf.has(n) && hashOf.get(n) !== digest(original)) {
      stale.push(n)
      problems.push({
        file,
        why: `the Russian under ${key} changed after this export`,
        original: original.slice(0, 90),
        text: translated.slice(0, 90),
        where: { file, n }
      })
      continue
    }

    const want = placeholders(original)
    const got = placeholders(translated)
    if (want.join() !== got.join()) {
      problems.push({
        file, why: `placeholders changed: expected ${want.join(' ') || 'none'}, got ${got.join(' ') || 'none'}`,
        original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
      })
      continue
    }

    if (translated.includes('⟦BLOCK')) {
      problems.push({
        file, why: 'a code block leaked into the message',
        original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
      })
      continue
    }

    const wantTags = tags(original)
    const gotTags = tags(translated)
    if (wantTags.join() !== gotTags.join()) {
      problems.push({
        file, why: `html changed: expected ${wantTags.join(' ') || 'none'}, got ${gotTags.join(' ') || 'none'}`,
        original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
      })
      continue
    }

    const wantIcons = icons(original)
    const gotIcons = icons(translated)
    if (wantIcons.join() !== gotIcons.join()) {
      problems.push({
        file, why: `an icon name changed: expected ${wantIcons.join(' ') || 'none'}, got ${gotIcons.join(' ') || 'none'}`,
        original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
      })
      continue
    }

    const wantUrls = urls(original)
    const gotUrls = urls(translated)
    if (wantUrls.join() !== gotUrls.join()) {
      problems.push({
        file, why: `a URL changed: expected ${wantUrls.join(' ') || 'none'}, got ${gotUrls.join(' ') || 'none'}`,
        original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
      })
      continue
    }

    // Emphasis differences are not all the same kind of problem.
    //
    //   unbalanced   an odd number of ** or ^^ — the page prints literal
    //                carets or asterisks. Always broken.
    //   lost         fewer markers than the Russian — the author's emphasis
    //                was dropped somewhere in the sentence.
    //   added        more markers, still in pairs. Valid markup and a page
    //                that renders: DeepL emphasising a term the Russian left
    //                plain, "Объект window" -> "The **window** object".
    //
    // Rejecting the third kind leaves the paragraph in Russian, which is
    // worse than a word in bold the author did not ask for. It is accepted
    // and listed instead, so it can be reviewed rather than lost.
    const a = marks(original)
    const b = marks(translated)
    const off = Object.keys(a).filter((k) => a[k] !== b[k])

    if (off.length) {
      const describe = off.map((k) => `${k} ${a[k]}→${b[k]}`).join(', ')
      const unbalanced = b.bold % 2 !== 0 || b.small % 2 !== 0
      const lost = Object.keys(a).some((k) => b[k] < a[k])

      if (unbalanced || lost) {
        problems.push({
          file,
          why: unbalanced
            ? `emphasis left unpaired (${describe})`
            : `emphasis lost (${describe})`,
          original: original.slice(0, 90), text: translated.slice(0, 90), where: { file, n }
        })
        continue
      }

      added.push({ key, why: describe, original: original.slice(0, 80), text: translated.slice(0, 80) })
    }

    accepted[key] = translated
  }
}

// DeepL leaves untranslatable pieces alone but does rewrite quotation marks
// into the target language's typographic pair. In prose that is an
// improvement. In a quiz it is a silent break: the answer has to match one of
// the variants character for character, and "0" against „0“ does not.
const quizProblems = []

// A quiz is three keys on one line of the skeleton:
//
//   →→→ {{p41}} | {{p42}} | {{p43}} →→→
//          question  variants  answer
//
// The pairing used to be read from the key names — quizAnswer3 went with
// quizVariants3 — which tied it to keys that said where a paragraph was. Ids
// say nothing now, deliberately, so the relationship is read where it is
// actually written down. It was always the better place: a rename cannot break
// it, and the skeleton is what the renderer uses too.
const quizTriples = (() => {
  if (isBook) return []
  let skeleton = ''
  try { skeleton = fs.readFileSync(path.join(root, 'content/lessons', `${page}.md`), 'utf8') } catch { return [] }

  const found = []
  for (const line of skeleton.split(/\r?\n/)) {
    if (!/^\s*→{3}/.test(line)) continue
    const keys = [...line.matchAll(/\{\{([a-zA-Z0-9_.]+)\}\}/g)].map((m) => m[1])
    if (keys.length === 3) found.push({ variants: keys[1], answer: keys[2] })
  }
  return found
})()

for (const { variants: variantsKey, answer: key } of quizTriples) {
  if (accepted[key] === undefined) continue

  const variants = (accepted[variantsKey] !== undefined ? accepted[variantsKey] : source[variantsKey])
  if (variants === undefined) continue

  // The two sides reach the page by different routes, and the comparison has
  // to follow both:
  //
  //   variants  go into value=${choiceVariant}, an attribute written without
  //             quotes, so a variant spelled 'Google' arrives as Google —
  //             the browser consumed the quotes as delimiters
  //   answer    goes through setAttribute('right-choice', …), which parses
  //             nothing, so it arrives exactly as written
  //
  // Unquoting both sides — or neither — reports mismatches that the browser
  // does not have. Checking this against the component instead of guessing
  // turned 39 confident findings into none.
  const unquote = (s) => {
    const t = s.trim()
    return (t.length > 1 && (t[0] === "'" || t[0] === '"') && t[t.length - 1] === t[0])
      ? t.slice(1, -1)
      : t
  }

  const answer = accepted[key].trim()
  const list = variants.split(',').map(unquote)

  if (!list.includes(answer)) {
    // Same answer, different quotes, is the common case — say so, because the
    // fix is to copy one of the variants rather than to retranslate.
    const loose = (s) => s.replace(/[«»„“”"']/g, '"')
    const why = list.some((v) => loose(v) === loose(answer))
      ? `quiz answer no longer matches a variant — only the quote characters differ: "${answer}" vs [${list.join(' | ')}]`
      : `quiz answer "${answer}" is not among the variants [${list.join(' | ')}]`

    quizProblems.push({ key, why })
    delete accepted[key]
    delete accepted[variantsKey]
  }
}

problems.push(...quizProblems.map((q) => ({ file: q.key, why: q.why, text: '' })))

const missing = index.filter(({ n }) => !seen.has(n))

// Written back into the file the text came out of: the page's own message
// file, where the entry for this language sits beside the Russian it
// translates, or the common table.
let done = 0
const total = Object.keys(source).length

if (isBook) {
  // entries holds the very objects the book does, so writing through them
  // updates the section each phrase came from.
  for (const [key, value] of Object.entries(accepted)) {
    if (entries[key]) entries[key][lang] = value
  }
  fs.writeFileSync(PHRASES, JSON.stringify(book, null, 2) + '\n')
  done = Object.values(entries).filter((e) => e[lang]).length
} else {
  for (const [key, value] of Object.entries(accepted)) {
    if (entries[key]) entries[key][lang] = value
  }
  fs.writeFileSync(path.join(MESSAGES, `${page}.json`), JSON.stringify(entries, null, 2) + '\n')
  done = Object.values(entries).filter((e) => e[lang]).length
}

console.log(`${page} → ${lang}`)
console.log(`  accepted:   ${Object.keys(accepted).length}`)
console.log(`  rejected:   ${problems.length}`)
console.log(`  not seen:   ${missing.length}`)
console.log(`  coverage:   ${done}/${total} (${Math.round(100 * done / total)}%)`)

// The import has only filed the text under content/. public/lessons is what
// the site serves, and it has not changed yet — which is exactly what "I
// checked locally and the translations did not appear" looked like.
if (Object.keys(accepted).length) {
  if (isBook) {
    console.log(`
  written to content/phrases.json. Every page pointing at these phrases shows
  them on the next build:

    npm run lessons`)
  } else {
    console.log(`
  written to content/messages/${page}.json — now build the page:
    node tools/i18n-build.js ${page}     (or npm run lessons for all of them)`)
  }
}

if (added.length) {
  console.log('\n  accepted, but carrying emphasis the Russian did not have:\n')
  for (const x of added.slice(0, 8)) {
    console.log(`    ${x.why}`)
    console.log(`      ru:  ${x.original}`)
    console.log(`      ${lang}: ${x.text}`)
    console.log('')
  }
  if (added.length > 8) console.log(`    … and ${added.length - 8} more\n`)
}

if (problems.length) {
  console.log('\n  rejected — the page keeps Russian for these:\n')
  for (const p of problems.slice(0, 12)) {
    console.log(`    ${p.why}`)
    if (p.original) console.log(`      ru: ${p.original}`)
    if (p.text) console.log(`      ${lang}: ${p.text}`)
    if (p.where && !stale.includes(p.where.n)) console.log(`      fix line ${p.where.n} of translate/${p.where.file}, then run this again`)
    console.log('')
  }
  if (problems.length > 12) console.log(`    … and ${problems.length - 12} more`)
}

if (stale.length) {
  console.log(`
  ${stale.length} segment${stale.length === 1 ? '' : 's'} could not be placed because the page changed after
  the export. Editing the .out.txt will not help — the numbers no longer mean
  what they meant. Export again and the queue will hold only what is still
  missing:

    node tools/i18n-export.js ${page} ${lang}`)

  // A key that vanished into the phrase book usually vanished with a
  // translation the author just produced, and it would be a shame to retype it.
  const book = (() => {
    try { return JSON.parse(fs.readFileSync(PHRASES, 'utf8')) } catch { return null }
  })()

  if (book) {
    const waiting = [...Object.values(book.common || {}), ...Object.values(book.topic || {})]
      .filter((e) => !e[lang]).length
    if (waiting) {
      console.log(`
  Some of them are phrases the book now owns. ${waiting} of its entries still have
  no ${lang}, and they are short:

    node tools/i18n-export.js --phrases ${lang}`)
    }
  }
}

if (missing.length) {
  console.log(`\n  segments with no translation in the .out.txt: ${missing.slice(0, 10).map((x) => x.n).join(', ')}${missing.length > 10 ? ' …' : ''}`)
}
