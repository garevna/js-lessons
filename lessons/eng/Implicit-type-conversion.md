# ![ico-30 study] Type coercion⟪Type_coercion⟫

Here we enter a minefield created by dynamic typing. With the exception of obvious syntactic errors, the engine gives us complete freedom in the expressions we provide for it to evaluate, even if those expressions look like utter nonsense.
The main ‘pitfall’ is that the engine allows data of different types to be used in expressions, and does not treat it as an error if you try to add a number to a string or a Boolean value. In other words, you can cross a cactus with a chicken, and the engine won’t stop you. However, the question is: what will the result be? A cactus or a chicken?
This is the main question we’ll try to answer.
___

## ![ico-25 icon] Implicit type coercion⟪Implicit_type_coercion⟫

Implicit type coercion occurs during the evaluation of expressions.

•••• none
The first thing to start with is how the engine evaluates our expressions. It evaluates them sequentially, from left to right, subject to the following rules (operators’ precedence):
![ico-20 warning] If an expression contains round brackets, the expression inside the round brackets will be evaluated first, and then the resulting value will be substituted for the expression inside the round brackets. In other words, when evaluating the expression _2 * (8 + 2)_, the engine will first evaluate _8 + 2_, and then the value of the expression **_2 * 10_**;
![ico-20 warning] Multiplication and division operators have higher precedence than addition and subtraction operators. This means that when evaluating the expression _5 + 8 * 2_, the engine will first evaluate _8 * 2_, and then the value of the expression **_5 + 16_**.
••••

### ![ico-25 hw] Tests 1⟪Tests_1⟫

~~~tests
→→→ 40 / 2 * 5 | 100, 4 | 100 →→→
→→→ 40 / (2 * 5) | 100, 4 | 4 →→→
→→→ 10 - 2 * 5 + 4 | 44, 4 | 4 →→→
→→→ (10 - 2) * 5 + 4 | 72, 44, 4 | 44 →→→
→→→ (10 - 2) * (5 + 4) | 72, 44, 4 | 72 →→→
~~~

^^Before performing an assignment, the engine must evaluate the expression on the right-hand side of the assignment statement. The resulting value is then assigned to the variable whose name appears on the left-hand side of the assignment statement.^^

### ![ico-20 icon] Implicit conversion to the string type⟪Implicit_conversion_to_the_string_type⟫

Let’s start by noting that coercion to a string type is the engine’s default behaviour in situations where it ‘doesn’t know what to do’. More precisely, this occurs when the operand of an arithmetic operation is not a primitive value (a string, a number, a boolean value, or ~null~ | ~NaN~ | ~undefined~).

~~~demo
> var user = { name: 'Piter', age: 25 }
< undefined
> user + ''
< '[object Object]'
> var numbers = [1, 2, 3, 4, 5]
< undefined
> numbers + ''
< '1,2,3,4,5'
~~~

The same applies to comparison operations. The engine cannot compare an object with a primitive value until it has, in one way or another, obtained a primitive value for that object. By default, it will coerce the object to a primitive value of type ~string~.

~~~demo
> var user = { name: 'Piter', age: 25 }
< undefined
> user > 5
< false
> user < 5
< false
> user == 5
< false
> user == '[object Object]'
< true
> user === '[object Object]'
< false
> var numbers = [1, 2, 3, 4, 5]
< undefined
> numbers == '1,2,3,4,5'
< true
> numbers === '1,2,3,4,5'
< false
> var sample = [5]
< undefined
> sample == 5
< true
> sample == '5'
< true
~~~

The engine has a certain ‘protocol’ for handling strings as operands in expressions. For example, if a string within an expression acts as an operand in any arithmetic operation other than the **+** operation. When evaluating the value of an arithmetic expression (~a - b~, ~a * b~, ~a / b~, ~a % b~), the engine will implicitly cast both operands to the number type.

~~~demo
> 20 - '5'
< 15
> '100' - 5
< 95
> '100' / '20'
< 5
> '100' % '3'
< 1
~~~

The engine evaluates the expression sequentially, from left to right; that is, if the expression begins with arithmetic operations on numbers and is then followed by a string, the arithmetic operations will be performed first, and then the string will be appended to the resulting number, which will convert the result into a string.

~~~demo
> 20 + 5 + '5'
< 255
> '100' - 5 + 'px'
< '95px'
> 100 / '20' + 5 + ''
< '10'
~~~

◘◘![ico-25 cap] **1**◘◘

~~~js
var height = 72
var padding = 20
var illegal = 'height: ' + height + padding * 2 + 'px'
var legal = 'height: ' + (height + padding * 2) + 'px'
~~~

~~~demo
> illegal
< 'height: 7240px'
> legal
< 'height: 112px'
~~~

___

### ![ico-25 hw] Tests 2⟪Tests_2⟫

~~~tests
→→→ 2 - '10' + '8' | '0', 0, '-88' | -88 →→→
→→→ 2 + '10' - '200' | 2, 10, '210' | 10 →→→
→→→ '5' + '20' / '20' | 0, 20, '51' | 51 →→→
→→→ '5' - '20' / '20' | '5', '20', 0, 4 | 4 →→→
→→→ ('5' - '2') * '10' | 30, -15, 0 | 30 →→→
→→→ '5' - '2' * '10' | 30, -15, 10 | -15 →→→
~~~

___

### ![ico-20 icon] An array as an operand in an arithmetic expression⟪An_array_as_an_operand_in_an_arithmetic_expression⟫

The result of evaluating an expression can be cast to a string type not only by explicitly adding a string operand. For example, adding an empty array produces the same result. In other words, if an array acts as an operand in an expression, it is cast to a string.

~~~demo
> 20 + 5 + []
< '25'
> 20 + 5 + [0]
< '250'
> 20 + 5 + [0, 5]
< '250,5'
> 20 + 5 + [0, 5, 4]
< '250,5,4'
~~~

Therefore, if an array acts as an operand in an arithmetic operation (multiplication, division, subtraction or modulo), the situation is slightly different: if the array is empty, it is converted to an empty string, which, when used as an operand in an arithmetic operation, is converted to 0. If the array contains a single element, that element is converted to a string and then to a numeric type (a number or ~NaN~).

~~~demo
> 20 + '5' - []
< 205
> 20 + '5' - [3]
< 202
> 20 + '5' - ['5']
< 200
> 20 + '5' - [3, 0]
< NaN
~~~

___

### ![ico-25 hw] Tests 3⟪Tests_3⟫

~~~tests
→→→ 5 + [8] | 13, '58' | 58 →→→
→→→ 5 * [8] | 40, NaN, 0 | 40 →→→
→→→ '5' % ['8'] | 0, NaN, 5 | 5 →→→
→→→ 5 * [8, 0] | 40, NaN, 0 | NaN →→→
→→→ ['8'] - '5' | 3, NaN, 0 | 3 →→→
→→→ [] + false | 'false', NaN, 0 | false →→→
→→→ [4] + NaN | '4NaN', NaN, 0 | 4NaN →→→
→→→ ({} + []) | '', '[object Object]', NaN, 0 | [object Object] →→→
→→→ [1] + [2] + [3] | 6, '123', NaN, 0 | 123 →→→
→→→ [5] - [4] / [2] | 5, 3, '542', NaN, Infinity | 3 →→→
→→→ [5] * [4] / [2] | 5, 10, '542', NaN, undefined | 10 →→→
→→→ ([5] - [4]) / [2] | 5, 0.5, NaN, Infinity | 0.5 →→→
→→→ ([5] + [0] - [10]) / [2] | 5, 50, 20, NaN, 0 | 20 →→→
~~~

___

















However, if any arithmetic operator is placed before an array, the array is converted to a number (or ~NaN~):

~~~demo
> +['8'] + 5
< 13
> null + +[4]
< 4
> +[5] + null
< 5
~~~

___

### ![ico-20 icon] Implicit coercion to the number type⟪Implicit_coercion_to_the_number_type⟫

Implicit coercion to the type ~number~ occurs in arithmetic expressions:

~~~demo
> '8' / 2
< 4
> '5' * '2'
< 10
> '5' - '3'
< 2
> '5' % '3'
< 2
> +'5' + +'3'
< 8
~~~



![ico-20 warn] When used in arithmetic operations, an empty string (~""~) and an empty array (~[]~) are converted to **0**:

~~~demo
> var x = '', y = x / 5
< undefined
> x == 0
< true
> y
< 0
> var x = [], y = x / 5
< undefined
> x == 0
< true
> y
< 0
~~~

^^(the expression ~"" / 5~ will be reduced to ~0 / 5~)^^

~~~demo
> +''
< 0
> +[]
< 0
> +[] + ''
< '0'
~~~

![ico-20 warn] If special values ~undefined~ or ~null~ appear in an arithmetic expression, they are converted to numbers as follows:

~~~demo
> 0 - undefined
< NaN
> 0 + null
< 0
> undefined == null
< true
> 1 == (undefined == null)
< true
~~~

![ico-20 warn] If an arithmetic expression contains the logical values ~true~ or ~false~, they are converted to a number as follows:

~~~demo
> var a = false, b = true
< undefined
> a == 0
< true
> b == 1
< true
> a + b
< 1
~~~

![ico-20 warn] In addition to arithmetic operations, coercion to the type ~number~ occurs when a variable is involved in comparison operations (with the exception of operations ~===~ and ~!==~, where not only values but also data types are compared)

~~~demo
> a = false, b = undefined
< undefined
> a > b
< false
> a < b
< false
> a == b
< false
> a = true, b = null
< null
> a > b
< true
> a < b
< false
> a == b
< false
~~~

___

### ![ico-20 icon] Implicit coercion to the boolean type⟪Implicit_coercion_to_the_boolean_type⟫

Implicit coercion to the boolean type (~boolean~) occurs in [►►►conditional operators►►►](page/Conditional-operators), which we shall look at later, as well as when evaluating expressions constructed using the logical operators **~&&~** and **~||~**.



![ico-20 warn] When performing the logical operations ~&#10072;&#10072;~ and ~&&~, the operands are implicitly cast to a logical value; however, the result of the logical operation will be the original value of one of the operands, even if it is not a Boolean

^^^[The && operation]

The ~&&~ operation iterates through the operands from left to right, converting them to a logical value, until the first ~false~ is encountered

~~~demo
> true && false && null
< false
> true && '5' && null
< null
> true && [] && null
< null
~~~

^^in which case the original value of the last operand is returned^^

~~~demo
> true && ![] && null
< false
~~~

^^the value of the second operand ~![]~ is calculated; it will be ~false~, the operation stops and the last operand at which it stopped is returned^^

~~~demo
> true && true && true && true
< true
~~~

^^We have reached the end but have not encountered ~false~; the last operand is returned^^

^^^

^^^[The || operation]

The ~||~ operation iterates through the operands from left to right, reducing them to a logical value, until the first ~true~ is encountered

in this case, the original value of the last operand at which the operation stopped is returned

~~~demo
> null || false || 5 || ''
< 5
> null || '' || 0 || 4 || 10
< 4
> null || false || undefined || ''
< ''
~~~

^^the logical values are evaluated sequentially^^

^^• the first operand (~null~) is ~false~,^^
^^• the second operand is ~false~,^^
^^• the third operand (~undefined~) is ~false~,^^
^^• the fourth operand (~""~) is ~false~^^

^^there are no more operands; the operation terminates and returns the last operand it was on (~""~)^^

^^^

^^^[Operation !!]

A variable of any type can be reduced to ~boolean~ using the double negation logical operation:

~~~js
var x = null
var y = !!x        // false

var x = undefined
var y = !!x        // false

!![]              // true
!!+[]             // false
~~~

^^^

___

### ![ico-20 hw] Tests⟪Tests⟫

~~~tests
→→→ [5] - [3] | '5', '3', 2, NaN | 2 →→→
→→→ [true] + 8 | 'true8', 9, 8, NaN | true8 →→→
→→→ [true] - 8 | 'true8', -7, 8, NaN | NaN →→→
→→→ [9] - 8 | 1, 9, 8, '9-8', NaN | 1 →→→
→→→ !!{} + 2 | 0, 2, 3, true, NaN | 3 →→→
→→→ [5] - true | 5, 4, 0, true, NaN | 4 →→→
→→→ [!!{}] || true | [true], true, NaN | [true] →→→
→→→ [!!{} + 2] || true | [3], 4, true, '3true', NaN | [3] →→→
→→→ true && [!!{} + 4] | [5], 5, 4, true, NaN | [5] →→→
→→→ 5 && [[] + 4] | '54', 5, 4, ['4'], NaN | ['4'] →→→
→→→ !!{} > !![] | true, {}, [false], false, NaN | false →→→
→→→ !!{} === !![] | true, {}, [false], false, NaN | true →→→
→→→ !!{} && ![] === !![5] | true, false, NaN | false →→→
→→→ '80' - null + true | '80', null, true, false, 81, NaN | 81 →→→
→→→ '80' - null + true + [] | '80', null, true, false, '81', NaN | 81 →→→
→→→ '80' - !![] | '80', 79, NaN | 79 →→→
→→→ !{} * 50 + +[10] | 50, 10, NaN, false | 10 →→→
→→→ !!{}* 50 + +[20] | 0, 50, 20, 70, NaN | 70 →→→
→→→ !!{} * 50 && +[20] | 0, 50, 20, 70, NaN | 20 →→→
~~~

___

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)
