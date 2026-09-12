# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

________________________________________________________________________________________________

{{s1.p2}}

________________________________________________________________________________________________

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

~~~js
async function sigma () {
  ...
}
~~~

{{s2.p2}}

~~~js
const sayHello = async () => 'Hello'
~~~

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

{{s2.p7}}

~~~js
const createPromise = async message => message
~~~

{{s2.p8}}

{{s2.p9}}

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

{{s2.p10}}
{{s2.p11}}

______________________________________________

{{s2.p12}}
{{s2.p13}}

~~~js
const section = document.body
section.style = 'padding: 120px;'
~~~

{{s2.p14}}

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

{{s2.p15}}

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

{{s2.p16}}

{{s2.p17}}

{{s2.p18}}
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

{{s2.p19}}
{{s2.p20}}

{{s2.p21}}

{{s2.p22}}

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

{{s2.p23}}

^^^

{{s2.p24}}
{{s2.p25}}

{{s2.p26}}

_________________________________________

{{s2.p27}}

{{s2.p28}}

{{s2.p29}}

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

{{s2.p30}}

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

{{s2.p31}}

{{s2.p32}}

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

{{s2.p33}}
{{s2.p34}}

________________________________________________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

{{s3.p11}}
{{s3.p12}}

_____________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

{{s4.p4}}
{{s4.p5}}

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

{{s4.p6}}

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

{{s4.p7}}

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}
~~~js
await createPromise('Resolved!')
~~~
{{s4.p12}}
{{s4.p13}}

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

{{s4.p14}}
{{s4.p15}}
{{s4.p16}}
{{s4.p17}}

{{s4.p18}}

~~~js
result => result
~~~

{{s4.p19}}
{{s4.p20}}
~~~js
const test = async () => console.log('Result: ', await Promise.resolve('Success.'))
test()
~~~

~~~console
Result:  Success.
~~~

{{s4.p21}}
~~~js
const test = async () => console.log('Result: ', await Promise.reject('Failure.'))
test()
~~~

~~~error
    Uncaught (in promise) Failure.
~~~

{{s4.p22}}

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

{{s4.p23}}
{{s4.p24}}

{{s4.p25}}

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

{{s4.p26}}

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

{{s4.p27}}

{{s4.p28}}

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

{{s4.p29}}

{{s4.p30}}

{{s4.p31}}

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

{{s4.p32}}

~~~error
    Uncaught (in promise) Failure.
~~~

{{s4.p33}}

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

{{s4.p34}}
{{s4.p35}}

_____________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

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

{{s5.p3}}

{{s5.p4}}

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

{{s5.p5}}
{{s5.p6}}

{{s5.p7}}

{{s5.p8}}
{{s5.p9}}
{{s5.p10}}
{{s5.p11}}
{{s5.p12}}

{{s5.p13}}
{{s5.p14}}

{{s5.p15}}

{{s5.p16}}

~~~js
response => response
~~~

{{s5.p17}}

{{s5.p18}}

{{s5.p19}}
{{s5.p20}}

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

{{s5.p21}}

~~~js
console.log('Hi from Event Loop')
~~~

{{s5.p22}}
{{s5.p23}}
{{s5.p24}}
{{s5.p25}}
{{s5.p26}}

_____________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}

{{s6.p4}}
{{s6.p5}}
![](illustrations/white-and-black.png)
{{s6.p6}}

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

{{{async-await-05.js}}}

{{s6.p17}}

{{s6.p18}}
{{s6.p19}}

{{s6.p20}}
{{s6.p21}}

{{s6.p22}}

{{s6.p23}}

_________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

~~~js
response => response
~~~
{{s7.p5}}

{{s7.p6}}

{{s7.p7}}
{{s7.p8}}

{{s7.p9}}

{{s7.p10}}
~~~js
console.log('Start')
;(async function () {
  console.log('Async function starts')
  console.log(await 'Hello!')
  console.log('Async function finished')
})()
console.log('Finish')
~~~

{{s7.p11}}

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

{{s7.p12}}
{{s7.p13}}

{{s7.p14}}
{{s7.p15}}
{{s7.p16}}
~~~js
console.log(await 'Hello!')
~~~
{{s7.p17}}
{{s7.p18}}
{{s7.p19}}

{{s7.p20}}

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

{{s7.p21}}

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

{{s7.p22}}

~~~js
console.log('Finish')
~~~

{{s7.p23}}

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

{{s7.p24}}

{{s7.p25}}

_____________________________________________

## ![ico-20 icon] {{s8.h1}}

### ![ico-25 cap] {{s9.h1}}

{{s9.p1}}

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

{{s9.p2}}

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}

{{s10.p3}}

~~~js
let num = 5

async function sample (arg) {
  num = await arg
}

sample(10)
  .then(() => console.log(`Finish value: ${num}`))

console.log('Start value: ', num)
~~~

{{s10.p4}}
{{s10.p5}}

_________________________________

### ![ico-25 cap] {{s11.h1}}

{{s11.p1}}

~~~js
async function getUser (userNum) {
  return (await (await fetch(`https://api.github.com/users/${userNum}`)).json()).name
}

getUser(5)
  .then(console.log)
~~~

{{s11.p2}}

{{s11.p3}}

_____________________________________

### ![ico-25 cap] {{s12.h1}}

{{s12.p1}}

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

### ![ico-25 cap] {{s13.h1}}

{{s13.p1}}

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

### ![ico-25 cap] {{s14.h1}}

{{s14.p1}}

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

{{s14.p2}}

{{s14.p3}}
{{s14.p4}}
{{s14.p5}}

{{s14.p6}}

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

{{s14.p7}}

~~~console
async
promise
async-await
~~~

{{s14.p8}}

{{s14.p9}}

{{s14.p10}}

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

{{s14.p11}}

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

{{s14.p12}}

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

{{s14.p13}}

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

{{s14.p14}}
{{s14.p15}}

{{s14.p16}}

______________________________________________

### ![ico-25 cap] {{s15.h1}}

{{s15.p1}}

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

### ![ico-25 cap] {{s16.h1}}

{{s16.p1}}

~~~js
const createElem = tag => document.body.appendChild(document.createElement(tag))
~~~

{{s16.p2}}

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

### ![ico-25 cap] {{s17.h1}}

{{s17.p1}}

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

### ![ico-25 cap] {{s18.h1}}

{{s18.p1}}

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

{{s18.p2}}

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

{{s18.p3}}

{{s18.p4}}

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

{{s18.p5}}

{{s18.p6}}

{{s18.p7}}

~~~js
createPromise('First', getRandom())
  .then(console.log)
  .then(() => createPromise('Second', getRandom()).then(console.log))
  .then(() => createPromise('Third', getRandom()).then(console.log))
~~~

{{s18.p8}}

~~~js
const showResults = async () => {
  const promises = ['First', 'Second', 'Third']
    .map(name => createPromise(name, getRandom()))

  for (const promise of promises) console.log(await promise)
}

showResults()
~~~

{{s18.p9}}

________________________________

### ![ico-25 cap] {{s19.h1}}

{{s19.p1}}
{{s19.p2}}

{{s19.p3}}

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

{{s19.p4}}

{{s19.p5}}
{{s19.p6}}
{{s19.p7}}

{{s19.p8}}
{{s19.p9}}

~~~js
users.then(console.log)
~~~

{{s19.p10}}

~~~js
fetch(`${origin}/users?name=Stephan&name=Andry`)
  .then(response => response.json())
  .then(console.log)
~~~

{{s19.p11}}

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const getEndpoint = userList => userList
  .reduce((result, item, index) => result += `${index > 0 ? '&' : ''}name=${item}`, '')

const getUsers = async userList => await (await fetch(`${origin}/users?${getEndpoint(userList)}`)).json()

getUsers(['Stephan', 'Andry'])
  .then(console.log)
~~~

___________________________________________

### ![ico-25 cap] {{s20.h1}}

~~~js
const origin = 'https://api.github.com'

const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))
~~~

{{s20.p1}}

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

### ![ico-25 cap] {{s21.h1}}

{{s21.p1}}

{{s21.p2}}
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

{{s21.p3}}

{{s21.p4}}

{{s21.p5}}
~~~js
String.prototype.then = function () {
  const placeholder = this.addElem('div')
  this
    .split('')
    .forEach((char, index) => setTimeout(() => placeholder.addChar(char), 1000 * index))
}
~~~

{{s21.p6}}

~~~js
Number.prototype.then = function () {
  const placeholder = this.addElem('div')
  for (let ind = 0; ind <= this; ind++) {
    setTimeout(() => placeholder.replace(ind), 1000 * ind)
  }
}
~~~

{{s21.p7}}

{{s21.p8}}

~~~js
const typeWritter = async string => await Object(string)
const showNumber = async number => await Object(number)

typeWritter('Welcome')
showNumber(11)
~~~

_________________________________________

{{s21.p9}}

_______________________
{{s21.p10}}
