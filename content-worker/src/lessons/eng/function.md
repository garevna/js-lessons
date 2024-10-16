# ![ico-35 study] Функции

@@@@
Now we'll learn how to work with another very important type of data: **~function~**.<br>Our entire "JS universe" is based on functions.<br><br>**Functions are a reference type of data.**.<br><br>This means that after declaring a function, we will have a variable in our hands that will be a reference to the function.
![](images/funcs-are-our-jam.svg)
@@@@

When someone is sick, a doctor will be called, when there are problems with water supply or sewerage, a plumber will be called, and when there are problems with wiring in the house, we call an electrician. It's good that there are doctors, plumbers and electricians. Please note that they do not live in our house and do not do their work all the time. Otherwise, there would be hell in our house, crowds of people who are doing something all the time... No, no, we call them only when the need arises. They come, do their job and leave. But we still have a phone or another way to call them if the problem arises again.

Same with functions.
Each function can do something.
Each function can be called when the need arises.

Let's first learn how to call them.
^^Indeed, if you have a ready-made drill, then you should learn how to use it ![ico-20 wink].^^

## ![ico-30 icon] Function call

We have a lot of built-in functions and there are also functions that the browser provides us.
A function call consists of two parts: the function name and parentheses following the function name, in which **arguments** can be passed, i.e. some data that the function will use in its work.

There are functions that do not require passing arguments when called. In this case, you can call such a function with empty parentheses, but parentheses are required. If you pass arguments to such a function, it will simply ignore them because they are not needed for it to work. If you pass more arguments than necessary, unnecessary arguments will be discarded.

### ![ico-25 icon] console.log

For example, we use the browser console, and the code we type in the console is automatically executed after pressing _Enter_.
But until now, we didn't know that we could access the console directly (**~console~**) and call one of its functions:

§§§§ Demo | function_console_template §§§§

![ico-25 warn] In order to type multi-line code in the console, use the ~_Shift_ + _Enter_~ keyboard shortcut, since ~_Enter_~ immediately starts the typed line of code for execution:

§§§§ Demo | function_console_01_template §§§§

Now, using ~_Shift_ + _Enter_~ we can declare the object:

§§§§ Demo | function_console_02_template §§§§

_________________________________________________

### ![ico-25 icon] parseInt

We also have some very useful built-in functions at our disposal, such as **~parseInt~**, which passes the argument passed to it as an integer.
If it is a string starting with digits, the rest of the string is discarded and the integer part of the number consisting of these digits is returned.
If it is a floating point number, the integer part of the number is returned.
If it is something that is not cast to a number, then **~NaN~** is returned:

§§§§ Demo | function_parseInt_template §§§§

As you can see, this function waits for the agument when you call it, and if you don't pass it, i.e. call the function with empty parentheses:

~~~js
parseInt()
~~~

then the value of the argument will be **~undefined~**.

However, this function can also take a **second argument**.
By default, this argument is **10**.
If you specify 2, the first argument will be treated as a number in **binary notation**. If the first argument then contains digits other than 0 or 1, the **~parseInt~** function will return **~NaN~**.
If you pass 8 as the second argument, the first argument will be treated as a number in **eight digits**.
If you pass 16 as the second argument, the first argument will be treated as a number in **hexadecimal notation**.

§§§§ Demo | function_parseInt_01_template §§§§

**The return value will always be a decimal number**.

_____________________________________________________________________

### ![ico-25 icon] Math library

We also have a built-in library of mathematical functions **Math**.

We can view its contents in the console:

~~~js
console.log(Math)
~~~

And we will see a long list of all mathematical constants (e.g. PI number) as well as functions:

~~~~console
▼ Math {abs: ƒ, acos: ƒ, acosh: ƒ, asin: ƒ, asinh: ƒ, …}
    E: 2.718281828459045
    LN2: 0.6931471805599453
    LN10: 2.302585092994046
    LOG2E: 1.4426950408889634
    LOG10E: 0.4342944819032518
    PI: 3.141592653589793
    SQRT1_2: 0.7071067811865476
    SQRT2: 1.4142135623730951
  ► abs: ƒ abs()
  ► acos: ƒ acos()
  ► acosh: ƒ acosh()
  ► asin: ƒ asin()
  ► asinh: ƒ asinh()
  ► atan: ƒ atan()
  ► atan2: ƒ atan2()
  ► atanh: ƒ atanh()
  ► cbrt: ƒ cbrt()
  ► ceil: ƒ ceil()
  ► clz32: ƒ clz32()
  ► cos: ƒ cos()
  ► cosh: ƒ cosh()
  ► exp: ƒ exp()
  ► expm1: ƒ expm1()
  ► floor: ƒ floor()
  ► fround: ƒ fround()
  ► hypot: ƒ hypot()
  ► imul: ƒ imul()
  ► log: ƒ log()
  ► log1p: ƒ log1p()
  ► log2: ƒ log2()
  ► log10: ƒ log10()
  ► max: ƒ max()
  ► min: ƒ min()
  ► pow: ƒ pow()
  ► random: ƒ random()
  ► round: ƒ round()
  ► sign: ƒ sign()
  ► sin: ƒ sin()
  ► sinh: ƒ sinh()
  ► sqrt: ƒ sqrt()
  ► tan: ƒ tan()
  ► tanh: ƒ tanh()
  ► trunc: ƒ trunc()
    Symbol(Symbol.toStringTag): "Math"
  ► [[Prototype]]: Object
~~~~

^^ Note that constant names are written in uppercase, i.e. capital letters.^^
^^Functions are highlighted with the letter **~ ƒ~** and must have a name. Otherwise, how would we call them? ^^

~~~console
round: ƒ round()
~~~

Let's try to call some functions of the **Math** library:

§§§§ Demo | function_math_template §§§§

In parentheses, we pass **arguments** to functions when calling them.
For example, we pass the number 16 to the square root function when we call it:

~~~console
Math.sqrt(16)
~~~

and we get the result: 4.

That is, all mathematical functions return a **value**.

Let's look at such an assignment operator:

~~~js
var sin = Math.sin(Math.PI / 2)
~~~

The right-hand side of an assignment operator contains an **expression**.
In order to perform an assignment, the engine must calculate the **value** of the expression in the right-hand side, and to do this, call the function and pass a number to it.
But the parentheses of the function call again contain the **expression** ~Math.PI / 2~.
That is, the engine must first calculate the expression in the parentheses, and then pass the resulting value to the ~Math.sin~ function when calling it.

§§§§ Demo | function_math_01_template §§§§

Note that when we run the code for execution in the console:

~~~console
var argument = Math.PI / 2
~~~

then the console returns ~undefined~.

This is because the assignment operator does not return any value.

But when we ask for the value of a variable:

~~~console
argument
~~~

then it returns not ~undefined~, but a number, and we see this number in the console instead of ~undefined~.

Similarly, when we call the function:

~~~console
Math.sin(argument)
~~~

then the value 1 is returned, and we see that value in the console instead of ~undefined~.

However, if we do this:

~~~console
var sin = Math.sin(argument)
~~~

then we will see ~undefined~ in the console again, because the assignment does not return a value.

______________________________________________

So, to call a function we need a function name followed by parentheses.

In the parentheses we can pass the function **arguments**, i.e. the data that the function will use when calculating the return value.

However, the function may not return any value, then the engine treats it as if the function returned ~undefined~.

Any line of code that we run in the console by pressing the ~_Enter_~ key is treated as a **anonymous** function call.

If that line contains an assignment operator, that line of code will return no value, so we see ~undefined~ in the console.

If we call the **~console.log~** function, it outputs the arguments passed to it to the console but returns no value, so we see ~undefined~ again after the output to the console.

Finally, let's see what the **~typeof~** operator returns:

§§§§ Demo | function_console_03_template §§§§

______________________________________________

## ![ico-30 icon] Declaring a function

We have already learnt how to call functions. It's time to learn how to create them, or more precisely, how to declare functions.
Exactly declare, because our goal is not to immediately call a function where we have declared it.

In order to properly declare a function, we need to understand how a function differs from all other data types.

Firstly, a function contains the code that will be executed when the function is called.
This code is placed in curly braces and is called the **body of the function**.

~~~js
{
  var number = 5
  var name = 'Google'
}
~~~

There is obviously something missing here, isn't there?
Of course, after all, the function must have a name so that we can call it.
And more of that, we see a code block in curly braces, and if we put it into our code in this way, it will simply be executed, just like all the lines of code before and after it.

§§§§ Demo | function_00_template §§§§

No, we obviously need something else.
For example, we need the code to be saved under some name, but not executed in the place where it appeared.
So that we can run that code later, when we need to, to execute it. Not immediately, but sometime later.

But if we just write it down:

~~~js
var func = {
  var number = 5
  var name = 'Google'
}
~~~

the engine will think we want to create an object (remember how we created data structures?).
But we can't use the keyword **_~~var~_** and the assignment operator inside curly braces when declaring an object, because there must be comma-separated pairs (key: value) listed there.
What will the engine respond to our code?
The engine will generate the **SyntaxError** exception:

~~~error
    Uncaught SyntaxError: Unexpected identifier 'number'
~~~

So how do we explain to the engine that this is not an object, but the body of a function?

We need the keyword **~function~** for that.

Let's try to fix the situation like this:

~~~js
var func = function {
  var number = 5
  var name = 'Google'
}
~~~

and the engine generates a **SyntaxError** exception again:

~~~error
    Uncaught SyntaxError: Unexpected token '{'
~~~

The engine obviously doesn't like the curly bracket after the word **~function~**....
Hmmm... Maybe it should be something else?

And now we remember that we always call a function using parentheses, in which arguments can be passed.

Aha, that's right, we need to insert parentheses between the **~function~** keyword and the opening curly brace "{":

~~~js
var func = function () {
  var number = 5
  var name = 'Google'
}
~~~

So, we used the assignment operator, in the right part of which we put the following expression: the keyword **~function~**, followed by parentheses, and then curly brackets for the function body.

As we already know, the engine will first calculate the expression in the right part of the assignment operator, and then put the obtained value into the **~func~** variable.
So, after evaluating the expression in the right part of the assignment operator, a **function object** (in the language specification - ‘**callable object**’) will be created.
But all objects, as we already know, are **reference data type**, i.e. a **reference** will be returned to us, which will go into the **~func~** variable.

So, the code inside the function body has not been executed.
Shall we check it?

Let's declare the variables **~number~** and **~name~** before declaring the function.

§§§§ Demo | function_01_template §§§§

As you can see, the function declaration did not affect the values of the variables **~number~** and **~name~**.
That is, the code in the function body did not work.
However, when we printed the **~func~** variable to the console, we saw the function body. That is, the function's code is stored somewhere, but it has not worked yet.

So, we have a reference to the function, now we just need to call the function:

~~~js
func()
~~~

§§§§ Demo | function_02_template §§§§

Such an assignment:

~~~js
var func = function () {}
~~~

is one of the ways to declare a function, which is called **function expression**.

Indeed, if we use an assignment operator, we have an **expression** on the right-hand side, hence the name **function expression**.

However, this is not the only way to declare a function.

_____________________________________________________________________

In fact, the keyword **_~function~_** instead of the keyword **_~var~_** is quite enough for us:

~~~js
function func () {}
~~~

This is another way of declaring a function - **function declaration**.

We see that the difference from **function expression** is the absence of the assignment operator.
Later we'll go into details about what it affects and why.

In fact, we have declared a **_~func~_** variable by immediately specifying its data type when declaring it, i.e. using **_~function~_** instead of **_~var~_**.

The fact that we don't use the assignment operator doesn't mean that assignment doesn't happen. Assignment happens ‘under the bonnet’. That is, a function is created and a reference to it is placed in the **_~func~_** variable.

_________________________________________________

![ico-25 warn] Parentheses after a variable name indicate a function call and can only be used when the variable is a reference to a function.
Otherwise, a **TypeError** exception will be generated:

~~~js
var func = 10
func()
~~~

~~~error
    Uncaught TypeError: func is not a function
~~~
_________________________________________________

## ![ico-30 icon] Formal parameters

Let's go back to the fact that parentheses are required when declaring a function.
When calling a function, parentheses are also required.

Obviously, parentheses play an important role here.

Recall how parentheses can be used when calling a function: we use them to pass **arguments** to the function. I.e. we place some data to parentheses for the function to use this data at runtime.

Ok, but how does the function receive this data?

Arguments have to be saved somewhere, and function needs a reference to them to operate with.

And where do we store the data? Well, not in drawers, and not in basins, and not in pots.
We store our data in **variables**.

That is, in order to accept the arguments passed when calling a function, we need to prepare the variables where these data (arguments) will be placed beforehand.

And somehow it is self-evident that we should place the names of these variables to the same place where the arguments will be received later.

That is, in parentheses.

Do you see the sense?

§§§§ Demo | function_parameters_template §§§§

Thus, when declaring a function, we use parentheses to list there the names of variables that we will use for calculations in the body of the function.

These variables are called **formal parameters** of the function.

These variables have no values at the time the function is declared.

When the function is called, **arguments** will be listed in parentheses, which will become the values of the formal parameters at this moment.
That is, each time we call the function, we can pass different arguments to it, thus getting different results.

### ![ico-25 icon] Default values

Obviously, the big problem for us was errors related to passing incorrect values of arguments.
In arithmetic operations, in case of an error we will get the insidious value **~NaN~**, which will cause us a lot of trouble.

§§§§ Demo | function_parameters_01_template §§§§

But in 2015, a new version of the language specification (ES6) was released in which we now have the ability to set default values for function parameters when declaring a function, which avoids the problems of calling a function with no parameters or when those parameters have values **~undefined~**:

§§§§ Demo | function_parameters_02_template §§§§

Furthermore, you can make the default values of the function parameters **calculable**:

§§§§ Demo | function_parameters_03_template §§§§

![ico-25 warn] Note that **default function parameter values** are usefull when a **~undefined~** value (or no value at all) is passed as function arguments.
That is, it does not save you from checking for other ‘undesirable’ argument values, such as **~null~**, **~NaN~** or when the argument should be a number and a non-numeric value is passed.

__________________________________________________________________

## ![ico-30 icon] Return operator

The functions we've declared so far have been kind of "incomplete" because they didn't return anything, so we kept seeing that annoying **~undefined~** in the console.

Now, finally, we will get rid of this "inferiority" and make our functions return a value.
And it is very easy to do it: there is a unary operator **~return~** for this purpose.

~~~js
var calcs = function (x = 1, y = x * 2, z = 0) {
  return x + y - z
}
~~~

![ico-25 warn] This operator can be used only in the function body.
If you try to use it outside the function body, an exception will be generated:

~~~error
    Uncaught SyntaxError: Illegal return statement
~~~

The **~return~** operator interrupts function execution, and if the **~return~** operator has an operand (expression), the value of this expression will be calculated and returned by the function.

If the operand is not explicitly specified, **~undefined~** is implied.

____________________________________________________________________

## ![ico-25 icon] Tests

◘◘** 1**◘◘
~~~js
var func = function (arg) {
  return Math.random() * arg
}
~~~

→→→ What's that? | 'function declaration', 'function expression' | function expression→→→

◘◘** 2**◘◘
~~~js
function greeting (userName) {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ What's going to be in the console? | '""', 'Hi user!', 'Hi undefined!', 'Hi !' | Hi undefined!→→→

◘◘** 3**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ What's going to be in the console? | '""', 'Hi !', 'Hi undefined!', 'Hi Human!' | Hi Human!→→→


◘◘** 4**◘◘
~~~js
function greeting (userName = 'Human') {
  return 'Welcome ' + userName + '!'
  return 'Hi ' + userName + '!'
}

console.log(greeting())
~~~

→→→ What's going to be in the console? | 'Hi !', 'Welcome !', 'Hi undefined!', 'Welcome undefined!', 'Hi Human!', 'Welcome Human!' | Welcome Human!→→→

◘◘** 5**◘◘
~~~js
function randomInteger (number = 100) {
  return Math.round(Math.random() * number)
}
~~~

→→→ randomInteger() > 100 | true, false, undefined, 0, NaN | false→→→

◘◘** 6**◘◘
~~~js
function hexToDecimal (hexNumber = 0) {
  return parseInt(hexNumber, 16) || 0
}
~~~

→→→ !hexToDecimal() | undefined, true, false, 0, NaN | true→→→

◘◘** 7**◘◘
~~~js
function binToDecimal (bin = '1111111') {
  return parseInt(bin, 2) || 0
}
~~~

→→→ binToDecimal('540') | undefined, true, false, 0, NaN | 0→→→

◘◘** 8**◘◘
~~~js
function hexToDecimal (hex = 'FF') {
  return parseInt(hex, 16) || 255
}
~~~

→→→ hexToDecimal('rob') | undefined, true, false, 0, NaN, 255 | 255→→→
____________________________________________________________________

[![ico-25 hw] Quiz](quiz/function)

_______________________________________
[![ico-20 link] w3schools](external/w3-function)
[![ico-20 link] MDN](external/mdn-function)
