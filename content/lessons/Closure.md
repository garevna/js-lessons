# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
function parent (arg) {
  var frog = 'I\'m frog'
  return function () {
    console.log(arg, frog)
  }
}

var child = parent('Hello!')
~~~

{{s1.p7}}

~~~js
child()  // Hello!  I'm frog
~~~

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var parent = message => () => console.log(message)

var hello = parent('Hello!')
var welcome = parent('Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

{{s1.p8}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var parent = message => console.log(message)

var hello = parent.bind(null, 'Hello!')
var welcome = parent.bind (null, 'Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function parent (omega) {
  var alpha = 0
  return () => omega > alpha
    ? omega-- - alpha++
    : null
}

var child = parent(20)
~~~

{{s1.p9}}
{{s1.p10}}

~~~js
child() // 20
child() // 18
...
~~~

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function first (firstArg) {
  function second (secondArg) {
    return firstArg.toString().split('').join(secondArg)
  }
  return function () {
    return second('*')
  }
}

first('Happy New Year!')()
~~~

{{s1.p11}}

_______________________

## ![ico-25 icon] IIFE

**_Immediately Invoked Function Expression_**

{{s1.p12}}
{{s1.p13}}

{{s1.p14}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})
~~~

{{s1.p15}}
{{s1.p16}}

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

{{s1.p17}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

{{s1.p18}}

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{s1.p19}}
{{s1.p20}}

{{s1.p21}}

{{s1.p22}}

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

{{s1.p23}}

{{s1.p24}}

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{s1.p25}}

______________________

{{s1.p26}}
{{s1.p27}}

{{s1.p28}}

{{s1.p29}}

{{s1.p30}}

{{s1.p31}}

{{s1.p32}}

{{s1.p33}}
{{s1.p34}}

{{s1.p35}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
var sayHello = (function (message) {
  return function (name) {
    console.log(`${ message }, ${ name }`)
  }
})('Hello')

sayHello('Дима')
sayHello ('Николай')
~~~

{{s1.p36}}

-----------------------------

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
{{s2.p5}}

_____________________________

## ![ico-25 warn] Function

{{s2.p6}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
var __var__ = 'Global Scope'

function functionConstructor() {
  var __var__ = 'Function Scope'
  return new Function('console.warn(__var__)')
}

function functionDeclaration() {
  var __var__ = 'Closured Scope'
  return function () {
    console.info(__var__)
  }
}

functionConstructor()()   // Global Scope
functionDeclaration()()   // Closured Scope
~~~

_____________________________

## ![ico-25 warn] Memory Leaks

{{s2.p7}}

{{s2.p8}}

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var globalFunc

function closure () {
  var data = new Array(1000000)
  var func = globalFunc

  function innerFunc() {
    if (func) return data
  }

  return function () {}
}

setInterval(() => globalFunc = closure(), 5)
~~~

{{s2.p9}}

{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}
{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}

{{s2.p19}}
{{s2.p20}}

_____________________________

{{s2.p21}}
