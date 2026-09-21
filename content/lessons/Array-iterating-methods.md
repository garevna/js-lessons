# ![ico-35 study] {{p1}}

{{p2}}

{{p3}}
{{p4}}
{{p5}}
{{p6}}

{{p7}}
{{p8}}

{{p9}}
{{p10}}
{{p11}}
{{p12}}

{{p13}}

_____________________________________________________

## ![ico-30 icon] forEach()

{{p14}}
{{p15}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach(currentName => console.log(currentName))

for (const currentName of people) console.log(currentName)
~~~

{{p16}}
{{p17}}

~~~js
currentName => console.log(currentName)
~~~

{{p18}}
{{p19}}
{{p20}}
{{p21}}

{{p22}}
{{p23}}
{{p24}}

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

{{p25}}

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

{{p26}}

{{p27}}

~~~console
Mary
Robert
Stephan
Piter
~~~

{{p28}}

~~~js
for (const user of users) {
  show(user).then(name => console.log(name))
}
~~~

{{p29}}

~~~console
Stephan
Mary
Robert
Piter
~~~

{{p30}}

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

{{p31}}
_____________________

{{p32}}
{{p33}}

__________________________________________

{{p34}}
{{p35}}
{{p36}}

☼☼☼ {{p37}} ☼☼☼

{{p38}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

{{p39}}

{{p40}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const users = ['Mary', 'Piter', 'Robert', 'Stephan']

users.forEach((name, index, arr) => console.log(arr.pop()))
~~~

{{p41}}

~~~console
Stephan
Robert
~~~

{{p42}}

~~~js
console.log(users)
~~~

~~~console
► (2) ['Mary', 'Piter']
~~~

{{p43}}
{{p44}}

___________________________

{{p45}}

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

### ![ico-25 icon] {{p46}}

{{p47}}

{{p48}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

{{p49}}
{{p50}}

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

{{p51}}

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

_____________________

{{p52}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

{{p53}}

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
    src: 'icons/mdi.svg',
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

### ![ico-20 icon] {{p54}}

◘◘![ico-25 cap] **10**◘◘

~~~js
['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .forEach((item, index) => Object.assign(window, {
      [item]: arg => typeof arg === 'function' ? arg(index) : index
  }))
~~~

{{p55}}
"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"

{{p56}}
{{p57}}
{{p58}}
{{p59}}

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

{{p60}}
{{p61}}
{{p62}}
{{p63}}
{{p64}}
{{p65}}
{{p66}}
{{p67}}

{{{Array-iteration-methods-3.js}}}

____________________

![ico-25 memo] {{common.c3}}

{{p68}}

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

______________________

## ![ico-30 icon] map()

{{p69}}
{{p70}}
{{p71}}

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

{{p72}}
{{p73}}
{{p74}}

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

### ![ico-20 icon] {{p75}}

{{p76}}

{{p77}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
location.search
  .slice(1).split(',')
  .map(x => ({ [x.split('=')[0]] : x.split('=')[1] }))
~~~

{{p78}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "garevna"}
  ► 1: {date: "10.07.2018"}
    length: 2
  ► [[Prototype]]: Array(0)
~~~

______________________________________________

{{p79}}

{{p80}}

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

{{p81}}

{{p82}}

~~~console
▼ {name: "garevna", date: "10.07.2018"}
    date: "10.07.2018"
    name: "garevna"
  ► [[Prototype]]: Object
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

{{p83}}
{{p84}}
{{p85}}

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

~~~console

▼ (3) [{…}, {…}, {…}]
  ► 0: {name: "Duke Shane", country: "USA"}
  ► 1: {name: "Margaret Johnson", country: "USA"}
  ► 2: {name: "Robert Trump", country: "USA"}
    length: 3
  ► [[Prototype]]: Array(0)
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

{{p86}}

{{p87}}

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

~~~console
▼ { num: "457811714", cash: 5000 }
    cash: 5000
    num: "457811714"
  ► [[Prototype]]: Object
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

{{p88}}
{{p89}}

{{p90}}

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

{{p91}}
{{p92}}

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

{{p93}}

{{p94}}
{{p95}}
{{p96}}

{{p97}}

{{p98}}
{{p99}}

{{p100}}

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

{{p101}}
{{p102}}

______________________________________________

## ![ico-25 icon] some()

{{p103}}

{{p104}}

{{p105}}

{{p106}}
{{p107}}

{{p108}}

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

{{p109}}
{{p110}}

{{p111}}

~~~js
const res = people
  .map(human => human.country)
  .includes('Pakistan')
~~~
{{p112}}
~~~js
people
  .filter(x => x.country === 'Pakistan')
  .length > 0
~~~

____________________________

## ![ico-25 icon] reduce()

{{p113}}
{{p114}}
{{p115}}

{{p116}}
{{p117}}

{{p118}}
{{p119}}
{{p120}}

{{p121}}

{{p122}}

{{p123}}

~~~js
[1, 2, 3, 4, 5].reduce(accumulator => accumulator * 2) // 16
~~~

{{p124}}
{{p125}}

~~~js
accumulator => accumulator * 2
~~~

{{p126}}

•• 1 * 2 * 2 * 2 * 2 = 16 ••

_____________________________________

{{p127}}

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item) // 120
~~~

{{p128}}

•• 1 * 2 * 3 * 4 * 5 = 120 ••

____________________________

{{p129}}

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item, 5) // 600
~~~

•• 5 * 1 * 2 * 3 * 4 * 5 = 600 ••

{{p130}}

_________________________________

{{p131}}

~~~js
[10, 2, 3, 4, 5].reduce((accumulator, item, index) => accumulator * item + index) // 1319
~~~

{{p132}}

•• ((((10 + 0) * 2 + 1) * 3 + 2) * 4 + 3) * 5 + 4 = 1319 ••

_________________________________________

{{p133}}

{{p134}}

### ![ico-20 icon] {{p135}}

{{p136}}
{{p137}}

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

{{p138}}

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

{{p139}}

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

{{p140}}

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

{{p141}}
{{p142}}

{{p143}}

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

{{p144}}
{{p145}}
{{p146}}

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

{{p147}}
{{p148}}
{{p149}}
{{p150}}
{{p151}}

◘◘![ico-20 cap] ** 8**◘◘

~~~js
;[625, 5, 10].reduce(Math.sqrt) // 5
~~~

{{p152}}
••625 -> 25 -> 5••

{{p153}}

{{p154}}

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

{{p155}}
{{p156}}

{{{Array-iteration-methods-reduce-7.js}}}

_______________________________

### Math.pow

{{p157}}
{{p158}}

{{p159}}
{{p160}}

{{p161}}

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

{{p162}}

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

### ![ico-25 hw] {{common.c11}}

{{p163}}

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

{{p164}}

{{p165}}
{{p166}}
{{p167}}

{{p168}}

{{p169}}
{{p170}}
{{p171}}

{{p172}}

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
  ► [[Prototype]]: Array(0)
~~~

{{p173}}

◘◘![ico-20 cap] ** 2**◘◘
~~~js
var resArray = sourceArray
  .sort(function (x, y) {
    console.log(`${x.title} - ${y.title} = ${x.value - y.value}`)
    return  x.value - y.value
  })
~~~

~~~console
fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300
~~~

^^^[{{p174}}]
{{p175}}
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
  ► [[Prototype]]: Array(0)
~~~
^^^

{{p176}}

{{p177}}

{{p178}}

__________________________

## ![ico-25 icon] flatMap()

{{p179}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

{{p180}}

~~~js
console.log(cookie.split('; ').map(item => item.split('='))
~~~

~~~console
▼ (3) [Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "user"]
  ► 1: (2) ["token", "Jd7-js15/84"]
  ► 2: (2) ["interest", "javascript"]
    length: 3
  ► [[Prototype]]: Array(0)
~~~

{{p181}}

{{p182}}

~~~js
console.log(cookie.split('; ').flatMap(item => item.split('='))
~~~

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

{{p183}}

{{p184}}

~~~js
function (item) {
  return item.split('=')
}
~~~

{{p185}}

____________________________________________________

## ![ico-25 icon] keys()

{{p186}}
{{p187}}

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

~~~console
name user
token Jd7-js15/84
interest javascript
~~~

______________________

## ![ico-25 icon] values()

{{p188}}
{{p189}}

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

~~~console
► (2) ["name", "user"]
► (2) ["token", "Jd7-js15/84"]
► (2) ["inerest", "javascript"]
~~~

_____________________________________________

## ![ico-30 icon] {{p190}}

_________________________________________

### ![ico-25 cap] {{p191}}

{{p192}}

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

{{p193}}

~~~js
cards.reduce((result, card) => ({
  num: result.num,
  cash: result.cash + card.cash
}), { num: '457855155', cash: 0 })
~~~

~~~console
▼ { num: "457855155", cash: 10300 }
    cash: 10300
    num: "457855155"
  ► [[Prototype]]: Object
~~~

{{p194}}

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

{{p195}}

~~~console

▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {num: "457892425", cash: 0}
  ► 1: {num: "457812840", cash: 0}
  ► 2: {num: "457855780", cash: 0}
  ► 3: {num: "457811714", cash: 0}
    length: 4
  ► [[Prototype]]: Array(0)

~~~

__________________________________________

### ![ico-25 cap] {{p196}}

{{p197}}
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

{{p198}}

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

{{p199}}

{{p200}}

~~~js
Array.from(new Set(specialities))
~~~

{{p201}}

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

~~~console
▼ (3) ["google", "mozilla", "ie"]
    0: "google"
    1: "mozilla"
    2: "ie"
    length: 3
  ► [[Prototype]]: Array(0)
~~~

_________________________________________________

### ![ico-25 cap] {{p202}}

{{p203}}

~~~js
const intervals = [[10, 20], [4, 18], [7, 10], [5, 16], [9, 13], [11, 15], [7, 15], [10, 12], [12, 19]]
~~~

{{p204}}

{{p205}}
~~~js
Array.prototype.interior = function (interval = [0, 1]) {
  return this[0] < interval[0] && this[1] > interval[1]
}
~~~
{{p206}}
~~~js
[18, 35].interior([4, 18]) // false
[18, 35].interior([20, 28]) // true
~~~
{{p207}}
~~~js
intervals
  .map((segment, index, array) => array.filter(interval => segment.interior(interval)).length)
~~~

~~~console
► (9) [2, 6, 0, 5, 1, 0, 2, 0, 0]
~~~

__________________________

### ![ico-25 cap] {{p208}}

{{p209}}

{{p210}}
{{p211}}

{{p212}}

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

{{p213}}

~~~js
Array.from(document.getElementsByClassName('interlanguage-link'))
  .map(item => getComputedStyle(item))
  .forEach(item => console.log(item['font-family']))
~~~

________________________________________________

※※※tests ⟦f36⟧※※※
