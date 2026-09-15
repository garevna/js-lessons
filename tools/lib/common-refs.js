/**
 * Points a page's skeleton at the shared phrase table instead of repeating the
 * phrase in the page.
 *
 * "или:" was twelve keys on one page, each holding the same two characters and
 * each translated separately. Now the skeleton says {{common.c17}} and the
 * phrase exists once.
 *
 * Only the words move. The markup around them — the emphasis, the border, a
 * trailing number — stays in the skeleton where it belongs, so an occurrence
 * written **или:** and one written или: share a translation and keep their own
 * appearance.
 */

const { split } = require('./phrases')

/**
 * A phrase short enough to be stock wording rather than page content.
 *
 * Two pages of the course are near-duplicates of each other — DOM-events and
 * DOM-events-eng, web-socket and web-soket — so every paragraph on them counts
 * as repeated, and without a limit 76 of one page's 95 keys would move into a
 * table of "common phrases". A heading or a stock line is short; a paragraph
 * that happens to appear twice is still that page's own text.
 *
 * The table itself keeps the long ones: the exporter uses it to fill in a
 * repeat without asking a translator twice. Only the skeleton reference is
 * limited.
 */
const STOCK = 60

/**
 * @returns { skeleton, entries, moved, refused }
 *   moved    keys replaced by a reference
 *   refused  keys that matched a phrase but could not be reassembled exactly
 */
function dereference (skeleton, entries, common, maxLength = STOCK) {
  const idOf = new Map()
  for (const [id, entry] of Object.entries(common)) {
    if (entry && entry.ru && entry.ru.length <= maxLength) idOf.set(entry.ru, id)
  }

  const kept = {}
  const moved = []
  const refused = []

  for (const [key, entry] of Object.entries(entries)) {
    const { pre, core, post } = split(entry.ru)
    const id = idOf.get(core)

    if (!id) {
      kept[key] = entry
      continue
    }

    // The reference has to render byte for byte what the key rendered, or the
    // page changes while claiming to be refactored.
    if (pre + common[id].ru + post !== entry.ru) {
      refused.push(key)
      kept[key] = entry
      continue
    }

    const placeholder = `{{${key}}}`
    if (!skeleton.includes(placeholder)) {
      refused.push(key)
      kept[key] = entry
      continue
    }

    skeleton = skeleton.split(placeholder).join(`${pre}{{common.${id}}}${post}`)
    moved.push(key)
  }

  return { skeleton, entries: kept, moved, refused }
}

module.exports = { dereference }
