/**
 * The lesson's subject as a drawing.
 *
 * Not the table of contents in another shape: the contents say in what order
 * the lesson is written, this says what the subject is made of. Tests and the
 * quest belong to the first and have no place here; "Class Declaration" and
 * "Class Expression" are one group here and pages apart in the lesson.
 *
 * And not a computed layout either, which is what this was. A generic radial
 * algorithm optimises for boxes that do not collide, and that is not the same
 * thing as a picture a person can read: branches came out at odd angles, and
 * three lines leaving one point curved three different ways. A map like this
 * is a designed object. So the geometry - every x, every y, every curve - is
 * taken from the drawing in content/js-classes-mindmap-v2.html and kept in
 * public/maps/<page>.json; moving a box means changing a number there, and
 * nothing here second-guesses it.
 *
 * What is computed is everything the drawing cannot carry: the labels in
 * whichever of the three languages is being read, the card that opens on a
 * click with a sentence and a few lines of code, the way into the section of
 * the lesson that explains the thing, and folding a branch away.
 *
 * A lesson with no such file has no map and is not offered one.
 */
const { createElem } = require('../helpers').default
const { lang } = require('../configs').default

/** A field is either one string for everyone, or the three languages. */
const speak = value => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang()] || value.ru || value.eng || ''
}

const INK = '#1E293B'

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  :host { font-family: var(--font-family, system-ui, sans-serif); }

  .sheet {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 700;
    background: rgba(15, 23, 42, .55);
  }

  .sheet.shown { display: block; }

  .frame {
    position: absolute;
    inset: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #F1F5F9;
    box-shadow: 0 16px 48px rgba(15, 23, 42, .4);
    overflow: hidden;
  }

  header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #E2E8F0;
    background: #fff;
  }

  h3 { flex: 1; margin: 0; color: ${INK}; font-size: 16px; font-weight: 700; }

  .tool {
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    background: #F8FAFC;
    color: #334155;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
  }

  .tool:hover { background: #E2E8F0; color: ${INK}; }
  .tool.close { font-size: 20px; }

  .board {
    flex: 1;
    overflow: hidden;
    touch-action: none;
    cursor: grab;
  }

  .board.dragging { cursor: grabbing; }

  svg { display: block; }

  .node { cursor: pointer; }
  .node rect { transition: filter .15s; }
  .node:hover rect { filter: brightness(.96); }
  .branch-line { fill: none; stroke-linecap: round; }

  .card {
    display: none;
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 20;
    width: 380px;
    max-width: calc(100% - 40px);
    padding: 16px;
    border-radius: 12px;
    background: ${INK};
    color: #F8FAFC;
    box-shadow: 0 12px 28px rgba(15, 23, 42, .35);
  }

  .card.shown { display: block; }
  .card h4 { margin: 0 8px 8px 0; padding-right: 24px; color: #38BDF8; font-size: 15px; }
  .card p { margin: 0 0 12px; color: #CBD5E1; font-size: 13px; line-height: 1.45; }

  .card pre {
    margin: 0;
    padding: 12px;
    border-radius: 8px;
    background: #0F172A;
    color: #A7F3D0;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.45;
    overflow-x: auto;
  }

  .card .go {
    display: inline-block;
    margin-top: 12px;
    color: #38BDF8;
    font-size: 13px;
    cursor: pointer;
  }

  .card .go:hover { color: #7DD3FC; }

  .card .shut {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: none;
    color: #94A3B8;
    font-size: 16px;
    cursor: pointer;
  }

  .card .shut:hover { color: #fff; }

  @media screen and (max-width: 520px) {
    .frame { inset: 8px; }
    header { padding: 8px 12px; }
    h3 { font-size: 14px; }
    .card { right: 8px; left: 8px; bottom: 8px; width: auto; }
  }
`

const escapeText = text => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

/**
 * Measuring a label without drawing it.
 *
 * The boxes are a fixed width, because the drawing is: moving one to fit a
 * word would pull the balance out of the picture, which is the whole reason
 * for drawing it by hand. But a label is three labels - the same box holds
 * "Поля экземпляра", "Поля екземпляра" and "Instance fields" - and they are
 * not the same length. Whichever of them does not fit is cut and given an
 * ellipsis, and the whole of it goes into the tooltip, so nothing is lost,
 * only folded away.
 */
const ruler = document.createElement('canvas').getContext('2d')

const shorten = (text, room, size, weight) => {
  ruler.font = `${weight} ${size}px system-ui, sans-serif`
  if (ruler.measureText(text).width <= room) return { label: text, cut: false }

  let cut = text
  while (cut.length > 1 && ruler.measureText(`${cut}…`).width > room) cut = cut.slice(0, -1)
  return { label: `${cut.trimEnd()}…`, cut: true }
}

/** One box: the drawing says where and how wide, the level says how tall. */
const box = (node, shape, text) => {
  // 11px of air each side, the same as the drawing leaves.
  const { label, cut } = shorten(text, node.w - 22, shape.size, shape.weight)
  return `
    <g class="node" data-key="${escapeText(node.key)}">
      <rect x="${node.x - node.w / 2}" y="${node.y - shape.h / 2}" width="${node.w}" height="${shape.h}"
            rx="${shape.h / 2}" ${shape.paint}/>
      <text x="${node.x}" y="${node.y}" fill="${shape.ink}" font-size="${shape.size}"
            font-weight="${shape.weight}" text-anchor="middle" dominant-baseline="central">${escapeText(label)}</text>
      ${cut ? `<title>${escapeText(text)}</title>` : ''}
    </g>
  `
}

class MindMap extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', this.shadow).textContent = styles

    this.shadow.innerHTML += `
      <div class="sheet">
        <div class="frame">
          <header>
            <h3></h3>
            <button class="tool out" type="button" title="−" aria-label="−">−</button>
            <button class="tool in" type="button" title="+" aria-label="+">+</button>
            <button class="tool fit" type="button" title="⤢" aria-label="⤢">⤢</button>
            <button class="tool close" type="button" title="×" aria-label="×">×</button>
          </header>

          <div class="board"></div>

          <div class="card">
            <button class="shut" type="button" aria-label="×">×</button>
            <h4></h4>
            <p></p>
            <pre></pre>
            <span class="go"></span>
          </div>
        </div>
      </div>
    `

    const find = selector => this.shadow.querySelector(selector)
    Object.assign(this, {
      sheet: find('.sheet'),
      heading: find('h3'),
      board: find('.board'),
      card: find('.card'),
      cardTitle: find('.card h4'),
      cardDesc: find('.card p'),
      cardCode: find('.card pre'),
      cardGo: find('.card .go'),
      view: { x: 0, y: 0, scale: 1 },
      closed: new Set(),
      cards: new Map()
    })
  }

  connectedCallback () {
    this.shadow.querySelector('.close').onclick = () => this.close()
    this.shadow.querySelector('.shut').onclick = () => this.card.classList.remove('shown')
    this.shadow.querySelector('.in').onclick = () => this.zoom(1.25)
    this.shadow.querySelector('.out').onclick = () => this.zoom(0.8)
    this.shadow.querySelector('.fit').onclick = () => this.fit()
    this.sheet.onclick = event => { if (event.target === this.sheet) this.close() }

    this.escape = event => { if (event.key === 'Escape') this.close() }
    this.board.onpointerdown = event => this.grab(event)
    this.board.onwheel = event => {
      event.preventDefault()
      this.zoom(event.deltaY < 0 ? 1.1 : 0.9)
    }
  }

  disconnectedCallback () {
    document.removeEventListener('keydown', this.escape)
  }

  static page () {
    return location.search.slice(1) || 'start-page'
  }

  /**
   * The map file, fetched once per lesson and kept. Also the answer to
   * whether this lesson has a map at all: the contents panel asks before
   * offering the way in, because a line that opens an apology is worse than
   * no line.
   */
  async data () {
    const page = MindMap.page()
    if (this.loaded === page) return this.map
    this.loaded = page

    try {
      const response = await fetch(`maps/${page}.json`, { headers: { Accept: 'application/json' } })
      this.map = response.ok ? await response.json() : null
    } catch {
      this.map = null
    }
    return this.map
  }

  async exists () {
    return !!(await this.data())
  }

  async open () {
    this.sheet.classList.add('shown')
    this.card.classList.remove('shown')
    document.addEventListener('keydown', this.escape)

    const map = await this.data()
    if (!map) {
      this.heading.textContent = ''
      this.board.innerHTML = ''
      return
    }

    this.heading.textContent = speak(map.center && map.center.title)
    this.closed = new Set()
    this.draw()
    this.fit()
  }

  close () {
    this.sheet.classList.remove('shown')
    this.card.classList.remove('shown')
    document.removeEventListener('keydown', this.escape)
  }

  /**
   * The drawing, as drawn.
   *
   * Four levels, each with its own height, colours and line, exactly as in
   * the file this was taken from: a branch is filled with its colour, a
   * group is the same colour in a wash with a solid outline, an item is
   * white, and a sub-item is a wash again and hangs off a dashed line.
   */
  draw () {
    const map = this.map
    const parts = []
    this.cards = new Map()

    const remember = node => {
      this.cards.set(node.key, node)
      return node
    }

    for (const branch of map.branches || []) {
      const shut = this.closed.has(branch.id)

      parts.push(`<path class="branch-line" d="${branch.path}" stroke="${branch.colour}" stroke-width="4"/>`)

      if (!shut) {
        for (const group of branch.groups || []) {
          const folded = this.closed.has(group.id)
          parts.push(`<path class="branch-line" d="${group.path}" stroke="${branch.colour}" stroke-width="2.5"/>`)

          if (!folded) {
            for (const item of group.items || []) {
              parts.push(`<path class="branch-line" d="${item.path}" stroke="${branch.line}" stroke-width="1.8"/>`)

              for (const sub of item.subItems || []) {
                parts.push(`
                  <path class="branch-line" d="${sub.path}" stroke="${branch.line}"
                        stroke-width="1.5" stroke-dasharray="4,2"/>
                `)
                sub.key = `${group.id}:${speak(sub.title)}`
                parts.push(box(remember(sub), {
                  h: 26,
                  size: 12,
                  weight: 500,
                  ink: INK,
                  paint: `fill="${branch.tint}" stroke="${branch.line}" stroke-width="1.5"`
                }, speak(sub.title)))
              }

              item.key = `${group.id}:${speak(item.title)}`
              parts.push(box(remember(item), {
                h: 30,
                size: 13,
                weight: 500,
                ink: '#334155',
                paint: `fill="#FFFFFF" stroke="${branch.line}" stroke-width="1.5"`
              }, speak(item.title)))
            }
          }

          group.key = `fold:${group.id}`
          parts.push(box(remember({ ...group, key: group.key }), {
            h: 34,
            size: 13.5,
            weight: 600,
            ink: INK,
            paint: `fill="${branch.tint}" stroke="${branch.colour}" stroke-width="2"`
          }, `${speak(group.title)} ${folded ? '+' : '−'}`))
        }
      }

      branch.key = `fold:${branch.id}`
      parts.push(box(remember({ ...branch, key: branch.key }), {
        h: 40,
        size: 15,
        weight: 700,
        ink: '#FFFFFF',
        paint: `fill="${branch.colour}" filter="url(#shadow)"`
      }, `${speak(branch.title)} ${shut ? '+' : '−'}`))
    }

    const centre = map.center
    parts.push(`
      <g>
        <circle cx="${centre.x}" cy="${centre.y}" r="82" fill="#FFFFFF" stroke="#0F172A" stroke-width="5" filter="url(#shadow)"/>
        <circle cx="${centre.x}" cy="${centre.y}" r="72" fill="${INK}"/>
        <text x="${centre.x}" y="${centre.y - 17}" fill="#93C5FD" font-family="monospace"
              font-size="24" font-weight="700" text-anchor="middle">&lt;/&gt;</text>
        <text x="${centre.x}" y="${centre.y + 20}" fill="#FFFFFF" font-size="19"
              font-weight="700" text-anchor="middle">${escapeText(speak(centre.title))}</text>
      </g>
    `)

    const frame = this.extent(map)
    this.size = { width: frame.width, height: frame.height }

    this.board.innerHTML = `
      <svg width="${frame.width}" height="${frame.height}" viewBox="${frame.box}">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.1"/>
          </filter>
        </defs>
        ${parts.join('')}
      </svg>
    `

    this.svg = this.board.querySelector('svg')
    this.svg.onclick = event => {
      if (this.dragged) return
      const group = event.target.closest('.node')
      if (!group) return

      const key = group.dataset.key
      if (key.startsWith('fold:')) {
        const id = key.slice(5)
        this.closed.has(id) ? this.closed.delete(id) : this.closed.add(id)
        this.redraw()
        return
      }

      const node = this.cards.get(key)
      if (node) this.tell(node)
    }
  }

  /**
   * How much room the drawing actually needs.
   *
   * Not the viewBox it was drawn with: in the drawing this came from, the
   * two sub-items of Class Expression sit at x = 20 with a width of 115, so
   * half of each hangs off the left edge of a box that starts at zero. What
   * falls outside a viewBox is not clipped by the window - it is not drawn
   * at all, and no amount of dragging brings it back.
   *
   * So the boxes are measured and the frame is drawn round them, with the
   * declared viewBox taken as a floor rather than a promise.
   */
  extent (map) {
    const edges = { left: 0, top: 0, right: 0, bottom: 0 }
    const [floorX, floorY, floorW, floorH] = (map.viewBox || '0 0 1600 1060').split(/\s+/).map(Number)
    Object.assign(edges, { left: floorX, top: floorY, right: floorX + floorW, bottom: floorY + floorH })

    const stretch = (node, h) => {
      if (!node || node.x === undefined) return
      edges.left = Math.min(edges.left, node.x - node.w / 2)
      edges.right = Math.max(edges.right, node.x + node.w / 2)
      edges.top = Math.min(edges.top, node.y - h / 2)
      edges.bottom = Math.max(edges.bottom, node.y + h / 2)
    }

    for (const branch of map.branches || []) {
      stretch(branch, 40)
      for (const group of branch.groups || []) {
        stretch(group, 34)
        for (const item of group.items || []) {
          stretch(item, 30)
          for (const sub of item.subItems || []) stretch(sub, 26)
        }
      }
    }

    const pad = 24
    const box = [
      edges.left - pad,
      edges.top - pad,
      edges.right - edges.left + pad * 2,
      edges.bottom - edges.top + pad * 2
    ]
    return { box: box.join(' '), width: box[2], height: box[3] }
  }

  /** Redrawn after a branch folded, without moving the view. */
  redraw () {
    const view = { ...this.view }
    this.draw()
    this.view = view
    this.apply()
  }

  /** What a click on an item says: the sentence, the code, and the way in. */
  tell (node) {
    const desc = speak(node.desc)
    if (!desc && !node.code && !node.anchor) return

    this.cardTitle.textContent = speak(node.title)
    this.cardDesc.textContent = desc
    this.cardDesc.style.display = desc ? 'block' : 'none'
    this.cardCode.textContent = node.code || ''
    this.cardCode.style.display = node.code ? 'block' : 'none'

    const words = { ru: 'Читать в уроке →', ua: 'Читати в уроці →', eng: 'Read it in the lesson →' }
    this.cardGo.textContent = node.anchor ? (words[lang()] || words.eng) : ''
    this.cardGo.style.display = node.anchor ? 'inline-block' : 'none'
    this.cardGo.onclick = node.anchor ? () => this.goTo(node.anchor) : null

    this.card.classList.add('shown')
  }

  goTo (anchor) {
    this.close()
    const target = document.getElementById(anchor)
    if (!target) return
    history.replaceState(null, '', `${location.pathname}${location.search}#${anchor}`)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  apply () {
    const { x, y, scale } = this.view
    this.svg.style.transformOrigin = '0 0'
    this.svg.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  zoom (by) {
    if (!this.svg) return
    this.view.scale = Math.min(2.5, Math.max(0.2, this.view.scale * by))
    this.apply()
  }

  /** The whole drawing in the window, centred. */
  fit () {
    if (!this.svg) return
    const place = this.board.getBoundingClientRect()
    const scale = Math.min(1.4, (place.width - 32) / this.size.width, (place.height - 32) / this.size.height)
    this.view = {
      scale,
      x: (place.width - this.size.width * scale) / 2,
      y: (place.height - this.size.height * scale) / 2
    }
    this.apply()
  }

  /**
   * Dragging the picture about - and letting a press that is not a drag
   * reach the box under it. The capture is taken on the first movement, not
   * on the press: taken on the press it makes the board the target of
   * everything that follows, and nothing on the map answers a click at all.
   */
  grab (event) {
    if (!this.svg) return

    const start = { x: event.clientX, y: event.clientY, vx: this.view.x, vy: this.view.y }
    let dragging = false

    const move = moved => {
      if (!dragging) {
        if (Math.abs(moved.clientX - start.x) + Math.abs(moved.clientY - start.y) < 4) return
        dragging = true
        this.dragged = true
        this.board.classList.add('dragging')
        this.board.setPointerCapture(event.pointerId)
      }
      this.view.x = start.vx + (moved.clientX - start.x)
      this.view.y = start.vy + (moved.clientY - start.y)
      this.apply()
    }

    const drop = () => {
      this.board.classList.remove('dragging')
      this.board.removeEventListener('pointermove', move)
      this.board.removeEventListener('pointerup', drop)
      this.board.removeEventListener('pointercancel', drop)
      setTimeout(() => { this.dragged = false })
    }

    this.board.addEventListener('pointermove', move)
    this.board.addEventListener('pointerup', drop)
    this.board.addEventListener('pointercancel', drop)
  }
}

customElements.define('mind-map', MindMap)

export default MindMap
