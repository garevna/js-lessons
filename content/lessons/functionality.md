# ![ico-30 study] {{p1}}

{{p2}}
{{p3}}
{{p4}}
{{p5}}

__________________________________________

{{p6}}

~~~js
const func = (x, y, z) => x + y - z
~~~

{{p7}}
{{p8}}

{{p9}}
{{p10}}

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

{{p12}}

{{p13}}
{{p14}}

___________________________________________________________

{{p15}}

{{p16}}

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

{{p24}}

◘◘![ico-25 cap] ** 1**◘◘

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

{{p25}}

~~~js
numbers = [10, 5, 7]

summation()
~~~

{{{functionality.js}}}

{{p26}}
{{p27}}
{{p28}}

{{p29}}

{{p30}}

{{p31}}

◘◘![ico-25 cap] ** 2**◘◘

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

{{p32}}

{{{functionality-1.js}}}

_______________________________________________________

{{p33}}

{{p34}}

{{p35}}
{{p36}}
{{p37}}

{{p38}}

## ![ico-25 icon] {{p39}}

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

![](https://lh3.googleusercontent.com/3GB6A4pHq6LgFdRGD31bjB5sEUMgWCTYJHf9JmNjOX-r-6PMN54s6-vRTL5d73Nw7lKkAntT_2d0Ea4kcEpenX-gTm8nuNXGXvgJ0DKxw82A36E8hZbr-Zmggh9N7ZJbK4G5TkfTDDY5DHw)

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

## ![ico-25 icon] {{p54}}

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
