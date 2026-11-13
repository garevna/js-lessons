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
const BaseClass = class Canvas {
  constructor (w = 300, h = 300) {
    Canvas.create(w, h)
  }

  static #context = null

  static getContext = () => this.#context

  static create (width, height) {
    if (this.#context) return
    const canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(canvas, { width, height })
    this.#context = canvas.getContext('2d')
  }

  setLineWidth (width = 2) {
    const context = Canvas.getContext()
    context.lineWidth = width 
  }
  setLineColor (color = '#09b') {
    const context = Canvas.getContext()
    context.strokeStyle = color
  }
  setFillColor (color = '#ff0') {
    const context = Canvas.getContext()
    context.fillStyle = color 
  }

  drawLine (points, lineWidth, lineColor) {
    const context = Canvas.getContext()
    context.beginPath()
    this.setLineWidth(lineWidth)
    this.setLineColor(lineColor)
    context.moveTo(points[0].x, points[0].y)
    context.lineTo(points[1].x, points[1].y)
    context.stroke()
  }
}
~~~

♦♦♦extends♦♦♦

~~~js
class ExtendedCanvas extends BaseClass {
  drawCircle (center, radius, lineWidth, lineColor, fill) {
    const context = BaseClass.getContext()
    context.beginPath()
    this.setLineWidth(lineWidth)
    this.setLineColor(lineColor)
    this.setFillColor(fill)
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }
}

const newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], 5, '#f0f')
~~~

{{{Classes-extends-1.js}}}

~~~console
▼ ExtendedCanvas {}
  ▼ [[Prototype]]: Canvas
    ► constructor: class ExtendedCanvas
    ► drawCircle: ƒ drawCircle(center, radius, lineWidth, lineColor, fill)
    ▼ [[Prototype]]: Object
      ► constructor: class Canvas
      ► drawLine: ƒ drawLine(points, lineWidth, lineColor)
      ► setFillColor: ƒ setFillColor(color = '#ff0')
      ► setLineColor: ƒ setLineColor(color = '#09b')
      ► setLineWidth: ƒ setLineWidth(width = 2)
      ► [[Prototype]]: Object
~~~

••••none
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

{{p88}}

♦♦♦14♦♦♦

~~~js
const BaseClass = class Canvas {
  constructor (w = 300, h = 300) {
    Canvas.create(w, h)
  }

  static #context = null

  static getContext = () => this.#context

  static create (width, height) {
    if (this.getContext()) return
    const canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(canvas, { width, height })
    this.#context = canvas.getContext('2d')
  }

  static setLineWidth (width = 2) {
    this.getContext().lineWidth = width 
  }
  static setLineColor (color = '#09b') {
    this.getContext().strokeStyle = color
  }
  static setFillColor (color = '#ff0') {
    this.getContext().fillStyle = color
  }
}
~~~

◘◘ ![ico-25 cap] **extends** ◘◘

~~~js
class ExtendedCanvas extends BaseClass {
  constructor (w, h) {
    super(w, h)
  }
  static config (lineWidth, lineColor, fill) {
    super.create(360, 280)
    super.setLineWidth(lineWidth)
    super.setLineColor(lineColor)
    super.setFillColor(fill)
  }
  static drawLine (points, lineWidth, lineColor) {
    const context = super.getContext()
    this.config(lineWidth, lineColor)
    context.moveTo(points[0].x, points[0].y)
    context.lineTo(points[1].x, points[1].y)
    context.stroke()
  }
  static drawCircle (center, radius, lineWidth, lineColor, fill) {
    const context = super.getContext()
    this.config(lineWidth, lineColor, fill)
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }
}
~~~

{{p89}}

~~~js
BaseClass.create(400, 400)
ExtendedCanvas.drawCircle({ x: 110, y: 110 }, 100, 8, '#f50', '#ff7')
ExtendedCanvas.drawLine([{ x: 20, y: 20 }, { x: 220, y: 220 }], 5, '#f0f')
~~~

{{p90}}

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

••name: ''••

{{p168}}

___________________________________________________

## ![ico-25 cap] {{common.example}} SVG

{{p169}}
^^{{p170}}^^
^^{{p171}}^^

^^^[createElementNS()]

^^{{p172}}^^

^^{{p173}}^^

| {{p174}} | {{p175}} |
| {{p176}} | {{p177}} |

^^{{p179}}^^

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

^^{{p178}}^^

**^^Valid Namespace URIs:^^**

| **^^HTML^^** | ^^http://www.w3.org/1999/xhtml^^ |
| **^^SVG^^**  | ^^http://www.w3.org/2000/svg^^   |

^^^

~~~demo
> const svg = document.createElement('svg')
< undefined
> svg.namespaceURI
< 'http://www.w3.org/1999/xhtml'
> const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
< undefined
> picture.namespaceURI
< 'http://www.w3.org/2000/svg'
~~~

___________________________________________________

#### ![ico-20 icon] {{p180}}

{{p181}}

~~~js
class SVG {
  constructor (w, h) {
    SVG.createCanvas()
    SVG.setSize(w, h)
  }
  static #canvas = null
  static #attrs = {
    line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
    circle: ['cx', 'cy', 'r', 'stroke', 'stroke-width', 'fill']
  }

  static createCanvas () {
    if (this.#canvas) return
    this.#canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(SVG.#canvas)
  }

  static getCanvas () {
    return this.#canvas
  }

  static getAttrs (figure) {
    return this.#attrs[figure]
  }

  static setSize (w, h) {
    this.#canvas.setAttribute('width', w)
    this.#canvas.setAttribute('height', h)
  }

  drawFigure (figure, params) {
    if (!SVG.getAttrs(figure)) {
      console.error('Invalid figure:', figure)
    }
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    SVG.getCanvas().appendChild(elem)
    for (const attr of SVG.getAttrs(figure)) {
      if (params[attr]) {
        elem.setAttribute(attr, params[attr])
      }
    }
    return elem
  }
}
~~~

••••none
{{p182}}
{{p183}}
{{p184}}
••••

{{p185}}

~~~js
const picture = new SVG(360, 360)
picture.drawFigure('circle', {
  cx: 100,
  cy: 150,
  r: 80,
  stroke: '#090',
  'stroke-width': 5,
  fill: '#ff0d'
})
const image = new SVG(300, 300)
image.drawFigure('line', {
  x1: 20,
  y1: 30,
  x2: 180,
  y2: 270,
  stroke: '#f50',
  'stroke-width': 4
})
~~~

{{{Classes-3.js}}}

___________________________________________________

#### ![ico-20 icon] {{p186}}

{{p187}}

~~~js
class ExtendedSVG extends SVG {
  constructor () {
    super(420, 420)
  }

  line (x1, y1, x2, y2, stroke = '#777', strokeWidth = 2) {
    super.drawFigure('line', {
      x1,
      y1,
      x2,
      y2,
      stroke,
      'stroke-width': strokeWidth
    })
  }
  circle (cx, cy, r, stroke = '#777', strokeWidth = 2, fill = '#fff5') {
    super.drawFigure('circle', {
      cx,
      cy,
      r,
      stroke,
      'stroke-width': strokeWidth,
      fill
    })
  }
}
~~~

{{p188}}
••{{p189}}••

{{p190}}

~~~js
const canvas = new ExtendedSVG
const picture = new ExtendedSVG

canvas.circle(150, 150, 100, '#090', 5, '#ff0d')
picture.line(20, 30, 180, 270, '#f50', 4)
~~~

{{{Classes-4.js}}}

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

? 2 | {{quest01Check2}}
document.querySelector('button').click()
btn.clicks === 1

? 2 | {{quest01Check3}}
document.querySelector('button').textContent === 'Clicked: 1'

? 3 | {{quest01Check4}}
/handleClick\s*=\s*[(\w$]/.test(SOURCE) && !/\.bind\s*\(/.test(SOURCE)
♠♠♠♠

♠♠♠♠ {{quest02Task}}
const Tracker = class {
  static #count = 0

  static increment () {
    this.#count++
    console.log(`Total events tracked: ${this.#count}`)
  }
}

class UserTracker extends Tracker {
  static logAction (action) {
    console.log(`Action: ${action}`)
    this.increment()
  }
}

UserTracker.logAction('login')
???
? 2 | {{quest02Check1}}
const seen = []
const real = console.log
console.log = (...a) => seen.push(String(a[0]))
try { UserTracker.logAction('login') } finally { console.log = real }
seen.some((line) => line.includes('login'))

? 4 | {{quest02Check2}}
const seen = []
const real = console.log
console.log = (...a) => seen.push(String(a[0]))
try { UserTracker.logAction('a'); UserTracker.logAction('b') } finally { console.log = real }
const n = (seen.join(' ').match(/\d+/g) || []).map(Number)
n.length >= 2 && n[n.length - 1] === n[n.length - 2] + 1

? 4 | {{quest02Check3}}
class SecondTracker extends Tracker {
  static logAction (action) { this.increment() }
}
const seen = []
const real = console.log
console.log = (...a) => seen.push(String(a[0]))
try { UserTracker.logAction('a'); SecondTracker.logAction('b') } finally { console.log = real }
const n = (seen.join(' ').match(/\d+/g) || []).map(Number)
n.length >= 2 && n[n.length - 1] === n[n.length - 2] + 1

? 2 | {{quest02Check4}}
/static\s+#count/.test(SOURCE)
♠♠♠♠

___

◘◘**![ico-20 hw] {{common.quest}} 3**◘◘

~~~js
function createModelFactory (prefix) {
  return class DBModel {
    constructor (id) {
      this.dbId = `${prefix}_${id}`
    }
    
    static getModelName() {
      return DBModel.name
    }
  }
}

const OrderModel = createModelFactory('ORD')
const userOrder = new OrderModel('1024')

console.log(OrderModel.getModelName())
~~~

→→→ {{quest03Question}} | 'OrderModel', 'DBModel', TypeError, 'ORD_1024', undefined | DBModel →→→
___________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
