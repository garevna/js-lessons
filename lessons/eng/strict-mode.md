# ![ico-30 study] strict mode

~~~js
'use strict'
~~~

This is a directive for the interpreter

The ~'use strict'~ directive is only recognised at the start of a script or function

~~~js
function sample () {
  'use strict'
  ...
}
~~~

The ~'use strict'~ directive switches the script’s execution to strict mode ( **~strict mode~** )

________________________________________________

## ![ico-25 error] In strict mode, you cannot:


### ![ico-20 warn] use undeclared variables 

~~~js
'use strict'

x = 8
~~~

an exception will be thrown:

••![ico-20 error] Uncaught ReferenceError: x is not defined••

^^^[Memory leaks]

And this is a good thing, as it helps to avoid memory leaks
Garbage collectors never ‘sweep’ global variables
For example, if you inadvertently do the following:

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

then in normal (non-strict) mode, the variable ~someText~ will be created in the global scope

^^Sometimes global variables are necessary to ensure access to data from different parts of the application^^
^^In such cases, do not forget to set the value of such variables to zero if the data they contain is no longer needed^^

^^^

_________________________________

### ![ico-20 warn] Delete variables and functions using the `delete` statement

**Normal mode:**

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

**Strict mode:**

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] Assigning octal values

**Normal mode:**

~~~js
var x = 010   // 8
~~~

**Strict mode:**

~~~js
'use strict'

var x = 010
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] Use escaped octal values

**Normal mode:**

~~~js
var x = '\010'   // ""
~~~

**Strict mode:**

~~~js
'use strict'

var x = '\010'
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] Modify the values of non-rewritable properties

**Normal mode:**

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

**strict mode:**

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

**an exception will be thrown:**

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] modifying the values of properties with a getter (but no setter)

**normal mode:**

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

**strict mode:**

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

**an exception will be thrown:**

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] Delete non-deletable properties

**Normal mode:**

~~~js
delete Object.prototype  // false
~~~

**Strict mode:**

~~~js
'use strict'

delete Object.prototype
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] Use **_eval_** as a variable name

**Normal mode:**

~~~js
var eval = 7  // 7
~~~

**Strict mode:**

~~~js
'use strict'

var eval = 7
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] Use **_arguments_** as a variable name

**Normal mode:**

~~~js
var arguments = 7  // 7
~~~

**Strict mode:**

~~~js
'use strict'

var arguments = 7
~~~

**An exception will be thrown:**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] Use **_arguments.callee_**

**normal mode:**

~~~js
function test () {
  console.log(arguments.callee)
}

test ()
~~~

**Output to the console:**

~~~console

ƒ test () {
  console.log(arguments.callee)
}
~~~

**strict mode:**

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

**an exception will be raised:**

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

**Output to the console:**

~~~console

ƒ test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}
~~~

**strict mode:**

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

**an exception will be raised:**

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] Use the _**with**_ expression 

**Normal mode:**

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

**Strict mode:**

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

**An exception will be raised:**

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] The **_eval ()_** method cannot create variables in the scope in which it was called

###### for security reasons 

**normal mode:**

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

**strict mode:**

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

**an exception will be raised:**

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] using keywords as variable names:

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

**an exception will be raised:**

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••