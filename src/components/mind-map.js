/**
 * The lesson seen whole.
 *
 * Some lessons are long enough that a reader scrolling through them never
 * holds the shape of the thing: Classes has twenty sections across four
 * levels, and the parts depend on one another in ways the order of the page
 * cannot show. super() has to run before `this` exists, which is a fact
 * about the initialisation order three sections earlier; losing the context
 * of a method is the same subject as get & set. A page is a line. This is
 * the picture.
 *
 * Nothing here is written per lesson. The tree is the lesson's own headings:
 * the page keeps them in pageContentList as it parses, each with the anchor
 * the build stamped on it - the same anchor in all three languages, so a
 * node knows where to jump and the labels are already translated. Add a
 * heading to a lesson and the map grows a node; nothing to keep in step.
 *
 * What the headings cannot say is which section leans on which. That is the
 * one thing written by hand, per lesson, in public/maps/<page>.json:
 *
 *   { "links": [ { "from": "super", "to": "Initialisation_process",
 *                  "note": "до super() нет this" } ] }
 *
 * No file, no cross-links, and the map is still a map. 404 is the normal
 * answer for most lessons and is not an error.
 */
const { createElem } = require('../helpers').default
const { lang } = require('../configs').default

/**
 * A note on a dependency arrow is the only text here that the lesson does
 * not already carry, so it is the only text that has to be translated by
 * hand. Either a string, used as it stands, or the three languages:
 *
 *   "note": { "ru": "…", "ua": "…", "eng": "…" }
 */
const speak = note => {
  if (!note) return ''
  if (typeof note === 'string') return note
  return note[lang()] || note.eng || ''
}

/** Eight hues for eight branches, then round again. Each is dark enough for
 *  white text on it at 14px, and they stay apart from one another for the
 *  most common sorts of colour blindness. */
const HUES = ['#09b', '#c35', '#2a7', '#85b', '#d72', '#357', '#a84', '#777']

const GAP_X = 48          // between one level and the next
const GAP_Y = 12          // between siblings
const PAD_X = 14          // inside a node
const LINE = 20           // a line of label
const MAX_WIDTH = 220     // before a label wraps

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  :host { font-family: var(--font-family, system-ui, sans-serif); }

  .sheet {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 700;
    background: rgba(10, 20, 30, .55);
  }

  .sheet.shown { display: block; }

  .frame {
    position: absolute;
    inset: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 16px 48px rgba(10, 20, 30, .4);
    overflow: hidden;
  }

  header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #dce4ea;
  }

  h3 { flex: 1; margin: 0; color: #203040; font-size: 16px; font-weight: 600; }

  .tool {
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid #dce4ea;
    border-radius: 8px;
    background: #fff;
    color: #6a7a88;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
  }

  .tool:hover { background: #f2f5f7; color: #203040; }
  .tool.close { font-size: 20px; }

  /* The canvas. Dragging it pans, the wheel zooms, and a touch screen does
     both with the usual two gestures - so the browser must be told not to
     take the gestures for itself first. */
  .board {
    flex: 1;
    overflow: hidden;
    touch-action: none;
    cursor: grab;
    background:
      radial-gradient(circle at 1px 1px, #e4ebf0 1px, transparent 0) 0 0 / 24px 24px;
  }

  .board.dragging { cursor: grabbing; }

  svg { display: block; }

  .node { cursor: pointer; }
  .node rect { transition: filter .15s; }
  .node:hover rect { filter: brightness(1.12); }
  .node text { fill: #fff; font-size: 14px; dominant-baseline: middle; }
  .node.root rect { fill: #203040; }

  .edge { fill: none; stroke: #c4ced6; stroke-width: 2; }

  /* The dependencies, which are the reason for the whole thing: dashed, so
     they are plainly not the tree, and curved away from it so they can be
     followed across the picture. */
  .cross { fill: none; stroke: #f50; stroke-width: 2; stroke-dasharray: 6 5; }

  /* The fold handle: small, quiet, and clearly not part of the box. */
  .handle { cursor: pointer; }
  .handle circle { fill: #fff; stroke: #94a3b8; stroke-width: 1.5; }
  .handle text { fill: #475569; font-size: 13px; font-weight: bold; dominant-baseline: central; }
  .handle:hover circle { stroke: #203040; }
  .handle:hover text { fill: #203040; }

  /* A folded branch has more behind it, and says so without a word. */
  .node.folded rect { stroke: #fff; stroke-width: 2; stroke-dasharray: 4 3; }

  /* The number on a curve, and the same number in the legend below. */
  .mark circle { fill: #f50; }
  .mark text { fill: #fff; font-size: 11px; font-weight: bold; dominant-baseline: central; }

  /* The dependencies in words, numbered to match the marks on their curves.
     Empty for a lesson with no links file, and then it takes no room. */
  footer:not(:empty) {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    max-height: 76px;
    padding: 8px 16px;
    border-top: 1px solid #dce4ea;
    color: #6a7a88;
    font-size: 12px;
    overflow-y: auto;
  }

  .legend { display: flex; gap: 6px; align-items: baseline; }

  .legend b {
    display: inline-block;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    background: #f50;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    line-height: 16px;
    text-align: center;
  }

  @media screen and (max-width: 520px) {
    .frame { inset: 8px; }
    header { padding: 8px 12px; }
    h3 { font-size: 14px; }
  }
`

/** A label is a heading, and headings are sentences. Two lines, then cut. */
function wrap (text, measure) {
  if (measure(text) <= MAX_WIDTH) return [text]

  const words = text.split(/\s+/)
  const lines = ['']
  for (const word of words) {
    const candidate = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + word : word
    if (measure(candidate) <= MAX_WIDTH || !lines[lines.length - 1]) {
      lines[lines.length - 1] = candidate
    } else if (lines.length < 2) {
      lines.push(word)
    } else {
      lines[1] = lines[1] + '…'
      break
    }
  }
  return lines
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
            <button class="tool all" type="button" title="+/−" aria-label="+/−">⊞</button>
            <button class="tool out" type="button" title="−" aria-label="−">−</button>
            <button class="tool in" type="button" title="+" aria-label="+">+</button>
            <button class="tool fit" type="button" title="⤢" aria-label="⤢">⤢</button>
            <button class="tool close" type="button" title="×" aria-label="×">×</button>
          </header>
          <div class="board"></div>
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
      view: { x: 0, y: 0, scale: 1 }
    })

    // Measuring text without drawing it. The font has to be the one the
    // nodes will actually be set in, and it cannot be read in the
    // constructor: the element is not in the document yet, so the computed
    // family is whatever the browser defaults to. Measured against that, the
    // long labels came out narrower than they render and ran off their boxes.
    // Asked on open instead, when there is something to ask.
    this.ruler = document.createElement('canvas').getContext('2d')
    this.measure = text => this.ruler.measureText(text).width
  }

  connectedCallback () {
    this.shadow.querySelector('.close').onclick = () => this.close()
    this.shadow.querySelector('.in').onclick = () => this.zoom(1.25)
    this.shadow.querySelector('.out').onclick = () => this.zoom(0.8)
    this.shadow.querySelector('.fit').onclick = () => this.fit()

    // Everything at once, and back again. Folded is the useful default, but
    // "show me all of it" is a fair thing to want, and finding every handle
    // by hand to get there is not.
    this.shadow.querySelector('.all').onclick = () => {
      if (this.closed.size) {
        this.closed.clear()
      } else {
        const fold = (node, depth) => {
          if (depth >= 1 && node.children.length) this.closed.add(node.id)
          node.children.forEach(child => fold(child, depth + 1))
        }
        fold(this.tree(this.headings), 0)
      }
      this.draw()
      this.fit()
    }
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

  async open () {
    this.sheet.classList.add('shown')
    document.addEventListener('keydown', this.escape)

    this.ruler.font = `14px ${getComputedStyle(this.board).fontFamily || 'system-ui, sans-serif'}`

    const page = document.querySelector('page-element')
    this.headings = (page && page.pageContentList) || []
    this.links = await this.crossLinks()
    this.heading.textContent = this.headings.length ? this.headings[0].text : ''

    /*
     * Folded to the branches, not opened flat.
     *
     * Twenty-five sections drawn at once make a picture that has to be
     * scaled down until the labels cannot be read, which is the opposite of
     * the point: the map is for taking the lesson in, and nobody takes in
     * twenty-five unreadable boxes. Folded, it opens on the handful of
     * things the lesson is about, and a branch unfolds when it is wanted.
     *
     * Worked out afresh on every open, so a map always opens the same way
     * however it was left.
     */
    this.closed = new Set()
    const fold = (node, depth) => {
      if (depth >= 1 && node.children.length) this.closed.add(node.id)
      node.children.forEach(child => fold(child, depth + 1))
    }
    fold(this.tree(this.headings), 0)

    this.draw()
    this.fit()
  }

  /** The same picture, redrawn after a branch opened or closed, without
   *  moving the view out from under the reader. */
  redraw () {
    const view = { ...this.view }
    this.draw()
    this.view = view
    this.apply()
  }

  close () {
    this.sheet.classList.remove('shown')
    document.removeEventListener('keydown', this.escape)
  }

  /** The hand-written half, if this lesson has one. */
  async crossLinks () {
    const page = location.search.slice(1) || 'start-page'
    if (this.loaded === page) return this.links || []
    this.loaded = page

    try {
      const response = await fetch(`maps/${page}.json`, { headers: { Accept: 'application/json' } })
      this.links = response.ok ? (await response.json()).links || [] : []
    } catch {
      this.links = []
    }
    return this.links
  }

  /** Headings are a flat list with a level each; this is the tree they mean. */
  tree (headings) {
    const root = { id: null, text: '', level: 0, children: [] }
    const path = [root]

    for (const heading of headings) {
      const node = { ...heading, children: [] }
      while (path.length > 1 && path[path.length - 1].level >= node.level) path.pop()
      path[path.length - 1].children.push(node)
      path.push(node)
    }

    // A lesson whose first heading is its title: that title is the root, and
    // everything else hangs off it. Anything else gets the invisible root.
    return root.children.length === 1 ? root.children[0] : root
  }

  draw () {
    const links = this.links || []
    const root = this.tree(this.headings)
    const places = new Map()

    // A folded branch keeps its children - they are what unfolds - but
    // nothing below it is measured, placed or drawn.
    const prune = node => {
      node.folded = this.closed.has(node.id) && node.children.length > 0
      node.shown = node.folded ? [] : node.children
      node.shown.forEach(prune)
    }
    prune(root)

    // Width by level, so the columns line up and the edges stay short.
    const widths = []
    const walk = (node, depth) => {
      node.depth = depth
      node.lines = wrap(node.text || '…', this.measure)
      node.w = Math.min(MAX_WIDTH, Math.max(...node.lines.map(this.measure))) + PAD_X * 2
      node.h = node.lines.length * LINE + 16
      widths[depth] = Math.max(widths[depth] || 0, node.w)
      node.shown.forEach(child => walk(child, depth + 1))
    }
    walk(root, 0)

    /*
     * Radial, not a tree lying on its side.
     *
     * The subject in the middle and the branches going out from it is the
     * shape this is supposed to show: everything at the same distance from
     * the centre is the same kind of thing, and the eye takes the whole in
     * at once instead of reading it left to right like the page it is
     * supposed to replace.
     *
     * Angles first. Every leaf is given a share of the circle in proportion
     * to how WIDE its box is - what a box takes up along a ring is its
     * width, not its height, which is the thing a tree laid on its side
     * gets the other way round. Weighed by height, nine branches of one
     * word each were given nine equal slivers and their labels sat on top of
     * one another. A branch takes the sum of its leaves and sits in the
     * middle of its own span.
     *
     * Then the rings. Each is far enough out to clear the widest box of the
     * ring before it - and then every ring is checked for whether the boxes
     * standing on it actually fit round it. If any does not, all the radii
     * grow together until it does, which keeps the picture round instead of
     * letting one crowded ring bulge.
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

    // Does each box fit the slice of the circle it was given?
    //
    // Its slice is a share of the whole turn, and how much room that is
    // depends on how far out it sits: the same angle is a hand's width near
    // the middle and an arm's length at the rim. So ask it of every node -
    // the slice it has, times the radius of its ring, against its own width
    // - and stretch every radius by the worst answer. Checking the rings
    // instead, as a total, let a wide box with few children be squeezed
    // between two narrow ones on a ring that was roomy on average.
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

    // Starting at the top and going clockwise, because that is how a clock
    // goes and nobody has to be told.
    const spread = (node, depth, from) => {
      const span = (node.weight / root.weight) * Math.PI * 2
      node.angle = from + span / 2
      node.radius = rings[depth]

      let cursor = from
      for (const child of node.shown) {
        spread(child, depth + 1, cursor)
        cursor += (child.weight / root.weight) * Math.PI * 2
      }
      if (node.id) places.set(node.id, node)
    }
    spread(root, 0, -Math.PI / 2)

    const all = []
    const collect = node => { all.push(node); node.shown.forEach(collect) }
    collect(root)

    for (const node of all) {
      node.cx = Math.cos(node.angle) * node.radius
      node.cy = Math.sin(node.angle) * node.radius
      node.x = node.cx - node.w / 2
      node.y = node.cy - node.h / 2
    }

    // Everything so far is measured from the centre, so half of it is in
    // negative space. Shift it all into the picture.
    const left = Math.min(...all.map(n => n.x)) - 48
    const top = Math.min(...all.map(n => n.y)) - 48
    for (const node of all) {
      node.x -= left
      node.y -= top
      node.cx -= left
      node.cy -= top
    }
    const middle = { x: -left, y: -top }

    const width = Math.max(...all.map(n => n.x + n.w)) + 48
    const height = Math.max(...all.map(n => n.y + n.h)) + 48

    const colour = node => {
      let walker = node
      while (walker.parent && walker.parent.parent) walker = walker.parent
      return HUES[(walker.index || 0) % HUES.length]
    }
    root.shown.forEach((child, index) => {
      child.index = index
      const mark = (node, top) => { node.parent = top; node.shown.forEach(c => { c.index = index; mark(c, top) }) }
      mark(child, root)
    })

    // A branch leaves its parent and curves round to the child, bending with
    // the ring it crosses rather than cutting straight across it.
    const edges = all.filter(n => n.shown.length).map(node => node.shown.map(child => {
      const r = (node.radius + child.radius) / 2
      const a = (node.angle + child.angle) / 2
      const bend = {
        x: middle.x + Math.cos(a) * r,
        y: middle.y + Math.sin(a) * r
      }
      return `<path class="edge" d="M${node.cx} ${node.cy} Q${bend.x} ${bend.y} ${child.cx} ${child.cy}"/>`
    }).join('')).join('')

    // A dependency leaves the top or the bottom of its box, bows out to the
    // right of everything, and comes back.
    //
    // The note is not written along it. It was, and it was unreadable: these
    // curves run nearly vertical where the middle of the text would sit, so
    // the words stood on end and half of them upside down. Before that they
    // were parked at a computed point, and three notes converging on one
    // section landed in the same patch of white and read as one sentence of
    // nonsense. So the curve carries a number and the words go underneath,
    // where there is room for them and they are the right way up.
    const legend = []
    const crosses = links.map((link, index) => {
      const from = places.get(link.from)
      const to = places.get(link.to)
      if (!from || !to) return ''

      // Outward, away from the centre. A chord drawn straight across the
      // circle would run over the middle of the map, which is the one part
      // that has to stay legible; bowed outwards it keeps to the margin and
      // its number lands in clear air. Each bows a little wider than the
      // last so the marks keep out of each other's way.
      const mid = { x: (from.cx + to.cx) / 2, y: (from.cy + to.cy) / 2 }
      const away = { x: mid.x - middle.x, y: mid.y - middle.y }
      const reach = Math.hypot(away.x, away.y) || 1
      const bow = 80 + index * 18
      const control = {
        x: mid.x + (away.x / reach) * bow,
        y: mid.y + (away.y / reach) * bow
      }

      // Not from the middle of a box to the middle of a box: the arrowhead
      // would be buried under the one it points at. Both ends step out to
      // the edge of their box, along the line towards the handle.
      const start = edgeOf(from, control)
      const end = edgeOf(to, control)
      const x1 = start.x
      const y1 = start.y
      const x2 = end.x
      const y2 = end.y

      // The far point of a quadratic is its middle: a quarter of each end
      // plus half the handle.
      const apex = { x: (x1 + x2) / 4 + control.x / 2, y: (y1 + y2) / 4 + control.y / 2 }
      const number = index + 1

      legend.push({ number, text: speak(link.note), from, to })

      return `
        <path class="cross" d="M${x1} ${y1} Q${control.x} ${control.y} ${x2} ${y2}" marker-end="url(#arrow)"/>
        <g class="mark">
          <circle cx="${apex.x}" cy="${apex.y}" r="10"/>
          <text x="${apex.x}" y="${apex.y}" text-anchor="middle">${number}</text>
        </g>
      `
    }).join('')

    // The handle that folds a branch, on the far side of the box from the
    // centre - the side the branch would grow into. Its own little target,
    // because the box itself is a link to the section and a reader should
    // not have to choose between opening a branch and going to read it.
    const handle = node => {
      if (!node.children.length || node === root) return ''
      const out = { x: Math.cos(node.angle), y: Math.sin(node.angle) }
      const hx = node.cx + out.x * (node.w / 2 + 11)
      const hy = node.cy + out.y * (node.h / 2 + 11)
      return `
        <g class="handle" data-fold="${node.id || ''}">
          <circle cx="${hx}" cy="${hy}" r="9"/>
          <text x="${hx}" y="${hy}" text-anchor="middle">${node.folded ? '+' : '−'}</text>
        </g>
      `
    }

    const nodes = all.filter(node => node.text).map(node => `
      <g class="node ${node === root ? 'root' : ''} ${node.folded ? 'folded' : ''}" data-id="${node.id || ''}">
        <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="8"
              fill="${node === root ? '#203040' : colour(node)}"/>
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
            <path d="M0 0 L10 5 L0 10 z" fill="#f50"/>
          </marker>
        </defs>
        ${edges}${crosses}${nodes}
      </svg>
    `

    this.svg = this.board.querySelector('svg')
    this.size = { width, height }

    this.svg.onclick = event => {
      const fold = event.target.closest('.handle')
      if (fold) {
        const id = fold.dataset.fold
        this.closed.has(id) ? this.closed.delete(id) : this.closed.add(id)
        this.redraw()
        return
      }

      const group = event.target.closest('.node')
      if (!group || !group.dataset.id) return
      this.close()
      const target = document.getElementById(group.dataset.id)
      if (!target) return
      history.replaceState(null, '', `${location.pathname}${location.search}#${group.dataset.id}`)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    this.note.innerHTML = legend.length
      ? legend.map(item => `
          <span class="legend">
            <b>${item.number}</b>${escapeText(item.text || `${item.from.text} → ${item.to.text}`)}
          </span>
        `).join('')
      : ''
  }

  apply () {
    const { x, y, scale } = this.view
    this.svg.style.transformOrigin = '0 0'
    this.svg.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  zoom (by) {
    this.view.scale = Math.min(2.5, Math.max(0.2, this.view.scale * by))
    this.apply()
  }

  /** The whole picture in the window, centred, never magnified past life size. */
  fit () {
    if (!this.svg) return
    const box = this.board.getBoundingClientRect()
    const scale = Math.min(1, (box.width - 32) / this.size.width, (box.height - 32) / this.size.height)
    this.view = {
      scale,
      x: (box.width - this.size.width * scale) / 2,
      y: (box.height - this.size.height * scale) / 2
    }
    this.apply()
  }

  grab (event) {
    const start = { x: event.clientX, y: event.clientY, vx: this.view.x, vy: this.view.y }
    this.board.classList.add('dragging')
    this.board.setPointerCapture(event.pointerId)

    const move = moved => {
      this.view.x = start.vx + (moved.clientX - start.x)
      this.view.y = start.vy + (moved.clientY - start.y)
      this.apply()
    }
    const drop = () => {
      this.board.classList.remove('dragging')
      this.board.removeEventListener('pointermove', move)
      this.board.removeEventListener('pointerup', drop)
      this.board.removeEventListener('pointercancel', drop)
    }

    this.board.addEventListener('pointermove', move)
    this.board.addEventListener('pointerup', drop)
    this.board.addEventListener('pointercancel', drop)
  }
}

/**
 * Where a line from the middle of a box towards some point leaves the box.
 *
 * The arrowhead has to land on the edge of the node it points at, not under
 * it. Which side it leaves by is whichever the line reaches first, and that
 * is the smaller of the two ratios - half the width over the horizontal
 * distance, half the height over the vertical.
 */
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

customElements.define('mind-map', MindMap)

export default MindMap
