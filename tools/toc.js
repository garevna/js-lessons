#!/usr/bin/env node
/**
 * Rebuilds the table of contents at the top of README.md.
 *
 *   npm run toc            rewrite it
 *   npm run toc -- --check say whether it is out of date, and fail if it is
 *
 * The list sits between two comment markers and is made from the file's own
 * headings, so it cannot drift from them by hand. Headings inside a ``` fence
 * are not headings — the README quotes a lesson that opens with one.
 */

const fs = require('fs')
const path = require('path')

const README = path.join(__dirname, '../README.md')

const OPEN = '<!-- оглавление: npm run toc -->'
const CLOSE = '<!-- /оглавление -->'

const check = process.argv.includes('--check')

const text = fs.readFileSync(README, 'utf8')

/** The id GitHub gives a heading. */
const anchor = (title) => title
  .toLowerCase()
  .replaceAll('`', '')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .trim()
  .replace(/\s+/g, '-')

const headings = []
let fenced = false

for (const line of text.split('\n')) {
  if (line.trimStart().startsWith('```')) { fenced = !fenced; continue }
  if (fenced) continue

  const found = /^(#{2,4})\s+(.+?)\s*$/.exec(line)
  if (found) headings.push({ level: found[1].length, title: found[2] })
}

const seen = new Map()
const rows = headings.map(({ level, title }) => {
  let id = anchor(title)

  // GitHub numbers a repeated anchor: heading, heading-1, heading-2 …
  if (seen.has(id)) {
    const n = seen.get(id) + 1
    seen.set(id, n)
    id = `${id}-${n}`
  } else {
    seen.set(id, 0)
  }

  const label = title.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  return `${'  '.repeat(level - 2)}- [${label}](#${id})`
})

const toc = [OPEN, '', ...rows, '', CLOSE, ''].join('\n')

const had = text.includes(OPEN) && text.includes(CLOSE)
const before = had ? text.slice(0, text.indexOf(OPEN)) : null
const after = had ? text.slice(text.indexOf(CLOSE) + CLOSE.length).replace(/^\n+/, '') : null

let out
if (had) {
  out = before + toc + '\n' + after
} else {
  const at = text.indexOf('\n## ')
  out = text.slice(0, at + 1) + toc + '\n' + text.slice(at + 1)
}

if (check) {
  if (out === text) {
    console.log(`\n  оглавление в README.md совпадает с заголовками (${rows.length} пунктов)\n`)
    process.exit(0)
  }
  console.log('\n  оглавление в README.md разошлось с заголовками — запусти npm run toc\n')
  process.exit(1)
}

fs.writeFileSync(README, out)
console.log(`\n  README.md: оглавление из ${rows.length} пунктов\n`)
