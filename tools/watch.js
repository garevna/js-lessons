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
 * The same is true of src/, which is where the styles are. They are not CSS
 * files the browser fetches — they are template strings compiled into
 * public/index.js — so a change to a colour is invisible until webpack runs.
 * That is watched too, and rebuilt in production mode, because the bundles are
 * committed and a development build must never reach the live site.
 *
 * It only rebuilds the page that changed, which takes a few milliseconds, and
 * only writes when the output actually differs — so live-server reloads the
 * browser exactly when something changed and stays quiet otherwise.
 *
 * Lesson files are not part of any bundle: the workers fetch them, and fetch
 * the two small JSON files that say which pages exist and what version each
 * resource is at. So a content edit never runs webpack, and the whole round
 * trip from save to reloaded tab is under a second.
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const root = path.join(__dirname, '..')

/**
 * One watcher at a time.
 *
 * Closing a terminal on Windows kills the shell, not its grandchildren:
 * `npm run watch` is npm, and npm is what receives the Ctrl+C, while the node
 * process it started carries on watching. Nothing says so, and the machine had
 * been up eight days — so five forgotten watchers were rebuilding the same
 * pages at once, each one also tripping the others by writing the files they
 * were watching. It looked like the build had become slow.
 *
 * The lock lives under node_modules, which is not in git, and a lock left by a
 * process that is gone is ignored rather than honoured.
 */
const LOCK = path.join(root, 'node_modules/.cache/watch.pid')

const alive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    // EPERM means it exists and belongs to someone else — still running.
    return error.code === 'EPERM'
  }
}

const claimLock = () => {
  if (fs.existsSync(LOCK)) {
    const owner = Number(fs.readFileSync(LOCK, 'utf8').trim())

    if (owner && owner !== process.pid && alive(owner)) {
      console.log(`
  Вотчер уже работает — процесс ${owner}.

  Если его терминал закрыт, процесс всё равно жив: на Windows закрытие
  вкладки снимает оболочку, но не node внутри неё. Остановить:

      taskkill /PID ${owner} /F

  Два вотчера на одних файлах пересобирают всё по два раза и будят друг
  друга — именно так сборка и становится медленной.
`)
      process.exit(1)
    }
  }

  fs.mkdirSync(path.dirname(LOCK), { recursive: true })
  fs.writeFileSync(LOCK, String(process.pid))

  const release = () => { try { fs.unlinkSync(LOCK) } catch {} }

  process.on('exit', release)
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    process.on(signal, () => { release(); process.exit(0) })
  }
}

claimLock()

const WATCHED = [
  'content/lessons',
  'content/messages',
  'content/fragments'
]

const SINGLE = ['content/phrases.json']

/** Styles, components and helpers — everything webpack compiles. */
const SOURCE = 'src'

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
 * The two files that describe the content rather than being it: the registry
 * of which pages exist in which language, and the map of content hashes the
 * service worker checks pages against.
 *
 * Neither is compiled into a bundle any more — both are written straight into
 * public/ and fetched at runtime — so keeping them current costs a third of a
 * second and no webpack at all. It used to mean rebuilding the content
 * worker, which is why a newly translated page took five seconds to appear.
 */
const refreshRegistry = () => {
  const started = Date.now()
  const said = []

  const scripts = [
    ['content-worker/build-content.js', []],
    ['service-worker/config-service-worker.js', ['--versions']]
  ]

  for (const [script, args] of scripts) {
    try {
      const out = execFileSync(process.execPath, [path.join(root, script), ...args], { cwd: root, encoding: 'utf8' })
      said.push(out.trim().split('\n').filter(Boolean).pop() || '')
    } catch (error) {
      said.push(String(error.stdout || error.message).split('\n').filter(Boolean).pop() || '')
    }
  }

  console.log(`  ${stamp()}  ${said.join('  |  ')}  (${Date.now() - started} мс)`)
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

/**
 * Styles and components are not content, and they are not files the browser
 * reads: src/styles/*.js and src/css/*.css are compiled into public/index.js,
 * so editing one changes nothing until webpack runs. Watching content/ alone
 * made that look like the edit had no effect.
 *
 * It rebuilds in production mode on purpose. A development build is the same
 * code but 170 KB larger, and public/index.js is committed — so a watch that
 * left a development bundle behind would put it on the live site.
 */
let bundling = false
let bundleAgain = false

const bundle = () => {
  if (bundling) { bundleAgain = true; return }
  bundling = true

  const started = Date.now()
  try {
    execFileSync('npm', ['run', 'prod'], { cwd: root, encoding: 'utf8', shell: true, stdio: 'pipe' })
    console.log(`  ${stamp()}  src/ — бандлы пересобраны (${Date.now() - started} мс)`)
  } catch (error) {
    console.log(`  ${stamp()}  бандлы не собрались:`)
    console.log(String(error.stdout || error.message).split('\n').filter(Boolean).slice(-6).map((l) => `            ${l}`).join('\n'))
  }

  bundling = false
  if (bundleAgain) { bundleAgain = false; bundle() }
}

let bundleTimer = null

const scheduleBundle = () => {
  clearTimeout(bundleTimer)
  bundleTimer = setTimeout(bundle, PAUSE)
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

// Recursive watching is supported on Windows and macOS but not on Linux, so
// fall back to one watch per folder there rather than silently watching only
// the top level.
const watchSource = () => {
  const full = path.join(root, SOURCE)
  if (!fs.existsSync(full)) return

  const onChange = (event, file) => {
    if (!file || /~$|\.tmp$|^\./.test(file)) return
    scheduleBundle()
  }

  try {
    fs.watch(full, { persistent: true, recursive: true }, onChange)
  } catch {
    const folders = [full]
    for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
      if (entry.isDirectory()) folders.push(path.join(full, entry.name))
    }
    for (const folder of folders) fs.watch(folder, { persistent: true }, onChange)
  }
}

watchSource()

console.log(`
  Слежу за content/ — правь, страница пересоберётся сама (~0,4 с).
  И за src/ — стили и компоненты пересоберутся в бандлы (~1,5 с).
  Рядом, в другом терминале:  npm start   →  localhost:8181

  Service worker на локалхосте выключен, так что кэш ничего не прячет.
  Включить для проверки:  localStorage.setItem('service-worker', 'on')

  Ctrl+C чтобы остановить.
`)

// The first build tells you at once whether content/ and public/ are in step.
schedule(null)
