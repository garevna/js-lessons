# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

~~~js
function parent (arg) {
  var frog = 'I\'m frog'
  return function () {
    console.log(arg, frog)
  }
}

var child = parent('Hello!')
~~~

{{s1.p8}}

~~~js
child()  // Hello!  I'm frog
~~~

{{s1.p9}}

~~~js
var parent = message => () => console.log(message)

var hello = parent('Hello!')
var welcome = parent('Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

{{s1.p10}}

{{s1.p11}}

~~~js
var parent = message => console.log(message)

var hello = parent.bind(null, 'Hello!')
var welcome = parent.bind (null, 'Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

{{s1.p12}}

~~~js
function parent (omega) {
  var alpha = 0
  return () => omega > alpha
    ? omega-- - alpha++
    : null
}

var child = parent(20)
~~~

{{s1.p13}}
{{s1.p14}}

~~~js
child() // 20
child() // 18
...
~~~

{{s1.p15}}

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

{{s1.p16}}

_______________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})
~~~

{{s2.p6}}
{{s2.p7}}

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

{{s2.p8}}

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

{{s2.p9}}

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{s2.p10}}
{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

{{s2.p14}}

{{s2.p15}}

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

{{s2.p16}}

______________________

{{s2.p17}}
{{s2.p18}}

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

{{s2.p22}}

{{s2.p23}}

{{s2.p24}}
{{s2.p25}}

{{s2.p26}}

{{s2.p27}}

~~~js
var sayHello = (function (message) {
  return function (name) {
    console.log(`${ message }, ${ name }`)
  }
})('Hello')

sayHello('Дима')
sayHello ('Николай')
~~~

{{s2.p28}}

-----------------------------

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}

{{s3.p4}}
{{s3.p5}}

_____________________________

## ![ico-25 warn] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

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

## ![ico-25 warn] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

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

{{s5.p4}}

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

_____________________________

{{s5.p16}}
