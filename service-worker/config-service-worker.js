/**
 * Generates the service worker's build identity and cache-version map.
 *
 * Two phases, because they need different things to exist:
 *
 *   --identity  version + date, derived from git alone. The root bundle
 *               prints them in the footer, so this has to run before it.
 *               Only written on the deploy — see below.
 *   --versions  the hash map, which reads the built bundles and therefore
 *               has to run after them. It is written to public/versions.json
 *               and fetched by the worker, not compiled into it: lesson files
 *               are content, and a change to content must not change a
 *               bundle. Before, editing one word of one lesson rewrote
 *               service-worker.js, and a commit that fixed a typo carried a
 *               rebuilt worker with it.
 *
 * With no argument it does both, which is what a local rebuild wants once
 * the bundles are already there.
 *
 * Versions are content hashes, not modification times. mtime looked like the
 * obvious choice, but git does not store it: a fresh clone stamps every file
 * with the checkout time, so a CI build would mark all 350+ resources as
 * changed and every visitor would re-download the whole site after every
 * deploy. Locally the same thing happens whenever the tree is copied,
 * restored from a backup, or rewritten by a line-ending normalisation.
 *
 * A content hash has neither problem: it survives a clone, and a resource is
 * invalidated only when its bytes actually change.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { execFileSync } = require('child_process')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'public/lessons')

const args = process.argv.slice(2)
const only = args.find(a => a === '--identity' || a === '--versions')
const doIdentity = !only || only === '--identity'
const doVersions = !only || only === '--versions'

/**
 * Built assets cached alongside the lesson content.
 *
 * service-worker.js is deliberately absent. This script runs before that
 * bundle is built, so there is nothing to hash yet — and the bundle embeds
 * this very map, so a hash of it could never agree with itself. The service
 * worker is versioned by serviceWorkerVersion instead.
 */
const ASSETS = [
  'index.js',
  'content.worker.js',
  'icons.worker.js',
  'main-menu.js',
  'donate.js',
  'registerServiceWorker.js'
]

const hashOf = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 12)

/** Ask git, and carry on without it (a tarball, a plain copy, an offline box). */
function git (...args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

// ---------------------------------------------------------------- versions

const versions = {}

if (doVersions) {
  for (const entry of fs.readdirSync(LESSONS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    for (const file of fs.readdirSync(path.join(LESSONS, entry.name))) {
      versions[`${entry.name}/${file}`] = hashOf(path.join(LESSONS, entry.name, file))
    }
  }

  for (const name of ASSETS) {
    const file = path.join(root, 'public', name)
    if (!fs.existsSync(file)) {
      throw new Error(`Missing public/${name} — build the bundles first (see the "full" script).`)
    }
    versions[name] = hashOf(file)
  }
}

// ------------------------------------------------------------ build identity

/**
 * Worked out only when it is going to be used.
 *
 * It used to be computed unconditionally — two git subprocesses and all — even
 * for --versions, which does not want it. That was half the cost of a script
 * the watcher runs after every save.
 */
const identity = () => {
  // major.minor stay hand-managed in package.json; the patch is the commit
  // count, so the number moves forward on its own and no file is rewritten
  // during a build. Without git, fall back to the version already declared.
  const declared = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')).version
  const [major, minor] = declared.split('.')

  const commits = git('rev-list', '--count', 'HEAD')

  return {
    version: commits ? `${major}.${minor}.${commits}` : declared,
    // The date describes the content, not the moment of the build, so two
    // builds of the same commit agree.
    date: git('log', '-1', '--format=%cs') || new Date().toISOString().slice(0, 10)
  }
}

// ------------------------------------------------------------------- write

const asModule = (name, value) =>
  `export const ${name} = ${JSON.stringify(value, null, '\t').replaceAll('"', '\'')}\n`

if (doIdentity) {
  const { version, date } = identity()

  const files = [
    [path.join(root, 'src/configs/serviceWorkerVersion.js'), asModule('serviceWorkerVersion', version)],
    [path.join(root, 'src/configs/serviceWorkerDate.js'), asModule('serviceWorkerDate', date)]
  ]

  // Locally the version is left alone.
  //
  // It is the commit count, so the number itself only moves when something is
  // committed — but the files were rewritten by every local build, and the
  // root bundle prints the version, so rebuilding to preview one changed
  // letter put two more files in the diff. What the site says is settled by
  // the deploy, which builds from a clean checkout and publishes its own
  // output; nothing about the number depends on the copy in the working tree.
  //
  // Written anyway when missing — the bundle imports them — and on demand with
  // --force.
  const missing = files.some(([file]) => !fs.existsSync(file))
  const write = !!process.env.CI || args.includes('--force') || missing

  if (write) {
    for (const [file, text] of files) fs.writeFileSync(file, text, 'utf-8')
    console.log(`service worker ${version} | ${date}`)
  } else {
    console.log(`service worker ${version} | ${date} — локально не переписываю (--force, если надо)`)
  }
}

if (doVersions) {
  const target = path.join(root, 'public/versions.json')
  const text = JSON.stringify(versions, null, '\t') + '\n'

  // Only write when it differs, so a watcher does not reload the browser for
  // a build that produced the same map.
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf-8') : null

  if (current === text) {
    console.log(`${Object.keys(versions).length} resources hashed — unchanged`)
  } else {
    fs.writeFileSync(target, text, 'utf-8')
    console.log(`${Object.keys(versions).length} resources hashed`)
  }
}
