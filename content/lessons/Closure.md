# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}

{{p6}}

{{p7}}

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

{{p8}}

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

{{p9}}

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

{{p10}}
{{p11}}

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

{{p12}}

_______________________

## ![ico-25 icon] IIFE

**_Immediately Invoked Function Expression_**

{{p13}}
{{p14}}

{{p15}}

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

{{p16}}
{{p17}}

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

{{p18}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

{{p19}}

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{p20}}
{{p21}}

{{p22}}

{{p23}}

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

{{p24}}

{{p25}}

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{p26}}

______________________

{{p27}}
{{p28}}

{{p29}}

{{p30}}

{{p31}}

{{p32}}

{{p33}}

{{p34}}
{{p35}}

{{p36}}

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

{{p37}}

-----------------------------

## ![ico-25 icon] {{p38}}

{{p39}}

{{p40}}
{{p41}}

{{p42}}
{{p43}}

_____________________________

## ![ico-25 warn] Function

{{p44}}

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

{{p45}}

{{p46}}

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

{{p47}}

{{p48}}
{{p49}}
{{p50}}
{{p51}}
{{p52}}
{{p53}}
{{p54}}
{{p55}}
{{p56}}

{{p57}}
{{p58}}

_____________________________

※※※tests ⟦f8⟧※※※
