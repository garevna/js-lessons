# ![ico-30 study] Стрілкові функції

**ES6**

## ![ico-25 icon] Синтаксис

![ico-20 error] **~function~**

У сигнатурі стрілкової функції немає слова **~function~**

~~~js
(параметри) => { тело функції }
~~~

Звідси логічно випливає, що при оголошенні стрілочної функції завжди використовується **function expression**:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const multiply = (x, y) => x * y
multiply(2, 5) // 10
~~~

______________________

![ico-20 green-ok] Якщо тіло функції складається з однієї операції, фігурні дужки можна опустити:

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] Якщо функція має тільки один формальний параметр, дужки можна опустити:

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

![ico-20 green-ok] При відсутності формальних параметрів круглі дужки обов'язкові:

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

![ico-20 green-ok] Стрілка **~=>~** у стрілочній функції є оператором **~return~**. Тому за відсутності фігурних дужок, якщо тіло функції складається з одного виразу, значення якого повертає функція, оператор **~return~** не використовується:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
// звичайна функція
const multiply = function (x, y) { return x * y }

// стрілкова функція
const multiply = (x, y) => x * y
~~~

_________________________________

![ico-20 green-ok] Оператори гілкування коду (окрім тернарного оператора) та оператори циклу потрібно брати в фігурні дужки.

◘◘![ico-25 cap] оператор _for_◘◘

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

І тут ми можемо переконатися в перевагах ітеруючих методів масивів:

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
      return 'I don\'t undestand your question'
  }
}
~~~

◘◘![ico-25 cap] тернарний оператор◘◘

~~~js
var answerArrow = question =>  
  question === 'who'
    ? 'Irina'
    : question === 'what'
      ? 'develop'
      : question === 'where'
        ? 'Kharkiv'
        : 'I don\'t undestand your question'
~~~

Або так:

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

Або так, якщо використовувати замикання:

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

Або так, якщо використати прийом карірування:

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

________________________________________

## ![ico-25 icon] Головні особливості стрілкових функцій

### ![ico-20 icon] prototype

@@@@
<br><br>У стрілочних функцій немає об'єкта **~prototype~**.<br><br>![ico-20 warn] Тому стрілочні функції не можуть бути конструктором.
![](images/arrow-funcs-neutered-kitties-ukr.svg)
@@@@

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

![ico-20 warn] При спробі викликати стрілкову функцію з ключовим словом **~new~**

~~~js
const arrowFunc = () => {}
var obj = new arrowFunc()
~~~

буде згенеровано виключення:

~~~error
    TypeError: arrowFunc is not a constructor
~~~

______________________________________________________

### ![ico-25 icon] arguments

У стрілкових функцій немає об'єкта  **~arguments~**.

При спробі звернутися до об'єкта **~arguments~** з стрілочної функції буде згенеровано виключення ~ReferenceError~.

~~~js
((x, y) => console.log(arguments))(5, 7)
~~~

~~~error
    ReferenceError: arguments is not defined
~~~

![ico-20 pin] Якщо стрілочна функція оголошена всередині звичайної функції,
то змінні контексту батьківської функції будуть доступні для стрілочної функції
(**~ланцюг областей видимості~**),
тому всередині неї буде доступний об'єкт **arguments** батьківської функції.

◘◘![ico-25 cap] ** 8**◘◘

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

В результаті роботи коду в консоль буде виведено об'єкт **arguments** функції **_testArguments_**:

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

### ![ico-20 icon] Контекст виклику

У стрілкових функціях контекст виклику завжди буде контекстом, у якому функцію оголошено.
Змінити контекст виклику стрілкової функції неможливо.
Можна сказати, що у стрілкових функцій є "вроджений" контекст виклику.

#### ![ico-20 icon] Літерал об'єкта

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

Давай розберем детальніше, що відбувається.
Перед тим, як виконати присвоєння значення змінній **~human~**, двигун має обчислити значення виразу в правій частині оператора присвоєння.
У правій частині знаходиться літерал об'єкта.
1. Двигун викликає конструктор **~Object~**.
2. Конструктор **~Object~** створює порожній об'єкт і повертає посилання на нього.
3. Двигун, отримавши посилання на об'єкт, поміщає це посилання в змінну **~human~** і виконує три присвоєння:

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

Варто зазначити, що всі три присвоєння відбуваються в глобальній області видимості, тобто в контексті глобального об'єкта **~window~**.
І ось тут ми бачимо, як працює передача контексту в процесі присвоєння:

![ico-20 pin] якщо в правій частині оператора присвоєння знаходиться **звичайна функція**, то вона отримує посилання на контекст виклику, визначений в **лівій частині** оператора присвоєння (в нашому прикладі це об'єкт **~human~**);
![ico-20 pin] якщо в правій частині оператора присвоєння знаходиться **стрілкова функція**, то вона отримує контекст "**правої частини**", тобто того об'єкта, в контексті якого відбувається присвоєння (в нашому прикладі це глобальний об'єкт **~window~**).

Для приколу я називаю це "правилом буравчика" ![ico-25 smile].

----------------
#### ![ico-20 icon] Конструктор

Тепер згадаємо, як працює конструктор.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

Коли ми викликаємо функцію **~Sample~** з ключовим словом **~new~**:

~~~js
const user = new Sample('Piter')
~~~

то движок виконує таку послідовність кроків:
1. Викликає конструктор **~Object~**.
2. Конструктор **~Object~** створює порожній об’єкт і повертає посилання на нього.
3. Движок поміщає отримане посилання в змінну **~user~**.
~~~js
const user = new Object()
~~~
4. Движок додає в об’єкт **~user~** посилання на властивість **~prototype~** функції **~Sample~**.
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
5. Движок викликає функцію **~Sample~** в контексті об’єкта **~user~**.
~~~js
Sample.call(user, 'Piter')
~~~

Тобто, до моменту, коли код функції **~Sample~** буде виконуватися, контекст її виклику буде створено (**~user~**), і це буде екземпляр.
Чий екземпляр?
Движок вже додав цьому екземпляру посилання на prototype функції **~Sample~**.
А в об’єкті **~prototype~** функції є властивість **~constructor~**, що містить посилання на цю функцію.
Тобто, екземпляр вже має посилання на конструктор **~Sample~**:

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~

і тепер він розпізнається як екземпляр конструктора **~Sample~**:

~~~js
console.log(user instanceof Sample)  // true
~~~

Що головне, що ми з цього витягуємо:
Функція **~Sample~** буде працювати в контексті створюваного екземпляра, тобто в контексті об'єкта **~user~**.
Тоді присвоєння:

~~~js
this.showName = () => console.log(this.name)
~~~

відбуватиметься в контексті екземпляра **~user~**.
Це означає, що стрілкова функція праворуч від оператора присвоєння отримає контекст об'єкта **~user~**.

__________________________________

#### ![ico-20 icon] Фабрика

Тепер подивимось, що відбувається, коли замість конструктора ми використовуємо фабрику:

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

Функція **~fabric~** викликається в контексті об'єкта **~template~**.
Згідно з нашим "правилом буровчика" ![ico-20 smile], метод **~showName~** отримає "вроджений" контекст виклику - посилання на об'єкт **~template~**.

Перевіримо:

~~~js
user.showName()  // Robert
~~~
____________________________________________________

**Висновок**

Якщо екземпляр об'єкта створений з допомогою конструктора,
використання стрілкових функцій у публічних методах об'єкта гарантує,
що **~this~** завжди вказуватиме на екземпляр.

В іншому випадку використання стрілкової функції створить купу проблем з контекстом виклику методу.

_____________________________________________________

## ![ico-20 icon] Приклади

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

[![ico-30 hw] Quiz](quiz/arrowFunctions)
