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
It is a variable of **logical type** (**~boolean~**).

______________________________________

## ![ico-30 icon] Logical expressions

The statement '_The apple is red and round_' can be decomposed into two parts: '_Apple is red_' + '_Apple is round_'.

![](illustrations/logical-expressions-1.svg)

I.e. we are actually dealing with two logical variables, each of which takes a logical value, i.e. is a variable of logical type.

◘◘ ![ico-25 coffee] ** 1**◘◘
~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

Let the boolean variable **~appleIsRed~** take the value **~true~** when the property **~apple.colour~** has the value ‘red’ and the boolean variable **~appleIsRound~** take the value **~true~** when the property **~apple.shape~** has the value ‘round’.

The **~appleIsRedAndRound~** variable takes the value **~true~** when the variable **~appleIsRed~** has the value **~true~** and the  variable **~appleIsRound~** has the value **~true~**, too.

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
If the first characters of the string operands are equal, the next characters are compared, and so on until the code of the characters will be different.

§§§§ Demo | boolean_01_template §§§§

_________________________________________________________________________

### ![ico-30 hw] Tests for comparison

◘◘![ico-25 hw]** 1**◘◘

→→→ 5 > '4' | true, false | true→→→

◘◘![ico-25 hw]** 2**◘◘

→→→ 5 !== '5' | true, false | true→→→

◘◘![ico-25 hw]** 3**◘◘

→→→ 10 != '10' | true, false | false→→→

◘◘![ico-25 hw]** 4**◘◘

→→→ true != 1 | true, false | false→→→

◘◘![ico-25 hw]** 5**◘◘

→→→ true !== '1' | true, false, 'It\'s not all that clear-cut' | true→→→

◘◘![ico-25 hw]** 6**◘◘

→→→ true <= 1 | true, false | true→→→

◘◘![ico-25 hw]** 7**◘◘

→→→ 'abc' < 'cde' | true, false | true→→→

◘◘![ico-25 hw]** 8**◘◘

→→→ 'Welcome!'.length < 'How are you?'.length | true, false | true→→→

__________________________________________________________________________

## ![ico-30 icon] Logical operators

There are three logical operators in JS: **logical multiplication**, **logical addition** and **logical negation**.

The **logical negation** operator is a unary operator, meaning it has only one operand.
The logical operators of multiplication and addition are binary operators, they have two operands.

Logical negation always returns a logical value, even if the operand is not a logical expression (or logical value).
The **logical multiplication**, **logical addition** operators do not always return a logical value.

When performing logical operations under the bonnet, the engine casts the operands to the **~boolean~** data type.
This is called [►►►►**implicit type conversion**►►►►](page/Implicit-type-conversion).

Since type conversion to type **~boolean~** is fairly straightforward, we can ‘get ahead of ourselves’ a bit:

1. An empty string is cast to **~false~**. If the length of the string is greater than 0, such a string will be cast to **~true~** no matter what characters are in that string.
2. Numbers other than 0 and **~NaN~** are cast to **~true~**, and 0 and **~NaN~** are cast to **~false~**.
3. **~null~** and **~undefined~** are reduced to **~false~**.
4. Any data structures (arrays, objects) are always cast to **~true~**, regardless of the contents of those data structures or the complete lack of contents.

_____________________________________________

### ![ico-25 icon] Negation operator

The statement ‘The apple is not red’ is the negation of the statement ‘The apple is red’.
That is, the apple can be any colour, just not red.
If we go back to Example 1:

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

then a new variable of logical type **~appleIsNotRed~** can be calculated based on the value of the variable **~appleIsRed~** by negation.

JS uses the **~ !~** symbol (exclamation mark) for logical negation:

~~~js
var appleIsNotRed = !appleIsRed
~~~

![ico-25 warn] Logical negation always returns a **boolean value** regardless of the data type of the operand.
That is, whatever the data type of the operand, the **~ !~** operator will always return the logical value **~true~** or **~false~**.

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

### ![ico-25 icon] Logical multiplication

Syntax: ~operand1 **&&** operand2~

Let's go back to example 1:

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

If both operands are logical expressions (or logical variables), the result will be of data type ~boolean~.

~~~js
var appleIsRedAndRound = appleIsRed && appleIsRound
~~~

§§§§ Demo | boolean_03_template §§§§

In the following examples, we use the logical operator **~&&~** to operands that are **logical expressions**.
We construct logical expressions using comparison operators.

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

However, this is JS, and we can apply logical operators to data of any type.
In this case, [►►►**implicit type conversion**►►►](page/Implicit-type-conversion) starts working, i.e. operands are cast to a logical type, and then the value of the expression is calculated as follows: if the logical value after casting the first operand to a logical data type is ~false~, then the value of the first operand is returned, otherwise the value of the second operand is returned.

§§§§ Demo | boolean_04_template §§§§

For more complex expressions:

![](illustrations/logical-operators.svg)

Note the fact that the use of the logical operator **~&&~** does not uniquely determine the type of the result.
The data type of the value that will be obtained by the engine as a result of evaluating the expression depends on the data type of the operands.

§§§§ Demo | boolean_05_template §§§§

_________________________________________________

### ![ico-25 icon] Logical addition

Syntax: ~operand1 **◨** operand2~

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

So, logical addition works according to the principle: if after casting to the data type **~boolean~** **at least one of the operands** is **~true~**, the whole expression will have the value **~true~**. Since the values of the other operands will no longer change the result, the engine stops at the first operand that will yield **~true~** after type conversion. However, the **~◨~** operator returns not **~true~**, but the original value of the operand.

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

![ico-25 exclamation] Regardless of the data type and value of the variable **~test~**:

~~~js
!test || !!test    // always  true

!test && !!test    // always  false
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
