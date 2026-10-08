import { liveDemoSpoilerStyles } from '../styles/liveDemoSpoilerStyles'

const { createElem, getIconStyles } = require('../helpers').default
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

/**
 * A line that is a value node printed, rather than text a program wrote.
 *
 * Only these are coloured in the terminal flavour: one string, one number, one
 * boolean, undefined or null, and nothing else on the line.
 */
const VALUE = /^('[^']*'|"[^"]*"|`[^`]*`|-?\d+(\.\d+)?|true|false|undefined|null)$/

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

  /* The caption sat on the text baseline and the button on its own box, so
     the words hung below the triangle. One row, both centred on it. */
  .demo-bar {
    display: flex;
    align-items: center;
    gap: 12px;
  }

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

  /* ------------------------------------------------ the terminal flavour */

  /*
   * ~~~bash is the same session drawn as a terminal. What changes is the
   * prompts and the ground they sit on — the tokenizer and its colours are
   * shared, because the code being typed is the same code.
   *
   * The three prompts are the ones node actually shows: $ belongs to the
   * shell, > to the REPL, and ... to a statement the REPL is still waiting to
   * see the end of. An answer has no prompt at all: a REPL prints the value on
   * a line of its own, which is exactly what makes it read as a REPL.
   */
  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #333;
    color: #bbb;
    font-family: var(--main-font);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    padding: 6px 12px;
    border-radius: 6px 6px 0 0;
    border-bottom: solid 1px #000;
  }

  /* The bash icon, in the bar and on the button that opens it. */
  .terminal-bar .ico-20,
  .demo-button .ico-20 {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /*
   * An icon has no baseline to sit on, so the button centres it instead — and
   * the ground goes black: the bash icon is four colours of its own, and on
   * the orange the browser demos use the two fought each other.
   */
  .demo-button:has(.ico-20) {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    background: #000;
  }
  .demo-button:has(.ico-20):hover { background: #333; }

  .bash-demo { background: #161616; }

  .bash-demo .prompt-shell:before {
    content: '$';
    color: #ddd;
    margin-right: 8px;
  }
  .bash-demo .prompt-input:before {
    content: '>';
    color: #ddd;
    margin-right: 8px;
  }
  .bash-demo .continued { padding-left: 0; }
  .bash-demo .continued:before {
    content: '...';
    color: #ddd;
    margin-right: 8px;
  }

  /*
   * Nothing is indented in a terminal. Every line starts at the same column —
   * the prompt on one, the value printed back on the next — and the devtools
   * sheet sets a padding on the answer and on the empty output prompt that
   * pushed what node printed twenty pixels in from what was typed.
   */
  .bash-demo .prompt-output:before { content: ''; margin-right: 0; }
  .bash-demo .prompt-output { padding-right: 0; }
  .bash-demo .answer { padding-left: 0; }
  .bash-demo p { margin-left: 0; margin-right: 0; }

  /*
   * What node's REPL actually colours, which is almost nothing.
   *
   * The devtools palette paints keywords, names and operators each their own
   * colour; node leaves the code it echoes plain and reserves colour for what
   * it prints back — green for a string, yellow for a number, grey for
   * undefined. A demo in the devtools palette does not look like a terminal
   * however right the prompts are.
   *
   * And the margins go with them. That palette sets 8 and 12 pixels around
   * keywords and operators to space a proportional font; a terminal is
   * monospace and every column is the same width, so "class User {" came out
   * spaced as "class  User  {".
   *
   * No back quotes in here: this whole block is inside a template literal, and
   * one in a comment ends the string. Webpack then fails to parse the file,
   * the watcher keeps serving the last bundle it managed to build, and the
   * styles simply never arrive — which is what happened while this was written.
   */
  .bash-demo .default,
  .bash-demo .var,
  .bash-demo .name,
  .bash-demo .string,
  .bash-demo .math,
  .bash-demo .operator-1,
  .bash-demo .operator-2,
  .bash-demo .operator-not,
  .bash-demo .number,
  .bash-demo .boolean,
  .bash-demo .console {
    color: #ddd;
    margin: 0;
  }

  /* Green belongs to what node printed back, not to what was typed at it. */
  .bash-demo .string { color: #ddd; }
  .bash-demo .string-out { color: #5c5; }

  .bash-demo .number-out,
  .bash-demo .boolean-out { color: #dd5; }

  .bash-demo .undefined,
  .bash-demo .null { color: #777; }
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
    return ['session', 'header', 'flavour']
  }

  /** 'browser' — the devtools console; 'bash' — a terminal. */
  get flavour () {
    return this.getAttribute('flavour') === 'bash' ? 'bash' : 'browser'
  }

  attributeChangedCallback (name) {
    if (name === 'session') {
      this.steps = ConsoleDemo.parse(this.getAttribute('session') || '')
      return
    }

    if (this.caption) this.caption.innerText = this.title()
  }

  /** The fence's own words, or what the block is, in the language being read. */
  title () {
    const label = this.flavour === 'bash' ? pageLabels.terminalDemo : pageLabels.consoleDemo

    return this.getAttribute('header') || label[lang()] || label.ru
  }

  /**
   * The session as written, read into the steps it plays.
   *
   *   > what was typed
   *   < what the console answered
   *   ! what it complained about, in red
   *   ? what it warned about, in yellow
   *   $ a line typed at the shell, before node was started — ~~~bash only
   *   ... a continuation of the command above, as node prompts for one
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

    const start = (shell) => {
      open = { input: [], answers: [], shell: !!shell }
      steps.push(open)
      return open
    }

    const answer = (text, level) => {
      // An answer with no command above it is still an answer: a session may
      // open with something the console said on its own.
      if (!open) start()
      open.answers.push({ text, level })
    }

    for (const raw of session.split('\n')) {
      const line = raw.replace(/\s+$/, '')

      if (!line.trim().length) { open = null; continue }

      const trimmed = line.trimStart()

      if (/^>(\s|$)/.test(trimmed)) {
        // One space after the mark belongs to the mark; anything beyond it is
        // the author's indentation and is kept.
        const text = trimmed.slice(1).replace(/^ /, '')
        if (!open || open.answers.length || open.shell) start()
        open.input.push(text)
        continue
      }

      /*
       * A continuation of the command above, written as the terminal writes
       * it. node prompts with ... while a statement is unfinished, so a
       * session copied out of a terminal arrives with those already in it and
       * is pasted into a lesson unchanged.
       *
       * Several > lines in a row still mean the same thing — that is how the
       * seventy-three sessions already in the course are written — so both
       * ways work and neither has to be converted.
       */
      if (/^\.\.\.(\s|$)/.test(trimmed)) {
        const text = trimmed.slice(3).replace(/^ /, '')
        if (!open || open.answers.length) start()
        open.input.push(text)
        continue
      }

      // A line typed at the shell rather than at the REPL — `$ node` is the
      // one that starts the session the rest of the block is written in.
      if (/^\$(\s|$)/.test(trimmed)) {
        const text = trimmed.slice(1).replace(/^ /, '')
        if (!open || open.answers.length || open.input.length) start(true)
        open.shell = true
        open.input.push(text)
        continue
      }

      if (/^<(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).replace(/^ /, ''), null); continue }
      if (/^!(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).trim(), 'error'); continue }
      if (/^\?(\s|$)/.test(trimmed)) { answer(trimmed.slice(1).trim(), 'warning'); continue }

      answer(trimmed, null)
    }

    return steps.filter((step) => step.input.length || step.answers.length)
  }

  connectedCallback () {
    if (this.section) return

    const bar = Object.assign(createElem('div', this.shadow), { className: 'demo-bar' })

    this.button = Object.assign(createElem('button', bar), {
      className: 'demo-button',
      onclick: () => { this.expanded ? this.close() : this.open() }
    })

    this.face(false)

    this.caption = Object.assign(createElem('span', bar), {
      className: 'demo-title',
      innerText: this.title()
    })

    this.body = Object.assign(createElem('div', this.shadow), { className: 'demo-body' })

    // The devtools chrome belongs to the browser console and would be a lie
    // over a terminal, which has a title bar of its own instead.
    if (this.flavour === 'browser') {
      Object.assign(createElem('img', this.body), {
        className: 'console-frame',
        src: `${location.origin + location.pathname}/images/console.png`
      })
    } else {
      const bar = Object.assign(createElem('div', this.body), { className: 'terminal-bar' })
      createElem('span', bar).className = 'ico-20 bash'
      Object.assign(createElem('span', bar), { innerText: 'bash' })

      // The icons live in the page's stylesheet, which a shadow root does not
      // inherit — the same reason a spoiler had to ask for its own.
      getIconStyles('page', ['bash'])
        .then((textContent) => Object.assign(createElem('style', this.shadow), { textContent }))
    }

    this.section = Object.assign(createElem('section', this.body), {
      className: `live-demo-section console-demo${this.flavour === 'bash' ? ' bash-demo' : ''}`
    })

    this.expanded = false
  }

  disconnectedCallback () {
    this.stop()
  }

  /**
   * How tall the box has to be to hold the whole session.
   *
   * Measured when the demo is opened, not when it is connected. The palette
   * arrives as a promise, and until it does the host has no `display: block`
   * of its own — a custom element is inline by default, and an inline box does
   * not report the height of what is inside it. A one-command session came out
   * 89 pixels where it needed 121, and the answer and the rule under it were
   * cut off; a longer one happened to measure right and looked fine.
   *
   * scrollHeight rather than the rectangle, because the box is `height: 0` and
   * `overflow: hidden` until it opens: the rectangle is what the box is, and
   * scrollHeight is what it would have to be.
   */
  measure () {
    this.draw()
    const height = this.body.scrollHeight
    this.section.innerHTML = ''
    return height
  }

  /**
   * The whole session, laid out. Used to measure, and step by step to play.
   *
   * A rule under the command as well as under the answer, because that is
   * where a console draws one: pressing Enter rules off what was entered, and
   * the answer is ruled off under itself. And an empty prompt at the end,
   * which is what a console leaves you looking at.
   */
  draw () {
    this.section.innerHTML = ''

    for (const step of this.steps) {
      if (step.input.length) {
        this.command(step.input, step.shell)
        this.divider()
      }

      for (const answer of step.answers) this.answer(answer)
      this.divider()
    }

    this.waiting()
  }

  /**
   * The prompt a console is left showing, with nothing typed at it yet.
   *
   * In a terminal it depends on where the session left you. A block that only
   * ever ran shell commands — git, npm — is still at the shell and ends on $;
   * one that typed `$ node` and went on from there is inside the REPL and ends
   * on >, which is the prompt node leaves you looking at.
   */
  waiting () {
    const inRepl = this.steps.some((step) => step.input.length && !step.shell)
    const className = this.flavour === 'bash' && !inRepl ? 'prompt-shell' : 'prompt-input'

    Object.assign(createElem('span', createElem('p', this.section)), { className })
  }

  /**
   * What the button shows: ► to start, ⛌ to close.
   *
   * A terminal opens with the bash icon instead of the triangle — what is
   * being opened is a shell, and the icon says so before it is read.
   */
  face (opened) {
    this.button.innerHTML = ''

    if (opened) {
      this.button.innerText = '⛌'
      return
    }

    if (this.flavour === 'bash') {
      createElem('span', this.button).className = 'ico-20 bash'
      return
    }

    this.button.innerText = '►'
  }

  /** One command, however many lines it was entered over. */
  command (lines, shell) {
    return lines.map((text, index) => {
      const paragraph = createElem('p', this.section)

      Object.assign(createElem('span', paragraph), {
        className: shell ? 'prompt-shell' : index === 0 ? 'prompt-input' : 'continued'
      })

      const body = createElem('span', paragraph)
      for (const token of tokenize(text, false)) {
        Object.assign(createElem('span', body), { className: token.className, textContent: token.text })
      }

      return body
    })
  }

  answer ({ text, level }) {
    const paragraph = createElem('p', this.section)

    /*
     * In a browser console a complaint is the panel the rest of the course
     * draws, and nothing else: the class, its icon, and the text in the
     * panel's own colour.
     *
     * Not the ❮• prompt — the panel brings its own mark, and the two stood
     * side by side, three glyphs deep. And not the tokenizer either: it reads
     * the line as code and colours the words as keywords and strings, so the
     * message came out in syntax colours instead of the #fee the panel sets.
     * It used to be className = 'error', which nothing anywhere styles, so a !
     * line was drawn exactly like an ordinary answer — and the lesson
     * demonstrating console.warn against console.error showed one thing twice.
     *
     * A terminal draws no panel at all. It prints a complaint as the line of
     * text it is, white, in the stream with everything else — so there ! and ?
     * only say what the line is, for the author and for npm run demos.
     */
    if (level && this.flavour !== 'bash') {
      paragraph.className = `${level}-message`
      paragraph.textContent = text
      return
    }

    Object.assign(createElem('span', paragraph), { className: 'prompt-output' })

    const body = Object.assign(createElem('span', paragraph), { className: 'answer' })

    /*
     * A terminal colours the value it printed back, and nothing else.
     *
     * node hands a value to util.inspect, which paints a string green and a
     * number yellow; anything the program itself wrote — console.log, an
     * error message, the banner node opens with — is printed as it stands. So
     * `Invalid status 'figma'.` is all one colour in a terminal, where the
     * tokenizer would have picked the quoted part out of it and painted that.
     */
    if (this.flavour === 'bash' && !VALUE.test(text.trim())) {
      Object.assign(createElem('span', body), { className: 'default', textContent: text })
      return
    }

    for (const token of tokenize(text, true)) {
      Object.assign(createElem('span', body), { className: token.className, textContent: token.text })
    }
  }

  /**
   * The rule a console draws under what was entered and under its answer.
   *
   * A terminal draws none — it is a stream of lines and nothing else — so in
   * that flavour this is only the pause in the playing, and leaves no mark.
   */
  divider () {
    if (this.flavour === 'bash') return

    Object.assign(createElem('span', createElem('p', this.section)), { className: 'hr' })
  }

  open () {
    this.expanded = true
    this.face(true)
    this.button.classList.add('opened')
    this.body.classList.add('opened')

    // Measured now: by the time a reader has clicked, the palette is in and
    // the console picture has loaded, so the box is the size it needs to be.
    this.body.style.height = this.measure() + 'px'

    this.play()
  }

  close () {
    this.expanded = false
    this.face(false)
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

      if (step.input.length) {
        const lines = this.command(step.input, step.shell)

        /*
         * A block of several lines arrives in a terminal the way it arrives in
         * life: pasted. Nobody types a class definition into a REPL a
         * character at a time, and watching it done is a long wait for
         * something that is not the point of the lesson.
         *
         * command() has already built the lines in full, and type() works by
         * emptying them and putting them back — so a paste is simply not
         * calling it. One command on one line is still typed: that one is
         * somebody typing.
         */
        const pasted = this.flavour === 'bash' && lines.length > 1

        for (const body of lines) {
          if (!running()) return
          if (!pasted) await this.type(body, running)
        }

        if (pasted) await this.later(BEFORE_ANSWER)

        // Enter: the console rules off what was entered, then thinks.
        if (!running()) return
        this.divider()
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

    if (running()) this.waiting()
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
