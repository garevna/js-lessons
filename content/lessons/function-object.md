# ![ico-30 study] {{s1.h1}}

_______________________________________


{{s1.p1}}
{{s1.p2}}

^^![ico-25 file] ECMAScript® 2016 Language Specification^^

_______________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}
{{s2.p6}}

~~~js
function test () {
  var args = Array.from(arguments)
  ...
}
~~~

{{s2.p7}}
{{s2.p8}}

♦♦♦1♦♦♦

~~~js
function testArguments () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(`[${ (i + ' ]').padEnd(10) } ${ arguments[i] }`)
  }
}

testArguments(27, false, 'Fill', [7, 4, 5], null)
~~~

______________________________________

### ![ico-20 icon] arguments.callee

{{s2.p10}}

~~~js
function testArguments () {
  console.log(arguments.callee.name)
}

testArguments() // testArguments
~~~

^^^[{{common.c0}} 2]

{{s2.p11}}

~~~js
function getArguments (param) {
  return param ? param : arguments.callee
}
~~~

{{s2.p12}}

{{s2.p13}}

~~~js
var x = getArguments()
var y = getArguments('Привет!')
~~~

{{s2.p14}}
{{s2.p15}}

{{s2.p16}}

{{s2.p17}}

{{s2.p18}}

{{s2.p19}}

~~~js
x('До свидания!')
~~~

{{s2.p20}}

^^^

^^^[{{common.c0}} 3]

![ico-25 cap] ** 3 **

{{s2.p21}}

~~~js
function setProperty (prop, val) {
  arguments.callee[prop] = val
}
~~~

{{s2.p22}}

~~~js
setProperty('isActive', false)
setProperty('value', 50)
~~~

{{s2.p23}}

~~~js
setProperty('method', function () {
  console.log('А еще я умею вышивать крестиком')
})
~~~

{{s2.p24}}

{{s2.p25}}

{{s2.p26}}

^^^

^^^[{{common.c0}} 4]

![ico-25 cap] ** 4 **

{{s2.p27}}

{{s2.p28}}

~~~js
var factorial = function (num) {
  var res = 1, n = 1
  while (n <= num) res *= n++
}
~~~

{{s2.p29}}

~~~js
var factorial = function (num) {
  if (!arguments.callee.res) arguments.callee.res = []
  var res = 1, n = 1
  while (n <= num) res *= n++
  arguments.callee.res.push(res)
  return res
}
~~~

{{s2.p30}}

~~~js
factorial(5)
factorial(5)

console.log(factorial.res)
~~~

{{s2.p31}}

^^^

{{s2.p32}}

^^^[{{common.c0}} 5]

![ico-25 cap] ** 5 **

{{s2.p33}}

{{s2.p34}}

~~~js
var buttons = []

for (var n = 0; n < 5; n++) {
  buttons[n] = document.body
    .appendChild(document.createElement('button'))
  buttons[n].innerText = n
  buttons[n].onclick = function (event) {
    if (!arguments.callee.res) arguments.callee.res = []
    arguments.callee.res.push(Math.round(event.timeStamp))
    console.log(arguments.callee.res)
  }
}
~~~

{{s2.p35}}

~~~js
var buttons = []

for (var n = 0; n < 5; n++) {
  buttons[n] = document.body
    .appendChild(document.createElement('button'))
  buttons[n].innerText = 0
  buttons[n].style = 'padding: 8px 16px'
  buttons[n].onclick = function (event) {
    var func = arguments.callee
    if (!func.clicksTime) func.clicksTime = []
    func.clicksTime.push(Math.round(event.timeStamp))
    console.log(func.clicksTime)
    var len = func.clicksTime.length
    event.target.innerText = len
    func.res = len > 1
      ? func.clicksTime[len - 1] - func.clicksTime[len - 2]
      : 0
    console.info(`Интервал между последними кликами: ${func.res}`)
  }
}
~~~

{{s2.p36}}

^^^

_______________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}
{{s3.p7}}

^^^[{{common.c199}}]

![ico-30 ambulance]

{{s3.p8}}
{{s3.p9}}

{{s3.p10}}

^^^

^^^[{{common.c27}}]

![ico-30 ambulance]

{{s3.p11}}
{{s3.p12}}

^^^

## ![ico-25 icon] {{common.c27}}

{{s4.p1}}

{{s4.p2}}

~~~js
patient.emergency()
~~~

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}
{{s4.p6}}

_______________________________

^^^[{{common.c0}} 6]

![ico-25 cap] ** 6 **

{{s4.p7}}

~~~js
function first () {
  console.log('Function "first" is working now.')
}
function second () {
  console.log('Function "second" is working now.')
}
function third () {
  console.log('Function "third" is working now.')
}
~~~

{{s4.p8}}

{{s4.p9}}

{{s4.p10}}

~~~js
window['first']
~~~

{{s4.p11}}

{{s4.p12}}

~~~js
window['first']()
~~~

{{s4.p13}}

~~~js
for (var funcName of ['first', 'second', 'third']) window[funcName]()
~~~

^^^

____________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}
{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}
{{s5.p11}}
...

{{s5.p12}}

_________________________________________

## ![ico-25 icon] {{common.c199}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}
{{s6.p4}}
{{s6.p5}}
![](illustrations/function-object-01.png)
{{s6.p6}}
{{s6.p7}}

![](illustrations/function-object-02.png)

{{s6.p8}}

![ico-20 green-ok] LexicalEnvironment
![ico-20 green-ok] {{common.c42}}
![ico-20 green-ok] ~this~

_____________________________________________

### ![ico-20 icon] Lexical Environment

{{s6.p10}}
{{s6.p11}}
{{s6.p12}}

{{s6.p13}}
{{s6.p14}}

{{s6.p15}}

{{s6.p16}}

{{s6.p17}}

{{s6.p18}}

______________________________________________

### ![ico-20 icon] hoisting

{{s6.p19}}

{{s6.p20}}
{{s6.p21}}
{{s6.p22}}
{{s6.p23}}
{{s6.p24}}

{{s6.p25}}
{{s6.p26}}
{{s6.p27}}

^^^[{{common.c0}} 7]

![ico-25 cap] ** 7 **

~~~js
function delegat () {
  console.log(x)
  y = x + 5
  console.log(y)
  x = 5, y = 10

  return  x * 4 +  y / 2

  var x = 1, y = 1
}
~~~

{{s6.p28}}

{{s6.p29}}

{{s6.p30}}

~~~js
console.log(x)
~~~

{{s6.p31}}

{{s6.p32}}

~~~js
y = x + 5
~~~

{{s6.p33}}

~~~js
console.log(y)
~~~

{{s6.p34}}

~~~js
x = 5, y = 10
~~~

{{s6.p35}}

{{s6.p36}}

{{s6.p37}}

~~~js
x = 1, y = 1
~~~

{{s6.p38}}

^^^

^^^[{{common.c0}} 8]

![ico-25 cap] ** 8**

~~~js
var treg = 5

function delegat () {
  treg = 10
  return

  function treg () {
    return
  }
}
delegat()
console.log(treg)  // 5
~~~

{{s6.p39}}

{{s6.p40}}

{{s6.p41}}

^^^

________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

^^^[scope]

{{s7.p2}}

{{s7.p3}}
{{s7.p4}}
{{s7.p5}}

{{s7.p6}}

{{s7.p7}}
{{s7.p8}}
{{s7.p9}}

{{s7.p10}}
{{s7.p11}}

{{s7.p12}}

_________________________________

{{s7.p13}}

{{s7.p14}}
{{s7.p15}}
{{s7.p16}}
{{s7.p17}}

{{s7.p18}}
{{s7.p19}}
{{s7.p20}}

{{s7.p21}}
{{s7.p22}}
{{s7.p23}}
{{s7.p24}}

____________________________

{{s7.p25}}

___________________________

{{s7.p26}}

^^^

^^^[{{common.c0}} 9]

![ico-25 cap] ** 9**

~~~js
var sample = 1

function changeSample () {
  sample = 10
}

changeSample()
~~~

{{s7.p27}}

{{s7.p28}}

{{s7.p29}}

{{s7.p30}}

~~~js
sample = 10
~~~

{{s7.p31}}

{{s7.p32}}

{{s7.p33}}

{{s7.p34}}

^^^

^^^[{{common.c0}} 10]

![ico-25 cap] **10**

~~~js
var sample = 1

function showSample () {
  console.info('We are in the execution context of the function "showSample"')
  console.info(`sample === ${sample}`)

  return

  function sample () {}
}

showSample()

console.info('We left the execution context of the function "showSample"')
console.info(`Now sample === ${sample}`)
~~~

**{{common.c2}}**

~~~console
We are in the execution context of the function "showSample"
sample === function sample () {}
We left the execution context of the function "showSample"
Now sample === 1
~~~

{{s7.p36}}
{{s7.p37}}
{{s7.p38}}
{{s7.p39}}
{{s7.p40}}
{{s7.p41}}
{{s7.p42}}
{{s7.p43}}
{{s7.p44}}

^^^

^^^[{{common.c0}} 11]

![ico-25 cap] **11**

~~~js
var sample = 1

function showSample () {
  console.info('We are in the execution context of the function "showSample"')
  console.info(`(1) ${sample}`)
  sample()
  console.info(`(2) ${sample}`)
  sample = 10
  console.info(`(3) ${sample}`)

  return

  function sample () { sample = 5 }
}

showSample()

console.info(`(global) ${sample}`)
~~~

{{s7.p45}}
{{s7.p46}}
{{s7.p47}}
{{s7.p48}}
{{s7.p49}}
{{s7.p50}}
{{s7.p51}}

{{s7.p52}}

^^^

____________________________________

### ![ico-20 icon] {{common.c42}}

{{s8.p1}}

{{s8.p2}}
{{s8.p3}}
{{s8.p4}}

{{s8.p5}}

{{s8.p6}}

_______________________________________

### ![ico-20 icon] this

{{s8.p7}}

{{s8.p8}}

![](images/reference-is-a-lockpick.svg)

{{s8.p9}}

_______________________________

![ico-25 cap] **12**

~~~js
function func () {
  console.log(this)
}
~~~

{{s8.p10}}
{{s8.p11}}

________________________________

![ico-25 cap] **13**

~~~js
function func () {
  child()

  function child () {
    console.log('child this: ', this)
  }
}

func()  // window
~~~

___________________________________

![ico-25 cap] **14**

{{s8.p12}}

~~~js
var human = {
  name: 'Ivan',
  say: function () {
    console.log('this: ', this)
  }
}

human.say() // будет выведен объект  human
~~~

________________________________

![ico-25 cap] **15**

{{s8.p13}}

~~~js
function say () {
  console.log('function say: this: ', this)
}

function girl () {
  console.log('function girl: this: ', this)
}
~~~

{{s8.p14}}

~~~js
girl.say = say
girl.say()     //  girl
girl()         // window
~~~

________________________________________

## ![ico-25 icon] prototype

{{s8.p15}}
{{s8.p16}}

~~~js
function sample () {}

console.dir(sample)
~~~

{{common.c197}}
~~~console
▼ ƒ sample()
      arguments: null
      caller: null
      length: 0
      name: "sample"
    ▼ prototype:
        ▶ constructor: ƒ sample()
        ▶ __proto__: Object
    ▶ __proto__: ƒ ()
      [[FunctionLocation]]: VM476:1
    ▼ [[Scopes]]: Scopes[1]
        ▶ 0: Global {type: "global", name: "", object: Window}
~~~

{{s8.p18}}
![](images/function-balls.svg)
{{s8.p19}}
{{s8.p20}}
{{s8.p21}}

{{s8.p22}}

_____________________

{{s8.p23}}
{{s8.p24}}
{{s8.p25}}
{{s8.p26}}
{{s8.p27}}

{{s8.p28}}

___________________________________

## {{s9.h1}}

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/js/js_scope.asp)
