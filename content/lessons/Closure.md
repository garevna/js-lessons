# ![ico-30 study] {{замыкание.h1}}

{{замыкание.p1}}

{{замыкание.p2}}

{{замыкание.p3}}

{{замыкание.p4}}

{{замыкание.p5}}

{{замыкание.p6}}

{{замыкание.p7}}

~~~js
function parent (arg) {
  var frog = 'I\'m frog'
  return function () {
    console.log(arg, frog)
  }
}

var child = parent('Hello!')
~~~

{{замыкание.p8}}

~~~js
child()  // Hello!  I'm frog
~~~

{{замыкание.p9}}

~~~js
var parent = message => () => console.log(message)

var hello = parent('Hello!')
var welcome = parent('Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

{{замыкание.p10}}

{{замыкание.p11}}

~~~js
var parent = message => console.log(message)

var hello = parent.bind(null, 'Hello!')
var welcome = parent.bind (null, 'Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

{{замыкание.p12}}

~~~js
function parent (omega) {
  var alpha = 0
  return () => omega > alpha
    ? omega-- - alpha++
    : null
}

var child = parent(20)
~~~

{{замыкание.p13}}
{{замыкание.p14}}

~~~js
child() // 20
child() // 18
...
~~~

{{замыкание.p15}}

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

{{замыкание.p16}}

_______________________

## ![ico-25 icon] {{iife.h1}}

{{iife.p1}}

{{iife.p2}}
{{iife.p3}}

{{iife.p4}}

{{iife.p5}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})
~~~

{{iife.p6}}
{{iife.p7}}

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

{{iife.p8}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

{{iife.p9}}

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{iife.p10}}
{{iife.p11}}

{{iife.p12}}

{{iife.p13}}

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

{{iife.p14}}

{{iife.p15}}

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{iife.p16}}

______________________

{{iife.p17}}
{{iife.p18}}

{{iife.p19}}

{{iife.p20}}

{{iife.p21}}

{{iife.p22}}

{{iife.p23}}

{{iife.p24}}
{{iife.p25}}

{{iife.p26}}

{{iife.p27}}

~~~js
var sayHello = (function (message) {
  return function (name) {
    console.log(`${ message }, ${ name }`)
  }
})('Hello')

sayHello('Дима')
sayHello ('Николай')
~~~

{{iife.p28}}

-----------------------------

## ![ico-25 icon] {{паттерн-модуль.h1}}

{{паттерн-модуль.p1}}

{{паттерн-модуль.p2}}
{{паттерн-модуль.p3}}

{{паттерн-модуль.p4}}
{{паттерн-модуль.p5}}

_____________________________

## ![ico-25 warn] {{function.h1}}

{{function.p1}}

{{function.p2}}

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

## ![ico-25 warn] {{memory-leaks.h1}}

{{memory-leaks.p1}}

{{memory-leaks.p2}}

{{memory-leaks.p3}}

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

{{memory-leaks.p4}}

{{memory-leaks.p5}}
{{memory-leaks.p6}}
{{memory-leaks.p7}}
{{memory-leaks.p8}}
{{memory-leaks.p9}}
{{memory-leaks.p10}}
{{memory-leaks.p11}}
{{memory-leaks.p12}}
{{memory-leaks.p13}}

{{memory-leaks.p14}}
{{memory-leaks.p15}}

_____________________________

{{memory-leaks.p16}}
