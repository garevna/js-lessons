# ![ico-35 study] Assignment operators

^^![ico-20 warn] do not confuse the assignment operator with the comparison operator.^^

Typing is setting the data type of a variable.

^^^[typescript]
When you learn typescript, you will set the data type explicitly when declaring a variable, for example:
~~~js
var ten: number = 10
~~~
In this expression, the number data type is specified after the variable name with a colon.
As a result of this declaration, it is no longer possible to assign a value of another type, for example, a string or a logical value, to the variable **~ten~**. This will cause an error at the compilation stage. Compilation is the translation of your code from typescript to javascript.

Typescript has special types such as **~any~**, **~unknown~**, **~never~**, and many other interesting things that you will get to know later.
^^^

In JS we deal with **dynamic typing**, when the data type of a variable is set in the process of assigning a value.
That is, in the right part of the assignment statement there is a **expression**, the value of which the engine must calculate and place in the variable whose name is specified in the left part of the assignment statement.

The simplest kind of expression is a constant, for example, 10:
~~~js
var ten = 10
~~~

Constant 10 has data type **~number~**, and the engine automatically sets the data type **~number~** to our variable **~ten~**.

But the expression can be more complex:

~~~js
var ten = 20 - 5 * 2
~~~

However, even in this case, the **~ten~** variable will have a value of 10 and a data type of **~number~**.

~~~js
var human = {
  age: 25,
  employed: false,
  name: John
}
~~~

In this example, the right part of the assignment operator contains an expression, as a result of calculating the value of which the engine will get a **reference** to the object. And this reference will become the value of the **~human~** variable. But the data type of the **~human~** variable will become **~object~**.

In addition to the usual assignment operator, we also have such forms that allow us to reduce the expression in the right part.

_________________________________________________________________

## ![ico-30 icon] Abbreviated forms of assignment

Let's say we have a variable **~number~**:

~~~js
var number = 10
~~~

We can use arithmetic operators (+, -, /, *, and the remainder operator %) in such expressions:

~~~js
number = number + 8
~~~

or:

~~~js
number = number * 4
~~~

or:

~~~js
number = number / 2
~~~

or:

~~~js
number = number - 5
~~~

or:

~~~js
number = number % 4
~~~

As we can see, in each of these expressions, the variable name appears in both the left and right parts of the assignment operator.
Such duplication is a bit annoying, isn't it?

Wouldn't it be better to shorten such assignment forms as follows:

~~~js
number += 8
~~~

or:

~~~js
number *= 4
~~~

or:

~~~js
number /= 2
~~~

or:

~~~js
number -= 5
~~~

or:

~~~js
number %= 4
~~~

Would you agree that this is much more convenient?

§§§§ Demo | assignments_01_template §§§§

_________________________________________________________________

## ![ico-30 hw] Tests

~~~js
var alpha = 11, betta = 7, sigma = 2, number = NaN
~~~

◘◘** 1**◘◘

→→→ alpha -= sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 2**◘◘

→→→ number += betta  | 7, 11, 9, NaN, 0, 2 | NaN →→→

◘◘** 3**◘◘

→→→ betta += sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 4**◘◘

→→→ betta /= alpha  | 7, 11, 9, NaN, 1, 2 | 1 →→→

◘◘** 5**◘◘

→→→ alpha %= (sigma + 5)  | 0, 1, 2, 3, NaN | 2 →→→