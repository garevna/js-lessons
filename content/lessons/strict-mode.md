# ![ico-30 study] strict mode

~~~js
'use strict'
~~~

{{p1}}

{{p2}}

~~~js
function sample () {
  'use strict'
  ...
}
~~~

{{p3}}

________________________________________________

## ![ico-25 error] {{p4}}

### ![ico-20 warn] {{p5}} 

~~~js
'use strict'

x = 8
~~~

{{p6}}

••![ico-20 error] Uncaught ReferenceError: x is not defined••

^^^[Memory leaks]

{{p7}}
{{p8}}
{{p9}}

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

{{p10}}

{{p11}}
{{p12}}

^^^

_________________________________

### ![ico-20 warn] {{p13}}

**{{topic.t2}}**

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

**{{topic.t0}}**

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] {{p14}}

**{{topic.t2}}**

~~~js
var x = 010   // 8
~~~

**{{topic.t0}}**

~~~js
'use strict'

var x = 010
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] {{p15}}

**{{topic.t2}}**

~~~js
var x = '\010'   // ""
~~~

**{{topic.t0}}**

~~~js
'use strict'

var x = '\010'
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] {{p16}}

**{{topic.t2}}**

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

**{{topic.t0}}**

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] {{p17}}

**{{topic.t2}}**

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

**{{topic.t0}}**

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] {{p18}}

**{{topic.t2}}**

~~~js
delete Object.prototype  // false
~~~

**{{topic.t0}}**

~~~js
'use strict'

delete Object.prototype
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] {{p19}}

**{{topic.t2}}**

~~~js
var eval = 7  // 7
~~~

**{{topic.t0}}**

~~~js
'use strict'

var eval = 7
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] {{p20}}

**{{topic.t2}}**

~~~js
var arguments = 7  // 7
~~~

**{{topic.t0}}**

~~~js
'use strict'

var arguments = 7
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] {{p21}}

**{{topic.t2}}**

~~~js
function test () {
  console.log(arguments.callee)
}

test ()
~~~

~~~console

ƒ test () {
  console.log(arguments.callee)
}
~~~

**{{topic.t0}}**

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

**{{common.c5}}**

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

~~~console

ƒ test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}
~~~

**{{topic.t0}}**

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

**{{common.c5}}**

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] {{p22}} 

**{{topic.t2}}**

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

**{{topic.t0}}**

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

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] {{p23}}

###### {{p24}} 

**{{topic.t2}}**

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

**{{topic.t0}}**

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

**{{common.c5}}**

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] {{p25}}

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

**{{common.c5}}**

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••