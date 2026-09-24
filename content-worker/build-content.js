/**
 * Writes the registry of lesson pages: which pages exist, and in which
 * languages.
 *
 *   node content-worker/build-content.js
 *
 * It used to write four modules into src/configs, which webpack then compiled
 * into content.worker.js. That made the bundle depend on the set of lesson
 * files: translating one page meant rebuilding the worker, and the built
 * bundle showed up in the diff of a commit that only added a translation.
 *
 * Now it writes one JSON file into public/lessons, next to the lessons
 * themselves, and the worker fetches it at startup. Pages are content, and
 * content is not part of the build — adding, translating or removing one
 * touches nothing but public/.
 *
 * This reads file names only. What is inside a lesson has never mattered here
 * and still does not, so editing the text of a page does not even change this
 * file.
 */

const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, '../public/lessons')

// The three languages the course is written in. Read as a list rather than
// scanned for, because public/lessons also holds lessons/js — the demo
// scripts the pages run, which are not pages.
const LANGS = ['ru', 'eng', 'ua']

const registry = {}

for (const lang of LANGS) {
  const dir = path.join(dirPath, lang)
  if (!fs.existsSync(dir)) continue

  registry[lang] = fs.readdirSync(dir)
    .filter(name => name.endsWith('.md'))
    .map(name => name.slice(0, -3))
    .sort()
}

// Russian is the language the lessons are written in, so a page missing from
// it is a page that does not exist at all — that list is what "pages" means.
registry.pages = registry.ru || []

const target = path.join(dirPath, 'index.json')
const text = JSON.stringify(registry, null, '\t') + '\n'

// Only write when something actually changed, so a watcher does not reload the
// browser for a build that produced the same registry.
const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf-8') : null

if (current === text) {
  console.log(`lessons/index.json unchanged (${registry.pages.length} pages)`)
} else {
  fs.writeFileSync(target, text, { encoding: 'utf-8' })
  console.log(`lessons/index.json — ${registry.pages.length} pages, ${Object.keys(registry).length - 1} languages`)
}
