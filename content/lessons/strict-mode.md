# ![ico-30 study] strict mode

~~~js
'use strict'
~~~

{{s0.p1}}

{{s0.p2}}

~~~js
function sample () {
  'use strict'
  ...
}
~~~

{{s0.p3}}

________________________________________________

## ![ico-25 error] {{s1.h1}}


### ![ico-20 warn] {{s2.h1}} 

~~~js
'use strict'

x = 8
~~~

{{s2.p1}}

••![ico-20 error] Uncaught ReferenceError: x is not defined••

^^^[Memory leaks]

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}

^^^

_________________________________

### ![ico-20 warn] {{s3.h1}}

{{s3.p1}}

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

{{s3.p2}}

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

{{s3.p3}}

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] {{s4.h1}}

{{s4.p1}}

~~~js
var x = 010   // 8
~~~

{{s4.p2}}

~~~js
'use strict'

var x = 010
~~~

{{s4.p3}}

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] {{s5.h1}}

{{s5.p1}}

~~~js
var x = '\010'   // ""
~~~

{{s5.p2}}

~~~js
'use strict'

var x = '\010'
~~~

{{s5.p3}}

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] {{s6.h1}}

{{s6.p1}}

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

{{s6.p2}}

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

{{s6.p3}}

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] {{s7.h1}}

{{s7.p1}}

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

{{s7.p2}}

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

{{s7.p3}}

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] {{s8.h1}}

{{s8.p1}}

~~~js
delete Object.prototype  // false
~~~

{{s8.p2}}

~~~js
'use strict'

delete Object.prototype
~~~

{{s8.p3}}

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] {{s9.h1}}

{{s9.p1}}

~~~js
var eval = 7  // 7
~~~

{{s9.p2}}

~~~js
'use strict'

var eval = 7
~~~

{{s9.p3}}

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] {{s10.h1}}

{{s10.p1}}

~~~js
var arguments = 7  // 7
~~~

{{s10.p2}}

~~~js
'use strict'

var arguments = 7
~~~

{{s10.p3}}

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] {{s11.h1}}

{{s11.p1}}

~~~js
function test () {
  console.log(arguments.callee)
}

test ()
~~~

{{s11.p2}}

~~~console

ƒ test () {
  console.log(arguments.callee)
}
~~~

{{s11.p3}}

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

{{s11.p4}}

![ico-20 error] ~~~console
  
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions or the arguments objects for calls to them
~~~

_________________________________________

### ![ico-20 warn] использовать свойство **_caller_**

**обычный режим:**

~~~js
function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

{{s11.p5}}

~~~console

ƒ test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}
~~~

{{s11.p6}}

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

{{s11.p7}}

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] {{s12.h1}} 

{{s12.p1}}

~~~js
var x, y

with (String) {
  x = fromCharCode(89, 75)
}
  
console.log(x)  // "YK"

with (Math) {
  y = round(x = random() * 1000)
}
console.log(y)  // 256
~~~

{{s12.p2}}

~~~js
'use strict'

var x, y

with (String) {
  x = fromCharCode(89, 75)
}
  
console.log(x)

with (Math) {
  y = round(x = random() * 1000)
}
console.log(y)
~~~

{{s12.p3}}

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] {{s13.h1}}

###### {{s14.h1}} 

{{s14.p1}}

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

{{s14.p2}}

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

{{s14.p3}}

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] {{s15.h1}}

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

{{s15.p1}}

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••