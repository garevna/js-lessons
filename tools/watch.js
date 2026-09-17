#!/usr/bin/env node
/**
 * Rebuilds a lesson the moment its source changes.
 *
 *   npm run watch          in one terminal
 *   npm start              in another, then open localhost:8181
 *
 * Editing content/ changes nothing on its own: public/lessons is built from it,
 * and the build has to run. Running it by hand after every edit is the part
 * that makes editing feel broken, so this watches and runs it.
 *
 * It only rebuilds the page that changed, which takes a few milliseconds, and
 * only writes when the output actually differs — so live-server reloads the
 * browser exactly when something changed and stays quiet otherwise.
 *
 * One thing it cannot do for you: the service worker caches lessons, on
 * localhost as much as anywhere. If a rebuilt page does not appear, that is
 * why — see the note this prints on startup.
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const root = path.join(__dirname, '..')

const WATCHED = [
  'content/lessons',
  'content/messages',
  'content/fragments'
]

const SINGLE = ['content/phrases.json']

// A save often arrives as several events — the editor writes, truncates, and
// renames — so the work is deferred a moment and collapsed.
const PAUSE = 120

const pending = new Set()
let timer = null
let everything = false

const build = (page) => {
  const args = [path.join(root, 'tools/i18n-build.js')]
  if (page) args.push(page)
  try {
    const out = execFileSync(process.execPath, args, { cwd: root, encoding: 'utf8' })
    const line = out.trim().split('\n').filter(Boolean).pop() || ''
    const wrote = (line.match(/(\d+) files? written/) || [])[1]
    return { ok: true, wrote: Number(wrote || 0), line }
  } catch (error) {
    return { ok: false, line: (error.stdout || '') + (error.stderr || '') }
  }
}

const stamp = () => new Date().toTimeString().slice(0, 8)

/**
 * The set of built pages, so that a page appearing or disappearing can be
 * noticed.
 *
 * A lesson only gets a file in a language once it has a translation, and the
 * worker learns which languages a page exists in from a registry built by
 * scanning those folders. Rebuild the page and not the registry, and the site
 * goes on believing the page is untranslated: Irina translated
 * async-constructor into both languages, watched it rebuild, and still got the
 * "not translated yet" notice on localhost.
 */
const builtPages = () => {
  const found = []
  for (const lang of ['ru', 'eng', 'ua']) {
    const dir = path.join(root, 'public/lessons', lang)
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.md')) found.push(`${lang}/${f}`)
  }
  return found.sort().join('\n')
}

let known = builtPages()

/** Regenerating the registry costs a few seconds, so it waits to be needed. */
const refreshRegistry = () => {
  const now = builtPages()
  if (now === known) return false
  known = now

  const started = Date.now()
  try {
    execFileSync('npm', ['run', 'content-worker'], { cwd: root, encoding: 'utf8', shell: true, stdio: 'pipe' })
    console.log(`  ${stamp()}  набор страниц изменился — реестр пересобран (${Date.now() - started} мс)`)
  } catch (error) {
    console.log(`  ${stamp()}  реестр пересобрать не удалось:`)
    console.log(String(error.stdout || error.message).split('\n').filter(Boolean).slice(-4).map((l) => `            ${l}`).join('\n'))
  }
  return true
}

const run = () => {
  timer = null

  const pages = everything ? [null] : [...pending]
  pending.clear()
  everything = false

  for (const page of pages) {
    const started = Date.now()
    const result = build(page)
    const took = Date.now() - started
    const name = page || 'все страницы'

    if (!result.ok) {
      console.log(`  ${stamp()}  ${name}: не собралось`)
      console.log(result.line.split('\n').filter(Boolean).map((l) => `            ${l}`).join('\n'))
      continue
    }

    console.log(result.wrote
      ? `  ${stamp()}  ${name} — пересобрано (${result.wrote}, ${took} мс)`
      : `  ${stamp()}  ${name} — без изменений`)
  }

  refreshRegistry()
}

const schedule = (page) => {
  if (page) pending.add(page)
  else everything = true
  clearTimeout(timer)
  timer = setTimeout(run, PAUSE)
}

/** content/messages/var.json and content/lessons/var.md are both "var". */
const pageOf = (file) => {
  const name = path.basename(file).replace(/\.(md|json)$/, '')
  return fs.existsSync(path.join(root, 'content/lessons', `${name}.md`)) ? name : null
}

for (const dir of WATCHED) {
  const full = path.join(root, dir)
  if (!fs.existsSync(full)) continue

  fs.watch(full, { persistent: true }, (event, file) => {
    if (!file || /~$|\.tmp$|^\./.test(file)) return
    const page = pageOf(file)
    // A file with no skeleton is a page being created; rebuild everything so it
    // appears rather than reporting nothing and looking broken.
    schedule(page)
  })
}

for (const file of SINGLE) {
  const full = path.join(root, file)
  if (!fs.existsSync(full)) continue
  // The phrase book is shared, so a change to it can touch any page.
  fs.watch(full, { persistent: true }, () => schedule(null))
}

console.log(`
  Слежу за content/ — правь, страница пересоберётся сама.
  Рядом, в другом терминале:  npm start   →  localhost:8181

  ⚠  Service worker кэширует уроки и на локалхосте. Если пересобранная
     страница не появляется, дело в нём: в DevTools → Application →
     Service Workers включи "Bypass for network" — галочка держится,
     пока открыт инспектор, и ничего не ломает.

  Ctrl+C чтобы остановить.
`)

// The first build tells you at once whether content/ and public/ are in step.
schedule(null)
