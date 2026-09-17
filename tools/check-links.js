#!/usr/bin/env node
/**
 * Every link on every page, resolved the way the renderer resolves it.
 *
 *   node tools/check-links.js           the broken ones
 *   node tools/check-links.js --all     all of them, grouped by kind
 *   node tools/check-links.js --net     also ask the web whether the URLs answer
 *
 * A link in a lesson is written [label](target), and the target is not a URL
 * but a small language of its own: page/var is another lesson, external/mdn-string
 * is a name in src/configs/externalLinks.js, images/x.png is a file in public/.
 * Each kind fails differently and all of them fail silently — the page renders,
 * the anchor is there, and it goes nowhere.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'public/lessons')
const PUBLIC = path.join(root, 'public')

const args = process.argv.slice(2)
const showAll = args.includes('--all')
const checkNet = args.includes('--net')

// Read the link table out of the source rather than importing it: the config
// is an ES module and this is a plain script.
const externalLinks = (() => {
  const src = fs.readFileSync(path.join(root, 'src/configs/externalLinks.js'), 'utf8')
  const names = new Set()
  for (const [, name] of src.matchAll(/^\s*'?([\w.-]+)'?\s*:/gm)) names.add(name)
  return names
})()

const pages = new Set(
  fs.readdirSync(path.join(LESSONS, 'ru'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
)

// The same expression parseAnchors uses, so this sees exactly what it sees.
const ANCHOR = /\[.[^(]+\]\(.[^)]+\)/g

// Blocks are pulled out of the page before any line is looked at, so what is
// inside them is not prose and not a link. Without this, console['log']('Привет!')
// in a code sample matches the anchor expression and gets reported as a link
// to a place called 'log'.
const BLOCKS = [
  /^~~~~[\s\S]*?^~~~~$/gm,
  /^~~~[a-z]*[\s\S]*?^~~~$/gm,
  /\{\{\{[\s\S]*?\}\}\}/g,
  /^\^{3}\[[\s\S]*?^\^{3}\s*$/gm,
  /^@{4}[\s\S]*?^@{4}\s*$/gm
]

const withoutBlocks = (text) => {
  for (const re of BLOCKS) {
    // Keep the line count, so a reported line number still points at the page.
    text = text.replace(re, (block) => block.replace(/[^\n]/g, ' '))
  }
  return text
}

const links = []

for (const lang of ['ru', 'eng', 'ua']) {
  const dir = path.join(LESSONS, lang)
  if (!fs.existsSync(dir)) continue

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const text = withoutBlocks(fs.readFileSync(path.join(dir, file), 'utf8'))
    text.split(/\r?\n/).forEach((line, i) => {
      for (const anchor of line.match(ANCHOR) || []) {
        const cut = anchor.slice(1, -1).split('](')
        if (cut.length !== 2) continue
        links.push({ page: `${lang}/${file}`, line: i + 1, label: cut[0], ref: cut[1] })
      }

      // ※※※tests quiz/var※※※ is a link too — the renderer turns it into one —
      // and its target needs checking like any other.
      const button = line.match(/^\s*※{3}\s*(\S+)\s+([^※]+?)\s*※{3}\s*$/)
      if (button) {
        links.push({ page: `${lang}/${file}`, line: i + 1, label: button[1], ref: button[2] })
      }
    })
  }
}

// Headings become anchors through the same table the renderer uses, so a
// page/lesson#heading link can be checked against the headings that exist.
const TRANSLIT = (() => {
  const src = fs.readFileSync(path.join(root, 'src/configs/convertStringForAnchor.js'), 'utf8')
  const table = {}
  for (const [, from, to] of src.matchAll(/'(.+?)':\s*'(.*?)'/g)) table[from] = to
  return table
})()

const toAnchor = (s) => s.trim().replaceAll('()', '').trim().split('')
  .map((c) => (TRANSLIT[c] !== undefined ? TRANSLIT[c] : c))
  .join('')
  .replaceAll('|', '_')
  .replaceAll('&lt;', '')

const anchorsOf = (page) => {
  const file = path.join(LESSONS, 'ru', `${page}.md`)
  if (!fs.existsSync(file)) return null
  const set = new Set()
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^#{1,6}\s+(.*)$/)
    if (m) set.add(toAnchor(m[1].replace(/!\[[^\]]*\]/g, '').trim()))
  }
  return set
}

const FOLDERS = {
  icons: 'icons/',
  images: 'images/',
  sounds: 'sounds/',
  illustrations: 'images/lessons/',
  files: 'files/',
  help: 'help/'
}

/** What the renderer would do with this target, and whether it leads anywhere. */
function classify (ref) {
  // Any whitespace in a target is wrong, and there are two ways it gets there.
  // A heading anchor may hold spaces — "padStart | padEnd" is a real heading —
  // so only the address itself is looked at.
  if (/\s/.test(ref.split('#')[0])) {
    return {
      kind: 'space in the target',
      broken: true,
      why: /\s$/.test(ref)
        ? 'a space at the end — the old workaround for the character the renderer used to bite off'
        : 'whitespace inside the target. Usually a Markdown link title, [text](url "title"), which this markup has no notion of, so the title becomes part of the address'
    }
  }

  if (/^https?:\/\//.test(ref)) return { kind: 'web', broken: false, url: ref }

  // An address a phone answers: mailto:, tel:, viber:, whatsapp:. There is
  // nothing to check — no file to find and nobody to ask — but it is a link
  // and not a broken alias.
  if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) {
    return { kind: ref.slice(0, ref.indexOf(':')).toLowerCase(), broken: false }
  }

  const [alias, ...rest] = ref.split('/')
  const name = rest.join('/')

  if (alias === 'page') {
    const [file, hash] = name.split('#')
    const page = file.replace(/\.md$/, '')
    if (!pages.has(page)) return { kind: 'page', broken: true, why: `no lesson called ${page}` }
    if (!hash) return { kind: 'page', broken: false }

    const headings = anchorsOf(page)
    return headings && headings.has(toAnchor(hash))
      ? { kind: 'page', broken: false }
      : { kind: 'page', broken: true, why: `${page} has no heading that makes the anchor "${toAnchor(hash)}"` }
  }

  if (alias === 'external' || alias === 'test') {
    return externalLinks.has(name)
      ? { kind: alias, broken: false }
      : { kind: alias, broken: true, why: `${name} is not in src/configs/externalLinks.js` }
  }

  if (alias === 'quiz' || alias === 'samples') {
    // These build a URL from the name, so any name resolves. Only an empty one
    // is wrong.
    return name
      ? { kind: alias, broken: false }
      : { kind: alias, broken: true, why: 'no name after the alias' }
  }

  if (FOLDERS[alias]) {
    // createPath adds the extension for help pages.
    const file = path.join(PUBLIC, FOLDERS[alias], alias === 'help' ? `${name}.html` : name)
    return fs.existsSync(file)
      ? { kind: alias, broken: false }
      : { kind: alias, broken: true, why: `public/${FOLDERS[alias]}${name}${alias === 'help' ? '.html' : ''} does not exist` }
  }

  if (alias === 'demo' || alias === 'lessons' || alias === 'inside_the_page') {
    return { kind: alias, broken: false }
  }

  return {
    kind: 'unknown',
    broken: true,
    why: `"${alias}" is not one of the aliases createPath knows, so this resolves to the site root`
  }
}

for (const link of links) Object.assign(link, classify(link.ref))

const broken = links.filter((l) => l.broken)

const byKind = {}
for (const l of links) (byKind[l.kind] ||= []).push(l)

console.log(`\n  ${links.length} links on ${new Set(links.map((l) => l.page)).size} pages\n`)
console.log('  kind              total   broken')
for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
  const bad = list.filter((l) => l.broken).length
  console.log(`  ${kind.padEnd(16)} ${String(list.length).padStart(6)} ${String(bad || '').padStart(8)}`)
}

if (!broken.length) {
  console.log('\n  nothing broken\n')
} else {
  // Group by target: one bad link is usually the same bad link on three pages,
  // one per language.
  const byRef = new Map()
  for (const l of broken) {
    const slot = byRef.get(l.ref) || { why: l.why, where: [] }
    slot.where.push(`${l.page}:${l.line}`)
    byRef.set(l.ref, slot)
  }

  console.log(`\n  ${broken.length} broken, ${byRef.size} distinct:\n`)
  for (const [ref, { why, where }] of [...byRef].sort((a, b) => b[1].where.length - a[1].where.length)) {
    console.log(`  ${JSON.stringify(ref)}`)
    console.log(`     ${why}`)
    console.log(`     ${where.slice(0, 3).join('  ')}${where.length > 3 ? `  … ${where.length - 3} more` : ''}`)
    console.log('')
  }
}

if (showAll) {
  for (const [kind, list] of Object.entries(byKind)) {
    console.log(`\n  --- ${kind} ---`)
    for (const ref of [...new Set(list.map((l) => l.ref))].sort()) console.log(`    ${ref}`)
  }
}

if (checkNet) {
  const urls = [...new Set(links.filter((l) => l.kind === 'web' && !l.broken).map((l) => l.url))]
  console.log(`\n  asking ${urls.length} addresses whether they answer…\n`)

  const ask = (url) => fetch(url, { method: 'HEAD', redirect: 'follow' })
    .then((r) => ({ url, status: r.status }))
    .catch((e) => ({ url, status: 0, error: e.message }))

  const run = async () => {
    const dead = []
    for (let i = 0; i < urls.length; i += 8) {
      const batch = await Promise.all(urls.slice(i, i + 8).map(ask))
      for (const r of batch) {
        if (r.status === 0 || r.status >= 400) dead.push(r)
      }
      process.stdout.write(`\r  checked ${Math.min(i + 8, urls.length)} of ${urls.length}`)
    }
    console.log(`\n\n  ${dead.length} did not answer:\n`)
    for (const d of dead) console.log(`    ${String(d.status || 'no answer').padStart(9)}  ${d.url}${d.error ? `  (${d.error})` : ''}`)
    process.exit(broken.length ? 1 : 0)
  }
  run()
} else {
  process.exit(broken.length ? 1 : 0)
}
