# ![ico-30 study] Стрелочные функции

**ES6**

## ![ico-25 icon] Синтаксис

![ico-20 error] **_function_**

В сигнатуре стрелочной функции нет слова **_function_**:

~~~js
(параметры) => { тело функции }
~~~

Отсюда логичным образом вытекает, что при объявлении стрелочной функции всегда используется **function expression**:

~~~js
const multiply = (x, y) => x * y
multiply(2, 5)  // 10
~~~

______________________

![ico-20 green-ok] Если тело функции состоит из одной операции, фигурные скобки можно опустить:

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] Если у функции всего один формальный параметр, круглые скобки можно опустить:

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] При отсутствии формальных параметров круглые скобки обязательны:

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

![ico-20 green-ok] Стрелка **~=>~** в стрелочной функции является оператором **~return~**. Поэтому при отсутствии фигурных скобок, если тело функции состоит из одного выражения, значение которого возвращает функция, оператор **~return~** не используется:

~~~js
// обычная функция
const multiply = function (x, y) { return x * y }

// стрелочная функция
const multiply = (x, y) => x * y
~~~

![ico-20 green-ok] Операторы ветвления кода (кроме тернарного оператора) и операторы цикла нужно заключать в фигурные скобки.

◘◘![ico-25 cap] оператор _for_◘◘

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

И тут мы можем убедиться в преимуществах итерирующих методов массивов:

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

◘◘![ico-25 cap] оператор _switch_◘◘

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

◘◘![ico-25 cap] тернарный оператор◘◘

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

Или так, если использовать замыкание:

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

Или так, если использовать прием каррирования:

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

____________________________________________________

## ![ico-25 icon] Главные особенности стрелочных функций

### ![ico-20 icon] prototype

@@@@
У стрелочных функций нет объекта  **~prototype~**.<br><br>![ico-20 warn] Поэтому стрелочные функции не могут быть конструктором.
![](images/arrow-funcs-neutered-kitties.png)
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

У стрелочных функций нет объекта  **~arguments~**.

При попытке обратиться к объекту **~arguments~** из стрелочной функции будет сгенерировано исключение (~ReferenceError~).

~~~error
    ► ReferenceError: arguments is not defined
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

### ![ico-20 icon] Контекст вызова

У стрелочных функций контекст вызова всегда будет контекстом, в котором функция была объявлена.

Изменить контекст вызова стрелочной функции невозможно.

Можно сказать, что у стрелочных функций "врожденный" контекст вызова.

#### ![ico-20 icon] Литерал объекта

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

Разберемся детальнее, что происходит.

Прежде, чем выполнить присваивание значения переменной **~human~**, движок должен вычислить значение выражения в правой части оператора присваивания.
В правой части находится литерал объекта.
1. Движок вызывает конструктор **~Object~**.
2. Конструктор **~Object~** создает пустой объект и возвращает ссылку на него.
3. Движок, получив ссылку на объект, помещает эту ссылку в переменную **~human~** и выполняет три присваивания:

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

Отметим, что все три присваивания происходят в глобальной области видимости, т.е. в контексте глобального объекта **~window~**.

И вот тут мы видим, как работает передача контекста в процессе присваивания:

![ico-20 pin] если в правой части оператора присваивания находится **обычная функция**, то она получает ссылку на контекст вызова, определяемую в **левой части** оператора присваивания (в нашем примере это объект **~human~**);
![ico-20 pin] если в правой части оператора присваивания находится **стрелочная функция**, то она получает контекст "**правой части**", т.е. того объекта, в контексте которого происходит присваивание (в нашем примере это глобальный объект **~window~**).

По приколу я называю это "правилом буравчика" ![ico-25 smile]

----------------
#### ![ico-20 icon] Конструктор

Теперь вспомним, как работает конструктор.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

Когда мы вызываем функцию **~Sample~** с ключевым словом **~new~**:

~~~js
const user = new Sample('Piter')
~~~

то движок осуществляет следующую последовательность шагов:

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

#### ![ico-20 icon] Фабрика

Теперь посмотрим, что присходит в случае, когда вместо конструктора мы используем фабрику:
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

Функция **~fabric~** вызывается в контексте объекта **~template~**.

Согласно нашему "правилу буравчика" ![ico-20 smile], метод **~showName~** получит "врожденный" контекст вызова - ссылку на объект **~template~**.

Проверим:

~~~js
user.showName()  // Robert
~~~
____________________________________________________

**Вывод**.

В случае, если экземпляр объекта создан с помощью конструктора,
использование стрелочных функций в публичных методах объекта гарантирует,
что **~this~** будет всегда ссылаться на экземпляр.

В противном случае использование стрелочной функции создаст вам кучу проблем с контекстом вызова метода.

_____________________________________________________

## ![ico-20 icon] Примеры

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

[![ico-30 hw] Тесты](quiz/arrowFunctions)
