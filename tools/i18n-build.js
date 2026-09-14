#!/usr/bin/env node
/**
 * Builds public/lessons/{ru,eng,ua}/*.md from content/.
 *
 *   node tools/i18n-build.js            every page
 *   node tools/i18n-build.js var        one page
 *
 * A page is a skeleton plus a message file per language plus one table of
 * fragments — the inline code and link targets hidden from translators. This
 * puts them back together. Nothing else writes public/lessons; editing those
 * files directly means losing the edit on the next build.
 *
 * A key with no translation falls back to Russian, so a half-translated page
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

const only = process.argv[2]

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

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
const problems = []

for (const page of pages) {
  const skeleton = fs.readFileSync(path.join(CONTENT, 'lessons', `${page}.md`), 'utf8')
  const fragments = readJson(path.join(CONTENT, 'fragments', `${page}.json`)) || []
  const source = readJson(path.join(CONTENT, 'messages', `${page}.${REFERENCE}.json`))

  if (!source) {
    problems.push(`${page}: no ${REFERENCE} messages`)
    continue
  }

  for (const lang of LANGS) {
    const messages = lang === REFERENCE
      ? source
      : readJson(path.join(CONTENT, 'messages', `${page}.${lang}.json`))

    if (!messages || !Object.keys(messages).length) {
      skipped += 1
      continue
    }

    const page_ = skeleton.replace(/(?<!\{)\{\{([a-zA-Z0-9_.]+)\}\}(?!\})/g, (whole, key) => {
      const text = messages[key] !== undefined ? messages[key] : source[key]
      if (text === undefined) {
        problems.push(`${page}.${lang}: {{${key}}} has no text in any language`)
        return whole
      }
      return text
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
    if (before !== out) {
      fs.writeFileSync(file, out)
      written += 1
    }
  }
}

console.log(`${pages.length} page${pages.length > 1 ? 's' : ''}: ${written} file${written === 1 ? '' : 's'} written, ${skipped} language file${skipped === 1 ? '' : 's'} skipped for having no translation`)

if (problems.length) {
  console.log('\nproblems:')
  for (const p of problems.slice(0, 15)) console.log(`  ${p}`)
  if (problems.length > 15) console.log(`  … and ${problems.length - 15} more`)
  process.exit(1)
}
