# ![ico-30 study] {{common.c30}}

**ES 2015**

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}

__________________________________________

{{s1.p4}}

## ![ico-25 icon] Symbol.iterator

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

______________________________

{{s1.p8}}
{{s1.p9}}
{{s1.p10}}

___________________________

**Design pattern "~Iterator~"**

{{s1.p11}}
{{s1.p12}}

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

{{s1.p13}}

~~~js
for (const name of browsers) {
  console.log(name)
}
~~~

{{{generators-1.js}}}


{{s1.p14}}

~~~js
console.log(...browsers)
~~~

~~~console
Google Mozilla Safari
~~~

{{s1.p15}}

{{s1.p16}}

______________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

~~~js
const iterator = generator(...)
~~~

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

{{s2.p15}}

{{s2.p16}}
{{s2.p17}}
{{s2.p18}}
{{s2.p19}}


~~~js
function* generator (...) {
  ...
  yield ...
  ...
  yield ...
  ...
}
~~~

{{s2.p20}}

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

{{s2.p21}}

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

{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

___________________________


## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}
{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

### lazy evaluation

{{s3.p8}}

~~~js
function recurse (arg) {
  console.log(arg++)
  recurse(arg)
}

recurse(1)
~~~

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

~~~js
const lazyEvaluatedInfiniteList = (function * recurse (arg) {
  while (true) { yield arg++ }
})(0)

for (let x = 0; x < 12000; x++) {
  console.log(lazyEvaluatedInfiniteList.next().value)
}
~~~

{{s3.p12}}

{{s3.p13}}
{{s3.p14}}
{{s3.p15}}
{{s3.p16}}
{{s3.p17}}

______________________________________________________________

## ![ico-25 icon] next()

{{s3.p18}}

{{s3.p19}}

{{s3.p20}}

{{s3.p21}}
{{s3.p22}}

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

{{s3.p23}}

~~~js
const colorIterator = (function * () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
})()
~~~

{{s3.p24}}

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

{{s3.p25}}

~~~js
for (let x = 0; x < 75; x++) {
  document.body
    .appendChild(createColoredElement(400-x*5, 400-x*5))
}
~~~

{{{generators-4-1.js}}}

________________________________________________________________

{{s3.p26}}
{{s3.p27}}
{{s3.p28}}

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

{{s3.p29}}

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

{{s3.p30}}

◘◘![ico-20 cap] ** 7**◘◘

~~~~js
const user = {
  login: 'Сергей',
  avatar: 'https://www.shareicon.net/data/2015/12/14/207817_face_300x300.png',
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

{{s3.p31}}

~~~js
user.generator = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{s3.p32}}

~~~js
user.iterator = user.generator ()
~~~

{{s3.p33}}

~~~js
while (!user.iterator.next().done) {}
~~~

{{s3.p34}}

{{s3.p35}}

{{s3.p36}}
{{s3.p37}}

{{s3.p38}}

{{s3.p39}}

~~~js
user[Symbol.iterator] = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{s3.p40}}

~~~js
for (const prop of user) {}
~~~

{{s3.p41}}

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

## ![ico-25 icon] {{s4.h1}}

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

{{s4.p1}}

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

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

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

{{s4.p5}}

{{s4.p6}}

~~~js
const iterator = someGenerator(objects)
~~~

{{s4.p7}}

______________________________________

{{s4.p8}}

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

{{s4.p9}}

~~~js
for (const obj of objects) console.log(obj)
~~~

{{s4.p10}}

~~~js
const [a, b, c, d] = objects
~~~

_________________________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

const ctx = canvas.getContext('2d')

const imageData = ctx.getImageData(left, top, width, height)
~~~

{{s5.p6}}

~~~js
const data = imageData.data
~~~

{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}

{{s5.p11}}

{{s5.p12}}
{{s5.p13}}


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

{{s5.p14}}

{{s5.p15}}

~~~js
document.body.style = `
  background: #000;
  padding: 0;
  margin: 0;
`
~~~

{{s5.p16}}
~~~js
for (const point of canvas) {}
~~~
{{common.c13}}
~~~js
console.log(...canvas)
~~~

{{s5.p18}}

{{{generators-11.js}}}

{{s5.p19}}

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

{{s5.p20}}

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
