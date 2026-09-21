# ![ico-30 study] Стрілкові функції⟪Arrow_functions⟫

**ES6**

## ![ico-25 icon] Синтаксис⟪Syntax⟫

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

## ![ico-25 icon] Головні особливості стрілкових функцій⟪Key_features_of_arrow_functions⟫

### ![ico-20 icon] prototype⟪prototype⟫

@@@@
Стрілкові функції не мають об’єкта  **~prototype~**.<br><br>![ico-20 warn] Тому стрілкові функції не можуть бути конструкторами.
![](slogans/arrow-funcs-neutered-kitties.svg)
@@@@

☼☼☼ Стрілкові функції — це кастровані котики ☼☼☼

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

![ico-20 warn] При спробі викликати стрілкову функцію з ключовим словом **~new~**:

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

буде згенеровано виняток:

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

### ![ico-25 icon] arguments⟪arguments⟫

У стрілкових функцій немає об’єкта  **~arguments~**.

При спробі звернутися до об’єкта **~arguments~** із стрілкової функції буде згенеровано виняток (~ReferenceError~).

~~~error
    ReferenceError: arguments is not defined
~~~

![ico-20 pin] Якщо стрілкова функція оголошена всередині звичайної функції,
то змінні контексту батьківської функції будуть доступні для стрілкової функції,
(**~цепочка областей видимости~**),
тому всередині неї буде доступний об’єкт ~arguments~ батьківської функції.

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

У результаті виконання коду в консоль буде виведено об’єкт ~arguments~ функції **_testArguments_**:

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

### ![ico-20 icon] Контекст виклику⟪prototype⟫

<br><br>У стрілочних функцій немає об'єкта **~prototype~**.<br><br>![ico-20 warn] Тому стрілочні функції не можуть бути конструктором.

![ico-20 warn] При спробі викликати стрілкову функцію з ключовим словом **~new~**

Можна сказати, що стрілкові функції мають «вроджений» контекст виклику.

#### ![ico-20 icon] Літерал об’єкта⟪Object_literal⟫

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

Розберемося детальніше, що відбувається.

Перш ніж виконати присвоєння значення змінній **~human~**, движок повинен обчислити значення виразу в правій частині оператора присвоєння.
У правій частині знаходиться літерал об’єкта.
1. Движок викликає конструктор **~Object~**.
2. Конструктор **~Object~** створює порожній об’єкт і повертає посилання на нього.
3. Движок, отримавши посилання на об’єкт, поміщає це посилання в змінну **~human~** і виконує три присвоєння:

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

Зазначимо, що всі три присвоєння відбуваються в глобальній області видимості, тобто в контексті глобального об’єкта **~window~**.

І ось тут ми бачимо, як працює передача контексту в процесі присвоєння:

![ico-20 pin] якщо в правій частині оператора присвоєння знаходиться **звичайна функція**, то вона отримує посилання на контекст виклику, що визначається в **лівій частині** оператора присвоєння (у нашому прикладі це об’єкт **~human~**);
![ico-20 pin] якщо в правій частині оператора присвоєння знаходиться **стрілкова функція**, то вона отримує контекст «**правої частини**», тобто того об’єкта, в контексті якого відбувається присвоєння (у нашому прикладі це глобальний об’єкт **~window~**).

Заради жарту я називаю це «правилом буравчика» ![ico-25 smile]

----------------
#### ![ico-20 icon] Контекст виклику⟪Call_context⟫

Тепер згадаймо, як працює конструктор.

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

Коли ми викликаємо функцію **~Sample~** із ключовим словом **~new~**:

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
4. Движок додає до цього об’єкта посилання на властивість **~prototype~** функції **~Sample~**.
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
5. Движок викликає функцію **~Sample~** у контексті об’єкта **~user~**.
~~~js
Sample.call(user, 'Piter')
~~~

Тобто до моменту, коли код функції **~Sample~** буде запущений на виконання, контекст її виклику буде створено (**~user~**), і це буде **екземпляр**.
Чий екземпляр?
Движок вже додав до цього екземпляра посилання на **~prototype~** функції **~Sample~**.
А в об’єкті **~prototype~** функції є властивість **~constructor~**, що містить посилання на цю функцію.
Тобто екземпляр уже має посилання на конструктор **~Sample~**:

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~
і тепер він розпізнається як екземпляр конструктора **~Sample~**:
~~~js
console.log(user instanceof Sample)  // true
~~~

Що головне ми з цього розуміємо:

Функція **~Sample~** працюватиме в контексті створюваного екземпляра, тобто в контексті об’єкта **~user~**.

Тоді присвоєння:

~~~js
this.showName = () => console.log(this.name)
~~~

відбуватиметься в контексті екземпляра **~user~**.
Це означає, що стрілкова функція у правій частині оператора присвоєння отримає контекст об’єкта **~user~**.

__________________________________

#### ![ico-20 icon] Фабрика⟪Factory⟫

Тепер подивимося, що відбувається, коли замість конструктора ми використовуємо фабрику:
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

Функція **~fabric~** викликається в контексті об’єкта **~template~**.

Згідно з нашим «правилом буравчика» ![ico-20 smile], метод **~showName~** отримає «вроджений» контекст виклику — посилання на об’єкт **~template~**.

Перевіримо:

~~~js
user.showName()  // Robert
~~~
____________________________________________________

**Висновок**

У разі, якщо екземпляр об’єкта створено за допомогою конструктора,
використання стрілкових функцій у публічних методах об’єкта гарантує,
що **~this~** завжди посилатиметься на екземпляр.

В іншому випадку використання стрілкової функції створить вам купу проблем із контекстом виклику методу.

_____________________________________________________

## ![ico-20 icon] Ідемпотентність⟪Examples⟫

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

※※※tests quiz/arrowFunctions※※※
