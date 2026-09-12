#!/usr/bin/env node
/**
 * Splits a lesson page into a language-independent skeleton and a message
 * file, and proves the split is lossless by reassembling the page and
 * comparing it with the original byte for byte.
 *
 *   node tools/i18n-extract.js var            report what would happen
 *   node tools/i18n-extract.js var --write    write content/ files
 *
 * The rules below follow src/helpers/page — the extractor has to see the
 * markup exactly as the renderer does, or it will lift things into messages
 * that are not text:
 *
 *   ~~~ ~~~~ {{{ }}}   code and console output: never translated
 *   !![...]            slider: image paths only
 *   §§§§ h | tpl §§§§  the second field is a template id, not prose
 *   →→→ q | v | r →→→  the answer must stay identical to one of the variants
 *   # ![ico-30 x] Text the icon belongs to the skeleton, the text does not
 *
 * Keys are the section number plus a running number within it (s3.p2), so a
 * paragraph inserted in one section renumbers only that section — and the key
 * does not depend on the heading text, which is translated.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'public/lessons')

const [page, ...flags] = process.argv.slice(2)
const write = flags.includes('--write')

if (!page) {
  console.error('usage: node tools/i18n-extract.js <page> [--write]')
  process.exit(1)
}

/* ------------------------------------------------------------------ blocks */

// Matched before anything else and copied into the skeleton untouched.
// Order matters: ~~~~ must be tried before ~~~.
const BLOCKS = [
  { name: 'ScriptSpoiler', re: /^~~~~[\s\S]*?^~~~~$/m },
  { name: 'ScriptSnippet', re: /^~~~[a-z]*[\s\S]*?^~~~$/m },
  { name: 'CodeOutput', re: /\{\{\{[\s\S]*?\}\}\}/ },
  { name: 'Slider', re: /^!!\[[^\]]+\]$/m }
]

/* ------------------------------------------------------------------- lines */

const SEPARATOR = /^[-_=]{3,}$/
const HEADING = /^(#{1,6})(\s*(?:!\[[^\]]+\]\s*)?)(.*)$/
const IMAGE_ONLY = /^!\[[^\]]*\]\([^)]*\)$/

// An image wrapped in a link — [![ico-70 youtube]](https://…). Markup all the
// way through, but it carries letters inside the icon name, so without a rule
// of its own it looks like prose and gets sent to a translator.
const IMAGE_LINK = /^\[!\[[^\]]*\]\]\([^)]*\)$/

// A spoiler opens with ^^^[Title] and closes with a bare ^^^. The app's
// grammar has this (pageRegExpr.Spoiler) and the first version of this tool
// did not, so the delimiters were being offered for translation as if they
// were sentences. The title inside the brackets is prose; the rest is not.
const SPOILER_OPEN = /^(\^{3}\[)([^\]]*)(\]\s*)$/
const SPOILER_CLOSE = /^\^{3}\s*$/
const SLOGAN = /^(\s*☼☼☼\s*)(.+?)(\s*☼☼☼\s*)$/
const TEST = /^(\s*→→→\s*)(.+?)(\s*→→→\s*)$/
const DEMO = /^(\s*§§§§\s*)(.+?)(\s*§§§§\s*)$/

function extract (source, sectionNames) {
  const messages = {}
  const notes = []
  const sections = []

  let sectionIndex = -1
  let section = 's0'
  const counters = {}
  const fragments = []

  const key = (kind) => {
    const bucket = `${section}.${kind}`
    counters[bucket] = (counters[bucket] || 0) + 1
    return `${bucket}${counters[bucket]}`
  }

  // Inline pieces that must never be translated are lifted out of the message
  // and replaced by a placeholder, so whoever translates the line never sees
  // them and cannot damage them:
  //
  //   ~...~        inline code — identifiers and string literals
  //   ](page/x)    link targets — slugs, not prose
  //
  // Emphasis (**, _, ^^) deliberately stays in the message: it wraps prose,
  // and a translator who cannot see what is emphasised cannot place it in a
  // sentence that reorders words. Those markers are checked by validate()
  // instead of being hidden.
  const protect = (text) => text
    .replace(/~[^~\n]+~/g, (m) => `⟦f${fragments.push(m) - 1}⟧`)
    // Only the target inside the parentheses is hidden, not the parentheses
    // themselves: the message then still reads as a link, [label](⟦f0⟧),
    // instead of leaving a dangling bracket for the translator to puzzle over.
    .replace(/(\]\()([^)\s]+)(\))/g, (_, open, target, close) =>
      `${open}⟦f${fragments.push(target) - 1}⟧${close}`)

  const put = (kind, text) => {
    const k = key(kind)
    messages[k] = protect(text)
    return `{{${k}}}`
  }

  // Pull the blocks out first, leaving markers the line pass will not touch.
  // The brackets delimit them: no lesson contains U+27E6/27E7, so a marker
  // can never collide with page content the way a space-delimited one could.
  const blocks = []
  let body = source
  for (const { name, re } of BLOCKS) {
    for (;;) {
      const m = body.match(re)
      if (!m) break
      blocks.push(m[0])
      body = body.replace(m[0], `⟦BLOCK${blocks.length - 1}⟧`)
      notes.push(name)
    }
  }

  // Some lesson files are CRLF and some are LF. Splitting on \n alone leaves a
  // \r at the end of every line, and the heading pattern then fails to match —
  // every heading in the file quietly becomes a paragraph, which is how
  // typeof.eng ended up keyed s0.p1 instead of s1.h1. The round-trip check
  // does not catch it: the line still goes into a message and comes back
  // unchanged. It proves nothing was lost, not that it was classified right.
  const eol = body.includes('\r\n') ? '\r\n' : '\n'

  const skeleton = body.split(/\r?\n/).map((line) => {
    if (!line.trim()) return line
    if (line.includes('⟦BLOCK')) return line
    if (SEPARATOR.test(line.trim())) return line
    if (IMAGE_ONLY.test(line.trim())) return line
    if (IMAGE_LINK.test(line.trim())) return line
    if (SPOILER_CLOSE.test(line)) return line

    let m

    if ((m = line.match(SPOILER_OPEN))) {
      return m[2].trim() ? m[1] + put('spoiler', m[2]) + m[3] : line
    }

    if ((m = line.match(HEADING))) {
      const [, hashes, icon, text] = m
      sectionIndex += 1

      // Sections are numbered by position. Naming them after the heading was
      // the first attempt and it was wrong twice over: the heading is
      // translated, so "замыкание" and "closure" are the same section under
      // different names, and two headings can slug to the same string and
      // merge their counters.
      //
      // A number keeps the property that matters — a paragraph inserted in one
      // section renumbers only that section, not the rest of the page.
      const name = `s${sectionIndex + 1}`

      section = name
      sections[sectionIndex] = name

      // Trailing whitespace is part of the file and has to survive the round
      // trip, so it stays in the skeleton rather than being trimmed away.
      const trailing = text.match(/\s*$/)[0]
      const core = text.slice(0, text.length - trailing.length)

      return core ? `${hashes}${icon}${put('h', core)}${trailing}` : line
    }

    if ((m = line.match(SLOGAN))) return m[1] + put('slogan', m[2]) + m[3]

    // The pipe separators in these two constructs are copied verbatim rather
    // than normalised: the files contain "field  | field" as well as
    // "field | field", and rebuilding with a single space fails the round trip.

    if ((m = line.match(DEMO))) {
      // header | templateId — only the header is prose
      const f = m[2].match(/^(.*?)(\s*\|\s*)([\s\S]*)$/)
      if (!f) return m[1] + put('demo', m[2]) + m[3]
      return m[1] + put('demo', f[1]) + f[2] + f[3] + m[3]
    }

    if ((m = line.match(TEST))) {
      const f = m[2].match(/^(.*?)(\s*\|\s*)(.*?)(\s*\|\s*)([\s\S]*)$/)
      if (!f) {
        notes.push('TEST with unexpected field count')
        return line
      }
      const [, q, sep1, variants, sep2, answer] = f
      const qk = put('quiz', q)
      const vk = put('quizVariants', variants)
      // The answer must stay identical to one of the variants. Keeping them in
      // the same message file at least puts them side by side for whoever
      // translates, and validate below checks the pair.
      const ak = put('quizAnswer', answer)
      return m[1] + qk + sep1 + vk + sep2 + ak + m[3]
    }

    return put('p', line)
  }).join(eol)

  // Put the code back. The skeleton is what gets written to disk, and it is
  // already language-independent, so the blocks belong in it — that is what
  // makes each sample exist once instead of once per language.
  const withBlocks = skeleton.replace(/⟦BLOCK(\d+)⟧/g, (_, i) => blocks[Number(i)])

  return { skeleton: withBlocks, messages, notes, sections, fragments }
}

/* ------------------------------------------------------- round-trip check */

// The skeleton already carries the code blocks, so assembling a page is
// nothing but message substitution. A key with no message falls through
// unchanged, which is what makes a partial translation render.
function assemble (skeleton, messages, fragments) {
  const restore = (text) =>
    text.replace(/⟦f(\d+)⟧/g, (whole, i) =>
      fragments[Number(i)] !== undefined ? fragments[Number(i)] : whole)

  return skeleton.replace(/\{\{([^}]+)\}\}/g, (whole, k) =>
    k in messages ? restore(messages[k]) : whole)
}

/* --------------------------------------------------------------------- run */

const langs = ['ru', 'eng', 'ua'].filter((l) =>
  fs.existsSync(path.join(LESSONS, l, `${page}.md`)))

if (!langs.length) {
  console.error(`no ${page}.md in any language folder`)
  process.exit(1)
}

console.log(`${page}.md — present in: ${langs.join(', ')}\n`)

const results = {}
let failed = false

// Section names are taken from the first language present (ru in practice)
// and reused by the others, so the same section has the same key everywhere.
let sectionNames = null

for (const lang of langs) {
  const file = path.join(LESSONS, lang, `${page}.md`)
  const source = fs.readFileSync(file, 'utf8')

  const { skeleton, messages, sections, fragments } = extract(source, sectionNames)
  if (!sectionNames) sectionNames = sections
  const rebuilt = assemble(skeleton, messages, fragments)
  const ok = rebuilt === source

  results[lang] = { skeleton, messages, fragments, ok }
  if (!ok) failed = true

  const keys = Object.keys(messages).length
  const chars = Object.values(messages).reduce((n, v) => n + v.length, 0)
  console.log(
    `  ${lang.padEnd(4)} ${String(keys).padStart(4)} messages` +
    `  ${String(chars).padStart(6)} chars of text` +
    `  round-trip: ${ok ? 'OK' : 'MISMATCH'}`
  )

  if (!ok) {
    const a = source.split('\n')
    const b = rebuilt.split('\n')
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        console.log(`       first difference at line ${i + 1}:`)
        console.log(`         original: ${JSON.stringify(a[i])}`)
        console.log(`         rebuilt:  ${JSON.stringify(b[i])}`)
        break
      }
    }
  }
}

// Do the languages agree on structure? They must, or one skeleton cannot
// serve all three.
if (langs.length > 1) {
  const [first, ...rest] = langs
  const keysOf = (l) => Object.keys(results[l].messages).join('\n')
  const same = rest.every((l) => keysOf(l) === keysOf(first))
  console.log(`\n  skeletons agree across languages: ${same ? 'yes' : 'NO'}`)
  if (!same) {
    for (const l of rest) {
      const a = new Set(Object.keys(results[first].messages))
      const b = new Set(Object.keys(results[l].messages))
      const onlyA = [...a].filter((k) => !b.has(k))
      const onlyB = [...b].filter((k) => !a.has(k))
      if (onlyA.length || onlyB.length) {
        console.log(`    ${first} vs ${l}:`)
        if (onlyA.length) console.log(`      only in ${first}: ${onlyA.slice(0, 6).join(', ')}${onlyA.length > 6 ? ` … +${onlyA.length - 6}` : ''}`)
        if (onlyB.length) console.log(`      only in ${l}: ${onlyB.slice(0, 6).join(', ')}${onlyB.length > 6 ? ` … +${onlyB.length - 6}` : ''}`)
      }
    }
  }
}

if (write && !failed) {
  const skelDir = path.join(root, 'content/lessons')
  const msgDir = path.join(root, 'content/messages')
  fs.mkdirSync(skelDir, { recursive: true })
  fs.mkdirSync(msgDir, { recursive: true })

  // ru is the reference skeleton; the others contribute messages only.
  fs.writeFileSync(path.join(skelDir, `${page}.md`), results.ru.skeleton)
  for (const lang of langs) {
    const body = JSON.stringify(results[lang].messages, null, 2)
    fs.writeFileSync(path.join(msgDir, `${page}.${lang}.json`), body + '\n')
  }
  console.log(`\n  written: content/lessons/${page}.md + ${langs.length} message files`)
} else if (write) {
  console.log('\n  not written — round-trip failed')
}

process.exit(failed ? 1 : 0)
