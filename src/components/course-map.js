/**
 * The whole course in one picture, opened over whatever page is being read.
 *
 * The lesson map (mind-map.js) answers "what is this lesson made of". This
 * one answers "where am I in the course": four concentric rings from the
 * core outwards, the topics that sit on the boundaries between them, and
 * the satellites that belong to no single ring. It is wanted on every page,
 * the start page included, so it hangs off the body rather than off a
 * lesson, and it opens from the main menu - which is where everything
 * course-wide already lives.
 *
 * The drawing itself is public/maps/course.html: a page of its own, with
 * its own geometry and its own small renderer, drawn by hand. It is shown
 * in a frame rather than ported into a component, because porting would
 * mean a second copy of the same picture - and the one thing a map must
 * never be is two maps that disagree.
 *
 * The frame is given its address only on the first open. A 35 KB document
 * that draws two hundred boxes should not be built on a page nobody asked
 * it for.
 */
const { createElem } = require('../helpers').default
const { lang } = require('../configs').default

const WORDS = {
  ru: { title: 'Ментальная карта', close: 'Закрыть' },
  ua: { title: 'Ментальна карта', close: 'Закрити' },
  eng: { title: 'Mind map', close: 'Close' }
}

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  :host { font-family: var(--font-family, system-ui, sans-serif); }

  .sheet {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 800;
    background: rgba(15, 23, 42, .6);
  }

  .sheet.shown { display: block; }

  .frame {
    position: absolute;
    inset: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #0F172A;
    box-shadow: 0 16px 48px rgba(15, 23, 42, .5);
    overflow: hidden;
  }

  header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #1E293B;
    background: #111C33;
  }

  h3 { flex: 1; margin: 0; color: #E2E8F0; font-size: 16px; font-weight: 700; }

  .close {
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid #334155;
    border-radius: 8px;
    background: none;
    color: #94A3B8;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }

  .close:hover { background: #1E293B; color: #fff; }

  iframe { flex: 1; width: 100%; border: 0; }

  @media screen and (max-width: 520px) {
    .frame { inset: 8px; }
    header { padding: 8px 12px; }
    h3 { font-size: 14px; }
  }
`

class CourseMap extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', this.shadow).textContent = styles

    // Без подписей: их ставит open(), на языке, который выбран к тому
    // моменту. Написанные здесь, они остались бы языком, который был при
    // загрузке страницы, — а переключатель языка страницу не
    // перезагружает, он сообщает о смене воркеру.
    this.shadow.innerHTML += `
      <div class="sheet">
        <div class="frame">
          <header>
            <h3></h3>
            <button class="close" type="button">×</button>
          </header>
          <iframe loading="lazy"></iframe>
        </div>
      </div>
    `

    this.sheet = this.shadow.querySelector('.sheet')
    this.frame = this.shadow.querySelector('iframe')
    this.heading = this.shadow.querySelector('h3')
  }

  connectedCallback () {
    this.shadow.querySelector('.close').onclick = () => this.close()
    this.sheet.onclick = event => { if (event.target === this.sheet) this.close() }
    this.escape = event => { if (event.key === 'Escape') this.close() }

    // A topic on the course map can have a map of its own — Classes does.
    // The drawing inside the frame cannot open it: the lesson map is a
    // component of this page, not of that document. So the frame asks, and
    // this is where the asking arrives.
    this.listen = event => {
      if (event.source !== this.frame.contentWindow) return
      const { courseMap, page } = event.data || {}
      if (courseMap !== 'lesson-map' || !page) return

      const map = document.querySelector('mind-map')
      if (!map) return

      this.close()
      map.open(page)
    }
    window.addEventListener('message', this.listen)
  }

  disconnectedCallback () {
    document.removeEventListener('keydown', this.escape)
    window.removeEventListener('message', this.listen)
  }

  open () {
    // Подписи и язык — каждый раз заново.
    //
    // Переключатель языка не перезагружает страницу: он пишет выбор в
    // localStorage и сообщает воркеру, а всё, что успело назвать себя
    // раньше, остаётся на прежнем языке. Шапка этого окна так и
    // оставалась русской над английской картой.
    //
    // Карта внутри читает тот же localStorage, но читает его при
    // загрузке фрейма, поэтому язык стоит и в адресе: сменился — адрес
    // другой, и фрейм перечитывается. Не сменился — фрейм остаётся как
    // был, и читатель находит карту там, где её оставил.
    const words = WORDS[lang()] || WORDS.eng

    this.heading.textContent = words.title
    this.frame.setAttribute('title', words.title)

    const close = this.shadow.querySelector('.close')
    close.setAttribute('title', words.close)
    close.setAttribute('aria-label', words.close)

    const address = `maps/course.html?${lang()}`
    if (this.frame.getAttribute('src') !== address) this.frame.setAttribute('src', address)

    this.sheet.classList.add('shown')
    document.addEventListener('keydown', this.escape)
  }

  close () {
    this.sheet.classList.remove('shown')
    document.removeEventListener('keydown', this.escape)
  }
}

customElements.define('course-map', CourseMap)

export default CourseMap
