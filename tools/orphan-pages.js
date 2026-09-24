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
//
// An item can be marked `hidden`: it keeps its place in the file and its
// order, but the worker leaves it out of the menu a reader sees. So a hidden
// page is not lost — it is parked — and the two are worth telling apart.
const sections = []
for (const block of menuSource.split(/\n  \{/).slice(1)) {
  const ref = (block.match(/ref:\s*'([^']+)'/) || [])[1]
  const ru = (block.match(/ru:\s*'((?:[^'\\]|\\.)*)'/) || [])[1]
  const items = [...block.matchAll(/\{\s*ref:\s*'([^']+)'([^}]*)\}/g)]
    .map((m) => ({ ref: m[1], hidden: /hidden:\s*true/.test(m[2]) }))
  sections.push({ ref, ru, items })
}

const allItems = sections.flatMap((s) => s.items)

/** Named in the menu file at all — parked counts, so nothing here is "lost". */
const inMenu = new Set(allItems.map((i) => i.ref))

/** Actually offered to a reader. */
const visible = new Set(allItems.filter((i) => !i.hidden).map((i) => i.ref))

const hidden = [...new Set(allItems.filter((i) => i.hidden).map((i) => i.ref))].sort()

/* --------------------------------------------------------------- the pages */

const pages = fs.readdirSync(LESSONS)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))

/* --------------------------------------------------------------- the links */

const linkedFrom = new Map()

const readLinks = (text, from) => {
  // Not anchored to "](": in a fragment table the target stands alone,
  // "page/Closure#IIFE", with the brackets left behind in the message.
  for (const m of text.matchAll(/page\/([^)#\s"']+)/g)) {
    const target = m[1].replace(/\.md$/, '')
    if (!linkedFrom.has(target)) linkedFrom.set(target, new Set())
    linkedFrom.get(target).add(from)
  }
}

for (const page of pages) {
  readLinks(fs.readFileSync(path.join(LESSONS, `${page}.md`), 'utf8'), page)

  // A link's target is hidden from translators, so most of them are not in
  // the skeleton at all — they sit in the page's fragment table as ⟦fN⟧.
  // Reading only the skeleton made pages look unreachable that are linked.
  const fragmentFile = path.join(root, 'content/fragments', `${page}.json`)
  if (fs.existsSync(fragmentFile)) {
    readLinks(fs.readFileSync(fragmentFile, 'utf8'), page)
  }
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

// A section every one of whose items is hidden shows a reader an empty folder,
// which is the same problem as having no items at all.
const empty = sections.filter((s) => !s.items.some((i) => !i.hidden))

const twice = {}
for (const s of sections) for (const item of s.items) (twice[item.ref] = twice[item.ref] || []).push(s.ru)
const duplicated = Object.entries(twice).filter(([, where]) => where.length > 1)

const whereIs = (ref) => sections.filter((s) => s.items.some((i) => i.ref === ref)).map((s) => s.ru)

console.log(`${pages.length} pages, ${visible.size} of them offered in the menu\n`)

console.log(`reached by nothing — no menu entry, no link from another page: ${orphans.length}`)
for (const page of orphans) console.log(`  ${page}`)

console.log(`\nhidden on purpose — in the menu file, not shown to a reader: ${hidden.length}`)
for (const ref of hidden) {
  const note = pages.includes(ref) ? 'page exists' : 'no page behind it'
  console.log(`  ${ref.padEnd(20)} ${note.padEnd(20)} in "${whereIs(ref).join('", "')}"`)
}

console.log(`\nmenu entries with no skeleton behind them: ${missing.length}`)
for (const ref of missing) {
  const note = built.has(ref)
    ? 'built page, no skeleton'
    : hidden.includes(ref)
      ? 'nothing behind it, but hidden'
      : 'NOTHING — the entry leads to a 404'
  console.log(`  ${ref.padEnd(20)} ${note.padEnd(34)} in "${whereIs(ref).join('", "')}"`)
}

console.log(`\nsections with nothing visible in them: ${empty.length}`)
for (const s of empty) console.log(`  ${(s.ref || '?').padEnd(24)} "${s.ru}"`)

console.log(`\npages listed in the menu more than once: ${duplicated.length}`)
for (const [page, where] of duplicated) console.log(`  ${page.padEnd(24)} "${where.join('", "')}"`)

console.log(`\nreached only by a link, never named in the menu: ${pages.filter((p) => !inMenu.has(p) && linkedFrom.has(p)).length}`)
for (const page of pages.filter((p) => !inMenu.has(p) && linkedFrom.has(p)).sort()) {
  console.log(`  ${page.padEnd(30)} from ${[...linkedFrom.get(page)].join(', ')}`)
}
