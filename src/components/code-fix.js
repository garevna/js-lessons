const { createElem } = require('../helpers').default
const { codeFixStyles } = require('../styles').default
const { pageLabels, lang } = require('../configs').default

/**
 * Broken code the reader repairs, and checks that say whether they did.
 *
 * The course already runs code two ways. ~~~demo types a session out and shows
 * what it would print — nothing is executed, the answers are written in the
 * lesson. {{{…}}} does execute, with eval in the page itself and document.body
 * rewritten to mean a box below the button. Neither lets the reader change
 * anything, and the second could not: code the reader wrote, eval'd in the
 * lesson's own window, would be editing the page around it.
 *
 * So the code runs in an iframe. That gives it a document of its own to append
 * to, a window of its own to throw in, and no way to reach the lesson; and
 * because the frame is same-origin, the checks can look inside it afterwards.
 *
 * WHAT IS CHECKED, AND WHY NOT THE TEXT
 *
 * The obvious check is to compare what the reader wrote against a correct
 * version. It does not survive contact with real answers: the example this was
 * built for — a handler that loses `this` — has at least three correct
 * repairs, a class field arrow, a bind in the constructor, and a wrapping
 * callback. A text comparison fails two of them.
 *
 * So the checks are behaviour: run the code, click the button, and ask what
 * the button now says. Every repair that works passes, which is the honest
 * answer to "did I fix it".
 *
 * That leaves what a text comparison was good at — telling an elegant repair
 * from one that merely works. A bind is the ugly way to do this and should not
 * score what a class field scores. So a check carries a number, and one check
 * may read the source instead of the behaviour: it is handed SOURCE, and a
 * class field earns its points where a bind does not. The reader is told the
 * score, not a verdict, because that is the shape of the truth here — the code
 * works, and it could have been written better.
 */
class CodeFix extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    createElem('style', this.shadow).textContent = codeFixStyles

    this.box = Object.assign(createElem('figure', this.shadow), { className: 'fix' })
    this.caption = Object.assign(createElem('figcaption', this.box), { className: 'task' })

    this.editor = Object.assign(createElem('textarea', this.box), {
      className: 'editor',
      spellcheck: false
    })
    this.editor.setAttribute('autocomplete', 'off')
    this.editor.setAttribute('autocapitalize', 'off')

    this.bar = Object.assign(createElem('div', this.box), { className: 'bar' })

    this.run = Object.assign(createElem('button', this.bar), {
      className: 'run',
      onclick: () => this.check()
    })

    this.undo = Object.assign(createElem('button', this.bar), {
      className: 'undo',
      onclick: () => this.restore()
    })

    this.score = Object.assign(createElem('span', this.bar), { className: 'score' })

    this.report = Object.assign(createElem('div', this.box), { className: 'report' })
    this.report.hidden = true

    this.checks = []
  }

  word (name) {
    return pageLabels[name][lang()] || pageLabels[name].ru
  }

  /** Called by createCodeFix with the block already taken apart. */
  fill ({ task, code, checks }) {
    this.caption.innerHTML = task
    this.source = code
    this.checks = checks

    this.editor.value = code
    this.run.textContent = this.word('runChecks')
    this.undo.textContent = this.word('restoreCode')

    this.total = checks.reduce((sum, item) => sum + item.points, 0)

    // Tall enough for the code it holds, so the reader is not editing through
    // a letterbox, and still resizable by hand.
    this.editor.rows = Math.min(Math.max(code.split('\n').length + 1, 6), 36)
  }

  restore () {
    this.editor.value = this.source
    this.report.hidden = true
    this.report.innerHTML = ''
    this.score.textContent = ''
    this.score.className = 'score'
  }

  /**
   * A fresh frame every run.
   *
   * Re-using one would leave the previous attempt's buttons, listeners and
   * globals in place, and a repair that only works because the last run left
   * something behind is not a repair.
   */
  frame () {
    if (this.sandbox) this.sandbox.remove()

    this.sandbox = Object.assign(createElem('iframe', this.box), { className: 'sandbox' })
    this.sandbox.setAttribute('title', 'sandbox')
    this.sandbox.srcdoc = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'

    return new Promise((done) => {
      this.sandbox.addEventListener('load', () => done(this.sandbox), { once: true })
    })
  }

  async check () {
    const code = this.editor.value

    await this.frame()

    const win = this.sandbox.contentWindow
    const doc = this.sandbox.contentDocument

    // Anything the code throws on the way in. A script tag reports a syntax
    // error here rather than by rejecting anything, so it is caught by
    // listening before the script is appended.
    let failure = null
    win.addEventListener('error', (event) => { failure = failure || String(event.message) })

    try {
      const script = doc.createElement('script')
      script.textContent = code
      doc.body.appendChild(script)
    } catch (error) {
      failure = String(error.message)
    }

    // The source is a value the checks can look at, so a check can ask how the
    // repair was written and not only what it does.
    win.SOURCE = code

    const results = this.checks.map((item) => {
      try {
        return { ...item, passed: !!win.eval(item.body), error: null }
      } catch (error) {
        return { ...item, passed: false, error: String(error.message) }
      }
    })

    this.draw(results, failure)
  }

  draw (results, failure) {
    this.report.hidden = false
    this.report.innerHTML = ''

    if (failure) {
      Object.assign(createElem('p', this.report), {
        className: 'failure',
        textContent: failure
      })
    }

    for (const { title, points, passed, error } of results) {
      const row = Object.assign(createElem('div', this.report), {
        className: `line ${passed ? 'passed' : 'failed'}`
      })

      Object.assign(createElem('span', row), { className: 'mark' })
      Object.assign(createElem('span', row), { className: 'what', innerHTML: title })
      Object.assign(createElem('span', row), {
        className: 'points',
        textContent: passed ? `+${points}` : `0`
      })

      // Only when the check itself blew up — a check that simply returned
      // false has nothing more to say than that.
      if (error) {
        Object.assign(createElem('div', this.report), {
          className: 'why',
          textContent: error
        })
      }
    }

    const got = results.reduce((sum, item) => sum + (item.passed ? item.points : 0), 0)

    this.score.textContent = `${got} ${this.word('outOf')} ${this.total}`
    this.score.className = got === this.total ? 'score full' : got ? 'score part' : 'score none'

    this.dispatchEvent(new CustomEvent('checked', {
      bubbles: true,
      composed: true,
      detail: { got, total: this.total, results }
    }))
  }
}

customElements.define('code-fix', CodeFix)
