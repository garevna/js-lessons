#!/usr/bin/env node
/**
 * Finds the translated version of a link, where one exists.
 *
 *   node tools/i18n-links.js            what it would find
 *   node tools/i18n-links.js --write    write src/configs/localizedLinks.js
 *
 * A lesson linking to en.wikipedia.org/wiki/Idempotence should send a Russian
 * reader to ru.wikipedia.org/wiki/Идемпотентность. The address cannot simply
 * have its language swapped: Wikipedia titles its articles differently in each
 * language, and MDN has a Russian translation of some pages and not others.
 * So each candidate is asked rather than guessed.
 *
 *   wikipedia   the langlinks API gives the real title in the other language
 *   mdn         /ru/… answers 200 when it is translated and redirects to
 *               /en-US/… when it is not. There is no Ukrainian MDN at all.
 *
 * The result is a table the renderer reads at link time, so it covers both the
 * addresses written in the lessons and the ones in externalLinks.js, and no
 * page has to hold three versions of the same link.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const OUT = path.join(root, 'src/configs/localizedLinks.js')

const write = process.argv.includes('--write')

const LANGS = { ru: 'ru', ua: 'uk' }   // our code -> the code the sites use

/* ------------------------------------------------------- collecting urls */

const urls = new Set()

for (const f of fs.readdirSync(path.join(root, 'content/fragments'))) {
  const table = JSON.parse(fs.readFileSync(path.join(root, 'content/fragments', f), 'utf8'))
  for (const v of table) if (typeof v === 'string' && /^https?:\/\//.test(v)) urls.add(v)
}

for (const f of fs.readdirSync(path.join(root, 'content/messages'))) {
  const entries = JSON.parse(fs.readFileSync(path.join(root, 'content/messages', f), 'utf8'))
  for (const entry of Object.values(entries)) {
    for (const lang of ['ru', 'eng', 'ua']) {
      if (!entry[lang]) continue
      for (const m of entry[lang].matchAll(/\]\((https?:\/\/[^)]+)\)/g)) urls.add(m[1])
    }
  }
}

const config = fs.readFileSync(path.join(root, 'src/configs/externalLinks.js'), 'utf8')
for (const m of config.matchAll(/'(https?:\/\/[^']+)'/g)) urls.add(m[1])

/* --------------------------------------------------------------- asking */

const wait = (ms) => new Promise((done) => setTimeout(done, ms))

// Wikimedia turns away requests that do not say who is asking, and a
// rejection reads exactly like "there is no translation" unless you look.
const UA = { 'User-Agent': 'js-lessons-link-check/1.0 (https://github.com/garevna/js-lessons)' }

const ask = async (url) => {
  try {
    const r = await fetch(url, { redirect: 'manual' })
    return r.status
  } catch {
    return 0
  }
}

/** Wikipedia names the same article differently in every language. */
async function wikipedia (url) {
  const m = url.match(/^https:\/\/(\w+)\.wikipedia\.org\/wiki\/(.+)$/)
  if (!m) return null

  const [, from, title] = m
  const found = {}
  let missing = false

  for (const [ours, theirs] of Object.entries(LANGS)) {
    const api = `https://${from}.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks` +
      `&titles=${title}&lllang=${theirs}&llprop=url&formatversion=2`

    // One failed request used to be indistinguishable from "there is no
    // translation", and it quietly cost Вторая and Третья нормальная форма
    // their Russian pages. A retry, and a failure that says so.
    let page = null
    for (let attempt = 0; attempt < 3 && !page; attempt += 1) {
      try {
        const data = await (await fetch(api, { headers: UA })).json()
        page = data && data.query && data.query.pages && data.query.pages[0]
      } catch {
        await wait(400 * (attempt + 1))
      }
    }

    if (!page) return { failed: true }
    if (page.missing) { missing = true; continue }
    if (page.langlinks && page.langlinks[0]) found[ours] = decodeURI(page.langlinks[0].url)
  }

  if (missing) return { missing: true }
  return Object.keys(found).length ? found : null
}

/** MDN keeps the same path and answers 302 when the locale has no translation. */
async function mdn (url) {
  const m = url.match(/^https:\/\/developer\.mozilla\.org\/([\w-]+)(\/docs\/.+)$/)
  if (!m) return null

  const [, , rest] = m
  const found = {}

  for (const [ours, theirs] of Object.entries(LANGS)) {
    const candidate = `https://developer.mozilla.org/${theirs}${rest}`
    if (await ask(candidate) === 200) found[ours] = candidate
  }

  return Object.keys(found).length ? found : null
}

/** The address as the lessons should hold it: the English one. */
const canonical = (url) =>
  url.replace(/^(https:\/\/developer\.mozilla\.org\/)[\w-]+(\/docs\/)/, '$1en-US$2')

/* ----------------------------------------------------------------- run */

async function run () {
  const candidates = [...urls]
    .filter((u) => /\.wikipedia\.org\/wiki\//.test(u) || /developer\.mozilla\.org\/[\w-]+\/docs\//.test(u))
    .map(canonical)

  const unique = [...new Set(candidates)].sort()
  console.log(`\n  ${urls.size} addresses in all, ${unique.length} of them can have a translated version\n`)

  const table = {}
  const failed = []
  const missing = []
  let asked = 0

  for (const url of unique) {
    const found = await (/wikipedia/.test(url) ? wikipedia(url) : mdn(url))
    asked += 1
    process.stdout.write(`\r  asked ${asked} of ${unique.length}`)
    await wait(150)

    if (found && found.failed) { failed.push(url); continue }
    if (found && found.missing) { missing.push(url); continue }
    if (found) table[url] = found
  }

  console.log('\n')

  for (const [url, found] of Object.entries(table)) {
    console.log(`  ${url}`)
    for (const [lang, to] of Object.entries(found)) console.log(`     ${lang}  ${to}`)
    console.log('')
  }

  if (missing.length) {
    console.log(`  ${missing.length} of them name an article that does not exist — a broken link, not a missing translation:`)
    for (const u of missing) console.log(`    ${u}`)
    console.log('')
  }

  if (failed.length) {
    console.log(`  ${failed.length} could not be asked (the site did not answer); run again:`)
    for (const u of failed) console.log(`    ${u}`)
    console.log('')
  }

  const without = unique.filter((u) => !table[u] && !missing.includes(u) && !failed.includes(u))
  if (without.length) {
    console.log(`  no translation found for ${without.length}:`)
    for (const u of without) console.log(`    ${u}`)
  }

  if (!write) {
    console.log('\n  node tools/i18n-links.js --write   to write src/configs/localizedLinks.js\n')
    return
  }

  const body = [
    '/**',
    ' * The same page in another language, where the site has one.',
    ' *',
    ' * Written by tools/i18n-links.js, which asks each site rather than guessing:',
    ' * Wikipedia titles an article differently in every language, and MDN has a',
    ' * Russian translation of some pages and not others. Re-run it after adding',
    ' * links; it only ever adds what it can prove.',
    ' *',
    ' * The lessons hold the English address. This is read when a link is drawn,',
    ' * so it covers the addresses written in the pages and the ones in',
    ' * externalLinks.js alike, and no page has to carry three versions of a link.',
    ' */',
    '',
    'export const localizedLinks = ' + JSON.stringify(table, null, 2),
    ''
  ].join('\n')

  fs.writeFileSync(OUT, body)
  console.log(`\n  written: src/configs/localizedLinks.js — ${Object.keys(table).length} addresses\n`)
}

run()
