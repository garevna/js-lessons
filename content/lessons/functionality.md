# ![ico-30 study] {{p1}}

## ![ico-25 icon] {{p8}}

•••• none
{{p2}}
{{p3}}
{{p4}}
{{p5}}
••••

__________________________________________

### ![ico-20 icon] {{p10}}

{{p6}}

~~~js
const func = (x, y, z) => x + y - z
~~~

{{p7}}

{{p9}}


~~~js
const func = (x, y, z) => x + y - z * Math.random()
~~~

{{p11}}

~~~js
const makeCounter = () => {
  let counter = 0
  return () => counter++
}

const counter = makeCounter()
~~~

••••
{{p12}}
{{p13}}
••••

___________________________________________________________

### ![ico-20 icon] {{p14}}

••••
{{p15}}
{{p16}}
••••

{{p17}}

~~~js
const numbers = [10, 5, 7]
let sum = 0

for (const number of array) {
  sum += number
}
~~~

{{p18}}

~~~js
const summation = array => {
  return (function recurse (index = 0, sum = 0) {
    sum += array[index++]
    return index < array.length ? recurse (index, sum) : sum
  })()
}
~~~

{{p19}}

~~~js
const numbers = [10, 5, 7]

summation(numbers)  // 22
~~~

{{p20}}

{{p21}}

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
  }
  return sum
}
~~~

{{p22}}

~~~js
summation()
~~~

{{p23}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  for (const num of numbers) {
    sum += numbers.shift()
    numbers.push(sum)
  }
  console.log(`[${numbers.toString()}]:`, sum)
}

summation()
summation()
summation()
~~~

~~~console
[10,15,22]: 22
[10,25,47]: 47
[10,35,82]: 82
~~~

________________________________________

### ![ico-20 icon] {{p24}}

•••• none
{{p25}}
{{p26}}
••••

~~~js
function setAdmin (user) {
  user.role = 'admin'
  return user
}
~~~

{{p27}}
{{p28}}

{{p29}}

~~~js
function five () {
  console.log(5)
  return 5
}

five(five(five(five())))
~~~

~~~console
5
5
5
5
<• 5
~~~

{{p30}}

◘◘![ico-25 cap] **2**◘◘

~~~js
function initArray (array) {
  if (!Array.isArray(array) {
    return false
  }
  array.length = 0
  array.push(1, 2, 3, 4, 5)
  return true
}
~~~

{{p31}}

_______________________________________________________

## ![ico-25 icon] {{p32}}

{{p33}}

••••
{{p34}}
{{p35}}
{{p36}}
{{p37}}
{{p38}}
••••

### ![ico-20 icon] {{p39}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
function frog () {
  console.log('frog')
}
function elefant () {
  console.log('elefant')
}

function animal (func) {
  func()
}
~~~

{{p40}}

{{p41}}

{{p42}}

~~~js
animal(frog)
animal(elefant)
~~~

{{p43}}

~~~console
frog
elefant
~~~

{{p44}}

~~~console
<p class="error-message">Uncaught TypeError&colon; func is not a function</p>
~~~

{{p45}}

~~~js
function animal (func) {
  typeof func === 'function' ? func() : null
}
~~~

{{p46}}

{{p47}}

{{p48}}

~~~js
function frog () {
  return 'frog'
}
function elefant () {
  return 'elefant'
}
~~~

{{p49}}

~~~js
function newFunc (func, elemId) {
  const elem = document.getElementById(elemId)

  if (!elem || !elem.nodeType || elem.nodeType !== 1) return

  function makeElem () {
    const el = document.createElement('p')
    elem.appendChild(el)
    el.innerHTML = func()
    console.log(el)
  }

  typeof func === 'function' && makeElem(func, elem)
}
~~~

{{p50}}

~~~js
newFunc(frog, 'sample')
~~~

{{p51}}

{{p52}}

~~~js
newFunc(elefant, 'sample')
~~~

{{p53}}

________________________________

### ![ico-20 icon] {{p54}}

{{p55}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function createFunction (param) {
  return function () {
    console.log('function ', param)
  }
}
~~~

{{p56}}

~~~js
var firstFunc = createFunction('First')
var secondFunc = createFunction('Second')
~~~

{{p57}}

~~~js
firstFunc()
secondFunc()
~~~

{{topic.t10}}

~~~console
function  First
function  Second
~~~

________________________________________

### ![ico-20 icon] {{p65}}

{{p58}}

◘◘![ico-25 cap] **5**◘◘

~~~js
function first (a, b, c) {
  if (!a || typeof a !== 'number') {
      return first
  }
  if (!b || typeof b !== 'number') {
    return function second (b, c) {
      if (!b || typeof b !== 'number') {
        return second
      }
      if (!c || typeof c !== 'number') {
        return function third (c) {
          if (!c || typeof c !== 'number') {
            return third
          }
          return a + b + c
        }
      } else {
        return a + b + c
      }
    }
  } else {
    if (!c || typeof c !== 'number') {
      return function third (c) {
        if (!c) return third
        return a + b + c
      }
    } else {
      return a + b + c
    }
  }
}

console.log('first(5, 10, 20):', first(5, 10, 20))
console.log('first(5)(10)(20):', first(5)(10)(20))
~~~

~~~console
first(5, 10, 20): 35
first(5)(10)(20): 35
~~~

{{p59}}
{{p60}}
{{p61}}
{{p62}}
{{p63}}
{{p64}}

~~~js
const second = first(5)
const third = second(10)
console.log('third(20):', third(20))
~~~

~~~console
third(20): 35
~~~

~~~js
console.log('first("a", "b", "c")')
console.dir(first('a', 'b', 'c'))
~~~

~~~console
first("a", "b", "c")
▼ ƒ first(a, b, c)
    length: 3
    name: "first"
  ► prototype: {}
    arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

~~~js
console.log('first(5, 10, "*"):')
console.dir(first(5, 10, '*'))
~~~

~~~console
▼ ƒ third(c)
    length: 1
    name: "third"
  ► prototype: {}
    arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

{{p66}}

~~~js
first('*')(undefined)(5)(NaN)(7)(false)(null)(3)
~~~

~~~console
15
~~~
