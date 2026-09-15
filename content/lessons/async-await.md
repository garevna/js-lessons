# ![ico-30 study] async | await

**ECMAScript 2017**

________________________________________________________________________________________________

{{s0.p1}}

________________________________________________________________________________________________

{{s0.p2}}
{{s0.p3}}
{{s0.p4}}
{{s0.p5}}

## ![ico-25 icon] async function

{{s0.p6}}

~~~js
async function sigma () {
  ...
}
~~~

{{s0.p7}}

~~~js
const sayHello = async () => 'Hello'
~~~

{{s0.p8}}

{{s0.p9}}

{{s0.p10}}

{{s0.p11}}

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

{{s0.p12}}

~~~js
const createPromise = async message => message
~~~

{{s0.p13}}

{{s0.p14}}

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

{{s0.p15}}
{{s0.p16}}

______________________________________________

{{s0.p17}}
{{s0.p18}}

~~~js
const section = document.body
section.style = 'padding: 120px;'
~~~

{{s0.p19}}

~~~js
function createPoint (x, y, color = '#f50') {
  const point = section
    .appendChild(document.createElement('span'))
  point.innerText = '•'
  point.style = `
    position: relative;
    left: ${x.toFixed(2)}px;
    top: ${y.toFixed(2)}px;
    color: ${color};
  `
}
~~~

{{s0.p20}}

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

{{s0.p21}}

{{s0.p22}}

◘◘![ico-25 cap] ** 1**◘◘
~~~js
const recurse = (times => {
  let counter = 0
  let promise = (async () => sin(0))().then(cos(0))
  return function () {
    promise = promise
      .then(sin.bind(null, counter))
      .then(cos.bind(null, counter))
    counter++ < times && recurse()
  }
})(20)

recurse()
~~~

{{{async-await-01.js}}}

{{s0.p23}}
{{s0.p24}}

^^^[![ico-30 eyes]]

{{s0.p25}}

~~~js
const start = () => (async () => sin())().then(cos)

start()
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
~~~

{{s0.p26}}

^^^

{{s0.p27}}
{{s0.p28}}

{{s0.p29}}

_________________________________________

{{s0.p30}}

{{s0.p31}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const recurseSin = (times => {
  let counter = 0
  let promise = (async () => sin(0))()
  return function () {
    promise = promise.then(sin.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseSin)
  }
})(20)

const recurseCos = (times => {
  let counter = 0
  let promise = (async () => cos(0))()
  return function () {
    promise = promise.then(cos.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseCos)
  }
})(20)

recurseSin()
recurseCos()
~~~

{{{async-await-02.js}}}

________________________

{{s0.p32}}

~~~js
const start = Date.now()

function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 5000 && requestAnimationFrame(figure.move)
    }
  })
}
~~~

{{s0.p33}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

{{s0.p34}}
{{s0.p35}}

________________________________________________________________________________________________

## ![ico-25 icon] await

{{s0.p36}}

{{s0.p37}}

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

{{s0.p38}}
{{s0.p39}}
{{s0.p40}}
{{s0.p41}}

{{s0.p42}}
{{s0.p43}}
{{s0.p44}}
{{s0.p45}}

{{s0.p46}}
{{s0.p47}}

_____________________________________

### ![ico-20 icon] await &lt;promise>

{{s0.p48}}

{{s0.p49}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

{{s0.p50}}
{{s0.p51}}

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

{{s0.p52}}

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

{{s0.p53}}

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

{{s0.p54}}
{{s0.p55}}
{{s0.p56}}
{{s0.p57}}
~~~js
await createPromise('Resolved!')
~~~
{{s0.p58}}
{{s0.p59}}

~~~js
new Promise((resolve, reject) => {
  console.log('resolve:\n', resolve)
  console.log('reject:\n', reject)
})
~~~

~~~console
resolve:
 ƒ () { [native code] }
reject:
 ƒ () { [native code] }
~~~

{{s0.p60}}
{{s0.p61}}
{{s0.p62}}
{{s0.p63}}

{{s0.p64}}

~~~js
result => result
~~~

{{s0.p65}}
◘◘resolve◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.resolve('Success.'))
test()
~~~

~~~console
Result:  Success.
~~~

◘◘reject◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.reject('Failure.'))
test()
~~~

~~~error
    Uncaught (in promise) Failure.
~~~

{{s0.p66}}

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

{{s0.p67}}
{{s0.p68}}

{{s0.p69}}

~~~js
const test = async () => {
  const result = await Promise.reject('Failure.')
    .catch(console.warn)
  result && console.log('Result: ', result)
}
test()
~~~

~~~warn
    Failure.
~~~
_____________________________________________

{{s0.p70}}

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

{{s0.p71}}

◘◘**^^Promise^^**◘◘

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

{{s0.p72}}

{{s0.p73}}

◘◘**^^async function^^**◘◘

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

{{s0.p74}}

~~~error
    Uncaught (in promise) Failure.
~~~

{{s0.p75}}

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

{{s0.p76}}
{{s0.p77}}

_____________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const user = {
  name: 'Polina',
  then (callback) {
    callback(this.name)
  }
}

user.then(console.log)
console.log('finish')
~~~
~~~console
Polina
finish
~~~

{{s1.p2}}

{{s1.p3}}

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

{{s1.p4}}
{{s1.p5}}

{{s1.p6}}

{{s1.p7}}
{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}

{{s1.p12}}
{{s1.p13}}

{{s1.p14}}

{{s1.p15}}

~~~js
response => response
~~~

{{s1.p16}}

{{s1.p17}}

{{s1.p18}}
{{s1.p19}}

~~~js
const user = {
  name: 'Polina',
  then () {
    console.log(this.name)
  }
}

;(async () => {
  await user
  console.log('Hi from Event Loop')
})()

console.log('finish')
~~~

~~~console
finish
Polina
~~~

{{s1.p20}}

~~~js
console.log('Hi from Event Loop')
~~~

{{s1.p21}}
{{s1.p22}}
{{s1.p23}}
{{s1.p24}}
{{s1.p25}}

_____________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

@@@@ 2
{{s2.p4}}
![](illustrations/white-and-black.png)
@@@@

~~~~js
const getStatus = async () => Math.random() > .5 ? 'white' : 'black'

const func = ((startTime, callback) => {
  const time = Math.round(Math.random() * 30000)
  return async timeStamp => {
    const interval = timeStamp - startTime
    if (interval < time) requestAnimationFrame(func)
    else callback(await getStatus())
  }
})(0, console.log)

requestAnimationFrame(func)
~~~~

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}

{{s2.p11}}

{{s2.p12}}

{{s2.p13}}
{{s2.p14}}

{{{async-await-05.js}}}

{{s2.p15}}

{{s2.p16}}
{{s2.p17}}

{{s2.p18}}
{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

_________________________________________

### ![ico-20 icon] await &lt;expression>

{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

{{s2.p25}}

~~~js
response => response
~~~
{{s2.p26}}

{{s2.p27}}

{{s2.p28}}
{{s2.p29}}

{{s2.p30}}

◘◘![ico-25 cap] ** 6**◘◘
~~~js
console.log('Start')
;(async function () {
  console.log('Async function starts')
  console.log(await 'Hello!')
  console.log('Async function finished')
})()
console.log('Finish')
~~~

{{s2.p31}}

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

{{s2.p32}}
{{s2.p33}}

{{s2.p34}}
{{s2.p35}}
{{s2.p36}}
~~~js
console.log(await 'Hello!')
~~~
{{s2.p37}}
{{s2.p38}}
{{s2.p39}}

{{s2.p40}}

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

{{s2.p41}}

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

{{s2.p42}}

~~~js
console.log('Finish')
~~~

{{s2.p43}}

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

{{s2.p44}}

{{s2.p45}}

_____________________________________________

## ![ico-20 icon] {{common.c10}}

### ![ico-25 cap] 7

◘◘![ico-25 cap] ** 7**◘◘

~~~js
console.log('Start')

;(async function test (callback) {
  const inputs = []
  inputs.push(await 5)
  inputs.push(await 7)
  inputs.push(await 9)
  const result = inputs
    .reduce((res, num) => res += num)
  callback(await result)
})(console.log)

console.log('Finish')
~~~

{{s3.p1}}

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8

{{s3.p2}}
{{s3.p3}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
let num = 5

async function sample (arg) {
  num = await arg
}

sample(10)
  .then(() => console.log(`Finish value: ${num}`))

console.log('Start value: ', num)
~~~

••Start value:  5••
••Finish value: 10••

_________________________________

### ![ico-25 cap] 9

◘◘![ico-25 cap] ** 9**◘◘

~~~js
async function getUser (userNum) {
  return (await (await fetch(`https://api.github.com/users/${userNum}`)).json()).name
}

getUser(5)
  .then(console.log)
~~~

**Output**:

••Yuriy Semchyshyn••

_____________________________________

### ![ico-25 cap] 10

◘◘![ico-25 cap] **10**◘◘

~~~js
const browsers = ['Chrome', 'Mozilla', 'Safari', 'IE']

browsers.then = (function () {
  let current = 0

  return function (resolve) {
    const response = {
      value: this[current++],
      done: current > this.length
    }

    setTimeout(() => resolve.call(null, response), 1000)
  }
})()

async function showBrowsers () {
  do {
    var { done, value } = await browsers

    console.log(`{ value: ${value}, done: ${done} }`)
  } while (!done)
}

showBrowsers ()
~~~

{{{async-await-6.js}}}

____________________________________________________________

### ![ico-25 cap] 11

◘◘![ico-25 cap] **11**◘◘

~~~js
(function demo (maxValue) {
  const placeholder = document.body
    .appendChild(document.createElement('h3'))

  while (maxValue--) {
    const number = maxValue
    setTimeout(async () => Object.assign(placeholder, {
      innerText: await number
    }), number * 1000)
  }
})(10)
~~~

{{{async-await-11.js}}}

____________________________________________________________

### ![ico-25 cap] 12

◘◘![ico-25 cap] **12**◘◘

~~~js
;(async () => await 'async-await')().then(console.log)

Promise.resolve('promise').then(console.log)

;(async () => 'async')().then(console.log)
~~~

~~~console
promise
async
async-await
~~~

{{s3.p4}}

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

{{s3.p8}}

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

{{s3.p9}}

~~~console
async
promise
async-await
~~~

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

{{s3.p13}}

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

{{s3.p14}}

~~~js
;(async () => await 'async-await-1')().then(console.log)

new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

~~~console
async-await-1
async-await-2
~~~

{{s3.p15}}

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)

;(async () => await 'async-await-1')().then(console.log)
~~~

~~~console
async-await-2
async-await-1
~~~

{{s3.p16}}
{{s3.p17}}

{{s3.p18}}

______________________________________________

### ![ico-25 cap] 13

◘◘![ico-25 cap] **13**◘◘

~~~js
const promise = message => new Promise(resolve => {
  const time = Math.round(Math.random() * 3000)
  setTimeout(() => resolve(`${message}: ${time}`), time)
})

const test = async () => await promise(await promise(await promise('start')))

test().then(response => console.log(response))
~~~

{{{async-await-13.js}}}

______________________________________________

### ![ico-25 cap] 14

{{s3.p19}}

~~~js
const createElem = tag => document.body.appendChild(document.createElement(tag))
~~~

◘◘![ico-25 cap] **14**◘◘

~~~js
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  style: `
    padding: 8px 16px;
    border-radius: 4px;
  `,
  onchange: event => resolve(event.target.value)
}))

const func = async () => Object.assign({}, {
  name: await promise('Your name'),
  hobby: await promise('Your hobby'),
  speciality: await promise('Your speciality')
})

func().then(response => console.log(response))
~~~

{{{async-await-9.js}}}

______________________________________________

### ![ico-25 cap] 15

◘◘![ico-25 cap] **15**◘◘

~~~JS
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  onchange: event => resolve(event.target.value)
}))

const func = async () => {
  const user = {}
  const messages = ['name', 'hobby', 'speciality']

  const responses = await Promise.all(messages.map(message => promise(message)))

  responses.forEach((val, index) => Object.assign(user, { [messages[index]]: val }))
  return user
}

func().then(console.log)
~~~

{{{async-await-10.js}}}

______________________________________________

### ![ico-25 cap] 16

{{s3.p20}}

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

{{s3.p21}}

~~~js
function func (name, time, callback) {
  test(time)
    ? callback(`${name}: ${time}`)
    : requestAnimationFrame(func.bind(null, name, time, callback))
}

function createPromise (name, time) {
  return new Promise(func.bind(null, name, time))
}
~~~

{{s3.p22}}

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

{{s3.p23}}

{{s3.p24}}

{{s3.p25}}

~~~js
createPromise('First', getRandom())
  .then(console.log)
  .then(() => createPromise('Second', getRandom()).then(console.log))
  .then(() => createPromise('Third', getRandom()).then(console.log))
~~~

{{s3.p26}}

~~~js
const showResults = async () => {
  const promises = ['First', 'Second', 'Third']
    .map(name => createPromise(name, getRandom()))

  for (const promise of promises) console.log(await promise)
}

showResults()
~~~

{{s3.p27}}

________________________________

### ![ico-25 cap] 17

{{s3.p28}}
{{s3.p29}}

◘◘![ico-25 cap] **17**◘◘

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const users = ['Stephan', 'Andry']
  .reduce(async (result, item) => {
    const data = await (await fetch(`${origin}/users?name=${item}`)).json()
    result = await result
    result.push(data[0])
    return result
  }, [])
~~~

{{s3.p30}}

{{s3.p31}}
{{s3.p32}}
{{s3.p33}}

{{s3.p34}}
{{s3.p35}}

~~~js
users.then(console.log)
~~~

{{s3.p36}}

~~~js
fetch(`${origin}/users?name=Stephan&name=Andry`)
  .then(response => response.json())
  .then(console.log)
~~~

{{common.c9}}

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const getEndpoint = userList => userList
  .reduce((result, item, index) => result += `${index > 0 ? '&' : ''}name=${item}`, '')

const getUsers = async userList => await (await fetch(`${origin}/users?${getEndpoint(userList)}`)).json()

getUsers(['Stephan', 'Andry'])
  .then(console.log)
~~~

___________________________________________

### ![ico-25 cap] 18

~~~js
const origin = 'https://api.github.com'

const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))
~~~

◘◘![ico-25 cap] **18**◘◘

~~~js
async function getUsersData (userName) {
  const userData = await (await fetch(`${origin}/users/${userName}`)).json()

  addElem('img').src = userData.avatar_url

  const userRepos = await (await fetch(userData.repos_url)).json()

  for (const item of userRepos) addElem('div').innerText = item.events_url

  return 'Ready'
}

getUsersData('garevna').then(console.log)
~~~

_________________________________________

### ![ico-25 cap] 19

{{s3.p38}}

◘◘Object◘◘
~~~js
Object.prototype.addElem = function (tagName) {
  const elem = document.body
    .appendChild(document.createElement(tagName))
  Object.assign(elem, {
    addChar (char) {
      elem.textContent += char
    },
    replace (text) {
      elem.textContent = text
    }
  })
  return elem
}
~~~

{{s3.p39}}

{{s3.p40}}

◘◘String◘◘
~~~js
String.prototype.then = function () {
  const placeholder = this.addElem('div')
  this
    .split('')
    .forEach((char, index) => setTimeout(() => placeholder.addChar(char), 1000 * index))
}
~~~

◘◘Number◘◘

~~~js
Number.prototype.then = function () {
  const placeholder = this.addElem('div')
  for (let ind = 0; ind <= this; ind++) {
    setTimeout(() => placeholder.replace(ind), 1000 * ind)
  }
}
~~~

{{s3.p41}}

◘◘![ico-25 cap] **19**◘◘

~~~js
const typeWritter = async string => await Object(string)
const showNumber = async number => await Object(number)

typeWritter('Welcome')
showNumber(11)
~~~

_________________________________________

[:::**20**:::](https://plnkr.co/edit/3JMiqa1CFLK55hgx/)

_______________________
[![ico-30 hw] Quiz](quiz/async)
