# ![ico-30 study] {{p1}}

**ES6 (ECMAScript 2015)**

{{p2}}

{{p3}}

{{p4}}

{{p5}}

___________________________________________________

## ![ico-25 icon] {{common.syntax}}

{{p6}}

~~~js
class User {
  ...
}
~~~

{{p7}}

{{p8}}

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

•••• pin
{{p9}}
{{p10}}
••••

~~~js
class User {
  constructor (name) {
    this.name = name
  }
  age = 35
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user
< ► User {age: 35, name: 'Piter'}
~~~

___________________________________________________

### ![ico-20 icon] {{common.private}}

{{p11}}

♦♦♦1♦♦♦

~~~js
class User {
  #status
  constructor (name = 'Unknown', status) {
    this.name = name
    this.#status = status
    this.getStatus = () => console.log(this.#status)
  }
}
~~~

{{p12}}

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...   constructor (name = 'Unknown', status) {
...     this.name = name
...     this.#status = status
...     this.getStatus = () => console.log(this.#status)
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user
< User { name: 'Piter', getStatus: [Function (anonymous)] }
> user.getStatus()
registered
undefined
> user.#status = 'test'
< user.#status = 'test'
<     ^
<
< Uncaught SyntaxError: Private field '#status' must be declared in an enclosing class
~~~

^^{{p13}}^^

___________________________________________________

### ![ico-25 icon] {{common.classFields}}

{{p14}}

•••• none
{{p15}}
{{p16}}
{{p17}}
{{p18}}
••••

♦♦♦2♦♦♦

~~~js
class User {
  #status

  constructor (name, status) {
    this.name = name
    this.#status = status
  }

  getStatus () {
    return this.#status
  }

  get status () {
    return this.#status
  }

  set status (newStatus) {
    const allowedStatuses = ['registered', 'admin', 'customer'];
    if (allowedStatuses.includes(newStatus)) {
      this.#status = newStatus
    } else {
      console.error(`Invalid status '${newStatus}'.`)
    }
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...
...   constructor (name, status) {
...     this.name = name
...     this.#status = status
...   }
...
...   getStatus () {
...     return this.#status
...   }
...
...   get status () {
...     return this.#status
...   }
...
...   set status (newStatus) {
...     const allowedStatuses = ['registered', 'admin', 'customer'];
...     if (allowedStatuses.includes(newStatus)) {
...       this.#status = newStatus
...     } else {
...       console.error(`Invalid status '${newStatus}'.`)
...     }
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user.getStatus()
< 'registered'
> user.status
< 'registered'
> user.status = 'figma'
! Invalid status 'figma'.
> user.status = 'hacker'
! Invalid status 'hacker'.
~~~

___________________________________________________

♦♦♦3♦♦♦

~~~js
class Demo {
  publicField = '{{publicField}}'

  #privateField = '{{privateField}}'

  static staticField = '{{staticField}}'

  constructor (name) {
    this.name = name
  }

  publicMethod () {
    return `{{access}}: ${this.#privateField}`
  }

  static staticMethod () {
    return '{{call}} Demo.staticMethod()'
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class Demo {
...   publicField = '{{publicField}}'
...
...   #privateField = '{{privateField}}'
...
...   static staticField = '{{staticField}}'
...
...   constructor(name) {
...     this.name = name
...   }
...
...   publicMethod () {
...     return `{{access}}: ${this.#privateField}`
...   }
...
...   static staticMethod () {
...     return '{{call}} Demo.staticMethod()'
...   }
... }
< undefined
> const instance = new Demo('Test')
< undefined
> instance
< Demo { publicField: '{{publicField}}', name: 'Test' }
> instance.publicMethod()
< '{{access}}: {{privateField}}'
> Demo.staticMethod()
< '{{call}} Demo.staticMethod()'
> Demo.staticField
< '{{staticField}}'
~~~

___________________________________________________

## ![ico-25 icon] {{p26}}

{{p19}}
{{p20}}

{{initialisation}}

•••• none

1. {{p21}}
2. {{p22}} '**{{publicField}}**'

••••

{{p23}}
{{p24}}

•••• none
3. {{p25}}
••••

{{prove}}

♦♦♦4♦♦♦

~~~js
function getValue (stepName) {
  console.log(`-> {{running}}: ${stepName}`)
  return '{{value}}'
}
~~~

♦♦♦5♦♦♦

~~~js
class TestOrder {
  firstField = getValue('{{field}} (firstField)')

  constructor () {
    getValue('{{code}}')
    this.secondField = '{{created}}'
  }

  thirdField = getValue('{{field}} (thirdField)')
}

const instance = new TestOrder()
~~~

{{order}}

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> function getValue(stepName) {
...   console.log(`-> {{running}}: ${stepName}`)
...   return '{{value}}'
... }
< undefined
> class TestOrder {
...   firstField = getValue('{{field}} (firstField)')
...
...   constructor() {
...     getValue('{{code}}')
...     this.secondField = '{{created}}'
...   }
...
...   thirdField = getValue('{{field}} (thirdField)')
... }
< undefined
> const instance = new TestOrder()
< -> {{running}}: {{field}} (firstField)
< -> {{running}}: {{field}} (thirdField)
< -> {{running}}: {{code}}
< undefined
~~~

{{resume}}

___________________________________________________

## ![ico-25 icon] Class expression

{{p27}}
{{p28}}

### ![ico-20 icon] {{p29}}

♦♦♦6♦♦♦

~~~js
const User = class {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

{{p30}}
{{p31}}

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'User'
> const user = new User
< undefined
> user
< User { setName: [Function: setName], getName: [Function: getName] }
> user.getName()
< 'Unknown'
> user.setName('Piter')
< undefined
> user.getName()
< 'Piter'
~~~

___________________________________________________

### ![ico-20 icon] {{p32}}

♦♦♦7♦♦♦

~~~js
const User = class Human {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

{{p33}}
{{p34}}

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class Human {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'Human'
~~~

___________________________________________________

{{whatFor}}

^^^[{{whatFor10}}]
^^{{whatFor11}}^^
![ico-20 paperclip] ^^{{whatFor111}}^^
![ico-20 paperclip] ^^{{whatFor112}}^^

~~~js
let User = class {
  static createDefault() { return new User }
}
~~~

~~~demo
> const Student = User
< undefined
> User = null
< null
> Student.createDefault()
! Uncaught TypeError: User is not a constructor
~~~

^^^

^^^[{{whatFor20}}]
^^{{whatFor21}}^^
^^^

___________________________________________________

♦♦♦8♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

~~~demo
> console.log(Picture.name)
< Canvas
~~~

~~~js
const picture = new Picture()

picture.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
picture.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

~~~demo
> picture instanceof Picture
< true
> picture instanceof Canvas
! Uncaught ReferenceError: Canvas is not defined
~~~

{{{Classes-5.js}}}

___________________________________________________

## ![ico-25 icon] get & set

{{p35}}
{{p36}}
{{p38}}

•••• none
{{p37}}
{{p39}}
••••

{{p40}}

♦♦♦9♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')

    let history = []

    Object.defineProperty(this, 'history', {
      get: () => Object.freeze(history),

      set: newHistory => {
        if (!Array.isArray(newHistory)) {
          console.error('{{p49}}')
          return
        }

        const tmp = newHistory
          .filter(item => item.path && Array.isArray(item.path))

        if (!tmp.length) {
          console.error('{{p48}}')
          return
        }

        history = tmp
      },

      enumerable: true,
      configurable: true
    })
  }
}
~~~

{{p41}}

~~~js
const canvas = new Canvas
console.log(canvas)
~~~

~~~console
▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
    history: (...)
  ► get history: () => history
  ► set history: newHistory => {…}
  ▼ [[Prototype]]: Object
      ► constructor: class Canvas
      ► [[Prototype]]: Object
~~~

{{p42}}
{{p43}}

~~~js
canvas.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  '***',
  { val: '***' }
]
~~~

{{p44}}

~~~js
console.log(canvas.history)
~~~

~~~console
▼ (2) [{…}, {…}]
  ► 0: {path: Array(2), lineColor: 'red'}
  ► 1: {path: Array(2), lineColor: 'green'}
    length: 2
  ► [[Prototype]]: Array(0)
~~~

{{p45}}

{{p46}}

~~~demo
> canvas.history = 'History'
! {{p49}}
> canvas.history = ['***']
! {{p48}}
~~~

{{p47}}

{{p50}}

~~~demo
> canvas.history.push({ x: 10, y: 20 })
! Uncaught TypeError: Cannot add property 2, object is not extensible
> canvas.history.pop()
! Uncaught TypeError: Cannot delete property '1' of [object Array]
~~~

___________________________________________________

## ![ico-25 icon] {{p51}}

{{p52}}

{{p59}}

•••• none
{{p60}}
{{p61}}
{{p62}}
••••

{{p53}}

~~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const picture = new Picture
~~~~

{{p54}}

~~~demo
> const drawLine = picture.drawLine
< undefined
> drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
! Uncaught TypeError: Cannot read property 'area' of undefined
~~~

{{p55}}

♦♦♦10♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine = (points) => {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

{{p56}}
{{p57}}

{{p58}}

~~~demo
> const picture = new Picture()
< undefined
> const test = picture.drawLine
< undefined
> test([{ x: 50, y: 50 }, { x: 250, y: 250 }])
< undefined
~~~

___________________________________________________

♦♦♦11♦♦♦

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    function setProp (prop) {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
! Cannot set properties of undefined (setting 'country')
~~~

•••• none
{{p234}}
{{p235}}
••••

{{p67}}

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    const setProp = (prop) => {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

{{p68}}

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
< undefined
> user
< ► User {name: 'Piter', country: 'UA'}
~~~

___________________________________________________

## ![ico-25 icon] {{p70}}

### ![ico-20 icon] extends

{{p71}}

•••• none
{{p72}}
{{p73}}
••••

^^^[]
{{p232}}
{{p233}}
{{p251}}
^^^

♦♦♦12♦♦♦

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

~~~console

▼ Provider(5) ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
    0: 'Google'
    1: 'Mozilla'
    2: 'Opera'
    3: 'Safari'
    4: 'IE'
    length: 5
  ▼ [[Prototype]]: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► [[Prototype]]: Array(0)
~~~

{{p78}}

~~~demo
> provider instanceof Provider
< true
> provider instanceof Array
< true

> provider + 5
< 10
> provider * 3
< 15
~~~

___________________________________________________

♦♦♦13♦♦♦

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

const newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])

console.log(newCanvas)
~~~

~~~console
▼ ExtendedCanvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
  ▼ [[Prototype]]: Canvas
    ► constructor: class ExtendedCanvas
    ► drawCircle: ƒ drawCircle(center, radius)
    ▼ [[Prototype]]: Object
      ► constructor: class
      ► drawLine: ƒ drawLine(points)
      ► [[Prototype]]: Object
~~~

••••
{{p79}}
{{p80}}
{{p81}}
{{p82}}
••••

___________________________________________________

### ![ico-20 icon] super

{{p83}}

{{p84}}

{{p85}}
{{p86}}
{{p87}}

~~~js
super.drawLine(points)
~~~

{{p88}}

♦♦♦14♦♦♦

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

___________________________________________________

### ![ico-20 icon] super()

{{p92}}

{{p93}}

{{p94}}

♦♦♦15♦♦♦

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

~~~console
! Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

___________________________________________________


^^![ico-25 pin] Ключевое слово **~super~** работает и без классов — в обычных
объектах, через их прототип. Это отдельная тема, и она вынесена на свою
страницу:^^

[%%%super в литералах объектов%%%](page/super-in-object-literals)

## ![ico-25 icon] static

{{p150}}

•••• warn
{{p151}}
{{p152}}
••••

♦♦♦16♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = Canvas.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: 'background: #ddd; margin-inline: 32px'
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

{{p153}}
{{p154}}

~~~js
const picture = new Canvas()
window.onresize = function () {
  picture.canvas.dispatchEvent(new Event('resize'))
}
~~~

{{p155}}
{{p156}}

♦♦♦17♦♦♦

~~~js
class Canvas {
  constructor () {
    this.constructor.instances.add(this)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static instances = new Set()
  static listener = false

  static setListener () {
    if (this.listener) {
      console.log('The listener is already enabled.')
      return
    }
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.instances
        .forEach(instance => instance.canvas.dispatchEvent(event))
    }
    this.listener = true
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

{{p157}}
{{p158}}
![ico-25 warn] {{p160}}

^^^[{{p161}}]

{{p162}}
{{p163}}


| [![ico-20 link] **~FinalizationRegistry~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) | [![ico-20 link] **~WeakRef~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) |

~~~js
class Canvas {
  constructor () {
    const ref = new WeakRef(this)
    Canvas.#registry.add(ref)
    Canvas.#cleaner.register(this, ref)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
    
    Canvas.setListener()
  }

  static #registry = new Set()
  static #listener = false

  static #cleaner = new FinalizationRegistry((ref) => {
    Canvas.#registry.delete(ref)
    console.log('{{p159}}')
  })

  static setListener () {
    if (this.#listener) return // Если слушатель уже есть, ничего не делаем
    
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.#registry.forEach(ref => {
        const instance = ref.deref()
        if (instance && instance.canvas) {
          instance.canvas.dispatchEvent(event)
        }
      })
    }
    this.#listener = true
  }

  static getAliveInstances() {
    const alive = []
    for (const ref of this.#registry) {
      const obj = ref.deref()
      if (obj) alive.push(obj)
    }
    return alive
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }

  destroy () {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    this.canvas = null
    this.area = null
  }
}

const first = new Canvas()
const second = new Canvas()
~~~

^^^

___________________________________________________

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

••name: 'Canvas'••

{{p166}}
{{p167}}
{{p168}}

••name: ''••

{{p169}}
{{p170}}

___________________________________________________

## ![ico-25 cap] {{common.example}}

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
console.log(svg.namespaceURI)  // 'http://www.w3.org/1999/xhtml'

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // 'http://www.w3.org/2000/svg'
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

___________________________________________________

#### ![ico-20 icon] {{p183}}

{{p184}}
{{p185}}

•••• none
{{p186}}
{{p187}}
{{p188}}
{{p189}}
{{p190}}
••••

••••
{{p191}}
{{p192}}
••••

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

•••• none
{{p194}}
{{p195}}
{{p196}}
••••

•••• none
{{p197}}
{{p198}}
••••

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

___________________________________________________

#### ![ico-20 icon] {{p201}}

{{p202}}
{{p203}}
{{p204}}

{{p205}}

{{p206}}
{{p207}}
{{p208}}

••••
{{p209}}
••••

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

___________________________________________________

## ![ico-25 hw] {{common.tests}}

♣♣♣♣
? {{test01Question}}

+ {{test01Variant1}}
= {{test01Variant1Answer}}

- {{test01Variant2}}
= {{test01Variant2Answer}}

- {{test01Variant3}}
= {{test01Variant3Answer}}

- {{test01Variant4}}
= {{test01Variant4Answer}}

? {{test02Question}}

- {{test02Variant1}}
= {{test02Variant1Answer}}

- {{test02Variant2}}
= {{test02Variant2Answer}}

+ {{test02Variant3}}
= {{test02Variant3Answer}}

- {{test02Variant4}}
= {{test02Variant4Answer}}

? {{test03Question}}

- {{test03Variant1}}
= {{test03Variant1Answer}}

+ {{test03Variant2}}
= {{test03Variant2Answer}}

- {{test03Variant3}}
= {{test03Variant3Answer}}

- {{test03Variant4}}
= {{test03Variant4Answer}}

? {{test04Question}}

- {{test04Variant1}}
= {{test04Variant1Answer}}

- {{test04Variant2}}
= {{test04Variant2Answer}}

- {{test04Variant3}}
= {{test04Variant3Answer}}

+ {{test04Variant4}}
= {{test04Variant4Answer}}

? {{test05Question}}

+ {{test05Variant1}}
= {{test05Variant1Answer}}

- {{test05Variant2}}
= {{test05Variant2Answer}}

- {{test05Variant3}}
= {{test05Variant3Answer}}

- {{test05Variant4}}
= {{test05Variant4Answer}}

♣♣♣♣

## ![ico-25 hw] {{common.quest}}

♠♠♠♠ {{quest01Task}}
class CustomButton {
  constructor (label) {
    this.label = label
    this.clicks = 0
    
    this.elem = document.createElement('button')
    this.elem.textContent = this.label
    
    this.elem.addEventListener('click', this.handleClick)
    document.body.appendChild(this.elem)
  }

  handleClick () {
    this.clicks++
    this.textContent = `Clicked: ${this.clicks}`
  }
}

const btn = new CustomButton('Click me!')
???
? 2 | {{quest01Check1}}
document.querySelector('button') !== null

? 4 | {{quest01Check2}}
document.querySelector('button').click()
btn.clicks === 1

? 4 | {{quest01Check3}}
document.querySelector('button').textContent === 'Clicked: 1'

? 2 | {{quest01Check4}}
/handleClick\s*=\s*[(\w$]/.test(SOURCE) && !/\.bind\s*\(/.test(SOURCE)
♠♠♠♠

___________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
