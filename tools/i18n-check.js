#!/usr/bin/env node
/**
 * Checks the translations already on disk the way the importer checks a fresh
 * one — placeholders, icon names, tags and links against the Russian under the
 * same key.
 *
 *   node tools/i18n-check.js            every page
 *   node tools/i18n-check.js var        one page
 *   node tools/i18n-check.js --list     every finding, not just the counts
 *
 * The importer only ever saw each segment as it came in. These checks did not
 * all exist then, and a translation filed under the wrong key passes most of
 * them anyway, so the pages carry findings no import would accept today. This
 * is how to see them without re-importing anything.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const LANGS = ['eng', 'ua']

const args = process.argv.slice(2)
const list = args.includes('--list')
const only = args.find((a) => !a.startsWith('--'))

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const placeholders = (s) => (s.match(/⟦f\d+⟧/g) || []).sort().join(' ')
const icons = (s) => (s.match(/!\[ico-\d+ [\w:-]+\]/g) || []).sort().join(' ')
const tags = (s) => (s.match(/<\/?[a-zA-Z][^>]*>/g) || []).map((x) => x.toLowerCase()).sort().join(' ')
const urls = (s) => (s.match(/https?:\/\/[^\s)*_`'"<]+/g) || []).sort().join(' ')

const checks = [
  ['placeholders', placeholders],
  ['icon', icons],
  ['html', tags],
  ['url', urls]
]

const pages = fs.readdirSync(MESSAGES)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((p) => !only || p === only)
  .sort()

const rows = []
let checked = 0
let found = 0

for (const page of pages) {
  const entries = readJson(path.join(MESSAGES, `${page}.json`)) || {}

  for (const lang of LANGS) {
    const bad = []
    for (const [key, entry] of Object.entries(entries)) {
      if (!entry[lang]) continue
      checked += 1
      const why = checks.filter(([, f]) => f(entry.ru) !== f(entry[lang])).map(([name]) => name)
      if (entry[lang].includes('⟦BLOCK')) why.push('block')
      if (why.length) bad.push({ key, why: why.join('+'), ru: entry.ru, tr: entry[lang] })
    }
    if (bad.length) {
      rows.push({ file: `${page}.${lang}`, translated: Object.values(entries).filter((e) => e[lang]).length, bad })
      found += bad.length
    }
  }
}

rows.sort((a, b) => b.bad.length - a.bad.length)

console.log(`\n  ${checked} translated keys checked, ${found} do not match their Russian (${(100 * found / (checked || 1)).toFixed(1)}%)`)
console.log(`  across ${rows.length} of ${pages.length * LANGS.length} language files\n`)

if (!found) process.exit(0)

if (list) {
  for (const r of rows) {
    console.log(`  ${r.file}`)
    for (const b of r.bad) {
      console.log(`    ${b.key}  [${b.why}]`)
      console.log(`      ru: ${b.ru.slice(0, 100)}`)
      console.log(`      ->  ${b.tr.slice(0, 100)}`)
    }
    console.log('')
  }
} else {
  console.log('  file                                  translated   suspect')
  for (const r of rows.slice(0, 25)) {
    console.log(`  ${r.file.padEnd(36)} ${String(r.translated).padStart(10)} ${String(r.bad.length).padStart(9)}`)
  }
  if (rows.length > 25) console.log(`  … and ${rows.length - 25} more files`)
  console.log('\n  node tools/i18n-check.js <page> --list   to see them')
}

process.exit(1)
