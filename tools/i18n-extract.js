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
 * Keys are ids — p1, p2 — handed out once and never reused, and they say
 * nothing about where a paragraph sits. The order of the page lives in the
 * skeleton, where it is visible. Inserting a paragraph renumbers nothing;
 * deleting one leaves a gap, which costs nothing.
 *
 * They used to be positional, s3.p2 meaning the second paragraph of the fourth
 * section, and that is what let 365 translations end up under keys they did not
 * translate: re-splitting a page moved every paragraph's address at once while
 * the translations stayed on the old ones.
 *
 * A paragraph is recognised on re-extraction by its Russian text. Edit the
 * Russian and it is a new paragraph, which is the honest answer — its
 * translation was of the old words.
 */

const fs = require('fs')
const path = require('path')
const { dereference } = require('./lib/phrase-refs')

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
// The target may itself contain parentheses — several lessons write
// ![](createPath('images', 'x.png')), calling a helper inside the image
// syntax — so the target is matched greedily up to the final bracket.
const IMAGE_ONLY = /^!\[[^\]]*\]\(.*\)$/

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

// A grid is delimited by @@@@ on its own line (pageRegExpr.Grid). Only the
// delimiters are markup: 43 of the 65 grids in the course hold prose between
// them, so the grid cannot be treated as one opaque block the way code is —
// its contents go through the line rules like anything else.
const GRID_DELIMITER = /^@{4}\s*$/

// A run of lines on the black ground is fenced by •••• on a line of its own
// (pageRegExpr.BlackBlock). Like a grid, only the fences are markup: what sits
// between them is the prose the block exists to show, one key per line.
// The opening fence may name an icon — •••• bash, •••• none — the way a grid
// fence names a column count, so the name is markup too.
const BLACK_DELIMITER = /^\s*•{4}\s*[a-z_-]*\s*$/

// A line that is nothing but an HTML tag — <img src="…" width="120"/>. The
// letters live in the attribute names and the URL, so without a rule it reads
// as prose.
const HTML_ONLY = /^<[^>]+>$/
const SLOGAN = /^(\s*☼☼☼\s*)(.+?)(\s*☼☼☼\s*)$/
const TEST = /^(\s*→→→\s*)(.+?)(\s*→→→\s*)$/
const DEMO = /^(\s*§§§§\s*)(.+?)(\s*§§§§\s*)$/

function extract (source, sectionNames, refDecisions, sharedFragments) {
  const messages = {}
  const notes = []
  const sections = []

  let sectionIndex = -1
  let section = 's0'
  const counters = {}
  // One table per page, shared by every language.
  const fragments = sharedFragments || []

  // Whether each content line became a message, in order. The reference
  // language decides; the others replay it.
  const decisions = []
  let contentIndex = -1

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
  // Reuse the entry when this exact fragment is already in the table, so every
  // language agrees on what ⟦f5⟧ means, and append only what is new. Without
  // that, each language numbered its own table: a page could end up holding
  // messages from two numbering spaces — its own translation and segments
  // imported from DeepL, which carry the Russian numbering — and a placeholder
  // would resolve to the wrong snippet.
  const hide = (value) => {
    const at = fragments.indexOf(value)
    return `⟦f${at === -1 ? fragments.push(value) - 1 : at}⟧`
  }

  const protect = (text) => text
    // The word is hidden, the markers around it are not. A fragment that
    // carried its own ~ ~ made the formatting a property of the word instead
    // of the place it appears, and on the black ground a code box is exactly
    // wrong — light, and larger than the text around it. Kept outside, the
    // same fragment reads ~⟦f7⟧~ in prose and **_⟦f7⟧_** inside a black block.
    .replace(/~([^~\n]+)~/g, (_, inner) => `~${hide(inner)}~`)
    // Only the target inside the parentheses is hidden, not the parentheses
    // themselves: the message then still reads as a link, [label](⟦f0⟧),
    // instead of leaving a dangling bracket for the translator to puzzle over.
    .replace(/(\]\()([^)\s]+)(\))/g, (_, open, target, close) =>
      `${open}${hide(target)}${close}`)

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
    if (GRID_DELIMITER.test(line)) return line
    if (BLACK_DELIMITER.test(line)) return line
    if (HTML_ONLY.test(line.trim())) return line

    // Everything past this point is a content line: not a separator, not an
    // image, not markup. Whether it becomes a message is decided once, by the
    // reference language, and replayed by the others.
    //
    // The test is "does the Russian hold any Cyrillic". A line without it is
    // not Russian prose — code, a shell command, a table of method names, quiz
    // variants — it reads the same in every language and belongs in the
    // skeleton. Giving it a key made each language carry an identical copy;
    // practice-03 came out with English and Ukrainian files holding one entry
    // between them, "![](⟦f7⟧))".
    //
    // The decision cannot be taken per language: an English file has no
    // Cyrillic at all, so applying this test to it would discard every
    // translation in the file.
    contentIndex += 1

    const translatable = refDecisions
      ? refDecisions[contentIndex] !== false
      : /[Ѐ-ӿ]/.test(line.replace(/&[a-zA-Z]+;|&#\d+;/g, ''))

    decisions[contentIndex] = translatable
    if (!translatable) return line

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

  return { skeleton: withBlocks, messages, notes, sections, fragments, decisions }
}

/* ------------------------------------------------------- round-trip check */

// The skeleton already carries the code blocks, so assembling a page is
// nothing but message substitution. A key with no message falls through
// unchanged, which is what makes a partial translation render.
function assemble (skeleton, messages, fragments) {
  const restore = (text) =>
    text.replace(/⟦f(\d+)⟧/g, (whole, i) =>
      fragments[Number(i)] !== undefined ? fragments[Number(i)] : whole)

  return skeleton.replace(/(?<!\{)\{\{([a-zA-Z0-9_.]+)\}\}(?!\})/g, (whole, k) =>
    k in messages ? restore(messages[k]) : whole)
}

/* --------------------------------------------------------------------- run */

// A page being written for the first time has nowhere sensible to live yet:
// public/lessons is generated, and putting a source file into the output
// directory to have it read back out is a confusing way to start.
//
// So a new page goes in content/drafts/<name>.md, in Russian, written as an
// ordinary lesson. The extractor takes it apart into a skeleton and messages
// like any other, and the draft can be deleted afterwards — everything it held
// is in content/ by then.
const DRAFTS = path.join(root, 'content/drafts')

const draft = path.join(DRAFTS, `${page}.md`)
const isDraft = fs.existsSync(draft)

const langs = isDraft
  ? ['ru']
  : ['ru', 'eng', 'ua'].filter((l) => fs.existsSync(path.join(LESSONS, l, `${page}.md`)))

const sourceOf = (lang) => isDraft ? draft : path.join(LESSONS, lang, `${page}.md`)

if (!langs.length) {
  console.error(`no ${page}.md — looked in content/drafts/ and in public/lessons/{ru,eng,ua}/`)
  process.exit(1)
}

console.log(isDraft
  ? `${page}.md — draft`
  : `${page}.md — present in: ${langs.join(', ')}\n`)

const results = {}
let failed = false

// Section names, and the decision about which lines are translatable at all,
// are taken from the first language present (ru in practice) and reused by the
// others — so the same paragraph carries the same key in every language.
let sectionNames = null
let refDecisions = null
let sharedFragments = null

for (const lang of langs) {
  const file = sourceOf(lang)
  const source = fs.readFileSync(file, 'utf8')

  const { skeleton, messages, sections, fragments, decisions } =
    extract(source, sectionNames, refDecisions, sharedFragments)

  if (!sectionNames) sectionNames = sections
  if (!refDecisions) refDecisions = decisions
  if (!sharedFragments) sharedFragments = fragments
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

  // The fragment table has to reach disk too. Without it the messages hold
  // ⟦f5⟧ references with nothing to resolve them against, and content/ cannot
  // rebuild a page at all.
  const fragDir = path.join(root, 'content/fragments')
  fs.mkdirSync(fragDir, { recursive: true })
  fs.writeFileSync(
    path.join(fragDir, `${page}.json`),
    JSON.stringify(sharedFragments, null, 2) + '\n'
  )


  const msgFile = path.join(msgDir, `${page}.json`)
  let existing = {}
  try { existing = JSON.parse(fs.readFileSync(msgFile, 'utf8')) } catch {}

  // A paragraph is recognised by its Russian text, with the fragment numbers
  // blurred: ⟦f5⟧ becoming ⟦f6⟧ because a link two paragraphs up started being
  // hidden is not a different paragraph, and losing an id over it would throw
  // away the translation for no reason.
  const shape = (s) => s.replace(/⟦f\d+⟧/g, '⟦f⟧')

  const free = new Map()
  let next = 1

  for (const [id, entry] of Object.entries(existing)) {
    const n = Number(String(id).replace(/^p/, ''))
    if (Number.isFinite(n) && n >= next) next = n + 1
    if (!entry || !entry.ru) continue
    const k = shape(entry.ru)
    free.set(k, [...(free.get(k) || []), id])
  }

  // Two paragraphs can hold the same Russian, so ids are taken in the order
  // they appear rather than by lookup alone.
  const idFor = (ru) => {
    const waiting = free.get(shape(ru))
    if (waiting && waiting.length) return waiting.shift()
    return `p${next++}`
  }

  // Translations extracted from the built pages are only usable while those
  // pages still have the Russian page's structure. When they do not — the
  // Russian was edited and the others have not been rebuilt — the keys they
  // produce describe the old shape, and taking them would file each
  // translation under whatever paragraph now holds its number.
  const structureAgrees = langs.length === 1 ||
    langs.every((l) => Object.keys(results[l].messages).join('\n') === Object.keys(results.ru.messages).join('\n'))

  // Repeated phrases leave the page before ids are handed out, so a phrase
  // that lives in the book never burns an id — otherwise every re-extraction
  // would hand out fresh numbers for text that is not going to be kept, and
  // the numbering would climb for no reason.
  let skeletonOut = results.ru.skeleton
  let entriesOut = {}
  for (const [key, ru] of Object.entries(results.ru.messages)) entriesOut[key] = { ru, eng: '', ua: '' }
  let referenced = 0

  const commonTable = (() => {
    try { return JSON.parse(fs.readFileSync(path.join(root, 'content/phrases.json'), 'utf8')) } catch { return null }
  })()

  if (commonTable) {
    const result = dereference(skeletonOut, entriesOut, commonTable)
    skeletonOut = result.skeleton
    entriesOut = result.entries
    referenced = result.moved.length
  }

  // Now the page holds only what it will keep, and each paragraph can be given
  // its id and its translations.
  const out = {}
  const rename = new Map()
  let carried = 0
  let dropped = 0
  let fresh = 0

  for (const key of Object.keys(entriesOut)) {
    const ru = entriesOut[key].ru
    const id = idFor(ru)
    rename.set(key, id)
    if (!existing[id]) fresh += 1

    const fromPage = structureAgrees ? results : null
    const previous = existing[id] || {}
    const entry = { ru, eng: '', ua: '' }

    for (const l of ['eng', 'ua']) {
      let extracted = fromPage && fromPage[l] ? fromPage[l].messages[key] : undefined

      // A built page shows Russian wherever the translation is missing, so a
      // value extracted back out of it that equals the Russian is the
      // fallback, not a translation. Storing it would count the paragraph as
      // done and keep it out of every future export.
      if (extracted === ru) extracted = undefined

      entry[l] = extracted || previous[l] || ''
      if (!extracted && previous[l]) carried += 1
    }
    out[id] = entry
  }

  skeletonOut = skeletonOut.replace(
    /(?<!\{)\{\{([a-zA-Z0-9_.]+)\}\}(?!\})/g,
    (whole, key) => (rename.has(key) ? `{{${rename.get(key)}}}` : whole))

  // What the old file had and the new one does not: paragraphs whose Russian
  // changed, so their translation is about text that is no longer there.
  const nowPresent = new Set(Object.values(out).map((e) => e.ru))
  for (const entry of Object.values(existing)) {
    if (!entry || !entry.ru || nowPresent.has(entry.ru)) continue
    if (entry.eng || entry.ua) dropped += 1
  }

  fs.writeFileSync(path.join(skelDir, `${page}.md`), skeletonOut)
  fs.writeFileSync(msgFile, JSON.stringify(out, null, 2) + '\n')

  console.log(`\n  written: content/lessons/${page}.md + content/messages/${page}.json`)
  if (!structureAgrees) {
    console.log(`  the built ${langs.filter((l) => l !== 'ru').join(' and ')} page${langs.length > 2 ? 's' : ''} no longer match the Russian structure —`)
    console.log('  translations were carried over from the message file by text instead')
  }
  if (referenced) console.log(`  ${referenced} repeated phrase${referenced === 1 ? '' : 's'} point at the phrase book instead of a key of their own`)
  if (fresh) console.log(`  ${fresh} new paragraph${fresh === 1 ? '' : 's'} given an id`)
  if (carried) console.log(`  ${carried} translation${carried === 1 ? '' : 's'} followed their Russian text to a new key`)
  if (dropped) console.log(`  ${dropped} translation${dropped === 1 ? '' : 's'} dropped: the Russian they belonged to was edited`)
} else if (write) {
  console.log('\n  not written — round-trip failed')
}

process.exit(failed ? 1 : 0)
