# ![ico-30 study] Приведение типов⟪pryvedenye_typov⟫

Here we enter a minefield created by dynamic typing. With the exception of obvious syntactic errors, the engine gives us complete freedom in the expressions we provide for it to evaluate, even if those expressions look like utter nonsense.
The main ‘pitfall’ is that the engine allows data of different types to be used in expressions, and does not treat it as an error if you try to add a number to a string or a Boolean value. In other words, you can cross a cactus with a chicken, and the engine won’t stop you. However, the question is: what will the result be? A cactus or a chicken?
This is the main question we’ll try to answer.
___________________________________

## ![ico-25 icon] Implicit type coercion⟪Implicit_type_coercion⟫

Implicit type coercion occurs during the evaluation of expressions.

•••• none
The first thing to start with is how the engine evaluates our expressions. It evaluates them sequentially, from left to right, subject to the following rules (operators’ precedence):
![ico-20 warning] If an expression contains round brackets, the expression inside the round brackets will be evaluated first, and then the resulting value will be substituted for the expression inside the round brackets. In other words, when evaluating the expression _2 * (8 + 2)_, the engine will first evaluate _8 + 2_, and then the value of the expression **_2 * 10_**;
![ico-20 warning] Multiplication and division operators have higher precedence than addition and subtraction operators. This means that when evaluating the expression _5 + 8 * 2_, the engine will first evaluate _8 * 2_, and then the value of the expression **_5 + 16_**.
••••

![ico-25 hw] Tests

→→→ 40 / 2 * 5 | 100, 4 | 100 →→→
→→→ 40 / (2 * 5) | 100, 4 | 4 →→→
→→→ 10 - 2 * 5 + 4 | 44, 4 | 4 →→→
→→→ (10 - 2) * 5 + 4 | 72, 44, 4 | 44 →→→
→→→ (10 - 2) * (5 + 4) | 72, 44, 4 | 72 →→→

^^Before performing an assignment, the engine must evaluate the expression on the right-hand side of the assignment statement. The resulting value is then assigned to the variable whose name appears on the left-hand side of the assignment statement.^^

### ![ico-20 icon] Implicit conversion to the string type⟪Implicit_conversion_to_the_string_type⟫

A string dominates an expression in the sense that the final result of evaluating the expression will always be a string if the expression contains at least one string.

~~~js
20 + '5'  // '205'

'100' + 5  // '1005'

10 + '/' + 5  // '10/5'
~~~

However, there are exceptions to this rule. For example, if a string within an expression acts as an operand in any arithmetic operation other than the **+** operation. When evaluating the value of an arithmetic expression (~a - b~, ~a * b~, ~a / b~, ~a % b~), the engine will implicitly cast both operands to the number type.

~~~js
20 - '5'  // 15
'100' - 5  // 95
'100' / '20'  // 5
'100' % '3'  // 1
~~~

The engine evaluates the expression sequentially, from left to right; that is, if the expression begins with arithmetic operations on numbers and is then followed by a string, the arithmetic operations will be performed first, and then the string will be appended to the resulting number, which will convert the result into a string.

~~~js
20 + 5 + '5'  // 255
'100' - 5 + 'px' // '95px'
100 / '20' + 5 + ''  // '10'
~~~

◘◘![ico-25 cap] **1**◘◘

~~~js
var height = 72
var padding = 20
var illegal = 'height: ' + height + padding * 2 + 'px'
var legal = 'height: ' + (height + padding * 2) + 'px'
~~~

~~~js
illegal // 'height: 7240px'
legal  // 'height: 112px'
~~~

![ico-25 hw] Tests

→→→ 2 - '10' + '8' | '0', 0, '-88' | -88 →→→
→→→ 2 + '10' - '200' | 2, 10, '210' | 10 →→→
→→→ '5' + '20' / '20' | 0, 20, '51' | 51 →→→
→→→ '5' - '20' / '20' | '5', '20', 0, 4 | 4 →→→
→→→ ('5' - '2') * '10' | 30, -15, 0 | 30 →→→
→→→ '5' - '2' * '10' | 30, -15, 10 | -15 →→→



^^Например, после выполнения кода:^^

^^значением переменной **res** будет строка _"205"_^^

JavaScript вычисляет выражения слева направо

^^В результате выполнения кода:^^

~~~js
var res = 20 + 10 + '5'
~~~

^^в переменной ~res~ будет значение "305",^^

^^а в результате выполнения кода:^^

~~~js
var res = '3' + 20 + 10
~~~

^^в переменной ~res~ будет значение _"32010"_^^

![ico-20 warn] При сложении массива и любого другого операнда результат будет строкового типа ( ~string~ )

![ico-25 cap] **1**

~~~js
[] + 5             //  "5"
[] + false         //  "false"
[4] + NaN          //  "4NaN"
[4, 8] + null      //  "4,8null"
null + [4, 8]      //  "null4,8"
~~~

Это происходит потому, что массив преобразуется в строку:

~~~js
String([4, 8])
~~~

и результат будет   ~4,8~

![ico-20 warn] Однако, если в массиве не более одного элемента, и перед массивом стоит знак арифметической операции, он будет приведен к числу:

![ico-25 cap] ** 2**

~~~js
null + +[4]       // 4
+[5] + null         // 5
~~~

_____________________________________________________________________

### ![ico-20 icon] Неявное приведение к number⟪neyavnoe_pryvedenye_k_number⟫


Неявное приведение к типу  ~number~ происходит в арифметических выражениях:

~~~js
var  x = '8' / 2
~~~

^^( значением переменной ~ x~ будет 4 )^^

![ico-20 warn] При участии в арифметических операциях пустая строка ( ~""~ ) и пустой массив ( ~[]~ ) преобразуется в ** 0**:

~~~js
var x = ''
var y = x / 5
~~~

^^( выражение  ~"" / 5~   будет приведено к   ~0 / 5~ )^^

~~~js
console.log(+'')         // 0
console.log(+[])         // 0
console.log(+[]+'')      // 0
~~~

![ico-20 warn] Если в арифметическом выражении участвуют специальные значения ~undefined~ или ~null~, то они преобразуются к числу так:

~~~js
Number(undefined)   // NaN
Number(null)        // 0
~~~

![ico-20 warn] Если в арифметическом выражении участвуют логические значения ~true~ или ~false~, то они преобразуются к числу так:

~~~js
var a = false
var b = true
var z = a + b    //  0 + 1 --> 1
~~~

![ico-20 warn] Кроме арифметических операций, преобразование к типу ~number~ происходит при участии переменной в операциях сравнения ( за исключением операций   ~===~  и  ~!==~,  когда сравниваются не только значения, но и типы данных )

____________________________________________________________

![ico-25 cap] ** 3**

~~~js
a = false, b = undefined
a > b       // 0 > NaN  --> false
a < b       // 0 < NaN  --> false
a == b      // 0 == NaN --> false
~~~

![ico-25 cap] ** 4**

~~~js
a = true,  b = null
a > b       // 1 > null   --> true ( 1 > 0 )
a < b       // 1 < null   --> false
a == b      // 1 == null  --> false
~~~

______________________________________________________

### ![ico-20 icon] Неявное приведение к boolean⟪neyavnoe_pryvedenye_k_boolean⟫

Преобразование типов к логическому типу ( ~boolean~ ) происходит в условных операторах ( ~if~, тернарный оператор )

![ico-25 cap] ** 5**

~~~js
if ('5') console.log('Yes')
~~~

Будет вычисляться логическое значение выражения  в круглых скобках оператора ~if~, т.е. "под капотом" будет выполнена операция

~~~js
Boolean('5')
~~~

![ico-20 warn] При выполнении логических операций  ~&#10072;&#10072;~  и  ~&&~ происходит неявное приведение типов операндов к логическому значению, но при этом результатом логической операции будет изначальное значение одного из операндов, даже если оно не являются булевым

_______________________________________________

#### ![ico-20 icon] &&⟪&&⟫

^^^[Операция&nbsp;&&]

Операция ~&&~  перебирает операнды слева направо, приводя их к логическому значению, до тех пор, пока не встретится первый ~false~

в этом случае возвращается исходное значение последнего операнда

![ico-25 cap] ** 6**

~~~js
true && false && null   //  false
true && '5' && null     //  null
true && [] && null      //  null
~~~

![ico-25 cap] ** 7**

~~~js
true && ![] && null     //  false
~~~

^^вычисляется значение второго операнда ~![]~, оно будет ~false~, операция останавливается и возвращается последний операнд, на котором остановились )^^

~~~js
true && true && true && true     //    true
~~~

^^дошли до конца, но не встретили ~false~, возвращается последний операнд^^

^^^
__________________________________________________________________

#### ![ico-20 icon] ||⟪__⟫

^^^[Операция ||]

Операция ~||~  перебирает операнды слева направо, приводя их к логическому значению, до тех пор, пока не встретится первый ~true~

в этом случае возвращается исходное значение последнего операнда, на котором остановились

![ico-25 cap] ** 8**

~~~js
null || false || 5 || ''          //   5
null || '' || 0 || 4 || 10        //   4
~~~

![ico-25 cap] ** 9**

~~~js
null || false || undefined || ''  //  ""
~~~

^^последовательно вычисляются логические значения^^

^^• первого операнда (~null~) - это ~false~,^^
^^• второго операнда - ~false~,^^
^^• третьего операнда (~undefined~) - это ~false~,^^
^^• четвертого операнда (~""~) - это ~false~^^

^^больше операндов нет, операция завершается и возвращает последний операнд, на котором остановилась ( ~""~ )^^

^^^

#### ![ico-20 icon] !!⟪!!⟫

^^^[Операция !!]

можно привести переменную любого типа к ~boolean~ с помощью логической операции двойного отрицания:

~~~js
var x = null
var y = !!x        // false
~~~

~~~js
var x = undefined
var y = !!x        // false
~~~

~~~js
!![ ]      // вернет   true
!!+[ ]     // вернет  false
~~~

^^^

{{{Implicit-type-conversion.js}}}

_____________________________

※※※exercises https://docs.google.com/forms/d/e/1FAIpQLSdFHuyyukF2rmA04BN1AmS5MCNXWgQmR5t7mmxyTpzdBZVGGw/viewform※※※

_____________________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)
