const { createElem } = require('../helpers').default
const { pageLabels, lang } = require('../configs').default

const { testSeriesStyles } = require('../styles').default

/**
 * A run of questions, shown one at a time.
 *
 * Where a lesson ends with a block of them the page was mostly quiz: the
 * thirty-one questions at the end of Explicit-type-conversion stood 9500
 * pixels tall, two thirds of the page and a dozen screens of scrolling. A
 * reader saw a wall and learned only that there was a lot of it.
 *
 * One card at a time, with a count above it, says the same thing in three
 * hundred pixels and answers the question a wall cannot: how much is left.
 * The score is new — until now a question went green or red and nothing kept
 * count.
 *
 * Only questions that were already written as a run are gathered. A question
 * standing on its own after the paragraph it checks stays where it is: that
 * is where it belongs, and moving it into a series at the end of the lesson
 * would be a worse lesson, more compact.
 */
// Long enough to be seen as a pause rather than a flicker. The old 900 was
// chosen to show a colour, before anything was drawn to say why the card was
// about to leave.
const WAIT = 1600

class TestSeries extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    createElem('style', this.shadow).textContent = testSeriesStyles

    this.tests = []
    this.at = 0
    this.right = 0
    this.wrong = 0
    this.missed = []
  }

  /** The card an event actually came from, through the shadow boundary. */
  sender (event) {
    const path = typeof event.composedPath === 'function' ? event.composedPath() : []
    return path.find((node) => this.tests.includes(node)) || null
  }

  word (name) {
    return pageLabels[name][lang()] || pageLabels[name].ru
  }

  /** Called by the grouper with the questions it took out of the page. */
  fill (tests) {
    this.tests = tests

    const head = createElem('header', this.shadow)

    this.counter = Object.assign(createElem('div', head), { className: 'counter' })

    const score = Object.assign(createElem('div', head), { className: 'score' })
    this.rightBox = Object.assign(createElem('span', score), { className: 'right', textContent: '0' })
    this.wrongBox = Object.assign(createElem('span', score), { className: 'wrong', textContent: '0' })

    // Drains while the next card is on its way. Without it the card simply
    // vanished: nothing on screen said that answering had started anything,
    // so the page appeared to move on its own.
    this.timer = Object.assign(createElem('div', this.shadow), { className: 'timer' })
    this.bar = createElem('span', this.timer)

    this.stage = Object.assign(createElem('div', this.shadow), { className: 'stage' })

    for (const test of this.tests) {
      const slot = Object.assign(createElem('div', this.stage), { className: 'slot' })
      // Told before it is answered, because what a card does on being
      // answered depends on whether anything follows it.
      test.inSeries = true
      slot.appendChild(test)
    }

    this.slots = [...this.stage.children]

    // composedPath, not target. The cards sit inside this element's shadow
    // tree and the listener is on the host, so an event crossing that
    // boundary is retargeted: every card arrives as `event.target === this`,
    // and the series could not tell which of them had been answered.
    this.addEventListener('answered', (event) => this.answered(event.detail, this.sender(event)))

    // A card that waits for the reader says so by sending this when they are
    // ready, instead of being taken away on a timer.
    this.addEventListener('next', () => this.advance())

    this.show()
  }

  show () {
    this.counter.textContent = `${Math.min(this.at + 1, this.tests.length)} ${this.word('outOf')} ${this.tests.length}`

    this.slots.forEach((slot, index) => {
      slot.classList.toggle('current', index === this.at)
      slot.classList.toggle('gone', index < this.at)
    })
  }

  answered ({ right, question, chosen, answer }, card) {
    right ? this.right++ : this.wrong++
    if (!right) this.missed.push({ question, chosen, answer })

    this.rightBox.textContent = String(this.right)
    this.wrongBox.textContent = String(this.wrong)

    // Nine hundred milliseconds is long enough to watch an answer go green or
    // red, and that is all there is to see when the answer is the word NaN.
    //
    // A card that answers with a sentence — why this option is wrong, which
    // one was right — is being read, not glanced at, and a timer would carry
    // it off mid-sentence. Those cards keep the reader in charge: they put up
    // a button and send 'next' when it is pressed.
    if (card && card.waitsForReader) return

    this.countDown()
  }

  /**
   * The wait before the next card, made visible.
   *
   * It was 900ms and silent. That is long enough to see an answer go green,
   * which is what it was for, and far too short to be understood as a pause —
   * the card was simply gone, and nothing had said it would be.
   *
   * Longer, with a bar draining across the width, and the two together say
   * what one alone could not: something is about to happen, and this is how
   * much of it is left.
   */
  countDown () {
    this.timer.classList.add('running')

    // From full to empty, started on the next frame so the browser has a
    // width to animate away from rather than two styles set in one go.
    this.bar.style.transition = 'none'
    this.bar.style.width = '100%'

    // Reading a layout property forces the full width to be committed before
    // the next two lines change it. Without that the browser sees one style
    // change, from empty to empty, and there is nothing to animate.
    void this.bar.offsetWidth

    this.bar.style.transition = `width ${WAIT}ms linear`
    this.bar.style.width = '0%'

    clearTimeout(this.waiting)
    this.waiting = setTimeout(() => {
      this.timer.classList.remove('running')
      this.advance()
    }, WAIT)
  }

  advance () {
    this.at++
    this.at < this.tests.length ? this.show() : this.finish()
  }

  /**
   * What a wall of questions was good for: looking back at the ones you got
   * wrong. A series that only moves forward would lose that, so it is given
   * back at the end rather than carried all the way through.
   */
  finish () {
    this.counter.textContent = `${this.tests.length} ${this.word('outOf')} ${this.tests.length}`
    // 'current' has to go, not just 'gone' on top of it: current is what
    // makes a card take up room, and the last one answered went on holding
    // its height under the summary.
    this.slots.forEach((slot) => {
      slot.classList.remove('current')
      slot.classList.add('gone')
    })

    const card = Object.assign(createElem('div', this.stage), { className: 'slot current summary' })

    Object.assign(createElem('h4', card), {
      textContent: this.wrong
        ? `${this.word('mistakes')}: ${this.wrong}`
        : this.word('allRight')
    })

    for (const { question, chosen, answer } of this.missed) {
      const row = Object.assign(createElem('div', card), { className: 'missed' })
      Object.assign(createElem('span', row), { className: 'q', innerHTML: question })
      Object.assign(createElem('span', row), { className: 'was', textContent: chosen })
      Object.assign(createElem('span', row), { className: 'is', textContent: answer })
    }

    Object.assign(createElem('button', card), {
      className: 'again',
      textContent: this.word('again'),
      onclick: () => this.restart()
    })

    this.slots = [...this.stage.children]
  }

  restart () {
    clearTimeout(this.waiting)
    this.timer.classList.remove('running')
    this.stage.querySelector('.summary').remove()

    for (const test of this.tests) {
      // A card with more state than its radios — quiz-card hides an
      // explanation under each option — clears itself.
      if (typeof test.reset === 'function') {
        test.reset()
        continue
      }
      for (const radio of test.shadowRoot.querySelectorAll('input')) {
        Object.assign(radio, { disabled: false, checked: false, style: '' })
      }
      const result = test.shadowRoot.querySelector('#result')
      if (result) result.className = ''
    }

    Object.assign(this, { at: 0, right: 0, wrong: 0, missed: [] })
    this.rightBox.textContent = '0'
    this.wrongBox.textContent = '0'
    this.slots = [...this.stage.children]
    this.show()
  }
}

customElements.define('test-series', TestSeries)
