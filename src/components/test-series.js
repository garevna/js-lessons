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

    this.stage = Object.assign(createElem('div', this.shadow), { className: 'stage' })

    for (const test of this.tests) {
      const slot = Object.assign(createElem('div', this.stage), { className: 'slot' })
      slot.appendChild(test)
    }

    this.slots = [...this.stage.children]

    this.addEventListener('answered', (event) => this.answered(event.detail))

    this.show()
  }

  show () {
    this.counter.textContent = `${Math.min(this.at + 1, this.tests.length)} ${this.word('outOf')} ${this.tests.length}`

    this.slots.forEach((slot, index) => {
      slot.classList.toggle('current', index === this.at)
      slot.classList.toggle('gone', index < this.at)
    })
  }

  answered ({ right, question, chosen, answer }) {
    right ? this.right++ : this.wrong++
    if (!right) this.missed.push({ question, chosen, answer })

    this.rightBox.textContent = String(this.right)
    this.wrongBox.textContent = String(this.wrong)

    // Long enough to see the answer go green or red before the card leaves.
    setTimeout(() => {
      this.at++
      this.at < this.tests.length ? this.show() : this.finish()
    }, 900)
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
    this.stage.querySelector('.summary').remove()

    for (const test of this.tests) {
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
