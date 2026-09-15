#!/usr/bin/env node
/**
 * Moves repeated phrases out of the pages and into the shared table.
 *
 *   node tools/i18n-dedupe.js            what it would do
 *   node tools/i18n-dedupe.js --write    do it
 *
 * A page that says "или:" twelve times holds twelve keys, and each one is a
 * separate thing to translate and a separate chance to translate it
 * differently. Afterwards the skeleton points at content/common.json and the
 * phrase exists once in the whole course.
 *
 * Nothing about the rendered page changes: a reference is only made when the
 * markup around the phrase, put back, reproduces the original byte for byte.
 */

const fs = require('fs')
const path = require('path')
const { dereference } = require('./lib/common-refs')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const LESSONS = path.join(root, 'content/lessons')
const COMMON = path.join(root, 'content/common.json')

const write = process.argv.includes('--write')

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const common = readJson(COMMON)
if (!common) {
  console.error('no content/common.json — run npm run common first')
  process.exit(1)
}

let totalMoved = 0
let totalRefused = 0
const rows = []

for (const file of fs.readdirSync(MESSAGES).filter((f) => f.endsWith('.json')).sort()) {
  const page = file.replace(/\.json$/, '')
  const skelFile = path.join(LESSONS, `${page}.md`)
  if (!fs.existsSync(skelFile)) continue

  const before = fs.readFileSync(skelFile, 'utf8')
  const entries = readJson(path.join(MESSAGES, file))
  const wasKeys = Object.keys(entries).length

  const { skeleton, entries: kept, moved, refused } = dereference(before, entries, common)

  if (!moved.length) continue

  totalMoved += moved.length
  totalRefused += refused.length
  rows.push({ page, moved: moved.length, was: wasKeys, refused: refused.length })

  if (write) {
    fs.writeFileSync(skelFile, skeleton)
    fs.writeFileSync(path.join(MESSAGES, file), JSON.stringify(kept, null, 2) + '\n')
  }
}

rows.sort((a, b) => b.moved - a.moved)

console.log(`\n  ${write ? '' : 'DRY RUN — '}${totalMoved} keys move into content/common.json, from ${rows.length} pages\n`)
console.log('  page                              keys   moved')
for (const r of rows.slice(0, 20)) {
  console.log(`  ${r.page.padEnd(32)} ${String(r.was).padStart(5)} ${String(r.moved).padStart(7)}`)
}
if (rows.length > 20) console.log(`  … and ${rows.length - 20} more pages`)

if (totalRefused) {
  console.log(`\n  ${totalRefused} left alone: the markup around them would not reassemble exactly`)
}

if (!write) console.log('\n  node tools/i18n-dedupe.js --write   to apply')
