# ![ico-30 study] Object 'function'

_______________________________________


**The function is a _callable object_**
**A function associated with an object through a property is called a _method_**

^^![ico-25 file] ECMAScript® 2016 Language Specification^^

_______________________________________________

## ![ico-25 icon] arguments

JavaScript functions have a built-in **~arguments~** object

It has a **~length~** property, just like an array

Its elements are accessed by index, just like array elements

![ico-20 warn] However this is not an array

^^Therefore, methods for working with arrays (**~push~**, **~pop~**, etc.) cannot be applied to it.^^

^^It can be converted to a regular array using the **~Array.from~** method^^

~~~js
function test () {
  var args = Array.from(arguments)
  ...
}
~~~

The **~arguments~** object contains all the arguments passed to the function when it was called

They will be available by index strictly in the order in which they were passed to the function when called

◘◘![ico-25 cap] **Example 1**◘◘

~~~js
function testArguments () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(`[${ (i + ' ]').padEnd(10) } ${ arguments[i] }`)
  }
}

testArguments(27, false, 'Fill', [7, 4, 5], null)
~~~

______________________________________

### ![ico-20 icon] arguments.callee

The **~arguments~** object has a property **_~callee~_** - a link to the function being executed (the “master” function of the ~arguments~ object)

~~~js
function testArguments () {
  console.log(arguments.callee.name)
}

testArguments() // testArguments
~~~

^^^[Example 2]

^^Declare a function **~getArguments~**:^^

~~~js
function getArguments (param) {
  return param ? param : arguments.callee
}
~~~

^^that, if passed an argument, returns the value of that argument; otherwise, it returns a reference to itself.^^

^^Now, call this function with and without a parameter:^^

~~~js
var x = getArguments()
var y = getArguments('Hello!')
~~~

^^We stored the result of the function call without arguments in a variable **~ x ~**,^^
^^and the result of the call with the argument "Hello!" in a variable **~ y ~**^^

^^Now, we print the variables **~ x ~** and **~ y ~** to the console^^

^^The variable **~ x ~** contains an exact copy of the **~getArguments~** function^^

^^and the variable **~ y ~** contains the string "Hello!"^^

^^Call the function **~ x ~**:^^

~~~js
x('Goodbye!')
~~~

and get the string 'Goodbye!'

^^^

^^^[Example 3]

![ico-25 cap] ** 3 **

^^Declare a function that "heals itself," i.e., it adds properties and methods to itself:^^

~~~js
function setProperty (prop, val) {
  arguments.callee[prop] = val
}
~~~

^^Now, make it create a couple of properties for itself:^^

~~~js
setProperty('isActive', false)
setProperty('value', 50)
~~~

^^And, for added assurance, make it create a method for itself:^^

~~~js
setProperty('method', function () {
  console.log('And I can also cross-stitch')
})
~~~

^^Here we pass a function as the second argument to it^^
^^Now, let's check that these properties and method have appeared on the **~setProperty~** function^^
{{s0.p1}}

^^^

^^^[Example 4]

![ico-25 cap] ** 4 **

^^Let's create a function that "accumulates" the results of its own computations.^^

^^Let this be a function that calculates the factorial of a number:^^

~~~js
var factorial = function (num) {
  var res = 1, n = 1
  while (n <= num) res *= n++
}
~~~

^^Let's "modify" it as follows:^^

~~~js
var factorial = function (num) {
  if (!arguments.callee.res) arguments.callee.res = []
  var res = 1, n = 1
  while (n <= num) res *= n++
  arguments.callee.res.push(res)
  return res
}
~~~

^^Call it with different argument values and print the value of the **~res~** property to the console:^^

~~~js
factorial(5)
factorial(5)

console.log(factorial.res)
~~~

^^We will get the array ~[120, 3628800]~^^

^^^

^^![ico-20 warn] The following example is better reviewed after studying DOM element events.^^

^^^[Example 5]

![ico-25 cap] ** 5 **

^^In this example, anonymous functions are created to handle the **~click~** event of buttons.^^

^^Each function "accumulates" data about the time of the click on the button in the array **~arguments.callee.res~**^^

~~~js
var buttons = []

for (var n = 0; n < 5; n++) {
  buttons[n] = document.body
    .appendChild(document.createElement('button'))
  buttons[n].innerText = n
  buttons[n].onclick = function (event) {
    if (!arguments.callee.res) arguments.callee.res = []
    arguments.callee.res.push(Math.round(event.timeStamp))
    console.log(arguments.callee.res)
  }
}
~~~

^^Let's modify this code:^^

~~~js
var buttons = []

for (var n = 0; n < 5; n++) {
  buttons[n] = document.body
    .appendChild(document.createElement('button'))
  buttons[n].innerText = 0
  buttons[n].style = 'padding: 8px 16px'
  buttons[n].onclick = function (event) {
    var func = arguments.callee
    if (!func.clicksTime) func.clicksTime = []
    func.clicksTime.push(Math.round(event.timeStamp))
    console.log(func.clicksTime)
    var len = func.clicksTime.length
    event.target.innerText = len
    func.res = len > 1
      ? func.clicksTime[len - 1] - func.clicksTime[len - 2]
      : 0
    console.info(`Interval between the last clicks: ${func.res}`)
  }
}
~~~

^^What does each button click handler do now?^^

^^^

_______________________________________________

## ![ico-25 icon] Callable object

In this sense, the function can be compared to ![ico-30 ambulance]

Like ![ico-20 ambulance], a function can move from one object to another (from where it is called)

In this case, the objects calling the function are **call context**

The function itself must have "tools" to perform its task in the context of the call

All these tools that are not related to the call context, but are exclusively at the disposal of the function, belong to the **execution context**

So, where ![ico-20 ambulance] will go is **call context**
What's inside ![ico-20 ambulance] is the **execution context**

^^^[Execution context]

![ico-30 ambulance]

| **Properties** ^^(variables)^^ | **Methods** ^^(functions)^^ |
| ^^A set of tools, medications, bandages, various devices (IVs, defibrillator, ventilator, etc.)^^ | ^^The professional skills of the ambulance staff (can give an injection, start an IV, use a defibrillator, carry the patient on a stretcher, etc.)^^ |

^^All of this is what the ambulance carries with it.^^

^^^

^^^[Call context]

![ico-30 ambulance]

^^• Specific conditions (private house, apartment in a high-rise building, presence or absence of an elevator, running water, etc.)^^
^^• A specific patient with specific symptoms, age, medical history, character, etc.^^

^^^

## ![ico-25 icon] Call context

The calling context is **object**

Typically, when calling a function, the name of this object comes before the name of the function, and is separated from it by a dot:

~~~js
patient.emergency()
~~~

As a rule, if the object name is not specified before the function name, then the context of the function call is the global object **~window~**

^^The exception is for functions whose calling context is set using the ~bind()~ method^^

![ico-20 warn] It follows that all JS functions are methods
If the object ("master" of the method) is not specified, the global object is assumed

_______________________________

^^^[Example 6]

![ico-25 cap] ** 6 **

^^Declare three functions:^^

~~~js
function first () {
  console.log('Function first is working')
}
function second () {
  console.log('Function second is working')
}
function third () {
  console.log('Function third is working')
}
~~~

^^All three functions are declared in the global context, meaning they are methods of the global **~window~** object.^^

^^As we already know, properties of an object can be accessed like elements of an associative array.^^

^^Thus, the expression:^^

~~~js
window['first']
~~~

^^will return the **~first~** function, which is a property (method) of the global **~window~** object.^^

^^To call this function, we just need to add parentheses:^^

~~~js
window['first']()
~~~

^^Using this fact, we can call a function whose name is stored in a variable of type "_string_":^^

~~~js
for (var funcName of ['first', 'second', 'third']) window[funcName]()
~~~

^^^

____________________________

### ![ico-20 icon] Call context reference

When an ambulance is called, it receives a link to the call object.

The team needs to know where to go, the patient’s symptoms, age, etc.

In the same way, a function must have access to the object that calls it, its properties, which may be necessary for the normal operation of the function.

Within a function, **~this~** keyword is a reference to the object in whose context the function is called (i.e., the calling context)

For example, for the function ![ico-20 ambulance]

^^![ico-20 green-ok] this.address^^
^^![ico-20 green-ok] this.floor^^
^^![ico-20 green-ok] this.apartment^^
^^![ico-20 green-ok] this.patient.name^^
^^![ico-20 green-ok] this.patient.age^^
^^![ico-20 green-ok] this.patient.symptoms^^
...

^^If it were not for **~this~**, it is unlikely that the function could help the "patient" ![ico-20 smile]^^

_________________________________________

## ![ico-25 icon] Execution context

![ico-20 warn] Each function call results in the creation of a new execution context.

The execution context is created before code execution begins.

Each **~return~** exits the execution context.
While the function execution is not completed, its context will be active.
Since functions can call each other, their context is pushed onto the stack
![](illustrations/function-object-01.png)
^^(queue: last in, first out).^^
The top of this stack will always be the current execution context.

![](illustrations/function-object-02.png)

What will be present in this context?

![ico-20 green-ok] LexicalEnvironment
![ico-20 green-ok] Scope chain
![ico-20 green-ok] ~this~

_____________________________________________

### ![ico-20 icon] Lexical Environment

^^When a function is called, it is activated^^
^^It needs somewhere to safely “place” its data with which it will work^^
^^In addition to the arguments a function receives when called, it can have its own internal data needed for temporarily storing intermediate computation results.^^

When a function is called, an object is created containing all the necessary variables.

This object is called **~LexicalEnvironment~**.

~LexicalEnvironment~ contains the function arguments and all variables declared inside the function (including functions)

^^therefore it is also called _variable object_ or _activation object_^^

^^Thus, the activation object can be compared to a locker for storing the “personal belongings” of the function^^

^^![ico-20 warn] It's impossible to access activation object^^

______________________________________________

### ![ico-20 icon] hoisting

So, after calling the function:

| ** 1** |   | **An execution context is created**                         |
|        | • | ^^an activation object is created (~Lexical Environment~)^^ |
|        | • | ^^scope is determined^^                                     |
|        | • | ^^the value of **~this~** is set up^^                       |
| ** 2** |   | **The code is interpreted and executed**                    |

![ico-20 warn] Please note that all internal variables and nested functions are declared before the code starts executing, regardless of the order in which they appear in the code.
![ico-20 warn] But assignment of values ​​to variables occurs when the code starts executing.
This results in **hoisting** of variable and function declarations

^^^[Example 7]

![ico-25 cap] ** 7 **

~~~js
function delegat () {
  console.log(x)
  y = x + 5
  console.log(y)
  x = 5, y = 10

  return  x * 4 +  y / 2

  var x = 1, y = 1
}
~~~

^^Although the declaration of variables **_~ x~_** and **_~ y~_** appears in the code after the ~return~ statement, during the creation of the execution context, an activation object (Lexical Environment) will be formed in the first stage, and all variables declared within the function will be included in this object.^^

^^Thus, the declaration of variables **_~ x~_** and **_~ y~_** will take place before the code execution starts.^^

^^However, the values will be assigned to variables only at the the second stage, and the code will be executed sequentially.^^

^^Therefore, at the time of executing the code `console.log(x)`, the value of the variable **_~ x~_** will not be defined, so ~undefined~' will be printed in the console.^^

~~~js
console.log(x) // undefined
~~~

^^Similarly, at the time of executing the code:^^

~~~js
y = x + 5
~~~

^^the value of the variable **_~ x~_** will be ~undefined~, so the assignment operation will result in **~NaN~**, which will be outputted by the code:^^

~~~js
console.log(y)
~~~

^^After this, the code:^^

~~~js
x = 5, y = 10
~~~

{{s0.p2}}

^^Therefore, the function will return the value **25**.^^

^^The assignment:^^

~~~js
x = 1, y = 1
~~~

^^will not occur because the execution context will exit before this code.^^

^^^

^^^[Example 8]

![ico-25 cap] ** 8 **

~~~js
var treg = 5

function delegat () {
  treg = 10
  return

  function treg () {
    return
  }
}
delegat()
console.log(treg)  // 5
~~~

^^In this case, the declaration of the function **~treg~** will be captured in the Lexical Environment of the **~delegat~** function during the creation of its execution context and will not affect the variable **~treg~**, declared in the global context.^^

^^These will be different variables, although they share the same identifiers.^^

^^Therefore, as a result, ** 5** will be logged in the console.^^

^^^

________________________________

### ![ico-20 icon] Scope

**~Scope~** limits the access and visibility of variable and function identifiers.

^^^[scope]

^^Imagine two people named Sasha: 👨‍💼 a guy and 🙎 a girl.^^

^^There are two rooms,^^
^^and guy Sasha 👨‍💼 is in the first room,^^
^^while girl Sasha 🙎 is in the second one.^^

^^Each room has an observer.^^

^^If we ask the observer in the first room: _"Who is Sasha?"_,^^

^^he will answer: _"The guy"_ 👨‍💼^^

^^Asking a similar question to the observer in the second room, we'll get the answer: _"The girl"_ 🙎^^

^^This happens because each room has its own scope.^^

_________________________________

^^However, the scope of nested functions will be somewhat different.^^

^^Let's assume that nested functions are boxes with walls made of tinted glass.^^
^^Our function-boxes are nested within each other, like nesting dolls:^^
^^the second box is inside the first one,^^
^^the third one is inside the second one, and so on...^^

^^The observer in box 2 will not only see the contents of box 2,^^
^^but also the contents of box 1,^^
^^and the room where all the boxes are located,^^
^^but he cannot see the contents of box 3,^^
^^although the observer in box 3 can see them perfectly...^^
^^as well as the observers in all other boxes^^
^^and in the room.^^

____________________________

^^Thus, if a function refers to a variable, it will first look for this variable in its "personal belongings cabinet", and if it doesn't find it, it won't hesitate to "borrow" this variable from the outer room where it is located. ^^

___________________________

^^![ico-20 warn] All nested each other outer "cabinets" represent a ![ico-20 pin] chain of function scopes, which is part of its ![ico-20 pin] **execution context**.^^

^^^

^^^[Example 9]

![ico-25 cap] ** 9**

~~~js
var sample = 1

function changeSample () {
  sample = 10
}

changeSample()
~~~

^^The variable **~sample~**   is declared in the global scope, where the function **~changeSample~** is also declared.^^

^^The variable **~sample~** is assigned the value 1 upon declaration.^^

^^Since there is no declaration of the variable **~sample~** inside the **~changeSample~** function, when the execution context of the **~changeSample~** function is formed, this variable will not be included to the activation object ("personal belongings cabinet") of the **~changeSample~** function.^^

^^Then, during the execution of:^^

~~~js
sample = 10
~~~

^^the following happens:^^

^^the **~changeSample~** function, not finding such a variable in its own "room", refers to the external "room" where such a variable exists, and it will be assigned the value 10.^^

^^Thus, for each execution context, there exists its own chain of scopes.^^

^^The scope chain includes the scopes of all previous contexts in the stack.^^

^^^

^^^[Example 10]

![ico-25 cap] **10**

~~~js
var sample = 1

function showSample () {
  console.info('Entered the execution context of the function showSample')
  console.info(`sample === ${sample}`)

  return

  function sample () {}
}

showSample()

console.info('Exited the execution context of the function showSample')
console.info(`Now sample === ${sample}`)
~~~

**The result of code execution:**

~~~console
Entered the execution context of the function showSample
sample === function sample () {}
Exited the execution context of the function showSample
Now sample === 1
~~~

^^This example demonstrates how the **hoisting** mechanism works.^^

^^The variable **~sample~** is declared in the global scope with a value of 1.^^

^^Inside the **~showSample~** function, after the return statement, the **~sample~** function is declared.^^

After the execution of the showSample function is completed, its context will be "unmounted", and the global context will become active again, where the sample variable has a value of 1.

^^At first glance, when the code is executed sequentially, this declaration shouldn't work because the ~return~ statement is placed above it.^^

^^However, all declarations are gathered into the activation object before the code starts executing.^^

^^Therefore, by the time the code of the **~showSample~** function starts executing, the **~sample~** function will already be declared and will be safely located in the ~Lexical Environment~ of the **~showSample~** function.^^

^^Thanks to this, variable and function declarations "hoist" to the scope of their "parent" (in our case, the "parent" is the **~showSample~** function).^^

^^This is confirmed by logging the **~sample~** variable to the console.^^

^^After the execution of the **~showSample~** function is completed, its context will be "unmounted", and the global context will become active again, where the sample variable has a value of 1.^^

^^^

^^^[Example 11]

![ico-25 cap] **11**

~~~js
var sample = 1

function showSample () {
  console.info('Entered the execution context of the function showSample')
  console.info(`(1) ${sample}`)
  sample()
  console.info(`(2) ${sample}`)
  sample = 10
  console.info(`(3) ${sample}`)

  return

  function sample () { sample = 5 }
}

showSample()

console.info(`(global) ${sample}`)
~~~

{{s0.p3}}

{{s0.p4}}

{{s0.p5}}

{{s0.p6}}

{{s0.p7}}

{{s0.p8}}

{{s0.p9}}

{{s0.p10}}

^^^

____________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

_______________________________________

### ![ico-20 icon] this

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

_______________________________

![ico-25 cap] **12**

~~~js
function func () {
  console.log(this)
}
~~~

{{s1.p10}}

{{s1.p11}}

________________________________

![ico-25 cap] **13**

~~~js
function func () {
  child()

  function child () {
    console.log('child this: ', this)
  }
}

func()  // window
~~~

___________________________________

![ico-25 cap] **14**

{{s1.p12}}

~~~js
var human = {
  name: 'Ivan',
  say: function () {
    console.log('this: ', this)
  }
}

human.say() // будет выведен объект  human
~~~

________________________________

![ico-25 cap] **15**

{{s1.p13}}

~~~js
function say () {
  console.log('function say: this: ', this)
}

function girl () {
  console.log('function girl: this: ', this)
}
~~~

{{s1.p14}}

~~~js
girl.say = say
girl.say()     //  girl
girl()         // window
~~~

________________________________________

## ![ico-25 icon] prototype

{{s1.p15}}
{{s1.p16}}

~~~js
function sample () {}

console.dir(sample)
~~~

{{s1.p17}}
~~~console
▼ ƒ sample()
      arguments: null
      caller: null
      length: 0
      name: "sample"
    ▼ prototype:
        ▶ constructor: ƒ sample()
        ▶ __proto__: Object
    ▶ __proto__: ƒ ()
      [[FunctionLocation]]: VM476:1
    ▼ [[Scopes]]: Scopes[1]
        ▶ 0: Global {type: "global", name: "", object: Window}
~~~

{{s1.p18}}
{{s1.p19}}
{{s1.p20}}
{{s1.p21}}

_____________________

{{s1.p22}}
{{s1.p23}}
{{s1.p24}}
{{s1.p25}}
{{s1.p26}}

{{s1.p27}}

___________________________________

## {{s2.h1}}

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/js/js_scope.asp)
