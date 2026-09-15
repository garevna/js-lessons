/**
 * Points a page's skeleton at the phrase book instead of repeating a line in
 * the page.
 *
 * "или:" was twelve keys on one page, each holding the same two characters and
 * each translated separately. Now the skeleton says {{common.c17}} and the
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

/** The entry a {{common.c1}} or {{topic.t4}} reference points at. */
function resolve (book, key) {
  const dot = key.indexOf('.')
  if (dot === -1) return null
  const section = key.slice(0, dot)
  if (!SECTIONS.includes(section)) return null
  return (book[section] || {})[key.slice(dot + 1)] || null
}

module.exports = { dereference, resolve, SECTIONS }
