#!/usr/bin/env node
/**
 * Runs the built workers the way the browser runs them, and checks they answer.
 *
 *   npm run workers
 *
 * The bundles in public/ are what ships. Webpack compiling them without an
 * error says nothing about whether they still work: when getMainMenu became
 * asynchronous, search kept calling it synchronously and mapped over a
 * promise. The build was green, every page still opened, and the search box
 * quietly returned nothing.
 *
 * So the bundles are loaded into a sandbox with a real fetch against a real
 * server over public/, and asked the questions the page asks.
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const root = path.join(__dirname, '..')
const PUBLIC = path.join(root, 'public')

const TYPES = { '.json': 'application/json', '.md': 'text/markdown', '.js': 'text/javascript' }

let offline = false
let served = 0

const server = http.createServer((request, response) => {
  served++
  const file = path.join(PUBLIC, decodeURIComponent(request.url.split('?')[0]))
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404)
    return response.end('not found')
  }
  response.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'text/plain' })
  fs.createReadStream(file).pipe(response)
})

const results = []

const check = (name, ok, note = '') => {
  results.push(ok)
  console.log(`  ${ok ? ' ok ' : 'FAIL'}  ${name}${note ? '  — ' + note : ''}`)
}

/**
 * Just enough of the Cache API to watch what the service worker does with it.
 *
 * match hands back a clone, as the real one does. Returning the stored object
 * itself means the first reader consumes its body and the next check gets
 * "Body has already been read" — an artefact of the stand-in, not a fault in
 * the worker.
 */
class Cache {
  constructor () { this.store = new Map() }
  async put (url, response) { this.store.set(String(url), response) }
  async match (request) {
    const stored = this.store.get(typeof request === 'string' ? request : request.url)
    return stored ? stored.clone() : undefined
  }

  async delete (url) { return this.store.delete(String(url)) }
  async addAll () { return true }
}

const load = (file, globals) => {
  const context = vm.createContext(globals)
  for (const key of Object.keys(globals)) context[key] = globals[key]
  vm.runInContext(fs.readFileSync(path.join(PUBLIC, file), 'utf8'), context, { filename: file })
  return context
}

const contentWorker = async (origin) => {
  console.log('\ncontent worker')

  const sent = []
  const globals = {
    location: { origin, pathname: '/content.worker.js', href: `${origin}/content.worker.js` },
    fetch,
    postMessage: (message) => sent.push(message),
    console
  }
  globals.self = globals

  const worker = load('content.worker.js', globals)
  const ask = async (route, param) => { sent.length = 0; await worker.controller({ route, param }); return sent }

  const registry = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'lessons/index.json'), 'utf8'))

  let out = await ask('init', { lang: 'ru', page: 'length' })
  let lesson = out.find((m) => m.route === 'lesson')
  check('a lesson that exists comes back', !!lesson && lesson.response.length > 100, lesson && `${lesson.response.length} bytes`)

  const menu = out.find((m) => m.route === 'main-menu')
  const items = menu ? menu.response.flatMap((s) => s.items) : []
  check('the menu is built from the fetched registry', items.length > 100, `${menu ? menu.response.length : 0} sections, ${items.length} lessons`)
  check('nothing in the menu leads to a page that is gone', items.every((i) => registry.pages.includes(i.ref)))

  out = await ask('lesson', 'no-such-page-at-all')
  lesson = out.find((m) => m.route === 'lesson')
  check('a page that does not exist gets the 404', !!lesson && /не существует|does not exist|не існує/i.test(lesson.response))

  const untranslated = registry.ru.find((p) => !registry.eng.includes(p))
  await ask('lang', 'eng')
  out = await ask('lesson', untranslated)
  lesson = out.find((m) => m.route === 'lesson')
  check(`an untranslated page gets the notice, not the 404 (${untranslated})`,
    !!lesson && /not been translated|ще не перекладено|not translated|sand-watch/i.test(lesson.response))

  await ask('lang', 'ru')
  out = await ask('main-menu')
  const flagged = out.find((m) => m.route === 'main-menu').response.flatMap((s) => s.items)
  const wrong = flagged.filter((i) => i.translated !== (registry.eng.includes(i.ref) && registry.ua.includes(i.ref)))
  check('the "translated" flag agrees with the registry', wrong.length === 0, `${wrong.length} disagree`)

  // The one that broke without anything noticing.
  out = await ask('search', 'closure')
  const found = out.find((m) => m.route === 'main-menu')
  const hits = found && typeof found.response.map === 'function' ? found.response.flatMap((s) => s.items) : null
  check('search answers with a menu', !!hits, hits ? `"closure" -> ${hits.map((i) => i.ref).join(', ')}` : 'it did not return a list')
  check('search narrows the menu', !!hits && hits.length > 0 && hits.length < items.length)

  out = await ask('search', '')
  const all = out.find((m) => m.route === 'main-menu')
  check('an empty search gives the whole menu back',
    !!all && typeof all.response.map === 'function' && all.response.flatMap((s) => s.items).length === items.length)

  out = await ask('keywords')
  const keywords = out.find((m) => m.route === 'keywords')
  check('the keyword list is served', !!keywords && Object.keys(keywords.response).length > 50,
    keywords && `${Object.keys(keywords.response).length} lessons have keywords`)
}

const serviceWorker = async (origin) => {
  console.log('\nservice worker')

  const cache = new Cache()
  const listeners = {}
  const globals = {
    location: { origin, pathname: '/service-worker.js', port: String(new URL(origin).port), href: `${origin}/service-worker.js` },
    addEventListener: (name, fn) => { listeners[name] = fn },
    skipWaiting: () => {},
    registration: {},
    clients: { claim: async () => {} },
    caches: { open: async () => cache },
    navigator: { onLine: true },
    Headers,
    Response,
    Request,
    fetch: (...args) => offline ? Promise.reject(new Error('offline')) : fetch(...args),
    console
  }
  globals.self = globals

  load('service-worker.js', globals)

  const get = async (url) => {
    let captured
    listeners.fetch({ request: new Request(url), respondWith: (p) => { captured = p } })
    return await captured
  }

  const versions = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'versions.json'), 'utf8'))
  const url = `${origin}/lessons/ru/length.md`

  let response = await get(url)
  let body = await response.clone().text()
  check('a lesson not yet cached is fetched', response.ok && body.length > 100, `${body.length} bytes`)

  const stored = await cache.match({ url })
  check('it is cached with the version from the map',
    !!stored && stored.headers.get('last-update') === versions['ru/length.md'],
    stored && stored.headers.get('last-update'))

  served = 0
  response = await get(url)
  check('the second request is served from the cache', (await response.text()).length > 100 && served === 0)

  offline = true
  response = await get(url)
  body = await response.text()
  check('offline, the cached copy is served rather than an error', body.length > 100, `${body.length} bytes`)
  offline = false
}

server.listen(0, async () => {
  const origin = `http://127.0.0.1:${server.address().port}`

  for (const file of ['content.worker.js', 'service-worker.js', 'lessons/index.json', 'versions.json']) {
    if (fs.existsSync(path.join(PUBLIC, file))) continue
    console.log(`\npublic/${file} is missing — run npm run full first`)
    server.close()
    process.exit(1)
  }

  try {
    await contentWorker(origin)
    await serviceWorker(origin)
  } catch (error) {
    check('the workers ran at all', false, error.message)
  }

  server.close()

  const failed = results.filter((ok) => !ok).length

  console.log(failed
    ? `\n${failed} of ${results.length} checks failed\n`
    : `\nall ${results.length} checks passed\n`)

  process.exit(failed ? 1 : 0)
})
