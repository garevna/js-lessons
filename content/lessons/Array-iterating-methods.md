# ![ico-35 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}

{{s1.p12}}

_____________________________________________________

## ![ico-30 icon] forEach()

{{s1.p13}}
{{s1.p14}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach(currentName => console.log(currentName))

for (const currentName of people) console.log(currentName)
~~~

{{s1.p15}}
{{s1.p16}}

~~~js
currentName => console.log(currentName)
~~~

{{s1.p17}}
{{s1.p18}}
{{s1.p19}}
{{s1.p20}}

{{s1.p21}}
{{s1.p22}}
{{s1.p23}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach((currentValue, index) => console.log(`${index + 1}: ${currentValue}`))
~~~

~~~console
1: Ivan
2: Mary
3: Elena
4: Andrey
~~~
_______________________________

{{s1.p24}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const users = [
  { name: 'Mary', age: 25, job: 'dev' },
  { name: 'Piter', age: 37, job: 'worker' },
  { name: 'Robert', age: 28, job: 'journalist' },
  { name: 'Stephan', age: 40, job: 'manager' }
]

const show = user => new Promise(resolve => setTimeout(() => resolve(user.name), Math.random() * 3000))

users.forEach(async user => console.log(await show(user)))
~~~

{{s1.p25}}

{{s1.p26}}

~~~console
Mary
Robert
Stephan
Piter
~~~

{{s1.p27}}

~~~js
for (const user of users) {
  show(user).then(name => console.log(name))
}
~~~

{{s1.p28}}

~~~console
Stephan
Mary
Robert
Piter
~~~

{{s1.p29}}

~~~js
async function showUsers (users) {
  for (const user of users) {
    console.log(await show(user))
  }
}

showUsers(users)
~~~

~~~console
Mary
Robert
Stephan
Piter
~~~

{{s1.p30}}
_____________________

{{s1.p31}}
{{s1.p32}}

__________________________________________

{{s1.p33}}
{{s1.p34}}
{{s1.p35}}

☼☼☼ {{common.c45}} ☼☼☼

{{s1.p36}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

{{s1.p37}}

{{s1.p38}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const users = ['Mary', 'Piter', 'Robert', 'Stephan']

users.forEach((name, index, arr) => console.log(arr.pop()))
~~~

{{s1.p39}}

~~~console
Stephan
Robert
~~~

{{s1.p40}}

~~~js
console.log(users)
~~~

~~~console
► (2) ['Mary', 'Piter']
~~~

{{s1.p41}}
{{s1.p42}}

___________________________

{{s1.p43}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const users = [
  { name: 'Mary', age: 25, job: 'dev' },
  { name: 'Piter', age: 37, job: 'worker' },
  { name: 'Robert', age: 28, job: 'journalist' },
  { name: 'Stephan', age: 40, job: 'manager' }
]

users.forEach(user => console.log(`${user.name}: ${++user.age}`))
~~~

~~~console
Mary: 26
Piter: 38
Robert: 29
Stephan: 41
~~~

_________________________________________________

### ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}


◘◘![ico-25 cap] ** 7**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

{{s2.p3}}
{{s2.p4}}

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

{{s2.p5}}

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

_____________________

{{s2.p6}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

{{s2.p7}}

_________________________________

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const tags = ['figure', 'div', 'h3', 'img']
const attrs = [
  {
    id: 'figure-blue',
    style: 'padding: 48px; background: #09b;'
  },
  {
    id: 'figure-yellow',
    style: 'padding: 16px; background: #fa0;'
  },
  {
    style: 'color: #fff; font-family: Arial; font-weight: bold',
    innerText: 'Welcome, students!'
  },
  {
    src: 'https://pictogrammers.com/images/libraries/mdi.svg',
    width: 64
  }
]

const parents = [null, 'figure-blue', 'figure-yellow', 'figure-yellow']

tags.forEach((tag, index) => {
  const elem = (parents[index] ? document.getElementById(parents[index]) : document.body)
    .appendChild(document.createElement(tag))
  Object.assign(elem, attrs[index])
})
~~~

{{{Array-iteration-methods-1.js}}}

_____________________

### ![ico-20 icon] {{s3.h1}}

◘◘![ico-25 cap] **10**◘◘

~~~js
['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .forEach((item, index) => Object.assign(window, {
      [item]: arg => typeof arg === 'function' ? arg(index) : index
  }))
~~~

{{s3.p1}}
"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"

{{s3.p2}}
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}

{{{Array-iteration-methods-2.js}}}


◘◘![ico-25 cap] **10**◘◘

~~~js
['plus', 'minus', 'divide', 'multiply']
  .forEach((item, index) => Object.assign(window, {
    operations: ['+', '-', '/', '*'],
    [item]: function () {
      return arguments.length === 2
        ? eval(`arguments[0] ${this.operations[index]} arguments[1]`)
        : window[item].bind(null, arguments[0])
    }
  }))
~~~

{{s3.p6}}
{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}
{{s3.p13}}

{{{Array-iteration-methods-3.js}}}

____________________

![ico-25 memo] {{common.c3}}

{{s3.p15}}

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

______________________

## ![ico-30 icon] map()

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const users = [
  { name: 'Mary', birthYear: 1998 },
  { name: 'Piter', birthYear: 2001 },
  { name: 'Robert', birthYear: 2004 },
  { name: 'Helen', birthYear: 1999 },
  { name: 'Stephan', birthYear: 2002 },
]

users.map(user => `${user.name}: ${new Date().getFullYear() - user.birthYear}`)
~~~

~~~console
► (5) ['Mary: 26', 'Piter: 23', 'Robert: 20', 'Helen: 25', 'Stephan: 22']
~~~
_______________________________

{{s3.p19}}
{{s3.p20}}
{{s3.p21}}

~~~js
const users = [
  { name: 'Mary', birthYear: 1998 },
  { name: 'Piter', birthYear: 2001 },
  { name: 'Robert', birthYear: 2004 },
  { name: 'Helen', birthYear: 1999 },
  { name: 'Stephan', birthYear: 2002 },
]

users.map((user, index, arr) => {
  const olders = arr
    .map(human => human.birthYear > user.birthYear ? human.name : null)
    .join(' ')
  return `${user.name} is younger then ${olders}`
})
~~~

~~~console
▼ (5) [...]
  0: "Mary is younger then  Piter Robert Helen Stephan"
  1: "Piter is younger then   Robert  Stephan"
  2: "Robert is younger then     "
  3: "Helen is younger then  Piter Robert  Stephan"
  4: "Stephan is younger then   Robert  "
  length: 5
  ► [[Prototype]]: Array(0)
~~~

______________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
location.search
  .slice(1).split(',')
  .map(x => ({ [x.split('=')[0]] : x.split('=')[1] }))
~~~

{{common.c47}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "garevna"}
  ► 1: {date: "10.07.2018"}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________

{{s4.p4}}

{{s4.p5}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
function getSearchObject () {
  var obj = {}
  location.search.slice(1).split(',')
    .map(x => x.split('='))
    .map (function (item) { this[item[0]] = item[1] }, obj)
  return obj
}
~~~

{{s4.p6}}

{{common.c47}}

~~~console
▼ {name: "garevna", date: "10.07.2018"}
    date: "10.07.2018"
    name: "garevna"
  ► __proto__: Object
~~~

______________________________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~js
;['plus', 'minus', 'divide', 'multiply']
  .map((item, index) => Object.assign(window, {
    [item] () {
      const operations = ['+', '-', '/', '*']
      return arguments.length === 2
        ? eval(`arguments[0] ${operations[index]} arguments[1]`)
        : window[item].bind(null, arguments[0])
    }
  }))
~~~

______________________________________________

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const funcs = [
  function () {
    let res = 0
    for (const arg of arguments) res += parseFloat(arg) || 0
    return res
  },
  function () {
    let res = 1
    for (const arg of arguments) res *= parseFloat(arg) || 0
    return res
  },
  function () {
    let res = 0
    for (const arg of arguments) res += parseInt(arg) || 0
    return res
  }
]

Function.prototype.currying = function (arg, context) {
  return this.bind(context, arg)
}

funcs
  .map(func => func.currying(2.5))
  .map(func => func.currying(2))
  .map(func => func.currying(4.5))
  .map(func => func())
~~~

~~~console
▼ (3) [9, 22.5, 8]
    0: 9
    1: 22.5
    2: 8
    length: 3
  ► [[Prototype]]: Array(0)
~~~
__________________________

## ![ico-25 icon] filter()

{{s4.p8}}
{{s4.p9}}
{{s4.p10}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sourceArray = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Shveik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

var usa = sourceArray.filter(x => x.country === 'USA')

console.log(usa)

~~~

◘◘**{{common.c1}}**◘◘

~~~console

▼ (3) [{…}, {…}, {…}]
  ► 0: {name: "Duke Shane", country: "USA"}
  ► 1: {name: "Margaret Johnson", country: "USA"}
  ► 2: {name: "Robert Trump", country: "USA"}
    length: 3
  ► __proto__: Array(0)
~~~

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const getTransactionMode = (() => {
  const transactions = {
    readwrite: ['add', 'put', 'delete', 'clear'],
    readonly: ['get', 'getAll', 'getKey', 'getAllKeys']
  }
  return function (transaction) {
    const res = ['readwrite', 'readonly']
      .filter(mode => transactions[mode].includes(transaction))
    return res[0] || new TypeError('Invalid transaction')
  }
})()

getTransactionMode('add')          // 'readwrite'
getTransactionMode('getAllKeys')  // 'readonly'
~~~

_________________________________

## ![ico-25 icon] find()

{{s4.p12}}

{{s4.p13}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.find(card => card.cash > 4000)
~~~

◘◘**{{common.c1}}**◘◘

~~~console
▼ { num: "457811714", cash: 5000 }
    cash: 5000
    num: "457811714"
  ► __proto__: Object
~~~

___________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const getTransactionMode = (() => {
  const transactions = {
    readwrite: ['add', 'put', 'delete', 'clear'],
    readonly: ['get', 'getAll', 'getKey', 'getAllKeys']
  }
  return function (transaction) {
    const res = ['readwrite', 'readonly']
      .find(mode => transactions[mode].includes(transaction))
    return res || 'unacceptable'
  }
})()

getTransactionMode('add')          // 'readwrite'
getTransactionMode('getAllKeys')  // 'readonly'
~~~

_________________________

## ![ico-25 icon] findIndex()

{{s4.p15}}
{{s4.p16}}

{{s4.p17}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.findIndex(card => card.cash > 1500)  // 1
~~~

{{s4.p18}}
{{s4.p19}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const functions = [
  message => message + '$$$',
  () => Math.random() > 0.5 ? 'success' : 'failure',
  arg => typeof arg === 'function' ? arg() : arg
]

const sample = () => Math.random() > 0.5 ? 'success' : 'failure'

functions.findIndex(func => func.toString() === sample.toString())
~~~

_______________________

## ![ico-25 icon] every()

{{s4.p20}}

{{s4.p21}}
{{s4.p22}}
{{s4.p23}}

{{s4.p24}}

{{s4.p25}}
{{s4.p26}}

{{s4.p27}}

◘◘![ico-25 cap] **every**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.every(x => x.country === 'Ukraine')

console.log(res)
~~~

{{s4.p28}}
{{s4.p29}}

______________________________________________

## ![ico-25 icon] some()

{{s4.p30}}

{{s4.p31}}

{{s4.p32}}

{{s4.p33}}
{{s4.p34}}

{{s4.p35}}

◘◘![ico-25 cap] **some**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.some(x => x.country === 'Pakistan')

console.log(res)
~~~

{{s4.p36}}
{{s4.p37}}

{{s4.p38}}

~~~js
const res = people
  .map(human => human.country)
  .includes('Pakistan')
~~~
{{s4.p39}}
~~~js
people
  .filter(x => x.country === 'Pakistan')
  .length > 0
~~~

____________________________

## ![ico-25 icon] reduce()

{{s4.p40}}
{{s4.p41}}
{{s4.p42}}

{{s4.p43}}
{{s4.p44}}

{{s4.p45}}
{{s4.p46}}
{{s4.p47}}

{{s4.p48}}

{{s4.p49}}


{{s4.p50}}

~~~js
[1, 2, 3, 4, 5].reduce(accumulator => accumulator * 2) // 16
~~~

{{s4.p51}}
{{s4.p52}}

~~~js
accumulator => accumulator * 2
~~~

{{s4.p53}}

•• 1 * 2 * 2 * 2 * 2 = 16 ••

_____________________________________

{{s4.p54}}

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item) // 120
~~~

{{s4.p55}}

•• 1 * 2 * 3 * 4 * 5 = 120 ••

____________________________

{{s4.p56}}

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item, 5) // 600
~~~

•• 5 * 1 * 2 * 3 * 4 * 5 = 600 ••

{{s4.p57}}

_________________________________

{{s4.p58}}

~~~js
[10, 2, 3, 4, 5].reduce((accumulator, item, index) => accumulator * item + index) // 1319
~~~

{{s4.p59}}

•• ((((10 + 0) * 2 + 1) * 3 + 2) * 4 + 3) * 5 + 4 = 1319 ••

_________________________________________

{{s4.p60}}

{{s4.p61}}

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}


◘◘![ico-20 cap] ** 1**◘◘

~~~js
['plus', 'minus', 'divide', 'multiply']
  .reduce((res, item) => Object.assign(res, { [item]: item.length }), {})
~~~

~~~console
▼ {plus: 4, minus: 5, divide: 6, multiply: 8}
  divide: 6
  minus: 5
  multiply: 8
  plus: 4
  ► [[Prototype]]: Object
~~~

___________________

{{s5.p3}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const string = [
  { name: 'Piter', age: 31 },
  { name: 'Helen', age: 29 },
  { name: 'Robert', age: 45 },
  { name: 'Andrew', age: 24 }
].reduce((res, user) => res += `${user.name}: ${user.age}\n`, 'Users:\n')

console.log(string)
~~~

~~~console
Users:
Piter: 31
Helen: 29
Robert: 45
Andrew: 24
~~~

_____________________________________

{{s5.p4}}

◘◘![ico-20 cap] ** 3**◘◘
~~~js
const string = 'With the trust of thousands of partners from around the world, we are dedicated to contributing to the widespread adoption of cryptocurrencies.'

string
  .split('')
  .reduce((result, char) => Object.assign(result, {
    [char]: (result[char] || 0) + 1
  }), {})
~~~

{{{Array-iteration-methods-reduce-2.js}}}
_____________________________________

{{s5.p5}}

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const people = [
  { name: 'Alexandra Pugh', country: 'Ukraine' },
  { name: 'Andrea McKay', country: 'USA' },
  { name: 'Anthony Webster', country: 'United Kingdom' },
  { name: 'Noemi Lynch', country: 'Ukraine' },
  { name: 'Enrique Michael', country: 'France' },
  { name: 'Collin Roy', country: 'USA' },
  { name: 'Stella Dillon', country: 'United Kingdom' },
  { name: 'Lyra Bryant', country: 'France' },
  { name: 'Shane Dodson', country: 'Ukraine' },
  { name: 'Dream Douglas', country: 'USA' },
  { name: 'Bobby Richards', country: 'USA' },
  { name: 'Carmelo Atkinson', country: 'United Kingdom' }
]

const result = people
  .reduce((result, human) => Object.assign(result, {
    [human.country]: (result[human.country] || 0) + 1
  }), {})
~~~

{{{Array-iteration-methods-reduce-1.js}}}

__________________________________________

◘◘![ico-20 cap] ** 5**◘◘

~~~js
[5, 4, 3, 1, 10, 5, 9, 2, 1, 4]
  .reduce((res, number, index, arr) => res += parseInt(number / Math.pow(10, index)), 0)
~~~

{{s5.p6}}
{{s5.p7}}

{{s5.p8}}

~~~js
parseInt(5e-7) // 5

parseInt(5e+21) // 5

parseInt(0.0000005) // 5

parseInt(5000000000000000000000) // 5
~~~

{{{Array-iteration-methods-reduce-3.js}}}

_________________________________________


◘◘![ico-20 cap] ** 6**◘◘

~~~js
[5, 4, 3, 1, 10, 5, 9, 2, 1, 4]
  .reduce((res, number, index, arr) => res.concat(number / Math.pow(10, index)), [])
~~~

{{{Array-iteration-methods-reduce-4.js}}}

_____________________________________

{{s5.p9}}
{{s5.p10}}
{{s5.p11}}

◘◘![ico-20 cap] ** 7**◘◘

~~~js
const array = ['first', 'second', 'third', 'fourth']

array.reduce((res, item, index, arr) => {
  const order = Math.round(Math.random() * (arr.length - 1))
  res.push(arr.splice(order, 1)[0])
  return res
}, array)
~~~

{{{Array-iteration-methods-reduce-5.js}}}

_____________________________________

### Math.sqrt

{{s5.p12}}
{{s5.p13}}
{{s5.p14}}
{{s5.p15}}
{{s5.p16}}

◘◘![ico-20 cap] ** 8**◘◘

~~~js
;[625, 5, 10].reduce(Math.sqrt) // 5
~~~

{{s5.p17}}
••625 -> 25 -> 5••

{{s5.p18}}

{{s5.p19}}

~~~js
Array.prototype.root = function () {
  return Math.pow(this[0], Math.pow(0.5, this.length - 1))
}

;[625, 0, 0].root() // 5
~~~
____________________________________________

◘◘![ico-20 cap] ** 9**◘◘

~~~js
[0, 0, 0].reduce(Math.sqrt, 625 * 625) // 5
~~~

{{s5.p20}}
{{s5.p21}}

{{{Array-iteration-methods-reduce-7.js}}}

_______________________________

### Math.pow

{{s5.p22}}
{{s5.p23}}

{{s5.p24}}
{{s5.p25}}

{{s5.p26}}

◘◘![ico-20 cap] ** 10**◘◘

~~~js
console.log([3, 2, 2].reduce(Math.pow))    // 81

console.log(Math.pow(Math.pow(3, 2), 2))   // 81

console.log([2, 3, 3].reduce(Math.pow))    // 512

console.log(Math.pow(Math.pow(2, 3), 3))   // 512

console.log([2, 2, 2].reduce(Math.pow, 2)) // 256

Math.pow(Math.pow(Math.pow(2, 2), 2), 2)   // 256
~~~

{{{Array-iteration-methods-reduce-10.js}}}

{{s5.p27}}

~~~js
Array.prototype.pow = function () {
  let res = this[0]
  for (const item of this.slice(1)) {
    res = Math.pow(res, item)
  }
  return res
}

[3, 2, 2].pow() // 81
~~~

______________________________________

### ![ico-25 hw] {{common.c15}}

{{s6.p1}}

◘◘** 1**◘◘

→→→ [].reduce(Math.pow) | TypeError, null, NaN, 0 | TypeError →→→

◘◘** 2**◘◘

→→→ [].reduce(Math.sqrt, 'Google') | TypeError, null, NaN, 0, 'Google' | Google →→→

◘◘** 3**◘◘

→→→ [1].reduce(Math.sqrt, 'Google') | TypeError, null, NaN, 0, 'Google' | NaN →→→

◘◘** 4**◘◘

→→→ [-10, -20, 5].reduce(Math.abs) | null, NaN, 0, 10, 20, 5 | 10 →→→

◘◘** 5**◘◘

→→→ [.5].reduce(Math.pow, 49) | null, NaN, 0, 7, 49, 5 | 7 →→→

_________________________________

## ![ico-25 icon] sort()

{{s6.p2}}

{{s6.p3}}
{{s6.p4}}
{{s6.p5}}

{{s6.p6}}

{{s6.p7}}
{{s6.p8}}
{{s6.p9}}

{{s6.p10}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var sourceArray = [
  { title: 'fond', value: 100 },
  { title: 'salary', value: 400 },
  { title: 'bonus', value: 70 },
  { title: 'debt', value: 700 },
  { title: 'credit', value: 200 },
  { title: 'payments', value: 150 },
  { title: 'income', value: 320 },
]
var resArray = sourceArray.sort(function (x, y) {
  return x.value - y.value
})
~~~

◘◘**{{common.c1}}**◘◘

~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {title: "bonus", value: 70}
  ► 1: {title: "fond", value: 100}
  ► 2: {title: "payments", value: 150}
  ► 3: {title: "credit", value: 200}
  ► 4: {title: "income", value: 320}
  ► 5: {title: "salary", value: 400}
  ► 6: {title: "debt", value: 700}
    length: 7
  ► __proto__: Array(0)
~~~

{{s6.p12}}

◘◘![ico-20 cap] ** 2**◘◘
~~~js
var resArray = sourceArray
  .sort(function (x, y) {
    console.log(`${x.title} - ${y.title} = ${x.value - y.value}`)
    return  x.value - y.value
  })
~~~

◘◘**{{common.c1}}**◘◘

~~~console
fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300
~~~

^^^[{{s6.spoiler1}}]
{{s6.p14}}
~~~js
var log = []
var resArray = sourceArray
  .sort(function (x, y) {
    log.push({
      id: x.title + " > " + y.title,
      res: x.value > y.value
    })
    return  x.value - y.value
  })
~~~
**log**
~~~console
▼ (13) [...]
  ► 0: {id: 'salary > fond', res: true}
  ► 1: {id: 'bonus > salary', res: false}
  ► 2: {id: 'bonus > salary', res: false}
  ► 3: {id: 'bonus > fond', res: false}
  ► 4: {id: 'debt > fond', res: true}
  ► 5: {id: 'debt > salary', res: true}
  ► 6: {id: 'credit > salary', res: false}
  ► 7: {id: 'credit > fond', res: true}
  ► 8: {id: 'payments > credit', res: false}
  ► 9: {id: 'payments > fond', res: true}
  ► 10: {id: 'income > credit', res: true}
  ► 11: {id: 'income > debt', res: false}
  ► 12: {id: 'income > salary', res: false}
    length: 13
  ► __proto__: Array(0)
~~~
^^^

{{s6.p15}}

{{s6.p16}}

{{s6.p17}}

__________________________

## ![ico-25 icon] flatMap()

{{s6.p18}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

{{s6.p19}}

~~~js
console.log(cookie.split('; ').map(item => item.split('='))
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
▼ (3) [Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "user"]
  ► 1: (2) ["token", "Jd7-js15/84"]
  ► 2: (2) ["interest", "javascript"]
    length: 3
  ► __proto__: Array(0)
~~~

{{s6.p21}}

{{s6.p22}}

~~~js
console.log(cookie.split('; ').flatMap(item => item.split('='))
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

{{s6.p24}}

{{s6.p25}}

~~~js
function (item) {
  return item.split('=')
}
~~~

{{s6.p26}}

____________________________________________________

## ![ico-25 icon] keys()

{{common.c48}}
{{common.c49}}

◘◘![ico-20 cap] **keys**◘◘

~~~js
const cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
  .split('; ')
  .map(item => item.split('='))

const iterator = cookie.keys()

do {
  var { value, done } = iterator.next()
  done || console.log(cookie[value][0], cookie[value][1])
} while (!done)
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
name user
token Jd7-js15/84
interest javascript
~~~


______________________

## ![ico-25 icon] values()

{{common.c48}}
{{common.c49}}

◘◘![ico-20 cap] **values**◘◘

~~~js
const cookie = 'name=user; token=Jd7-js15/84; interest=javascript'

const iterator = cookie
  .split ('; ')
  .map(item => item.split('='))
  .values()

do {
  var { value, done } = iterator.next()
  done || console.log(value)
} while (!done)
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
► (2) ["name", "user"]
► (2) ["token", "Jd7-js15/84"]
► (2) ["inerest", "javascript"]
~~~

_____________________________________________

## ![ico-30 icon] {{s7.h1}}

_________________________________________

### ![ico-25 cap] {{s8.h1}}

{{s8.p1}}

~~~js
const cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.reduce((result, card) => result + card.cash, 0)  // 10300
~~~

___________________________________________________

{{s8.p2}}

~~~js
cards.reduce((result, card) => ({
  num: result.num,
  cash: result.cash + card.cash
}), { num: '457855155', cash: 0 })
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
▼ { num: "457855155", cash: 10300 }
    cash: 10300
    num: "457855155"
  ► __proto__: Object
~~~

{{s8.p4}}

~~~js
cards.reduce((result, card) => {
  const cash = card.cash
  card.cash = 0
  return {
    num: result.num,
    cash: result.cash + cash
  }
}, { num: '457855155', cash: 0 })
~~~

{{s8.p5}}

◘◘**^^{{common.c1}}^^**◘◘

~~~console

▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {num: "457892425", cash: 0}
  ► 1: {num: "457812840", cash: 0}
  ► 2: {num: "457855780", cash: 0}
  ► 3: {num: "457811714", cash: 0}
    length: 4
  ► __proto__: Array(0)

~~~

__________________________________________

### ![ico-25 cap] {{s9.h1}}

{{s9.p1}}
~~~js
const users = [
  { name: 'Watson Armstrong', speciality: 'developer' },
  { name: 'Marcelo Anthony', speciality: 'doctor' },
  { name: 'Eva Randall', speciality: 'teacher' },
  { name: 'Stephen Meyer', speciality: 'worker' },
  { name: 'Isabella Drake', speciality: 'teacher' },
  { name: 'Rafael Gilbert', speciality: 'developer' },
  { name: 'Adrianna Schultz', speciality: 'doctor' },
  { name: 'Kira Hall', speciality: 'teacher' },
  { name: 'Carmen Duarte', speciality: 'musician' },
  { name: 'Anika Burton', speciality: 'developer' },
  { name: 'Hugo Gray', speciality: 'worker' },
  { name: 'Scott Hahn', speciality: 'worker' }
]

const specialities = users.map(user => user.speciality)
~~~

{{s9.p2}}

◘◘**^^specialities^^**◘◘
~~~console
▼ [...]
   0: "developer"
   1: "doctor"
   2: "teacher"
   3: "worker"
   4: "teacher"
   5: "developer"
   6: "doctor"
   7: "teacher"
   8: "musician"
   9: "developer"
  10: "worker"
  11: "worker"
  length: 12
  ► [[Prototype]]: Array(0)
~~~

{{s9.p3}}

{{s9.p4}}

~~~js
Array.from(new Set(specialities))
~~~

{{s9.p5}}

~~~js
const arr = [
  'google',
  'mozilla',
  'ie',
  'mozilla',
  'mozilla',
  'google',
  'mozilla',
  'ie',
  'ie',
  'google'
]
~~~

~~~js
arr.reduce((result, item) => {
  result.indexOf(item) < 0 ? result.push(item) : null
  return result
}, [])
~~~

◘◘**^^{{common.c1}}^^**◘◘

~~~console
▼ (3) ["google", "mozilla", "ie"]
    0: "google"
    1: "mozilla"
    2: "ie"
    length: 3
  ► __proto__: Array(0)
~~~

_________________________________________________

### ![ico-25 cap] {{s10.h1}}

{{s10.p1}}

~~~js
const intervals = [[10, 20], [4, 18], [7, 10], [5, 16], [9, 13], [11, 15], [7, 15], [10, 12], [12, 19]]
~~~

{{s10.p2}}

{{s10.p3}}
~~~js
Array.prototype.interior = function (interval = [0, 1]) {
  return this[0] < interval[0] && this[1] > interval[1]
}
~~~
{{s10.p4}}
~~~js
[18, 35].interior([4, 18]) // false
[18, 35].interior([20, 28]) // true
~~~
{{s10.p5}}
~~~js
intervals
  .map((segment, index, array) => array.filter(interval => segment.interior(interval)).length)
~~~

◘◘**^^Result^^**◘◘
~~~console
► (9) [2, 6, 0, 5, 1, 0, 2, 0, 0]
~~~

__________________________

### ![ico-25 cap] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}
{{s11.p3}}

{{s11.p4}}

◘◘![ico-20 cap] **Brackets validation**◘◘

~~~js
String.prototype.testBrackets = (function () {
  const brackets = {
    '[': ']',
    '{': '}',
    '(': ')'
  }

  const all = ['[', '{', '(', ']', '}', ')']

  return function () {
    const self = this
      .split('')
      .filter(char => all.includes(char))

    let stack = [], result = ''

    self
      .forEach(symbol => {
        if (!brackets[symbol] && stack.length === 0) return false

        brackets[symbol] ? stack.push(symbol) : symbol = brackets[stack.pop()]

        result += symbol
      })

    return result === self.join('') && stack.length === 0
  }
})()
~~~

~~~js
'( [ ( { ( ( {(} ([]) ) ) } ) ] )'.testBrackets()   // false

String.prototype.testBrackets.toString().testBrackets()  // true
~~~

{{{Array-iteration-methods-brackets.js}}}
___________________________________________________

### ![ico-25 cap] location

~~~js
function getSearchObject () {
  const obj = {}

  location.search
    .slice(1)
    .split(',')
    .map(x => x.split('='))
    .map(function (item) { this[item[0]] = item[1] }, obj)

    return obj
}

var searchObject = getSearchObject ()
for (const rec in searchObject) {
  document.body.innerHTML += `<p>${rec}: ${searchObject[rec]}</p>`
}
~~~

[:::**Live demo**:::](samples/11)

_____________________________________________

### ![ico-25 cap] getComputedStyle

{{s11.p5}}

~~~js
Array.from(document.getElementsByClassName('interlanguage-link'))
  .map(item => getComputedStyle(item))
  .forEach(item => console.log(item['font-family']))
~~~

________________________________________________

{{s11.p6}}
