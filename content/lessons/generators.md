# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

__________________________________________

{{s1.p5}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

______________________________

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

___________________________

{{s2.p7}}

{{s2.p8}}
{{s2.p9}}

{{s2.p10}}

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

{{s2.p11}}

~~~js
for (const name of browsers) {
  console.log(name)
}
~~~

{{{generators-1.js}}}


{{s2.p12}}

~~~js
console.log(...browsers)
~~~

~~~console
Google Mozilla Safari
~~~

{{s2.p13}}

{{s2.p14}}

______________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}
{{s3.p7}}
{{s3.p8}}

~~~js
const iterator = generator(...)
~~~

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}
{{s3.p13}}
{{s3.p14}}

{{s3.p15}}

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}
{{s3.p19}}


~~~js
function* generator (...) {
  ...
  yield ...
  ...
  yield ...
  ...
}
~~~

{{s3.p20}}

____________________

{{s3.p21}}

~~~js
const browsers = {
  [Symbol.iterator]: function * () {
    yield 'Google'
    yield 'Mozilla'
    yield 'Safari'
  }
}
~~~

{{s3.p22}}

_________________

{{s3.p23}}

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

{{s3.p24}}
{{s3.p25}}
{{s3.p26}}

___________________________


## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}
{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

### {{s5.h1}}

{{s5.p1}}

~~~js
function recurse (arg) {
  console.log(arg++)
  recurse(arg)
}

recurse(1)
~~~

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

~~~js
const lazyEvaluatedInfiniteList = (function * recurse (arg) {
  while (true) { yield arg++ }
})(0)

for (let x = 0; x < 12000; x++) {
  console.log(lazyEvaluatedInfiniteList.next().value)
}
~~~

{{s5.p5}}

{{s5.p6}}
{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}

______________________________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}
{{s6.p5}}

_____________________________________________________________

{{s6.p6}}

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

{{s6.p7}}

~~~js
const colorIterator = (function * () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
})()
~~~

{{s6.p8}}

{{s6.p9}}

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

{{s6.p10}}

~~~js
for (let x = 0; x < 75; x++) {
  document.body
    .appendChild(createColoredElement(400-x*5, 400-x*5))
}
~~~

{{{generators-4-1.js}}}

________________________________________________________________

{{s6.p11}}
{{s6.p12}}
{{s6.p13}}

{{s6.p14}}

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

{{s6.p15}}

{{s6.p16}}

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

{{s6.p17}}

{{s6.p18}}

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

{{s6.p19}}

~~~js
user.generator = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{s6.p20}}

~~~js
user.iterator = user.generator ()
~~~

{{s6.p21}}

~~~js
while (!user.iterator.next().done) {}
~~~

{{s6.p22}}

{{s6.p23}}

{{s6.p24}}
{{s6.p25}}

{{s6.p26}}

{{s6.p27}}

~~~js
user[Symbol.iterator] = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

{{s6.p28}}

~~~js
for (const prop of user) {}
~~~

{{s6.p29}}

~~~js
console.log(...user)
~~~

{{{generators-7.js}}}

___________________________________________________________________

{{s6.p30}}

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

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

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

{{s7.p2}}

{{s7.p3}}

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

{{s7.p4}}

{{s7.p5}}

{{s7.p6}}

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

{{s7.p7}}

{{s7.p8}}

~~~js
const iterator = someGenerator(objects)
~~~

{{s7.p9}}

______________________________________

{{s7.p10}}

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

{{s7.p11}}

~~~js
for (const obj of objects) console.log(obj)
~~~

{{s7.p12}}

~~~js
const [a, b, c, d] = objects
~~~

_________________________________________________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}

{{s8.p3}}

{{s8.p4}}

{{s8.p5}}

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

const ctx = canvas.getContext('2d')

const imageData = ctx.getImageData(left, top, width, height)
~~~

{{s8.p6}}

~~~js
const data = imageData.data
~~~

{{s8.p7}}
{{s8.p8}}
{{s8.p9}}
{{s8.p10}}

{{s8.p11}}

{{s8.p12}}
{{s8.p13}}


{{s8.p14}}

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

{{s8.p15}}

{{s8.p16}}

~~~js
document.body.style = `
  background: #000;
  padding: 0;
  margin: 0;
`
~~~

{{s8.p17}}
~~~js
for (const point of canvas) {}
~~~
{{s8.p18}}
~~~js
console.log(...canvas)
~~~

{{s8.p19}}

{{{generators-11.js}}}

{{s8.p20}}

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

{{s8.p21}}

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

{{s8.p22}}
