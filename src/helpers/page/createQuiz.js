/**
 * ♣♣♣♣ … ♣♣♣♣ — questions whose options are sentences.
 *
 *   ♣♣♣♣
 *   ? Какое из утверждений верно для Class Expression?
 *   + Оно может быть именованным или безымянным и не подвергается хостингу.
 *   = Верно! Имя выражения класса доступно только внутри самого класса.
 *   - Оно обязательно должно иметь уникальное имя.
 *   = Неверно. Class Expression может быть анонимным: ~const C = class {}~
 *   ♣♣♣♣
 *
 *   ?  the question — repeat the mark to carry it over several lines
 *   +  the right option
 *   -  a wrong one
 *   =  why the option above it is right or wrong
 *
 * A block rather than a line, and the reason is the shape of the content. The
 * short form, →→→ q | a, b, c | a →→→, fits on one line because every field on
 * it is a word: three values to choose between, and the answer named by
 * writing it a second time. Both of those stop working on sentences — a
 * statement about hoisting has commas in it, so the comma-separated field
 * splits it into three options, and naming the answer by repeating it means
 * repeating ninety characters that then have to stay identical through
 * translation.
 *
 * So the options are lines and the answer is a mark. One line, one message:
 * each becomes its own key, the same as a line of a black block or a grid, and
 * a translator sees a sentence rather than a field of a packed record.
 *
 * One ♣ block may hold several questions — a new ? after the options starts
 * the next one — and when it does they are handed to test-series and shown a
 * card at a time, with the counter and the score that already exist there.
 */
export function createQuiz (fragment) {
  const markup = (text) => {
    const out = this.parseAnchors(text)
    if (typeof out === 'string') return out
    // parseAnchors hands back an element when the line holds a link.
    const box = document.createElement('div')
    box.appendChild(out)
    return box.innerHTML
  }

  const questions = []
  let current = null
  let option = null

  // slice(1, -1): the fences are markup, like •••• and @@@@.
  for (const raw of fragment.split('\n').slice(1, -1)) {
    const line = raw.trim()
    if (!line) continue

    const mark = line[0]
    const text = line.slice(1).trim()

    if (mark === '?') {
      // A second ? while options are already standing is the next question;
      // one before any option is the rest of this question's text.
      if (!current || current.options.length) {
        current = { question: [], options: [] }
        questions.push(current)
        option = null
      }
      current.question.push(text)
      continue
    }

    if (!current) continue

    if (mark === '+' || mark === '-') {
      option = { text, right: mark === '+', why: [] }
      current.options.push(option)
      continue
    }

    if (mark === '=' && option) option.why.push(text)
  }

  const cards = questions
    .filter(({ question, options }) => question.length && options.length)
    .map(({ question, options }) => {
      const card = document.createElement('quiz-card')
      card.fill({
        question: markup(question.join(' ')),
        options: options.map(({ text, right, why }) => ({
          text: markup(text),
          right,
          why: why.length ? markup(why.join(' ')) : ''
        }))
      })
      return card
    })

  if (!cards.length) return null

  // One question stands where it is written, the way a single →→→ does. A run
  // of them is a quiz, and test-series is what a quiz is shown in.
  if (cards.length === 1) return this.main.appendChild(cards[0])

  const series = document.createElement('test-series')
  this.main.appendChild(series)
  series.fill(cards)

  return series
}
