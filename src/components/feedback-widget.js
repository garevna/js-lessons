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

      <section class="panel" role="dialog" aria-label="${this.words.title}">
        <button class="close" type="button" title="${this.words.close}" aria-label="${this.words.close}">×</button>
        <h3>${this.words.title}</h3>

        <div class="body">
          <label for="who">${this.words.name}</label>
          <input id="who" type="text" maxlength="60" placeholder="${this.words.namePlaceholder}">

          <label for="tg">${this.words.telegram}</label>
          <input id="tg" type="text" maxlength="40" placeholder="${this.words.telegramPlaceholder}">

          <label for="ask">${this.words.text}</label>
          <textarea id="ask" maxlength="4000" placeholder="${this.words.textPlaceholder}"></textarea>

          <button class="send" type="button">${this.words.send}</button>
          <p class="status"></p>

          <!-- Everything written before, with the answers under it. Below the
               form, not above: writing is why the panel was opened, and a
               reader with a long history should not have to scroll to it. -->
          <div class="thread"></div>
        </div>
      </section>
    `

    const find = selector => this.shadow.querySelector(selector)
    Object.assign(this, {
      button: find('.open'),
      badge: find('.badge'),
      panel: find('.panel'),
      list: find('.thread'),
      who: find('#who'),
      tg: find('#tg'),
      ask: find('#ask'),
      sendButton: find('.send'),
      status: find('.status')
    })
  }

  connectedCallback () {
    this.button.onclick = () => this.toggle(true)
    this.shadow.querySelector('.close').onclick = () => this.toggle(false)
    this.sendButton.onclick = () => this.send()

    // Ctrl/Cmd+Enter sends, which is what anyone writing in a textarea tries.
    this.ask.onkeydown = event => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) this.send()
    }

    // The badge is why the thread is read on load rather than on open: a
    // reader who was answered while away should see that from the page.
    if (this.thread) this.load()
  }

  disconnectedCallback () {
    clearInterval(this.timer)
  }

  toggle (open) {
    this.panel.classList.toggle('open', open)

    clearInterval(this.timer)
    if (!open) return

    if (this.thread) {
      this.load()
      // Only while the panel is open: nobody needs a background request every
      // twenty seconds on a page they are reading.
      this.timer = setInterval(() => this.load(), pollMs)
    }
    this.ask.focus()
  }

  /** Travels with the message, never shown: useful to whoever answers. */
  page () {
    return location.search.slice(1) || 'start-page'
  }

  async load () {
    if (!this.thread) return

    try {
      const url = `${endpoint}/feedback?thread=${encodeURIComponent(this.thread.id)}&token=${encodeURIComponent(this.thread.token)}`
      const response = await fetch(url, { headers: { Accept: 'application/json' } })

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

  draw () {
    const answers = this.messages.reduce((total, message) => total + message.replies.length, 0)
    const seen = (this.thread && this.thread.seen) || 0

    this.badge.textContent = String(Math.max(answers - seen, 0))
    this.button.classList.toggle('has-answers', answers > seen)

    // Opened and read: the badge should not keep shouting about it.
    if (this.panel.classList.contains('open') && this.thread) {
      this.thread = { ...this.thread, seen: answers }
      stored.write(this.thread)
      this.badge.textContent = '0'
      this.button.classList.remove('has-answers')
    }

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
      await this.load()
    } catch {
      this.say(this.words.failed, 'bad')
    } finally {
      this.sendButton.disabled = false
    }
  }
}

customElements.define('feedback-widget', FeedbackWidget)

export default FeedbackWidget
