#!/usr/bin/env node
/**
 * Builds public/lessons/{ru,eng,ua}/*.md from content/.
 *
 *   node tools/i18n-build.js            every page
 *   node tools/i18n-build.js var        one page
 *
 * A page is a skeleton, one message file holding all three languages, and one
 * table of fragments — the inline code and link targets hidden from
 * translators. This puts them back together. Nothing else writes
 * public/lessons; editing those files directly means losing the edit on the
 * next build.
 *
 * An empty translation falls back to Russian, so a half-translated page
 * renders: translated paragraphs in the chosen language, the rest still in
 * Russian. That is what makes it possible to translate a page over several
 * sittings without ever publishing a broken one.
 *
 * A language only gets a file when the page has at least one translated key.
 * Writing all 167 pages in every language would tell the menu that everything
 * is translated, when most of it would be Russian text under an English name.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const CONTENT = path.join(root, 'content')
const LESSONS = path.join(root, 'public/lessons')

const REFERENCE = 'ru'
const LANGS = ['ru', 'eng', 'ua']
const { resolve } = require('./lib/phrase-refs')

const args = process.argv.slice(2)
const check = args.includes('--check')
const only = args.find((a) => !a.startsWith('--'))

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const book = readJson(path.join(CONTENT, 'phrases.json')) || {}

const pages = fs.readdirSync(path.join(CONTENT, 'lessons'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))
  .filter((p) => !only || p === only)
  .sort()

if (!pages.length) {
  console.error(only ? `no content/lessons/${only}.md` : 'no pages in content/lessons')
  process.exit(1)
}

let written = 0
let skipped = 0
const stale = []
const problems = []

for (const page of pages) {
  const skeleton = fs.readFileSync(path.join(CONTENT, 'lessons', `${page}.md`), 'utf8')
  const fragments = readJson(path.join(CONTENT, 'fragments', `${page}.json`)) || []
  const entries = readJson(path.join(CONTENT, 'messages', `${page}.json`))

  if (!entries) {
    problems.push(`${page}: no message file`)
    continue
  }

  for (const lang of LANGS) {
    const translated = lang === REFERENCE
      ? 1
      : Object.values(entries).filter((e) => e[lang]).length

    if (!translated) {
      skipped += 1
      continue
    }

    const page_ = skeleton.replace(/(?<!\{)\{\{([a-zA-Z0-9_.]+)\}\}(?!\})/g, (whole, key) => {
      // A repeated phrase lives in the shared table, not in the page: the
      // skeleton points at it so "или:" is one entry and one translation
      // rather than twelve keys saying the same thing.
      const entry = resolve(book, key) || entries[key]

      if (!entry) {
        problems.push(`${page}.${lang}: {{${key}}} has no text in any language`)
        return whole
      }
      // An empty string is a key nobody has translated yet, not a paragraph
      // that is meant to be blank — the extractor never makes a key for one.
      return entry[lang] || entry[REFERENCE]
    })

    const out = page_.replace(/⟦f(\d+)⟧/g, (whole, i) => {
      const value = fragments[Number(i)]
      if (value === undefined) {
        problems.push(`${page}.${lang}: ⟦f${i}⟧ is not in the fragment table`)
        return whole
      }
      return value
    })

    if (out.includes('⟦')) {
      problems.push(`${page}.${lang}: a marker survived assembly`)
      continue
    }

    const file = path.join(LESSONS, lang, `${page}.md`)
    fs.mkdirSync(path.dirname(file), { recursive: true })

    // Only write when something changed, so an unchanged page keeps its
    // modification time and the build stays quiet in git.
    const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
    if (before === out) continue

    if (check) {
      stale.push(`${lang}/${page}.md`)
      continue
    }

    fs.writeFileSync(file, out)
    written += 1
  }
}

if (check) {
  // A page in public/lessons that does not match what content/ says it should
  // be. It happens when messages are edited and the build is not run, and it
  // is invisible: the page renders, it is just out of date. One such page put
  // an example heading where a paragraph belonged, for weeks.
  if (stale.length) {
    console.error(`
  ${stale.length} built page${stale.length === 1 ? '' : 's'} no longer match content/:
`)
    for (const s of stale.slice(0, 20)) console.error(`    ${s}`)
    if (stale.length > 20) console.error(`    … and ${stale.length - 20} more`)
    console.error('\n  npm run lessons\n')
    process.exit(1)
  }
  console.log(`
  ${pages.length} pages: every built page matches content/
`)
  process.exit(0)
}

console.log(`${pages.length} page${pages.length > 1 ? 's' : ''}: ${written} file${written === 1 ? '' : 's'} written, ${skipped} language file${skipped === 1 ? '' : 's'} skipped for having no translation`)

if (problems.length) {
  console.log('\nproblems:')
  for (const p of problems.slice(0, 15)) console.log(`  ${p}`)
  if (problems.length > 15) console.log(`  … and ${problems.length - 15} more`)
  process.exit(1)
}
