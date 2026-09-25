# ![ico-30 study] strict mode⟪strict_mode⟫

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

## ![ico-25 error] У строгому режимі не можна:⟪In_strict_mode,_you_cannot:⟫

### ![ico-20 warn] використовувати необ’явлені змінні⟪use_undeclared_variables⟫

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

### ![ico-20 warn] видаляти змінні та функції оператором  delete⟪Delete_variables_and_functions_using_the_-delete-_statement⟫

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

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] присвоювати вісімкові значення⟪Assigning_octal_values⟫

**звичайний режим:**

~~~js
var x = 010   // 8
~~~

**суворий режим:**

~~~js
'use strict'

var x = 010
~~~

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] використовувати екрановані вісімкові значення⟪Use_escaped_octal_values⟫

**звичайний режим:**

~~~js
var x = '\010'   // ""
~~~

**суворий режим:**

~~~js
'use strict'

var x = '\010'
~~~

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] змінювати значення властивостей, що не підлягають перезапису⟪Modify_the_values_of_non-rewritable_properties⟫

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

**буде згенеровано виняток**

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] змінювати значення властивостей із геттером (без сеттера)⟪modifying_the_values_of_properties_with_a_getter_(but_no_setter)⟫

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

**буде згенеровано виняток**

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] видаляти властивості, які не можна видалити⟪Delete_non-deletable_properties⟫

**звичайний режим:**

~~~js
delete Object.prototype  // false
~~~

**суворий режим:**

~~~js
'use strict'

delete Object.prototype
~~~

**буде згенеровано виняток**

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] використовувати **_eval_** як ім’я змінної⟪Use_**_eval_**_as_a_variable_name⟫

**звичайний режим:**

~~~js
var eval = 7  // 7
~~~

**суворий режим:**

~~~js
'use strict'

var eval = 7
~~~

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] використовувати **_arguments_** як ім’я змінної⟪Use_**_arguments_**_as_a_variable_name⟫

**звичайний режим:**

~~~js
var arguments = 7  // 7
~~~

**суворий режим:**

~~~js
'use strict'

var arguments = 7
~~~

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] використовувати **_arguments.callee_**⟪Use_**_arguments.callee_**⟫

**звичайний режим:**

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

**суворий режим:**

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

**буде згенеровано виняток**

![ico-20 error] ~~~console
  
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions or the arguments objects for calls to them
~~~

_________________________________________

### ![ico-20 warn] использовать свойство **_caller_**⟪yspolʹzovatʹ_svoistvo_**_caller_**⟫

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

**буде згенеровано виняток**

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] використовувати вираз _**with**_⟪Use_the__**with**__expression⟫

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

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] метод **_eval ()_** не може створювати змінні в області видимості, в якій він був викликаний⟪The_**_eval__**_method_cannot_create_variables_in_the_scope_in_which_it_was_called⟫

###### з міркувань безпеки⟪for_security_reasons⟫

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

**буде згенеровано виняток**

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] використовувати як імена змінних ключові слова:⟪using_keywords_as_variable_names:⟫

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

**буде згенеровано виняток**

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••