# {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

~~~js
console.log(Array.prototype)
~~~

{{{Array-iteration-methods-theory.js}}}

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

_____________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}


◘◘![ico-20 cap] ** 1**◘◘

~~~js
Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

;[7, 4, 1].iterate(console.log)
~~~

{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

{{s2.p12}}
{{s2.p13}}

{{s2.p14}}

~~~js
Array.prototype.iterate = function (func, index) {
  if (typeof func !== 'function') throw new TypeError('First argument is not a function.')
  let number = typeof index === 'number' ? index : 0
  func(this[number])
  number++ < this.length - 1 && this.iterate.call(this, func, number)
}

;[7, 4, 1].iterate(console.log)
~~~

_____________________________________________

{{s2.p15}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js   
Array.prototype.iterate = function (func) {
  const res = []
  for (const item of this) res.push(typeof func === 'function' ? func(item) : item)
  return res
}

;[49, 4, 25].iterate(Math.sqrt)
~~~

{{s2.p16}}

~~~console
► (3) [7, 2, 5]
~~~

{{s2.p17}}
{{s2.p18}}
{{s2.p19}}

~~~js
const squaring = num => Math.pow(num, 2)
;[7, 2, 5].iterate(squaring)
~~~

{{s2.p20}}

~~~console
► (3) [49, 4, 25]
~~~

_____________________________________________

{{s2.p21}}
{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

◘◘![ico-20 cap] ** 3**◘◘

~~~js
Array.prototype.filtering = function (func) {
  const res = []
  for (const item of this) func(item) && res.push(item)
  return res
}

const func = num => num < 10
;[108, 24, 5, 17, 1, 7].filtering(func)
~~~

{{s2.p25}}

~~~console
► (3) [5, 1, 7]
~~~

~~~js   
[7, 4, 1, 20, 8].filtering(item => item > 5)
~~~

{{s2.p26}}

~~~console
► (3) [7, 20, 8]
~~~

_____________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}
{{s4.p3}}

◘◘ ![ico-25 cap] ** 4** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [7, 5, 0, 11]

Array.prototype.iterate = function (callback, context) {
  const res = []
  for (const item of this) {
    res.push(callback.call(context, item, this.indexOf(item), this))
  }
  return res
}

const sample = numbers.iterate(function (item, index, arr) {
  return this[index] + arr[index]
}, alter)

console.log(sample)
~~~

{{s4.p4}}

~~~console
► (4) [15, 9, 9, 18]
~~~

◘◘ ![ico-25 cap] ** 5** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [-4, 1, -2, 0]

Array.prototype.iterate = function (callback, context) {
  const res = []
  const func = callback.bind(context)
  for (const item of this) res.push(func(item))
  return res
}

const sample = numbers.iterate(function (item) {
  return item + this.shift()
}, alter)

console.log(sample)
~~~

{{s4.p5}}

~~~console
► (4) [4, 5, 7, 7]
~~~

{{s4.p6}}

~~~js
console.log(alter) // []
~~~

{{s4.p7}}
{{s4.p8}}

_____________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}

{{s5.p5}}

{{s5.p6}}


◘◘![ico-20 cap] ** 6**◘◘

~~~js
const numbers = [8, 4, 9, 7]

Array.prototype.iterate = function (func) {
  const res = []
  let index = 0
  for (const item of this) {
    res.push(func(item, index++, this))
  }
  return res
}

const sample = numbers.iterate((item, index, arr) => item * index - arr[0])

console.log(sample)
~~~

{{s5.p7}}

~~~console
► (4) [-8, -4, 10, 13]
~~~

{{s5.p8}}

___________________________________________________

## ![ico-25 icon] Side effects

{{s5.p9}}
{{s5.p10}}
{{s5.p11}}
_______________________
{{s5.p12}}
______________________
{{s5.p13}}
{{s5.p14}}
{{s5.p15}}

{{s5.p16}}

{{s5.p17}}


◘◘![ico-20 cap] ** 7**◘◘

~~~js
const users = [
  { name: 'Helen', age: 25 },
  { name: 'Robert', age: 18 },
  { name: 'Mary', age: 20 },
  { name: 'Piter', age: 30 }
]

Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

users
  .iterate(user => user.age++)
~~~

{{s5.p18}}
{{s5.p19}}
{{s5.p20}}

☼☼☼ {{s5.slogan1}} ☼☼☼

{{s5.p21}}

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {name: 'Helen', age: 26}
  ► 1: {name: 'Robert', age: 19}
  ► 2: {name: 'Mary', age: 21}
  ► 3: {name: 'Piter', age: 31}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

{{s5.p22}}
{{s5.p23}}
{{s5.p24}}

{{s5.p25}}

_____________________________________________

{{s5.p26}}

◘◘![ico-20 cap] ** 8**◘◘

~~~js
var browsers = ['Chrome', 'FireFox', 'Opera', 'Safari', 'Edge']

const storeItem = function (item, index, arr) {
  this.history = Array.isArray(this.history) ? this.history : []
  this.history.push(item)
}

Array.prototype.iterate = function (func) {
  for (var item of this) func.call(func.prototype, item)
}

browsers.iterate(storeItem, storeItem)

console.dir(storeItem)
~~~

{{s5.p27}}

~~~console
▼ ƒ storeItem(item, index, arr)
  ▼ history: Array(5)
      0: "Chrome"
      1: "FireFox"
      2: "Opera"
      3: "Safari"
      4: "Edge"
      length: 5
    ► __proto__: Array(0)
    arguments: null
    caller: null
    length: 3
    name: "storeItem"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

_____________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}
{{s6.p4}}
{{s6.p5}}

{{s6.p6}}

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return res
}

numbers.idempotence(Math.sqrt)
~~~

{{s6.p7}}

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

{{s6.p8}}

{{s6.p9}}

~~~js
numbers[6] = 125

numbers.idempotence(Math.sqrt)
~~~

{{s6.p10}}

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

{{s6.p11}}

{{s6.p12}}

~~~js
Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return JSON.stringify(res)
}
~~~

{{s6.p13}}

{{s6.p14}}

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

{{s6.p15}}

{{s6.p16}}

◘◘![ico-20 cap] **10**◘◘
~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  if (!this.initialState) {
    this.result = []
    this.initialState = JSON.parse(JSON.stringify(this))
    for (const item of this.initialState) this.result.push(func(item))
  }

  return JSON.stringify(this.result)
}

numbers.idempotence(Math.sqrt)
~~~

{{s6.p17}}

~~~console
'[5,4,3,7,9,8,2]'
~~~

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

{{s6.p18}}

~~~console
'[5,4,3,7,9,8,2]'
~~~

__________________________________
{{s6.p19}}

^^^[![](icons/coffee.png) 11]
~~~js
Array.prototype.idempotence = function (func) {
  const funcArg = func.toString()
  try {
    var sourceData = JSON.stringify(this)
  } catch (err) {
    console.warn(err)
    return null
  }

  const self = this.__proto__

  if (!self.funcs) self.funcs = []
  if (!self.data) self.data = []
  if (!self.results) self.results = []

  if (!self.funcs.includes(funcArg)) self.funcs.push(funcArg)
  if (!self.data.includes(sourceData)) self.data.push(sourceData)

  const index = self.funcs.indexOf(funcArg)
  const num = self.data.indexOf(sourceData)

  if (!self.results[num]) self.results[num] = []

  if (!self.results[num][index]) {
    const result = []
    for (const item of this) {
      result.push(func(item))
    }
    self.results[num][index] = result
  }

  return self.results[num][index]
}
~~~
^^^

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]
numbers.idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
[25, 16, 9, 49, 81, 64, 4].idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
numbers.idempotence(item => item + Math.floor(item + Math.random() * 100))
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

~~~js
const randomize = item => item + Math.floor(item + Math.random() * 100)
[25, 16, 9, 49, 81, 64, 4].idempotence(randomize)
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

_____________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

◘◘![ico-20 cap] **11**◘◘
~~~js
const jobs = [
  'developer',
  'worker',
  'salesman',
  'manager'
]

const users = [
  { name: 'Piter', job: 1 },
  { name: 'Helen', job: 2 },
  { name: 'Robert', job: 0 },
  { name: 'Michael', job: 1 },
  { name: 'Andrew', job: 0 },
  { name: 'Mary', job: 2 },
  { name: 'Gregory', job: 3 },
]

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  for (const item of this) result.push(func.call(context, item))
  return result
}

function showUser (user) {
  return `<p>${user.name}: ${this[user.job]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = users.iterate(showUser, jobs).join('')
~~~

_____________________________

{{s7.p2}}

◘◘![ico-20 cap] **12**◘◘

~~~js
const salary = [4000, 3200, 4500, 2800, 3500, 2400, 3700]

const workers = ['Piter', 'Helen', 'Robert', 'Michael', 'Andrew', 'Mary', 'Gregory']

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  index = 0
  for (const item of this) result.push(func.call(context, item, index++))
  return result
}

function showSalary (worker, index) {
  return `<p>${worker}: ${this[index]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = workers.iterate(showSalary, salary).join('')
~~~

__________________________________________

◘◘![ico-20 cap] **13**◘◘

~~~js
const arr = [
  'google',
  'service',
  'user',
  () => Math.round(Math.random() * 1000),
  false
]

function test (elem, index, ref) {
  typeof elem === 'function' && ref.splice(index, 1, elem())
  return ref[index]
}

Array.prototype.iterate = function (func) {
  var res = []
  for (var item of this) res.push(func(item, this.indexOf(item), this))
  return res
}

arr.iterate(test)
~~~
__________________________________________


{{s7.p3}}

◘◘![ico-20 cap] **14**◘◘

~~~js
const companList = ['Google', 'Mozilla', 'Microsoft']
const browsers = ['Chrome', 'Firefox', 'Edge']

function test (prop, index) {
  this[index] = { [prop] : this[index] }
}

Array.prototype.iterate = function (func, context) {
  var index = index && typeof index === 'number' ? index : 0
  for (var item of this) func.call(context, item, index++)
}

companList.iterate(test, browsers)

console.log(browsers)
~~~

{{s7.p4}}

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {Google: "Chrome"}
  ► 1: {Mozilla: "Firefox"}
  ► 2: {Microsoft: "Edge"}
    length: 3
  ► __proto__: Array(0)
~~~

________________________________________________________________


{{s7.p5}}

________________________________________________________________

[![ico-30 hw] Quiz](quiz/arrayIterationMethods)
