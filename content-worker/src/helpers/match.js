/**
 * Whether a query finds a lesson, given the lesson's words.
 *
 * The match used to be one direction only — the query had to sit inside a
 * keyword — and that is enough for English and nowhere near enough for the
 * two languages the course is mostly read in. Russian and Ukrainian change the
 * ending of a word: функции is not inside функция, промисы is not inside
 * промис, and a reader types whichever form comes to mind.
 *
 * So both sides lose their ending before they are compared, and a long word on
 * the lesson's side may also be found inside the query (promises finds
 * promise, классы finds класс). Short English words are kept out of that
 * second direction on purpose: set would otherwise be found inside settimeout,
 * call inside callback, and the results would fill up with lessons that only
 * share three letters with the question.
 *
 * Every word of the query has to be found, not the whole phrase in one piece:
 * "event loop" finds the lesson that has event and loop among its words, and
 * "приведение типов" finds the one whose title says Явное приведение типов.
 *
 * Nothing here knows which language the interface is in. A lesson is found by
 * an English word in the Ukrainian interface and by a Russian word in the
 * English one: the words are one pool.
 */

const CYRILLIC = /[а-яёіїєґ]/

// Longest first, so -ами is cut whole and not as -и.
const ENDINGS = [
  'иями', 'ями', 'ами', 'ого', 'его', 'ому', 'ему', 'ими', 'ыми', 'ій', 'ий', 'ый', 'ой', 'ая', 'яя', 'ое', 'ее',
  'ые', 'ие', 'ую', 'юю', 'ом', 'ем', 'ам', 'ям', 'ах', 'ях', 'ов', 'ев', 'ей', 'ів', 'ям',
  'ы', 'и', 'а', 'я', 'о', 'е', 'у', 'ю', 'ь', 'й', 'і', 'ї', 'є'
]

export function stem (word) {
  if (!CYRILLIC.test(word)) return word

  for (const ending of ENDINGS) {
    if (word.endsWith(ending) && word.length - ending.length >= 3) return word.slice(0, -ending.length)
  }

  return word
}

// A word of the lesson's is looked for inside the query too — promises has
// promise in it, асинхронщина has the root асинхрон — when it is long enough
// to mean something and the query is that word with an ending, not a longer
// word that happens to begin the same way. Without the second condition the
// root функци of функция was found inside функциональщина, and functional
// programming answered with every lesson that has a function in it.
const ENDING = 4

const whole = (term, word) => term.length >= (CYRILLIC.test(term) ? 4 : 5) && word.length - term.length <= ENDING

const trim = (part) => part.replace(/^[.\-'’]+|[.\-'’]+$/g, '')

/**
 * Every entry as written, and every word in it: a keyword "event loop" is also
 * the words event and loop, a title "Явное приведение типов" is also its three
 * words.
 */
export function termsOf (entries) {
  const terms = new Set()

  for (const entry of entries) {
    if (!entry) continue

    const text = String(entry).toLowerCase().trim()
    if (!text) continue

    terms.add(text)

    for (const part of text.split(/[\s,:;()/«»"!?]+/)) {
      const word = trim(part)
      if (word) terms.add(stem(word))
    }
  }

  return [...terms]
}

/**
 * Whether the lesson has the whole query, as one phrase, among its words.
 *
 * Asked before the words are taken one by one, and when some lesson has the
 * phrase only those lessons are the answer. "func staff" is a name of
 * functional programming; taken word by word, staff was also in the English
 * title of the asynchrony section, and the answer was forty lessons instead of
 * twenty-five.
 */
export function says (query, terms) {
  const phrase = String(query).toLowerCase().trim()
  return terms.some((term) => term.includes(phrase))
}

/**
 * Three ways a word of the query meets a word of the lesson:
 *
 *   — what was typed is inside it: функ finds функция, prom finds promise;
 *   — the two are one word once the endings are off: функции and функция,
 *     промисы and промис, типов and типы;
 *   — it is inside what was typed, with no more than an ending left over:
 *     promises has promise, асинхронщина has асинхрон.
 *
 * The cut form is only ever compared whole. Looked for inside the lesson's
 * words, функция cut to функци was the beginning of функциональ, and a search
 * for a function answered with all of functional programming.
 */
export function finds (query, terms) {
  const words = String(query).toLowerCase().trim().split(/\s+/).filter(Boolean)

  if (!words.length) return false

  return words.every((word) => {
    const cut = stem(word)
    return terms.some((term) => term.includes(word) || term === cut || (whole(term, word) && word.includes(term)))
  })
}
