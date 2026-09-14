# ![ico-30 study] strict mode

~~~js
'use strict'
~~~

Це директива для інтерпретатора

Директива ~'use strict'~ розпізнається лише на початку скрипта або функції

~~~js
function sample () {
  'use strict'
  ...
}
~~~

Директива ~'use strict'~ переводить виконання скрипта в строгий режим ( **~strict mode~** )

________________________________________________

## ![ico-25 error] У строгому режимі не можна:


### ![ico-20 warn] використовувати необ’явлені змінні 

~~~js
'use strict'

x = 8
~~~

буде згенеровано виняток:

••![ico-20 error] Uncaught ReferenceError: x is not defined••

^^^[Memory leaks]

І це добре, оскільки дозволяє уникнути витоків пам’яті
«Збирачі сміття» (garbage collectors) ніколи не «вимітають» (sweep) глобальні змінні
Наприклад, якщо через забудькуватість зробити так:

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

то у звичайному (нестрогому) режимі буде створено змінну ~someText~ у глобальній області видимості

^^Іноді глобальні змінні необхідні для забезпечення доступу до даних із різних частин програми^^
^^У такому випадку не забувайте обнуляти значення таких змінних, якщо дані, що в них зберігаються, більше не потрібні^^

^^^

_________________________________

### ![ico-20 warn] видаляти змінні та функції оператором  delete

**звичайний режим:**

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

**суворий режим:**

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] присвоювати вісімкові значення

**звичайний режим:**

~~~js
var x = 010   // 8
~~~

**суворий режим:**

~~~js
'use strict'

var x = 010
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] використовувати екрановані вісімкові значення

**звичайний режим:**

~~~js
var x = '\010'   // ""
~~~

**суворий режим:**

~~~js
'use strict'

var x = '\010'
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] змінювати значення властивостей, що не підлягають перезапису

**звичайний режим:**

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

**суворий режим:**

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] змінювати значення властивостей із геттером (без сеттера)

**звичайний режим:**

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

**суворий режим:**

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] видаляти властивості, які не можна видалити

**звичайний режим:**

~~~js
delete Object.prototype  // false
~~~

**суворий режим:**

~~~js
'use strict'

delete Object.prototype
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] використовувати **_eval_** як ім’я змінної

**звичайний режим:**

~~~js
var eval = 7  // 7
~~~

**суворий режим:**

~~~js
'use strict'

var eval = 7
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] використовувати **_arguments_** як ім’я змінної

**звичайний режим:**

~~~js
var arguments = 7  // 7
~~~

**суворий режим:**

~~~js
'use strict'

var arguments = 7
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] використовувати **_arguments.callee_**

**звичайний режим:**

~~~js
function test () {
  console.log(arguments.callee)
}

test ()
~~~

**Результат у консолі:**

~~~console

ƒ test () {
  console.log(arguments.callee)
}
~~~

**суворий режим:**

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

**буде згенеровано виняток:**

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

**Результат у консолі:**

~~~console

ƒ test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}
~~~

**суворий режим:**

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

**буде згенеровано виняток:**

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] використовувати вираз _**with**_ 

**звичайний режим:**

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

**суворий режим:**

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

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] метод **_eval ()_** не може створювати змінні в області видимості, в якій він був викликаний

###### з міркувань безпеки 

**звичайний режим:**

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

**суворий режим:**

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

**буде згенеровано виняток:**

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] використовувати як імена змінних ключові слова:

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

**буде згенеровано виняток:**

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••