# ![ico-35 study] {{s1.h1}}

__________________________________________________________________________________________

{{s1.p1}}

__________________________________________________________________________________________

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

{{s2.p3}}

~~~js
const promise = new Promise ()
~~~

{{s2.p4}}

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}
{{s3.p4}}

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

{{s3.p5}}

~~~console
Start
Promise starts
End
~~~

{{s3.p6}}
{{s3.p7}}

_____________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

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

{{s4.p2}}
{{s4.p3}}

{{s4.p4}}

__________________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

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

{{s5.p2}}

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

{{s5.p3}}
{{s5.p4}}

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

{{s5.p5}}
{{s5.p6}}

{{s5.p7}}
{{s5.p8}}

{{s5.p9}}

{{s5.p10}}
{{s5.p11}}

_________________________________________

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}
{{s5.p15}}
{{s5.p16}}
{{s5.p17}}

{{s5.p18}}

{{s5.p19}}
{{s5.p20}}
{{s5.p21}}

{{s5.p22}}
{{s5.p23}}
{{s5.p24}}
{{s5.p25}}

{{s5.p26}}
{{s5.p27}}

{{s5.p28}}

{{s5.p29}}

_______________________________________________________

### ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}
{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}
{{s6.p7}}

~~~js
Promise.resolve('Access granted.').then()
~~~

{{s6.p8}}

~~~js
Promise.resolve('Access granted.').then(10)
~~~

{{s6.p9}}

~~~js
Promise.resolve('Access granted.')
~~~

{{s6.p10}}

{{s6.p11}}

{{s6.p12}}

#### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

{{s7.p2}}
{{s7.p3}}

☼☼☼ {{s7.slogan1}} ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

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

#### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

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

## ![ico-30 icon] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}
{{s10.p4}}

{{s10.p5}}

{{s10.p6}}
{{s10.p7}}

{{s10.p8}}
{{s10.p9}}
{{s10.p10}}
{{s10.p11}}
{{s10.p12}}
{{s10.p13}}
{{s10.p14}}

{{s10.p15}}

{{s10.p16}}
{{s10.p17}}

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

{{s10.p18}}
{{s10.p19}}

{{s10.p20}}
{{s10.p21}}
{{s10.p22}}

{{s10.p23}}
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

{{s10.p24}}
{{s10.p25}}

{{s10.p26}}
{{s10.p27}}

{{s10.p28}}

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

{{s10.p29}}

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

{{s10.p30}}

~~~console
Start
End
Time: 24/ 36
~~~

{{s10.p31}}
{{s10.p32}}

{{s10.p33}}
{{s10.p34}}

{{s10.p35}}

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

{{s10.p36}}

{{s10.p37}}
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

{{s10.p38}}

{{{promise-03.js}}}

{{s10.p39}}
{{s10.p40}}

{{s10.p41}}
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] {{s11.h1}}

{{s11.p1}}
{{s11.p2}}

{{s11.p3}}

{{s11.p4}}
{{s11.p5}}
![](illustrations/promise-all.jpg)
{{s11.p6}}

{{s11.p7}}
{{s11.p8}}
{{s11.p9}}

{{s11.p10}}

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

{{s11.p11}}

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

{{s11.p12}}
{{s11.p13}}

{{s11.p14}}
{{s11.p15}}

{{s11.p16}}

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

{{s11.p17}}

{{s11.p18}}
{{s11.p19}}
![](illustrations/promises-collection.png)
{{s11.p20}}

__________________________________________

### ![ico-20 icon] {{s12.h1}}

{{s12.p1}}
{{s12.p2}}

{{s12.p3}}

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

{{s12.p4}}

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

{{s12.p5}}

{{s12.p6}}

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

### ![ico-20 icon] {{s13.h1}}

{{s13.p1}}
{{s13.p2}}
{{s13.p3}}

{{s13.p4}}
{{s13.p5}}
{{s13.p6}}

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] {{s14.h1}}

{{s14.p1}}

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

{{s14.p2}}
{{s14.p3}}

{{s14.p4}}

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

{{s14.p5}}

~~~js
Promise.allSettled(promises).then(console.log)
~~~

{{s14.p6}}

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

{{s14.p7}}

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

{{s14.p8}}
______________________________________________

### ![ico-20 icon] {{s15.h1}}

{{s15.p1}}
{{s15.p2}}
{{s15.p3}}

{{s15.p4}}

{{s15.p5}}

{{s15.p6}}

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

## ![ico-25 icon] {{s16.h1}}

{{s16.p1}}
{{s16.p2}}
{{s16.p3}}


{{s16.p4}}

~~~js
navigator.getBattery()
  .then(result => {
    for (const prop in result) {
      console.log(`${prop}: ${result[prop]}`)
    }
})
~~~

__________________________________________________________________________________________

{{s16.p5}}

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

{{s16.p6}}

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

{{s16.p7}}

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

{{s16.p8}}

{{s16.p9}}

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

{{s16.p10}}

__________________________________________________________________________________________

{{s16.p11}}
