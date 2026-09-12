# ![ico-35 study] Primitive data types

In JS, every variable has a value. A **primitive** data type is the data type of a variable with its name directly attached to its value.

However, the value of a variable can be a **reference**. We call such data types **reference** data types. We'll look at the reference data type next.

Primitive data types include:

• string
• number
• [%%%bigint%%%](page/BigInt)
• boolean
• undefined
• symbol
• [%%%null%%%](page/typeof#null)
______________________________________________________________

### ![ico-25 icon] String

A string is an ordered set of characters that are enclosed in double (~"My name is Piter"~) or single (~'My name is Piter'~) quotes.

| ^^ 0^^ | ^^ 1^^ | ^^ 2^^ | ^^ 3^^ | ^^ 4^^ | ^^ 5^^ | ^^ 6^^ | ^^ 7^^ | ^^ 8^^ | ^^ 9^^ | ^^10^^ | ^^11^^ | ^^12^^ | ^^13^^ | ^^14^^ | ^^15^^ |
| ** M** | ** y** |        | ** n** | ** a** | ** m** | ** e** |        | ** i** | ** s** |        | ** P** | ** i** | ** t** | ** e** | ** r** |

You can also wrap a string in backquotes **~ ` ~**, but backquotes are usually used for [►►►**template literals**►►►](page/literals).

If double quotes occur within a string, the string itself must be wrapped in single quotes, and vice versa.

◘◘![ico-25 cap]◘◘

~~~js
var str = '"es2023" is a shorthand for "ECMAScript 2023 Language Specification".'
~~~
~~~js
var str = "'es2023, x' is a shorthand for 'ECMAScript 2023 Language Specification'."
~~~

However, you can use the escape slash **~&bsol;~** to let the engine know that it is not a closing quote, but just a string character:

~~~js
str = '\'es2023, x\' is a shorthand for \'ECMAScript 2023 Language Specification\'.'
~~~

Each character has its own numerical code.

The correspondence between a character and its code is established in the encoding table.

The widest range of characters from various alphabets is represented in the UTF-8 encoding (Unicode Transformation Format, 8-bit).

[%%%**UTF-8**%%%](https://blog.hubspot.com/website/what-is-utf-8 ) encoding is now the dominant one on the web.

________________________________________

Since strings are an ordered set of characters, the number of characters in a string determines its **length**, is this logic?
So strings have a property **~length~**, which is available to us as follows:

§§§§ Demo | var_string_length_template §§§§

By the way, note the following expression:

~~~console
message + string
~~~

Here the **~ + ~** operator acts as a **string concatenation** operator.
This creates some inconvenience, since we are more used to treating it as an **arithmetic operator** of addition.
^^With **dynamic typing**, this duality of the **~ + ~** operator can lead to unpleasant side effects, which we will discuss in the "Type Conversion" section.^^
^^Later we will learn about **template literals**, which will allow us to avoid string concatenation.^^

______________________________________________________________

### ![ico-25 icon] Number

**data type: "number"**.

![ico-20 warn] It is written without quotes.

![ico-20 warn] A point is used to separate decimal places:

~~~js
var x = 53.25
~~~

This is the most problematic data type in JavaScript.

Let's figure out what the issue is.

The **~number~** type includes integers, decimal numbers (floating-point numbers), numbers in exponential form (like ~5e+37~), as well as values like **~Infinity~** and **~NaN~** (Not a Number).

| integer                     | ~15~             |
| floating-point number       | ~5.80~           |
| numbers in exponential form | ~5e+37~          |
| **~Infinity~**              | infinity         |
| **~NaN~**                   | **Not a Number** |

There’s a limit on the size of the number, which is related to the memory allocation for storing data of the **~number~** type.

#### ![ico-20 icon] Integer

A **safe integer** can have a maximum of 15 digits.

{{{vars-number-1.js}}}

Please note that after 20 digits, the number is automatically displayed in exponential form.

#### ![ico-20 icon] Exponential form

Whole numbers with a lot of zeros (500000000000000) or very small floating-point numbers (0.000000001) are much easier to write in exponential form.

The exponential notation of a number looks like this: **~1.8e+5~**, where the letter **~e ~** separates the significand and the exponent.
In this example, the significand (the meaningful part of the number) is **~1.8~**, and **~5 ~** is the exponent to which you raise the number 10.
To get the number in a format we're used to, you need to multiply the significand by the number resulting from raising **~10~** to that exponent:

••1.8 ✖ 10↑↑5 ↑↑••

As a result, we'll get the number **180000**.

••500 → 5e+2 (5 * 10↑↑2 ↑↑)••
••5000 → 5e+3 (5 * 10↑↑3 ↑↑)••
••50000 → 5e+4 (5 * 10↑↑4 ↑↑)••

••0.05 → 5e-2 (5 / 10↑↑2 ↑↑)••
••0.005 → 5e-3 (5 / 10↑↑3 ↑↑)••
••0.0005 → 5e-4 (5 / 10↑↑4 ↑↑)••

{{{vars-number-exponential-1.js}}}

However, "under the hood," the engine itself converts the number to exponential form to save memory.

{{{vars-number-exponential-2.js}}}

_____________________________________

#### ![ico-20 icon] Infinity

![ico-20 warn] The value **~Infinity~** can occur when dividing by zero:

~~~js
var x = 1, y = 0
var z = x / y
~~~

^^The value of variable **~z ~** will be **~Infinity~**.^^

Generally speaking, **~Infinity~** is a constant that has a specific value, which is related to the limitations of memory space for storing numbers.

{{{vars-number-infinity.js}}}

_____________________________________

#### ![ico-20 icon] NaN

![ico-20 warn] The value **~NaN~** can occur when trying to perform arithmetic operations with operands that aren't numbers and can't be converted to a number, like ~5 * 'total'~, as well as when attempting to divide zero by zero: ~0/0~.

![ico-20 warn] The value **~NaN~** is not equal to any other value, including itself.

![ico-20 warn] No arithmetic operations in JS will ever result in an error, because if there's an error, the operation will return **~NaN~**.

__________________________________________________

#### ![ico-20 icon] Error in calculations

Now let's talk about the accuracy of calculations and rounding numbers.

{{{vars-number-4.js}}}

So, clearly working with numbers isn't our top priority, and if you suddenly decide to use **JS** like **Fortran**, you'll have to deal with calculation inaccuracies.

_____________________________________

#### ![ico-20 icon] Tests for number

◘◘** 1**◘◘

→→→ 8e-2 | 800, 0.8, 0.08, 8 | 0.08 →→→

◘◘** 2**◘◘

→→→ 1.7e+2 | 170, 1.7, 0.17, 17 | 170 →→→

◘◘** 3**◘◘

→→→ 0.3e+310 | 3e+309, Infinity | Infinity →→→

◘◘** 4**◘◘

→→→ 3e-300 ✖ 1e+30 | 3e-900, Infinity, 0, 3e-270 | 3e-270 →→→

◘◘** 5**◘◘

→→→ 1e-5 + 2e-5 | 3e-5, 0.00003, 0.000030000000000000004, NaN | 0.000030000000000000004 →→→

◘◘** 6**◘◘

→→→ 0.003 + 0.0015 | 0.0045000000000000005, 0.0045, 45e-4, NaN | 0.0045000000000000005 →→→

◘◘** 7**◘◘

→→→ 5e+310 - Infinity | 0, Infinity, NaN | NaN →→→

◘◘** 8**◘◘

→→→ 0.005 + Infinity + NaN | 0.005, 0, Infinity, NaN | NaN →→→

◘◘** 9**◘◘

→→→ 5e+300 - Infinity | 5e+300, 0, -Infinity, NaN | -Infinity →→→

______________________________________________________________

### ![ico-20 icon] Boolean

Logical type.
It accepts only two possible values: **~true~** or **~false~**.
^^(without quotes, ~'true'~ is already a string).^^
Data of this type is automatically obtained as a result of comparisons:

~~~js
5 > 8
~~~
~~~console
false
~~~

~~~js
'a' < 'b'
~~~
~~~console
true
~~~

By the way, we also got to know the comparison operators **~ >~** and **~ <~**.

Logical expressions are created using comparison operators.

The result of evaluating a **logical expression** will always be a Boolean value (**~true~** or **~false~**).

That is, if we declare a **~bool~** variable:

~~~js
var bool = 5 > 8
~~~

this will be a **~boolean~** type variable.
Next, we'll frequently encounter **~boolean~** data.

§§§§ Demo | var_boolean_template §§§§

______________________________________________________________

### ![ico-20 icon] undefined

**data type: "undefined"**.

Sometimes variables are declared without being assigned an initial value.

If a variable is declared without a value, its value will be **~undefined~**.

^^(Without quotes, 'undefined' is already a string).^^

§§§§ Demo | var_undefined_template §§§§