#!/usr/bin/env node
/**
 * Turns every ••…<br />…•• message into a •••• block.
 *
 * A black paragraph used to be one message with <br /> between its lines:
 * unreadable in the message file, and a translator had to take the whole thing
 * in one bite. The block form gives every line its own key.
 *
 *   node tools/black-blocks.js           report only
 *   node tools/black-blocks.js --write   convert them
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MESSAGES = path.join(root, 'content/messages')
const LESSONS = path.join(root, 'content/lessons')

const write = process.argv.includes('--write')
const LANGS = ['ru', 'eng', 'ua']
const REFERENCE = 'ru'

// The whole message is one black span — anything else is prose with a span in
// it, which is not a block and is left alone.
const WHOLE = /^••(?!••)([\s\S]*)••$/
// </br /> among them: a closing tag where a break was meant. It never broke a
// line, so the text ran on; here it counts as the break it was meant to be.
const BREAK = /<\/?br\s*\/?>/

// The block draws its own icon now, named on the opening fence. A marker of
// the standard size moves there; an unusual size stays written out, because
// the fence can name which icon but not how big.
const LEADING_ICON = /^\s*!\[ico-(\d+)\s+([a-z_-]+)\]\s*/

/**
 * Where the languages disagree about line breaks, the Russian decides — it is
 * the reference everywhere else in this pipeline. These two say the same thing
 * in a different number of lines, so the surplus is joined back at the point
 * where the Russian keeps the sentence together. Nothing is reworded.
 */
const ALIGN = {
  'Classes:p107': { eng: [[1, 2]] },
  'Classes:p118': { eng: [[0, 1]], ua: [[1, 2]] }
}

const join = (parts, pairs) => {
  const out = parts.slice()
  // Back to front, so an earlier merge does not move a later index.
  for (const [a, b] of [...pairs].sort((x, y) => y[0] - x[0])) {
    out.splice(a, b - a + 1, out.slice(a, b + 1).join(' '))
  }
  return out
}

const report = []
const skipped = []

for (const file of fs.readdirSync(MESSAGES)) {
  if (!file.endsWith('.json')) continue

  const page = file.replace(/\.json$/, '')
  const skeletonFile = path.join(LESSONS, `${page}.md`)
  if (!fs.existsSync(skeletonFile)) continue

  const messages = JSON.parse(fs.readFileSync(path.join(MESSAGES, file), 'utf8'))
  let skeleton = fs.readFileSync(skeletonFile, 'utf8')
  const eol = skeleton.includes('\r\n') ? '\r\n' : '\n'

  const used = Object.keys(messages).filter((k) => /^p\d+$/.test(k)).map((k) => +k.slice(1))
  let next = (used.length ? Math.max(...used) : 0) + 1

  for (const key of Object.keys(messages)) {
    const entry = messages[key]
    const ru = (entry[REFERENCE] || '').trim()
    if (!ru.includes('••') || !BREAK.test(ru)) continue

    const where = `${page}:${key}`

    if (!WHOLE.test(ru)) { skipped.push([where, 'the span is only part of the message']); continue }
    if (!skeleton.includes(`{{${key}}}`)) { skipped.push([where, 'the skeleton does not reference it']); continue }

    const align = ALIGN[where] || {}
    const parts = {}

    for (const lang of LANGS) {
      const text = (entry[lang] || '').trim()
      if (!text) continue
      const inner = (text.match(WHOLE) || [, text])[1]
      // An empty piece is kept: <br><br> is a blank line between paragraphs
      // and the block renders one. Only a leading or trailing empty is noise.
      const pieces = inner.split(BREAK).map((s) => s.trim())
      while (pieces.length && !pieces[0]) pieces.shift()
      while (pieces.length && !pieces[pieces.length - 1]) pieces.pop()
      parts[lang] = join(pieces, align[lang] || [])
    }

    const count = parts[REFERENCE].length
    const wrong = LANGS.filter((l) => parts[l] && parts[l].length !== count)
    if (wrong.length) {
      skipped.push([where, `${wrong.map((l) => `${l} has ${parts[l].length}`).join(', ')}, ru has ${count}`])
      continue
    }

    // What the block used to open with decides what the fence asks for, so
    // the page looks exactly as it did — including the ones that opened with
    // no icon at all, which is most of them.
    const lead = parts[REFERENCE][0].match(LEADING_ICON)
    let fence = '•••• none'

    if (lead && lead[1] === '20') {
      fence = lead[2] === 'speach' ? '••••' : `•••• ${lead[2]}`
      for (const lang of LANGS) {
        if (parts[lang]) parts[lang][0] = parts[lang][0].replace(LEADING_ICON, '')
      }
    }

    const keys = []
    const body = []

    for (let i = 0; i < count; i++) {
      if (!parts[REFERENCE][i]) { body.push(''); continue }
      const id = `p${next++}`
      keys.push(id)
      body.push(`{{${id}}}`)
      messages[id] = Object.fromEntries(
        LANGS.filter((l) => parts[l]).map((l) => [l, parts[l][i]])
      )
    }

    delete messages[key]
    skeleton = skeleton.replace(`{{${key}}}`, [fence, ...body, '••••'].join(eol))

    report.push([where, keys.length, `${keys[0]}–${keys[keys.length - 1]}`, fence, parts[REFERENCE].find(Boolean).slice(0, 38)])
  }

  if (write && report.some(([w]) => w.startsWith(`${page}:`))) {
    // New keys are appended by Object.assign, which put the lines of a
    // converted paragraph at the bottom of the file under numbers nobody was
    // looking for — the paragraph vanished from where it had always been. The
    // file is read against the page, so it is written in the page's order.
    const at = (key) => {
      const i = skeleton.indexOf(`{{${key}}}`)
      return i === -1 ? null : i
    }

    const all = Object.keys(messages)
    const slots = []
    const referenced = []

    all.forEach((key, index) => {
      if (at(key) === null) return
      slots.push(index)
      referenced.push(key)
    })

    referenced.sort((a, b) => at(a) - at(b))

    const order = all.slice()
    slots.forEach((slot, i) => { order[slot] = referenced[i] })

    const ordered = Object.fromEntries(order.map((k) => [k, messages[k]]))

    fs.writeFileSync(path.join(MESSAGES, file), JSON.stringify(ordered, null, 2) + '\n')
    fs.writeFileSync(skeletonFile, skeleton)
  }
}

console.log(write ? `CONVERTED ${report.length}` : `WOULD CONVERT ${report.length} (dry run — pass --write)`)
for (const [where, count, range, fence, first] of report) {
  console.log(`  ${where.padEnd(24)} ${String(count)} -> ${range.padEnd(11)} ${fence.padEnd(13)} ${JSON.stringify(first)}`)
}
if (skipped.length) {
  console.log(`\nleft alone: ${skipped.length}`)
  for (const [where, why] of skipped) console.log(`  ${where.padEnd(26)} ${why}`)
}
