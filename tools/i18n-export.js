#!/usr/bin/env node
/**
 * Prepares message text for translation in the DeepL web interface.
 *
 *   node tools/i18n-export.js var eng
 *   node tools/i18n-export.js --all eng
 *   node tools/i18n-export.js --common eng     the repeated phrases, once
 *
 * Writes translate/<page>.<lang>.NN.txt — numbered segments, chunked to stay
 * under the free web limit. Paste one file into DeepL, paste the result into
 * the matching .out.txt, and run i18n-import.js.
 *
 * Two kinds of segment never reach the file:
 *
 *   already translated    a key whose entry for this language is filled
 *   nothing to translate  a segment with no Cyrillic in it, or one whose
 *                         words are already answered in content/phrases.json
 *
 * The numbering is what survives the round trip. DeepL keeps line breaks most
 * of the time but not always, and a merged pair of lines would silently shift
 * every following translation onto the wrong key. The importer matches on the
 * number, checks that as many lines came back as went out, and refuses to
 * guess.
 */

const fs = require('fs')
const path = require('path')
const { core, dress } = require('./lib/phrases')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const PHRASES = path.join(root, 'content/phrases.json')
const OUT = path.join(root, 'translate')

// DeepL's free web translator takes 5000 characters at a time. Leave room for
// the numbering and for a translation coming out longer than the source.
const CHUNK = 3500

const [target, lang] = process.argv.slice(2)

if (!target || !lang) {
  console.error('usage: node tools/i18n-export.js <page|--all|--phrases> <lang>')
  process.exit(1)
}

if (lang === 'ru') {
  console.error('ru is the source language — nothing to export')
  process.exit(1)
}

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

// A segment written without a single Cyrillic letter is not Russian prose, and
// there is nothing in it to translate. Scanning the queue, all 2736 such
// segments were one of:
//
//   x && !x          code
//   $ git checkout   a shell command
//   true, undefined  quiz variants
//   | getKey |       a table row
//   ![ico-25 hw]     callout numbering
//   <div>x</div>     html
//
// These are precisely the segments a translator damages: DeepL will happily
// translate "cat", and rewrite the quotes inside a code sample. Copying them
// over untouched removes a third of the queue and most of the risk.
//
// HTML entities are stripped first — &nbsp; carries letters but a line holding
// only entities is spacing, not a sentence.
const needsTranslation = (s) => /[Ѐ-ӿ]/.test(
  s.replace(/⟦f\d+⟧/g, '').replace(/&[a-zA-Z]+;|&#\d+;/g, '')
)

fs.mkdirSync(OUT, { recursive: true })

/** Numbered chunks plus the index that says which number is which key. */
function writeChunks (name, segments) {
  const index = []
  const chunks = []
  let chunk = []
  let size = 0

  segments.forEach(([key, text], i) => {
    const n = i + 1
    const line = `${n}. ${text}`

    if (size + line.length > CHUNK && chunk.length) {
      chunks.push(chunk)
      chunk = []
      size = 0
    }

    chunk.push(line)
    size += line.length + 1
    index.push({ n, key, chunk: chunks.length + 1 })
  })

  if (chunk.length) chunks.push(chunk)

  chunks.forEach((lines, i) => {
    fs.writeFileSync(
      path.join(OUT, `${name}.${String(i + 1).padStart(2, '0')}.txt`),
      lines.join('\n') + '\n'
    )
  })

  fs.writeFileSync(path.join(OUT, `${name}.index.json`), JSON.stringify(index, null, 2) + '\n')
  return chunks.length
}

/* ----------------------------------------------------- the common phrases */

if (target === '--phrases') {
  const book = readJson(PHRASES)
  if (!book) {
    console.error('no content/phrases.json — run npm run phrases first')
    process.exit(1)
  }

  // Keyed by section and id, sent as Russian: the index maps the segment
  // number back to the key, so a phrase can be reworded without orphaning its
  // translation. Both sections go out together — a translator has no reason
  // to care which is stock wording and which belongs to one lesson.
  const todo = []
  for (const section of ['common', 'topic']) {
    for (const [id, v] of Object.entries(book[section] || {})) {
      if (!v[lang]) todo.push([`${section}.${id}`, v.ru])
    }
  }

  if (!todo.length) {
    console.log(`  every phrase in the book already has a ${lang} translation`)
    process.exit(0)
  }

  const files = writeChunks(`phrases.${lang}`, todo)
  const chars = todo.reduce((n, [, v]) => n + v.length, 0)

  console.log(`
  ${todo.length} repeated phrases, ${chars} characters, ${files} file(s).

  These are the headings and stock sentences that recur across the course.
  "Результат в консоли:" alone appears 33 times on 12 pages. Translate them
  once here and every page that uses them is filled in on its next export.

    1. open translate/phrases.${lang}.01.txt, copy it
    2. paste into DeepL, target language ${lang}
    3. save the answer as translate/phrases.${lang}.01.out.txt
    4. node tools/i18n-import.js --phrases ${lang}

  Keep them short. A heading translated as a whole sentence is worse than one
  left in Russian, because it will be reused everywhere.`)
  process.exit(0)
}

/* ------------------------------------------------------------- the pages */

const known = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .sort()

// Windows opens Classes.json when asked for classes.json, so a typed name in
// the wrong case works locally and then writes a second file beside the first.
// On GitHub, where case matters, that is a different file and the page loses
// its translation. Resolve to the name on disk instead.
const canonical = (name) => {
  if (known.includes(name)) return name
  const match = known.find((k) => k.toLowerCase() === name.toLowerCase())
  if (match) {
    console.log(`  (using "${match}" — that is how the page is spelled)`)
    return match
  }
  return name
}

const pages = target === '--all' ? known : [canonical(target)]
const book = readJson(PHRASES) || {}

// The book is keyed by id; looking a phrase up needs the other direction.
const byText = new Map()
for (const section of ['common', 'topic']) {
  for (const entry of Object.values(book[section] || {})) {
    if (entry && entry.ru) byText.set(entry.ru, entry)
  }
}

let totalSegments = 0
let totalChars = 0
let totalFiles = 0
let totalCopied = 0
let totalFromCommon = 0

for (const page of pages) {
  const file = path.join(MESSAGES, `${page}.json`)
  const entries = readJson(file)
  if (!entries) {
    console.error(`  ${page}: no ${page}.json — run i18n-extract first`)
    continue
  }

  const untranslated = Object.entries(entries).filter(([, e]) => !e[lang])

  let copied = 0
  let fromCommon = 0
  const todo = []

  for (const [key, entry] of untranslated) {
    // Nothing in it to translate: copy the Russian across as it stands.
    if (!needsTranslation(entry.ru)) {
      entry[lang] = entry.ru
      copied += 1
      continue
    }

    // Said before, somewhere else in the course. Take the agreed translation
    // and put it back inside whatever markup this occurrence happens to wear.
    const phrase = byText.get(core(entry.ru))
    if (phrase && phrase[lang]) {
      entry[lang] = dress(phrase[lang], entry.ru)
      fromCommon += 1
      continue
    }

    todo.push([key, entry.ru])
  }

  if (copied || fromCommon) {
    fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n')
  }

  totalCopied += copied
  totalFromCommon += fromCommon

  const filled = []
  if (copied) filled.push(`${copied} copied as-is`)
  if (fromCommon) filled.push(`${fromCommon} from the phrase book`)

  if (!todo.length) {
    console.log(`  ${page}: complete${filled.length ? ` (${filled.join(', ')})` : ''}`)
    continue
  }

  const files = writeChunks(`${page}.${lang}`, todo)
  const chars = todo.reduce((n, [, v]) => n + v.length, 0)

  totalSegments += todo.length
  totalChars += chars
  totalFiles += files

  console.log(
    `  ${page.padEnd(28)} ${String(todo.length).padStart(4)} segments` +
    `  ${String(chars).padStart(6)} chars` +
    `  ${files} file(s)` +
    (filled.length ? `  (+${filled.join(', +')})` : '')
  )
}

if (totalCopied || totalFromCommon) {
  console.log(`\n  filled in without asking DeepL: ${totalCopied} with nothing to translate, ${totalFromCommon} from content/phrases.json`)
}

if (!totalSegments) process.exit(0)

const page1 = pages.length === 1 ? pages[0] : '<page>'

console.log(`
  ╭──────────────────────────────────────────────────────────────────╮
  │  NOTHING IS TRANSLATED YET. This step only prepared the text.    │
  ╰──────────────────────────────────────────────────────────────────╯

  ${totalSegments} segments, ${totalChars} characters, ${totalFiles} file(s) written to

    ${OUT}

  The folder is in .gitignore — these are working files, so they will not
  show on GitHub and some editors dim or hide them. Open them from disk.

  Step 2 of 5 — translate. For each <name>.txt in that folder:
      open it, copy everything, paste into DeepL with target language ${lang}

  Step 3 of 5 — save. Put DeepL's answer next to the original, renamed:
      <name>.txt  ->  <name>.out.txt

  Step 4 of 5 — bring it back in:
      node tools/i18n-import.js ${page1} ${lang}

  Step 5 of 5 — build the page the site actually serves:
      npm run lessons

  Until step 4 runs, the page still counts as untranslated and will keep
  appearing in:  npm run i18n -- --todo
  Until step 5 runs, the translation exists only under content/ and the site
  goes on showing Russian.

  Keep the numbering, and keep one line per segment. The marks are hidden code
  and link targets — they must come back unchanged, and the importer checks
  both that and the line count.`)
