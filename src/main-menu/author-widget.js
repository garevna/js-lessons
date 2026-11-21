/**
 * One button in the top bar where there were two.
 *
 * The bar is narrow and shared: a hamburger, a logo, and until now a donate
 * button and a message button side by side. Both of those are the same
 * errand - reaching the person who wrote the course - so they are one button
 * now, and the choice is made after it is pressed rather than before.
 *
 * The button is the starry one that used to say DONATE. It says AUTHOR here;
 * the one in the footer still says DONATE, because down there it is only
 * about money. Nothing inside either of them is merged: the message panel and
 * the wallet popup are the elements they always were, and this widget only
 * decides which of the two to open.
 *
 * Deliberately not imported: <feedback-widget> is defined by index.js and
 * <donate-popup> by donate.js, both of which every page already loads.
 * Importing them here would compile a second copy into main-menu.js, and the
 * second customElements.define of the same name throws.
 */
import { createElem } from './createElem'

const { feedbackConfig, lang } = require('../configs').default

/**
 * The message side of the course speaks three languages and the donate side
 * speaks none - its texts are English wherever they appear. A menu with one
 * Russian line and one English line beside it reads like an oversight, so the
 * second line is translated here. These two strings are the whole of it.
 */
const SUPPORT = {
  ru: 'Поддержать курс',
  ua: 'Підтримати курс',
  eng: 'Support the course'
}

const TITLE = {
  ru: 'Автору',
  ua: 'Авторці',
  eng: 'The author'
}

/** mdi-message-arrow-right, mdi-heart, mdi-forum. Drawn here for the same
 *  reason the send mark in the message panel is: these belong to the
 *  interface, not to a lesson, and the icon worker serves lessons. */
const ICONS = {
  message: 'M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M12 14L10.8 12.8L12.6 11H8V9H12.5L10.7 7.2L12 6L16 10L12 14Z',
  donate: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
  history: 'M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z'
}

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  :host {
    --author-ink: #203040;
    --author-soft: #6a7a88;
    --author-line: #dce4ea;
    font-family: var(--font-family, system-ui, sans-serif);
  }

  .trigger {
    display: block;
    position: relative;
    padding: 0;
    border: none;
    background: none;
    line-height: 0;
    cursor: pointer;
  }

  /* A fingertip is wider than the mark it aims at. */
  .trigger::after { content: ''; position: absolute; inset: -8px; }

  /* The answer that arrived while the reader was away. It used to sit on the
     message button; that button is gone, so it sits here - otherwise an
     answer comes and nothing on the page says so. */
  .badge {
    display: none;
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 20px;
    height: 20px;
    padding: 0 4px;
    border-radius: 10px;
    background: #f50;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    line-height: 20px;
    text-align: center;
  }

  .badge.on { display: block; }

  .menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 605;
    min-width: 232px;
    padding: 8px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 16px 36px rgba(10, 20, 30, .3);
  }

  .menu.shown { display: block; }

  .item {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    min-height: 44px;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: none;
    color: var(--author-ink);
    font: inherit;
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .item:hover, .item:focus-visible { background: #f2f5f7; }
  .item svg { flex: none; }
  .item.message svg { fill: #09b; }
  .item.donate svg { fill: #fa0; }
  .item.history svg { fill: #09b; }

  /* Nothing written yet. Left in place rather than taken away, so the menu
     is the same three lines every time; the colour says it is not for
     pressing, and the tooltip says why. */
  .item[disabled] {
    color: var(--author-soft);
    cursor: default;
  }

  .item[disabled] svg { fill: #c4ced6; }
  .item[disabled]:hover { background: none; }

  /* On a phone the bar has room for the button and nothing else; the menu is
     given the width it needs and kept off the right edge. */
  @media screen and (max-width: 520px) {
    .menu { min-width: 0; width: max-content; max-width: calc(100vw - 24px); }
  }
`

class AuthorWidget extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })

    const said = feedbackConfig.labels[lang()] || feedbackConfig.labels.eng
    this.words = {
      message: said.open,
      history: said.history,
      // Why the conversation is not clickable yet; the same sentence the
      // empty conversation would have shown.
      empty: said.historyEmpty,
      donate: SUPPORT[lang()] || SUPPORT.eng,
      title: TITLE[lang()] || TITLE.eng
    }

    createElem('style', this.shadow).textContent = styles

    const item = (kind, label) => `
      <button class="item ${kind}" type="button" role="menuitem" data-do="${kind}">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="${ICONS[kind]}"/>
        </svg>
        <span>${label}</span>
      </button>
    `

    this.shadow.innerHTML += `
      <button class="trigger" type="button" aria-haspopup="menu" aria-expanded="false"
              title="${this.words.title}" aria-label="${this.words.title}">
        <donate-button caption="AUTHOR"></donate-button>
        <span class="badge">0</span>
      </button>

      <!-- Three items, always the same three. The conversation was hidden
           until there was one to read - it seemed tidier - but a menu whose
           items come and go is harder to learn, and the first person to go
           looking for the missing one was the person who asked for it. With
           nothing to show it stays in place and greys out, and says why
           when the pointer rests on it. -->
      <div class="menu" role="menu">
        ${item('message', this.words.message)}
        ${item('donate', this.words.donate)}
        ${item('history', this.words.history)}
      </div>

      <feedback-widget headless></feedback-widget>
      <donate-popup></donate-popup>
    `

    const find = selector => this.shadow.querySelector(selector)
    Object.assign(this, {
      trigger: find('.trigger'),
      badge: find('.badge'),
      menu: find('.menu'),
      historyItem: find('.item.history'),
      mark: find('donate-button'),
      feedback: find('feedback-widget'),
      popup: find('donate-popup')
    })
  }

  static get observedAttributes () {
    return ['size']
  }

  attributeChangedCallback (name, oldValue, value) {
    if (name === 'size') this.mark.setAttribute('size', value)
  }

  connectedCallback () {
    this.mark.setAttribute('size', this.getAttribute('size') || 48)

    this.trigger.onclick = event => {
      event.stopPropagation()
      this.show(!this.open)
    }

    this.menu.onclick = event => {
      const button = event.target.closest('.item')
      if (!button) return
      this.show(false)

      const what = button.dataset.do
      if (what === 'donate') return this.donate()
      this.write(what === 'history' ? 'history' : 'write')
    }

    // A menu that cannot be dismissed by looking away is a trap, so a press
    // anywhere else closes it. Telling "anywhere else" from "on the menu" is
    // the hard part here.
    //
    // Not composedPath(): this widget lives inside the main menu's shadow
    // root, and that root is closed. A listener on the document is shown a
    // path that stops at <main-menu-component> - this element is not in it,
    // so every press looked like a press outside. The menu then closed on
    // pointerdown and the click that followed landed on nothing at all: the
    // items did nothing, and there was no error to show for it.
    //
    // A flag set on the way up instead. The press passes this element before
    // it reaches the document, whatever the shadow boundaries hide.
    this.insider = () => { this.pressedInside = true }
    this.addEventListener('pointerdown', this.insider)

    this.away = () => {
      if (this.pressedInside) {
        this.pressedInside = false
        return
      }
      this.show(false)
    }
    this.escape = event => { if (event.key === 'Escape') this.show(false) }

    // The hamburger covers the bar on a narrow screen, and the old donate
    // button stepped aside for it. This one keeps that arrangement.
    this.addEventListener('main-menu-expand', () => {
      if (window.innerWidth <= 460) this.style.display = 'none'
    })
    this.addEventListener('main-menu-close', () => { this.style.display = 'block' })

    // Nothing written yet, so nothing to read: the item stays where it is
    // and stops answering. Sending the first message turns it on, without a
    // reload - the widget says so the moment it has a thread.
    this.historyItem.disabled = true
    this.historyItem.title = this.words.empty

    this.feedback.addEventListener('answers', event => {
      const { count, thread } = event.detail
      this.badge.textContent = String(count)
      this.badge.classList.toggle('on', count > 0)
      this.historyItem.disabled = !thread
      this.historyItem.title = thread ? '' : this.words.empty
    })
  }

  disconnectedCallback () {
    this.show(false)
  }

  show (open) {
    this.open = open
    this.menu.classList.toggle('shown', open)
    this.trigger.setAttribute('aria-expanded', String(open))

    const method = open ? 'addEventListener' : 'removeEventListener'
    document[method]('pointerdown', this.away)
    document[method]('keydown', this.escape)
  }

  /** The message panel, opened from the outside on one of its two windows:
   *  its shadow is closed, so there is no reaching in except through the
   *  method it offers. */
  write (which = 'write') {
    customElements.whenDefined('feedback-widget').then(() => this.feedback.open(which))
  }

  /** What donate-component does when its own button is pressed. */
  donate () {
    customElements.whenDefined('donate-popup').then(() => this.popup.dispatchEvent(new Event('show')))
  }
}

customElements.define('author-widget', AuthorWidget)

export default AuthorWidget
