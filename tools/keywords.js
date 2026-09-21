#!/usr/bin/env node
/**
 * Candidate keywords for a lesson, drawn from what the lesson already says.
 *
 * Search runs on content-worker/src/assets/keywords.js, and a lesson missing
 * from it cannot be found. The words are also the quickest way to see what a
 * lesson is actually about, which is why they are worth keeping straight.
 *
 * Two sources, both already written: the identifiers a lesson gives a heading
 * to — those are its subject — and the code terms in its fragment table, which
 * are what it handles. Neither invents anything; the concepts a reader would
 * search for in words ("scrolling", "type coercion") still have to be added by
 * hand, and the draft leaves room for them.
 *
 *   node tools/keywords.js           every lesson with none
 *   node tools/keywords.js --all     every lesson
 *   node tools/keywords.js <page>    one lesson
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'content/lessons')
const MESSAGES = path.join(root, 'content/messages')
const FRAGMENTS = path.join(root, 'content/fragments')
const KEYWORDS = path.join(root, 'content-worker/src/assets/keywords.js')

const args = process.argv.slice(2)
const all = args.includes('--all')
const only = args.find((a) => !a.startsWith('--'))

const source = fs.readFileSync(KEYWORDS, 'utf8')
const have = new Set([...source.matchAll(/^\s{2}'?([A-Za-z0-9_-]+)'?:\s*\[/gm)].map((m) => m[1]))

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*(\.[A-Za-z_$][A-Za-z0-9_$]*)*$/

const pages = fs.readdirSync(LESSONS)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))
  .filter((p) => (only ? p === only : all || !have.has(p)))

const read = (dir, page, fallback) => {
  const file = path.join(dir, `${page}.json`)
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback
}

/**
 * How many lessons use a term at all.
 *
 * A word worth searching for is shared: forEach, prototype, Proxy. A term on
 * one page and nowhere else is nearly always a variable out of an example —
 * boy.showContext, userName, Satisfactorily — and those make an index worse.
 * A heading is exempt: naming its own subject is the one place a lesson may
 * use a term uniquely and still mean it.
 */
const spread = new Map()

for (const file of fs.readdirSync(FRAGMENTS)) {
  if (!file.endsWith('.json')) continue
  const seen = new Set()
  for (const value of JSON.parse(fs.readFileSync(path.join(FRAGMENTS, file), 'utf8'))) {
    const term = String(value).replace(/[*_]/g, '').replace(/\(.*\)$/, '').trim()
    if (term) seen.add(term)
  }
  for (const term of seen) spread.set(term, (spread.get(term) || 0) + 1)
}

const rows = []

for (const page of pages) {
  const messages = read(MESSAGES, page, {})
  const fragments = read(FRAGMENTS, page, [])

  const resolve = (line) => line
    .replace(/\{\{([a-zA-Z0-9_.]+)\}\}/g, (w, k) => (messages[k] && messages[k].ru) || '')
    .replace(/⟦f(\d+)⟧/g, (w, i) => (fragments[Number(i)] !== undefined ? fragments[Number(i)] : ''))
    .replace(/!\[[^\]]*\]/g, '')
    .replace(/⟪[^⟫]*⟫/g, '')
    .replace(/[*_~`]/g, '')
    .trim()

  // What the lesson gives a heading to is what it is about.
  const headings = []
  for (const line of fs.readFileSync(path.join(LESSONS, `${page}.md`), 'utf8').split(/\r?\n/)) {
    if (!/^#{1,6}\s/.test(line)) continue
    const text = resolve(line.replace(/^#{1,6}\s*/, ''))
    if (IDENTIFIER.test(text.replace(/\(\)$/, ''))) headings.push(text.replace(/\(\)$/, ''))
  }

  // What it handles, most-used first, so a one-off does not outrank a subject.
  const counts = new Map()
  for (const value of fragments) {
    const term = String(value).replace(/[*_]/g, '').replace(/\(.*\)$/, '').trim()
    if (!IDENTIFIER.test(term)) continue
    if (term.length < 3) continue
    if ((spread.get(term) || 0) < 2) continue
    counts.set(term, (counts.get(term) || 0) + 1)
  }

  const fromFragments = [...counts.keys()]
    .filter((t) => !headings.includes(t))
    .slice(0, 12 - Math.min(headings.length, 8))

  const draft = [...new Set([...headings.slice(0, 8), ...fromFragments])]

  rows.push([page, draft, have.has(page)])
}

console.log(`${rows.length} lessons\n`)

for (const [page, draft, known] of rows) {
  console.log(`  ${page}${known ? '' : '   (no keywords yet)'}`)
  console.log(`    ${draft.length ? draft.join(', ') : '— nothing an identifier rule can find'}`)
}

const empty = rows.filter(([, d]) => !d.length).length
console.log(`\n${rows.length - empty} drafted, ${empty} with nothing to draw on`)
