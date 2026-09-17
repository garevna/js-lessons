# ![ico-35 study] Promise

__________________________________________________________________________________________

[►►►callback►►►](page/Event-Loop#Callback)

__________________________________________________________________________________________

## ![ico-30 icon] {{common.c7}}

{{p1}}
{{p2}}

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

{{p3}}

~~~js
const promise = new Promise ()
~~~

![ico-20 err] {{topic.t8}}

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] {{p4}}

{{p5}}
{{p6}}

{{p7}}
{{p8}}

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

{{p9}}

~~~console
Start
Promise starts
End
~~~

{{p10}}
{{p11}}

_____________________________________

### ![ico-25 icon] {{p12}}

{{p13}}

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

{{p14}}
{{p15}}

{{p16}}

__________________________________________

### ![ico-25 icon] {{p17}}

{{p18}}

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

{{p19}}

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

{{p20}}
{{p21}}

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

{{p22}}
{{p23}}

{{p24}}
{{p25}}

{{p26}}

| **pending** | **fulfilled** | **rejected** |
{{p27}}

_________________________________________

![ico-35 coffee]

{{p28}}

{{p29}}
{{p30}}
{{p31}}
{{p32}}

{{p33}}

{{p34}}
{{p35}}
{{p36}}

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

{{p37}}
{{p38}}

{{p39}}

{{p40}}

_______________________________________________________

### ![ico-25 icon] {{p41}}

{{p42}}

{{p43}}
{{p44}}

{{p45}}

{{p46}}

{{p47}}
{{p48}}

~~~js
Promise.resolve('Access granted.').then()
~~~

{{common.c6}}

~~~js
Promise.resolve('Access granted.').then(10)
~~~

{{p49}}

~~~js
Promise.resolve('Access granted.')
~~~

{{p50}}

{{p51}}

{{p52}}

#### ![ico-20 icon] catch

{{p53}}

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

{{p54}}
{{p55}}

☼☼☼ {{p56}} ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

{{p57}}

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

{{p58}}

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

## ![ico-30 icon] {{p59}}

{{p60}}
{{p61}}
{{p62}}
{{p63}}

{{p64}}

{{p65}}
{{p66}}

{{p67}}
{{p68}}
{{p69}}
{{p70}}
{{p71}}
{{p72}}
{{p73}}

{{p74}}

{{p75}}
{{p76}}

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

{{p77}}
{{p78}}

{{p79}}
{{p80}}
{{p81}}

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

{{p82}}
{{p83}}

{{p84}}
{{p85}}

{{p86}}

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

{{p87}}

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

{{p88}}

~~~console
Start
End
Time: 24/ 36
~~~

{{p89}}
{{p90}}

{{p91}}
{{p92}}

{{p93}}

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

{{p94}}

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

{{p95}}

{{{promise-03.js}}}

{{p96}}
{{p97}}

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] {{p98}}

{{p99}}
{{p100}}

{{p101}}

@@@@
{{p102}}
![](illustrations/promise-all.jpg)
@@@@

{{p103}}
{{p104}}
{{p105}}

{{p106}}

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

{{p107}}

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

{{p108}}
{{p109}}

{{p110}}
{{p111}}

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

{{p112}}

@@@@
{{p113}}
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

{{p114}}
{{p115}}

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

{{p116}}

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

{{p117}}

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

{{p118}}
{{p119}}
{{p120}}

{{p121}}
{{p122}}
{{p123}}

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

{{p124}}

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

{{p125}}
{{p126}}

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

{{p127}}

~~~js
Promise.allSettled(promises).then(console.log)
~~~

{{p128}}

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

{{p129}}

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

{{p130}}
______________________________________________

### ![ico-20 icon] Promise.race

{{p131}}
{{p132}}
{{p133}}

{{p134}}

{{p135}}

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

## ![ico-25 icon] {{common.c10}}

{{p136}}
{{p137}}
{{p138}}


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

{{p139}}

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

{{p140}}

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

{{p141}}

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

| [![ico-25 plunker] **13**](https://plnkr.co/edit/99ajm1Z3jcpKQQoE) | [![ico-25 plunker] **14**](https://plnkr.co/edit/DIStxeDAPpXmhSTw) | [![ico-70 replit] **15**](https://repl.it/@garevna/promise-sample-1) |

__________________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/promise)
