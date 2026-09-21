#!/usr/bin/env node
/**
 * Takes the formatting out of the fragment table and puts it where it is used.
 *
 * A fragment held "~window~" — the word and the markers that make it a code
 * box. That made the formatting a property of the word rather than of the
 * place it appears, and on the black ground a code box is exactly wrong: light
 * background, larger type, in the middle of small light text on black. The
 * only way out was to stop using the fragment and write **_window_** by hand,
 * which puts the identifier back in front of a translator.
 *
 * Now the fragment holds "window" and the text around it says how to draw it:
 * ~⟦f7⟧~ in ordinary prose, **_⟦f7⟧_** inside a black block.
 *
 * Nothing about the built pages changes — ~⟦f7⟧~ resolves to ~window~, the
 * same bytes as before — which is what makes this safe to run over 168 files.
 *
 *   node tools/bare-fragments.js           report only
 *   node tools/bare-fragments.js --write   move the markers
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const FRAGMENTS = path.join(root, 'content/fragments')
const MESSAGES = path.join(root, 'content/messages')
const LESSONS = path.join(root, 'content/lessons')

const write = process.argv.includes('--write')
const LANGS = ['ru', 'eng', 'ua']

const CODE = /^~([^~]*)~$/

let moved = 0
let pages = 0
const skippedPages = []

for (const file of fs.readdirSync(FRAGMENTS)) {
  if (!file.endsWith('.json')) continue

  const page = file.replace(/\.json$/, '')
  const fragments = JSON.parse(fs.readFileSync(path.join(FRAGMENTS, file), 'utf8'))

  const coded = new Set()
  const bare = fragments.map((value, i) => {
    const m = String(value).match(CODE)
    if (!m) return value
    coded.add(i)
    return m[1]
  })

  if (!coded.size) continue

  // ⟦f7⟧ -> ~⟦f7⟧~, and only for the ones that carried the markers.
  const wrap = (text) => String(text).replace(/⟦f(\d+)⟧/g, (whole, i) =>
    (coded.has(Number(i)) ? `~${whole}~` : whole))

  const touched = []

  const messageFile = path.join(MESSAGES, `${page}.json`)
  if (fs.existsSync(messageFile)) {
    const messages = JSON.parse(fs.readFileSync(messageFile, 'utf8'))
    for (const key of Object.keys(messages)) {
      for (const lang of LANGS) {
        if (typeof messages[key][lang] !== 'string') continue
        const before = messages[key][lang]
        const after = wrap(before)
        if (after !== before) moved += (after.match(/~⟦f\d+⟧~/g) || []).length
        messages[key][lang] = after
      }
    }
    touched.push([messageFile, JSON.stringify(messages, null, 2) + '\n'])
  }

  // A handful of pages write ⟦fN⟧ straight into the skeleton.
  const skeletonFile = path.join(LESSONS, `${page}.md`)
  if (fs.existsSync(skeletonFile)) {
    const before = fs.readFileSync(skeletonFile, 'utf8')
    const after = wrap(before)
    if (after !== before) touched.push([skeletonFile, after])
  }

  touched.push([path.join(FRAGMENTS, file), JSON.stringify(bare, null, 2) + '\n'])

  pages++
  if (write) for (const [target, content] of touched) fs.writeFileSync(target, content)
}

console.log(write ? 'MOVED' : 'WOULD MOVE (dry run — pass --write)')
console.log(`  ${moved} insertions on ${pages} pages`)
if (skippedPages.length) console.log(`  left alone: ${skippedPages.join(', ')}`)
