# ![ico-35 study] Logical language constructs

In this section we will learn about logical values, logical variables, logical expressions and logical operators.

## ![ico-30 icon] Variables of logical type (boolean)

When a person declares that his son is 18 years old, that statement will be true for one year, but before that year and after that year, that statement will be a lie. And that is on the condition that this person has a son.

![](illustrations/logical-expressions.svg)

Suppose a man wrote this statement on his social media page when he was 15 years old.
He did not yet have a son, and the statement was false.
Then he grew up, got married and had a son, but the statement remained false because his son was not yet 18.
Finally, when his son turned 18, the statement became true.
But it lasted for one year.
Then his son turned 19, and this statement became false again.

Thus, this statement is a **variable**. For its meaning can change.
The values this variable can take are **~true~** or **~false~**
.

**~true~** and **~false~** are **logical values**.
![ico-25 warn] **There are no other logical values.

^^We don't have such a sly value as ‘Not everything is so unambiguous’. Everything is unambiguous. It's either black or white. Our world is simple.^^
So, our variable can take one of two possible logical values (**~true~** or **~false~**).

______________________________________

## ![ico-30 icon] Logical expressions

The statement '_The apple is red and round_' can be decomposed into two parts: '_Apple is red_' + '_Apple is round_'.

![](illustrations/logical-expressions-1.svg)

◘◘ ![ico-25 coffee] ** 1**◘◘

◘◘ ![ico-25 coffee] ** 1**◘◘
~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

Let the boolean variable **~appleIsRed~** take the value **~true~** when the property **~apple.colour~** has the value ‘red’ and the boolean variable **~appleIsRound~** take the value **~true~** when the property **~apple.shape~** has the value ‘round’.

|   'green'   |   'square'  |   ~false~  | ~false~      |   ~false~          |

| apple.color | apple.shape | appleIsRed | appleIsRound | appleIsRedAndRound |
|   'red'     |   'round'   |   ~true~   | ~true~       |   ~true~           |
|   'yellow'  |   'round'   |   ~false~  | ~true~       |   ~false~          |
|   'red'     |   'square'  |   ~true~   | ~false~      |   ~false~          |
|   'green'   |   'square'  |   ~false~  | ~false~      |   ~false~          |

Then the variable **~appleIsRedAndRound~** is already a **logical expression**, because it requires its value to be calculated based on the values of the variables **~appleIsRed~** and **~appleIsRound~**.

And this logical expression will have the value **~true~** only when both variables **~appleIsRed~** and **~appleIsRound~** have the value **~true~**.

A **Logical Expression** is an expression whose evaluation will result in a logical value.

The simplest case of a logical expression is a logical value.

Let's see how we can construct more complex logical expressions.

_________________________________________________________________________

### ![ico-25 icon] Comparison operators

The simplest way to construct logical expressions is to use **comparison operators**.
These are binary operators, meaning they have two operands.
The operands can be variables or expressions.
![ico-25 warn] Comparison operators compare not only the **values** but also the **data types** of the operands.
Comparison operators always return a **logical value**.

| Operator  | Description |
| **~==~**  | non-strict equality ^^(only operand values are compared, under the bonnet, data types are converted)^^ |
| **~===~** | strict equality ^^(operand data types are compared, and if the operand data type is the same, the operand values are compared)^^ |
| **~!=~**  | non-strict inequality ^^(values are not equal, data type is ignored)^^ |
| **~!==~** | strict inequality ^^(will return ~true~ if the data types or values are not equal)^^ |
| **~ > ~** | greater than |
| **~ < ~** | less than |
| **~>=~**  | greater than or equal to |
| **~<=~**  | less than or equal to |

String comparison is character-by-character.
Each character has a numeric code, and the character codes are compared.
◘◘![ico-25 hw]** 5**◘◘

§§§§ Demo | boolean_01_template §§§§

_________________________________________________________________________

### ![ico-30 hw] Logical operators

◘◘![ico-25 hw]** 1**◘◘

→→→ 5 > '4' | true, false | true→→→

◘◘![ico-25 hw]** 2**◘◘

→→→ 5 !== '5' | true, false | true→→→

◘◘![ico-25 hw]** 3**◘◘

→→→ 10 != '10' | true, false | false→→→

◘◘![ico-25 hw]** 4**◘◘

→→→ true != 1 | true, false | false→→→

◘◘![ico-25 hw]** 5**◘◘

→→→ true !== '1' | true, false, 'Не все так однозначно' | true→→→

◘◘![ico-25 hw]** 6**◘◘

→→→ true <= 1 | true, false | true→→→

◘◘![ico-25 hw]** 7**◘◘

→→→ 'abc' < 'cde' | true, false | true→→→

◘◘![ico-25 hw]** 8**◘◘

→→→ 'Welcome!'.length < 'How are you?'.length | true, false | true→→→

__________________________________________________________________________

## ![ico-30 icon] Negation operator

The statement ‘The apple is not red’ is the negation of the statement ‘The apple is red’.

That is, the apple can be any colour, just not red.
If we go back to Example 1:

then a new variable of logical type **~appleIsNotRed~** can be calculated based on the value of the variable **~appleIsRed~** by negation.
JS uses the **~ !~** symbol (exclamation mark) for logical negation:

![ico-25 warn] Logical negation always returns a **boolean value** regardless of the data type of the operand.
Это называется [►►►**неявное приведение типов**►►►](page/Implicit-type-conversion).

Поскольку приведение к типу **~boolean~** является достаточно простым, мы можем немного "забежать вперед":

1. Пустая строка приводится к **~false~**. Если длина строки больше 0, то такая строка будет приведена к **~true~** независимо от того, какие символы есть в этой строке.
2. Числа, отличные от 0 и **~NaN~**, приводятся к **~true~**, а 0 и **~NaN~** приводятся к **~false~**.
3. **~null~** и **~undefib=ned~** приводятся к **~false~**.
4. Любые структуры данных (массивы, объекты) всегда приводятся к **~true~**, независимо от содержимого этих структур данных или полного отсутствия содержимого.

_____________________________________________

### ![ico-25 icon] Logical multiplication

Syntax: ~operand1 **&&** operand2~
Let's go back to example 1:
In the following examples, we use the logical operator **~&&~** to operands that are **logical expressions**.

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

◘◘![ico-25 coffee] ** 7**◘◘

However, this is JS, and we can apply logical operators to data of any type.

~~~js
var appleIsNotRed = !appleIsRed
~~~

For more complex expressions:
Note the fact that the use of the logical operator **~&&~** does not uniquely determine the type of the result.

◘◘![ico-25 coffee] ** 2**◘◘

~~~js
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

◘◘![ico-25 coffee] ** 3**◘◘

~~~js
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

§§§§ Demo | boolean_02_template §§§§

____________________________________________________________

### ![ico-25 icon] Logical addition

◘◘![ico-25 coffee] **11**◘◘

◘◘![ico-25 coffee] **12**◘◘

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

Если оба операнда являются логическими выражениями (или логическими переменными), то результат будет иметь тип данных ~boolean~.

~~~js
var appleIsRedAndRound = appleIsRed && appleIsRound
~~~

§§§§ Demo | boolean_03_template §§§§

В следующих примерах мы используем логический оператор **~&&~** к операндам, которые являются **логическими выражениями**.
Логические выражения мы строим с помощью операторов сравнения.

◘◘![ico-25 coffee] ** 4**◘◘

~~~js
5 > 8 && 4 < 5   // false  
// explanation:
5 > 8            // false
4 < 5            // true
false && true    // false
~~~

◘◘![ico-25 coffee] ** 5**◘◘

~~~js
8 < 5 && 4 < 5   // false
// explanation:
8 > 5            // false
4 < 5            // true
false && true    // false
~~~

◘◘![ico-25 coffee] ** 6**◘◘

~~~js
var x = 4, y = 10, z = 8

x > y && z < y   // false
// explanation:
x > y            // false,
z < y            // true,
false && true    // false
~~~

◘◘![ico-25 coffee] ** 7**◘◘

~~~js
var x = 4, y = 10, z = 8

x < y && z < y   // true
// explanation:
x < y            // true,
z < y            // true,
true && true     // true
~~~

Однако это JS, и мы можем применять логические операторы к данным любого типа.
В этом случае начинает работать [►►►**неявное приведение типов**►►►](page/Implicit-type-conversion), т.е. операнды приводятся к логическому типу, после чего вычисляется значение выражения следующим образом: если логическое значение первого операнда (после приведения его к логическому типу данных) ~false~, то возвращается значение первого операнда, в противном случае возвращается значение второго операнда.

§§§§ Demo | boolean_04_template §§§§

Для более сложных выражений:

![](illustrations/logical-operators.svg)

Обратите внимание на тот факт, что использование логического оператора **~&&~** не определяет однозначно тип результата.
Тип данных значения, которое будет получено движком в результате вычисления выражения, зависит от типа данных операндов.

§§§§ Demo | boolean_05_template §§§§

_________________________________________________

### ![ico-25 icon] Логическое сложение

Синтаксис: ~operand1 **||** operand2~

§§§§ Demo | boolean_06_template §§§§

◘◘![ico-25 coffee] ** 8**◘◘

~~~js
5 > 8 || 4 < 5   // true

// explanation:

5 > 8            // false,
4 < 5            // true,
false || true    // true
~~~

◘◘![ico-25 coffee] ** 9**◘◘

~~~js
5 > 8 || 4 > 5   // false

// explanation:

5 > 8            // false,
4 > 5            // false,
false || false   // false
~~~

◘◘![ico-25 coffee] **10**◘◘

~~~js
var x = 4, y = 10, z = 8

x > y || z < y   // true

// explanation:

x > y            // false,
z < y            // true,
false || true    // true
~~~

◘◘![ico-25 coffee] **11**◘◘

~~~js
x > y || z > y   // false

// explanation:

x > y            // false,
z > y            // false,
false || false   // false
~~~

Итак, логическое сложение работает по принципу: если после приведения к типу данных **~boolean~** **хотя бы одного из операндов** будет получено **~true~**, то все выражение будет иметь значение **~true~**. Поскольку значения остальных операндов уже не изменят результат, то движок останавливается на первом же операнде, который после приведения типов даст **~true~**. Однако оператор **~||~** возвращает не **~true~**, а исходное значение операнда.

![](illustrations/logical-operators-1.svg)

◘◘![ico-25 coffee] **12**◘◘

~~~js
var object = {
  color: 'yellow',
  shape: 'square',
  size: 100
}

var test = object.color === 'red' || object.shape === 'circle' || object.size > 50
~~~

~~~console
true
~~~
_________________________________________________________________________

![ico-25 exclamation] Независимо от типа данных и значения переменной **~test~**:

~~~js
!test || !!test    // всегда  true

!test && !!test    // всегда  false
~~~

_________________________________________________________________________

### ![ico-25 icon] Tests

◘◘![ico-25 hw] ** 1**◘◘

~~~js
var x = undefined
~~~

→→→ x ◧ !x | undefined, null, true, false | true →→→

◘◘![ico-25 hw] ** 2**◘◘

~~~js
var x = undefined
~~~

→→→ x && !x | undefined, null, true, false | undefined →→→

◘◘![ico-25 hw] ** 3**◘◘

~~~js
var x = null
~~~

→→→ x ◧ !x | undefined, null, true, false | true →→→

◘◘![ico-25 hw] ** 4**◘◘

~~~js
var x = null
~~~

→→→ x && !x | undefined, null, true, false | null →→→

◘◘![ico-25 hw] ** 5**◘◘

~~~js
var x = NaN
~~~

→→→ x ◧ !x | NaN, null, true, false | true →→→

◘◘![ico-25 hw] ** 6**◘◘

~~~js
var x = NaN
~~~

→→→ x && !x | NaN, null, true, false | NaN →→→

◘◘![ico-25 hw] ** 7**◘◘

~~~js
var x = 5
~~~

→→→ x ◧ !x | NaN, null, 5, true, false | 5 →→→

◘◘![ico-25 hw] ** 8**◘◘

~~~js
var x = 5
~~~

→→→ x && !x | NaN, null, 5, true, false | false →→→


◘◘![ico-25 hw] ** 9**◘◘

~~~js
var x = 'Hi!'
~~~

→→→ x ◧ !x | undefined, 'Hi!', true, false | Hi! →→→


◘◘![ico-25 hw] **10**◘◘

~~~js
var x = 'Hi!'
~~~

→→→ x && !x | undefined, 'Hi!', true, false | false →→→

◘◘![ico-25 hw] **11**◘◘

~~~js
var x = ''
~~~

→→→ x ◧ !x | undefined, '""', true, false | true →→→


◘◘![ico-25 hw] **12**◘◘

~~~js
var x = ''
~~~

→→→ x && !x | undefined, '""', true, false | "" →→→


◘◘![ico-25 hw] **13**◘◘

~~~js
var x = 4, y = 10
~~~

→→→ (x > y) ◧ (x < 5) | 4, 10, true, false | true →→→


◘◘![ico-25 hw] **14**◘◘

~~~js
var x = 4, y = 10
~~~

→→→ (x > y) && (x < 5) | 4, 10, true, false | false →→→


◘◘![ico-25 hw] **15**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length && students[1] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | Anna →→→


◘◘![ico-25 hw] **16**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length ◧ students[2] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | 4 →→→


◘◘![ico-25 hw] **17**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length > 4 ◧ students[2] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | Demid →→→


◘◘![ico-25 hw] **18**◘◘

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ array.length > 4 ◧ typeof array[2] | 4, 'string', 'number', 'boolean', 'object', true, false | number →→→

◘◘![ico-25 hw] **19**◘◘

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ array.length > 4 ◧ typeof array[2] | 4, 'string', 'number', 'boolean', 'object', true, false | number →→→


◘◘![ico-25 hw] **20**◘◘

~~~js
var alpha = NaN
var betta = typeof alpha
~~~

→→→ b === 'number' | NaN, 'number', 'boolean', true, false | true →→→


◘◘![ico-25 hw] **21**◘◘

~~~js
var alpha = NaN
var betta = typeof alpha === 'string'
~~~

→→→  !a && !b | NaN, true, false | true →→→
