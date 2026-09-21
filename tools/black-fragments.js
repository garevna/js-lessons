#!/usr/bin/env node
/**
 * Puts fragment keys back inside the black blocks.
 *
 * A fragment used to carry its own ~ ~, and a code box on the black ground is
 * light and larger than everything around it — so the only way to write an
 * identifier there was to spell it out: **_place()_**. That works visually and
 * loses the point of the fragment table, which is that an identifier never
 * reaches a translator.
 *
 * Fragments are bare now (see bare-fragments.js), so the block can say
 * **_⟦f20⟧_**: the formatting belongs to the block, the word to the table.
 *
 *   node tools/black-fragments.js           report only
 *   node tools/black-fragments.js --write   put the keys back
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const FRAGMENTS = path.join(root, 'content/fragments')
const MESSAGES = path.join(root, 'content/messages')
const LESSONS = path.join(root, 'content/lessons')

const write = process.argv.includes('--write')
const LANGS = ['ru', 'eng', 'ua']

// Bold italic around something that reads as code: an identifier, a call, a
// property path. Plain emphasis on a word of prose is left alone.
const SPELLED_OUT = /\*\*_([A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)*(?:\([^)]*\))?)_\*\*/g

const report = []
const created = []

for (const file of fs.readdirSync(MESSAGES)) {
  if (!file.endsWith('.json')) continue

  const page = file.replace(/\.json$/, '')
  const skeletonFile = path.join(LESSONS, `${page}.md`)
  if (!fs.existsSync(skeletonFile)) continue

  // Which keys the page draws on the black ground.
  const inBlack = new Set()
  let open = false
  for (const line of fs.readFileSync(skeletonFile, 'utf8').split(/\r?\n/)) {
    if (/^\s*•{4}/.test(line.trim())) { open = !open; continue }
    if (!open) continue
    const m = line.match(/\{\{([a-zA-Z0-9_.]+)\}\}/)
    if (m) inBlack.add(m[1])
  }

  if (!inBlack.size) continue

  const fragmentFile = path.join(FRAGMENTS, `${page}.json`)
  const fragments = fs.existsSync(fragmentFile)
    ? JSON.parse(fs.readFileSync(fragmentFile, 'utf8'))
    : []

  const messages = JSON.parse(fs.readFileSync(path.join(MESSAGES, file), 'utf8'))
  let changed = false

  const keyFor = (word) => {
    let at = fragments.indexOf(word)
    if (at === -1) { at = fragments.push(word) - 1; created.push([page, word, `f${at}`]) }
    return `⟦f${at}⟧`
  }

  for (const key of inBlack) {
    if (!messages[key]) continue
    for (const lang of LANGS) {
      const text = messages[key][lang]
      if (typeof text !== 'string') continue

      const after = text.replace(SPELLED_OUT, (whole, word) => {
        report.push([`${page}:${key}.${lang}`, word])
        return `**_${keyFor(word)}_**`
      })

      if (after !== text) { messages[key][lang] = after; changed = true }
    }
  }

  if (changed && write) {
    fs.writeFileSync(path.join(MESSAGES, file), JSON.stringify(messages, null, 2) + '\n')
    fs.writeFileSync(fragmentFile, JSON.stringify(fragments, null, 2) + '\n')
  }
}

console.log(write ? `REPLACED ${report.length}` : `WOULD REPLACE ${report.length} (dry run — pass --write)`)
const byWord = {}
for (const [, word] of report) byWord[word] = (byWord[word] || 0) + 1
for (const [word, n] of Object.entries(byWord).sort()) console.log(`  ${String(n).padStart(3)}  ${word}`)

if (created.length) {
  console.log(`\nnew fragments (the word had no entry yet):`)
  for (const [page, word, id] of created) console.log(`  ${page.padEnd(20)} ${id.padEnd(6)} ${word}`)
}
