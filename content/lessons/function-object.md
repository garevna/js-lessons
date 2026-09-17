# ![ico-30 study] {{p1}}

_______________________________________


{{p2}}
{{p3}}

^^![ico-25 file] ECMAScript® 2016 Language Specification^^

_______________________________________________

## ![ico-25 icon] {{p4}}

{{p5}}
{{p6}}
{{p7}}

{{p8}}

{{p9}}
{{p10}}

~~~js
function test () {
  var args = Array.from(arguments)
  ...
}
~~~

{{p11}}
{{p12}}

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

{{p13}}

~~~js
function testArguments () {
  console.log(arguments.callee.name)
}

testArguments() // testArguments
~~~

^^^[{{common.c0}} 2]

{{p14}}

~~~js
function getArguments (param) {
  return param ? param : arguments.callee
}
~~~

{{p15}}

{{p16}}

~~~js
var x = getArguments()
var y = getArguments('Привет!')
~~~

{{p17}}
{{p18}}

{{p19}}

{{p20}}

{{p21}}

{{p22}}

~~~js
x('До свидания!')
~~~

{{p23}}

^^^

^^^[{{common.c0}} 3]

![ico-25 cap] ** 3 **

{{p24}}

~~~js
function setProperty (prop, val) {
  arguments.callee[prop] = val
}
~~~

{{p25}}

~~~js
setProperty('isActive', false)
setProperty('value', 50)
~~~

{{p26}}

~~~js
setProperty('method', function () {
  console.log('А еще я умею вышивать крестиком')
})
~~~

{{p27}}

{{p28}}

{{p29}}

^^^

^^^[{{common.c0}} 4]

![ico-25 cap] ** 4 **

{{p30}}

{{p31}}

~~~js
var factorial = function (num) {
  var res = 1, n = 1
  while (n <= num) res *= n++
}
~~~

{{p32}}

~~~js
var factorial = function (num) {
  if (!arguments.callee.res) arguments.callee.res = []
  var res = 1, n = 1
  while (n <= num) res *= n++
  arguments.callee.res.push(res)
  return res
}
~~~

{{p33}}

~~~js
factorial(5)
factorial(5)

console.log(factorial.res)
~~~

{{p34}}

^^^

{{p35}}

^^^[{{common.c0}} 5]

![ico-25 cap] ** 5 **

{{p36}}

{{p37}}

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

{{p38}}

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

{{p39}}

^^^

_______________________________________________

## ![ico-25 icon] {{p40}}

{{p41}}
{{p42}}

{{p43}}

{{p44}}

{{p45}}

{{p46}}
{{p47}}

^^^[{{p48}}]

![ico-30 ambulance]

{{p49}}
{{p50}}

{{p51}}

^^^

^^^[{{common.c19}}]

![ico-30 ambulance]

{{p52}}
{{p53}}

^^^

## ![ico-25 icon] {{common.c19}}

{{p54}}

{{p55}}

~~~js
patient.emergency()
~~~

{{p56}}

{{p57}}

{{p58}}
{{p59}}

_______________________________

^^^[{{common.c0}} 6]

![ico-25 cap] ** 6 **

{{p60}}

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

{{p61}}

{{p62}}

{{p63}}

~~~js
window['first']
~~~

{{p64}}

{{p65}}

~~~js
window['first']()
~~~

{{p66}}

~~~js
for (var funcName of ['first', 'second', 'third']) window[funcName]()
~~~

^^^

____________________________

### ![ico-20 icon] {{p67}}

{{p68}}

{{p69}}

{{p70}}

{{p71}}

{{p72}}

{{p73}}
{{p74}}
{{p75}}
{{p76}}
{{p77}}
{{p78}}
...

{{p79}}

_________________________________________

## ![ico-25 icon] {{p80}}

{{p81}}

{{p82}}

{{p83}}
{{p84}}
{{p85}}
![](illustrations/function-object-01.png)
{{p86}}
{{p87}}

![](illustrations/function-object-02.png)

{{p88}}

![ico-20 green-ok] LexicalEnvironment
![ico-20 green-ok] {{topic.t12}}
![ico-20 green-ok] ~this~

_____________________________________________

### ![ico-20 icon] Lexical Environment

{{p89}}
{{p90}}
{{p91}}

{{p92}}
{{p93}}

{{p94}}

{{p95}}

{{p96}}

{{p97}}

______________________________________________

### ![ico-20 icon] hoisting

{{p98}}

{{p99}}
{{p100}}
{{p101}}
{{p102}}
{{p103}}

{{p104}}
{{p105}}
{{p106}}

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

{{p107}}

{{p108}}

{{p109}}

~~~js
console.log(x)
~~~

{{p110}}

{{p111}}

~~~js
y = x + 5
~~~

{{p112}}

~~~js
console.log(y)
~~~

{{p113}}

~~~js
x = 5, y = 10
~~~

{{p114}}

{{p115}}

{{p116}}

~~~js
x = 1, y = 1
~~~

{{p117}}

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

{{p118}}

{{p119}}

{{p120}}

^^^

________________________________

### ![ico-20 icon] {{p121}}

{{p122}}

^^^[scope]

{{p123}}

{{p124}}
{{p125}}
{{p126}}

{{p127}}

{{p128}}
{{p129}}
{{p130}}

{{p131}}
{{p132}}

{{p133}}

_________________________________

{{p134}}

{{p135}}
{{p136}}
{{p137}}
{{p138}}

{{p139}}
{{p140}}
{{p141}}

{{p142}}
{{p143}}
{{p144}}
{{p145}}

____________________________

{{p146}}

___________________________

{{p147}}

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

{{p148}}

{{p149}}

{{p150}}

{{p151}}

~~~js
sample = 10
~~~

{{p152}}

{{p153}}

{{p154}}

{{p155}}

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

{{p156}}
{{p157}}
{{p158}}
{{p159}}
{{p160}}
{{p161}}
{{p162}}
{{p163}}
{{p164}}

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

{{p165}}
{{p166}}
{{p167}}
{{p168}}
{{p169}}
{{p170}}
{{p171}}

{{p172}}

^^^

____________________________________

### ![ico-20 icon] {{topic.t12}}

{{p173}}

{{p174}}
{{p175}}
{{p176}}

{{p177}}

{{p178}}

_______________________________________

### ![ico-20 icon] this

{{p179}}

{{p180}}

![](images/reference-is-a-lockpick.svg)

{{p181}}

_______________________________

![ico-25 cap] **12**

~~~js
function func () {
  console.log(this)
}
~~~

{{p182}}
{{p183}}

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

{{p184}}

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

{{p185}}

~~~js
function say () {
  console.log('function say: this: ', this)
}

function girl () {
  console.log('function girl: this: ', this)
}
~~~

{{p186}}

~~~js
girl.say = say
girl.say()     //  girl
girl()         // window
~~~

________________________________________

## ![ico-25 icon] prototype

{{p187}}
{{p188}}

~~~js
function sample () {}

console.dir(sample)
~~~

{{p189}}
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

{{p190}}
![](images/function-balls.svg)
{{p191}}
{{p192}}
{{p193}}

{{p194}}

_____________________

{{p195}}
{{p196}}
{{p197}}
{{p198}}
{{p199}}

{{p200}}

___________________________________

## {{p201}}

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/js/js_scope.asp)
