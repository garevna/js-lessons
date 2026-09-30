/**
 * Points a page's skeleton at the phrase book instead of repeating a line in
 * the page.
 *
 * "или:" was twelve keys on one page, each holding the same two characters and
 * each translated separately. Now the skeleton says {{common.or}} and the
 * phrase exists once. A lesson's own repeated wording works the same way but
 * says {{topic.t4}}, so the page keeps its voice on the page.
 *
 * Only the words move. The markup around them — the emphasis, the border, a
 * trailing number — stays in the skeleton, so an occurrence written **или:**
 * and one written или: share a translation and keep their own appearance.
 */

const { split } = require('./phrases')

const SECTIONS = ['common', 'topic']

/**
 * @returns { skeleton, entries, moved, refused }
 *   moved    keys replaced by a reference
 *   refused  keys that matched a phrase but could not be reassembled exactly
 */
function dereference (skeleton, entries, book) {
  const idOf = new Map()
  for (const section of SECTIONS) {
    for (const [id, entry] of Object.entries(book[section] || {})) {
      if (entry && entry.ru) idOf.set(entry.ru, `${section}.${id}`)
    }
  }

  const kept = {}
  const moved = []
  const refused = []

  for (const [key, entry] of Object.entries(entries)) {
    const { pre, core, post } = split(entry.ru)
    const ref = idOf.get(core)

    if (!ref) {
      kept[key] = entry
      continue
    }

    const [section, id] = ref.split('.')

    // The reference has to render byte for byte what the key rendered, or the
    // page changes while claiming to be refactored.
    const placeholder = `{{${key}}}`
    if (pre + book[section][id].ru + post !== entry.ru || !skeleton.includes(placeholder)) {
      refused.push(key)
      kept[key] = entry
      continue
    }

    skeleton = skeleton.split(placeholder).join(`${pre}{{${ref}}}${post}`)
    moved.push(key)
  }

  return { skeleton, entries: kept, moved, refused }
}

/**
 * The entry a {{common.result}} or {{topic.t4}} reference points at.
 *
 * The lookup asks whether the book itself has the name, not whether reading it
 * yields something. Keys are named after the English word now, and a plain
 * object already answers to constructor, toString and valueOf — inherited from
 * its prototype, and truthy. {{common.constructor}} would have resolved to the
 * Object function, taken entry[lang] off it, found nothing, and written the
 * word undefined into the lesson without a word of complaint.
 */
function resolve (book, key) {
  const dot = key.indexOf('.')
  if (dot === -1) return null
  const section = key.slice(0, dot)
  if (!SECTIONS.includes(section)) return null

  const entries = book[section]
  const id = key.slice(dot + 1)

  if (!entries || !Object.prototype.hasOwnProperty.call(entries, id)) return null

  return entries[id] || null
}

module.exports = { dereference, resolve, SECTIONS }
