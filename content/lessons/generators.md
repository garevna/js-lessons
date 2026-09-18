# ![ico-30 study] {{common.c20}}

**ES 2015**

{{p1}}
{{p2}}
{{p3}}

__________________________________________

{{p4}}

## ![ico-25 icon] Symbol.iterator

{{p5}}

{{p6}}

{{p7}}

______________________________

{{p8}}
{{p9}}
{{p10}}

___________________________

**Design pattern "~Iterator~"**

{{p11}}
{{p12}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const browsers = {
  [Symbol.iterator]() {
    let step = 0
    return {
      next() {
        step++
        return step === 1
          ? { value: 'Google', done: false }
          : step === 2
            ? { value: 'Mozilla', done: false }
            : step === 3
              ? { value: 'Safari', done: false }
              : { value: '', done: true }
      }
   	}
  }
}
~~~

{{p13}}

~~~js
for (const name of browsers) {
  console.log(name)
}
~~~

{{{generators-1.js}}}


{{p14}}

~~~js
console.log(...browsers)
~~~

~~~console
Google Mozilla Safari
~~~

{{p15}}

{{p16}}

______________________________________

## ![ico-25 icon] {{p17}}

{{p18}}
{{p19}}
{{p20}}

{{p21}}

{{p22}}

{{p23}}
{{p24}}
{{p25}}

~~~js
const iterator = generator(...)
~~~

{{p26}}

{{p27}}

{{p28}}

{{p29}}
{{p30}}
{{p31}}

{{p32}}

{{p33}}
{{p34}}
{{p35}}
{{p36}}


~~~js
function* generator (...) {
  ...
  yield ...
  ...
  yield ...
  ...
}
~~~

{{p37}}

____________________

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const browsers = {
  [Symbol.iterator]: function * () {
    yield 'Google'
    yield 'Mozilla'
    yield 'Safari'
  }
}
~~~

{{p38}}

_________________

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const browsers = (function * () {
  yield 'Chrome'
  yield 'Mozilla'
  yield 'Safari'
  yield 'Edge'
})()

for (const x of [1, 2, 3, 4]) setTimeout(() => console.log(browsers.next().value), 1000 * x)
~~~

{{{generators-3.js}}}

{{p39}}
{{p40}}
{{p41}}

___________________________


## ![ico-25 icon] {{p42}}

{{p43}}
{{p44}}
{{p45}}
{{p46}}

{{p47}}

{{p48}}

{{p49}}

### lazy evaluation

{{p50}}

~~~js
function recurse (arg) {
  console.log(arg++)
  recurse(arg)
}

recurse(1)
~~~

{{p51}}

{{p52}}

{{p53}}

~~~js
const lazyEvaluatedInfiniteList = (function * recurse (arg) {
  while (true) { yield arg++ }
})(0)

for (let x = 0; x < 12000; x++) {
  console.log(lazyEvaluatedInfiniteList.next().value)
}
~~~

{{p54}}

{{p55}}
{{p56}}
{{p57}}
{{p58}}
{{p59}}

______________________________________________________________

## ![ico-25 icon] next()

{{p60}}

{{p61}}

{{p62}}

{{p63}}
{{p64}}

_____________________________________________________________

◘◘![ico-20 cap] ** 4**◘◘

~~~js
function * colorsGenerator () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
}

const colorIterator = colorsGenerator()

for (let x=0; x < 100; x++) {
  const point = document.body
    .appendChild(document.createElement('div'))
  point.style = `
    float: left;
    width: 10px;
    height: 10px;
    background-color: ${ colorIterator.next().value};
  `
}
~~~

{{{generators-4.js}}}

{{p65}}

~~~js
const colorIterator = (function * () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
})()
~~~

{{p66}}

◘◘![ico-20 cap] ** 4.1**◘◘

~~~js
function createColoredElement (w, h) {
  const point = document.createElement('div')
  point.style = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    background-color: ${ colorIterator.next().value};
  `
  return point
}
~~~

{{p67}}

~~~js
for (let x = 0; x < 75; x++) {
  document.body
    .appendChild(createColoredElement(400-x*5, 400-x*5))
}
~~~

{{{generators-4-1.js}}}

________________________________________________________________

{{p68}}
{{p69}}
{{p70}}

◘◘![ico-20 cap] ** 5**◘◘

~~~js
function * colorsGenerator () {
  const clr = () => Math.round(Math.random() * 255)

  while (true) {
    let counter = 10
    yield new Promise(resolve => requestAnimationFrame(function sigma () {
      if (counter-- > 0) requestAnimationFrame(sigma)
      else {
        counter = 10
        resolve(`rgb(${clr()}, ${clr()}, ${clr()})`)
      }
    }))
  }
}

const colorIterator = colorsGenerator()

async function showColors(num) {
  const res = colorIterator.next()
  const point = document.body
    .appendChild(document.createElement('div'))
  point.style = `
    float: left;
    width: 10px;
    height: 10px;
    background-color: ${await res.value};
  `;
  if (--num > 0) showColors(num)
}

showColors(50)
~~~

{{{generators-5.js}}}

________________________________________________________________

{{p71}}

◘◘![ico-20 cap] ** 6**◘◘

~~~js
const iterator = (function * (arg) {
  const add = user => Object.assign(document.body.appendChild(document.createElement('img')), {
    src: user.avatar_url,
    height: 100
  })
  while (true) {
    yield fetch(`https://api.github.com/users?since=${arg}`)
      .then(response => response.json())
      .then(users => users.forEach(user => add(user)))
    arg += 30
  }
})(0)


document.body.onmousewheel = () => iterator.next()
~~~

________________________________________

{{p72}}

◘◘![ico-20 cap] ** 7**◘◘

~~~~js
const user = {
  login: 'Сергей',
  avatar: 'images/207817_face_300x300.png',
  email: 'serg789@gmail.com',

  place (tagName) {
    return document.body.appendChild(document.createElement(tagName))
  },

  showAvatar () {
    return Object.assign(this.place('img'), {
      src: this.avatar,
      width: 70
    })
  },

  showLogin () {
    return Object.assign(this.place('h3'), {
      innerHTML: this.login
    })
  },

  showEmail () {
    return Object.assign(this.place('p'), {
      innerHTML: this.email
    })
  }
}
~~~~

{{p73}}

~~~js
user.generator = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{p74}}

~~~js
user.iterator = user.generator ()
~~~

{{p75}}

~~~js
while (!user.iterator.next().done) {}
~~~

{{p76}}

{{p77}}

{{p78}}
{{p79}}

{{p80}}

{{p81}}

~~~js
user[Symbol.iterator] = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{p82}}

~~~js
for (const prop of user) {}
~~~

{{p83}}

~~~js
console.log(...user)
~~~

{{{generators-7.js}}}

___________________________________________________________________

◘◘![ico-20 cap] ** 8**◘◘

~~~js
const elements = [
  { tagName: 'h1', attrs: { id: 'first', innerText: 'first' } },
  { tagName: 'h2', attrs: { id: 'second', innerText: 'second' } },
  { tagName: 'h3', attrs: { id: 'third', innerText: 'third' } },
  { tagName: 'p', attrs: { id: 'forth', innerText: 'forth' } }
]

elements[Symbol.iterator] = function * () {
  let itemNum = 0
  while (itemNum < this.length) {
    yield (() => {
      const elem = document.body
        .appendChild(document.createElement(this[itemNum].tagName))
      for (const attr in this[itemNum].attrs) elem[attr] = this[itemNum].attrs[attr]
      itemNum++
      return elem
    })()
  }
}

console.log(...elements)
~~~

{{{generators-8.js}}}

___________________________________________________

## ![ico-25 icon] {{p84}}

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const points = {
  first:  { val: { x: 400, y: 30, c: '#09b' }, nextPoint: 'second' },
  forth:  { val: { x: 100, y: 50, c: '#f50' }, nextPoint: 'fifth' },
  sixth:  { val: { x: 300, y: 120, c: '#090' }, nextPoint: null },
  third:  { val: { x: 200, y: 90, c: '#990' }, nextPoint: 'forth' },
  fifth:  { val: { x: 50,  y: 100, c: '#f0f' }, nextPoint: 'sixth' },
  second: { val: { x: 150, y: 150, c: '#0ff' }, nextPoint: 'third' }
}

points[Symbol.iterator] = function * () {
  let currentPoint = 'first'

  const draw = (point) => {
    const { x, y, c } = point
    document.body
      .appendChild(document.createElement('div'))
      .style = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${c};
        position: absolute;
        top: ${y}px;
        left: ${x}px;
      `
  }

  while (currentPoint) {
    draw(this[currentPoint].val)
    currentPoint = this[currentPoint].nextPoint
    yield currentPoint
  }
}

console.log(...points)
~~~

{{{generators-9.js}}}

___________________________________________________

{{p85}}

◘◘![ico-20 cap] ** 10**◘◘

~~~js
const objects = [
  { val: 'first',  nextItem: 'second' },
  { val: 'forth',  nextItem: 'fifth' },
  { val: 'sixth',  nextItem: null },
  { val: 'third',  nextItem: 'forth' },
  { val: 'fifth',  nextItem: 'sixth' },
  { val: 'second', nextItem: 'third' }
]
~~~

{{p86}}

{{p87}}

{{p88}}

~~~js
function * someGenerator (objs) {
  let currentItem = objs[0]
  let nextItem = objs[0]

  while (!!nextItem) {
    currentItem = nextItem
    nextItem = !!currentItem.nextItem && objs.find(x => currentItem.nextItem === x.val) || null
    yield currentItem.val
  }
}
~~~

{{p89}}

{{p90}}

~~~js
const iterator = someGenerator(objects)
~~~

{{p91}}

______________________________________

{{p92}}

~~~js
objects[Symbol.iterator] = function * () {
  let currentItem = this[0]
  let nextItem = this[0]

  while (!!nextItem) {
    currentItem = nextItem
    nextItem = !!currentItem.nextItem && this.find(x => currentItem.nextItem === x.val) || null
    yield currentItem.val
  }
}
~~~

{{p93}}

~~~js
for (const obj of objects) console.log(obj)
~~~

{{p94}}

~~~js
const [a, b, c, d] = objects
~~~

_________________________________________________________

## ![ico-25 icon] {{p95}}

{{p96}}
{{p97}}

{{p98}}

{{p99}}

{{p100}}

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

const ctx = canvas.getContext('2d')

const imageData = ctx.getImageData(left, top, width, height)
~~~

{{p101}}

~~~js
const data = imageData.data
~~~

{{p102}}
{{p103}}
{{p104}}
{{p105}}

{{p106}}

{{p107}}
{{p108}}


◘◘![ico-20 cap] ** 11**◘◘

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

;[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight]

canvas[Symbol.iterator] = function * () {
  const ctx = this.getContext('2d')

  let counter = 0

  do {
    const imageData = ctx.getImageData(0, counter, this.width, 1)
    const row = imageData.data
    for (let x = 0; x < row.length; x += 4) {
      for (let index = 0; index < 4; index++) row[x + index] += counter

      yield ctx.putImageData(imageData, 0, counter)

    }
  } while (counter++ < this.height)
}
~~~

{{p109}}

{{p110}}

~~~js
document.body.style = `
  background: #000;
  padding: 0;
  margin: 0;
`
~~~

{{p111}}
~~~js
for (const point of canvas) {}
~~~
{{common.c9}}
~~~js
console.log(...canvas)
~~~

{{p112}}

{{{generators-11.js}}}

{{p113}}

~~~js
const canvas = Object.assign(document.body.appendChild(document.createElement('canvas')), {
  width: window.innerWidth,
  height: window.innerHeight,
  [Symbol.iterator]: function * () {
    const ctx = this.getContext('2d')
    let counter = 0

    do {
      const imageData = ctx.getImageData(0, counter, this.width, 1)
      const row = imageData.data
      for (let x = 0; x < row.length; x += 4) {
        for (let index = 0; index < 4; index++) row[x + index] = Math.round(Math.random() * 255)

        yield ctx.putImageData(imageData, 0, counter)
      }
    } while (counter++ < this.height)
  }
})

for (const x of canvas) {}
~~~

{{{generators-11-1.js}}}

{{p114}}

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

;[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight]

const ctx = canvas.getContext('2d')

canvas[Symbol.iterator] = function * () {
  let counter = 0
  do {
    const [x, y] = [
      Math.round(Math.random() * this.width),
      Math.round(Math.random() * this.height)
    ]
    const imageData = ctx.getImageData(x, y, 1, 1)
    const point = imageData.data

    for (let index = 0; index < 4; index++) {
      point[index] += Math.round(Math.random() * 255)
    }

    yield ctx.putImageData(imageData, x, y)

  } while (counter++ < 1000)
}

for (const x of canvas) {}
~~~

_________________________________________________________

[![ico-30 hw] Quiz](quiz/gen)
