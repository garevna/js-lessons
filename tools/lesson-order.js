#!/usr/bin/env node
/**
 * Where a lesson leans on a lesson that comes later.
 *
 * The course is meant to be read in order, each page resting on the ones
 * before it. A link from page 9 to page 20 is the opposite: either the reader
 * is being sent somewhere they cannot yet follow, or the two are in the wrong
 * order. Which of the two it is depends on what the link says, so the words
 * around it are printed alongside.
 *
 *   node tools/lesson-order.js
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'content/lessons')
const MESSAGES = path.join(root, 'content/messages')
const FRAGMENTS = path.join(root, 'content/fragments')
const MENU = path.join(root, 'content-worker/src/assets/mainMenu.js')

/* ------------------------------------------------- the order the menu gives */

const menuSource = fs.readFileSync(MENU, 'utf8')

const order = new Map()   // page -> { position, section }
let position = 0

for (const block of menuSource.split(/\n  \{/).slice(1)) {
  const section = (block.split('items:')[0].match(/ru:\s*'([^']*)'/) || [])[1] || '?'
  for (const m of block.matchAll(/\{\s*ref:\s*'([^']+)'/g)) {
    if (!order.has(m[1])) order.set(m[1], { position: position++, section })
  }
}

/* ------------------------------------------------------------- every link */

const links = []

for (const file of fs.readdirSync(LESSONS)) {
  if (!file.endsWith('.md')) continue
  const page = file.replace(/\.md$/, '')

  const fragmentFile = path.join(FRAGMENTS, `${page}.json`)
  const fragments = fs.existsSync(fragmentFile)
    ? JSON.parse(fs.readFileSync(fragmentFile, 'utf8'))
    : []

  const resolve = (target) =>
    target.replace(/⟦f(\d+)⟧/g, (whole, i) => fragments[Number(i)] !== undefined ? fragments[Number(i)] : whole)

  const texts = [fs.readFileSync(path.join(LESSONS, file), 'utf8')]

  const messageFile = path.join(MESSAGES, `${page}.json`)
  if (fs.existsSync(messageFile)) {
    const messages = JSON.parse(fs.readFileSync(messageFile, 'utf8'))
    for (const key of Object.keys(messages)) {
      if (typeof messages[key].ru === 'string') texts.push(messages[key].ru)
    }
  }

  for (const text of texts) {
    for (const m of text.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)) {
      const target = resolve(m[2])
      if (!target.startsWith('page/')) continue
      const to = target.slice(5).split('#')[0].replace(/\.md$/, '')
      links.push({ from: page, to, label: resolve(m[1]).replace(/⟦f\d+⟧/g, '…').trim() })
    }
  }
}

/* ---------------------------------------------------------------- the report */

const placed = links.filter((l) => order.has(l.from) && order.has(l.to))
const forward = placed.filter((l) => order.get(l.to).position > order.get(l.from).position)
const back = placed.length - forward.length

console.log(`${links.length} links from one lesson to another; ${placed.length} between pages the menu places\n`)
console.log(`  back, to something already read: ${back}`)
console.log(`  forward, to something not yet taught: ${forward.length}\n`)

forward.sort((a, b) => (order.get(b.to).position - order.get(b.from).position) - (order.get(a.to).position - order.get(a.from).position))

for (const link of forward) {
  const from = order.get(link.from)
  const to = order.get(link.to)
  console.log(`  ${link.from}  →  ${link.to}`)
  console.log(`      ${from.section}  (${from.position})  ->  ${to.section}  (${to.position}),  ${to.position - from.position} lessons ahead`)
  if (link.label) console.log(`      link says: "${link.label.slice(0, 70)}"`)
}

const unplaced = links.filter((l) => !order.has(l.from) || !order.has(l.to))
if (unplaced.length) {
  console.log(`\nlinks the menu cannot place (one end is not in it): ${unplaced.length}`)
  for (const l of unplaced) console.log(`  ${l.from} → ${l.to}`)
}
