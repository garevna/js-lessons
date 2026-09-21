#!/usr/bin/env node
/**
 * Which pages nothing leads to, and which menu entries lead nowhere.
 *
 * A page is reached in one of two ways: the main menu names it, or another
 * page links to it. A page neither names nor links to is written, built,
 * deployed and unreachable — it exists only for whoever types its name into
 * the address bar.
 *
 *   node tools/orphan-pages.js
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'content/lessons')
const MENU = path.join(root, 'content-worker/src/assets/mainMenu.js')

/* ---------------------------------------------------------------- the menu */

const menuSource = fs.readFileSync(MENU, 'utf8')

// Sections and their items are the same shape; a section is the one that
// carries an items list. Only items are pages — a section is a folder.
const sections = []
for (const block of menuSource.split(/\n  \{/).slice(1)) {
  const ref = (block.match(/ref:\s*'([^']+)'/) || [])[1]
  const ru = (block.match(/ru:\s*'((?:[^'\\]|\\.)*)'/) || [])[1]
  const items = [...block.matchAll(/\{\s*ref:\s*'([^']+)'/g)].map((m) => m[1])
  sections.push({ ref, ru, items })
}

const inMenu = new Set(sections.flatMap((s) => s.items))

/* --------------------------------------------------------------- the pages */

const pages = fs.readdirSync(LESSONS)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))

/* --------------------------------------------------------------- the links */

const linkedFrom = new Map()

const readLinks = (text, from) => {
  for (const m of text.matchAll(/\]\(page\/([^)#\s]+)/g)) {
    const target = m[1].replace(/\.md$/, '')
    if (!linkedFrom.has(target)) linkedFrom.set(target, new Set())
    linkedFrom.get(target).add(from)
  }
}

for (const page of pages) {
  readLinks(fs.readFileSync(path.join(LESSONS, `${page}.md`), 'utf8'), page)
}

// The static pages link too — the 404 offers a way back, and the
// "not translated yet" notice points at the Russian original.
const STATIC = path.join(root, 'content/static')
const walk = (dir) => {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.md')) readLinks(fs.readFileSync(full, 'utf8'), `static/${entry.name}`)
  }
}
walk(STATIC)

/**
 * Two pages are reached without anyone linking to them: the one the site opens
 * on, and the one it falls back to. Neither is an orphan.
 */
const ENTRY_POINTS = new Set(['start-page', '404'])

/** A page can exist in public/ without a skeleton — recovered, or hand-made. */
const built = new Set(
  fs.existsSync(path.join(root, 'public/lessons/ru'))
    ? fs.readdirSync(path.join(root, 'public/lessons/ru'))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
    : []
)

/* --------------------------------------------------------------- the report */

const orphans = pages
  .filter((p) => !inMenu.has(p) && !linkedFrom.has(p) && !ENTRY_POINTS.has(p))
  .sort()

const missing = [...inMenu]
  .filter((ref) => !pages.includes(ref))
  .sort()

const empty = sections.filter((s) => s.items.length === 0)

const twice = {}
for (const s of sections) for (const item of s.items) (twice[item] = twice[item] || []).push(s.ru)
const duplicated = Object.entries(twice).filter(([, where]) => where.length > 1)

console.log(`${pages.length} pages, ${inMenu.size} of them in the menu\n`)

console.log(`reached by nothing — no menu entry, no link from another page: ${orphans.length}`)
for (const page of orphans) console.log(`  ${page}`)

console.log(`\nmenu entries with no skeleton behind them: ${missing.length}`)
for (const ref of missing) {
  const where = sections.filter((s) => s.items.includes(ref)).map((s) => s.ru)
  const note = built.has(ref) ? 'built page, no skeleton' : 'NOTHING — the entry leads to a 404'
  console.log(`  ${ref.padEnd(20)} ${note.padEnd(34)} in "${where.join('", "')}"`)
}

console.log(`\nempty sections: ${empty.length}`)
for (const s of empty) console.log(`  ${(s.ref || '?').padEnd(24)} "${s.ru}"`)

console.log(`\npages listed in the menu more than once: ${duplicated.length}`)
for (const [page, where] of duplicated) console.log(`  ${page.padEnd(24)} "${where.join('", "')}"`)

console.log(`\nreached only by a link, never named in the menu: ${pages.filter((p) => !inMenu.has(p) && linkedFrom.has(p)).length}`)
for (const page of pages.filter((p) => !inMenu.has(p) && linkedFrom.has(p)).sort()) {
  console.log(`  ${page.padEnd(30)} from ${[...linkedFrom.get(page)].join(', ')}`)
}
