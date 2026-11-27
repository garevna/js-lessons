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
 *
 * WHAT A CHECK IS HANDED
 *
 * SOURCE, the text the reader wrote, and OUTPUT, the lines the code printed,
 * in the order they were printed, with OUTPUT.sync saying how many of them
 * came out synchronously and OUTPUT.micro how many followed from the microtask
 * queue, before the first task. The checks run once the frame has gone quiet —
 * out of output and out of scheduled work — which is what makes an exercise
 * about queues gradeable at all. They are also handed TASKS and MICROTASKS,
 * how many of each the engine actually ran, and they can read what the code
 * declared — though a counter inside the exercise is worth less than those
 * two, because the exercise can drive it by hand.
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

    // What the code printed, in the order it printed it. It is set up before
    // the code runs, because that is the only moment it can be: an exercise
    // about queues is graded on the order of its output, and a recorder
    // cannot be put in after the lines have gone by.
    const printed = []
    const real = win.console.log

    win.console.log = (...args) => {
      printed.push(args.map((arg) => typeof arg === 'string' ? arg : String(arg)).join(' '))
      real.apply(win.console, args)
    }

    win.OUTPUT = printed

    // How much the frame still has to do. The output alone does not say when
    // the code has finished — an exercise can print nothing until its last
    // step — so the three ways it can ask to be called again are counted, and
    // the checks wait until nothing is owed.
    const owed = { count: 0 }

    // And how much it has done: the engine's own tally of turns taken. A
    // counter inside the exercise can be driven by the exercise itself — work
    // that calls the ticking function by hand makes it climb without the
    // browser ever getting a turn — so what is graded is counted here.
    const ran = { tasks: 0, micros: 0 }

    // Taken before the wrapping, so the component's own marker below is not
    // counted as one of the code's turns.
    const schedule = win.setTimeout

    // then puts a microtask in the queue as surely as queueMicrotask does, and
    // a chain built on promises starves the task queue just as thoroughly, so
    // its callbacks are counted too. An await is the one that slips past this,
    // and the count of tasks catches that instead.
    const realThen = win.Promise.prototype.then

    win.Promise.prototype.then = function (onDone, onFail) {
      const counted = (callback) => typeof callback === 'function'
        ? (...args) => { ran.micros += 1; return callback(...args) }
        : callback

      return realThen.call(this, counted(onDone), counted(onFail))
    }

    for (const name of ['setTimeout', 'queueMicrotask', 'requestAnimationFrame']) {
      const original = win[name]
      if (typeof original !== 'function') continue

      const kind = name === 'queueMicrotask' ? 'micros' : 'tasks'

      win[name] = (callback, ...rest) => {
        if (typeof callback !== 'function') return original.call(win, callback, ...rest)

        owed.count += 1

        return original.call(win, (...args) => {
          owed.count -= 1
          ran[kind] += 1
          return callback(...args)
        }, ...rest)
      }
    }

    // Where the next task begins. This timer is registered before the code
    // runs, so it is the first task to follow it, and everything printed
    // before it fired was printed either synchronously or by a microtask.
    // That is what turns "did this go through the microtask queue" into a
    // question about behaviour rather than about the text of the repair.
    printed.micro = 0
    schedule.call(win, () => { printed.micro = printed.length - printed.sync }, 0)

    try {
      const script = doc.createElement('script')
      script.textContent = code
      doc.body.appendChild(script)
    } catch (error) {
      failure = String(error.message)
    }

    // Everything printed up to here was printed while the script itself was
    // still running — synchronously. Whatever arrives later came out of a
    // queue, and a check can tell one from the other.
    printed.sync = printed.length

    // The source is a value the checks can look at, so a check can ask how the
    // repair was written and not only what it does.
    win.SOURCE = code

    // A timer or a microtask chain is not finished when its script is.
    const quiet = await this.settle(printed, owed)

    if (!quiet) failure = failure || this.word('stillRunning')

    // Counted while the code ran, handed over now that it has stopped.
    win.TASKS = ran.tasks
    win.MICROTASKS = ran.micros

    const results = this.checks.map((item) => {
      try {
        return { ...item, passed: !!win.eval(item.body), error: null }
      } catch (error) {
        return { ...item, passed: false, error: String(error.message) }
      }
    })

    this.draw(results, failure, printed)
  }

  /**
   * Waits for the frame to go quiet.
   *
   * Checking the moment the script ends would grade asynchronous code on the
   * first line it printed. Waiting for the output to stop is not enough
   * either: code that prints only its answer prints nothing for as long as it
   * works. So the frame is quiet when it has nothing left scheduled and no new
   * line has appeared since the last look — and after four seconds the checks
   * run anyway, because code that never stops must not hold them hostage. Four
   * because a repair that cuts a long job into very small pieces pays four
   * milliseconds of timer clamping for each of them and is honestly slow; it
   * should be graded on what it computed, not on how patient the component is.
   *
   * It answers whether the frame did go quiet, so a score taken from code that
   * had not finished can say so instead of calling the answer wrong.
   */
  settle (printed, owed) {
    const STEP = 60
    const until = Date.now() + 4000

    return new Promise((done) => {
      let seen = -1

      const look = () => {
        if (printed.length === seen && !owed.count) return done(true)
        if (Date.now() > until) return done(false)
        seen = printed.length
        setTimeout(look, STEP)
      }

      look()
    })
  }

  draw (results, failure, printed = []) {
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

    // What the code printed, and which queue each line came out of. Without
    // it an exercise about order can only be read with the console open, and
    // a check that counts synchronous lines looks like a quibble: the reader
    // sees that line three was printed, not that it was printed too early.
    if (printed.length) {
      const box = Object.assign(createElem('div', this.report), { className: 'printed' })

      Object.assign(createElem('div', box), {
        className: 'printed-head',
        textContent: this.word('printedOutput')
      })

      const where = (at) => {
        if (at < printed.sync) return ['sync', 'printedSync']
        if (at < printed.sync + printed.micro) return ['micro', 'printedMicro']
        return ['task', 'printedTask']
      }

      printed.forEach((line, at) => {
        const [phase, label] = where(at)

        const row = Object.assign(createElem('div', box), {
          className: `printed-line ${phase}`
        })

        Object.assign(createElem('span', row), { className: 'text', textContent: line })
        Object.assign(createElem('span', row), { className: 'phase', textContent: this.word(label) })
      })
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
