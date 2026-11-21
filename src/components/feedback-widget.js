/**
 * A message to the author - the reader's end of the feedback loop.
 *
 * It lives in the top bar, beside the donate widget, and has the same
 * standing: something a reader may do, not something the site asks for. It
 * is not a question box about the lesson and promises no consultation; what
 * is written here reaches a private Telegram group, and an answer, if one
 * comes, appears in this same panel.
 *
 * Nobody registers. The first message earns a thread id and a token, kept in
 * localStorage, and those two strings are the whole identity: the id is
 * short and is printed in Telegram so a thread can be found months later,
 * the token is long and never leaves this browser. Clearing site data ends
 * the thread - the honest price of a form that asks for nothing.
 *
 * A reader who leaves a Telegram handle can be answered there directly; the
 * post in the group carries it as a link.
 */
const { createElem } = require('../helpers').default
const { feedbackStyles } = require('../styles').default
const { feedbackConfig, lang } = require('../configs').default

const { endpoint, storageKey, pollMs, labels } = feedbackConfig

/** localStorage throws in a file:// page and with site data blocked. */
const stored = {
  read () {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || 'null')
    } catch {
      return null
    }
  },
  write (value) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {}
  }
}

const escape = text => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const when = stamp => new Date(stamp).toLocaleString(undefined, {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
})

/**
 * A send mark, drawn here rather than fetched: the icons on this site come
 * from a worker that serves the lesson icon set, and this one belongs to the
 * interface, not to a lesson. Anyone who reads JavaScript knows what it
 * means; the tooltip is for everyone else.
 */
const SEND_ICON = `
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <circle cx="12" cy="12" r="10.1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path fill="currentColor" d="M6.6 16.9V13l5.1-1-5.1-1V7.1l11.1 4.9z"/>
  </svg>
`

class FeedbackWidget extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.words = labels[lang()] || labels.eng
    this.thread = stored.read()
    this.messages = []
    this.timer = null

    createElem('style', this.shadow).textContent = feedbackStyles

    this.shadow.innerHTML += `
      <button class="open" type="button" title="${this.words.open}" aria-label="${this.words.open}">
        ${SEND_ICON}<span class="badge">0</span>
      </button>

      <!--
        Two windows, not one with the past pinned under the form.

        They were one: the form, and everything written before it underneath.
        That makes writing a short errand read as a long one - a reader who
        only wants to ask something scrolls past their own history to find
        the button - and it makes reading an answer a matter of scrolling
        past an empty form. So: a form that is only a form, and a
        conversation that is only the conversation. Sending moves from the
        first to the second, which is where the answer will appear.
      -->
      <section class="panel" role="dialog" aria-label="${this.words.title}">
        <button class="close" type="button" title="${this.words.close}" aria-label="${this.words.close}">×</button>
        <h3></h3>

        <div class="body">
          <div class="view write">
            <label for="who">${this.words.name}</label>
            <input id="who" type="text" maxlength="60" placeholder="${this.words.namePlaceholder}">

            <!-- A handle is not a word. The keyboard on a phone capitalises
                 the first letter of a field and corrects what it does not
                 know, so "garevna" is offered back as "Garevna" or as
                 something else entirely - and the answer then goes to a nick
                 that does not exist. All three have to be refused by name. -->
            <label for="tg">${this.words.telegram}</label>
            <input id="tg" type="text" maxlength="40" placeholder="${this.words.telegramPlaceholder}"
                   autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false">

            <label for="ask">${this.words.text}</label>
            <textarea id="ask" maxlength="4000" placeholder="${this.words.textPlaceholder}"></textarea>

            <button class="send" type="button">${this.words.send}</button>
            <p class="status"></p>

            <!-- Said before writing rather than after: a reader who comes
                 back on the twentieth day to an empty form deserves to have
                 been told, and there is no account here to recover it from. -->
            <p class="kept">${this.words.kept}</p>
          </div>

          <div class="view history">
            <div class="thread"></div>
            <p class="nothing">${this.words.historyEmpty}</p>
            <button class="again" type="button">${this.words.writeMore}</button>
          </div>
        </div>
      </section>
    `

    const find = selector => this.shadow.querySelector(selector)
    Object.assign(this, {
      button: find('.open'),
      badge: find('.badge'),
      panel: find('.panel'),
      heading: find('h3'),
      scroller: find('.body'),
      writeView: find('.view.write'),
      historyView: find('.view.history'),
      list: find('.thread'),
      nothing: find('.nothing'),
      againButton: find('.again'),
      who: find('#who'),
      tg: find('#tg'),
      ask: find('#ask'),
      sendButton: find('.send'),
      status: find('.status')
    })

    this.view = 'write'
  }

  connectedCallback () {
    // "headless": somebody else provides the button.
    //
    // In the top bar this widget sits inside <author-widget>, which offers
    // one starry button for both writing to the author and supporting the
    // course, and opens this panel through open() below. Its own icon would
    // be a second button for the same thing, which is the crowding the
    // arrangement was made to undo.
    if (this.hasAttribute('headless')) this.button.style.display = 'none'

    this.button.onclick = () => this.toggle(true)
    this.shadow.querySelector('.close').onclick = () => this.toggle(false)
    this.sendButton.onclick = () => this.send()
    this.againButton.onclick = () => this.show('write')

    // Ctrl/Cmd+Enter sends, which is what anyone writing in a textarea tries.
    this.ask.onkeydown = event => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) this.send()
    }

    this.show('write')

    // The badge is why the thread is read on load rather than on open: a
    // reader who was answered while away should see that from the page.
    //
    // And whoever draws the button has to be told either way - with a thread
    // or without one - because the conversation is only offered to a reader
    // who has one.
    this.thread ? this.load() : this.announce()
  }

  disconnectedCallback () {
    clearInterval(this.timer)
    this.watchKeyboard(false)
  }

  /**
   * The panel is fixed, and an on-screen keyboard is not.
   *
   * A phone does not make the page shorter when the keyboard comes up - the
   * window stays the size it was and the keyboard is laid over the bottom
   * half of it. A panel sized by the window therefore ends up with its Send
   * button under the keys, and nothing about the panel says so.
   *
   * visualViewport is the part still in sight. While the panel is open the
   * cap is taken from that instead, and the inline value is removed the
   * moment the keyboard goes away, so the stylesheet is back in charge on a
   * desktop and after every rotation.
   */
  watchKeyboard (on) {
    const view = window.visualViewport
    if (!view) return

    if (!this.onKeyboard) this.onKeyboard = () => {
      const hidden = window.innerHeight - view.height
      if (hidden < 120) {
        this.panel.style.maxHeight = ''
        return
      }
      const top = this.panel.getBoundingClientRect().top
      this.panel.style.maxHeight = `${Math.max(view.height - top - 12, 200)}px`
    }

    view[on ? 'addEventListener' : 'removeEventListener']('resize', this.onKeyboard)
    if (!on) this.panel.style.maxHeight = ''
  }

  /**
   * The only way in from outside: the shadow root is closed, so a host that
   * draws its own buttons has no panel to reach for - only this. The
   * argument says which of the two windows is wanted, "write" or "history".
   */
  open (which = 'write') {
    this.show(which)
    this.toggle(true)
  }

  /** Which of the two is on show. The panel, its heading and the polling all
   *  follow from it. */
  show (which) {
    this.view = which === 'history' ? 'history' : 'write'

    const history = this.view === 'history'
    this.writeView.style.display = history ? 'none' : 'block'
    this.historyView.style.display = history ? 'block' : 'none'
    this.heading.textContent = history ? this.words.history : this.words.title
    this.panel.setAttribute('aria-label', this.heading.textContent)

    if (history) this.drawThread()
    if (this.panel.classList.contains('shown')) this.watchThread()
    this.scroller.scrollTop = 0
  }

  /**
   * Asking the server every twenty seconds is worth it only where an answer
   * would be seen arriving - the conversation, open, in front of the reader.
   * Not behind the form, and not on a page nobody has opened the panel on.
   */
  watchThread () {
    clearInterval(this.timer)
    if (this.view !== 'history' || !this.thread) return
    this.load()
    this.timer = setInterval(() => this.load(), pollMs)
  }

  toggle (open) {
    // "shown", not "open": the icon button is .open, and a shared class name
    // means the button's rules land on the panel as well - see the stylesheet.
    this.panel.classList.toggle('shown', open)

    clearInterval(this.timer)
    this.watchKeyboard(open)
    if (!open) return

    this.watchThread()

    // preventScroll, and the panel back to the top.
    //
    // Plain focus() scrolls the field into view, and the field is inside a
    // scrolling box: on a short window the panel therefore opened already
    // scrolled, with the first label sliced in half under the heading. It
    // read as a broken layout and was only the browser being helpful.
    this.scroller.scrollTop = 0

    // Not on a touch screen. There, focusing throws up the keyboard over half
    // the panel before the reader has decided to write anything - and on iOS
    // it also drags the page about. A finger can choose its own field.
    if (this.view === 'write' && !matchMedia('(pointer: coarse)').matches) {
      this.ask.focus({ preventScroll: true })
    }
  }

  /** Travels with the message, never shown: useful to whoever answers. */
  page () {
    return location.search.slice(1) || 'start-page'
  }

  async load () {
    if (!this.thread) return

    try {
      // POST, and the token in the body. It used to be a query string, and a
      // query string is the one part of a request that gets written down
      // everywhere - proxy logs, the browser's own history, a Referer header
      // on the way out. This token is the whole of the reader's identity:
      // there is no password behind it and no way to issue a new one.
      const response = await fetch(`${endpoint}/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ thread: this.thread.id, token: this.thread.token })
      })

      if (response.status === 404) {
        // The thread is gone from the server; this browser's copy means
        // nothing any more, and keeping it would hide the form forever.
        this.thread = null
        stored.write(null)
        this.draw()
        return
      }
      if (!response.ok) return

      const data = await response.json()
      this.messages = data.questions || []
      this.draw()
    } catch {
      // Offline, or the Worker is down. The panel keeps what it has.
    }
  }

  /**
   * What the outside is told: how many answers are unread, and whether
   * there is a conversation at all.
   *
   * The second one decides whether the conversation is offered in the menu.
   * A reader who has never written has nothing to read, and an item that
   * opens an explanation of its own emptiness is worse than no item.
   */
  announce () {
    this.dispatchEvent(new CustomEvent('answers', {
      detail: {
        count: Number(this.badge.textContent) || 0,
        thread: !!this.thread
      }
    }))
  }

  draw () {
    const answers = this.messages.reduce((total, message) => total + message.replies.length, 0)
    const seen = (this.thread && this.thread.seen) || 0

    this.badge.textContent = String(Math.max(answers - seen, 0))
    this.button.classList.toggle('has-answers', answers > seen)

    // Read where it can be read: the conversation, open. Marking answers as
    // seen because the form happened to be on screen would silence the badge
    // for a reader who never looked at them.
    if (this.panel.classList.contains('shown') && this.view === 'history' && this.thread) {
      this.thread = { ...this.thread, seen: answers }
      stored.write(this.thread)
      this.badge.textContent = '0'
      this.button.classList.remove('has-answers')
    }

    this.announce()
    this.drawThread()
  }

  drawThread () {
    this.nothing.style.display = this.messages.length ? 'none' : 'block'
    this.againButton.style.display = this.messages.length ? 'block' : 'none'

    this.list.innerHTML = this.messages.map(message => `
      <article class="message">
        <div class="meta">
          <span>${when(message.created)}</span>
          ${message.replies.length ? '' : `<span>· ${this.words.waiting}</span>`}
        </div>
        <p>${escape(message.text)}</p>
        ${message.replies.map(reply => `
          <div class="reply">
            <div class="meta">🤝 ${when(reply.created)}</div>${escape(reply.text)}
          </div>
        `).join('')}
      </article>
    `).join('')
  }

  say (text, kind = '') {
    this.status.textContent = text
    this.status.className = `status ${kind}`
  }

  async send () {
    const text = this.ask.value.trim()
    if (!text) {
      this.say(this.words.empty, 'bad')
      return
    }

    this.sendButton.disabled = true
    this.say(this.words.sending)

    const body = {
      text,
      name: this.who.value.trim() || undefined,
      telegram: this.tg.value.trim() || undefined,
      page: this.page(),
      lang: lang(),
      ...(this.thread ? { thread: this.thread.id, token: this.thread.token } : {})
    }

    try {
      const response = await fetch(`${endpoint}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body)
      })

      if (response.status === 429) {
        this.say(this.words.tooMany, 'bad')
        return
      }
      if (!response.ok && response.status !== 202) {
        this.say(this.words.failed, 'bad')
        return
      }

      const answer = await response.json()
      // Two strings instead of an account: kept before anything else,
      // because losing them loses the conversation.
      this.thread = { id: answer.thread, token: answer.token, seen: (this.thread && this.thread.seen) || 0 }
      stored.write(this.thread)

      this.ask.value = ''
      this.say(this.words.sent, 'good')

      // Straight to the conversation. The message has left, and the place
      // where its answer will appear is the only thing left to show; a form
      // that has just been emptied says nothing about what happened to what
      // was in it. The status line goes with the form, so it is cleared on
      // the way out rather than left behind for the next visit.
      await this.load()
      this.say('')
      this.show('history')
      this.watchThread()
    } catch {
      this.say(this.words.failed, 'bad')
    } finally {
      this.sendButton.disabled = false
    }
  }
}

customElements.define('feedback-widget', FeedbackWidget)

export default FeedbackWidget
