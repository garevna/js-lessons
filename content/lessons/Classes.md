# ![ico-30 study] {{p1}}

**ES6 (ECMAScript 2015)**

{{p2}}

{{p3}}

{{p4}}

{{p5}}

____________________________________________________________________

## ![ico-25 icon] {{p6}}

{{p7}}
{{p8}}

{{p9}}

~~~js
class User {
  ...
}
~~~

{{p10}}

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

{{p11}}

~~~js
class User {
  constructor (name) {
    this.name = name
  }

  getUserInfo () {
    console.log(this.name)
  }
}
~~~

{{p12}}
{{p13}}
{{p14}}
{{p15}}

{{p16}}
{{p17}}

____________________________________

♦♦♦1♦♦♦

~~~js
class User {
  constructor (name) {
    const privateVar = prompt('Set privateVar value:')

    function showPrivate () {
      console.log(`Ай-яй-яй, у меня контекст вызова ${this}`)
      console.log(`Зато я вижу приватную переменную: ${privateVar}`)
    }
    this.name = name || 'Бегемот'
    this.show = function () {
      showPrivate ()
    }
  }
}

const user = new User('Крокодил')
user.show()
~~~

◘◘**Result**◘◘

~~~console

Ай-яй-яй, у меня контекст вызова undefined
Зато я вижу приватную переменную: 789
~~~

{{p18}}
{{p19}}

~~~js

function User (name) {
  const privateVar = prompt('Set privateVar value:')
  function showPrivate () {
    console.log(`Ай-яй-яй, у меня контекст вызова ${this}`)
    console.log(`Зато я вижу приватную переменную: ${privateVar}`)
  }
  this.name = name || 'Бегемот'
  this.show = function () {
    showPrivate ()
  }
}

const user = new User('Крокодил')
user.show()
~~~

◘◘**Result**◘◘

~~~console

Ай-яй-яй, у меня контекст вызова [object Window]
Зато я вижу приватную переменную: 789
~~~

{{p20}}

••constructor: class User    /    constructor: ƒ User(name)••

_______________________________________________

## ![ico-25 icon] class declaration


![ico-20 error] **hoisting**

{{p21}}

{{p22}}

♦♦♦2♦♦♦

~~~js
class Picture {
  constructor (url, width) {
    this.elem = document.createElement('img')
    this.elem.src = url
    this.width = width
  }
}

typeof Picture  // "function"
~~~

{{p23}}
{{p24}}

{{p25}}
{{p26}}

~~~js
const x = new Picture('http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg', 200)
document.body.appendChild(x.elem)
~~~

__________________________________________________

## ![ico-25 icon] class expression

{{p27}}

### ![ico-20 icon] {{p28}}

♦♦♦3♦♦♦

~~~js
const Picture = class {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

◘◘**{{common.c2}}**◘◘

~~~console

▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{p29}}

~~~js
let sample = new Picture

console.log(sample)
~~~

◘◘**{{common.c2}}**◘◘

~~~console

▼ Picture {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class
      ► __proto__: Object
~~~

_____________________________________________________________

♦♦♦4♦♦♦

~~~js
const Picture = class Canvas {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

◘◘**{{common.c2}}**◘◘

~~~console

▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{p30}}

~~~js
const sample = new Picture

console.log(sample)
~~~

◘◘**{{common.c2}}**◘◘

~~~console

▼ Canvas {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class Canvas
      ► __proto__: Object
~~~

~~~js
sample instanceof Picture   // true
~~~

~~~js
sample instanceof Canvas
~~~

••![ico-20 error] Uncaught ReferenceError: Canvas is not defined••

{{p31}}

{{p32}}

~~~js
sample.constructor.name
~~~

________________________________________________________________

♦♦♦5♦♦♦

~~~js
const Sample = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
    this.canvas.style.border = '1px solid #000000'
    this.area = this.canvas.getContext('2d')
  }

  resizeCanvas (event) {
    this.canvas.width = window.innerWidth - 30
    this.canvas.height = window.innerHeight - 20
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const pict = new Sample ()
window.onresize = pict.resizeCanvas.bind(pict)

pict.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
pict.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

{{p33}}

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________


## ![ico-25 icon] get & set

{{p34}}

{{p35}}

{{p36}}

{{p37}}

{{p38}}

{{p39}}

{{p40}}

♦♦♦6♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

{{p41}}

{{p42}}

~~~js
set history (newHistory) {
  if (!this.canvas.history) this.canvas.history = []
  if (!Array.isArray(newHistory)) {
    console.error('History must be array')
    return
  }
  const __history = newHistory
    .filter(x => x.points && Array.isArray(x.points))
    if (!__history.length) {
      console.error('History must contain points array')
      return
    }

    this.canvas.history = __history
}
~~~

{{p43}}
{{p44}}

{{p45}}

~~~js
get history () {
  return this.canvas.history
}
~~~

{{p46}}

{{p47}}

~~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }

  get history () {
    return this.canvas.history
  }

  set history (newHistory) {
    if (!this.canvas.history) this.canvas.history = []
    if (!Array.isArray(newHistory)) {
      console.error('History must be array')
      return
    }
    const __history = newHistory
      .filter(x => x.path && Array.isArray(x.path))
    if (!__history.length) {
      console.error('History must contain path array')
      return
    }
    this.canvas.history = __history
  }
}

let pict = new Canvas()
~~~~

{{p48}}

~~~js
pict.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  "***",
  { val: "***" }
]
~~~

◘◘pict◘◘

~~~console

▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
  ► canvas: canvas
  ▼ history: Array(2)
    ► 0: {path: Array(2), lineColor: "red"}
    ► 1: {path: Array(2), lineColor: "green"}
      length: 2
    ► __proto__: Array(0)
  ► __proto__: Object
~~~

{{p49}}
{{p50}}
{{p51}}

{{p52}}

~~~js
pict.history = ['***']
~~~

{{p53}}

••![ico-20 error] History must contain path array••

~~~js
pict.history = true
~~~

{{p54}}

••![ico-20 error] History must be array••

{{p55}}
{{p56}}

________________________________________________________

## ![ico-25 icon] {{p57}}

{{p58}}

{{p59}}

♦♦♦7♦♦♦

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

{{common.c5}}

••![ico-20 error] Uncaught TypeError: Cannot read property 'area' of undefined••

{{p60}}

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

{{p61}}
{{p62}}
{{p63}}
{{p64}}

______________________________________________________

♦♦♦8♦♦♦

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    function getProp (prop) {
      this[prop.name] = prop.value
    }

    for (const prop of props) {
      getProp(prop)
    }
  }
}
~~~

{{p65}}
{{p66}}
{{p67}}

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

**{{common.c1}}**

••![ico-20 error] Uncaught TypeError: Cannot set property 'age' of undefined••

{{p68}}

{{p69}}

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    props.forEach(prop => prop && prop.name && Object.assign(this, { [prop.name]: prop.value }))
  }
}
~~~

{{p70}}

~~~js
const user = new User('Grig')

user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: hobby, value: ['football', 'fishing'] },
  {},
  54,
  null
])
console.log(user)
~~~

◘◘**{{common.c1}}**◘◘

~~~console

▼ User {name: "Grig", age: 25, hobby: Array(2)}
    age: 25
  ► hobby: (2) ["football", "fishing"]
    name: "Grig"
  ▼ __proto__:
      ► addSomeInfo: addSomeInfo ( props ) { if ( !Array.isArray ( props ) ) return var getProp = prop => {…}
      ► constructor: class User
      ► __proto__: Object
~~~

________________________________________________________

## ![ico-25 icon] {{p71}}

### ![ico-20 icon] extends

{{p72}}
{{p73}}

{{p74}}

♦♦♦9♦♦♦

~~~js
class Provider extends Array {
  constructor () {
    super();
    ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
      .forEach((item, index) => { this[index] = item })
  }

  valueOf () {
    return this.length
  }
}
~~~

{{p75}}

{{p76}}

~~~js
let provider = new Provider
~~~

{{p77}}

◘◘provider◘◘

~~~console

▼ Provider(5) ["Google", "Mozilla", "Opera", "Safari", "IE"]
    0: "Google"
    1: "Mozilla"
    2: "Opera"
    3: "Safari"
    4: "IE"
    length: 5
  ▼ __proto__: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► __proto__: Array(0)
~~~

{{p78}}

~~~js
provider instanceof Provider  // true
provider instanceof Array     // true

provider + 5   // 10
provider * 3   // 15
~~~

______________________________

♦♦♦10♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.height = '400'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawCircle (center, radius) {
    this.area.beginPath()
    this.area.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    this.area.stroke()
  }
}

let newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])
~~~

{{p79}}
{{p80}}
{{p81}}
{{p82}}

________________________________________________________

### ![ico-20 icon] super

{{p83}}

{{p84}}

{{p85}}
{{p86}}
{{p87}}

~~~js
super.drawLine(points, lineColor)
~~~

{{p88}}

♦♦♦11♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.style.border = '1px solid #ddd'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawLine (points, lineColor, lineWidth) {
    this.area.lineWidth = lineWidth || 3
    this.area.strokeStyle = lineColor
    super.drawLine(points)
  }
}
~~~

{{p89}}

~~~js
let newCanvas = new ExtendedCanvas()
~~~

{{p90}}

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

{{p91}}

____________________________________________

### ![ico-20 icon] super ()

{{p92}}

{{p93}}

{{p94}}

♦♦♦12♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  constructor () {
    super ()
    this.history = []
  }
}
~~~

{{p95}}

••![ico-20 error] Uncaught ReferenceError: ••
•• Must call super constructor in derived class before accessing 'this' or returning from derived constructor••

_________________________________________________________

### ![ico-20 icon] {{p96}}

{{p97}}
{{p98}}
{{p99}}

{{p100}}

{{p101}}
{{p102}}

~~~js
Object.setPrototypeOf(person, human)
~~~

{{p103}}

{{p104}}
{{p105}}
{{p106}}

♦♦♦13♦♦♦

~~~js
const human = {
  place () {
    return Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  },
  say (text) {
    this.place.innerHTML = text
  }
}

const person = {
  getPlace () { this.place = super.place () },
  talk (text) {
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.getPlace()
person.talk('привет!')
~~~

__________________________________________________

♦♦♦14♦♦♦

~~~js
const human = {
  place: () =>
    document.getElementById('demo')
      ? document.getElementById('demo')
      : document.body.appendChild(document.createElement('p')).id = 'demo',

    say (text) {
      this.place.innerHTML = text
    }
}

let person = {
  getPlace () {
    this.place = super.place()
  },
  talk (text) {
    this.getPlace()
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)

person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

{{p107}}
{{p108}}
{{p109}}

{{p110}}
{{p111}}
{{p112}}
{{p113}}

{{p114}}
{{p115}}
{{p116}}
{{p117}}

{{p118}}
{{p119}}
{{p120}}
{{p121}}
{{p122}}

______________________________________________________

♦♦♦15♦♦♦

~~~js
const human = {
  place: (() => {
    const elem = document.getElementById('demo')
    return elem || Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  })(),

  say (text) {
    this.place.innerHTML = text
  }
}

let person = {
  talk ( text ) {
    this.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

{{p123}}
{{p124}}
{{p125}}
{{p126}}

{{p127}}
{{p128}}

{{p129}}
{{p130}}
{{p131}}
{{p132}}

{{p133}}
{{p134}}
{{p135}}

{{p136}}
{{p137}}
{{p138}}
{{p139}}
{{p140}}

{{p141}}
{{p142}}
{{p143}}
{{p144}}

~~~js
const person = {
  say (text) {
    console.log(text)
  },
  talk (text) {
    this.__proto__.say(text)
  }
}
~~~

{{p145}}

~~~js
super.say(text)
~~~

{{p146}}

~~~js
this.__proto__.say(text)
~~~

{{p147}}

______________________________________________________________

♦♦♦16♦♦♦

~~~~js
const human = {
  id: '',
  get place () {
    if (this.id) return document.getElementById(this.id)
  },
  set place (newId) {
    this.id = newId
    document.getElementById(this.id) ||
      Object.assign(document.body.appendChild(document.createElement('p')), {
        id: this.id
      })
    },
    get message () {
      return this.place.innerText
    },
    set message (val) {
      this.place.innerText = val
    }
}

const person = {
  talk (text) {
    super.message = text
  },
  get place () {
    return super.place
  },
  set place (newId) {
    super.place = newId
  }
}

Object.setPrototypeOf(person, human)
person.place = 'demo-1'
person.talk('привет!')
person.place = 'demo-2'
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~~

{{p148}}
{{p149}}

________________________________________________________

## ![ico-25 icon] static

{{p150}}

{{p151}}

{{p152}}

♦♦♦17♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas.call(this.canvas)
    this.canvas.style.border = "1px solid #000000"
    this.area = this.canvas.getContext ( "2d" )
  }

  static resizeCanvas (event) {
    this.width = window.innerWidth - 30
    this.height = window.innerHeight - 20
  }

  static drawLine (context, points) {
    context.area.moveTo(points[0].x, points[0].y)
    context.area.lineTo(points[1].x, points[1].y)
    context.area.stroke()
  }
}

let pict = new Canvas()
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
Canvas.drawLine(pict, [{ x: 50, y: 50 }, { x: 250, y: 250 }])
Canvas.drawLine(pict, [{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

{{p153}}
{{p154}}

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

{{p155}}

{{p156}}
{{p157}}

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

{{p158}}
{{p159}}

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

{{p160}}

![ico-20 pin] {{common.c16}}

{{p161}}
{{p162}}
{{p163}}

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

{{p164}}


________________________________________________________

♦♦♦18♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas ()
  }

  static resizeCanvas (event) {
    console.log(`name: '${this.name}'`)
  }
}

var pict = new Canvas()
window.onresize = Canvas.resizeCanvas
~~~

{{p165}}

••name: "Canvas"••

{{p166}}
{{p167}}
{{p168}}

••name: ""••

{{p169}}
{{p170}}

____________________________________________________________________


## ![ico-25 cap] {{common.c0}}

{{p171}}

#### ![ico-20 icon] createElementNS()

{{p172}}
{{p173}}

{{p174}}

{{p175}}

{{p176}}
( ~http://www.w3.org/2000/svg~ )
{{p177}}

{{p178}}
{{p179}}

{{p180}}

{{p181}}

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

{{p182}}

~~~js
const svg = document.createElement('svg')
console.log(svg.namespaceURI)  // "http://www.w3.org/1999/xhtml"

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // "http://www.w3.org/2000/svg"
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

_______________________________________

#### ![ico-20 icon] {{p183}}

{{p184}}
{{p185}}

{{p186}}
{{p187}}

{{p188}}
{{p189}}
{{p190}}

{{p191}}

{{p192}}

~~~js
const DrawFigures = class SVG {
  constructor (w, h) {
    this.canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(this.canvas)
    this.setSize(w, h)
    this.attrs = {
      line: ['x1', 'y1', 'x2', 'y2'],
      circle: ['cx', 'cy', 'r']
    }
  }

  setSize (w, h) {
    this.canvas.setAttribute ('width', w)
    this.canvas.setAttribute ('height', h)
  }

  drawFigure (figure, params) {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    this.canvas.appendChild(elem)
    for (const attr of this.attrs[figure]) {
      elem.setAttribute(attr, params[attr])
    }
    return elem
  }
}
~~~

{{p193}}

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

{{p194}}
{{p195}}
{{p196}}

{{p197}}
{{p198}}

~~~js
setAttribute('stroke', 'red')
~~~

{{p199}}

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

{{p200}}

_____________________________________________________

#### ![ico-20 icon] {{p201}}

{{p202}}
{{p203}}
{{p204}}
("~stroke~", "~style~", "~fill~")
{{p205}}

{{p206}}
{{p207}}
{{p208}}

{{p209}}
{{p210}}
{{p211}}

{{p212}}
{{p213}}
{{p214}}

~~~js
class ColoredFigures extends DrawFigures {
  constructor () {
    super(window.innerWidth - 20, window.innerHeight - 20)
    this.figures = []
    for (const attr in this.attrs) {
      this.attrs[attr].push('stroke', 'style', 'fill')
    }
  }

  line (params, line) {
    this.draw('line', params)
  }

  circle (params, line, fill) {
    this.draw('circle', params)
  }

  draw (figure, params) {
    if (params.strokeWidth) {
      Object.assign(params, {
        style: `stroke-width: ${ params.strokeWidth }`
      })
      delete params.strokeWidth
    }
    this.figures.push(this.drawFigure(figure, params))
  }

  erase (figureIndex) {
    if (figureIndex > this.figures.length - 1 || figureIndex < 0) return
    this.figures[figureIndex].remove()
    this.figures.splice(figureIndex, 1)
  }
}
~~~

{{p215}}

~~~js
const canvas = new ColoredFigures(400, 500)

canvas.line({
  x1: 10,
  y1: 250,
  x2: 250,
  y2: 50,
  stroke: 'green',
  strokeWidth: 5
})
canvas.circle({
  cx: 150,
  cy: 150,
  r: 100,
  fill: '#ff00ff90',
  stroke: '#909',
  strokeWidth: 10
})
~~~

{{p216}}

~~~js
canvas.drawFigure('line', {
  x1: 200,
  y1: 150,
  x2: 50,
  y2: 100,
  stroke: 'blue',
  style: 'stroke-width: 10'
})
~~~

{{p217}}
{{p218}}

{{p219}}

{{p220}}
{{p221}}

{{p222}}
{{p223}}

{{p224}}
{{p225}}

{{p226}}
{{p227}}

________________________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
