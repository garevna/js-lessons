# ![ico-30 study] strict mode⟪strict_mode⟫

~~~js
'use strict'
~~~

Это директива для интерпретатора

Директива ~'use strict'~ распознается только в начале скрипта или функции

~~~js
function sample () {
  'use strict'
  ...
}
~~~

Директива ~'use strict'~ переводит выполнение скрипта в строгий режим ( **~strict mode~** )

________________________________________________

## ![ico-25 error] В строгом режиме нельзя:⟪In_strict_mode,_you_cannot:⟫

### ![ico-20 warn] использовать необъявленные переменные⟪use_undeclared_variables⟫

~~~js
'use strict'

x = 8
~~~

будет сгенерировано исключение: 

••![ico-20 error] Uncaught ReferenceError: x is not defined••

^^^[Memory leaks]

И это хорошо, поскольку позволяет избежать утечек памяти
"Сборщики мусора" ( garbage collectors ) никогда не "выметают" ( sweep ) глобальные переменные
Например, если по забывчивости сделать так:

~~~js
function sample () {
  someText = 'This is a memory leak'
}
~~~

то в обычном ( нестрогом ) режиме будет создана переменная ~someText~ в глобальной области видимости

^^Иногда глобальные переменные необходимы для обеспечения доступа к данным из различных частей приложения^^
^^В таком случае не забывайте обнулять значение таких переменных, если хранимые в них данные больше не нужны^^

^^^

_________________________________

### ![ico-20 warn] удалять переменные и функции оператором  delete⟪Delete_variables_and_functions_using_the_-delete-_statement⟫

**обычный режим:**

~~~js
function sum (x, y) {
  return x + y
}

delete sum   // false
~~~

**строгий режим:**

~~~js
'use strict'

function sum (x, y) {
  return x + y
}

delete sum
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.••

________________________________________________

### ![ico-20 warn] присваивать восьмеричные значения⟪Assigning_octal_values⟫

**обычный режим:**

~~~js
var x = 010   // 8
~~~

**строгий режим:**

~~~js
'use strict'

var x = 010
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Octal literals are not allowed in strict mode.••

__________________________________________________

### ![ico-20 warn] использовать экранированные восьмеричные значения⟪Use_escaped_octal_values⟫

**обычный режим:**

~~~js
var x = '\010'   // ""
~~~

**строгий режим:**

~~~js
'use strict'

var x = '\010'
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Octal escape sequences are not allowed in strict mode.••

_________________________________________

### ![ico-20 warn] изменять значения неперезаписываемых свойств⟪Modify_the_values_of_non-rewritable_properties⟫

**обычный режим:**

~~~js
var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5   // 0
~~~

**строгий режим:**

~~~js
'use strict'

var sample = Object.defineProperty({}, 'x', {
  value:0,
  writable:false
})

sample.x = 5
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught TypeError: Cannot assign to read only property 'x' of object '#&lt;Object>'••

________________________________________________

### ![ico-20 warn] изменять значения свойств с геттером ( без сеттера )⟪modifying_the_values_of_properties_with_a_getter_(but_no_setter)⟫

**обычный режим:**

~~~js
var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5 // 0
~~~

**строгий режим:**

~~~js
'use strict'

var obj = { 
  get x () {
    return 0
  } 
}

obj.x = 5
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught TypeError: Cannot set property x of #<Object> which has only a getter••

_________________________________________________

### ![ico-20 warn] удалять неудаляемые свойства⟪Delete_non-deletable_properties⟫

**обычный режим:**

~~~js
delete Object.prototype  // false
~~~

**строгий режим:**

~~~js
'use strict'

delete Object.prototype
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }••

_______________________________________________

### ![ico-20 warn] использовать **_eval_** как имя переменной⟪Use_**_eval_**_as_a_variable_name⟫

**обычный режим:**

~~~js
var eval = 7  // 7
~~~

**строгий режим:**

~~~js
'use strict'

var eval = 7
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_______________________________________

### ![ico-20 warn] использовать **_arguments_** как имя переменной⟪Use_**_arguments_**_as_a_variable_name⟫

**обычный режим:**

~~~js
var arguments = 7  // 7
~~~

**строгий режим:**

~~~js
'use strict'

var arguments = 7
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Unexpected eval or arguments in strict mode••

_____________________________________________

### ![ico-20 warn] использовать **_arguments.callee_**⟪Use_**_arguments.callee_**⟫

**обычный режим:**

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

**строгий режим:**

~~~js
'use strict'

function test () {
  console.log(arguments.callee)
}

test ()
~~~

**будет сгенерировано исключение**

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

**строгий режим:**

~~~js
'use strict'

function test () {
  (function () {
    console.log(arguments.callee.caller)
  })()
}

test ()
~~~

**будет сгенерировано исключение**

~~~console
  
⛔️ Uncaught TypeError:
'caller', 'callee', and 'arguments' properties 
may not be accessed on strict mode functions 
or the arguments objects for calls to them
~~~

___________________________________

### ![ico-20 warn] использовать выражение _**with**_⟪Use_the__**with**__expression⟫

**обычный режим:**

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

**строгий режим:**

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

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Strict mode code may not include a with statement••

_________________________________________________

### ![ico-20 warn] метод **_eval ()_** не может создавать переменные в области видимости, в которой он был вызван⟪The_**_eval__**_method_cannot_create_variables_in_the_scope_in_which_it_was_called⟫

###### по соображениям безопасности⟪for_security_reasons⟫

**обычный режим:**

~~~js
eval('var gamma = 2')
console.log(gamma)
~~~

**строгий режим:**

~~~js
'use strict'

eval('var gamma = 2')
console.log(gamma)
~~~

**будет сгенерировано исключение**

••![ico-20 error] Uncaught ReferenceError: gamma is not defined••

__________________________________________

### ![ico-20 warn] использовать как имена переменных ключевые слова:⟪using_keywords_as_variable_names:⟫

| ![ico-20 error] | implements |
| ![ico-20 error] | interface |
| ![ico-20 error] | let |
| ![ico-20 error] | package |
| ![ico-20 error] | private |
| ![ico-20 error] | protected |
| ![ico-20 error] | public |
| ![ico-20 error] | static |
| ![ico-20 error] | yield |

**будет сгенерировано исключение**

••![ico-20 error] Uncaught SyntaxError: Unexpected strict mode reserved word••