# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
![](images/funcs-are-our-jam.svg)
{{s1.p3}}

{{s1.p4}}

{{s1.p5}}
{{s1.p6}}
{{s1.p7}}

{{s1.p8}}
{{s1.p9}}

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

§§§§ {{s3.demo1}} | function_console_template §§§§

{{s3.p3}}

§§§§ {{s3.demo2}} | function_console_01_template §§§§

{{s3.p4}}

§§§§ {{s3.demo3}} | function_console_02_template §§§§

_________________________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}
{{s4.p4}}

§§§§ {{s4.demo1}} | function_parseInt_template §§§§

{{s4.p5}}

~~~js
parseInt()
~~~

{{s4.p6}}

{{s4.p7}}
{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}

§§§§ {{s4.demo2}} | function_parseInt_01_template §§§§

{{s4.p12}}

_____________________________________________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
console.log(Math)
~~~

{{s5.p3}}

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

{{s5.p4}}
{{s5.p5}}

~~~console
round: ƒ round()
~~~

{{s5.p6}}

§§§§ {{s5.demo1}} | function_math_template §§§§

{{s5.p7}}
{{s5.p8}}

~~~console
Math.sqrt(16)
~~~

{{s5.p9}}

{{s5.p10}}

{{s5.p11}}

~~~js
var sin = Math.sin(Math.PI / 2)
~~~

{{s5.p12}}
{{s5.p13}}
{{s5.p14}}
{{s5.p15}}

§§§§ {{s5.demo2}} | function_math_01_template §§§§

{{s5.p16}}

~~~console
var argument = Math.PI / 2
~~~

{{s5.p17}}

{{s5.p18}}

{{s5.p19}}

~~~console
argument
~~~

{{s5.p20}}

{{s5.p21}}

~~~console
Math.sin(argument)
~~~

{{s5.p22}}

{{s5.p23}}

~~~console
var sin = Math.sin(argument)
~~~

{{s5.p24}}

______________________________________________

{{s5.p25}}
{{s5.p26}}
{{s5.p27}}

{{s5.p28}}
{{s5.p29}}
{{s5.p30}}

{{s5.p31}}

§§§§ {{s5.demo3}} | function_console_03_template §§§§

______________________________________________

## ![ico-30 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

{{s6.p3}}

{{s6.p4}}
{{s6.p5}}

~~~js
{
  var number = 5
  var name = 'Google'
}
~~~

{{s6.p6}}
{{s6.p7}}
{{s6.p8}}

§§§§ {{s6.demo1}} | function_00_template §§§§

{{s6.p9}}
{{s6.p10}}
{{s6.p11}}

{{s6.p12}}

~~~js
var func = {
  var number = 5
  var name = 'Google'
}
~~~

{{s6.p13}}
{{s6.p14}}
{{s6.p15}}
{{s6.p16}}

~~~error
    Uncaught SyntaxError: Unexpected identifier 'number'
~~~

{{s6.p17}}

{{s6.p18}}

{{s6.p19}}

~~~js
var func = function {
  var number = 5
  var name = 'Google'
}
~~~

{{s6.p20}}

~~~error
    Uncaught SyntaxError: Unexpected token '{'
~~~

{{s6.p21}}
{{s6.p22}}

{{s6.p23}}

{{s6.p24}}

~~~js
var func = function () {
  var number = 5
  var name = 'Google'
}
~~~

{{s6.p25}}

{{s6.p26}}
{{s6.p27}}

{{s6.p28}}
{{s6.p29}}

{{s6.p30}}

§§§§ {{s6.demo2}} | function_01_template §§§§

{{s6.p31}}
{{s6.p32}}
{{s6.p33}}

{{s6.p34}}

~~~js
func()
~~~

§§§§ {{s6.demo3}} | function_02_template §§§§

{{s6.p35}}

~~~js
var func = function () {}
~~~

{{s6.p36}}

{{s6.p37}}

{{s6.p38}}

_____________________________________________________________________

{{s6.p39}}

~~~js
function func () {}
~~~

{{s6.p40}}
{{s6.p41}}
{{s6.p42}}

{{s6.p43}}
{{s6.p44}}

_________________________________________________

{{s6.p45}}
{{s6.p46}}

~~~js
var func = 10
func()
~~~

~~~error
    Uncaught TypeError: func is not a function
~~~

{{s6.p47}}
{{s6.p48}}
{{s6.p49}}
_________________________________________________

## ![ico-30 icon] {{s7.h1}}

{{s7.p1}}
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

§§§§ {{s7.demo1}} | function_parameters_template §§§§

{{s7.p13}}
{{s7.p14}}
{{s7.p15}}
{{s7.p16}}
{{s7.p17}}

### ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}

§§§§ {{s8.demo1}} | function_parameters_01_template §§§§

{{s8.p3}}

§§§§ {{s8.demo2}} | function_parameters_02_template §§§§

{{s8.p4}}

§§§§ {{s8.demo3}} | function_parameters_03_template §§§§

{{s8.p5}}

__________________________________________________________________

## ![ico-30 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}
{{s9.p3}}

~~~js
var calcs = function (x = 1, y = x * 2, z = 0) {
  return x + y - z
}
~~~

{{s9.p4}}
{{s9.p5}}

~~~error
    Uncaught SyntaxError: Illegal return statement
~~~

{{s9.p6}}

{{s9.p7}}
{{s9.p8}}

____________________________________________________________________

## ![ico-25 icon] {{s10.h1}}

{{s10.p1}}
~~~js
var func = function (arg) {
  return Math.random() * arg
}
~~~

→→→ {{s10.quiz1}} | {{s10.quizVariants1}} | {{s10.quizAnswer1}}→→→

{{s10.p2}}
~~~js
function greeting (userName) {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s10.quiz2}} | {{s10.quizVariants2}} | {{s10.quizAnswer2}}→→→

{{s10.p3}}
~~~js
function greeting (userName = 'Human') {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s10.quiz3}} | {{s10.quizVariants3}} | {{s10.quizAnswer3}}→→→


{{s10.p4}}
~~~js
function greeting (userName = 'Human') {
  return 'Welcome ' + userName + '!'
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ {{s10.quiz4}} | {{s10.quizVariants4}} | {{s10.quizAnswer4}}→→→

{{s10.p5}}
~~~js
function randomInteger (number = 100) {
  return Math.round(Math.random() * number)
}
~~~

→→→ {{s10.quiz5}} | {{s10.quizVariants5}} | {{s10.quizAnswer5}}→→→

{{s10.p6}}
~~~js
function hexToDecimal (hexNumber = 0) {
  return parseInt(hexNumber, 16) || 0
}
~~~

→→→ {{s10.quiz6}} | {{s10.quizVariants6}} | {{s10.quizAnswer6}}→→→

{{s10.p7}}
~~~js
function binToDecimal (bin = '1111111') {
  return parseInt(bin, 2) || 0
}
~~~

→→→ {{s10.quiz7}} | {{s10.quizVariants7}} | {{s10.quizAnswer7}}→→→

{{s10.p8}}
~~~js
function hexToDecimal (hex = 'FF') {
  return parseInt(hex, 16) || 255
}
~~~

→→→ {{s10.quiz8}} | {{s10.quizVariants8}} | {{s10.quizAnswer8}}→→→
____________________________________________________________________

{{s10.p9}}

_______________________________________
{{s10.p10}}
{{s10.p11}}
