# ![ico-30 study] {{s1.h1}}

~~~js
'use strict'
~~~

{{s1.p1}}

{{s1.p2}}

~~~js
function sample () {
  'use strict'
  ...
}
~~~

{{s1.p3}}

________________________________________________

## ![ico-25 error] {{s2.h1}}


### ![ico-20 warn] {{s3.h1}} 

~~~js
'use strict'

x = 8
~~~

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

{{s3.p7}}

{{s3.p8}}
{{s3.p9}}

{{s3.p10}}

_________________________________

### ![ico-20 warn] {{s4.h1}}

{{s4.p1}}

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

{{s4.p2}}

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

{{s4.p3}}

{{s4.p4}}

________________________________________________

### ![ico-20 warn] {{s5.h1}}

{{s5.p1}}

~~~js
var x = 010   // 8
~~~

{{s5.p2}}

~~~js
'use strict'

var x = 010
~~~

{{s5.p3}}

{{s5.p4}}

__________________________________________________

### ![ico-20 warn] {{s6.h1}}

{{s6.p1}}

~~~js
var x = '\010'   // ""
~~~

{{s6.p2}}

~~~js
'use strict'

var x = '\010'
~~~

{{s6.p3}}

{{s6.p4}}

_________________________________________

### ![ico-20 warn] {{s7.h1}}

{{s7.p1}}

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

{{s7.p2}}

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

{{s7.p3}}

{{s7.p4}}

________________________________________________

### ![ico-20 warn] {{s8.h1}}

{{s8.p1}}

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

{{s8.p2}}

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

{{s8.p3}}

{{s8.p4}}

_________________________________________________

### ![ico-20 warn] {{s9.h1}}

{{s9.p1}}

~~~js
delete Object.prototype  // false
~~~

{{s9.p2}}

~~~js
'use strict'

delete Object.prototype
~~~

{{s9.p3}}

{{s9.p4}}

_______________________________________________

### ![ico-20 warn] {{s10.h1}}

{{s10.p1}}

~~~js
var eval = 7  // 7
~~~

{{s10.p2}}

~~~js
'use strict'

var eval = 7
~~~

{{s10.p3}}

{{s10.p4}}

_______________________________________

### ![ico-20 warn] {{s11.h1}}

{{s11.p1}}

~~~js
var arguments = 7  // 7
~~~

{{s11.p2}}

~~~js
'use strict'

var arguments = 7
~~~

{{s11.p3}}

{{s11.p4}}

_____________________________________________

### ![ico-20 warn] {{s12.h1}}

{{s12.p1}}

~~~js
function test () {
  console.log(arguments.callee)
}

test ()
~~~

{{s12.p2}}

~~~console

ƒ test () {
  console.log(arguments.callee)
}
~~~

{{s12.p3}}

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

{{s12.p4}}

{{s12.p5}}
  
{{s12.p6}}
{{s12.p7}}
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

{{s12.p8}}

~~~console

ƒ test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}
~~~

{{s12.p9}}

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

{{s12.p10}}

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] {{s13.h1}} 

{{s13.p1}}

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

{{s13.p2}}

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

{{s13.p3}}

{{s13.p4}}

_________________________________________________

### ![ico-20 warn] {{s14.h1}}

###### {{s15.h1}} 

{{s15.p1}}

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

{{s15.p2}}

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

{{s15.p3}}

{{s15.p4}}

__________________________________________

### ![ico-20 warn] {{s16.h1}}

{{s16.p1}}
{{s16.p2}}
{{s16.p3}}
{{s16.p4}}
{{s16.p5}}
{{s16.p6}}
{{s16.p7}}
{{s16.p8}}
{{s16.p9}}

{{s16.p10}}

{{s16.p11}}