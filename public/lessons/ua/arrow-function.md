# ![ico-30 study] Стрілкові функції

**ES6**

## ![ico-25 icon] Синтаксис

![ico-20 error] **_function_**

У сигнатурі стрілкової функції немає слова **~function~**

~~~js
(параметры) => { тело функции }
~~~

Звідси логічно випливає, що при оголошенні стрілочної функції завжди використовується **function expression**:

~~~js
const multiply = (x, y) => x * y
multiply(2, 5)  // 10
~~~

______________________

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] Якщо тіло функції складається з однієї операції, фігурні дужки можна опустити:

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] Якщо функція має тільки один формальний параметр, дужки можна опустити:

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

![ico-20 green-ok] При відсутності формальних параметрів круглі дужки обов'язкові:

~~~js
// обычная функция
const multiply = function (x, y) { return x * y }

// стрелочная функция
const multiply = (x, y) => x * y
~~~

![ico-20 green-ok] Стрілка **~=>~** у стрілочній функції є оператором **~return~**. Тому за відсутності фігурних дужок, якщо тіло функції складається з одного виразу, значення якого повертає функція, оператор **~return~** не використовується:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

![ico-20 green-ok] Оператори гілкування коду (окрім тернарного оператора) та оператори циклу потрібно брати в фігурні дужки.

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

◘◘![ico-25 cap] оператор _for_◘◘

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

І тут ми можемо переконатися в перевагах ітеруючих методів масивів:

~~~js
const getAnswer = question => question === 'who'
  ? 'Irina'
  : question === 'what'
    ? 'develop'
    : question === 'where'
      ? 'Kharkiv'
      : 'I don\'t undestand your question'
~~~

◘◘![ico-25 cap] оператор _switch_◘◘

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

◘◘![ico-25 cap] тернарний оператор◘◘

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

Або так:

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

____________________________________________________

## ![ico-25 icon] Головні особливості стрілкових функцій

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

<br><br>У стрілочних функцій немає об'єкта **~prototype~**.<br><br>![ico-20 warn] Тому стрілочні функції не можуть бути конструктором.

![ico-20 warn] При спробі викликати стрілкову функцію з ключовим словом **~new~**

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

У стрілкових функцій немає об'єкта  **~arguments~**.

При спробі звернутися до об'єкта **~arguments~** з стрілочної функції буде згенеровано виключення ~ReferenceError~.
![ico-20 pin] Якщо стрілочна функція оголошена всередині звичайної функції,
то змінні контексту батьківської функції будуть доступні для стрілочної функції
(**~ланцюг областей видимості~**),
тому всередині неї буде доступний об'єкт **arguments** батьківської функції.

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

◘◘![ico-25 cap] ** 8**◘◘

В результаті роботи коду в консоль буде виведено об'єкт **arguments** функції **_testArguments_**:

![ico-20 pin] если в правой части оператора присваивания находится **обычная функция**, то она получает ссылку на контекст вызова, определяемую в **левой части** оператора присваивания (в нашем примере это объект **~human~**);
![ico-20 pin] если в правой части оператора присваивания находится **стрелочная функция**, то она получает контекст "**правой части**", т.е. того объекта, в контексте которого происходит присваивание (в нашем примере это глобальный объект **~window~**).

По приколу я называю это "правилом буравчика" ![ico-25 smile]

----------------
#### ![ico-20 icon] Контекст виклику

У стрілкових функціях контекст виклику завжди буде контекстом, у якому функцію оголошено.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

Змінити контекст виклику стрілкової функції неможливо.

~~~js
const user = new Sample('Piter')
~~~

Можна сказати, що у стрілкових функцій є "вроджений" контекст виклику.

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

#### ![ico-20 icon] Літерал об'єкта

Давай розберем детальніше, що відбувається.
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

Перед тим, як виконати присвоєння значення змінній **~human~**, двигун має обчислити значення виразу в правій частині оператора присвоєння.

У правій частині знаходиться літерал об'єкта.

1. Двигун викликає конструктор **~Object~**.

~~~js
user.showName()  // Robert
~~~
____________________________________________________

2. Конструктор **~Object~** створює порожній об'єкт і повертає посилання на нього.

3. Двигун, отримавши посилання на об'єкт, поміщає це посилання в змінну **~human~** і виконує три присвоєння:
Варто зазначити, що всі три присвоєння відбуваються в глобальній області видимості, тобто в контексті глобального об'єкта **~window~**.
І ось тут ми бачимо, як працює передача контексту в процесі присвоєння:

![ico-20 pin] якщо в правій частині оператора присвоєння знаходиться **звичайна функція**, то вона отримує посилання на контекст виклику, визначений в **лівій частині** оператора присвоєння (в нашому прикладі це об'єкт **~human~**);

_____________________________________________________

## ![ico-20 icon] Конструктор

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

Тепер згадаємо, як працює конструктор.
