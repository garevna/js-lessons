# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

__________________________________________

{{s1.p5}}

~~~js
const func = (x, y, z) => x + y - z
~~~

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}
{{s1.p9}}

~~~js
const func = (x, y, z) => x + y - z * Math.random()
~~~

{{s1.p10}}

~~~js
const makeCounter = () => {
  let counter = 0
  return () => counter++
}

const counter = makeCounter()
~~~

{{s1.p11}}

{{s1.p12}}
{{s1.p13}}

___________________________________________________________

{{s1.p14}}

{{s1.p15}}

{{s1.p16}}

~~~js
const numbers = [10, 5, 7]
let sum = 0

for (const number of array) {
  sum += number
}
~~~

{{s1.p17}}

~~~js
const summation = array => {
  return (function recurse (index = 0, sum = 0) {
    sum += array[index++]
    return index < array.length ? recurse (index, sum) : sum
  })()
}
~~~

{{s1.p18}}

~~~js
const numbers = [10, 5, 7]

summation(numbers)  // 22
~~~

{{s1.p19}}

{{s1.p20}}

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
  }
  return sum
}
~~~

{{s1.p21}}

~~~js
summation()
~~~

{{s1.p22}}

{{s1.p23}}

{{s1.p24}}

~~~js
const numbers = [10, 5, 7]

const show = (numbers, sum) => setTimeout(() => console.log(`[${numbers.toString()}] : ${sum}`), Math.random() * 2500)

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
    show(numbers, sum)
  }
  return sum
}
~~~

{{s1.p25}}

~~~js
numbers = [10, 5, 7]

summation()
~~~

{{{functionality.js}}}

{{s1.p26}}
{{s1.p27}}
{{s1.p28}}

{{s1.p29}}

{{s1.p30}}

{{s1.p31}}

{{s1.p32}}

~~~js
const numbers = [10, 5, 7]

const randomNum = lim => Math.floor(Math.random() * lim)

const summation = () => numbers[randomNum(numbers.length - 1)] = randomNum(20)

const show = () => console.log(`[${numbers.toString()}]`)

const callFunc = () => {
  if (Math.random() > 0.5) {
    summation()
    show ()
  } else {
    show ()
    summation()
  }
}
~~~

{{s1.p33}}

{{{functionality-1.js}}}

_______________________________________________________

{{s1.p34}}

{{s1.p35}}

{{s1.p36}}
{{s1.p37}}
{{s1.p38}}

{{s1.p39}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

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

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

~~~js
animal(frog)
animal(elefant)
~~~

{{s2.p5}}

~~~console
frog
elefant
~~~

{{s2.p6}}

![](https://lh3.googleusercontent.com/3GB6A4pHq6LgFdRGD31bjB5sEUMgWCTYJHf9JmNjOX-r-6PMN54s6-vRTL5d73Nw7lKkAntT_2d0Ea4kcEpenX-gTm8nuNXGXvgJ0DKxw82A36E8hZbr-Zmggh9N7ZJbK4G5TkfTDDY5DHw)

{{s2.p7}}

~~~js
function animal (func) {
  typeof func === 'function' ? func() : null
}
~~~

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

~~~js
function frog () {
  return 'frog'
}
function elefant () {
  return 'elefant'
}
~~~

{{s2.p11}}

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

{{s2.p12}}

~~~js
newFunc(frog, 'sample')
~~~

{{s2.p13}}

{{s2.p14}}

~~~js
newFunc(elefant, 'sample')
~~~

{{s2.p15}}

________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
function createFunction (param) {
  return function () {
    console.log('function ', param)
  }
}
~~~

{{s3.p3}}

~~~js
var firstFunc = createFunction('First')
var secondFunc = createFunction('Second')
~~~

{{s3.p4}}

~~~js
firstFunc()
secondFunc()
~~~

{{s3.p5}}

~~~console
function  First
function  Second
~~~
