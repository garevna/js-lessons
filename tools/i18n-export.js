#!/usr/bin/env node
/**
 * Prepares message text for translation in the DeepL web interface.
 *
 *   node tools/i18n-export.js var eng
 *   node tools/i18n-export.js --all eng
 *
 * Writes translate/<page>.<lang>.NN.txt — numbered segments, chunked to stay
 * under the free web limit. Paste one file into DeepL, paste the result into
 * the matching .out.txt, and run i18n-import.js.
 *
 * Only segments that still need translating are exported: a key already
 * present in the target message file is skipped, so re-running after a partial
 * pass exports only what is left.
 *
 * The numbering is what survives the round trip. DeepL keeps line breaks most
 * of the time but not always, and a merged pair of lines would silently shift
 * every following translation onto the wrong key. The importer matches on the
 * number and refuses to guess.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const OUT = path.join(root, 'translate')

// DeepL's free web translator takes 5000 characters at a time. Leave room for
// the numbering and for a translation coming out longer than the source.
const CHUNK = 3500

const [target, lang] = process.argv.slice(2)

if (!target || !lang) {
  console.error('usage: node tools/i18n-export.js <page|--all> <lang>')
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

const known = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.ru.json'))
  .map((f) => f.replace('.ru.json', ''))
  .sort()

// Windows opens Classes.ru.json when asked for classes.ru.json, so a typed
// name in the wrong case works locally and then writes classes.ua.json beside
// Classes.ru.json. On GitHub, where case matters, that is a different file and
// the page loses its translation. Resolve to the name on disk instead.
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

fs.mkdirSync(OUT, { recursive: true })

let totalSegments = 0
let totalChars = 0
let totalFiles = 0

for (const page of pages) {
  const source = readJson(path.join(MESSAGES, `${page}.ru.json`))
  if (!source) {
    console.error(`  ${page}: no ${page}.ru.json — run i18n-extract first`)
    continue
  }

  const existing = readJson(path.join(MESSAGES, `${page}.${lang}.json`)) || {}

  // A key already in the target file has been handled — the importer only
  // writes what came back and passed its checks. Re-exporting keys whose
  // translation happens to read the same as the Russian would offer the same
  // words forever: "Результат:" is spelled identically in Ukrainian.
  const untranslated = Object.entries(source).filter(([k]) => !(k in existing))

  // A segment written without a single Cyrillic letter is not Russian prose,
  // and there is nothing in it to translate. Scanning the queue, all 2736 such
  // segments were one of:
  //
  //   x && !x          code
  //   $ git checkout   a shell command
  //   true, undefined  quiz variants
  //   | getKey |       a table row
  //   ![ico-25 hw]     callout numbering
  //   <div>↓</div>     html
  //
  // These are precisely the segments a translator damages: DeepL will happily
  // translate "cat", and rewrite the quotes inside a code sample. Copying them
  // over untouched removes a third of the queue and most of the risk.
  //
  // HTML entities are stripped first — &nbsp; carries letters but a line
  // holding only entities is spacing, not a sentence.
  const needsTranslation = (s) => /[Ѐ-ӿ]/.test(
    s.replace(/⟦f\d+⟧/g, '').replace(/&[a-zA-Z]+;|&#\d+;/g, '')
  )

  const copied = untranslated.filter(([, v]) => !needsTranslation(v))
  const todo = untranslated.filter(([, v]) => needsTranslation(v))

  if (copied.length) {
    const merged = { ...existing }
    for (const [k, v] of copied) merged[k] = v

    const ordered = {}
    for (const k of Object.keys(source)) if (k in merged) ordered[k] = merged[k]

    fs.writeFileSync(
      path.join(MESSAGES, `${page}.${lang}.json`),
      JSON.stringify(ordered, null, 2) + '\n'
    )
  }

  if (!todo.length) {
    console.log(`  ${page}: complete${copied.length ? ` (${copied.length} copied as-is)` : ''}`)
    continue
  }

  // An index file records which number maps to which key, so the importer
  // never has to infer the mapping from order alone. It also records which
  // chunk each segment went into, so the importer can tell whether a file
  // came back with the number of lines it was sent — see below.
  const index = []
  const chunks = []
  let chunk = []
  let size = 0

  todo.forEach(([key, text], i) => {
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
    const name = `${page}.${lang}.${String(i + 1).padStart(2, '0')}.txt`
    fs.writeFileSync(path.join(OUT, name), lines.join('\n') + '\n')
  })

  fs.writeFileSync(
    path.join(OUT, `${page}.${lang}.index.json`),
    JSON.stringify(index, null, 2) + '\n'
  )

  const chars = todo.reduce((n, [, v]) => n + v.length, 0)
  totalSegments += todo.length
  totalChars += chars
  totalFiles += chunks.length

  console.log(
    `  ${page.padEnd(28)} ${String(todo.length).padStart(4)} segments` +
    `  ${String(chars).padStart(6)} chars` +
    `  ${chunks.length} file${chunks.length > 1 ? 's' : ''}` +
    (copied.length ? `  (+${copied.length} copied as-is)` : '')
  )
}

if (!totalSegments) process.exit(0)

const page1 = pages.length === 1 ? pages[0] : '<page>'

console.log(`
  ╭──────────────────────────────────────────────────────────────────╮
  │  NOTHING IS TRANSLATED YET. This step only prepared the text.    │
  ╰──────────────────────────────────────────────────────────────────╯

  ${totalSegments} segments, ${totalChars} characters, ${totalFiles} file${totalFiles > 1 ? 's' : ''} written to

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

  Keep the numbering. The ⟦f0⟧ marks are hidden code and link targets —
  they must come back unchanged, and the importer checks that they did.`)
