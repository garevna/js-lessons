/**
 * The same phrase wears different clothes on different pages.
 *
 *   Результат        **Результат**        ◘◘^^Результат^^◘◘
 *   ![ico-25 cap] **Пример 1**
 *
 * All of those are one phrase with one translation, and treating them as four
 * means translating "Результат" four times and getting four answers. This
 * splits a message into the markup around it and the words inside, so the
 * words can be looked up once and the markup put back exactly as it was.
 */

const ICON = /^(!\[ico-\d+ [\w:-]+\]\s*)/
const PAIRS = ['◘◘', '^^', '**']

/** { pre, core, post } — pre + core + post is always the original, trimmed. */
function split (text) {
  let core = String(text).trim()
  let pre = ''
  let post = ''

  let changed = true
  while (changed) {
    changed = false

    // Inside the loop, not before it: an icon can sit within a wrapper, as in
    // ◘◘ ![ico-25 cap] **Пример 4** ◘◘, and is only reachable once the outer
    // pair has come off.
    const icon = core.match(ICON)
    if (icon) {
      pre += icon[1]
      core = core.slice(icon[1].length)
      changed = true
    }
    for (const mark of PAIRS) {
      if (core.length <= mark.length * 2) continue
      if (!core.startsWith(mark) || !core.endsWith(mark)) continue

      const inner = core.slice(mark.length, core.length - mark.length)

      // "**a** and **b**" opens and closes with the marker without being
      // wrapped in it. Unwrapping that would put the emphasis back in the
      // wrong places.
      if (inner.includes(mark)) continue

      const lead = inner.match(/^\s*/)[0]
      const tail = inner.match(/\s*$/)[0]

      pre += mark + lead
      post = tail + mark + post
      core = inner.slice(lead.length, inner.length - tail.length)
      changed = true
    }
  }

  return { pre, core, post }
}

/** The bare words, which is what the common table is keyed by. */
const core = (text) => split(text).core

/** Put a translation back into the markup the original wore. */
const dress = (text, original) => {
  const { pre, post } = split(original)
  return pre + text + post
}

module.exports = { split, core, dress }
