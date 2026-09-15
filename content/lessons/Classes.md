# ![ico-30 study] {{s1.h1}}

**ES6 (ECMAScript 2015)**

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

____________________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

~~~js
class User {
  ...
}
~~~

{{s2.p4}}

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

{{s2.p5}}

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

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}
{{s2.p9}}

{{s2.p10}}
{{s2.p11}}

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

{{s2.p13}}
{{s2.p14}}

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

{{s2.p15}}

••constructor: class User    /    constructor: ƒ User(name)••

_______________________________________________

## ![ico-25 icon] class declaration


![ico-20 error] **hoisting**

{{s2.p16}}

{{s2.p17}}

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

{{s2.p19}}
{{s2.p20}}

{{s2.p21}}
{{s2.p22}}

~~~js
const x = new Picture('http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg', 200)
document.body.appendChild(x.elem)
~~~

__________________________________________________

## ![ico-25 icon] class expression

{{s2.p23}}

### ![ico-20 icon] {{s3.h1}}

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

{{s3.p2}}

~~~console

▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{s3.p3}}

~~~js
let sample = new Picture

console.log(sample)
~~~

{{s3.p4}}

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

{{s3.p6}}

~~~console

▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{s3.p7}}

~~~js
const sample = new Picture

console.log(sample)
~~~

{{s3.p8}}

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

{{s3.p9}}

{{s3.p10}}

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

{{s3.p12}}

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________


## ![ico-25 icon] get & set

{{s3.p13}}

{{s3.p14}}

{{s3.p15}}

{{s3.p16}}

{{s3.p17}}

{{s3.p18}}

{{s3.p19}}

♦♦♦6♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

{{s3.p21}}

{{s3.p22}}

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

{{s3.p23}}
{{s3.p24}}

{{s3.p25}}

~~~js
get history () {
  return this.canvas.history
}
~~~

{{s3.p26}}

{{s3.p27}}

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

{{s3.p28}}

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

{{s3.p29}}
{{s3.p30}}
{{s3.p31}}

{{s3.p32}}

~~~js
pict.history = ['***']
~~~

{{s3.p33}}

••![ico-20 error] History must contain path array••

~~~js
pict.history = true
~~~

{{s3.p34}}

••![ico-20 error] History must be array••

{{s3.p35}}
{{s3.p36}}

________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

♦♦♦7♦♦♦

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

{{s4.p4}}

••![ico-20 error] Uncaught TypeError: Cannot read property 'area' of undefined••

{{s4.p5}}

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}

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

{{s4.p11}}
{{s4.p12}}
{{s4.p13}}

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

{{s4.p14}}

••![ico-20 error] Uncaught TypeError: Cannot set property 'age' of undefined••

{{s4.p15}}

{{s4.p16}}

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

{{s4.p17}}

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

{{s4.p18}}

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

## ![ico-25 icon] {{s5.h1}}

### ![ico-20 icon] extends

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}

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

{{s5.p5}}

{{s5.p6}}

~~~js
let provider = new Provider
~~~

{{s5.p7}}

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

{{s5.p8}}

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

{{s5.p10}}
{{s5.p11}}
{{s5.p12}}
{{s5.p13}}

________________________________________________________

### ![ico-20 icon] super

{{s5.p14}}

{{s5.p15}}

{{s5.p16}}
{{s5.p17}}
{{s5.p18}}

~~~js
super.drawLine(points, lineColor)
~~~

{{s5.p19}}

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

{{s5.p21}}

~~~js
let newCanvas = new ExtendedCanvas()
~~~

{{s5.p22}}

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

{{s5.p23}}

____________________________________________

### ![ico-20 icon] super ()

{{s5.p24}}

{{s5.p25}}

{{s5.p26}}

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

{{s5.p28}}

••![ico-20 error] Uncaught ReferenceError: ••
•• Must call super constructor in derived class before accessing 'this' or returning from derived constructor••

_________________________________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}

{{s6.p4}}

{{s6.p5}}
{{s6.p6}}

~~~js
Object.setPrototypeOf(person, human)
~~~

{{s6.p7}}

{{s6.p8}}
{{s6.p9}}
{{s6.p10}}

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

{{s6.p13}}
{{s6.p14}}
{{s6.p15}}

{{s6.p16}}
{{s6.p17}}
{{s6.p18}}
{{s6.p19}}

{{s6.p20}}
{{s6.p21}}
{{s6.p22}}
{{s6.p23}}

{{s6.p24}}
{{s6.p25}}
{{s6.p26}}
{{s6.p27}}
{{s6.p28}}

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

{{s6.p30}}
{{s6.p31}}
{{s6.p32}}
{{s6.p33}}

{{s6.p34}}
{{s6.p35}}

{{s6.p36}}
{{s6.p37}}
{{s6.p38}}
{{s6.p39}}

{{s6.p40}}
{{s6.p41}}
{{s6.p42}}

{{s6.p43}}
{{s6.p44}}
{{s6.p45}}
{{s6.p46}}
{{s6.p47}}

{{s6.p48}}
{{s6.p49}}
{{s6.p50}}
{{s6.p51}}

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

{{s6.p52}}

~~~js
super.say(text)
~~~

{{s6.p53}}

~~~js
this.__proto__.say(text)
~~~

{{s6.p54}}

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

{{s6.p56}}
{{s6.p57}}

________________________________________________________

## ![ico-25 icon] static

{{s6.p58}}

{{s6.p59}}

{{s6.p60}}

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

{{s6.p62}}
{{s6.p63}}

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

{{s6.p64}}

{{s6.p65}}
{{s6.p66}}

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

{{s6.p67}}
{{s6.p68}}

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

{{s6.p69}}

{{s6.p70}}

{{s6.p71}}
{{s6.p72}}
{{s6.p73}}

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

{{s6.p74}}


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

{{s6.p76}}

••name: "Canvas"••

{{s6.p77}}
{{s6.p78}}
{{s6.p79}}

••name: ""••

{{s6.p80}}
{{s6.p81}}

____________________________________________________________________


## ![ico-25 cap] {{s7.h1}}

{{s7.p1}}

#### ![ico-20 icon] createElementNS()

{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

{{s7.p5}}

{{s7.p6}}
( ~http://www.w3.org/2000/svg~ )
{{s7.p7}}

{{s7.p8}}
{{s7.p9}}

{{s7.p10}}

{{s7.p11}}

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

{{s7.p12}}

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

#### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}

{{s8.p3}}
{{s8.p4}}

{{s8.p5}}
{{s8.p6}}
{{s8.p7}}

{{s8.p8}}

{{s8.p9}}

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

{{s8.p10}}

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

{{s8.p11}}
{{s8.p12}}
{{s8.p13}}

{{s8.p14}}
{{s8.p15}}

~~~js
setAttribute('stroke', 'red')
~~~

{{s8.p16}}

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

{{s8.p17}}

_____________________________________________________

#### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}
{{s9.p2}}
{{s9.p3}}
("~stroke~", "~style~", "~fill~")
{{s9.p4}}

{{s9.p5}}
{{s9.p6}}
{{s9.p7}}

{{s9.p8}}
{{s9.p9}}
{{s9.p10}}

{{s9.p11}}
{{s9.p12}}
{{s9.p13}}

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

{{s9.p14}}

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

{{s9.p15}}

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

{{s9.p16}}
{{s9.p17}}

{{s9.p18}}

{{s9.p19}}
{{s9.p20}}

{{s9.p21}}
{{s9.p22}}

{{s9.p23}}
{{s9.p24}}

{{s9.p25}}
{{s9.p26}}

________________________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
