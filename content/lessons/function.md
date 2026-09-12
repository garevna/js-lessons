# ![ico-35 study] {{s1.h1}}

@@@@
{{s1.p1}}
![](images/funcs-are-our-jam.svg)
@@@@

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}
{{s1.p7}}

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

### ![ico-25 icon] console.log

{{s2.p4}}
{{s2.p5}}

§§§§ Demo | function_console_template §§§§

{{s2.p6}}

§§§§ Demo | function_console_01_template §§§§

{{s2.p7}}

§§§§ Demo | function_console_02_template §§§§

_________________________________________________

### ![ico-25 icon] parseInt

{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

§§§§ Demo | function_parseInt_template §§§§

{{s2.p12}}

~~~js
parseInt()
~~~

{{s2.p13}}

{{s2.p14}}
{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}

§§§§ Demo | function_parseInt_01_template §§§§

{{s2.p19}}

_____________________________________________________________________

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
console.log(Math)
~~~

{{s3.p3}}

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

{{s3.p4}}
{{s3.p5}}

~~~console
round: ƒ round()
~~~

{{s3.p6}}

§§§§ Demo | function_math_template §§§§

{{s3.p7}}
{{s3.p8}}

~~~console
Math.sqrt(16)
~~~

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

~~~js
var sin = Math.sin(Math.PI / 2)
~~~

{{s3.p12}}
{{s3.p13}}
{{s3.p14}}
{{s3.p15}}

§§§§ Demo | function_math_01_template §§§§

{{s3.p16}}

~~~console
var argument = Math.PI / 2
~~~

{{s3.p17}}

{{s3.p18}}

{{s3.p19}}

~~~console
argument
~~~

{{s3.p20}}

{{s3.p21}}

~~~console
Math.sin(argument)
~~~

{{s3.p22}}

{{s3.p23}}

~~~console
var sin = Math.sin(argument)
~~~

{{s3.p24}}

______________________________________________

{{s3.p25}}
{{s3.p26}}
{{s3.p27}}

{{s3.p28}}
{{s3.p29}}
{{s3.p30}}

{{s3.p31}}

§§§§ Demo | function_console_03_template §§§§

______________________________________________

## ![ico-30 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

{{s4.p4}}
{{s4.p5}}

~~~js
{
  var number = 5
  var name = 'Google'
}
~~~

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}

§§§§ Demo | function_00_template §§§§

{{s4.p9}}
{{s4.p10}}
{{s4.p11}}

{{s4.p12}}

~~~js
var func = {
  var number = 5
  var name = 'Google'
}
~~~

{{s4.p13}}
{{s4.p14}}
{{s4.p15}}
{{s4.p16}}

~~~error
    Uncaught SyntaxError: Unexpected identifier 'number'
~~~

{{s4.p17}}

{{s4.p18}}

{{s4.p19}}

~~~js
var func = function {
  var number = 5
  var name = 'Google'
}
~~~

{{s4.p20}}

~~~error
    Uncaught SyntaxError: Unexpected token '{'
~~~

{{s4.p21}}
{{s4.p22}}

{{s4.p23}}

{{s4.p24}}

~~~js
var func = function () {
  var number = 5
  var name = 'Google'
}
~~~

{{s4.p25}}

{{s4.p26}}
{{s4.p27}}

{{s4.p28}}
{{s4.p29}}

{{s4.p30}}

§§§§ Demo | function_01_template §§§§

{{s4.p31}}
{{s4.p32}}
{{s4.p33}}

{{s4.p34}}

~~~js
func()
~~~

§§§§ Demo | function_02_template §§§§

{{s4.p35}}

~~~js
var func = function () {}
~~~

{{s4.p36}}

{{s4.p37}}

{{s4.p38}}

_____________________________________________________________________

{{s4.p39}}

~~~js
function func () {}
~~~

{{s4.p40}}
{{s4.p41}}
{{s4.p42}}

{{s4.p43}}
{{s4.p44}}

_________________________________________________

{{s4.p45}}
{{s4.p46}}

~~~js
var func = 10
func()
~~~

~~~error
    Uncaught TypeError: func is not a function
~~~

{{s4.p47}}
{{s4.p48}}
{{s4.p49}}
_________________________________________________

## ![ico-30 icon] {{s5.h1}}

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
{{s5.p12}}

§§§§ Demo | function_parameters_template §§§§

{{s5.p13}}
{{s5.p14}}
{{s5.p15}}
{{s5.p16}}
{{s5.p17}}

### ![ico-25 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

§§§§ Demo | function_parameters_01_template §§§§

{{s6.p3}}

§§§§ Demo | function_parameters_02_template §§§§

{{s6.p4}}

§§§§ Demo | function_parameters_03_template §§§§

{{s6.p5}}

__________________________________________________________________

## ![ico-30 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}

~~~js
var calcs = function (x = 1, y = x * 2, z = 0) {
  return x + y - z
}
~~~

{{s7.p4}}
{{s7.p5}}

~~~error
    Uncaught SyntaxError: Illegal return statement
~~~

{{s7.p6}}

{{s7.p7}}
{{s7.p8}}

____________________________________________________________________

## ![ico-25 icon] {{s8.h1}}

◘◘** 1**◘◘
~~~js
var func = function (arg) {
  return Math.random() * arg
}
~~~

→→→ {{s8.quiz1}} | {{s8.quizVariants1}} | {{s8.quizAnswer1}}→→→

◘◘** 2**◘◘
~~~js
function greeting (userName) {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s8.quiz2}} | {{s8.quizVariants2}} | {{s8.quizAnswer2}}→→→

◘◘** 3**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s8.quiz3}} | {{s8.quizVariants3}} | {{s8.quizAnswer3}}→→→


◘◘** 4**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Welcome ' + userName + '!'
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s8.quiz4}} | {{s8.quizVariants4}} | {{s8.quizAnswer4}}→→→

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
