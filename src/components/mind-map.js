/**
 * The lesson's subject, laid out as a picture.
 *
 * Not the table of contents in another shape. The contents say in what order
 * the lesson is written; this says what the subject is made of, and those are
 * different questions with different answers. Tests and the quest belong to
 * the first and have no place here; "Class Declaration" and "Class
 * Expression" are one group here and are pages apart in the lesson.
 *
 * So the map is written, not derived: public/maps/<page>.json, three levels
 * deep and the same three everywhere - branch, group, item. An item carries
 * a sentence about itself and a few lines of code, which a click brings up,
 * and the anchor of the section where the lesson explains it, which turns
 * into a way in. A lesson with no such file has no map and does not offer
 * one; 404 is the normal answer for most of them.
 *
 * What the structure cannot say is which item leans on which. Those are the
 * dashed arrows: a pair of ids and a note, drawn round the outside and
 * numbered, with the words in the legend below - a note written along a
 * curve stands on end where the curve runs vertical.
 *
 * Folded to the branches to begin with. Two dozen boxes at once have to be
 * scaled down until nothing can be read, which is the opposite of the point.
 */
const { createElem } = require('../helpers').default
const { lang } = require('../configs').default

/** A field is either one string for everyone, or the three languages. */
const speak = value => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang()] || value.eng || ''
}

const GAP_X = 44          // between one ring and the next
const PAD_X = 14          // inside a node
const LINE = 19           // a line of label
const MAX_WIDTH = 200     // before a label wraps

const INK = '#1E293B'
const MUTED = '#64748B'
const LINE_COLOUR = '#CBD5E1'

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

  /* Dragging pans, the wheel zooms; a touch screen does both with the usual
     gestures, so the browser has to be told not to take them first. */
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
  .node:hover rect { filter: brightness(.97); }
  .node text { font-size: 13px; dominant-baseline: middle; }

  .node.root rect { fill: ${INK}; }
  .node.root text { fill: #fff; font-size: 15px; font-weight: 700; }
  .node.branch text { fill: #fff; font-weight: 700; font-size: 14px; }
  .node.group text { fill: ${INK}; font-weight: 600; }
  .node.item text { fill: #334155; }

  .edge { fill: none; stroke-linecap: round; }

  /* The fold handle: small, quiet, and clearly not part of the box. */
  .handle { cursor: pointer; }
  .handle circle { fill: #fff; stroke: #94A3B8; stroke-width: 1.5; }
  .handle text { fill: #475569; font-size: 13px; font-weight: bold; dominant-baseline: central; }
  .handle:hover circle { stroke: ${INK}; }

  /* The dependencies, which are the reason for the whole thing. */
  .cross { fill: none; stroke: #F97316; stroke-width: 2; stroke-dasharray: 6 5; }
  .mark circle { fill: #F97316; }
  .mark text { fill: #fff; font-size: 11px; font-weight: bold; dominant-baseline: central; }

  footer:not(:empty) {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    max-height: 76px;
    padding: 8px 16px;
    border-top: 1px solid #E2E8F0;
    background: #fff;
    color: ${MUTED};
    font-size: 12px;
    overflow-y: auto;
  }

  .legend { display: flex; gap: 6px; align-items: baseline; }

  .legend b {
    display: inline-block;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    background: #F97316;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    line-height: 16px;
    text-align: center;
  }

  /* What a click on an item brings up: the sentence and the few lines of
     code, where the eye already is rather than at the other end of a scroll. */
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

/** A label is a phrase, not a word. Two lines, then cut. */
function wrap (text, measure) {
  if (measure(text) <= MAX_WIDTH) return [text]

  const words = String(text).split(/\s+/)
  const lines = ['']
  for (const word of words) {
    const candidate = lines[lines.length - 1] ? `${lines[lines.length - 1]} ${word}` : word
    if (measure(candidate) <= MAX_WIDTH || !lines[lines.length - 1]) {
      lines[lines.length - 1] = candidate
    } else if (lines.length < 2) {
      lines.push(word)
    } else {
      lines[1] += '…'
      break
    }
  }
  return lines
}

/** Where a line from the middle of a box towards a point leaves the box. */
function edgeOf (node, towards) {
  const dx = towards.x - node.cx
  const dy = towards.y - node.cy
  if (!dx && !dy) return { x: node.cx, y: node.cy }

  const scale = Math.min(
    Math.abs(dx) > 0.001 ? (node.w / 2) / Math.abs(dx) : Infinity,
    Math.abs(dy) > 0.001 ? (node.h / 2) / Math.abs(dy) : Infinity
  )
  return { x: node.cx + dx * scale, y: node.cy + dy * scale }
}

const escapeText = text => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

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
            <button class="tool all" type="button" title="+/−" aria-label="+/−">⊞</button>
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

          <footer></footer>
        </div>
      </div>
    `

    const find = selector => this.shadow.querySelector(selector)
    Object.assign(this, {
      sheet: find('.sheet'),
      heading: find('h3'),
      board: find('.board'),
      note: find('footer'),
      card: find('.card'),
      cardTitle: find('.card h4'),
      cardDesc: find('.card p'),
      cardCode: find('.card pre'),
      cardGo: find('.card .go'),
      view: { x: 0, y: 0, scale: 1 },
      closed: new Set()
    })

    // Measuring text without drawing it. The font cannot be read in the
    // constructor - the element is not in the document yet - so it is asked
    // for on open, when there is something to ask.
    this.ruler = document.createElement('canvas').getContext('2d')
    this.measure = text => this.ruler.measureText(String(text)).width
  }

  connectedCallback () {
    this.shadow.querySelector('.close').onclick = () => this.close()
    this.shadow.querySelector('.shut').onclick = () => this.card.classList.remove('shown')
    this.shadow.querySelector('.in').onclick = () => this.zoom(1.25)
    this.shadow.querySelector('.out').onclick = () => this.zoom(0.8)
    this.shadow.querySelector('.fit').onclick = () => this.fit()
    this.shadow.querySelector('.all').onclick = () => this.foldAll()
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

  /** The page this map is for. */
  static page () {
    return location.search.slice(1) || 'start-page'
  }

  /**
   * The map file, fetched once per lesson and kept.
   *
   * Also the answer to whether this lesson has a map at all: the contents
   * panel asks before offering the way in, because a line that opens an
   * apology is worse than no line.
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

  /**
   * The file's three levels turned into nodes.
   *
   * An id is what an arrow points at: the one written down if there is one,
   * otherwise the anchor. Several items can share an anchor - three rules
   * all explained in one section - so an arrow that has to reach one of them
   * in particular asks for an id of its own.
   */
  tree (map) {
    const node = (source, kind, colour) => ({
      kind,
      colour,
      id: source.id || source.anchor || '',
      title: speak(source.title),
      anchor: source.anchor || '',
      desc: speak(source.desc),
      code: source.code || '',
      children: []
    })

    const root = {
      kind: 'root',
      colour: INK,
      id: '',
      title: speak(map.center) || '',
      anchor: '',
      desc: '',
      code: '',
      children: []
    }

    for (const branch of map.branches || []) {
      const one = node(branch, 'branch', branch.colour || '#0284C7')
      root.children.push(one)

      for (const group of branch.groups || []) {
        const two = node(group, 'group', one.colour)
        one.children.push(two)

        for (const item of group.items || []) {
          two.children.push(node(item, 'item', one.colour))
        }
      }
    }

    return root
  }

  async open () {
    this.sheet.classList.add('shown')
    this.card.classList.remove('shown')
    document.addEventListener('keydown', this.escape)

    this.ruler.font = `13px ${getComputedStyle(this.board).fontFamily || 'system-ui, sans-serif'}`

    const map = await this.data()
    if (!map) {
      this.heading.textContent = ''
      this.board.innerHTML = ''
      this.note.textContent = ''
      return
    }

    this.root = this.tree(map)
    this.links = map.links || []
    this.heading.textContent = this.root.title

    // Folded to the branches, worked out afresh every time, so the map always
    // opens the same way however it was left.
    this.closed = new Set()
    this.fold(this.root, 0)

    this.draw()
    this.fit()
  }

  fold (node, depth) {
    if (depth >= 1 && node.children.length) this.closed.add(node.id || node.title)
    node.children.forEach(child => this.fold(child, depth + 1))
  }

  foldAll () {
    if (this.closed.size) {
      this.closed.clear()
    } else {
      this.closed = new Set()
      this.fold(this.root, 0)
    }
    this.draw()
    this.fit()
  }

  close () {
    this.sheet.classList.remove('shown')
    this.card.classList.remove('shown')
    document.removeEventListener('keydown', this.escape)
  }

  /** Redrawn after a branch opened, without moving the view. */
  redraw () {
    const view = { ...this.view }
    this.draw()
    this.view = view
    this.apply()
  }

  draw () {
    const root = this.root
    const links = this.links || []
    const places = new Map()
    const key = node => node.id || node.title

    // A folded branch keeps its children - they are what unfolds - but
    // nothing below it is measured, placed or drawn.
    const prune = node => {
      node.folded = this.closed.has(key(node)) && node.children.length > 0
      node.shown = node.folded ? [] : node.children
      node.shown.forEach(prune)
    }
    prune(root)

    const widths = []
    const walk = (node, depth) => {
      node.depth = depth
      node.lines = wrap(node.title || '…', this.measure)
      node.w = Math.min(MAX_WIDTH, Math.max(...node.lines.map(this.measure))) + PAD_X * 2
      node.h = node.lines.length * LINE + 18
      widths[depth] = Math.max(widths[depth] || 0, node.w)
      node.shown.forEach(child => walk(child, depth + 1))
    }
    walk(root, 0)

    /*
     * Radial: the subject in the middle, what it is made of going outwards.
     *
     * Every leaf gets a share of the circle in proportion to how WIDE its
     * box is, because width is what a box takes up along a ring; weighed by
     * height, branches of one word each were given equal slivers and sat on
     * top of one another. A branch takes the sum of its leaves and sits in
     * the middle of its own span.
     */
    const weigh = node => {
      node.weight = node.shown.length
        ? node.shown.reduce((total, child) => total + weigh(child), 0)
        : node.w + GAP_X
      return node.weight
    }
    weigh(root)

    const rings = [0]
    widths.forEach((w, depth) => {
      if (!depth) return
      rings[depth] = rings[depth - 1] + widths[depth - 1] / 2 + w / 2 + GAP_X
    })

    // Does every box fit the slice it was given? The same angle is a hand's
    // width near the middle and an arm's length at the rim, so it is asked of
    // each node and every radius grows by the worst answer.
    const everyone = []
    const gather = node => { everyone.push(node); node.shown.forEach(gather) }
    gather(root)

    let stretch = 1
    for (const node of everyone) {
      if (!node.depth || !rings[node.depth]) continue
      const slice = (node.weight / root.weight) * 2 * Math.PI
      stretch = Math.max(stretch, ((node.w + GAP_X / 2) / slice) / rings[node.depth])
    }
    if (stretch > 1) for (let depth = 1; depth < rings.length; depth++) rings[depth] *= stretch

    const spread = (node, depth, from) => {
      const span = (node.weight / root.weight) * Math.PI * 2
      node.angle = from + span / 2
      node.radius = rings[depth]

      let cursor = from
      for (const child of node.shown) {
        spread(child, depth + 1, cursor)
        cursor += (child.weight / root.weight) * Math.PI * 2
      }
      if (key(node)) places.set(key(node), node)
    }
    spread(root, 0, -Math.PI / 2)

    const all = everyone
    for (const node of all) {
      node.cx = Math.cos(node.angle) * node.radius
      node.cy = Math.sin(node.angle) * node.radius
      node.x = node.cx - node.w / 2
      node.y = node.cy - node.h / 2
    }

    const left = Math.min(...all.map(n => n.x)) - 56
    const top = Math.min(...all.map(n => n.y)) - 56
    for (const node of all) {
      node.x -= left
      node.y -= top
      node.cx -= left
      node.cy -= top
    }
    const middle = { x: -left, y: -top }

    const width = Math.max(...all.map(n => n.x + n.w)) + 56
    const height = Math.max(...all.map(n => n.y + n.h)) + 56

    const edges = all.filter(n => n.shown.length).map(node => node.shown.map(child => {
      const r = (node.radius + child.radius) / 2
      const a = (node.angle + child.angle) / 2
      const bend = { x: middle.x + Math.cos(a) * r, y: middle.y + Math.sin(a) * r }
      const thick = child.kind === 'branch' ? 3 : child.kind === 'group' ? 2 : 1.5
      return `<path class="edge" stroke="${child.kind === 'item' ? LINE_COLOUR : child.colour}"
                    stroke-width="${thick}"
                    d="M${node.cx} ${node.cy} Q${bend.x} ${bend.y} ${child.cx} ${child.cy}"/>`
    }).join('')).join('')

    const legend = []
    const crosses = links.map((link, index) => {
      const from = places.get(link.from)
      const to = places.get(link.to)
      if (!from || !to) return ''

      const mid = { x: (from.cx + to.cx) / 2, y: (from.cy + to.cy) / 2 }
      const away = { x: mid.x - middle.x, y: mid.y - middle.y }
      const reach = Math.hypot(away.x, away.y) || 1
      const bow = 80 + index * 18
      const control = {
        x: mid.x + (away.x / reach) * bow,
        y: mid.y + (away.y / reach) * bow
      }

      const start = edgeOf(from, control)
      const end = edgeOf(to, control)
      const apex = {
        x: (start.x + end.x) / 4 + control.x / 2,
        y: (start.y + end.y) / 4 + control.y / 2
      }
      const number = index + 1
      legend.push({ number, text: speak(link.note) || `${from.title} → ${to.title}` })

      return `
        <path class="cross" d="M${start.x} ${start.y} Q${control.x} ${control.y} ${end.x} ${end.y}"
              marker-end="url(#arrow)"/>
        <g class="mark">
          <circle cx="${apex.x}" cy="${apex.y}" r="10"/>
          <text x="${apex.x}" y="${apex.y}" text-anchor="middle">${number}</text>
        </g>
      `
    }).join('')

    const handle = node => {
      if (!node.children.length || node === root) return ''
      const hx = node.cx + Math.cos(node.angle) * (node.w / 2 + 11)
      const hy = node.cy + Math.sin(node.angle) * (node.h / 2 + 11)
      return `
        <g class="handle" data-fold="${escapeText(key(node))}">
          <circle cx="${hx}" cy="${hy}" r="9"/>
          <text x="${hx}" y="${hy}" text-anchor="middle">${node.folded ? '+' : '−'}</text>
        </g>
      `
    }

    // Filled for a branch, tinted for a group, white for an item: three
    // levels you can tell apart without reading them.
    const paint = node => {
      if (node.kind === 'root') return 'fill="' + INK + '"'
      if (node.kind === 'branch') return `fill="${node.colour}"`
      if (node.kind === 'group') return `fill="${node.colour}" fill-opacity="0.12" stroke="${node.colour}" stroke-width="2"`
      return `fill="#fff" stroke="${node.colour}" stroke-opacity="0.5" stroke-width="1.5"`
    }

    const nodes = all.map(node => `
      <g class="node ${node.kind} ${node.folded ? 'folded' : ''}" data-key="${escapeText(key(node))}">
        <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="${node.h / 2}" ${paint(node)}/>
        ${node.lines.map((line, index) => `
          <text x="${node.cx}" y="${node.cy + (index - (node.lines.length - 1) / 2) * LINE}" text-anchor="middle">${escapeText(line)}</text>
        `).join('')}
      </g>
      ${handle(node)}
    `).join('')

    this.board.innerHTML = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#F97316"/>
          </marker>
        </defs>
        ${edges}${crosses}${nodes}
      </svg>
    `

    this.svg = this.board.querySelector('svg')
    this.size = { width, height }
    this.places = places

    this.svg.onclick = event => {
      if (this.dragged) return

      const fold = event.target.closest('.handle')
      if (fold) {
        const id = fold.dataset.fold
        this.closed.has(id) ? this.closed.delete(id) : this.closed.add(id)
        this.redraw()
        return
      }

      const group = event.target.closest('.node')
      if (!group) return
      const node = places.get(group.dataset.key)
      if (node) this.tell(node)
    }

    this.note.innerHTML = legend.length
      ? legend.map(item => `<span class="legend"><b>${item.number}</b>${escapeText(item.text)}</span>`).join('')
      : ''
  }

  /**
   * What a click on a node says.
   *
   * An item has a sentence and a few lines of code; a branch or a group
   * usually has neither, and for them the click is only a way into the
   * lesson. Nothing at all to say and no section to go to - the card would
   * be an empty box, so it does not open.
   */
  tell (node) {
    if (!node.desc && !node.code && !node.anchor) return

    this.cardTitle.textContent = node.title
    this.cardDesc.textContent = node.desc
    this.cardDesc.style.display = node.desc ? 'block' : 'none'
    this.cardCode.textContent = node.code
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

  /**
   * The whole picture in the window, centred.
   *
   * Allowed to grow, not only to shrink: folded, the map is four branches
   * round a middle, and held to life size it sat in the corner of a wide
   * window like a postage stamp. Half again is as far as it goes - beyond
   * that the boxes look like buttons.
   */
  fit () {
    if (!this.svg) return
    const box = this.board.getBoundingClientRect()
    const scale = Math.min(1.5, (box.width - 64) / this.size.width, (box.height - 64) / this.size.height)
    this.view = {
      scale,
      x: (box.width - this.size.width * scale) / 2,
      y: (box.height - this.size.height * scale) / 2
    }
    this.apply()
  }

  /**
   * Dragging the picture about - and letting a press that is not a drag
   * reach the node under it.
   *
   * The capture is taken only once the pointer has actually moved. Taken on
   * the press, as it was, it makes the board the target of everything that
   * follows: the click then arrives at the board instead of the box that was
   * pressed, and nothing on the map answered a click at all. The buttons in
   * the header went on working, which is what made it look like the map was
   * fine and the nodes were not.
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
      // The click comes after the release; a drag that ended on a node
      // should not also open it.
      setTimeout(() => { this.dragged = false })
    }

    this.board.addEventListener('pointermove', move)
    this.board.addEventListener('pointerup', drop)
    this.board.addEventListener('pointercancel', drop)
  }
}

customElements.define('mind-map', MindMap)

export default MindMap
