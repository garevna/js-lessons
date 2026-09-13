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

const [typed, lang] = process.argv.slice(2)

if (!typed || !lang) {
  console.error('usage: node tools/i18n-import.js <page> <lang>')
  process.exit(1)
}

// Same reason as in the exporter: a name typed in the wrong case opens the
// right file on Windows and then writes a second one beside it, which on
// GitHub is a different file entirely.
const known = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.ru.json'))
  .map((f) => f.replace('.ru.json', ''))

const page = known.includes(typed)
  ? typed
  : (known.find((k) => k.toLowerCase() === typed.toLowerCase()) || typed)

if (page !== typed) console.log(`  (using "${page}" — that is how the page is spelled)`)

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

// HTML inside prose. Seven segments across the pages exported so far carry a
// <br> in the middle of a sentence — "он видит пиксели.<br>Эти…" — and a
// translator that drops one runs two lines together with nothing to show for
// it. The tag itself cannot be hidden the way inline code is: where the break
// falls is part of the sentence, and the translator has to see it.
const tags = (s) => (s.match(/<\/?[a-zA-Z][^>]*>/g) || [])
  .map((t) => t.toLowerCase())
  .sort()

// A URL must return character for character. DeepL usually leaves them alone,
// but "usually" is not a property worth relying on for a link.
const urls = (s) => (s.match(/https?:\/\/[^\s)*_`'"<]+/g) || []).sort()

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

    const wantTags = tags(original)
    const gotTags = tags(translated)
    if (wantTags.join() !== gotTags.join()) {
      problems.push({
        file,
        why: `html changed: expected ${wantTags.join(' ') || 'none'}, got ${gotTags.join(' ') || 'none'}`,
        text: translated.slice(0, 70)
      })
      continue
    }

    const wantUrls = urls(original)
    const gotUrls = urls(translated)
    if (wantUrls.join() !== gotUrls.join()) {
      problems.push({
        file,
        why: `a URL changed: expected ${wantUrls.join(' ') || 'none'}, got ${gotUrls.join(' ') || 'none'}`,
        text: translated.slice(0, 70)
      })
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

// DeepL leaves untranslatable pieces alone but does rewrite quotation marks
// into the target language's typographic pair. In prose that is an
// improvement. In a quiz it is a silent break: the answer has to match one of
// the variants character for character, and "0" against „0“ does not.
const quizProblems = []

for (const key of Object.keys(accepted)) {
  const m = key.match(/^(.*\.)quizAnswer(\d+)$/)
  if (!m) continue

  const variantsKey = `${m[1]}quizVariants${m[2]}`
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
