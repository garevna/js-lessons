const { createElem } = require('../helpers').default
const { quizStyles } = require('../styles').default
const { pageLabels, lang } = require('../configs').default

/**
 * A question whose options are sentences, each with its own explanation.
 *
 * ~~~tests holds the other kind: a short question and three or four short
 * values to pick between — Number('5') against 5, '5' and NaN. That shape is
 * written on one line, and the line works because every field on it is a word
 * long.
 *
 * This kind is written as a block, one option per line, because the fields are
 * not words. An option here is a full statement about the language — "it may
 * be named or anonymous, and it is not hoisted" — and the reason it is right
 * or wrong is a sentence too. On one line that is nine fields and nine hundred
 * characters.
 *
 * Two things follow from the shape rather than from taste:
 *
 *   the right option is marked, not repeated.  →→→ names its answer by
 *   writing it out a second time, and the two copies have to match character
 *   for character. A translator who rewrites "0" as „0“ breaks the test
 *   silently, which is why i18n-import carries a check for exactly that. A
 *   sentence has far more to get wrong than a quoted zero, so the mark moves
 *   into the markup: + is the answer, - is not.
 *
 *   the explanation is the point.  A reader who picks the wrong option has
 *   learned nothing from going red. The sentence under it is the lesson, and
 *   it is the reason this component exists at all.
 *
 * Radio inputs, a #result box and an `answered` event, all exactly as
 * test-component has them, so a block of these can be handed to test-series
 * and counted without the series knowing which kind it is holding.
 */
class QuizCard extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    createElem('style', this.shadow).textContent = quizStyles

    this.box = Object.assign(createElem('fieldset', this.shadow), { className: 'quiz' })
    this.question = Object.assign(createElem('div', this.box), { className: 'question' })
    this.list = Object.assign(createElem('div', this.box), { className: 'options' })
    this.result = Object.assign(createElem('div', this.box), { id: 'result' })

    this.rows = []
    this.answered = false

    // Set by test-series on the cards it holds. A single question stands on
    // the page by itself: there is nothing after it to go on to, so it is
    // answered and that is the end of it.
    this.inSeries = false
  }

  word (name) {
    return pageLabels[name][lang()] || pageLabels[name].ru
  }

  /**
   * Whether the series should wait rather than move on by itself.
   *
   * Only a card with something to read holds the reader up. One whose options
   * carry no explanation has nothing more to show than the colour it just
   * went, and the timer in the series is right for it.
   */
  get waitsForReader () {
    return this.inSeries && this.rows.some((row) => row.why.innerHTML)
  }

  /**
   * Called by createQuiz with the block already formatted: inline code, bold
   * and icons are the page's business, not this component's, and the helper is
   * where parseLine lives.
   */
  fill ({ question, options }) {
    this.question.innerHTML = question
    this.plain = this.question.textContent.trim()

    options.forEach((option, index) => {
      const row = Object.assign(createElem('div', this.list), { className: 'option' })

      const input = Object.assign(createElem('input', row), {
        type: 'radio',
        name: 'quiz-option',
        id: `option-${index}`
      })
      input.setAttribute('value', String(index))

      const label = Object.assign(createElem('label', row), { innerHTML: option.text })
      label.setAttribute('for', `option-${index}`)

      // Hidden rather than absent: it is written into the page at build time
      // and only waits to be shown, so revealing it moves no text around.
      const why = Object.assign(createElem('div', row), {
        className: 'why',
        innerHTML: option.why
      })
      why.hidden = true

      input.onclick = () => this.choose(index)

      this.rows.push({ ...option, row, input, why, label })
    })
  }

  choose (index) {
    if (this.answered) return
    this.answered = true

    const chosen = this.rows[index]
    const right = chosen.right

    for (const row of this.rows) {
      row.input.disabled = true
      row.row.classList.add('locked')
    }

    chosen.row.classList.add(right ? 'chosen-right' : 'chosen-wrong')
    if (chosen.why.innerHTML) chosen.why.hidden = false

    // Going red teaches nothing on its own: a reader who picked wrongly needs
    // to be shown which one was right and why, not just that this one was not.
    if (!right) {
      for (const row of this.rows) {
        if (!row.right) continue
        row.row.classList.add('was-right')
        if (row.why.innerHTML) row.why.hidden = false
      }
    }

    this.result.className = right ? 'success-result' : 'failure-result'

    if (this.waitsForReader) {
      this.next = Object.assign(createElem('button', this.box), {
        className: 'next',
        textContent: this.word('next'),
        onclick: () => this.dispatchEvent(new CustomEvent('next', { bubbles: true, composed: true }))
      })
    }

    const answer = this.rows.find((row) => row.right)

    this.dispatchEvent(new CustomEvent('answered', {
      bubbles: true,
      composed: true,
      detail: {
        right,
        question: this.plain,
        chosen: chosen.label.textContent.trim(),
        answer: answer ? answer.label.textContent.trim() : ''
      }
    }))
  }

  /** test-series calls this to run the block a second time. */
  reset () {
    this.answered = false
    this.result.className = ''

    if (this.next) {
      this.next.remove()
      this.next = null
    }

    for (const row of this.rows) {
      Object.assign(row.input, { disabled: false, checked: false })
      row.row.className = 'option'
      row.why.hidden = true
    }
  }
}

customElements.define('quiz-card', QuizCard)
