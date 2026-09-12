/**
 * Generates the service worker's cache-version map and build identity.
 *
 * Run after the lesson content and the bundles are in place — it reads both.
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

const fs = require('fs-extra')
const path = require('path')
const crypto = require('crypto')
const { execFileSync } = require('child_process')

const root = path.join(__dirname, '..')
const LESSONS = path.join(root, 'public/lessons')

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

for (const entry of fs.readdirSync(LESSONS, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  for (const file of fs.readdirSync(path.join(LESSONS, entry.name))) {
    versions[`${entry.name}/${file}`] = hashOf(path.join(LESSONS, entry.name, file))
  }
}

for (const name of ASSETS) {
  const file = path.join(root, 'public', name)
  if (!fs.existsSync(file)) {
    throw new Error(`Missing public/${name} — build the bundles before this script (see "yarn full").`)
  }
  versions[name] = hashOf(file)
}

// ------------------------------------------------------------ build identity

// major.minor stay hand-managed in package.json; the patch is the commit
// count, so the number moves forward on its own and no file is rewritten
// during a build. Without git, fall back to the version already declared.
const declared = fs.readJsonSync(path.join(__dirname, 'package.json')).version
const [major, minor] = declared.split('.')

const commits = git('rev-list', '--count', 'HEAD')
const version = commits ? `${major}.${minor}.${commits}` : declared

// The date describes the content, not the moment of the build, so two builds
// of the same commit agree.
const date = git('log', '-1', '--format=%cs') || new Date().toISOString().slice(0, 10)

// ------------------------------------------------------------------- write

const asModule = (name, value) =>
  `export const ${name} = ${JSON.stringify(value, null, '\t').replaceAll('"', '\'')}\n`

fs.writeFileSync(path.join(__dirname, 'src/configs/versions.js'), asModule('versions', versions), 'utf-8')
fs.writeFileSync(path.join(root, 'src/configs/serviceWorkerVersion.js'), asModule('serviceWorkerVersion', version), 'utf-8')
fs.writeFileSync(path.join(root, 'src/configs/serviceWorkerDate.js'), asModule('serviceWorkerDate', date), 'utf-8')

console.log(`service worker ${version} | ${date} — ${Object.keys(versions).length} resources hashed`)
