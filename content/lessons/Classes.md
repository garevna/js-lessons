# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

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

{{s2.p12}}

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

{{s2.p13}}

~~~console

Ай-яй-яй, у меня контекст вызова undefined
Зато я вижу приватную переменную: 789
~~~

{{s2.p14}}
{{s2.p15}}

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

{{s2.p16}}

~~~console

Ай-яй-яй, у меня контекст вызова [object Window]
Зато я вижу приватную переменную: 789
~~~

{{s2.p17}}

{{s2.p18}}

_______________________________________________

## ![ico-25 icon] {{s3.h1}}


{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

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

{{s3.p5}}
{{s3.p6}}

{{s3.p7}}
{{s3.p8}}

~~~js
const x = new Picture('http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg', 200)
document.body.appendChild(x.elem)
~~~

__________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

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

{{s5.p2}}

~~~console

▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{s5.p3}}

~~~js
let sample = new Picture

console.log(sample)
~~~

{{s5.p4}}

~~~console

▼ Picture {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class
      ► __proto__: Object
~~~

_____________________________________________________________

{{s5.p5}}

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

{{s5.p6}}

~~~console

▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

{{s5.p7}}

~~~js
const sample = new Picture

console.log(sample)
~~~

{{s5.p8}}

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

{{s5.p9}}

{{s5.p10}}

{{s5.p11}}

~~~js
sample.constructor.name
~~~

________________________________________________________________

{{s5.p12}}

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

{{s5.p13}}

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________


## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

{{s6.p8}}

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

{{s6.p9}}

{{s6.p10}}

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

{{s6.p11}}
{{s6.p12}}

{{s6.p13}}

~~~js
get history () {
  return this.canvas.history
}
~~~

{{s6.p14}}

{{s6.p15}}

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

{{s6.p16}}

~~~js
pict.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  "***",
  { val: "***" }
]
~~~

{{s6.p17}}

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

{{s6.p18}}
{{s6.p19}}
{{s6.p20}}

{{s6.p21}}

~~~js
pict.history = ['***']
~~~

{{s6.p22}}

{{s6.p23}}

~~~js
pict.history = true
~~~

{{s6.p24}}

{{s6.p25}}

{{s6.p26}}
{{s6.p27}}

________________________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

{{s7.p3}}

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

{{s7.p4}}

{{s7.p5}}

{{s7.p6}}

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

{{s7.p7}}
{{s7.p8}}
{{s7.p9}}
{{s7.p10}}

______________________________________________________

{{s7.p11}}

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

{{s7.p12}}
{{s7.p13}}
{{s7.p14}}

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

{{s7.p15}}

{{s7.p16}}

{{s7.p17}}

{{s7.p18}}

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

{{s7.p19}}

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

{{s7.p20}}

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

## ![ico-25 icon] {{s8.h1}}

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}
{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

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

{{s9.p5}}

{{s9.p6}}

~~~js
let provider = new Provider
~~~

{{s9.p7}}

{{s9.p8}}

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

{{s9.p9}}

~~~js
provider instanceof Provider  // true
provider instanceof Array     // true

provider + 5   // 10
provider * 3   // 15
~~~

______________________________

{{s9.p10}}

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

{{s9.p11}}
{{s9.p12}}
{{s9.p13}}
{{s9.p14}}

________________________________________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

{{s10.p3}}
{{s10.p4}}
{{s10.p5}}

~~~js
super.drawLine(points, lineColor)
~~~

{{s10.p6}}

{{s10.p7}}

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

{{s10.p8}}

~~~js
let newCanvas = new ExtendedCanvas()
~~~

{{s10.p9}}

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

{{s10.p10}}

____________________________________________

### ![ico-20 icon] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}

{{s11.p3}}

{{s11.p4}}

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

{{s11.p5}}

{{s11.p6}}
{{s11.p7}}

_________________________________________________________

### ![ico-20 icon] {{s12.h1}}

{{s12.p1}}
{{s12.p2}}
{{s12.p3}}

{{s12.p4}}

{{s12.p5}}
{{s12.p6}}

~~~js
Object.setPrototypeOf(person, human)
~~~

{{s12.p7}}

{{s12.p8}}
{{s12.p9}}
{{s12.p10}}

{{s12.p11}}

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

{{s12.p12}}

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

{{s12.p13}}
{{s12.p14}}
{{s12.p15}}

{{s12.p16}}
{{s12.p17}}
{{s12.p18}}
{{s12.p19}}

{{s12.p20}}
{{s12.p21}}
{{s12.p22}}
{{s12.p23}}

{{s12.p24}}
{{s12.p25}}
{{s12.p26}}
{{s12.p27}}
{{s12.p28}}

______________________________________________________

{{s12.p29}}

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

{{s12.p30}}
{{s12.p31}}
{{s12.p32}}
{{s12.p33}}

{{s12.p34}}
{{s12.p35}}

{{s12.p36}}
{{s12.p37}}
{{s12.p38}}
{{s12.p39}}

{{s12.p40}}
{{s12.p41}}
{{s12.p42}}

{{s12.p43}}
{{s12.p44}}
{{s12.p45}}
{{s12.p46}}
{{s12.p47}}

{{s12.p48}}
{{s12.p49}}
{{s12.p50}}
{{s12.p51}}

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

{{s12.p52}}

~~~js
super.say(text)
~~~

{{s12.p53}}

~~~js
this.__proto__.say(text)
~~~

{{s12.p54}}

______________________________________________________________

{{s12.p55}}

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

{{s12.p56}}
{{s12.p57}}

________________________________________________________

## ![ico-25 icon] {{s13.h1}}

{{s13.p1}}

{{s13.p2}}

{{s13.p3}}

{{s13.p4}}

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

{{s13.p5}}
{{s13.p6}}

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

{{s13.p7}}

{{s13.p8}}
{{s13.p9}}

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

{{s13.p10}}
{{s13.p11}}

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

{{s13.p12}}

{{s13.p13}}

{{s13.p14}}
{{s13.p15}}
{{s13.p16}}

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

{{s13.p17}}


________________________________________________________

{{s13.p18}}

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

{{s13.p19}}

{{s13.p20}}

{{s13.p21}}
{{s13.p22}}
{{s13.p23}}

{{s13.p24}}

{{s13.p25}}
{{s13.p26}}

____________________________________________________________________


## ![ico-25 cap] {{s14.h1}}

{{s14.p1}}

#### ![ico-20 icon] {{s15.h1}}

{{s15.p1}}
{{s15.p2}}

{{s15.p3}}

{{s15.p4}}

{{s15.p5}}
{{s15.p6}}
{{s15.p7}}

{{s15.p8}}
{{s15.p9}}

{{s15.p10}}

{{s15.p11}}

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

{{s15.p12}}

~~~js
const svg = document.createElement('svg')
console.log(svg.namespaceURI)  // "http://www.w3.org/1999/xhtml"

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // "http://www.w3.org/2000/svg"
~~~

{{s15.p13}}

{{s15.p14}}
{{s15.p15}}

_______________________________________

#### ![ico-20 icon] {{s16.h1}}

{{s16.p1}}
{{s16.p2}}

{{s16.p3}}
{{s16.p4}}

{{s16.p5}}
{{s16.p6}}
{{s16.p7}}

{{s16.p8}}

{{s16.p9}}

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

{{s16.p10}}

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

{{s16.p11}}
{{s16.p12}}
{{s16.p13}}

{{s16.p14}}
{{s16.p15}}

~~~js
setAttribute('stroke', 'red')
~~~

{{s16.p16}}

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

{{s16.p17}}

_____________________________________________________

#### ![ico-20 icon] {{s17.h1}}

{{s17.p1}}
{{s17.p2}}
{{s17.p3}}
{{s17.p4}}
{{s17.p5}}

{{s17.p6}}
{{s17.p7}}
{{s17.p8}}

{{s17.p9}}
{{s17.p10}}
{{s17.p11}}

{{s17.p12}}
{{s17.p13}}
{{s17.p14}}

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

{{s17.p15}}

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

{{s17.p16}}

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

{{s17.p17}}
{{s17.p18}}

{{s17.p19}}

{{s17.p20}}
{{s17.p21}}

{{s17.p22}}
{{s17.p23}}

{{s17.p24}}
{{s17.p25}}

{{s17.p26}}
{{s17.p27}}

________________________________________________________________

{{s17.p28}}
