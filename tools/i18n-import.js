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

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const OUT = path.join(root, 'translate')

const [page, lang] = process.argv.slice(2)

if (!page || !lang) {
  console.error('usage: node tools/i18n-import.js <page> <lang>')
  process.exit(1)
}

const indexFile = path.join(OUT, `${page}.${lang}.index.json`)
if (!fs.existsSync(indexFile)) {
  console.error(`no ${page}.${lang}.index.json — run i18n-export.js first`)
  process.exit(1)
}

const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'))
const keyOf = new Map(index.map(({ n, key }) => [n, key]))

const source = JSON.parse(fs.readFileSync(path.join(MESSAGES, `${page}.ru.json`), 'utf8'))

const outFiles = fs.readdirSync(OUT)
  .filter((f) => f.startsWith(`${page}.${lang}.`) && f.endsWith('.out.txt'))
  .sort()

if (!outFiles.length) {
  console.error(`no ${page}.${lang}.NN.out.txt in translate/`)
  process.exit(1)
}

/** Everything that has to come back exactly as it went in. */
const placeholders = (s) => (s.match(/⟦f\d+⟧/g) || []).sort()
const marks = (s) => ({
  bold: (s.match(/\*\*/g) || []).length,
  small: (s.match(/\^\^/g) || []).length,
  italic: (s.match(/(?<![_\w])_(?![_\w])/g) || []).length
})

const accepted = {}
const problems = []
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

    const want = placeholders(original)
    const got = placeholders(translated)
    if (want.join() !== got.join()) {
      problems.push({
        file,
        why: `placeholders changed: expected ${want.join(' ') || 'none'}, got ${got.join(' ') || 'none'}`,
        text: translated.slice(0, 70)
      })
      continue
    }

    if (translated.includes('⟦BLOCK')) {
      problems.push({ file, why: 'a code block leaked into the message', text: translated.slice(0, 70) })
      continue
    }

    const a = marks(original)
    const b = marks(translated)
    const off = Object.keys(a).filter((k) => a[k] !== b[k])
    if (off.length) {
      problems.push({
        file,
        why: `emphasis markers differ (${off.map((k) => `${k} ${a[k]}→${b[k]}`).join(', ')})`,
        text: translated.slice(0, 70)
      })
      continue
    }

    accepted[key] = translated
  }
}

const missing = index.filter(({ n }) => !seen.has(n))

const file = path.join(MESSAGES, `${page}.${lang}.json`)
const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}

// Keys keep the order of the Russian source, so the file reads top to bottom
// like the page does and diffs stay legible.
const merged = {}
for (const key of Object.keys(source)) {
  const value = accepted[key] !== undefined ? accepted[key] : existing[key]
  if (value !== undefined) merged[key] = value
}

fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n')

const total = Object.keys(source).length
const done = Object.keys(merged).length

console.log(`${page} → ${lang}`)
console.log(`  accepted:   ${Object.keys(accepted).length}`)
console.log(`  rejected:   ${problems.length}`)
console.log(`  not seen:   ${missing.length}`)
console.log(`  coverage:   ${done}/${total} (${Math.round(100 * done / total)}%)`)

if (problems.length) {
  console.log('\n  rejected segments — these keep their previous value:')
  for (const p of problems.slice(0, 12)) {
    console.log(`    ${p.why}`)
    console.log(`      ${p.text}`)
  }
  if (problems.length > 12) console.log(`    … and ${problems.length - 12} more`)
}

if (missing.length) {
  console.log(`\n  segments with no translation in the .out.txt: ${missing.slice(0, 10).map((x) => x.n).join(', ')}${missing.length > 10 ? ' …' : ''}`)
}
