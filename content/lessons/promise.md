# ![ico-35 study] Promise

__________________________________________________________________________________________

[►►►callback►►►](page/Event-Loop#Callback)

__________________________________________________________________________________________

## ![ico-30 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

{{s1.p3}}

~~~js
const promise = new Promise ()
~~~

{{s1.p4}}

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}
{{s2.p4}}

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

{{s2.p5}}

~~~console
Start
Promise starts
End
~~~

{{s2.p6}}
{{s2.p7}}

_____________________________________

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

~~~js
const promise = new Promise(() => console.log('Promise starts'))
console.log(promise)
~~~

~~~console
Promise starts

▼ Promise {<pending>}
  ▼ [[Prototype]]: Promise
    ► catch: ƒ catch()
    ► constructor: ƒ Promise()
    ► finally: ƒ finally()
    ► then: ƒ then()
      Symbol(Symbol.toStringTag): "Promise"
    ► [[Prototype]]: Object
    [[PromiseState]]: "pending"
    [[PromiseResult]]: undefined
~~~

{{s3.p2}}
{{s3.p3}}

{{s3.p4}}

__________________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

~~~js
console.dir(Promise)
~~~

~~~console
▼ ƒ Promise()
  ►  all: ƒ all()
  ►  allSettled: ƒ allSettled()
  ► any: ƒ any()
  length: 1
  name: "Promise"
  ► prototype: Promise {Symbol(Symbol.toStringTag): 'Promise', then: ƒ, catch: ƒ, finally: ƒ}
  ► race: ƒ race()
  ► reject: ƒ reject()
  ► resolve: ƒ resolve()
  ► withResolvers: ƒ withResolvers()
  ► Symbol(Symbol.species): ƒ Promise()
  ► Symbol(Symbol.species): ƒ Promise()
    arguments: (...)
    caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

{{s4.p2}}

~~~js
const promise = Promise.resolve('Hello')
console.log(promise)
~~~

~~~console
▼ Promise {<fulfilled>: 'Hello'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: "Hello"
~~~

{{s4.p3}}
{{s4.p4}}

~~~js
const promise = Promise.reject('Access denied.')
console.log(promise)
~~~

~~~console
▼ Promise {<rejected>: 'Access denied.'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "Access denied."
~~~

{{s4.p5}}
{{s4.p6}}

{{s4.p7}}
{{s4.p8}}

{{s4.p9}}

| **pending** | **fulfilled** | **rejected** |
{{s4.p10}}

_________________________________________

![ico-35 coffee]

{{s4.p11}}

{{s4.p12}}
{{s4.p13}}
{{s4.p14}}
{{s4.p15}}

{{s4.p16}}

{{s4.p17}}
{{s4.p18}}
{{s4.p19}}

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

{{s4.p20}}
{{s4.p21}}

{{s4.p22}}

{{s4.p23}}

_______________________________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}
{{s5.p7}}

~~~js
Promise.resolve('Access granted.').then()
~~~

{{s5.p8}}

~~~js
Promise.resolve('Access granted.').then(10)
~~~

{{s5.p9}}

~~~js
Promise.resolve('Access granted.')
~~~

{{s5.p10}}

{{s5.p11}}

{{s5.p12}}

#### ![ico-20 icon] catch

{{s5.p13}}

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

{{s5.p14}}
{{s5.p15}}

☼☼☼ {{s5.slogan1}} ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

{{s5.p16}}

~~~js
console.log('Start')
Promise.resolve('Access granted.').then(console.log, console.log)
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
~~~

#### ![ico-20 icon] finally

{{s5.p17}}

~~~js
console.log('Start')
Promise.resolve('Access granted.')
  .then(console.log, console.log)
  .finally(() => console.log('Finally'))
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
Finally
~~~
______________________________________________

## ![ico-30 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}
{{s6.p4}}

{{s6.p5}}

{{s6.p6}}
{{s6.p7}}

{{s6.p8}}
{{s6.p9}}
{{s6.p10}}
{{s6.p11}}
{{s6.p12}}
{{s6.p13}}
{{s6.p14}}

{{s6.p15}}

{{s6.p16}}
{{s6.p17}}

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

{{s6.p18}}
{{s6.p19}}

{{s6.p20}}
{{s6.p21}}
{{s6.p22}}

◘◘![ico-25 coffee] ** 2**◘◘
~~~js
const promise = (function (startTime) {
  const interval = Math.round(Math.random() * 5000)

  function recurse (callback) {
    Date.now() - startTime < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(Date.now() - startTime)
  }

  return new Promise(resolve => recurse(resolve))
})(Date.now())

promise.then(console.log)
~~~

{{s6.p23}}
{{s6.p24}}

{{s6.p25}}
{{s6.p26}}

{{s6.p27}}

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

{{s6.p28}}

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

{{s6.p29}}

~~~console
Start
End
Time: 24/ 36
~~~

{{s6.p30}}
{{s6.p31}}

{{s6.p32}}
{{s6.p33}}

{{s6.p34}}

~~~js
function createPromise (startTime, title) {
  const interval = Math.round(Math.random() * 5000)
  function recurse (callback) {
    const time = Date.now() - startTime
    time < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(`${title}: ${Date.now() - startTime}`)
  }
  return new Promise(resolve => recurse(resolve))
}
~~~

{{s6.p35}}

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

{{s6.p36}}

{{{promise-03.js}}}

{{s6.p37}}
{{s6.p38}}

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}

{{s7.p3}}

@@@@
{{s7.p4}}
![](illustrations/promise-all.jpg)
@@@@

{{s7.p5}}
{{s7.p6}}
{{s7.p7}}

{{s7.p8}}

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

{{s7.p9}}

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))

const results = []
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(value => { results[index] = { time: Date.now() - start, value } }))
~~~

{{{promise-arrays-02.js}}}

{{s7.p10}}
{{s7.p11}}

{{s7.p12}}
{{s7.p13}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

const results = new Array(promises.length).fill(null)
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(response => { results[index] = response }))

function recurse (resolve) {
  results.filter(item => !item).length
    ? setTimeout(recurse.bind(null, resolve), 400)
    : resolve(results)
}

const promise = new Promise(resolve => recurse(resolve))

promise.then(console.log)
~~~

{{s7.p14}}

@@@@
{{s7.p15}}
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

{{s7.p16}}
{{s7.p17}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const create = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time))
const show = message => document.body.appendChild(document.createElement('p')).innerText = message

const promises = [
  create('Hello', 1000),
  create('Bye', 3000),
  create('How are you?', 2000)
]

Promise.all(promises)
  .then(responses => responses.forEach(show))
~~~

{{s7.p18}}

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

{{s7.p19}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)
let results = null

const start = Date.now()

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

Promise.all(promises)
  .then(responses => { results = responses })
  .then(() => console.log(results))
~~~

______________________________________________

### ![ico-20 icon] Promise.allSettled

{{s7.p20}}
{{s7.p21}}
{{s7.p22}}

{{s7.p23}}
{{s7.p24}}
{{s7.p25}}

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

{{s7.p26}}

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

{{s7.p27}}
{{s7.p28}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const getURLs = fileName => ['icons', 'images', 'files', 'sounds']
  .map(folder => `https://garevna.github.io/js-lessons/${folder}/${fileName}`)

function testURL (src) {
  return new Promise ((resolve, reject) => {
    const img = Object.assign(new Image(48), {
      onload (event) {
        resolve(img)
      },
      onerror (event) {
        reject(`Image ${src} does not exist.`)
      },
      src
    })
  })
}

const promises = getURLs('coffee.png').map(url => testURL(url))
~~~

{{s7.p29}}

~~~js
Promise.allSettled(promises).then(console.log)
~~~

{{s7.p30}}

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

{{s7.p31}}

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

{{s7.p32}}
______________________________________________

### ![ico-20 icon] Promise.race

{{s7.p33}}
{{s7.p34}}
{{s7.p35}}

{{s7.p36}}

{{s7.p37}}

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))

const getURLs = () => ['brynary', 'stocad', 'holin', 'mojombo', 'Bill']
  .map(id => `https://api.github.com/users/${id}`)

const show = response => {
  const text = addElem('h4')
  if (response.avatar_url) {
    Object.assign(addElem('img'), {
      src: response.avatar_url,
      width: 150
    })
    text.innerText = `${response.id}: ${response.login}`
  } else {
    text.innerText = response.message.replaceAll('. ', '.\n')
    text.style.color = '#a00'
  }
}

function getPromise (url) {
  return new Promise ((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(resolve)
  })
}

const promises = getURLs().map(url => getPromise(url))

Promise.race(promises).then(show)
~~~

{{{promise-race.js}}}
__________________________________________________________________________________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}


◘◘![ico-25 cap] **10**◘◘

~~~js
navigator.getBattery()
  .then(result => {
    for (const prop in result) {
      console.log(`${prop}: ${result[prop]}`)
    }
})
~~~

__________________________________________________________________________________________

◘◘![ico-25 cap] **11**◘◘

~~~js
const boy = [
  'Hi, what\'s your name?',
  'And I\'m Robert. Where do you live?',
  'In Lviv. Do you work or study?',
  'Me too. Okay, see you later, good luck!'
]

const girl = [
  'Hi, I\'m Helen, and you?',
  'In Kharkov. And where are you?',
  'I study and work. And you?',
  'Thanks, mutually!'
]

function output () {
  console.log(this.shift())
  return this[0]
}

boySpeak = output.bind(boy)
girlSpeak = output.bind(girl)

new Promise(resolve => resolve())
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)

new Promise(resolve => resolve())
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
~~~

______________________________________________________________

{{s8.p4}}

~~~~js
Object.defineProperty(Error.prototype, 'name', {
  get () { return this.errorNames[this.code] }
})

Object.defineProperty(Error.prototype, 'message', {
  get () { return this.messages[this.code] }
})

Object.assign(Error.prototype, {
  errorNames: [
    'CustomError',
    'RandomError',
    'FatalError',
    'GameOver',
    'Shit',
    'FuckingError',
    'StrangeError',
    'XSS',
    'DoS',
    'DDoS'
  ],
  messages: [
    'Not authorized.',
    'Something happens...',
    'Access denied.',
    'Try another way.',
    'You are the kremlin troll.',
    'Operation failed.',
    'Unknown operation.',
    'Malicious code injection.',
    'Denial-of-service attack.',
    'Distributed denial-of-service attack.'
  ]
})
~~~~

{{s8.p5}}

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

{{s8.p6}}

◘◘![ico-25 cap] **12**◘◘

~~~js
const func = callback => callback(Object.assign(new Error(), { code: Math.round(Math.random() * 9) }))

const getError = (resolve, reject) => setTimeout(func.bind(null, reject), Math.random() * 10000)

for (let num = 0; num < 10; num++) {
  new Promise(getError)
    .then(null, console.warning)
}
~~~

{{{promise-12.js}}}

________________________________

| [![ico-25 plunker] **13**](https://plnkr.co/edit/99ajm1Z3jcpKQQoE ) | [![ico-25 plunker] **14**](https://plnkr.co/edit/DIStxeDAPpXmhSTw ) | [![ico-70 replit] **15**](https://repl.it/@garevna/promise-sample-1 ) |

__________________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/promise)
