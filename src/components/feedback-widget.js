/**
 * "Ask about this lesson" - the reader's end of the feedback loop.
 *
 * A question typed here reaches a private Telegram group; the answer written
 * there comes back into this same panel. The server side is feedback-api/ in
 * this repository.
 *
 * Nobody registers. The first question earns a thread id and a token, kept in
 * localStorage, and those two strings are the whole identity: the id is short
 * and appears in Telegram so a thread can be found months later, the token is
 * long and never leaves this browser. Clearing site data ends the thread -
 * the honest price of a form that asks for nothing, not even an e-mail.
 *
 * One thread per reader, not per lesson: each question carries the lesson it
 * was asked from, and somebody who asked on three pages should find all three
 * answers in one place rather than hunting for the page they used.
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

class FeedbackWidget extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.words = labels[lang()] || labels.eng
    this.thread = stored.read()
    this.questions = []
    this.timer = null

    createElem('style', this.shadow).textContent = feedbackStyles

    this.shadow.innerHTML += `
      <button class="open" type="button">
        <span>✍️ ${this.words.open}</span><span class="badge">0</span>
      </button>

      <section class="panel" role="dialog" aria-label="${this.words.title}">
        <header>
          <h3>${this.words.title}</h3>
          <button class="close" type="button" title="${this.words.close}">×</button>
        </header>

        <div class="body">
          <p class="intro">${this.words.intro}</p>
          <div class="thread"></div>

          <label for="who">${this.words.name}</label>
          <input id="who" type="text" maxlength="60" placeholder="${this.words.namePlaceholder}">

          <label for="ask">${this.words.text}</label>
          <textarea id="ask" maxlength="4000" placeholder="${this.words.textPlaceholder}"></textarea>

          <button class="send" type="button">${this.words.send}</button>
          <p class="status"></p>
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

    // The badge is the reason the thread is read on load rather than on open:
    // a reader who got an answer while away should see that from the page.
    if (this.thread) this.load()
  }

  disconnectedCallback () {
    clearInterval(this.timer)
  }

  toggle (open) {
    this.panel.classList.toggle('open', open)
    this.button.style.display = open ? 'none' : ''

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

  /** The lesson the reader is on: the same key the menu and the worker use. */
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
      this.questions = data.questions || []
      this.draw()
    } catch {
      // Offline, or the Worker is down. The panel keeps what it has.
    }
  }

  draw () {
    const answers = this.questions.reduce((total, question) => total + question.replies.length, 0)
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

    this.list.innerHTML = this.questions.map(question => `
      <article class="question">
        <div class="meta">
          <span>${escape(question.page || '')}</span>
          <span>${when(question.created)}</span>
          <span>${question.replies.length ? '' : '· ' + this.words.waiting}</span>
        </div>
        <p>${escape(question.text)}</p>
        ${question.replies.map(reply => `
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
      // Two strings instead of an account: kept before anything else, because
      // losing them loses the conversation.
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
