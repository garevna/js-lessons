#!/usr/bin/env node
/**
 * Removes the hand-written caption above a ~~~console block.
 *
 * The heading is rendered by the block itself now (createConsoleHeader), so
 * the line above it is either a duplicate of that heading or a name for what
 * was printed — and in 123 places it is neither, but a sentence belonging to
 * the lesson. Those are left alone.
 *
 *   node tools/console-headers.js           report only
 *   node tools/console-headers.js --write   remove them
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const DIR = path.join(root, 'content/lessons')
const book = JSON.parse(fs.readFileSync(path.join(root, 'content/phrases.json'), 'utf8'))

const write = process.argv.includes('--write')

/** A caption that says nothing the rendered heading does not already say. */
const RESULTISH = /^(результат|результат:|результат в консоли:?|результат у консолі:?|result|result:|result in the console:?|the result of code execution:?)$/i

/**
 * A caption that is a bare identifier: the name of what was printed.
 *
 * It has to contain a letter. Underscores are identifier characters, so a
 * horizontal rule — a line of nothing but underscores — matched this and was
 * about to be deleted as if it were a variable name.
 */
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*(\.[A-Za-z_$][A-Za-z0-9_$]*)*$/
const isName = (text) => IDENTIFIER.test(text) && /[A-Za-z]/.test(text)

/**
 * Two pages print to two consoles in turn — a shell and the browser's — and
 * the caption is what says which. The rendered heading cannot, so they keep
 * the caption they have.
 */
// No \b: it is an ASCII word boundary, so \bбраузер never matches — the
// character before it is not a word character either, and the whole caption
// slipped through as ordinary prose.
const NAMES_A_CONSOLE = /bash|shell|browser|браузер|броузер/i

/** The same decorations, whether they sit in the skeleton or in the message. */
const strip = (text) => text
  .replace(/!\[ico-\d+ [a-z_-]+\]/gi, '')
  .replace(/\{\{[a-zA-Z0-9_.]+\}\}/g, '')
  .replace(/[◘*^~`[\]:]/g, '')
  .trim()

const textOf = (page, key) => {
  if (key.includes('.')) {
    const [section, id] = key.split('.')
    return (book[section] && book[section][id] && book[section][id].ru) || ''
  }
  const file = path.join(root, 'content/messages', `${page}.json`)
  if (!fs.existsSync(file)) return ''
  const messages = JSON.parse(fs.readFileSync(file, 'utf8'))
  return (messages[key] && messages[key].ru) || ''
}

const removed = { caption: [], name: [] }
const kept = { prose: [], spoiler: [], none: [], named: [] }

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.md')) continue

  const page = file.replace(/\.md$/, '')
  const full = path.join(DIR, file)
  const source = fs.readFileSync(full, 'utf8')
  const eol = source.includes('\r\n') ? '\r\n' : '\n'
  const lines = source.split(/\r?\n/)
  const drop = new Set()

  for (let i = 0; i < lines.length; i++) {
    if (!/^~~~console\s*$/.test(lines[i])) continue

    let j = i - 1
    while (j >= 0 && lines[j].trim() === '') j--
    const prev = j >= 0 ? lines[j].trim() : ''
    const where = `${file}:${j + 1}`

    if (prev === '' || prev === '~~~') { kept.none.push(where); continue }
    if (prev.startsWith('^^^')) { kept.spoiler.push([where, prev]); continue }

    const keys = [...prev.matchAll(/\{\{([a-zA-Z0-9_.]+)\}\}/g)].map((m) => m[1])

    // What is actually being said, once the ◘◘ border, the bold, the
    // small-caps and the icon are taken off. A key says it in the message
    // file rather than in the skeleton, and the message is decorated too:
    // {{p67}} is "**результат**", which is the same caption as **результат**.
    const bare = keys.length === 1 && strip(prev) === ''
      ? strip(textOf(page, keys[0]))
      : strip(prev)

    // Everything the caption says that a key does not carry — the icon and
    // any words written beside the key. web-soket wrote its own heading here,
    // bash icon and all.
    const around = keys.length ? strip(prev.replace(/!\[ico-\d+ [a-z_-]+\]/gi, '')) : ''

    if (NAMES_A_CONSOLE.test(prev) || NAMES_A_CONSOLE.test(bare)) {
      kept.named.push([where, prev, bare])
      continue
    }

    if (RESULTISH.test(bare) && around === '') {
      drop.add(j)
      removed.caption.push([where, prev, bare])
      continue
    }

    if (!keys.length && isName(bare)) {
      drop.add(j)
      removed.name.push([where, prev, bare])
      continue
    }

    kept.prose.push([where, prev, bare])
  }

  if (!drop.size || !write) continue

  const out = lines.filter((_, index) => !drop.has(index)).join(eol)
  // Removing a line can leave three blank lines where the block was spaced.
  fs.writeFileSync(full, out.replace(new RegExp(`(${eol}){3,}`, 'g'), eol + eol))
}

const show = (title, rows) => {
  console.log(`\n${title}: ${rows.length}`)
  for (const row of rows) {
    console.log(`  ${row[0].padEnd(36)} ${JSON.stringify(row[1]).slice(0, 62)}`)
  }
}

console.log(write ? 'REMOVED' : 'WOULD REMOVE (dry run — pass --write)')
show('captions that repeat the heading', removed.caption)
show('names of what was printed', removed.name)
show('kept, because it says which console', kept.named)
console.log(`
left alone: ${kept.prose.length} sentences, ${kept.named.length} naming a console, ${kept.spoiler.length} spoiler headers, ${kept.none.length} blocks with no caption
`)
