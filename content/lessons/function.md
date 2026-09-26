# ![ico-35 study] {{p1}}

@@@@
{{p2}}
![](slogans/funcs-are-our-jam.svg)
@@@@

{{p3}}

{{p4}}
{{p5}}
{{p6}}

{{p7}}
{{p8}}

## ![ico-30 icon] {{p9}}

{{p10}}
{{p11}}

{{p12}}

### ![ico-25 icon] console.log

{{p13}}
{{p14}}

~~~demo
> console.log('Hello')
< Hello
< undefined
> console.log(5.25)
< 5.25
< undefined
> var alpha = 7
< undefined
> var betta = 9
< undefined
> console.log(alpha + betta)
< 16
< undefined
~~~

{{p15}}

~~~demo
> console.log(5 - 4) // Shift + Enter
>   console.log('Welcome, students!') // Shift + Enter
>   var number = 11 // Shift + Enter
>   console.log('Number: ', number) // Enter
< 1
< Welcome, students!
< Number:  11
< undefined
~~~

{{p16}}

~~~demo
> var user = {
>     name: 'Piter',
>     age: 25
>   }
< undefined
> console.log(user)
< ► {name: 'Piter', age: 25 }
< undefined
~~~

_________________________________________________

### ![ico-25 icon] parseInt

{{p17}}
{{p18}}
{{p19}}
{{p20}}

~~~demo
> parseInt('36px')
< 36
< parseInt(5.75)
< 5
< parseInt(undefined)
< NaN
< parseInt(null)
< NaN
< parseInt('abc7')
< NaN
< parseInt(false)
< NaN
~~~

{{p21}}

~~~js
parseInt()
~~~

{{p22}}

{{p23}}
{{p24}}
{{p25}}
{{p26}}
{{p27}}

~~~demo
> parseInt('10101010', 2)
< 170
< parseInt(10101010, 2)
< 170
< parseInt(587, 2)
< NaN
< parseInt(170, 8)
< 120
< parseInt(170, 16)
< 368
< parseInt('F', 16)
< 15
< parseInt('FF', 16)
< 255
~~~

{{p28}}

_____________________________________________________________________

### ![ico-25 icon] {{p29}}

{{p30}}

{{p31}}

~~~js
console.log(Math)
~~~

{{p32}}

~~~~console
▼ Math {abs: ƒ, acos: ƒ, acosh: ƒ, asin: ƒ, asinh: ƒ, …}
    E: 2.718281828459045
    LN2: 0.6931471805599453
    LN10: 2.302585092994046
    LOG2E: 1.4426950408889634
    LOG10E: 0.4342944819032518
    PI: 3.141592653589793
    SQRT1_2: 0.7071067811865476
    SQRT2: 1.4142135623730951
  ► abs: ƒ abs()
  ► acos: ƒ acos()
  ► acosh: ƒ acosh()
  ► asin: ƒ asin()
  ► asinh: ƒ asinh()
  ► atan: ƒ atan()
  ► atan2: ƒ atan2()
  ► atanh: ƒ atanh()
  ► cbrt: ƒ cbrt()
  ► ceil: ƒ ceil()
  ► clz32: ƒ clz32()
  ► cos: ƒ cos()
  ► cosh: ƒ cosh()
  ► exp: ƒ exp()
  ► expm1: ƒ expm1()
  ► floor: ƒ floor()
  ► fround: ƒ fround()
  ► hypot: ƒ hypot()
  ► imul: ƒ imul()
  ► log: ƒ log()
  ► log1p: ƒ log1p()
  ► log2: ƒ log2()
  ► log10: ƒ log10()
  ► max: ƒ max()
  ► min: ƒ min()
  ► pow: ƒ pow()
  ► random: ƒ random()
  ► round: ƒ round()
  ► sign: ƒ sign()
  ► sin: ƒ sin()
  ► sinh: ƒ sinh()
  ► sqrt: ƒ sqrt()
  ► tan: ƒ tan()
  ► tanh: ƒ tanh()
  ► trunc: ƒ trunc()
    Symbol(Symbol.toStringTag): "Math"
  ► [[Prototype]]: Object
~~~~

{{p33}}
{{p34}}

~~~console
round: ƒ round()
~~~

{{p35}}

~~~demo
> Math.sin(Math.PI / 2)
< 1
> Math.sqrt(16)
< 4
> Math.pow(4, 2)
< 16
> var number = 9
< undefined
> Math.sqrt(number)
< 3
> Math.pow(number, 2)
< 81
~~~

{{p36}}
{{p37}}

~~~console
Math.sqrt(16)
~~~

{{p38}}

{{p39}}

{{p40}}

~~~js
var sin = Math.sin(Math.PI / 2)
~~~

{{p41}}
{{p42}}
{{p43}}
{{p44}}

~~~demo
> var argument = Math.PI / 2
< undefined
> argument
< 1.5707963267948966
> Math.sin(argument)
< 1
~~~

{{p45}}

~~~console
var argument = Math.PI / 2
~~~

{{p46}}

{{p47}}

{{p48}}

~~~console
argument
~~~

{{p49}}

{{p50}}

~~~console
Math.sin(argument)
~~~

{{p51}}

{{p52}}

~~~console
var sin = Math.sin(argument)
~~~

{{p53}}

______________________________________________

{{p54}}
{{p55}}
{{p56}}

{{p57}}
{{p58}}
{{p59}}

{{p60}}

~~~demo
> typeof parseInt
< 'function'
> typeof console.log
< 'function'
< typeof Math.sqrt
< 'function'
~~~

______________________________________________

## ![ico-30 icon] {{p61}}

{{p62}}
{{p63}}

{{p64}}

{{p65}}
{{p66}}

~~~js
{
  var number = 5
  var name = 'Google'
}
~~~

{{p67}}
{{p68}}
{{p69}}

~~~demo
> var bool = 5 < 8
> {
>   var number = 5
>   var name = 'Mozilla'
> }
> var test = typeof number < typeof name
< undefined
> bool
< true
> number
< 5
> name
< "Mozilla"
> test
< true
~~~

{{p70}}
{{p71}}
{{p72}}

{{p73}}

~~~js
var func = {
  var number = 5
  var name = 'Google'
}
~~~

{{p74}}
{{p75}}
{{p76}}
{{p77}}

~~~error
    Uncaught SyntaxError: Unexpected identifier 'number'
~~~

{{p78}}

{{p79}}

{{p80}}

~~~js
var func = function {
  var number = 5
  var name = 'Google'
}
~~~

{{p81}}

~~~error
    Uncaught SyntaxError: Unexpected token '{'
~~~

{{p82}}
{{p83}}

{{p84}}

{{p85}}

~~~js
var func = function () {
  var number = 5
  var name = 'Google'
}
~~~

{{p86}}

{{p87}}
{{p88}}

{{p89}}
{{p90}}

{{p91}}

~~~demo
> var number = 8, name = 'Google'
< undefined
> var func = function () {
>   number = 5
>   name = 'Mozilla'
>   }
< undefined
> number
< 8
> name
< "Google"
> func
< ƒ () {
<     number = 5
<     name = 'Mozilla'
<   }
~~~

{{p92}}
{{p93}}
{{p94}}

{{p95}}

~~~js
func()
~~~

~~~demo
> func()
< undefined
> number
< 5
> name
< "Mozilla"
~~~

{{p96}}

~~~js
var func = function () {}
~~~

{{p97}}

{{p98}}

{{p99}}

_____________________________________________________________________

{{p100}}

~~~js
function func () {}
~~~

{{p101}}
{{p102}}
{{p103}}

{{p104}}
{{p105}}

_________________________________________________

{{p106}}
{{p107}}

~~~js
var func = 10
func()
~~~

~~~error
    Uncaught TypeError: func is not a function
~~~

{{p108}}
{{p109}}
{{p110}}
_________________________________________________

## ![ico-30 icon] {{p111}}

{{p112}}
{{p113}}

{{p114}}

{{p115}}
{{p116}}
{{p117}}
{{p118}}
{{p119}}

{{p120}}
{{p121}}
{{p122}}
{{p123}}

~~~demo
> function example (arg1, arg2) {
>     console.log (arg1, arg2)
>   }
< undefined
> example(5, 10)
< 5 10
> var summarize = function  (number1, number2) {
>     console.log (number1 + number2)
>   }
< undefined
> summarize(9, 8)
< 17
< undefined
~~~

{{p124}}
{{p125}}
{{p126}}
{{p127}}
{{p128}}

### ![ico-25 icon] {{p129}}

{{p130}}
{{p131}}

~~~demo
> function example (param1, param2, param3) {
>     var min = Math.min(param1, param2, param3, 10)
>     console.log(min * 100)
>   }
< undefined
> example(false, null, '0')
< 0
> example()
< NaN
~~~

{{p132}}

~~~demo
> function test (param1 = 1, param2 = 1, param3 = 1) {
>     console.log(param1, param2, param3)
>   }
< undefined
> test(false, undefined, 0)
< false 1 0
< undefined
> test()
< 1 1 1
< undefined
~~~

{{p133}}

~~~demo
> function calcs (x = 1, y = x + 1, z = x + y) {
>     console.log(x, y, z)
>   }
< undefined
> calcs()
< 1 2 3
< undefined
> calcs(8)
< 8 9 17
< undefined
> calcs(undefined, undefined, 8)
< 1 2 8
< undefined
~~~

{{p134}}

__________________________________________________________________

## ![ico-30 icon] {{p135}}

{{p136}}

{{p137}}
{{p138}}

~~~js
var calcs = function (x = 1, y = x * 2, z = 0) {
  return x + y - z
}
~~~

{{p139}}
{{p140}}

~~~error
    Uncaught SyntaxError: Illegal return statement
~~~

{{p141}}

{{p142}}
{{p143}}

____________________________________________________________________

## ![ico-25 icon] {{common.c11}}

◘◘** 1**◘◘
~~~js
var func = function (arg) {
  return Math.random() * arg
}
~~~

→→→ {{p144}} | {{p145}} | {{p146}}→→→

◘◘** 2**◘◘
~~~js
function greeting (userName) {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{topic.t13}} | {{p147}} | {{p148}}→→→

◘◘** 3**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{topic.t13}} | {{p149}} | {{p150}}→→→


◘◘** 4**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Welcome ' + userName + '!'
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{topic.t13}} | {{p151}} | {{p152}}→→→

◘◘** 5**◘◘
~~~js
function randomInteger (number = 100) {
  return Math.round(Math.random() * number)
}
~~~

→→→ randomInteger() > 100 | true, false, undefined, 0, NaN | false→→→

◘◘** 6**◘◘
~~~js
function hexToDecimal (hexNumber = 0) {
  return parseInt(hexNumber, 16) || 0
}
~~~

→→→ !hexToDecimal() | undefined, true, false, 0, NaN | true→→→

◘◘** 7**◘◘
~~~js
function binToDecimal (bin = '1111111') {
  return parseInt(bin, 2) || 0
}
~~~

→→→ binToDecimal('540') | undefined, true, false, 0, NaN | 0→→→

◘◘** 8**◘◘
~~~js
function hexToDecimal (hex = 'FF') {
  return parseInt(hex, 16) || 255
}
~~~

→→→ hexToDecimal('rob') | undefined, true, false, 0, NaN, 255 | 255→→→
____________________________________________________________________

[![ico-25 hw] Quiz](quiz/function)

_______________________________________
[![ico-20 link] w3schools](external/w3-function)
[![ico-20 link] MDN](external/mdn-function)
