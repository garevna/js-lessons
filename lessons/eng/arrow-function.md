# ![ico-30 study] Arrow functions

**ES6**

## ![ico-25 icon] Syntax

![ico-20 error] **_function_**

In the signature of an arrow function, there's no word **_function_**:

~~~js
(параметры) => { тело функции }
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

~~~js
// обычная функция
const multiply = function (x, y) { return x * y }

// стрелочная функция
const multiply = (x, y) => x * y
~~~

So, if there are no curly braces and the function body consists of just one expression,

the value of that expression is returned without needing to use the **~return~** operator.

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

![ico-20 green-ok] Branching code operators (except for the ternary operator) and loop operators should be enclosed in curly braces.

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

◘◘![ico-25 cap] operator **~for~**◘◘

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

And here we can see the advantages of array iterating methods:

~~~js
const getAnswer = question => question === 'who'
  ? 'Irina'
  : question === 'what'
    ? 'develop'
    : question === 'where'
      ? 'Kharkiv'
      : 'I don\'t undestand your question'
~~~

Или так:

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

◘◘![ico-25 cap] ternary operator◘◘

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

Or like this:

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
Arrow functions do not have an object **~prototype~**.<br><br>![ico-20 warn] Therefore, arrow functions cannot be constructors.
![](images/arrow-funcs-neutered-kitties.svg)
@@@@

☼☼☼ Arrow functions are neutered cats ☼☼☼

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

![ico-20 warn] When attempting to call an arrow function with the keyword **~new~**:

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

An exception will be thrown:

~~~error
    TypeError: arrowFunc is not a constructor
~~~

~~~js
const obj = new (function () {})

console.log(obj)  // ► {}
~~~

~~~js
const obj = new (() => {})
~~~

~~~error
    TypeError: (intermediate value) is not a constructor
~~~

______________________________________________________

### ![ico-25 icon] arguments

Arrow functions do not have an object **~arguments~**.

Attempting to access the object **~arguments~** from within an arrow function will raise an exception (~ReferenceError~).

~~~error
    ReferenceError: arguments is not defined
~~~

![ico-20 pin] If an arrow function is declared inside a regular function,
then the context variables of the parent function will be accessible to the arrow function
(**~цепочка областей видимости~**),
so the ~arguments~ object of the parent function will be accessible within it.

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

As a result of the code running, the object ~arguments~ of the function **_testArguments_** will be printed to the console:

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

### ![ico-20 icon] prototype

Arrow functions don't have a **~prototype~** object.<br><br>![ico-20 warn] Therefore, arrow functions cannot be constructors.

an exception will be generated:

It can be said that arrow functions have an ‘inherent’ call context.

#### ![ico-20 icon] arguments

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

Arrow functions don't have an **~arguments~** object.

An exception (~ReferenceError~) will be thrown when trying to access the **~arguments~** object from an arrow function.
![ico-20 pin] If an arrow function is declared inside a regular function,
the context variables of the parent function will be available to the arrow function
(**~scope chain~**),
so the **~arguments~** object of the parent function will be accessible inside it.

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

As a result of running the code, the ~arguments~ object of the **~testArguments~** function will be printed to the console:

And here we can see how context passing works during assignment:

![ico-20 pin] if there is a **regular function** on the right-hand side of the assignment statement, it receives a reference to the call context defined on the **left-hand side** of the assignment statement (in our example, this is the object **~human~**);
![ico-20 pin] if the right-hand side of the assignment statement contains an **arrow function**, it receives the context of the “**right-hand side**”, i.e. the object in whose context the assignment takes place (in our example, this is the global object **~window~**).

Just for fun, I call this the ‘drill rule’ ![ico-25 smile]

----------------
#### ![ico-20 icon] Call context

![ico-20 warn] For arrow functions, the call context will always be the context in which the function was declared.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

![ico-20 warn] It is not possible to change the call context of arrow function.

~~~js
const user = new Sample('Piter')
~~~

It can be said that arrow functions have an "innate" call context.

1. Calls the constructor **~Object~**.
2. The constructor **~Object~** creates an empty object and returns a reference to it.
3. The engine stores the returned reference in the variable **~user~**.
~~~js
const user = new Object()
~~~
3. The engine adds a reference to the **~prototype~** property of the **~Sample~** function to this object.
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
4. The engine calls the **~Sample~** function within the context of the **~user~** object.
~~~js
Sample.call(user, 'Piter')
~~~

In other words, by the time the code of the function **~Sample~** is executed, its call context will have been created (**~user~**), and this will be an **instance**.
Whose instance?
The engine has already added a reference to **~prototype~** of the function **~Sample~** to this instance.
And the object **~prototype~** of the function has a property **~constructor~** containing a reference to this function.
In other words, the instance already has a reference to the constructor **~Sample~**:

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~
and is now recognised as an instance of the constructor **~Sample~**:
~~~js
console.log(user instanceof Sample)  // true
~~~

The key point to take away from this is:

The function **~Sample~** will operate in the context of the instance being created, i.e. in the context of the object **~user~**.

Therefore, the assignment:

~~~js
this.showName = () => console.log(this.name)
~~~

will take place in the context of the instance **~user~**.
This means that the arrow function on the right-hand side of the assignment statement will inherit the context of the object **~user~**.

__________________________________

#### ![ico-20 icon] Object literal

Let's take a closer look at what is happening.
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

Before assigning a value to the **~human~** variable, the engine must calculate the value of the expression on the right side of the assignment operator.

On the right side is the literal of the object.

Let’s check:

~~~js
user.showName()  // Robert
~~~
____________________________________________________

2. The **~Object~** constructor creates an empty instance and returns a reference to it.

3. The engine, having received a reference to an instance, places this reference in the **~human~** variable and performs three assignments:
Note that all three assignments occur in the **global scope**, i.e. in the context of the global **~window~** object.
And here's where we see how context transfer happens in the assignment process:

![ico-20 pin] if there is an **ordinary function** in the right part of the assignment operator, this function receives a reference to the calling context defined in the **left part** of the assignment operator (in our example it is a **~human~** instance);

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

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const getUser = (getName = prompt.bind(null, 'User name'), getAge = prompt.bind(null, 'User age')) => ({
  name: getName(),
  age: getAge()
})
~~~

◘◘![ico-25 cap] ** 4**◘◘

~~~js
(func => Object.assign({
  name: func('Your name'),
  hobby: func('Your hobby')
}))(message => prompt(message))
~~~

____________________________________________________________________

Now let's remember how the constructor works.
