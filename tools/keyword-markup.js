#!/usr/bin/env node
/**
 * Draws every keyword the way the course draws keywords.
 *
 * The rule: in ordinary prose a keyword is **_~new~_** — bold italic, and a
 * code box around the word. Inside a black block (•••• … ••••) it is
 * **_new_** without the tildes, because there a code box is a white patch on
 * black.
 *
 * The rule settled after much of the course was already written, so a few
 * hundred keywords stand in prose wearing the black-block form: **_this_**,
 * **_let_**, **_catch_**. They read as emphasis rather than as code. This
 * puts the tildes back, and only where the text is prose — which is why it
 * reads the lesson skeleton first: a message is black or not by where the
 * skeleton puts it, not by anything in the message itself.
 *
 * Fragments are handled too. A fragment holds a bare word now (see
 * bare-fragments.js), so **_⟦f0⟧_** in prose is the same mistake when ⟦f0⟧
 * is "true" — it becomes **_~⟦f0⟧~_**.
 *
 *   node tools/keyword-markup.js           report only
 *   node tools/keyword-markup.js --write   put the tildes back
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'content/lessons')
const MESSAGES = path.join(root, 'content/messages')
const FRAGMENTS = path.join(root, 'content/fragments')

const write = process.argv.includes('--write')
const LANGS = ['ru', 'eng', 'ua']

/** The words the course treats as keywords of the language. */
const WORDS = [
  'this', 'new', 'class', 'super', 'extends', 'static', 'return', 'typeof',
  'instanceof', 'const', 'let', 'var', 'function', 'async', 'await', 'yield',
  'delete', 'void', 'null', 'undefined', 'NaN', 'Infinity', 'true', 'false',
  'prototype', 'constructor', 'arguments', 'break', 'continue', 'switch',
  'case', 'default', 'throw', 'try', 'catch', 'finally', 'import', 'export'
]

const BARE = new RegExp(`\\*\\*_(${WORDS.join('|')})_\\*\\*`, 'g')

/**
 * Which {{pN}} of a lesson land inside a black block.
 *
 * A black block is a •••• fence, or a single line that opens with ••. Inside
 * ~~~ the text is code and nothing here applies.
 */
function blackKeys (skeleton) {
  const keys = new Set()
  let inFence = false
  let inCode = false

  for (const line of skeleton.split('\n')) {
    if (/^~~~/.test(line)) { inCode = !inCode; continue }
    if (inCode) continue
    if (/^••••/.test(line)) { inFence = !inFence; continue }

    const black = inFence || /^\s*••/.test(line)
    if (!black) continue
    for (const [, key] of line.matchAll(/\{\{(\w+)\}\}/g)) keys.add(key)
  }

  return keys
}

/** One piece of prose: the keywords in it, and the fragments that are keywords. */
function fixText (text, wrapFragment) {
  let count = 0
  const fixed = wrapFragment(text.replace(BARE, (whole, word) => {
    count++
    return `**_~${word}~_**`
  }), n => { count += n })
  return [fixed, count]
}

/** The prose lines of a skeleton: its own text, outside code and black blocks. */
function fixSkeleton (skeleton, wrapFragment) {
  let inFence = false
  let inCode = false
  let count = 0

  const lines = skeleton.split('\n').map(line => {
    if (/^~~~/.test(line)) { inCode = !inCode; return line }
    if (inCode) return line
    if (/^••••/.test(line)) { inFence = !inFence; return line }
    if (inFence || /^\s*••/.test(line)) return line

    const [fixed, n] = fixText(line, wrapFragment)
    count += n
    return fixed
  })

  return [lines.join('\n'), count]
}

const report = []
let total = 0

for (const file of fs.readdirSync(LESSONS)) {
  if (!file.endsWith('.md')) continue

  const page = file.replace(/\.md$/, '')
  const skeletonFile = path.join(LESSONS, file)
  const skeleton = fs.readFileSync(skeletonFile, 'utf8')
  const black = blackKeys(skeleton)

  // ⟦fN⟧ counts as a keyword when the fragment holds one.
  const fragmentFile = path.join(FRAGMENTS, `${page}.json`)
  let keywordFragments = new Set()
  if (fs.existsSync(fragmentFile)) {
    const fragments = JSON.parse(fs.readFileSync(fragmentFile, 'utf8'))
    fragments.forEach((value, i) => {
      if (WORDS.includes(String(value).replace(/^_|_$/g, ''))) keywordFragments.add(i)
    })
  }
  const wrapFragment = (text, counted = () => {}) => {
    let n = 0
    const fixed = text.replace(/\*\*_(⟦f(\d+)⟧)_\*\*/g, (whole, inner, i) => {
      if (!keywordFragments.has(Number(i))) return whole
      n++
      return `**_~${inner}~_**`
    })
    counted(n)
    return fixed
  }

  const touched = []
  let count = 0

  const [fixedSkeleton, skeletonCount] = fixSkeleton(skeleton, wrapFragment)
  count += skeletonCount
  if (fixedSkeleton !== skeleton) touched.push([skeletonFile, fixedSkeleton])

  const messageFile = path.join(MESSAGES, `${page}.json`)
  if (fs.existsSync(messageFile)) {
    const source = fs.readFileSync(messageFile, 'utf8')
    const messages = JSON.parse(source)
    for (const key of Object.keys(messages)) {
      if (black.has(key)) continue
      for (const lang of LANGS) {
        if (typeof messages[key][lang] !== 'string') continue
        const [after, n] = fixText(messages[key][lang], wrapFragment)
        count += n
        messages[key][lang] = after
      }
    }
    const rewritten = JSON.stringify(messages, null, 2) + '\n'
    if (rewritten !== source) touched.push([messageFile, rewritten])
  }

  // A page can come back "changed" with nothing counted, when re-serializing
  // its JSON moves whitespace about. Leave those alone: a diff that says
  // nothing is worse than no diff.
  if (!touched.length || !count) continue
  total += count
  report.push([page, count])
  if (write) for (const [target, content] of touched) fs.writeFileSync(target, content, 'utf8')
}

console.log(write ? 'FIXED' : 'WOULD FIX (dry run — pass --write)')
report.sort((a, b) => b[1] - a[1]).forEach(([page, count]) =>
  console.log(`  ${String(count).padStart(4)}  ${page}`))
console.log(`  ${String(total).padStart(4)}  in all, on ${report.length} pages`)
