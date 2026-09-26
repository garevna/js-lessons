# ![ico-35 study] Variable declaration⟪Variable_declaration⟫

## ![ico-30 icon] Keyword var⟪Keyword_var⟫

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

~~~demo
> var alpha = 10
< undefined
> alpha
< 10
> var provider = 'Google'
< undefined
> provider
< 'Google'
> var test = false
< undefined
> test
< false
~~~

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

^^^[Variables and global object

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

## ![ico-30 icon] Variable names⟪Variable_names⟫

![ico-25 warn] Variable names can contain letters, numbers, underscores, and dollar signs.

![ico-25 warn] Variable names can begin with a letter, the sybols **~ $~** and **~ _~**.

~~~demo
> var $$ = 15
< undefined
> $$
< 15
> var ___ = 20
< undefined
> ___
< 20
> $$ + ___
< 35
~~~

It is recommended to give long and clear names of variables and functions composed of several words.
It improves code readability:

~~~js
var lastUserVisit = '2019-02-05'
~~~

![ico-25 warn] Variable names are case sensitive (~name~ and ~Name~ are different variables).

~~~demo
> var showMustGoOn = true
< undefined
< var showmustgoon = 'Win!'
< undefined
> showMustGoOn
< true
> showmustgoon
< 'Win!'
~~~

@@@@
![](illustrations/camel-case.png)
**Camel Case** - a style of writing multi-word variable names where each successive word begins with an upper case literal.<br><br>The first literal with which a variable name begins must be in lower case.
@@@@

^^Only constructor and class names, which we will get to know later, should begin with an uppercase letter.^^

^^For the future: it is recommended to start **function** names with a **verb** to distinguish them from variable names where data is stored.^^

[![ico-25 warn] **_Reserved words_**](https://www.w3schools.com/js/js_reserved.asp) cannot be used as variable names.

![ico-25 warn] Variable names cannot start with a number.

~~~js
var 14br = 10
~~~

~~~error
    Uncaught SyntaxError: Invalid or unexpected token
~~~