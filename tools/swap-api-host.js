#!/usr/bin/env node
/**
 * Points the lessons at the new practice backend.
 *
 *   node tools/swap-api-host.js https://js-lessons-sandbox.you.workers.dev
 *   node tools/swap-api-host.js https://…  --write
 *
 * Five servers on Glitch became one Worker with three prefixes, so this is not
 * a plain host swap — each old host maps to its own prefix. Run it once the
 * Worker is deployed and its address is known.
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')

const base = process.argv[2]
const write = process.argv.includes('--write')

if (!base || !/^https?:\/\//.test(base)) {
  console.error('usage: node tools/swap-api-host.js <https://your-worker-url> [--write]')
  process.exit(1)
}

const origin = base.replace(/\/+$/, '')

const MAP = {
  'https://garevna-rest-api.glitch.me': `${origin}/rest-api`,
  'https://json-server-with-router.glitch.me': `${origin}/rest-api`,
  'https://garevna-json-server.glitch.me': `${origin}/json-server`,
  'https://garevna-form-data.glitch.me': `${origin}/form-data`
}

// Left alone on purpose: it is commented out in hw-16, and the Worker has no
// chat in it.
const SKIP = ['garevna-chat.glitch.me']

let changed = 0
const touched = new Set()
const perHost = {}

for (const dir of ['content/lessons', 'content/messages', 'content/fragments']) {
  for (const file of fs.readdirSync(path.join(root, dir))) {
    const p = path.join(root, dir, file)
    const before = fs.readFileSync(p, 'utf8')
    let after = before

    for (const [from, to] of Object.entries(MAP)) {
      // The lessons write the address with and without the protocol.
      for (const form of [from, from.replace('https://', '')]) {
        if (!after.includes(form)) continue
        const n = after.split(form).length - 1
        perHost[from] = (perHost[from] || 0) + n
        changed += n
        after = after.split(form).join(form === from ? to : to.replace('https://', ''))
      }
    }

    if (after === before) continue
    touched.add(`${dir}/${file}`)
    if (write) fs.writeFileSync(p, after)
  }
}

console.log(`\n  ${write ? '' : 'DRY RUN — '}${changed} addresses in ${touched.size} files\n`)
for (const [from, n] of Object.entries(perHost)) {
  console.log(`  ${String(n).padStart(3)}×  ${from.replace('https://', '')}`)
  console.log(`        -> ${MAP[from]}`)
}

const left = []
for (const dir of ['content/lessons', 'content/messages', 'content/fragments']) {
  for (const file of fs.readdirSync(path.join(root, dir))) {
    const text = fs.readFileSync(path.join(root, dir, file), 'utf8')
    for (const host of SKIP) if (text.includes(host)) left.push(`${dir}/${file}: ${host}`)
    if (text.includes('cdn.glitch.com')) left.push(`${dir}/${file}: cdn.glitch.com`)
  }
}

if (left.length) {
  console.log(`\n  left alone, nothing to point them at:`)
  for (const l of [...new Set(left)]) console.log(`    ${l}`)
}

if (!write) console.log('\n  add --write to apply, then: npm run lessons\n')
