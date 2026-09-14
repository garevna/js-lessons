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

◘◘![ico-25 cap] оператор **~switch~**◘◘

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
У стрелочных функций нет объекта  **~prototype~**.<br><br>![ico-20 warn] Поэтому стрелочные функции не могут быть конструктором.
![](images/arrow-funcs-neutered-kitties.svg)
@@@@

☼☼☼ стрелочные фукции - это кастрированные котики ☼☼☼

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

![ico-20 warn] При попытке вызвать стрелочную функцию с ключевым словом **~new~**:

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

будет сгенерировано исключение:

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

У стрелочных функций нет объекта  **~arguments~**.

При попытке обратиться к объекту **~arguments~** из стрелочной функции будет сгенерировано исключение (~ReferenceError~).

~~~error
    ReferenceError: arguments is not defined
~~~

![ico-20 pin] Если стрелочная функция объявлена внутри обычной функции,
то переменные контекста родительской функции будут доступны для стрелочной функции
(**~цепочка областей видимости~**),
поэтому внутри нее будет доступен объект ~arguments~ родительской функции.

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

В результате работы кода в консоль будет выведен объект ~arguments~ функции **_testArguments_**:

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

Можно сказать, что у стрелочных функций "врожденный" контекст вызова.

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

И вот тут мы видим, как работает передача контекста в процессе присваивания:

![ico-20 pin] если в правой части оператора присваивания находится **обычная функция**, то она получает ссылку на контекст вызова, определяемую в **левой части** оператора присваивания (в нашем примере это объект **~human~**);
![ico-20 pin] если в правой части оператора присваивания находится **стрелочная функция**, то она получает контекст "**правой части**", т.е. того объекта, в контексте которого происходит присваивание (в нашем примере это глобальный объект **~window~**).

По приколу я называю это "правилом буравчика" ![ico-25 smile]

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

1. Вызывает конструктор **~Object~**.
2. Конструктор **~Object~** создает пустой объект и возвращает ссылку на него.
3. Движок помещает полученную ссылку в переменную **~user~**.
~~~js
const user = new Object()
~~~
3. Движок добавляет в этот объект ссылку на свойство **~prototype~** функции **~Sample~**.
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
4. Движок вызывает функцию **~Sample~** в контексте объекта **~user~**.
~~~js
Sample.call(user, 'Piter')
~~~

Т.е. к моменту, когда код функции **~Sample~** будет запущен на исполнение, контекст ее вызова будет создан (**~user~**), и это будет **экземпляр**.
Чей экземпляр?
Движок уже добавил этому экземпляру ссылку на **~prototype~** функции **~Sample~**.
А в объекте **~prototype~** функции есть свойство **~constructor~**, содержащее ссылку на эту функцию.
Т.е. экземпляр уже имеет ссылку на конструктор **~Sample~**:

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~
и теперь он распознается как экземпляр конструктора **~Sample~**:
~~~js
console.log(user instanceof Sample)  // true
~~~

Что главное мы отсюда выносим:

Функция **~Sample~** будет работать в контексте создаваемого экземпляра, т.е. в контексте объекта **~user~**.

Тогда присваивание:

~~~js
this.showName = () => console.log(this.name)
~~~

будет происходить в контексте экземпляра **~user~**.
Это означает, что стрелочная функция в правой части оператора присваивания получит контекст объекта **~user~**.

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

1. The engine calls the **~Object~** constructor.

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

## ![ico-20 icon] Constructor

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
