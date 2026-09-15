# ![ico-30 study] The function object

_______________________________________


**A function is a callable _object_**
**A function associated with an object via a property is called a _method_**

^^![ico-25 file] ECMAScript® 2016 Language Specification^^

_______________________________________________

## ![ico-25 icon] The arguments object

JavaScript functions have a built-in object **~arguments~**.
It has a property **~length~**, just like an array.
Its elements are accessible by index, just like the elements of an array.

![ico-20 warn] However, it is not an array.

^^Therefore, array methods (**~push~**, **~pop~**, etc.) cannot be applied to it^^
^^It can be converted into a regular array using the **~Array.from~** method^^

~~~js
function test () {
  var args = Array.from(arguments)
  ...
}
~~~

The object **~arguments~** contains all the arguments passed to the function when it was called.
They will be accessible by index strictly in the order in which they were passed to the function when it was called.

♦♦♦1♦♦♦

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

The object **~arguments~** has a property **_~callee~_** – a reference to the function being executed (the ‘owner’ function of the object  ~arguments~).

~~~js
function testArguments () {
  console.log(arguments.callee.name)
}

testArguments() // testArguments
~~~

^^^[Example 2]

^^Let’s declare the function **~getArguments~**:^^

~~~js
function getArguments (param) {
  return param ? param : arguments.callee
}
~~~

^^which, if an argument is passed to it, returns the value of that argument; otherwise, it returns a reference to itself.^^

^^Now let’s call this function with and without a parameter:^^

~~~js
var x = getArguments()
var y = getArguments('Привет!')
~~~

^^We have stored the result of calling the function without arguments in the variable  **~ x ~**,^^
^^and the result of calling it with the argument “Hello!” in the variable  **~ y ~**^^

^^Now let’s print the variables **~ x ~** and **~ y ~** to the console^^

^^The variable **~ x ~** contains an exact copy of the function **~getArguments~**^^

^^and the variable **~ y ~** contains the string “Hello!”^^

^^Let’s call the function **~ x ~**:^^

~~~js
x('До свидания!')
~~~

and we’ll get the string ‘Goodbye!’

^^^

^^^[Example 3]

![ico-25 cap] ** 3 **

^^Let’s declare a function that ‘heals itself’, i.e. adds its own properties and methods:^^

~~~js
function setProperty (prop, val) {
  arguments.callee[prop] = val
}
~~~

^^Now let’s make it create a couple of properties for itself:^^

~~~js
setProperty('isActive', false)
setProperty('value', 50)
~~~

^^And, for good measure, let’s make it create a method for itself:^^

~~~js
setProperty('method', function () {
  console.log('А еще я умею вышивать крестиком')
})
~~~

^^Here we pass a function to it as the second argument^^

^^Now let’s check that these properties and the method have appeared in the function  **~setProperty~**^^

^^Let’s print the properties **~isActive~** and **~value~** of the function **~setProperty~** to the console and call its method **~method~**^^

^^^

^^^[Example 4]

![ico-25 cap] ** 4 **

^^Let’s create a function that ‘accumulates’ the results of its own computations^^

^^Let this be a function that calculates the factorial of a number^^

~~~js
var factorial = function (num) {
  var res = 1, n = 1
  while (n <= num) res *= n++
}
~~~

^^Let’s ‘modify’ it as follows:^^

~~~js
var factorial = function (num) {
  if (!arguments.callee.res) arguments.callee.res = []
  var res = 1, n = 1
  while (n <= num) res *= n++
  arguments.callee.res.push(res)
  return res
}
~~~

^^Let’s call it with different argument values and print the value of the **~res~** property to the console:^^

~~~js
factorial(5)
factorial(5)

console.log(factorial.res)
~~~

^^We’ll get an array ~[120, 3628800]~^^

^^^

^^![ico-20 warn] It’s best to look at the next example after studying DOM element events^^

^^^[Example 5]

![ico-25 cap] ** 5 **

^^In this example, anonymous functions are created to handle the **~click~** event of the buttons^^

^^Each function ‘accumulates’ data about the time the button was clicked in the array **~arguments.callee.res~**^^

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

^^Let’s modify this code:^^

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
    console.info(`Интервал между последними кликами: ${func.res}`)
  }
}
~~~

^^What does each button-click handler do now?^^

^^^

_______________________________________________

## ![ico-25 icon] The calling object

In this sense, a function can be compared to ![ico-30 ambulance]
Just like ![ico-20 ambulance], a function can move from one object to another (from where it is called).

In this context, the objects that call the function constitute the **call context**.

The function itself must have the ‘tools’ to carry out its task within the call context.

All these tools, which do not belong to the call context but are exclusively at the function’s disposal, belong to the **execution context**.

So, where will the ![ico-20 ambulance] go? That is the **call context**.
What is inside the ![ico-20 ambulance] is the **execution context**.

^^^[Execution context]

![ico-30 ambulance]

| **properties** ^^(variables)^^ | **methods** ^^(functions)^^ |
| ^^a kit containing instruments, medicines, dressings and various devices (drip stands, a defibrillator, a ventilator, etc.) ^^ | ^^the professional skills of the ambulance crew (they can administer injections, set up an IV drip, use a defibrillator, transfer a patient on a stretcher, etc.)^^ |

^^All of this is carried by the ![ico-20 ambulance]^^

^^^

^^^[Context of the call]

![ico-30 ambulance]

^^• specific conditions (detached house, flat in a block of flats, presence or absence of a lift, running water, etc.)^^
^^• a specific patient with specific symptoms, age, medical history, personality, etc.^^

^^^

## ![ico-25 icon] Call context

The call context is an **object**.

Usually, when a function is called, the name of this object precedes the function name and is separated from it by a full stop:

~~~js
patient.emergency()
~~~

As a rule, if the object name is not specified before the function name, the context of the function call is the global object **~window~**.

^^The exception to this are functions whose call context is set using the ~bind()~ method.^^

![ico-20 warn] It follows from this that all JS functions are methods
If the object (the method’s ‘owner’) is not specified, the global object is implied

_______________________________

^^^[Example 6]

![ico-25 cap] ** 6 **

^^Let’s declare three functions:^^

~~~js
function first () {
  console.log('Function "first" is working now.')
}
function second () {
  console.log('Function "second" is working now.')
}
function third () {
  console.log('Function "third" is working now.')
}
~~~

^^All three functions are declared in the global context; that is, they are methods of the global object **~window~**.^^

^^As we already know, we can access an object’s properties as if they were elements of an associative array.^^

^^Then the construct:^^

~~~js
window['first']
~~~

^^This will return the function **~first~**, which is a property (method) of the global object **~window~**.^^

^^The only thing missing to call this function is the round brackets:^^

~~~js
window['first']()
~~~

^^Using this fact, we can call a function whose name is passed to us in a variable of type “_string_”:^^

~~~js
for (var funcName of ['first', 'second', 'third']) window[funcName]()
~~~

^^^

____________________________

### ![ico-20 icon] Reference to the call context

When an ambulance crew is called out, they receive a reference to the call object.

The crew needs to know where to go, the patient’s symptoms, their age, etc.

Similarly, a function must have access to the object that calls it, and to its properties, which may be necessary for the function to work properly.

Within a function, the keyword **~this~** is a reference to the object in whose context the function is called (i.e. the call context).

![ico-25 cap] For example, for the function ![ico-20 ambulance]

^^![ico-20 green-ok] this.address^^
^^![ico-20 green-ok] this.floor^^
^^![ico-20 green-ok] this.flat^^
^^![ico-20 green-ok] this.patient.name^^
^^![ico-20 green-ok] this.patient.age^^
^^![ico-20 green-ok] this.patient.symptoms^^
...

^^If it weren’t for  **~this~**, the function would hardly be able to help the ‘patient’ ![ico-20 smile].^^

_________________________________________

## ![ico-25 icon] Execution context

![ico-20 warn] Every function call results in the creation of a new execution context.

The execution context is created before the code begins to run.

Each return (**~return~**) exits the execution context.
Until the function has finished executing, its context will remain active.
As functions can call one another, their context is placed on a stack.
![](illustrations/function-object-01.png)
^^(last-in, first-out)^^
The top of this stack will always be the current execution context.

![](illustrations/function-object-02.png)

So what will be in this context?

![ico-20 green-ok] LexicalEnvironment
![ico-20 green-ok] Scope chain
![ico-20 green-ok] ~this~

_____________________________________________

### ![ico-20 icon] Lexical Environment

^^When a function is called, it is activated.^^
^^It needs somewhere safe to ‘store’ the data it will be working with.^^
^^In addition to the arguments it receives when called, it may have its own internal data, which is needed for the temporary storage of intermediate calculation results.^^

When a function is called, an object is created containing all the necessary variables.
In the language specification, this object is called **~LexicalEnvironment~.**

~Lexical Environment~ contains the function’s arguments and all variables declared within the function (including functions).

^^It is therefore also referred to as a _variable object_ or an _activation object_.^^

^^Thus, the activation object can be likened to a locker for storing the function’s ‘personal belongings’.^^

^^![ico-20 warn] It is not possible to access the activation object.^^

______________________________________________

### ![ico-20 icon] hoisting

So, after a function is called:

| ** 1** |   | **The execution context is formed**                      |
|        | • | ^^An activation object ( ~Lexical Environment~ ) is created^^            |
|        | • | ^^The scope is defined^^                                 |
|        | • | ^^The value **~this~** is set^^                           |
| ** 2** |   | **The code is interpreted and executed**                 |

![ico-20 warn] Please note that all internal variables and nested functions are declared before the code begins to execute, regardless of the order in which they appear in the code.
![ico-20 warn] However, variables are assigned values when the code begins to execute.
This leads to the **hoisting** of variable and function declarations.

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

^^Although the variable declarations **_~ x~_** and **_~ y~_** appear in the code after the ~return~ statement, when the execution context is formed in the first stage, an activation object (Lexical Environment) will be created, and all variables declared within the function will be included in this object.^^

^^Thus, the declaration of the variables **_~ x~_** and **_~ y~_** will be ‘hoisted’ (it will take place before the function’s code begins to execute).^^

^^However, value assignment takes place during the second phase, and the code will be executed sequentially, that is, at the time the code is executed.^^

~~~js
console.log(x)
~~~

^^The value of the variable **_~ x~_** will not yet have been determined, so the console will display ~undefined~.^^

^^Similarly, at the time the code is executed^^

~~~js
y = x + 5
~~~

^^the value of the variable  **_~ x~_**  will be  ~undefined~, so the result of the assignment operation will be  **~NaN~**,  which is what the code will output to the console.^^

~~~js
console.log(y)
~~~

^^After that, the code will be executed^^

~~~js
x = 5, y = 10
~~~

^^The variables **_~ x~_** and **_~ y~_** will be assigned values.^^

^^Therefore, the function will return the value **25**.^^

^^Value assignment^^

~~~js
x = 1, y = 1
~~~

^^will not take place, as the execution context will be exited before this code is reached.^^

^^^

^^^[Example 8]

![ico-25 cap] ** 8**

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

^^In this case, the declaration of the function  **~treg~**  will be included in the _Lexical Environment_ of the function  **~delegat~** during the creation of its execution context, and will not affect the variable  **~treg~**,  which is declared in the global context.^^

^^These will be different variables,  even though their identifiers are the same.^^

^^Therefore,  the console will ultimately display ** 5**.^^

^^^

________________________________

### ![ico-20 icon] Scope

Scope (**~scope~**) limits the scope of variable and function identifiers.

^^^[scope]

^^Imagine two people called Sasha: 👨‍💼 a lad and 🙎 a girl^^

^^There are two rooms, ^^
^^and the lad Sasha  👨‍💼 is in the first room, ^^
^^whilst the girl Sasha 🙎 is in the second^^

^^There is an observer in each room^^

^^If we ask the observer in the first room: ^^
^^_“Who is Sasha?”_, ^^
^^they will reply: _“A lad”_ 👨‍💼^^

^^Let’s ask a similar question to an observer in the second room, ^^
^^and we’ll get the answer: _“The girl”_ 🙎^^

^^This is because each room has its own scope^^

_________________________________

^^However, the scope of nested functions will be slightly different^^

^^Let’s imagine that nested functions are boxes with tinted glass walls^^
^^Our box-like functions are nested one inside the other, like matryoshka dolls: ^^
^^the second box is inside the first,^^
^^the third is inside the second, and so on...^^

^^An observer in box 2 will see not only the contents of box 2, ^^
^^but also the contents of box 1 ^^
^^and the room in which all the boxes are located^^

^^but they cannot see the contents of box 3, ^^
^^although the observer in box 3 can see it perfectly well... ^^
^^as can the observers in all the other boxes ^^
^^and in the room^^

____________________________

^^Thus, if there is a reference to a variable inside a function, the function will first look for that variable in its own ‘locker’, and if it cannot find it, it will not hesitate to ‘borrow’ that variable from the external locker in which it is located^^

___________________________

^^![ico-20 warn] All the ‘lockers’ belonging to others that are accessible to it constitute ![ico-20 pin] **_a chain of scopes_** of the function, which forms part of its ![ico-20 pin] **execution context**.^^

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

^^The variable **~sample~** is declared in the global scope, in which the function **~changeSample~** is also declared.^^

^^When the variable **~sample~** is declared, it is assigned the value 1.^^

^^Since within the function **~sample~** there is no declaration of the variable **~changeSample~**, this variable is not included in the activation object (“locker”) of the function **~changeSample~** when the execution context of **~changeSample~** is formed.^^

^^Then, when the assignment is executed^^

~~~js
sample = 10
~~~

^^the following occurs:^^

^^The function **~changeSample~**, having found no such variable in its own ‘locker’, looks to the outer ‘locker’, where such a variable does exist, and it is this variable that will be assigned the value 10.^^

^^Thus, for each execution context, there is a distinct  visibility chain.^^

^^The scope chain includes the scopes of all previous contexts on the stack.^^

^^^

^^^[Example 10]

![ico-25 cap] **10**

~~~js
var sample = 1

function showSample () {
  console.info('We are in the execution context of the function "showSample"')
  console.info(`sample === ${sample}`)

  return

  function sample () {}
}

showSample()

console.info('We left the execution context of the function "showSample"')
console.info(`Now sample === ${sample}`)
~~~

**Output to the console:**

~~~console
We are in the execution context of the function "showSample"
sample === function sample () {}
We left the execution context of the function "showSample"
Now sample === 1
~~~

^^This example demonstrates how the **hoisting** mechanism works.^^
^^The variable **~sample~** is declared in the global scope and assigned the value 1.^^
^^Inside the body of the function **~showSample~**, after the return statement, the function **~sample~** is declared.^^
^^At first glance, when the code is executed sequentially, this declaration should not take effect, as the ~return~ statement appears earlier.^^
^^However, all declarations are collected into an activation object before the code begins to execute.^^
^^Therefore, by the time the code for the function **~showSample~** begins to execute, the function **~sample~** will already have been declared and will be safely located within ~Lexical Environment~ of the function **~showSample~**.^^
^^As a result, variable and function declarations are ‘promoted’ to the ‘parent’ scope (in our case, the ‘parent’ is the function **~showSample~**).^^
^^You can verify this by printing the variable **~sample~** to the console.^^
^^Once the code of the function **~showSample~** has finished executing, its context will be ‘unmounted’, and the global context—in which the variable **~sample~** has the value 1—will become active again.^^

^^^

^^^[Example 11]

![ico-25 cap] **11**

~~~js
var sample = 1

function showSample () {
  console.info('We are in the execution context of the function "showSample"')
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

^^Here, too, the declaration of the function **~sample()~** is brought up.^^
^^However, the function  **~sample()~**  overrides the value of the variable  **~sample~**.^^
^^In the context of the execution of the function  **~showSample~**, at the moment the variable **~sample~** is assigned the value 5, there is no other declared variable **~sample~** apart from the function  **~sample()~** itself.^^
^^Thus, before the function  **~sample()~** is called, the function will be printed to the console.^^
^^After the function  **~sample()~** is called, the new value (5) of the variable **~sample~** will be printed to the console.^^
^^After that, the variable **~sample~** will be assigned a new value and the result (10) will be displayed in the console.^^
^^When the function **~showSample~** finishes executing and its context is ‘unmounted’, the global context will become active, in which the variable **~sample~** has the value 1.^^

^^In this example, the function **~sample()~** has redefined itself (it was a “function”, and has become a “number”).^^

^^^

____________________________________

### ![ico-20 icon] The scope chain

So, a function may use variables that are not present in its ~LexicalEnvironment~.

^^These are external and are in a different context.^^
^^But they are accessible to the function.^^
^^The function ‘sees’ them, so they are within its _scope_.^^

^^When a variable or function is referenced within a function, the engine will first look for that variable in the function’s ~LexicalEnvironment~; if it is not found there, the search will continue along the scope chain.^^

^^If the variable (or function) is not found, an exception ![ico-20 err] ~ReferenceError~ will be generated.^^

_______________________________________

### ![ico-20 icon] this

**~this~** is another component of the function’s execution context.

**~this~** is a reference to the context in which the function was called.

![](images/reference-is-a-lockpick.svg)

Using the keyword **~this~**, a function (or method) can access the properties of the object in whose context the function was called.

_______________________________

![ico-25 cap] **12**

~~~js
function func () {
  console.log(this)
}
~~~

When the function **~func()~** is called, the object ~window~ will be printed to the console.
Inside the function **~func()~**, ~this~ refers to the object ~window~.

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

If, however, the function is a method of an object, then its call context will be that object.

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

Now let’s look at a function as an object.

~~~js
function say () {
  console.log('function say: this: ', this)
}

function girl () {
  console.log('function girl: this: ', this)
}
~~~

Let’s add the property **~say~** to the function **~girl~** and call the function ~girl~ and its property ~say~:

~~~js
girl.say = say
girl.say()     //  girl
girl()         // window
~~~

________________________________________

## ![ico-25 icon] prototype

• A function as an **_object_** cannot be called using the method ~console.log~
• For this purpose, you should use the method **~console.dir~**

~~~js
function sample () {}

console.dir(sample)
~~~

In the console, we’ll see the following output:
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

![ico-25 warn] Note the property **_~prototype~_**, which is **only present in functions**.
![](images/function-balls.svg)
![ico-20 pin] The **_~prototype~_** property of functions is an object.
![ico-20 pin] This object has a **~constructor~** property.
![ico-20 pin] The property **~constructor~** is a reference to the function **_~sample()~_** itself.

Thus, the function is, by its very nature, a constructor, as is explicitly stated in its property **_~prototype~_**.

_____________________

Please also note the property **~&#95;&#95;proto&#95;&#95;~**, which we will examine further
![ico-20 pin] this is a **reference** to the object from which the function inherited its properties and methods
![ico-20 pin] Every function is created by the built-in native object (constructor) **Function**
^^(which indicates that a function is an **object**).^^
![ico-20 pin] The **~constructor~** property in **~&#95;&#95;proto&#95;&#95;~** is a reference to **Function**.

^^~[[FunctionLocation]]~ and ~[[Scopes]]~ are added by Chrome DevTools for debugging purposes^^

___________________________________

## [![ico-30 hw] Exercises](test/functionObject)

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/js/js_scope.asp)
