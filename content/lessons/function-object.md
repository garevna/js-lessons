# ![ico-30 study] {{s1.h1}}

_______________________________________


{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

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

{{s2.p9}}

~~~js
function testArguments () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(`[${ (i + ' ]').padEnd(10) } ${ arguments[i] }`)
  }
}

testArguments(27, false, 'Fill', [7, 4, 5], null)
~~~

______________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

~~~js
function testArguments () {
  console.log(arguments.callee.name)
}

testArguments() // testArguments
~~~

^^^[{{s3.spoiler1}}]

{{s3.p2}}

~~~js
function getArguments (param) {
  return param ? param : arguments.callee
}
~~~

{{s3.p3}}

{{s3.p4}}

~~~js
var x = getArguments()
var y = getArguments('Привет!')
~~~

{{s3.p5}}
{{s3.p6}}

{{s3.p7}}

{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

~~~js
x('До свидания!')
~~~

{{s3.p11}}

^^^

^^^[{{s3.spoiler2}}]

{{s3.p12}}

{{s3.p13}}

~~~js
function setProperty (prop, val) {
  arguments.callee[prop] = val
}
~~~

{{s3.p14}}

~~~js
setProperty('isActive', false)
setProperty('value', 50)
~~~

{{s3.p15}}

~~~js
setProperty('method', function () {
  console.log('А еще я умею вышивать крестиком')
})
~~~

{{s3.p16}}

{{s3.p17}}

{{s3.p18}}

^^^

^^^[{{s3.spoiler3}}]

{{s3.p19}}

{{s3.p20}}

{{s3.p21}}

~~~js
var factorial = function (num) {
  var res = 1, n = 1
  while (n <= num) res *= n++
}
~~~

{{s3.p22}}

~~~js
var factorial = function (num) {
  if (!arguments.callee.res) arguments.callee.res = []
  var res = 1, n = 1
  while (n <= num) res *= n++
  arguments.callee.res.push(res)
  return res
}
~~~

{{s3.p23}}

~~~js
factorial(5)
factorial(5)

console.log(factorial.res)
~~~

{{s3.p24}}

^^^

{{s3.p25}}

^^^[{{s3.spoiler4}}]

{{s3.p26}}

{{s3.p27}}

{{s3.p28}}

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

{{s3.p29}}

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

{{s3.p30}}

^^^

_______________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}
{{s4.p7}}

^^^[{{s4.spoiler1}}]

{{s4.p8}}

{{s4.p9}}
{{s4.p10}}

{{s4.p11}}

^^^

^^^[{{s4.spoiler2}}]

{{s4.p12}}

{{s4.p13}}
{{s4.p14}}

^^^

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
patient.emergency()
~~~

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}
{{s5.p6}}

_______________________________

^^^[{{s5.spoiler1}}]

{{s5.p7}}

{{s5.p8}}

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

{{s5.p9}}

{{s5.p10}}

{{s5.p11}}

~~~js
window['first']
~~~

{{s5.p12}}

{{s5.p13}}

~~~js
window['first']()
~~~

{{s5.p14}}

~~~js
for (var funcName of ['first', 'second', 'third']) window[funcName]()
~~~

^^^

____________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}
{{s6.p7}}
{{s6.p8}}
{{s6.p9}}
{{s6.p10}}
{{s6.p11}}
...

{{s6.p12}}

_________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
![](illustrations/function-object-01.png)
{{s7.p6}}
{{s7.p7}}

![](illustrations/function-object-02.png)

{{s7.p8}}

{{s7.p9}}
{{s7.p10}}
{{s7.p11}}

_____________________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}

{{s8.p4}}
{{s8.p5}}

{{s8.p6}}

{{s8.p7}}

{{s8.p8}}

{{s8.p9}}

______________________________________________

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}
{{s9.p3}}
{{s9.p4}}
{{s9.p5}}
{{s9.p6}}

{{s9.p7}}
{{s9.p8}}
{{s9.p9}}

^^^[{{s9.spoiler1}}]

{{s9.p10}}

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

{{s9.p11}}

{{s9.p12}}

{{s9.p13}}

~~~js
console.log(x)
~~~

{{s9.p14}}

{{s9.p15}}

~~~js
y = x + 5
~~~

{{s9.p16}}

~~~js
console.log(y)
~~~

{{s9.p17}}

~~~js
x = 5, y = 10
~~~

{{s9.p18}}

{{s9.p19}}

{{s9.p20}}

~~~js
x = 1, y = 1
~~~

{{s9.p21}}

^^^

^^^[{{s9.spoiler2}}]

{{s9.p22}}

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

{{s9.p23}}

{{s9.p24}}

{{s9.p25}}

^^^

________________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

^^^[{{s10.spoiler1}}]

{{s10.p2}}

{{s10.p3}}
{{s10.p4}}
{{s10.p5}}

{{s10.p6}}

{{s10.p7}}
{{s10.p8}}
{{s10.p9}}

{{s10.p10}}
{{s10.p11}}

{{s10.p12}}

_________________________________

{{s10.p13}}

{{s10.p14}}
{{s10.p15}}
{{s10.p16}}
{{s10.p17}}

{{s10.p18}}
{{s10.p19}}
{{s10.p20}}

{{s10.p21}}
{{s10.p22}}
{{s10.p23}}
{{s10.p24}}

____________________________

{{s10.p25}}

___________________________

{{s10.p26}}

^^^

^^^[{{s10.spoiler2}}]

{{s10.p27}}

~~~js
var sample = 1

function changeSample () {
  sample = 10
}

changeSample()
~~~

{{s10.p28}}

{{s10.p29}}

{{s10.p30}}

{{s10.p31}}

~~~js
sample = 10
~~~

{{s10.p32}}

{{s10.p33}}

{{s10.p34}}

{{s10.p35}}

^^^

^^^[{{s10.spoiler3}}]

{{s10.p36}}

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

{{s10.p37}}

~~~console
We are in the execution context of the function "showSample"
sample === function sample () {}
We left the execution context of the function "showSample"
Now sample === 1
~~~

{{s10.p38}}
{{s10.p39}}
{{s10.p40}}
{{s10.p41}}
{{s10.p42}}
{{s10.p43}}
{{s10.p44}}
{{s10.p45}}
{{s10.p46}}

^^^

^^^[{{s10.spoiler4}}]

{{s10.p47}}

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

{{s10.p48}}
{{s10.p49}}
{{s10.p50}}
{{s10.p51}}
{{s10.p52}}
{{s10.p53}}
{{s10.p54}}

{{s10.p55}}

^^^

____________________________________

### ![ico-20 icon] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}
{{s11.p3}}
{{s11.p4}}

{{s11.p5}}

{{s11.p6}}

_______________________________________

### ![ico-20 icon] {{s12.h1}}

{{s12.p1}}

{{s12.p2}}

![](images/reference-is-a-lockpick.svg)

{{s12.p3}}

_______________________________

{{s12.p4}}

~~~js
function func () {
  console.log(this)
}
~~~

{{s12.p5}}
{{s12.p6}}

________________________________

{{s12.p7}}

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

{{s12.p8}}

{{s12.p9}}

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

{{s12.p10}}

{{s12.p11}}

~~~js
function say () {
  console.log('function say: this: ', this)
}

function girl () {
  console.log('function girl: this: ', this)
}
~~~

{{s12.p12}}

~~~js
girl.say = say
girl.say()     //  girl
girl()         // window
~~~

________________________________________

## ![ico-25 icon] {{s13.h1}}

{{s13.p1}}
{{s13.p2}}

~~~js
function sample () {}

console.dir(sample)
~~~

{{s13.p3}}
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

{{s13.p4}}
![](images/function-balls.svg)
{{s13.p5}}
{{s13.p6}}
{{s13.p7}}

{{s13.p8}}

_____________________

{{s13.p9}}
{{s13.p10}}
{{s13.p11}}
{{s13.p12}}
{{s13.p13}}

{{s13.p14}}

___________________________________

## {{s14.h1}}

{{s14.p1}}
