# ![ico-30 study] Arrow functions

**ES6**

## ![ico-25 icon] Syntax

![ico-20 error] **_function_**

In the signature of an arrow function, there's no word **_function_**:

~~~js
(parameters) => { function body }
~~~

Hence, it follows logically that **_function expression_** is always used when declaring an arrow function:

~~~js
const multiply = (x, y) => x * y
multiply(2, 5)  // 10
~~~

______________________

![ico-20 green-ok] If the body of the function consists of just one operation, you can skip the curly braces.

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] If a function has only one formal parameter, you can omit the parentheses:

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] In the absence of formal parameters, parentheses are mandatory:

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

![ico-20 green-ok] In an arrow function, the arrow **~=>~** serves as the return operator.
So, if there are no curly braces and the function body consists of just one expression,
the value of that expression is returned without needing to use the **~return~** operator.

~~~js
// regular function
const multiply = function (x, y) { return x * y }

// arrow function
const multiply = (x, y) => x * y
~~~

![ico-20 green-ok] Branching code operators (except for the ternary operator) and loop operators should be enclosed in curly braces.

◘◘![ico-25 cap] operator **~for~**◘◘

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

And here we can see the advantages of array iterating methods:

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

◘◘![ico-25 cap] оператор **~switch~**◘◘

~~~js
const getAnswer = question => {
  switch (question) {
    case 'who':
      return 'student'
    case 'what':
      return 'develop'
    case 'where':
      return 'Kharkiv'
    default:
      return 'I don\'t undestand your question.'
  }
}
~~~

◘◘![ico-25 cap] ternary operator◘◘

~~~js
const getAnswer = question => question === 'who'
  ? 'Irina'
  : question === 'what'
    ? 'develop'
    : question === 'where'
      ? 'Kharkiv'
      : 'I don\'t undestand your question'
~~~

Or like this:

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

Or so if using a closure:

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

Or so if using a currying technique:

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

____________________________________________________

## ![ico-25 icon] Key features of arrow functions

### ![ico-20 icon] prototype

@@@@
Arrow functions don't have a **~prototype~** object.<br><br>![ico-20 warn] Therefore, arrow functions cannot be constructors.
![](images/arrow-funcs-neutered-kitties.png)
@@@@

☼☼☼ arrow functions are neutered kitties ☼☼☼

~~~js
console.dir(() => {})
~~~

~~~console
▼ ƒ anonymous ()
    length: 0
    name: ""
    arguments: (...)
    caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

~~~js
console.dir(function () {})
~~~

~~~console
▼ ƒ console ()
    arguments: null
    caller: null
    length: 0
    name: ""
  ► prototype: {}
  ► [[Prototype]]: ƒ ()
~~~

![ico-20 warn] When trying to call an arrow function with the **~new~** keyword:

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

an exception will be generated:

~~~error
    ► TypeError: arrowFunc is not a constructor
~~~

~~~js
const obj = new (function () {})

console.log(obj)  // ► {}
~~~

~~~js
const obj = new (() => {})
~~~

~~~error
    ► TypeError: (intermediate value) is not a constructor
~~~

______________________________________________________

### ![ico-25 icon] arguments

Arrow functions don't have an **~arguments~** object.
An exception (~ReferenceError~) will be thrown when trying to access the **~arguments~** object from an arrow function.

~~~error
    ► ReferenceError: arguments is not defined
~~~

![ico-20 pin] If an arrow function is declared inside a regular function,
the context variables of the parent function will be available to the arrow function
(**~scope chain~**),
so the **~arguments~** object of the parent function will be accessible inside it.

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

As a result of running the code, the ~arguments~ object of the **~testArguments~** function will be printed to the console:

~~~console
▼ Arguments(2) [5, false, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    0: 5
    1: false
  ► callee: ƒ testArguments()
    length: 2
  ► Symbol(Symbol.iterator): ƒ values()
  ► [[Prototype]]: Object
~~~

______________________________________________________

### ![ico-20 icon] Call context

![ico-20 warn] For arrow functions, the call context will always be the context in which the function was declared.

![ico-20 warn] It is not possible to change the call context of arrow function.

It can be said that arrow functions have an "innate" call context.

#### ![ico-20 icon] Object literal

~~~js
window.name = 'Chrome'

const human = {
  name: 'Stephan',
  getName () {
    console.log(this.name)
  },
  showName: () => console.log(this.name)
}

human.getName()   // Stephan
human.showName()  // Chrome
~~~

Let's take a closer look at what is happening.

Before assigning a value to the **~human~** variable, the engine must calculate the value of the expression on the right side of the assignment operator.
On the right side is the literal of the object.
___________________
1. The engine calls the **~Object~** constructor.
2. The **~Object~** constructor creates an empty instance and returns a reference to it.
3. The engine, having received a reference to an instance, places this reference in the **~human~** variable and performs three assignments:
~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~
Note that all three assignments occur in the **global scope**, i.e. in the context of the global **~window~** object.
___________________

And here's where we see how context transfer happens in the assignment process:

![ico-20 pin] if there is an **ordinary function** in the right part of the assignment operator, this function receives a reference to the calling context defined in the **left part** of the assignment operator (in our example it is a **~human~** instance);
![ico-20 pin] if there is an **arrow function** in the right part of the assignment operator, it receives the context of the ‘**right part**’, i.e. the object in the context of which the assignment takes place (in our example it is the global object **~window~**).

For fun, I call it the ‘drill rule’ ![ico-25 smile]

----------------
#### ![ico-20 icon] Constructor

Now let's remember how the constructor works.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

When we call the **~Sample~** function with the keyword **~new~**:

~~~js
const user = new Sample('Piter')
~~~

then the engine performs the following sequence of steps:

1. Calls the constructor **~Object~**.
2. The **~Object~** constructor creates an empty instance and returns a reference to it.
3. The engine places the resulting reference into the **~user~** variable.
~~~js
const user = new Object()
~~~
3. The engine adds a reference to the **~prototype~** property of the **~Sample~** function to this instance.
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
4. The engine calls the **~Sample~** function in the context of the **~user~** instance.
~~~js
Sample.call(user, 'Piter')
~~~

That is, by the time the code of the **~Sample~** function is run for execution, the context of its call will have been created (the instance **~user~**).
Whose instance will the **~user~** be?
The engine has already added to this instance a reference to the **~prototype~** of the **~Sample~** function.
And the **~prototype~** object of the function has a **~constructor~** property containing a reference to that function.
That is, the instance **~user~** already has a reference to the function **~Sample~** as it's constructor:

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~

and now it is recognised as an instance of the constructor **~Sample~**:

~~~js
console.log(user instanceof Sample)  // true
~~~

What is the main thing we can learn from here:

The **~Sample~** function will work in the context of the instance being created, i.e. in the context of the **~user~** object.

Then the assignment:

~~~js
this.showName = () => console.log(this.name)
~~~

will take place in the context of the **~user~** instance.
This means that the arrow function on the right side of the assignment statement will get the context of the **~user~** object.

__________________________________

#### ![ico-20 icon] Factory

Now let's see what happens when we use a factory instead of a constructor:

~~~js
const template = {
  name: 'Robert'
}

function fabric (instance, name) {
  instance.name = name
  instance.getName = function () {
    console.log(this.name)
  }
  instance.showName = () => console.log(this.name)
  return instance
}

const user = fabric.call(template, {}, 'Piter')
~~~

Function **~fabric~** is called in the context of a **~template~** object.

According to our "drill rule" ![ico-20 smile], **~showName~** method will get an "innate" call context - a reference to the **~template~** object.

Let's check this:

~~~js
user.showName()  // Robert
~~~
____________________________________________________

**Conclusion**.

If an instance is created using a constructor,
the use of arrow functions in the public methods of the instance guarantees
that **~this~** will always refer to the instance.

Otherwise, using the arrow function will give you a lot of problems with the context of the method call.

_____________________________________________________

## ![ico-20 icon] Examples

◘◘![ico-25 cap] ** 1**◘◘
~~~js
function Sample (name, age) {
  const userName = name
  const userAge = age
  this.getName = this.createMethod(userName)
  this.getAge = this.createMethod(userAge)
}

Sample.prototype.createMethod = param => () => console.log(param)

const user = new Sample('Piter', 28)
~~~

________________________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const test = ((data = []) => arg => {
  arg && data.push(arg)
  return arg ? test :  data
})()

test(1)
test(2)
test(3)

console.log(test()) // [1, 2, 3]

test(4)(5)(7)(8)

console.log(test()) // [1, 2, 3, 4, 5, 7, 8]
~~~

________________________________________

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const getUser = (getName = prompt.bind(null, 'User name'), getAge = prompt.bind(null, 'User age')) => ({
  name: getName(),
  age: getAge()
})
~~~

________________________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~js
(func => Object.assign({
  name: func('Your name'),
  hobby: func('Your hobby')
}))(message => prompt(message))
~~~

____________________________________________________________________

[![ico-30 hw] Quiz](quiz/arrowFunctions)
