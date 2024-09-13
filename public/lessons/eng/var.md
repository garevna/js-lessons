# ![ico-35 study] Variables. Data types

A little ahead of time, let us introduce the concept of a **global object**.
A **global object** is the environment in which we "live" (operate) and beyond which we cannot go.

@@@@
<br>On the client side JS works in the browser, in the console of which, by the way, we perform all the operations below.<br><br>This is possible because the **V8** engine built into each browser interprets our code and executes it.
![](images/v8-logo.svg)
@@@@

Simplistically speaking, the **global object** for us is the browser (more precisely, its **object model**, but we will deal with that later).
The browser itself works in the operating system and has access to its capabilities.
But we cannot go outside the browser and interact with the operating system directly.
So, the operating system allocates system resources, in particular memory, for the work of applications, including the browser.
The browser manages the memory resource allocated to it, part of which it allocates to the **V8** engine.

Next we will talk about variables, i.e. the memory that will be used by our application.
For our code, access to the global object is provided by the **~window~** variable.

## ![ico-30 icon] Memory and data

Memory is a huge number of cells, each of which can contain 0 or 1.

@@@@
Such a cell is a **bit** of memory.<br>That is why the binary number system was the basis for the first computers.<br>The **8 bits** make **1 byte** of memory.
![](illustrations/vars-bit-and-byte.png)
@@@@

A maximum of 8 units can be placed in **1 byte** of memory, i.e. the binary number 11111111.

In decimal notation this would be the number 255 without a sign.

If **byte** (8 bits) is interpreted as a signed number, one bit will contain the sign of the number (**+ **or** -**), so the maximum number with a sign that can ‘fit’ into one byte is 127 (seven units).

••-1111111↓↓2 ↓↓ → -127↓↓10↓↓••

^^Any number can be represented in binary by a set of zeros and ones:^^

{{{vars-01.js}}}

^^Any number can be decomposed by powers of two + remainder (0 or 1).^^
^^Since in binary, a two is a ten, we replace the powers of two with the powers of ten, add up, and add the remainder.^^
^^It's simple enough.^^

{{{vars-binary.js}}}

As you have already guessed, the computer can only work with binary numbers, i.e. sets of zeros and ones.
The reasonable question is how does the computer store text, pictures and videos, etc.

Any shade is represented as several numbers:

{{{vars-color.js}}}

Any character is represented by its code (number):

{{{vars-char.js}}}

Thus, any information is represented in computer memory by sets of zeros and ones, and managing memory allocation is a very complex process.
It is quite improbable to operate on physical memory addresses to access data.
The operating system does that.
You don't need to know the physical addresses where your data will be stored.
You need to come up with a name for each data item, and tell the engine what data item you will store under that name.
This is how a **variable** is created.
So, **variables** make it easier for you to manipulate your data and keep your operating system and running applications safe.
_________________________________________________________________

## ![ico-30 icon] var

Your data (numbers, strings, etc.) will be stored in computer memory as long as your application is running, but you don't need to know exactly where the engine stores it.
Variable names are a convenient form of addressing where you don't have to manipulate physical memory addresses.
You simply tell the engine the name of the variable, and you can then use that name to access the data.

To declare a variable, the keyword **~var~** is used, followed (with a space) by the variable name.
Upon encountering such a declaration, the engine reserves a certain section of computer memory and "binds" the address of the memory allocated for its storage to the variable name you specify.
^^Note that if necessary, the engine can move the stored value to another memory location, and it will automatically change the value of the address to which the variable name is bound without you even knowing it.^^

![ico-25 warn] Declaring a variable with the **~var~** keyword places our variable in a global **~window~** object.

~~~js
var number
~~~

What does this mean for us?
That we can refer to the value of this variable both directly by its name and indirectly through a **global object**:

^^in dot notation:^^
••window.number••

^^or like this:^^

••window['number']••

When you declare a variable, you can immediately assign an initial value to it.

For this purpose, the assignment operator (**~ =~** ) is used, which is the most common in any script.

![](illustrations/var-01.gif)

The left side of the assignment operator should contain the variable name, the right side should contain some **expression**.
The engine will compute the value of the expression on the right side of the assignment operator, and put the computed value into the variable named on the left side of the operator.

~~~js
var number = 5 + 8 - 4
~~~

After executing this code, the variable **~number~** will have the value 9.

If the left side of the assignment statement contains an expression whose value is not the variable name:

~~~js
'user' + 'Name' = 9 + 8
~~~

the engine will generate an exception:

~~~error
    Uncaught SyntaxError: Invalid left-hand side in assignment
~~~

However, this does not mean that there cannot be an expression in the left part of the assignment operator.

Let's consider an example.

^^^[![ico-25 coffee] 1]

Let's declare the variable **~userName~** and assign the value 'Piter' to it:

~~~js
var userName = 'Piter'
~~~

Our variable is in the global object **~window~**.
So we have access to it as a **~window.userName~** variable.
Or as **~window['userName']~**.

Therefore, we can use an expression in the left part of the assignment operator, after calculating it, the engine will get a reference to the variable:

~~~js
window['user' + 'Name'] = 'Helen'
~~~

You can check for yourself that the value of the **~userName~** variable has changed.

^^^

^^When we get to destructuring, you'll see what other expressions can be on the left side of the assignment operator.^^


![ico-25 warn] If we declare variables but don't assign initial values to them:

~~~js
var x, y, z
~~~

then their value will be **~undefined~** (not defined).

![ico-25 warn] If we do not declare a variable, but try to access it:

~~~js
console.log(sigma)
~~~

![ico-20 err] an error message will appear in the console:

~~~error
    Uncaught ReferenceError: sigma is not defined
~~~

You can declare several variables in one line, separating them with a comma:

~~~js
var person = 'Piter',  hobby = 'football',  age = 30
~~~

______________________________________________________________

## ![ico-30 icon] Variable names

![ico-25 warn] Variable names can contain letters, numbers, underscores, and dollar signs.

![ico-25 warn] Variable names can begin with a letter, the sybols **~ $~** and **~ _~**.

![](illustrations/var-02.gif)

It is recommended to give long and clear names of variables and functions composed of several words.
It improves code readability:

~~~js
var lastUserVisit = '2019-02-05'
~~~

![ico-25 warn] Variable names are case sensitive (~name~ and ~Name~ are different variables).

![](illustrations/var-04.gif)

@@@@
![](illustrations/camel-case.png)
**Camel Case** - a style of writing multi-word variable names where each successive word begins with an upper case literal.<br><br>The first literal with which a variable name begins must be in lower case.
@@@@

^^Only constructor and class names, which we will get to know later, should begin with an uppercase letter.^^

^^For the future: it is recommended to start **function** names with a **verb** to distinguish them from variable names where data is stored.^^

[![ico-25 warn] **_Reserved words_**](https://www.w3schools.com/js/js_reserved.asp) cannot be used as variable names.

![ico-25 warn] Variable names cannot start with a number.

![](illustrations/var-03.gif)

______________________________________________________________

## ![ico-30 icon] Data types

As you have already realised, any data is stored in computer memory as a set of zeros and ones.
In order for the engine to correctly interpret this set of zeros and ones, it must know what was stored at the given address: a number, a string or something else.

Suppose a binary number is stored at the specified address:

••0100011001000111010010000100100101001011010011000100110101001110••

It can be interpreted as a decimal integer:

••5064095785634516000••

or as a string with each character occupying 1 byte:

••FGHIKLMN••

There are also many other interpretations.

^^Variables can store numbers, strings, logical values, specific **~null~** and **~undefined~** values, as well as **reference type** data, which we'll get to later.^^

So, it is important that the engine knows the type of the data that is stored in the variable.

Unlike languages with strict typing, we do not need to specify the type of data we intend to store in a variable when declaring it.

**The data type is determined during the process of assigning a value.**

This is called **dynamic typing**.

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

______________________________________________________________

### ![ico-20 icon] undefined

**data type: "undefined"**.

Sometimes variables are declared without being assigned an initial value.

If a variable is declared without a value, its value will be **~undefined~**.

^^(Without quotes, 'undefined' is already a string).^^

______________________________________________________________

## ![ico-25 icon] Operator typeof

^^Another language operator that you're getting to know today.^^

^^The first one, as you remember, is the **assignment operator**.^^

^^Next, we got familiar with two **comparison operators**.^^

Language operators always have **operands**.

For example, the assignment operator has two operands: one on the left and the other on the right.

![ico-20 warn] Operands are always separated from the operator by a space.

Depending on the number of operands, an operator can be:

| operator | number of operands | exapmples |
| unary    | 1                  | **~typeof~** |
| binary   | 2                  | **~ =~**, **~ >~**, **~ <~** |
| ternary  | 3                  | we'll look at this operator a little later |

Let's declare the variable **~num~** and assign it a value of 10:

~~~js
var num = 10
~~~

Now let's use the **~typeof~** operator to find out the data type of **~num~** variable:

~~~js
typeof num
~~~

We'll see in the console:

~~~console
'number'
~~~

Let's figure out what the engine does when it encounters a ~**typeof** num~ statement.

The engine calculates the value of this expression and replaces the ~**typeof** num~ expression with the computed value.

Let's look at another example:

~~~js
var companyName = 'Google'

typeof companyName
~~~

~~~console
'string'
~~~

![ico-25 warn] The **~typeof~** operator returns a **string**.

What does this mean?

~~~js
var boolean = false

typeof boolean
~~~

~~~console
'boolean'
~~~

This means that if the engine encounters an expression like this (devoid of any meaning other than educational - for you):

~~~js
typeof typeof boolean
~~~

then we will always get the same answer:

~~~console
'string'
~~~

Possible values ​​(strings) returned by the **~typeof~** operator:

• ~string~
• ~number~
• ~bigint~
• ~boolean~
• ~object~
• ~undefined~
• ~function~
• ~symbol~

As you can see, there are data types on this list that we haven't covered yet and that we have yet to explore.

__________________________________________________

### ![ico-20 icon] Tests for typeof

◘◘** 1**◘◘

→→→ typeof 2e-200 | 'number', 'string', 'boolean', 'undefined' | number →→→

◘◘** 2**◘◘

→→→ typeof NaN | 'number', 'string', 'boolean', 'undefined' | number →→→

◘◘** 3**◘◘

→→→ typeof 'Infinity' | 'number', 'string', 'boolean', 'undefined' | string →→→

◘◘** 4**◘◘

→→→ typeof 5 > 8 | 'number', 'string', 'boolean', 'undefined' | boolean →→→

◘◘** 5**◘◘

→→→ typeof undefined | 'number', 'string', 'boolean', 'undefined' | undefined →→→

__________________________________________________

## [![ico-25 icon] ECMAScript Specification](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html )

The current language specification defines seven data types:

• **Boolean**
• **Null**
• **Undefined**
• **Number**
• **String**
• **Symbol**
• **Object**

The **~typeof~** operator works "the old fashioned way", because if the principle of its operation were changed, then many sites created before 2015 would simply crumble.

However, when using it, it is worth remembering its "imperfection".

When comparing the data types of two variables, keep in mind that the characters are arranged in alphabetical order in the encoding table, so when comparing, the larger one will be the one which is located further from the beginning of the table.

______________________________________________________________

[![ico-30 hw] Data types](test/dataTypes)

[![ico-30 hw] Operator **typeof**](test/typeof)
