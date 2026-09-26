# ![ico-35 study] Logical language constructs⟪Logical_language_constructs⟫

In this section we will learn about logical values, logical variables, logical expressions and logical operators.

## ![ico-30 icon] Variables of logical type (boolean)⟪Variables_of_logical_type_(boolean)⟫

••When a person declares that his son is 18 years old, that statement will be true for one year, but before that year and after that year, that statement will be a lie. And that is on the condition that this person has a son.••

![](illustrations/logical-expressions.svg)

•••• none
Suppose a man wrote this statement on his social media page when he was 15 years old.
He did not yet have a son, and the statement was false.
Then he grew up, got married and had a son, but the statement remained false because his son was not yet 18.
Finally, when his son turned 18, the statement became true.
But it lasted for one year.
Then his son turned 19, and this statement became false again.
Thus, this statement is a **variable**. For its meaning can change.
The values this variable can take are **_true_** or **_false_**.
••••

![ico-25 pin] **~true~** and **~false~** are **logical values**.

![ico-25 warn] **There are no other logical values.**
^^We don’t have a vague notion like ‘It’s not all that clear-cut’. Everything is clear-cut. It’s either black or white. Our world is simple.^^

So, our variable can take on one of two possible logical values (**~true~** or **~false~**).
This is a variable of **logical type** (**~boolean~**).

______________________________________

## ![ico-30 icon] Logical expressions⟪Logical_expressions⟫

The statement '_The apple is red and round_' can be decomposed into two parts: '_Apple is red_' + '_Apple is round_'.

![](illustrations/logical-expressions-1.svg)

In other words, we are effectively dealing with two logical variables, each of which takes on a logical value; that is, each is a variable of the logical type.

◘◘ ![ico-25 coffee] **1**◘◘

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

Let the boolean variable **~appleIsRed~** take the value **~true~** when the property **~apple.colour~** has the value ‘red’ and the boolean variable **~appleIsRound~** take the value **~true~** when the property **~apple.shape~** has the value ‘round’.

The variable **~appleIsRedAndRound~** takes the value **~true~** when the property **~apple.color~** has the value “red” and the property **~apple.shape~** has the value “round”.

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

### ![ico-25 icon] Comparison operators⟪Comparison_operators⟫

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
| **~>=~** | greater than or equal to |
| **~<=~** | less than or equal to |

String comparison is character-by-character.
Each character has a numeric code, and the character codes are compared.
If the first characters of the operand strings are the same, the next characters are compared, and so on, until one of the characters is greater than or less than the other.

~~~demo
> var alpha = 1
< undefined
> alpha === '1'
< false
> alpha == '1'
< true
> alpha == true
< true
> alpha > false
< true
> alpha != '1'
< false
> alpha !== '1'
< true
> typeof alpha === 'string'
< false
> typeof alpha === 'number'
< true
~~~

_________________________________________________________________________

### ![ico-30 hw] Tests⟪Tests⟫

◘◘![ico-25 hw] **1**◘◘

→→→ 5 > '4' | true, false | true→→→

◘◘![ico-25 hw] **2**◘◘

→→→ 5 !== '5' | true, false | true→→→

◘◘![ico-25 hw] **3**◘◘

→→→ 10 != '10' | true, false | false→→→

◘◘![ico-25 hw] **4**◘◘

→→→ true != 1 | true, false | false→→→

◘◘![ico-25 hw] **5**◘◘

→→→ true !== '1' | true, false, 'It’s not quite that straightforward' | true→→→

◘◘![ico-25 hw] **6**◘◘

→→→ true <= 1 | true, false | true→→→

◘◘![ico-25 hw] **7**◘◘

→→→ 'abc' < 'cde' | true, false | true→→→

◘◘![ico-25 hw] **8**◘◘

→→→ 'Welcome!'.length < 'How are you?'.length | true, false | true→→→

__________________________________________________________________________

## ![ico-30 icon] Logical operators⟪Logical_operators⟫

There are three logical operators in JavaScript: **logical multiplication**, **logical addition** and **logical negation**.

The **logical negation** operator is a unary operator, i.e. it has only one operand.
The logical operators ‘and’ and ‘or’ are binary operators; they have two operands.

Logical negation always returns a logical value, even if the operand is not a logical expression (or a logical value).
The **logical multiplication** and **logical addition** operators do not always return a logical value.

When performing logical operations, the engine internally converts the operands to the data type **~boolean~**.
This is known as [►►►**implicit type coercion**►►►](page/Implicit-type-conversion).

Since type coercion to **~boolean~** is fairly straightforward, we can ‘jump ahead’ a little:

1. An empty string is coerced to **~false~**. If the length of a string is greater than 0, that string will be coerced to **~true~** regardless of the characters it contains.
2. Numbers other than 0 and **~NaN~** are coerced to **~true~**, whilst 0 and **~NaN~** are coerced to **~false~**.
3. **~null~** and **~undefib=ned~** are coerced to **~false~**.
4. Any data structures (arrays, objects) are always coerced to **~true~**, regardless of the contents of these data structures or whether they are completely empty.

_____________________________________________

### ![ico-25 icon] Negation operator⟪Negation_operator⟫

The statement ‘The apple is not red’ is the negation of the statement ‘The apple is red’.
In other words, an apple can be any colour except red.
Returning to Example 1:

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

then the new variable of logical type **~appleIsNotRed~** can be computed on the basis of the value of the variable **~appleIsRed~** by negation.

In JavaScript, the symbol **~ !~** (exclamation mark) is used for logical negation:

~~~js
var appleIsNotRed = !appleIsRed
~~~

![ico-25 warn] Logical negation always returns a **logical value**, regardless of the operand’s data type.
In other words, whatever the data type of the operand, the operator **~ !~** will always return the logical value **~true~** or **~false~**.

◘◘![ico-25 coffee] **2**◘◘

~~~js
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

◘◘![ico-25 coffee] **3**◘◘

~~~js
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

~~~demo
> !true
< false
> !false
< true
> !''
< true
> !0
< true
> !' '
< false
> !!' '
< true
> !!0
< false
> !-1
< false
> !!-1
< true
~~~

____________________________________________________________

### ![ico-25 icon] Logical multiplication⟪Logical_multiplication⟫

Syntax: ~operand1 **&&** operand2~

Let us return to Example 1:

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

If both operands are logical expressions (or logical variables), the result will have the data type ~boolean~.

~~~js
var appleIsRedAndRound = appleIsRed && appleIsRound
~~~

~~~demo
> true && true
< true
> false && true
< false
> true && false
< false
> false && false
< false
~~~

In the following examples, we apply the logical operator **~&&~** to operands that are **logical expressions**.
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

However, this is JavaScript, and we can apply logical operators to data of any type.
In this case, [►►►**implicit type coercion**►►►](page/Implicit-type-conversion) comes into play, i.e. the operands are coerced to the boolean type, after which the expression is evaluated as follows: if the boolean value of the first operand (after being coerced to the logical data type) is ~false~, then the value of the first operand is returned; otherwise, the value of the second operand is returned.

~~~demo
> 1 && 0
< 0
> 5 && 8
< 8
> 'hi' && false
< false
> 'cat' && 'dog'
< "dog"
~~~

For more complex expressions:

![](illustrations/logical-operators.svg)

Please note that the use of the logical operator **~&&~** does not unambiguously determine the type of the result.
The data type of the value that the engine will obtain as a result of evaluating the expression depends on the data types of the operands.

~~~demo
> var alpha = '0'
< undefined
> var betta = 'false'
< undefined
> var sigma = 8
< undefined
> alpha && betta && sigma
< 8
> !!alpha
< true
> !!betta
< true
~~~

_________________________________________________

### ![ico-25 icon] Logical addition⟪Logical_addition⟫

Syntax: ~operand1 **||** operand2~

~~~demo
> true || true
< true
> false || true
< true
> true || false
< true
> false || false
< false
~~~

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

Thus, logical addition works on the principle that if, after type coercion, **~boolean~** **at least one of the operands** results in **~true~**, then the entire expression will have the value **~true~**. Since the values of the remaining operands will no longer affect the result, the engine stops at the very first operand which, after type coercion, yields **~true~**. However, the operator **~||~** returns not **~true~**, but the original value of the operand.

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
!test || !!test    // всегда  true

!test && !!test    // всегда  false
~~~

_________________________________________________________________________

### ![ico-25 icon] Tests⟪Tests⟫

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
