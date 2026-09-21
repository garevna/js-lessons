#!/usr/bin/env node
/**
 * Puts a message file back into the order its page reads in.
 *
 * Keys are stable ids, not positions — p104 stays p104 wherever it moves — but
 * the file is read by a person, and a person reads it against the page. Every
 * message file was in page order until a tool appended new keys at the end:
 * the paragraph being edited vanished from where it had always been and turned
 * up at the bottom of the file, under a number nobody was looking for.
 *
 * Order is taken from the skeleton, so it costs nothing to keep and nothing to
 * get back.
 *
 *   node tools/sort-messages.js           report only
 *   node tools/sort-messages.js --write   reorder
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const LESSONS = path.join(root, 'content/lessons')

const write = process.argv.includes('--write')

const wrong = []
const orphans = []

for (const file of fs.readdirSync(MESSAGES)) {
  if (!file.endsWith('.json')) continue

  const page = file.replace(/\.json$/, '')
  const skeletonFile = path.join(LESSONS, `${page}.md`)
  if (!fs.existsSync(skeletonFile)) continue

  const skeleton = fs.readFileSync(skeletonFile, 'utf8')
  const messages = JSON.parse(fs.readFileSync(path.join(MESSAGES, file), 'utf8'))
  const keys = Object.keys(messages)

  const at = (key) => skeleton.indexOf(`{{${key}}}`)

  const unused = keys.filter((key) => at(key) === -1)
  if (unused.length) orphans.push([file, unused])

  // Only the keys the page mentions are reordered, and only among the slots
  // they already occupy. A key the page no longer mentions stays exactly where
  // it is: otherwise putting one file right would shuffle every file that
  // happens to carry a leftover.
  const slots = []
  const referenced = []

  keys.forEach((key, index) => {
    if (at(key) === -1) return
    slots.push(index)
    referenced.push(key)
  })

  referenced.sort((a, b) => at(a) - at(b))

  const sorted = keys.slice()
  slots.forEach((slot, i) => { sorted[slot] = referenced[i] })

  if (sorted.every((k, i) => k === keys[i])) continue

  const first = sorted.findIndex((k, i) => k !== keys[i])
  wrong.push([file, keys.length, first])

  if (write) {
    const ordered = Object.fromEntries(sorted.map((k) => [k, messages[k]]))
    fs.writeFileSync(path.join(MESSAGES, file), JSON.stringify(ordered, null, 2) + '\n')
  }
}

console.log(write ? `REORDERED ${wrong.length}` : `OUT OF PAGE ORDER: ${wrong.length} (dry run — pass --write)`)
for (const [file, count, first] of wrong) {
  console.log(`  ${file.padEnd(34)} ${count} keys, diverges at ${first}`)
}

if (orphans.length) {
  console.log(`\nkeys the page no longer mentions (left at the end, nothing removed):`)
  for (const [file, keys] of orphans) {
    console.log(`  ${file.padEnd(34)} ${keys.slice(0, 8).join(' ')}${keys.length > 8 ? ` … +${keys.length - 8}` : ''}`)
  }
}
