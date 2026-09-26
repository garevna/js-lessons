import { liveDemoSpoilerStyles } from '../styles/liveDemoSpoilerStyles'

const { createElem } = require('../helpers').default
const { pageLabels, lang } = require('../configs').default

/**
 * A console session that types itself.
 *
 *   ~~~demo
 *   > var alpha = 1
 *   < undefined
 *   > alpha === '1'
 *   < false
 *   > alpha.toUpperCase()
 *   ! TypeError: alpha.toUpperCase is not a function
 *   ~~~
 *
 * A line beginning with > is typed in, character by character, the way a
 * reader would type it; < is what the console answered, and ! is what it
 * complained about. Colouring is worked out from the text, so nothing about
 * it has to be written down.
 *
 * Several > lines in a row are one command over several lines — what
 * Shift+Enter does in a real console. The prompt is drawn once, indentation is
 * kept as written, and the whole thing is typed before any answer appears:
 *
 *   > function sigma () {
 *   >   return Math.random() * 1000
 *   > }
 *   < undefined
 *
 * It starts on the same ► button the {{{…}}} demos use, in #f50 rather than
 * their blue so the two are told apart. Closed, the button is all there is:
 * the console chrome opens together with the console under it, so the picture
 * of a console is never left sitting on the page with nothing beneath it.
 *
 * This replaces writing the session by hand. A demo of eight commands was a
 * hundred and seventy lines of HTML in src/templates — a span per token,
 * `visibility: hidden` on every one of them, and the colour class chosen by
 * hand — and it had to be compiled into the bundle, so a lesson could not
 * carry its own demo and a new one meant a webpack build. The session now
 * lives in the lesson, as the few lines it is.
 */

const KEYWORDS = /^(var|let|const|function|return|new|delete|class|extends|super|this|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|async)$/
const OPERATORS = /^(typeof|instanceof|in|of|await|yield|void)$/

/** One token, and the class that colours it. */
const classOf = (token, output) => {
  if (/^['"`]/.test(token)) return output ? 'string-out' : 'string'
  if (/^\d/.test(token)) return output ? 'number-out' : 'number'
  if (token === 'true' || token === 'false') return output ? 'boolean-out' : 'boolean'
  if (token === 'undefined') return 'undefined'
  if (token === 'null') return 'null'
  if (token === 'console') return 'console'
  if (KEYWORDS.test(token)) return 'var'
  if (OPERATORS.test(token)) return 'operator-1'
  if (/^[A-Za-z_$][\w$]*$/.test(token)) return 'name'
  if (/^[=!<>+\-*/%&|^~?]+$/.test(token)) return 'math'
  return 'default'
}

/**
 * Splits a line the way the eye does: a string whole, a number whole, a word
 * whole, a run of operator characters together, everything else on its own.
 *
 * Whitespace is a token too, so what was written is what is shown. The palette
 * spaces operators itself, but the spaces inside a string, or in a sentence the
 * console printed, belong to it.
 */
const TOKEN = /('[^']*'|"[^"]*"|`[^`]*`|\d+\.?\d*|[A-Za-z_$][\w$]*|[=!<>+\-*/%&|^~?]+|\s+|.)/g

const tokenize = (text, output) => (text.match(TOKEN) || []).map((token) => ({
  text: token,
  className: /^\s+$/.test(token) ? 'space' : classOf(token, output)
}))

/** Milliseconds: one keystroke, the thinking before an answer, the read after. */
const KEYSTROKE = 45
const BEFORE_ANSWER = 350
const AFTER_ANSWER = 700

/**
 * On top of the console palette.
 *
 * word-spacing is reset because that sheet pulls it in by -0.4rem — which is
 * there to swallow the newlines between the spans of a hand-written template,
 * and here it would eat the spaces inside a string instead.
 *
 * The frame and the console are one box that opens together, so the chrome is
 * never left standing on the page as a picture of a console on its own.
 */
const EXTRA = `
  :host { display: block; }

  .demo-button {
    cursor: pointer;
    font-family: var(--main-font);
    font-size: 1.2rem;
    border: 0;
    background: #f50;
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
    box-shadow: -1px -1px 2px #00000070;
  }
  .demo-button:hover { background: #f83; }

  .demo-button.opened {
    background: transparent;
    padding: 0;
    color: #f50;
    box-shadow: none;
  }
  .demo-button.opened:hover { background: transparent; color: #d00; }

  .demo-title {
    font-family: var(--main-font);
    font-size: .9rem;
    color: #f50;
    margin-left: 12px;
    vertical-align: middle;
  }

  .demo-body {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all .4s ease-in-out;
  }
  .demo-body.opened { opacity: 1; }

  .console-frame { width: 100%; display: block; margin-bottom: -4px; }

  .console-demo { opacity: 1; height: auto; margin-top: 0; }
  .console-demo p { word-spacing: normal; margin: 2px 4px; }
  .console-demo .space { white-space: pre; }
  .console-demo .continued { padding-left: 26px; }
  .console-demo .answer { padding-left: 4px; }
  .console-demo .caret {
    color: #fd0;
    animation: flash-animation .7s infinite;
  }
`

class ConsoleDemo extends HTMLElement {
  // A custom element may not give itself an attribute or a child while it is
  // being constructed — "The result must not have attributes", and the element
  // is then never upgraded and renders as nothing at all. Only the shadow root
  // goes in here; the host is laid out from :host rather than this.style.
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    liveDemoSpoilerStyles.then((css) => {
      createElem('style', this.shadow).textContent = css + EXTRA
    })

    this.steps = []
    this.timers = []
    this.run = 0
  }

  static get observedAttributes () {
    return ['session', 'header']
  }

  attributeChangedCallback (name) {
    if (name === 'session') {
      this.steps = ConsoleDemo.parse(this.getAttribute('session') || '')
      if (this.section) this.height = this.measure()
      return
    }

    if (this.caption) this.caption.innerText = this.title()
  }

  title () {
    return this.getAttribute('header') ||
      pageLabels.consoleDemo[lang()] ||
      pageLabels.consoleDemo.ru
  }

  /**
   * The session as written, read into the steps it plays.
   *
   *   > what was typed
   *   < what the console answered
   *   ! what it complained about
   *
   * Both marks are needed, not just the one for input. Without a mark of its
   * own an answer is only "a line that is not a command", and then a command
   * running over several lines cannot be told from a command followed by its
   * answer — which is the whole difficulty with writing a session down.
   *
   * The mark is the character and a space. An answer that opens with a bare
   * angle bracket — <div>, as the console prints an element — is not a mark
   * and is read as what it is.
   *
   * A line with no mark at all is an answer too: sessions were written that
   * way before there was a < to write, and they still read correctly.
   */
  static parse (session) {
    const steps = []
    let open = null

    const start = () => {
      open = { input: [], answers: [] }
      steps.push(open)
      return open
    }

    const answer = (text, error) => {
      // An answer with no command above it is still an answer: a session may
      // open with something the console said on its own.
      if (!open) start()
      open.answers.push({ text, error })
    }

    for (const raw of session.split('\n')) {
      const line = raw.replace(/\s+$/, '')

      if (!line.trim().length) { open = null; continue }

      const trimmed = line.trimStart()

      if (/^>(\s|$)/.test(trimmed)) {
        // One space after the mark belongs to the mark; anything beyond it is
        // the author's indentation and is kept.
        const text = trimmed.slice(1).replace(/^ /, '')
        if (!open || open.answers.length) start()
        open.input.push(text)
        continue
      }

      if (/^<(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).replace(/^ /, ''), false); continue }
      if (/^!(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).trim(), true); continue }

      answer(trimmed, false)
    }

    return steps.filter((step) => step.input.length || step.answers.length)
  }

  connectedCallback () {
    if (this.section) return

    const bar = createElem('div', this.shadow)

    this.button = Object.assign(createElem('button', bar), {
      className: 'demo-button',
      innerText: '►',
      onclick: () => { this.expanded ? this.close() : this.open() }
    })

    this.caption = Object.assign(createElem('span', bar), {
      className: 'demo-title',
      innerText: this.title()
    })

    this.body = Object.assign(createElem('div', this.shadow), { className: 'demo-body' })

    Object.assign(createElem('img', this.body), {
      className: 'console-frame',
      src: `${location.origin + location.pathname}/images/console.png`
    })

    this.section = Object.assign(createElem('section', this.body), {
      className: 'live-demo-section console-demo'
    })

    // Measured with everything shown, so the box has a height to open to
    // before a character is typed — otherwise it grows under the reader.
    this.height = this.measure()
    this.expanded = false
  }

  disconnectedCallback () {
    this.stop()
  }

  measure () {
    this.draw()
    const { height } = this.body.getBoundingClientRect()
    this.section.innerHTML = ''
    return height
  }

  /** The whole session, laid out. Used to measure, and step by step to play. */
  draw () {
    this.section.innerHTML = ''
    for (const step of this.steps) {
      this.command(step.input)
      for (const answer of step.answers) this.answer(answer)
      this.divider()
    }
  }

  /** One command, however many lines it was entered over. */
  command (lines) {
    return lines.map((text, index) => {
      const paragraph = createElem('p', this.section)

      Object.assign(createElem('span', paragraph), {
        className: index === 0 ? 'prompt-input' : 'continued'
      })

      const body = createElem('span', paragraph)
      for (const token of tokenize(text, false)) {
        Object.assign(createElem('span', body), { className: token.className, textContent: token.text })
      }

      return body
    })
  }

  answer ({ text, error }) {
    const paragraph = createElem('p', this.section)
    if (error) paragraph.className = 'error'

    Object.assign(createElem('span', paragraph), { className: 'prompt-output' })

    const body = Object.assign(createElem('span', paragraph), { className: 'answer' })
    for (const token of tokenize(text, true)) {
      Object.assign(createElem('span', body), { className: token.className, textContent: token.text })
    }
  }

  divider () {
    Object.assign(createElem('span', createElem('p', this.section)), { className: 'hr' })
  }

  open () {
    this.expanded = true
    this.button.innerText = '⛌'
    this.button.classList.add('opened')
    this.body.classList.add('opened')
    this.body.style.height = this.height + 'px'
    this.play()
  }

  close () {
    this.expanded = false
    this.button.innerText = '►'
    this.button.classList.remove('opened')
    this.body.classList.remove('opened')
    this.body.style.height = '0px'
    this.stop()
    this.section.innerHTML = ''
  }

  stop () {
    for (const timer of this.timers) clearTimeout(timer)
    this.timers = []
  }

  later (delay) {
    return new Promise((resolve) => { this.timers.push(setTimeout(resolve, delay)) })
  }

  /**
   * Plays the session once, and is abandoned the moment the demo is closed or
   * replayed — a reader who shuts it half-way should not have the rest typed
   * into a section that is no longer on the page.
   */
  async play () {
    this.stop()
    this.section.innerHTML = ''

    const playing = ++this.run
    const running = () => this.run === playing && this.expanded

    for (const step of this.steps) {
      if (!running()) return

      for (const body of this.command(step.input)) {
        if (!running()) return
        await this.type(body, running)
      }

      if (step.input.length) {
        if (!running()) return
        await this.later(BEFORE_ANSWER)
      }

      for (const answer of step.answers) {
        if (!running()) return
        this.answer(answer)
      }

      if (!running()) return
      this.divider()
      await this.later(AFTER_ANSWER)
    }
  }

  /**
   * Types what the line already holds, character by character.
   *
   * The tokens are built and then emptied, rather than appended as the typing
   * goes: the line has its final width from the start, so nothing reflows and
   * the text does not shuffle about while it is written.
   */
  async type (body, running) {
    const spans = [...body.children].map((span) => {
      const text = span.textContent
      span.textContent = ''
      return { span, text }
    })

    const caret = Object.assign(createElem('span', body), { className: 'caret', textContent: '▏' })

    for (const { span, text } of spans) {
      for (const char of text) {
        if (!running()) { caret.remove(); return }
        await this.later(KEYSTROKE)
        span.textContent += char
      }
    }

    caret.remove()
  }
}

customElements.define('console-demo', ConsoleDemo)
