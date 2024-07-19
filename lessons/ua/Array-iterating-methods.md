# ![ico-35 study] Ітеруючі методи масивів

Ці методи вчать мислити в рамках **функціональної парадигми**.

Всі ітеруючі методи масивів є **функціями вищого порядку**.
![ico-20 exclamation] Обов'язковим першим аргументом кожного методу є **функція**.
![ico-20 warn] У разі, якщо при виклику методу першим аргументом не буде функція, то буде згенеровано виняток **TypeError**.
^^Другий аргумент методу є необов'язковим, він є посиланням на контекст виклику **функції аргументу**.^^

По суті, ітеруючі методи масивів є функціональною «обгорткою» для **~for...of~**.
Кожен метод перебирає елементи масиву від першого до останнього, і на кожній ітерації викликає передану йому **функцію-аргумент**.

**Функція-аргумент** методу має три необов'язкові формальні параметри:
1) поточний елемент масиву.
2) індекс поточного елементу масиву.
3) посилання на ітерований масив.

[►►►Давайте заглянемо глибше?►►►](page/Array-iterating-methods-theory.md)

_____________________________________________________

## ![ico-30 icon] forEach()

![ico-20 warn] Цей метод не повертає жодного значення.
Давайте порівняємо роботу цього методу з роботою **~for...of~**.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach(currentName => console.log(currentName))

for (const currentName of people) console.log(currentName)
~~~

^^Тут ми перебираємо масив **people**, використовуючи метод **~forEach~**^^.
^^Анонімна функція передається **~forEach~** як аргумент:^^

~~~js
currentName => console.log(currentName)
~~~

У цьому прикладі результат роботи методу **~forEach~** і оператора циклу **~for...of~** буде ідентичним.
Однак у різних ситуаціях нам зручніше використовувати або оператор **~for...of~**, або метод **~forEach~**.
Оскільки метод **~forEach~** не повертає жодного значення, використовувати його в ланцюгових обчисленнях начебто немає сенсу.
Тоді в чому його перевага перед оператором **~for...of~**?

Якщо ви навчитеся мислити категоріями функціональної парадигми, то перевага методу перед оператором стане для вас очевидною.
Але навіть якщо не говорити про те, наскільки методи зручніші за оператори, є ряд додаткових переваг **~forEach~** перед **~for...of~**.
Наприклад, метод **~forEach~** передає в аргумент не тільки значення елемента масиву, але і його індекс.

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach((currentValue, index) => console.log(`${index + 1}: ${currentValue}`))
~~~

~~~console
1: Ivan
2: Mary
3: Elena
4: Andrey
~~~
_______________________________

![ico-25 warn] Якщо ви ще не знайомі з асинхронщиною (промісами та асинхронними функціями), то поверніться до наступного прикладу пізніше.

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const users = [
  { name: 'Mary', age: 25, job: 'dev' },
  { name: 'Piter', age: 37, job: 'worker' },
  { name: 'Robert', age: 28, job: 'journalist' },
  { name: 'Stephan', age: 40, job: 'manager' }
]

const show = user => new Promise(resolve => setTimeout(() => resolve(user.name), Math.random() * 3000))

users.forEach(async user => console.log(await show(user)))
~~~

У цьому прикладі ми моделюємо затримку, пов'язану з отриманням даних користувача з віддаленого сервера, за допомогою функції **~show~**, яка повертає проміс.

Передаючи асинхронну анонімну функцію в метод **~forEach~**, ми гарантуємо, що імена користувачів послідовно виводяться з масиву.

~~~console
Mary
Robert
Stephan
Piter
~~~

Тепер скористаємося оператором **~for...of~**:

~~~js
for (const user of users) {
  show(user).then(name => console.log(name))
}
~~~

Як бачимо, імена користувачів виводяться у довільному порядке:

~~~console
Stephan
Mary
Robert
Piter
~~~

І для того, щоб зберегти порядок імен користувачів відповідно до їх індексу в масиві, нам доводиться "загортати" оператор циклу в асинхронну функцію:

~~~js
async function showUsers (users) {
  for (const user of users) {
    console.log(await show(user))
  }
}

showUsers(users)
~~~

~~~console
Mary
Robert
Stephan
Piter
~~~

Виникає питання - а навіщо це робити, якщо у нас вже є функціональна "обгортка" для циклу **~for...of~**?
_____________________

Слід зазначити, що іноді використання оператора циклу **~for...of~** буває зручніше, ніж виклик методу  **~forEach~**.
Наприклад, якщо ви хочете використовувати оператори **~continue~** | **~break~**, то ваш вибір - оператор **~for...of~**.

__________________________________________

Третій формальний параметр **функції-аргументу** є досить проблемним.
Він є посиланням на вихідний масив.
А ми знаємо, що

☼☼☼ посилання - це відмичка ☼☼☼

Передача посилання дозволяє мутувати вихідний масив:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

^^тобто вихідний масив **numbers** було змінено.^^

Надаючи **функції-аргументу** доступу до вихідного масиву за посиланням, ми створюємо можливість виникнення **побічних ефектів**, пов'язаних із можливими мутаціями вихідного масиву.

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const users = ['Mary', 'Piter', 'Robert', 'Stephan']

users.forEach((name, index, arr) => console.log(arr.pop()))
~~~

Можливо, ви очікували побачити повний список користувачів у консолі, але побачили лише два останні імені з масиву:

~~~console
Stephan
Robert
~~~

При цьому в масиві **users** залишилися тільки два перші імені:

~~~js
console.log(users)
~~~

~~~console
► (2) ['Mary', 'Piter']
~~~

Це побічний ефект мутації масиву **users**.
На кожній ітерації довжина масиву зменшується на ** 1**, а метод **~forEach~** порівнює поточне значення індексу з довжиною масиву, і зупиняє цикл, коли значення індексу стає рівним довжині масиву. Після двох ітерацій значення індексу буде ** 2**, і довжина масиву теж буде ** 2**.

___________________________

Мутації вихідного масиву можуть бути навіть без передачі посилання вихідний масив. Це пов'язано з тим, що якщо елементи масиву мають **посилальний тип даних**, то **функція-аргумент** методу отримає не значення, а посилання, і це створює можливість мутацій елементів масиву за посиланням.

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const users = [
  { name: 'Mary', age: 25, job: 'dev' },
  { name: 'Piter', age: 37, job: 'worker' },
  { name: 'Robert', age: 28, job: 'journalist' },
  { name: 'Stephan', age: 40, job: 'manager' }
]

users.forEach(user => console.log(`${user.name}: ${++user.age}`))
~~~

~~~console
Mary: 26
Piter: 38
Robert: 29
Stephan: 41
~~~

_________________________________________________

### ![ico-25 icon] Контекст виклику функції-аргументу

Метод **~forEach~**, як, втім, і майже всі інші ітеруючі методи масивів, може приймати додатковий аргумент - посилання на контекст виклику **функції-аргументу**.

![ico-20 warn] Однак при цьому функція, що передається методу як аргумент, не повинна бути стрілочною.


◘◘![ico-25 cap] ** 7**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

^^В результаті виконання цього коду в консолі буде масив **~intervals~**.^^
^^Фактично передача методу другого аргументу дорівнює біндингу контексту:^^

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

^^Тому при використанні стрілочної функції, контекст якої змінити неможливо, в консолі побачимо об'єкт **~window~**^^

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

_____________________

^^Припустимо, ми хочемо передавати посилання на масив **~res~**, куди слід розміщувати результати обчислень:^^

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

^^Такі операції позбавлені особливого сенсу, оскільки для цього ми маємо метод <a href="#map()">![ico-20 link]**map**</a>, який буде розглянуто далі.^^

_________________________________

### ![ico-20 icon] Приклади з методом forEach

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const tags = ['figure', 'div', 'h3', 'img']
const attrs = [
  {
    id: 'figure-blue',
    style: 'padding: 48px; background: #09b;'
  },
  {
    id: 'figure-yellow',
    style: 'padding: 16px; background: #fa0;'
  },
  {
    style: 'color: #fff; font-family: Arial; font-weight: bold',
    innerText: 'Welcome, students!'
  },
  {
    src: 'https://pictogrammers.com/images/libraries/mdi.svg',
    width: 64
  }
]

const parents = [null, 'figure-blue', 'figure-yellow', 'figure-yellow']

tags.forEach((tag, index) => {
  const elem = (parents[index] ? document.getElementById(parents[index]) : document.body)
    .appendChild(document.createElement(tag))
  Object.assign(elem, attrs[index])
})
~~~

{{{Array-iteration-methods-1.js}}}

_____________________

◘◘![ico-25 cap] **10**◘◘

~~~js
['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .forEach((item, index) => Object.assign(window, {
      [item]: arg => typeof arg === 'function' ? arg(index) : index
  }))
~~~

У цьому прикладі ми створюємо за допомогою методу **~forEach~** масив функцій з іменами:
"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine".

Кожна з цих функцій перевіряє тип переданого їй аргументу **_arg_**,
і якщо це ~function~, то викликає **_arg_**,
передаючи їй як аргумент свій порядковий номер (0, 1, 2 ...),
інакше повертає число - свій порядковий номер (0, 1, 2 ...).

{{{Array-iteration-methods-2.js}}}
______________________________________________

◘◘![ico-25 cap] **10**◘◘

~~~js
['plus', 'minus', 'divide', 'multiply']
  .forEach((item, index) => Object.assign(window, {
    operations: ['+', '-', '/', '*'],
    [item]: function () {
      return arguments.length === 2
        ? eval(`arguments[0] ${this.operations[index]} arguments[1]`)
        : window[item].bind(null, arguments[0])
    }
  }))
~~~

У цьому прикладі ми створюємо ще один масив функцій з іменами "plus", "minus", "divide", "multiply".
Кожна з цих функцій має два формальні параметри,
тому насамперед вона перевіряє довжину об'єкта **arguments**,
і якщо довжина дорівнює 2, то виконує відповідну операцію з аргументами
(складає, віднімає, множить, ділить).
У протилежному випадку повертає карровану функцію,
у якої перший аргумент уже "прошитий",
і яку можна викликати з одним (відсутнім другим) аргументом.

{{{Array-iteration-methods-3.js}}}

____________________

![ico-25 memo] Вправа

^^Розберіться самостійно, що робить наступний код:^^

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

______________________

## ![ico-30 icon] map()

Цей метод повертає новий масив.
Елементами нового масиву будуть значення, які повертає **функція-аргумент** на кожній ітерації.
**Функція-аргумент** методу повинна повертати нове значення (має бути оператор ~return~).

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const users = [
  { name: 'Mary', birthYear: 1998 },
  { name: 'Piter', birthYear: 2001 },
  { name: 'Robert', birthYear: 2004 },
  { name: 'Helen', birthYear: 1999 },
  { name: 'Stephan', birthYear: 2002 },
]

users.map(user => `${user.name}: ${new Date().getFullYear() - user.birthYear}`)
~~~

~~~console
► (5) ['Mary: 26', 'Piter: 23', 'Robert: 20', 'Helen: 25', 'Stephan: 22']
~~~
_______________________________

Так само, як і в методі **~forEach()~**, у методі **~map()~**, **функція-аргумент** має три опціональні формальні параметри.
![ico-20 green-ok] Аргумент **arr** міститиме посилання на вихідний масив.
![ico-20 green-ok] Аргумент **index** - це лічильник ітерацій, або індекс поточного елемента масиву, що ітерується.

~~~js
const users = [
  { name: 'Mary', birthYear: 1998 },
  { name: 'Piter', birthYear: 2001 },
  { name: 'Robert', birthYear: 2004 },
  { name: 'Helen', birthYear: 1999 },
  { name: 'Stephan', birthYear: 2002 },
]

users.map((user, index, arr) => {
  const olders = arr
    .map(human => human.birthYear > user.birthYear ? human.name : null)
    .join(' ')
  return `${user.name} is younger then ${olders}`
})
~~~

~~~console
▼ (5) [...]
  0: "Mary is younger then  Piter Robert Helen Stephan"
  1: "Piter is younger then   Robert  Stephan"
  2: "Robert is younger then     "
  3: "Helen is younger then  Piter Robert  Stephan"
  4: "Stephan is younger then   Robert  "
  length: 5
  ► [[Prototype]]: Array(0)
~~~

______________________________________________

### ![ico-20 icon] Приклади з методом map

Перейдіть за [![ico-20 link] **_посиланням_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )

У консолі нової вкладки виконайте код:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
location.search
  .slice(1).split(',')
  .map(x => ({ [x.split('=')[0]] : x.split('=')[1] }))
~~~

У вас має вийти результат:

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "garevna"}
  ► 1: {date: "10.07.2018"}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________

Перейдіть за [![ico-20 link] **_посиланням_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )

Тепер у консолі нової вкладки оголосіть функцію:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
function getSearchObject () {
  var obj = {}
  location.search.slice(1).split(',')
    .map(x => x.split('='))
    .map (function (item) { this[item[0]] = item[1] }, obj)
  return obj
}
~~~

Викличте функцію **~getSearchObject~**.

У вас має вийти результат:

~~~console
▼ {name: "garevna", date: "10.07.2018"}
    date: "10.07.2018"
    name: "garevna"
  ► __proto__: Object
~~~

______________________________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~js
;['plus', 'minus', 'divide', 'multiply']
  .map((item, index) => Object.assign(window, {
    [item] () {
      const operations = ['+', '-', '/', '*']
      return arguments.length === 2
        ? eval(`arguments[0] ${operations[index]} arguments[1]`)
        : window[item].bind(null, arguments[0])
    }
  }))
~~~

______________________________________________

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const funcs = [
  function () {
    let res = 0
    for (const arg of arguments) res += parseFloat(arg) || 0
    return res
  },
  function () {
    let res = 1
    for (const arg of arguments) res *= parseFloat(arg) || 0
    return res
  },
  function () {
    let res = 0
    for (const arg of arguments) res += parseInt(arg) || 0
    return res
  }
]

Function.prototype.currying = function (arg, context) {
  return this.bind(context, arg)
}

funcs
  .map(func => func.currying(2.5))
  .map(func => func.currying(2))
  .map(func => func.currying(4.5))
  .map(func => func())
~~~

~~~console
▼ (3) [9, 22.5, 8]
    0: 9
    1: 22.5
    2: 8
    length: 3
  ► [[Prototype]]: Array(0)
~~~
__________________________

## ![ico-25 icon] filter()

Метод **~filter()~** ітерує масив, перевіряючи виконання заданої умови для кожного елемента масиву.
Метод повертає новий масив.
У результуючий масив потраплять лише елементи, які задовольняють умові фільтрації.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sourceArray = [
  { name: 'Микола Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Shveik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Пилип Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

var usa = sourceArray.filter(x => x.country === 'USA')

console.log(usa)
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {name: "Duke Shane", country: "USA"}
  ► 1: {name: "Margaret Johnson", country: "USA"}
  ► 2: {name: "Robert Trump", country: "USA"}
    length: 3
  ► __proto__: Array(0)
~~~

______________________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const getTransactionMode = (() => {
  const transactions = {
    readwrite: ['add', 'put', 'delete', 'clear'],
    readonly: ['get', 'getAll', 'getKey', 'getAllKeys']
  }
  return function (transaction) {
    const res = ['readwrite', 'readonly']
      .filter(mode => transactions[mode].includes(transaction))
    return res[0] || new TypeError('Invalid transaction')
  }
})()

getTransactionMode('add')          // 'readwrite'
getTransactionMode('getAllKeys')  // 'readonly'
~~~

_________________________________

## ![ico-25 icon] find()

Метод шукає в масиві та повертає перший знайдений елемент, що задовольняє задану умову.

Якщо такого елемента у масиві немає, повертає ~undefined~.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.find(card => card.cash > 4000)
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ { num: "457811714", cash: 5000 }
    cash: 5000
    num: "457811714"
  ► __proto__: Object
~~~

___________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const getTransactionMode = (() => {
  const transactions = {
    readwrite: ['add', 'put', 'delete', 'clear'],
    readonly: ['get', 'getAll', 'getKey', 'getAllKeys']
  }
  return function (transaction) {
    const res = ['readwrite', 'readonly']
      .find(mode => transactions[mode].includes(transaction))
    return res || 'unacceptable'
  }
})()

getTransactionMode('add')          // 'readwrite'
getTransactionMode('getAllKeys')  // 'readonly'
~~~

_________________________

## ![ico-25 icon] findIndex()

Подібно до методу ~find()~, шукає в масиві перший елемент, що задовольняє задану умову.
Проте повертає не сам елемент, яке індекс.

Якщо такого елемента у масиві не виявлено, повертає **-1**.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.findIndex(card => card.cash > 1500)  // 1
~~~

Очевидна перевага перед методом **~indexOf~** полягає в тому, що можна працювати з масивами елементів, що мають **посилальний тип даних**.
У цьому прикладі елементами масиву є об'єкти, і метод **~indexOf~** до цього масиву незастосовний.

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const functions = [
  message => message + '$$$',
  () => Math.random() > 0.5 ? 'success' : 'failure',
  arg => typeof arg === 'function' ? arg() : arg
]

const sample = () => Math.random() > 0.5 ? 'success' : 'failure'

functions.findIndex(func => func.toString() === sample.toString())
~~~

_______________________

## ![ico-25 icon] every()

Здійснює перевірку масиву на предмет входження елементів, які **не задовольняють** заданій умові.

Повертає логічне значення:
  • **~true~**, якщо всі елементи масиву пройшли перевірку.
  • **~false~**, якщо хоча б один елемент не пройшов перевірку.

**Функція-аргумент** перевіряє виконання заданої умови для кожного елемента масиву, і повертає логічне значення.

Масив ітерується доти, доки функція не поверне значення **~false~**.
У цьому випадку метод поверне **~false~**.

Якщо **функція-аргумент** поверне **~true~** для всіх елементів масиву, метод поверне **~true~**.

◘◘![ico-25 cap] **every**◘◘

~~~js
const people = [
  { name: 'Микола Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Пилип Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.every(x => x.country === 'Ukraine')

console.log(res)
~~~

^^У цьому прикладі масив **people** перевіряється на наявність у ньому мешканців **не** України.^^
^^Змінна **res** матиме значення ~false~, оскільки в масиві є елементи, що не задовольняють задану умову.^^

______________________________________________

## ![ico-25 icon] some()

Здійснює перевірку масиву щодо входження елементів, що задовольняють заданій умові.

Повертає логічне значення (знайдено/не знайдено).

**Функція-аргумент** перевіряє виконання заданої умови для кожного елемента масиву та повертає логічне значення.

Масив ітерується доти, доки функція не поверне значення **~true~**.
У цьому випадку метод поверне **~true~**.

Якщо функція поверне **~false~** для всіх елементів масиву, метод поверне **~false~**.

◘◘![ico-25 cap] **some**◘◘

~~~js
const people = [
  { name: 'Микола Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Пилип Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.some(x => x.country === 'Pakistan')

console.log(res)
~~~

^^У цьому прикладі масив **people** перевіряється на наявність у ньому жителів Пакистану.^^
^^Змінна **res** матиме значення ~false~, оскільки таких "персонажів" у масиві немає.^^

^^Метод **~some~** можна замінити наступним кодом:^^

~~~js
const res = people
  .map(human => human.country)
  .includes('Pakistan')
~~~
або таким:
~~~js
people
  .filter(x => x.country === 'Pakistan')
  .length > 0
~~~

____________________________

## ![ico-25 icon] reduce()

Цей метод відрізняється від своїх колег списком формальних параметрів **функції-аргументу**.
Саме першим формальним параметром **функції-аргументу** тепер буде не поточний елемент масиву, а **змінна-акумулятор**.
Значення цієї змінної буде результатом роботи методу.

Гнучкість і універсальність цього методу полягає в тому, що результатом його роботи може бути що завгодно: число, масив, об'єкт, рядок, логічне значення і т.д.
Цей результат "накопичується" у **змінній-акумуляторі**.

Як і всі ітеруючі методи масивів, які ми вже обговорювали, метод **~reduce~** отримує **функцію** як перший необхідний аргумент.
Однак другий аргумент методу не є посиланням на контекст, в якому викликається **функція-аргумент**.
Він має зовсім інше призначення: задає початкове значення **змінної-аккумулятора**.

![ico-20 warn] **Якщо початкове значення змінної-аккумулятора не встановлено, то в якості початкового значення змінної-аккумулятора буде використовуватися значення першого елемента масиву.**.

^^Тобто, якщо ми не передамо другий аргумент методу, він встановить початкове значення **змінної-акумулятора** на значення першого елемента ітерованого масиву.^^


![ico-25 cap] Розглянемо найпростіший приклад:

~~~js
[1, 2, 3, 4, 5].reduce(accumulator => accumulator * 2) // 16
~~~

Так як початкове значення змінної-акумулятора не встановлено, то воно буде дорівнювати значенню першого елемента масиву, тобто ** 1**.
Цикл буде "крутитися" до останнього елементу масиву, але самі елементи не використовуються **функцією-аргументом**:

~~~js
accumulator => accumulator * 2
~~~

Тому на кожній ітерації значення **змінної-акумулятора** буде просто подвоюватися:

•• 1 * 2 * 2 * 2 * 2 = 16 ••

_____________________________________

![ico-25 cap] Тепер запросимо на цю тусовку другий формальний параметр **функції-аргумента**:

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item) // 120
~~~

Початкове значення **змінної-акумулятора** буде дорівнювати 1 ^^(значення першого елемента масиву)^^, але на кожній ітерації **змінна-акумулятор** буде множитися на значення поточного елемента масиву:

•• 1 * 2 * 3 * 4 * 5 = 120 ••

____________________________

![ico-25 cap] Настав час ввести в бій початкове значення **змінної-акумулятора**:

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item, 5) // 600
~~~

•• 5 * 1 * 2 * 3 * 4 * 5 = 600 ••

Ось така чудова машина зараз є в нашому розпорядженні.

_________________________________

![ico-25 cap] Копнем глибше. Задіємо третій формальний параметр **функції-аргументу**:

~~~js
[10, 2, 3, 4, 5].reduce((accumulator, item, index) => accumulator * item + index) // 1319
~~~

Тут метод **~reduce~** виконує таку послідовність обчислень:

•• ((((10 + 0) * 2 + 1) * 3 + 2) * 4 + 3) * 5 + 4 = 1319 ••

_________________________________________

До цього часу ми розглядали масив чисел і числове значення **змінної-акумулятора**.

Однак потенціал цього методу набагато більший, і його можливості набагато ширші.

### ![ico-20 icon] Приклади з методом reduce()

Давайте зведемо масив рядків до об'єкта.
Для цього нам обов'язково потрібно вказати стартове значення акумулятора, оскільки значення першого елемента масиву буде рядок, а ми хочемо отримати об'єкт.


◘◘![ico-20 cap] ** 1**◘◘

~~~js
['plus', 'minus', 'divide', 'multiply']
  .reduce((res, item) => Object.assign(res, { [item]: item.length }), {})
~~~

~~~console
▼ {plus: 4, minus: 5, divide: 6, multiply: 8}
  divide: 6
  minus: 5
  multiply: 8
  plus: 4
  ► [[Prototype]]: Object
~~~

___________________

Тепер зведемо масив об'єктів до рядка.

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const string = [
  { name: 'Piter', age: 31 },
  { name: 'Helen', age: 29 },
  { name: 'Robert', age: 45 },
  { name: 'Andrew', age: 24 }
].reduce((res, user) => res += `${user.name}: ${user.age}\n`, 'Users:\n')

console.log(string)
~~~

~~~console
Users:
Piter: 31
Helen: 29
Robert: 45
Andrew: 24
~~~

_____________________________________

Тепер порахуємо, скільки разів кожен символ зустрічається в рядку, і повернемо об'єкт:

◘◘![ico-20 cap] ** 3**◘◘
~~~js
const string = 'With the trust of thousands of partners from around the world, we are dedicated to contributing to the widespread adoption of cryptocurrencies.'

string
  .split('')
  .reduce((result, char) => Object.assign(result, {
    [char]: (result[char] || 0) + 1
  }), {})
~~~

{{{Array-iteration-methods-reduce-2.js}}}
_____________________________________

Тепер порахуємо, скільки жителів кожної країни у списку.

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const people = [
  { name: 'Alexandra Pugh', country: 'Ukraine' },
  { name: 'Andrea McKay', country: 'USA' },
  { name: 'Anthony Webster', country: 'United Kingdom' },
  { name: 'Noemi Lynch', country: 'Ukraine' },
  { name: 'Enrique Michael', country: 'France' },
  { name: 'Collin Roy', country: 'USA' },
  { name: 'Stella Dillon', country: 'United Kingdom' },
  { name: 'Lyra Bryant', country: 'France' },
  { name: 'Shane Dodson', country: 'Ukraine' },
  { name: 'Dream Douglas', country: 'USA' },
  { name: 'Bobby Richards', country: 'USA' },
  { name: 'Carmelo Atkinson', country: 'United Kingdom' }
]

const result = people
  .reduce((result, human) => Object.assign(result, {
    [human.country]: (result[human.country] || 0) + 1
  }), {})
~~~

{{{Array-iteration-methods-reduce-1.js}}}

__________________________________________

◘◘![ico-20 cap] ** 5**◘◘

~~~js
[5, 4, 3, 1, 10, 5, 9, 2, 1, 4]
  .reduce((res, number, index, arr) => res += parseInt(number / Math.pow(10, index)), 0)
~~~

Двигун використовує експоненційну форму уявлення малих чисел, тобто. замість **~0.0000005~** буде **~5e-7~**.
Для великих чисел відбувається те саме, тобто. замість **~5000000000000000000000~** буде **~5e+21~**.

Звідси:

~~~js
parseInt(5e-7) // 5

parseInt(5e+21) // 5

parseInt(0.0000005) // 5

parseInt(5000000000000000000000) // 5
~~~

{{{Array-iteration-methods-reduce-3.js}}}

_________________________________________


◘◘![ico-20 cap] ** 6**◘◘

~~~js
[5, 4, 3, 1, 10, 5, 9, 2, 1, 4]
  .reduce((res, number, index, arr) => res.concat(number / Math.pow(10, index)), [])
~~~

{{{Array-iteration-methods-reduce-4.js}}}

_____________________________________

Функція, що передається методу **~reduce~** як перший обов'язковий аргумент,
як і у випадку інших ітеруючих методів методів, може приймати додаткові аргументи - індекс поточного елемента масиву і посилання на сам вихідний масив.

@@@@
Завдяки посиланню ми можемо маніпулювати вихідним масивом, що робить його мутабельним.
![](images/reference-lockpick-ukr.png)
@@@@

◘◘![ico-20 cap] ** 7**◘◘

~~~js
const array = ['first', 'second', 'third', 'fourth']

array.reduce((res, item, index, arr) => {
  const order = Math.round(Math.random() * (arr.length - 1))
  res.push(arr.splice(order, 1)[0])
  return res
}, array)
~~~

{{{Array-iteration-methods-reduce-5.js}}}

_____________________________________

### Math.sqrt

Простежимо, як працюватиме метод **~reduce~**, якщо передати йому першим аргументом **~Math.sqrt~**.
Бібліотечна функція **~Math.sqrt~** приймає всього 1 аргумент (число) і повертає квадратний корінь з отриманого аргументу.
Якщо під час виклику ми не передаємо методу **~reduce~** другий аргумент, він використовуватиме як стартове значення акумулятора значення першого елемента масиву.
На кожній ітерації це значення замінюватиметься його квадратним коренем.
Інші елементи масиву в обчисленнях не братимуть участі, оскільки **~Math.sqrt~** приймає всього 1 аргумент, і це буде поточне значення змінної-акумулятора.

◘◘![ico-20 cap] ** 8**◘◘

~~~js
;[625, 5, 10].reduce(Math.sqrt) // 5
~~~

У цьому прикладі з числа 625 двічі було витягнуто квадратний корінь:
••625 -> 25 -> 5••

Чому двічі? Тому що всього елементів у масиві 3, але перший елемент став стартовим значенням змінної-акумулятора.

Якщо ми додамо ось такий метод **~root~** у прототип конструктора **~Array~**, то результат його виклику буде тим самим:

~~~js
Array.prototype.root = function () {
  return Math.pow(this[0], Math.pow(0.5, this.length - 1))
}

;[625, 0, 0].root() // 5
~~~
____________________________________________

◘◘![ico-20 cap] ** 9**◘◘

~~~js
[0, 0, 0].reduce(Math.sqrt, 625 * 625) // 5
~~~

У цьому прикладі ми задаємо стартове значення **змінної-акумулятора** (625 * 625) другим аргументом методу **~reduce~**.
Тому число ітерацій (тобто. скільки разів буде вилучено корінь квадратний з **змінної-акумулятора**) дорівнюватиме кількості елементів масиву.

{{{Array-iteration-methods-reduce-7.js}}}

_______________________________

### Math.pow

Тепер передаватимемо методу **~reduce~** першим аргументом бібліотечну функцію **Math.pow** (зведення до ступеня).
Ця функція приймає два числові аргументи: число, яке потрібно звести в ступінь, і значення ступеня.

Якщо ми не передаємо стартове значення **змінної-акумулятора** другим аргументом методу **~reduce~**, то в цій якості буде використано значення першого елемента масиву.
Інші елементи масиву будуть значеннями ступеня, в який потрібно звести поточне значення **змінної-акумулятора**.

Якщо ми передаємо стартове значення **змінної-акумулятора**, то всі елементи масиву будуть розглядатися як ступінь, в яку потрібно звести поточне значення **змінної-акумулятора**.

◘◘![ico-20 cap] ** 10**◘◘

~~~js
console.log([3, 2, 2].reduce(Math.pow))    // 81

console.log(Math.pow(Math.pow(3, 2), 2))   // 81

console.log([2, 3, 3].reduce(Math.pow))    // 512

console.log(Math.pow(Math.pow(2, 3), 3))   // 512

console.log([2, 2, 2].reduce(Math.pow, 2)) // 256

Math.pow(Math.pow(Math.pow(2, 2), 2), 2)   // 256
~~~

{{{Array-iteration-methods-reduce-10.js}}}

Якщо ми додамо в прототип конструктора **~Array~** метод **~pow~**, цей метод буде працювати аналогічно методу **~reduce~**, викликаному з бібліотечною функцією **~Math.pow~** і без другого аргументу:

~~~js
Array.prototype.pow = function () {
  let res = this[0]
  for (const item of this.slice(1)) {
    res = Math.pow(res, item)
  }
  return res
}

[3, 2, 2].pow() // 81
~~~

______________________________________

### ![ico-25 hw] Тести

Що повернуть такі вирази:

◘◘** 1**◘◘

→→→ [].reduce(Math.pow) | TypeError, null, NaN, 0 | TypeError →→→

◘◘** 2**◘◘

→→→ [].reduce(Math.sqrt, 'Google') | TypeError, null, NaN, 0, 'Google' | Google →→→

◘◘** 3**◘◘

→→→ [1].reduce(Math.sqrt, 'Google') | TypeError, null, NaN, 0, 'Google' | NaN →→→

◘◘** 4**◘◘

→→→ [-10, -20, 5].reduce(Math.abs) | null, NaN, 0, 10, 20, 5 | 10 →→→

◘◘** 5**◘◘

→→→ [.5].reduce(Math.pow, 49) | null, NaN, 0, 7, 49, 5 | 7 →→→

_________________________________

## ![ico-25 icon] sort()

Число ітерацій буде свідомо більше, ніж кількість елементів масиву.

Метод сортує масив згідно з заданою умовою сортування.
Умову сортування перевіряє **функція-аргумент**, що передається методу.
_**Функція-аргумент** має два формальні параметри, значення яких використовуються для порівняння._.

Функція повертає одне із трьох значень:

|  0 | елементи збіглися (рівні)         |
|  1 | перший аргумент більший за другий |
| -1 | другий аргумент більший за перший |

На основі значення, що повертається функцією, метод змінює порядок елементів у масиві.

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var sourceArray = [
  { title: 'fond', value: 100 },
  { title: 'salary', value: 400 },
  { title: 'bonus', value: 70 },
  { title: 'debt', value: 700 },
  { title: 'credit', value: 200 },
  { title: 'payments', value: 150 },
  { title: 'income', value: 320 },
]
var resArray = sourceArray.sort(function (x, y) {
  return x.value - y.value
})
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {title: "bonus", value: 70}
  ► 1: {title: "fond", value: 100}
  ► 2: {title: "payments", value: 150}
  ► 3: {title: "credit", value: 200}
  ► 4: {title: "income", value: 320}
  ► 5: {title: "salary", value: 400}
  ► 6: {title: "debt", value: 700}
    length: 7
  ► __proto__: Array(0)
~~~

^^Щоб зрозуміти механізм сортування, виведемо значення порівнюваних елементів масиву в консолі на кожній ітерації:^^

◘◘![ico-20 cap] ** 2**◘◘
~~~js
var resArray = sourceArray
  .sort(function (x, y) {
    console.log(`${x.title} - ${y.title} = ${x.value - y.value}`)
    return  x.value - y.value
  })
~~~

◘◘**^^Результат^^**◘◘

~~~console
fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300
~~~

^^^[Логування]

^^Створимо масив **log**, в якому будемо логувати всі операції в процесі сортування масиву.^^

~~~js
var log = []
var resArray = sourceArray
  .sort(function (x, y) {
    log.push({
      id: x.title + " > " + y.title,
      res: x.value > y.value
    })
    return  x.value - y.value
  })
~~~
**log**
~~~console
▼ (13) [...]
  ► 0: {id: 'salary > fond', res: true}
  ► 1: {id: 'bonus > salary', res: false}
  ► 2: {id: 'bonus > salary', res: false}
  ► 3: {id: 'bonus > fond', res: false}
  ► 4: {id: 'debt > fond', res: true}
  ► 5: {id: 'debt > salary', res: true}
  ► 6: {id: 'credit > salary', res: false}
  ► 7: {id: 'credit > fond', res: true}
  ► 8: {id: 'payments > credit', res: false}
  ► 9: {id: 'payments > fond', res: true}
  ► 10: {id: 'income > credit', res: true}
  ► 11: {id: 'income > debt', res: false}
  ► 12: {id: 'income > salary', res: false}
    length: 13
  ► __proto__: Array(0)
~~~
^^^

Отже, на відміну від інших методів, що ітерують, **функція-аргумент** приймає строго два параметри.

![ico-20 warn] Цьому методу не можна передати посилання на контекст виклику.

![ico-20 require] Самостійно спробуйте намалювати блок-схему алгоритму сортування масиву методом **~sort()~**.

__________________________

## ![ico-25 icon] flatMap()

Є рядок **cookie**:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

Сплітимо рядок **cookie** і застосуємо метод **~map~** до отриманого масиву.

~~~js
console.log(cookie.split('; ').map(item => item.split('='))
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ (3) [Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "user"]
  ► 1: (2) ["token", "Jd7-js15/84"]
  ► 2: (2) ["interest", "javascript"]
    length: 3
  ► __proto__: Array(0)
~~~

Ми отримали масив, елементи якого є масивами.

Тепер застосуємо метод **~flatMap~** до масиву:

~~~js
console.log(cookie.split('; ').flatMap(item => item.split('='))
~~~

◘◘**^^Результат^^**◘◘

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

Ми отримали "плоский" масив.

Отже, використовуючи ту саму функцію:

~~~js
function (item) {
  return item.split('=')
}
~~~

ми отримали в першому випадку масив масивів, а в другому - "плоский" масив.

____________________________________________________

## ![ico-25 icon] keys()

**Генератор**.
**Повертає об’єкт _ітератора_**.

◘◘![ico-20 cap] **keys**◘◘

~~~js
const cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
  .split('; ')
  .map(item => item.split('='))

const iterator = cookie.keys()

do {
  var { value, done } = iterator.next()
  done || console.log(cookie[value][0], cookie[value][1])
} while (!done)
~~~

◘◘**^^Результат^^**◘◘

~~~console
name user
token Jd7-js15/84
interest javascript
~~~


______________________

## ![ico-25 icon] values()

**Генератор**.
**Повертає об’єкт _ітератора_**.

◘◘![ico-20 cap] **values**◘◘

~~~js
const cookie = 'name=user; token=Jd7-js15/84; interest=javascript'

const iterator = cookie
  .split ('; ')
  .map(item => item.split('='))
  .values()

do {
  var { value, done } = iterator.next()
  done || console.log(value)
} while (!done)
~~~

◘◘**^^Результат^^**◘◘

~~~console
► (2) ["name", "user"]
► (2) ["token", "Jd7-js15/84"]
► (2) ["inerest", "javascript"]
~~~

_____________________________________________

## ![ico-30 icon] Приклади та тести

_________________________________________

### ![ico-25 cap] Сума кешу на картах

Створимо масив банківських карток, і за допомогою методу **~reduce~** порахуємо суму коштів на всіх картках:

~~~js
const cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.reduce((result, card) => result + card.cash, 0)  // 10300
~~~

___________________________________________________

Створимо нову карту, на яку акумулюємо залишки на рахунках усіх карток:

~~~js
cards.reduce((result, card) => ({
  num: result.num,
  cash: result.cash + card.cash
}), { num: '457855155', cash: 0 })
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ { num: "457855155", cash: 10300 }
    cash: 10300
    num: "457855155"
  ► __proto__: Object
~~~

Для чистоти результату додатково обнулимо залишки на рахунках інших карток:

~~~js
cards.reduce((result, card) => {
  const cash = card.cash
  card.cash = 0
  return {
    num: result.num,
    cash: result.cash + cash
  }
}, { num: '457855155', cash: 0 })
~~~

Тепер вихідний масив карток буде:

◘◘**^^Результат^^**◘◘

~~~console

▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {num: "457892425", cash: 0}
  ► 1: {num: "457812840", cash: 0}
  ► 2: {num: "457855780", cash: 0}
  ► 3: {num: "457811714", cash: 0}
    length: 4
  ► __proto__: Array(0)

~~~

__________________________________________

### ![ico-25 cap] Чищення від дублів

Припустимо, що у нас є масив користувачів, і ми вирішили отримати масив всіх спеціальностей, які є у цих користувачів.
~~~js
const users = [
  { name: 'Watson Armstrong', speciality: 'developer' },
  { name: 'Marcelo Anthony', speciality: 'doctor' },
  { name: 'Eva Randall', speciality: 'teacher' },
  { name: 'Stephen Meyer', speciality: 'worker' },
  { name: 'Isabella Drake', speciality: 'teacher' },
  { name: 'Rafael Gilbert', speciality: 'developer' },
  { name: 'Adrianna Schultz', speciality: 'doctor' },
  { name: 'Kira Hall', speciality: 'teacher' },
  { name: 'Carmen Duarte', speciality: 'musician' },
  { name: 'Anika Burton', speciality: 'developer' },
  { name: 'Hugo Gray', speciality: 'worker' },
  { name: 'Scott Hahn', speciality: 'worker' }
]

const specialities = users.map(user => user.speciality)
~~~

Однак, як ми бачимо, багато спеціальностей дублюватимуться, що нам абсолютно не потрібно.

◘◘**^^specialities^^**◘◘
~~~console
▼ [...]
   0: "developer"
   1: "doctor"
   2: "teacher"
   3: "worker"
   4: "teacher"
   5: "developer"
   6: "doctor"
   7: "teacher"
   8: "musician"
   9: "developer"
  10: "worker"
  11: "worker"
  length: 12
  ► [[Prototype]]: Array(0)
~~~

Потрібно видалити елементи масиву **~specialities~**, що дублюються.

![ico-20 warn] Відразу зауважимо, що найпростіше досягти цього за допомогою конструктора **~Set~**:

~~~js
Array.from(new Set(specialities))
~~~

Але ми вирішили піти складнішим шляхом ![ico-25 wink].

~~~js
const arr = [
  'google',
  'mozilla',
  'ie',
  'mozilla',
  'mozilla',
  'google',
  'mozilla',
  'ie',
  'ie',
  'google'
]
~~~

~~~js
arr.reduce((result, item) => {
  result.indexOf(item) < 0 ? result.push(item) : null
  return result
}, [])
~~~

◘◘**^^Результат^^**◘◘

~~~console
▼ (3) ["google", "mozilla", "ie"]
    0: "google"
    1: "mozilla"
    2: "ie"
    length: 3
  ► __proto__: Array(0)
~~~

_________________________________________________

### ![ico-25 cap] Число відрізків в інтервалі

Є кілька відрізків на числовій осі:

~~~js
const intervals = [[10, 20], [4, 18], [7, 10], [5, 16], [9, 13], [11, 15], [7, 15], [10, 12], [12, 19]]
~~~

Для кожного відрізка слід порахувати, скільки відрізків виявилося всередині нього.

Для спрощення коду додамо в прототип конструктора **~Array~** метод **~testSegment~**:
~~~js
Array.prototype.interior = function (interval = [0, 1]) {
  return this[0] < interval[0] && this[1] > interval[1]
}
~~~
Тепер можна порівняти два відрізки просто:
~~~js
[18, 35].interior([4, 18]) // false
[18, 35].interior([20, 28]) // true
~~~
Тепер ми можемо виконати поставлене завдання:
~~~js
intervals
  .map((segment, index, array) => array.filter(interval => segment.interior(interval)).length)
~~~

◘◘**^^Result^^**◘◘
~~~console
► (9) [2, 6, 0, 5, 1, 0, 2, 0, 0]
~~~

__________________________

### ![ico-25 cap] Перевірка парних дужок

Завдання: перевірити парність та правильність розміщення дужок.

Наприклад, валідація рядка "({})[([])]" має пройти нормально (повернути ~true~),
а валідація рядка "({(})[([)])]" має повернути ~false~.

Для зручності використання створимо успадкований метод рядків:

◘◘![ico-20 cap] **Brackets validation**◘◘

~~~js
String.prototype.testBrackets = (function () {
  const brackets = {
    '[': ']',
    '{': '}',
    '(': ')'
  }

  const all = ['[', '{', '(', ']', '}', ')']

  return function () {
    const self = this
      .split('')
      .filter(char => all.includes(char))

    let stack = [], result = ''

    self
      .forEach(symbol => {
        if (!brackets[symbol] && stack.length === 0) return false

        brackets[symbol] ? stack.push(symbol) : symbol = brackets[stack.pop()]

        result += symbol
      })

    return result === self.join('') && stack.length === 0
  }
})()
~~~

~~~js
'( [ ( { ( ( {(} ([]) ) ) } ) ] )'.testBrackets()   // false

String.prototype.testBrackets.toString().testBrackets()  // true
~~~

{{{Array-iteration-methods-brackets.js}}}
___________________________________________________

### ![ico-25 cap] location

~~~js
function getSearchObject () {
  const obj = {}

  location.search
    .slice(1)
    .split(',')
    .map(x => x.split('='))
    .map(function (item) { this[item[0]] = item[1] }, obj)

    return obj
}

var searchObject = getSearchObject ()
for (const rec in searchObject) {
  document.body.innerHTML += `<p>${rec}: ${searchObject[rec]}</p>`
}
~~~

[:::**Live demo**:::](samples/11)

_____________________________________________

### ![ico-25 cap] getComputedStyle

Перейдіть за [**_посиланням_**](https://en.wikipedia.org/wiki/Idempotence ) і в консолі сторінки виконайте код:

~~~js
Array.from(document.getElementsByClassName('interlanguage-link'))
  .map(item => getComputedStyle(item))
  .forEach(item => console.log(item['font-family']))
~~~

________________________________________________

[![ico-30 hw] **Тесты**](quiz/arrayIterationMethods)
