# Як працюють ітеративні методи

[◄◄◄ Ітеруючі методи масивів ◄◄◄](page/Array-iterating-methods.md)

Вивівши в консоль властивість **_~prototype~_** конструктора **~Array~**, можна переконатися, що ці структури даних успадковують багато методів, і деякі з них ми вже знаємо.

~~~js
console.log(Array.prototype)
~~~

{{{Array-iteration-methods-theory.js}}}

Деякі методи, з якими ми вже знайомі, виконують якусь операцію над масивом.
^^(додати елемент до масиву, видалити або замінити елементи в масиві, об'єднати кілька масивів в один тощо).^^

Ітеруючі методи перебирають елементи масиву один за одним строго в порядку зростання їх індексів.
^^(за винятком ~reduceRight~, який здійснює перебір справа наліво).^^

_Група ітеруючих методів масивів є прикладом реалізації функціональної парадигми._

Головне, що потрібно пам'ятати про ітеруючі методи масиву – це **функції вищого порядку**.
Це нагадає вам, що ![ico-20 warn] **першим і обов'язковим аргументом методу є функція**.

• Метод буде перебирати елементи масиву один за одним, поки не досягне кінця масиву.
• На кожній ітерації метод буде викликати передану йому **функцію-аргумент**.
• При виклику **функції-аргументу** метод передасть їй значення поточного елемента масиву.

_____________________________________________

## ![ico-25 icon] Декоратор циклу

Переваги методів перед операторами циклу очевидні.
Наприклад, за допомогою методів ми організовуємо ланцюгові обчислення, а оператори циклу "розбивають" красивий ланцюжок, порушуючи гармонію нашого коду.

Цикли вимагають від нас досить багато рутинної роботи: нам потрібно ініціалізувати змінну циклу, визначити, як вона буде змінюватися на кожній ітерації, контролювати її значення, щоб вчасно завершити цикл. Коротше кажучи, створити механізм циклу своїми руками. Ми навіть не будемо обговорювати можливі помилки, що виникають при цьому.

Цикли ~for...of~ і ~for...in~ значно полегшили роботу з ітерування масивів і об'єктів. Однак це все ще оператори циклу, а не методи.

Коли ми "завертаємо" цикл у функцію (метод), ми забезпечуємо можливість використання ланцюгових обчислень.

Таким чином, ітеруючі методи можна інтерпретувати як функціональні «обгортки» для оператора ~for...of~.


◘◘![ico-20 cap] ** 1**◘◘

~~~js
Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

;[7, 4, 1].iterate(console.log)
~~~

У цьому прикладі ми створили кастомний успадкований метод масивів **~iterate~**
з формальним параметром ~func~ (^^function^^),
який перебирає в циклі ~for...of~ вихідний масив
і на кожній ітерації викликає ~func~,
передаючи їй черговий елемент вихідного масиву.

У цьому прикладі метод **~iterate~** нічого не повертає,
І він не змінює вихідний масив, тобто не виробляє зовнішніх ефектів.

Такого ж ефекту можна досягти за допомогою рекурсії:

~~~js
Array.prototype.iterate = function (func, index) {
  if (typeof func !== 'function') throw new TypeError('First argument is not a function.')
  let number = typeof index === 'number' ? index : 0
  func(this[number])
  number++ < this.length - 1 && this.iterate.call(this, func, number)
}

;[7, 4, 1].iterate(console.log)
~~~

_____________________________________________

Якщо ми хочемо, щоб метод повернув новий масив, нам потрібно зробити наступне:

◘◘![ico-20 cap] ** 2**◘◘

~~~js   
Array.prototype.iterate = function (func) {
  const res = []
  for (const item of this) res.push(typeof func === 'function' ? func(item) : item)
  return res
}

;[49, 4, 25].iterate(Math.sqrt)
~~~

Результат

~~~console
► (3) [7, 2, 5]
~~~

В результаті кастомний метод **~iterate~** збиратиме" в масив ~res~
результати виклику функції ~func~ на кожній ітерації,
та повертати масив ~res~.

~~~js
const squaring = num => Math.pow(num, 2)
;[7, 2, 5].iterate(squaring)
~~~

Результат

~~~console
► (3) [49, 4, 25]
~~~

_____________________________________________

Ми можемо напилити кастомний метод, що фільтрує вихідний масив відповідно до заданої умови.
Тепер функція **~func~** має повертати логічне значення.
Якщо для чергового елемента масиву функція **~func~** поверне ~true~, цей елемент потрапить у результуючий масив **res**.
В іншому випадку – ні.

◘◘![ico-20 cap] ** 3**◘◘

~~~js
Array.prototype.filtering = function (func) {
  const res = []
  for (const item of this) func(item) && res.push(item)
  return res
}

const func = num => num < 10
;[108, 24, 5, 17, 1, 7].filtering(func)
~~~

Результат

~~~console
► (3) [5, 1, 7]
~~~

~~~js   
[7, 4, 1, 20, 8].filtering(item => item > 5)
~~~

Результат

~~~console
► (3) [7, 20, 8]
~~~

_____________________________________________

## ![ico-25 icon] Передача посилань

Тут, на жаль, закінчується функціональна чистота ітеруючих методів.<br><br>**Посилання - це "відмичка"**, і за посиланням функція може мутувати об'єкт.<br><br>При цьому зазвичай виникають побічні ефекти (**side effects**).
Є два способи передачі посилань у методах ітерації масивів.
Перший - передача посилання на **контекст виклику функції-аргумента** другим аргументом методу.

Другий - передача посилання на вихідний масив самій **функції-аргументу** при виклику.
Первый - передача ссылки на контекста вызова функции-аргумента вторым аргументом метода.
Второй - передача ссылки на исходный массив самой функции-аргументу при вызове.

### ![ico-20 icon] Другий аргумент методу

Кожен метод може приймати два аргументи: функцію та посилання на контекст виклику.

Крім обов'язкового **аргументу-функції**, ми можемо передати методу другий (необов'язковий) аргумент - посилання на контекст виклику цієї функції.
Насправді, другий аргумент звільняє нас від необхідності явно байндити контекст виклику функції, яка передається методу як аргумент.

◘◘ ![ico-25 cap] ** 4** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [7, 5, 0, 11]

Array.prototype.iterate = function (callback, context) {
  const res = []
  for (const item of this) {
    res.push(callback.call(context, item, this.indexOf(item), this))
  }
  return res
}

const sample = numbers.iterate(function (item, index, arr) {
  return this[index] + arr[index]
}, alter)

console.log(sample)
~~~

Результат

~~~console
► (4) [15, 9, 9, 18]
~~~

◘◘ ![ico-25 cap] ** 5** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [-4, 1, -2, 0]

Array.prototype.iterate = function (callback, context) {
  const res = []
  const func = callback.bind(context)
  for (const item of this) res.push(func(item))
  return res
}

const sample = numbers.iterate(function (item) {
  return item + this.shift()
}, alter)

console.log(sample)
~~~

Результат

~~~console
► (4) [4, 5, 7, 7]
~~~

Результат:

~~~js
console.log(alter) // []
~~~

Ще одна незручність полягає в тому, що при цьому ми не можемо передавати методу стрілочні функції, оскільки в них контекст виклику змінити неможливо.
Однак стрілочні функції роблять код більш лаконічним.

_____________________________________

### ![ico-20 icon] Посилання на вихідний масив

Функція-аргумент може мати три формальні параметри.
Перший - це поточний елемент масиву.
Другий - це індекс поточного елемента масиву.
Третій - це посилання на вихідний масив.

Передача цієї "відмички" функції-аргументу грубо руйнує функціональну чистоту методу і створює величезні можливості для побічних ефектів.

Наступний приклад показує, як це працює.


◘◘![ico-20 cap] ** 6**◘◘

~~~js
const numbers = [8, 4, 9, 7]

Array.prototype.iterate = function (func) {
  const res = []
  let index = 0
  for (const item of this) {
    res.push(func(item, index++, this))
  }
  return res
}

const sample = numbers.iterate((item, index, arr) => item * index - arr[0])

console.log(sample)
~~~

Результат

~~~console
► (4) [-8, -4, 10, 13]
~~~

Результат:

___________________________________________________

## ![ico-25 icon] Side effects

![ico-20 warn] Чистые функции, какими, по идее, должны были быть итерирующие методы, не порождают внешних эффектов, т.е. не мутируют никакие внешние переменные.
Итерирующие методы массивов - это функции высшего порядка, которые перебирают исходный массив, передавая функции-аргументу по очереди один элемент массива за другим.
Таким образом, функция-аргумент не имеет ссылки на сам исходный массив, и не может его мутировать.
_______________________
![ico-20 warn] Исключение - если элементы исходного массива имеют **ссылочный тип данных**, т.е. функция-аргумент получает ссылку на элемент массива.
______________________
Возвращается всегда новый массив (или не массив, как мы увидим позже, или вообще ничего).
Исходный массив, как правило, не изменяется.
Т.е. изначально это должны были быть чистые функции, не порождающие внешних эффектов, что их отличает от обычных методов массивов, таких как ~push()~, ~concat()~ и т.д.

Но мы уже показали ранее, что эта функциональная чистота нарушается передачей ссылок (методу - на контекста вызова функции-аргумента и на исходный массив - функции-аргументу).

Аналогично, если мы имеем дело с **глубокими структурами данных**, то происходит передача не значений, а ссылок, что создает возможность возникновения побочных эффектов.


◘◘![ico-20 cap] ** 7**◘◘

~~~js
const users = [
  { name: 'Helen', age: 25 },
  { name: 'Robert', age: 18 },
  { name: 'Mary', age: 20 },
  { name: 'Piter', age: 30 }
]

Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

users
  .iterate(user => user.age++)
~~~

В этом примере мы итерируем массив объектов, т.е. имеем дело с глубокой структурой данных.
На каждой итерации функция-аргумент (~user => user.age++~) метода **~iterate~** получает ссылку на объект.
Это дает ей возможность мутировать исходный массив, поскольку

☼☼☼ ссылка - это отмычка ☼☼☼

В результате выполнения кода массив **users** будет таким:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {name: 'Helen', age: 26}
  ► 1: {name: 'Robert', age: 19}
  ► 2: {name: 'Mary', age: 21}
  ► 3: {name: 'Piter', age: 31}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

Мы видим, что возраст всех юзеров изменился, хотя мы не передавали ссылку на исходный массив **users**.
Но массив **users** является глубокой структурой данных, и его элементы имеют ссылочный тип,
поэтому функция-аргумент (~user => user.age++~) метода **~iterate~** получила "отмычку" и смогла мутировать объекты по сслыке.

Итак, side effects возникают вследствие передачи ссылок вместо значений.

_____________________________________________

Следующий пример показывает, что можно мутировать и саму функцию-аргумент:

◘◘![ico-20 cap] ** 8**◘◘

~~~js
var browsers = ['Chrome', 'FireFox', 'Opera', 'Safari', 'Edge']

const storeItem = function (item, index, arr) {
  this.history = Array.isArray(this.history) ? this.history : []
  this.history.push(item)
}

Array.prototype.iterate = function (func) {
  for (var item of this) func.call(func.prototype, item)
}

browsers.iterate(storeItem, storeItem)

console.dir(storeItem)
~~~

Результат у консолі:

~~~console
▼ ƒ storeItem(item, index, arr)
  ▼ history: Array(5)
      0: "Chrome"
      1: "FireFox"
      2: "Opera"
      3: "Safari"
      4: "Edge"
      length: 5
    ► __proto__: Array(0)
    arguments: null
    caller: null
    length: 3
    name: "storeItem"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

_____________________________________________

## ![ico-25 icon] Side effects

![ico-20 warn] Чисті функції, якими, в принципі, мали б бути ітеруючі методи, не викликають зовнішніх ефектів, тобто не мутують жодні зовнішні змінні.

Отже, **аргумент-функція** не має посилання на сам масив і не може його змінювати.

![ico-20 warn] Виняток - якщо елементи початкового масиву мають **посилальний тип даних**, тобто функція-аргумент отримує посилання на елемент масиву.
Початковий масив, як правило, залишається незмінним.
Тобто, спочатку вони повинні були бути чистими функціями, що не породжують зовнішніх ефектів, що робить їх відмінними від звичайних методів масивів, таких як ~push()~, ~concat()~ і т.д.

Проте ми вже показали раніше, що ця функціональна чистота порушується передачею посилань (на контекст виклику **функції-аргумента** і на початковий масив).

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return res
}

numbers.idempotence(Math.sqrt)
~~~

Результат

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

◘◘![ico-20 cap] ** 7**◘◘

У цьому прикладі ми ітеруємо масив об'єктів, тобто маємо справу з глибокою структурою даних.

~~~js
numbers[6] = 125

numbers.idempotence(Math.sqrt)
~~~

Результат

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

В результаті виконання коду масив **users** буде виглядати наступним чином:

Ми бачимо, що вік всіх користувачів змінився, хоча ми не передавали посилання на оригінальний масив **users**.

~~~js
Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return JSON.stringify(res)
}
~~~

Але масив **users** є глибокою структурою даних, а його елементи мають **посилальний тип**,

тому **функція-аргумент** (~user => user.age++~) методу **~iterate~** отримала "майстер-ключ" і змогла змінювати об'єкти за посиланням.

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

Отже, **побічні ефекти** виникають через передачу посилань замість значень.

У наведеному нижче прикладі показано, що ви можете змінити саму функцію-аргумент:

◘◘![ico-20 cap] **10**◘◘
~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  if (!this.initialState) {
    this.result = []
    this.initialState = JSON.parse(JSON.stringify(this))
    for (const item of this.initialState) this.result.push(func(item))
  }

  return JSON.stringify(this.result)
}

numbers.idempotence(Math.sqrt)
~~~

Результат

~~~console
'[5,4,3,7,9,8,2]'
~~~

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

Результат

~~~console
'[5,4,3,7,9,8,2]'
~~~

__________________________________
Попробуйте самостоятельно разобраться в следующем примере.

^^^[![](icons/coffee.png) 11]
~~~js
Array.prototype.idempotence = function (func) {
  const funcArg = func.toString()
  try {
    var sourceData = JSON.stringify(this)
  } catch (err) {
    console.warn(err)
    return null
  }

  const self = this.__proto__

  if (!self.funcs) self.funcs = []
  if (!self.data) self.data = []
  if (!self.results) self.results = []

  if (!self.funcs.includes(funcArg)) self.funcs.push(funcArg)
  if (!self.data.includes(sourceData)) self.data.push(sourceData)

  const index = self.funcs.indexOf(funcArg)
  const num = self.data.indexOf(sourceData)

  if (!self.results[num]) self.results[num] = []

  if (!self.results[num][index]) {
    const result = []
    for (const item of this) {
      result.push(func(item))
    }
    self.results[num][index] = result
  }

  return self.results[num][index]
}
~~~
^^^

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]
numbers.idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
[25, 16, 9, 49, 81, 64, 4].idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
numbers.idempotence(item => item + Math.floor(item + Math.random() * 100))
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

~~~js
const randomize = item => item + Math.floor(item + Math.random() * 100)
[25, 16, 9, 49, 81, 64, 4].idempotence(randomize)
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

_____________________________________________

## ![ico-25 icon] Ідемпотентність

^^Тобто, якщо викликати метод з одним і тим же масивом і функцією багаторазово, результат завжди буде однаковим.^^

◘◘![ico-20 cap] **11**◘◘
~~~js
const jobs = [
  'developer',
  'worker',
  'salesman',
  'manager'
]

const users = [
  { name: 'Piter', job: 1 },
  { name: 'Helen', job: 2 },
  { name: 'Robert', job: 0 },
  { name: 'Michael', job: 1 },
  { name: 'Andrew', job: 0 },
  { name: 'Mary', job: 2 },
  { name: 'Gregory', job: 3 },
]

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  for (const item of this) result.push(func.call(context, item))
  return result
}

function showUser (user) {
  return `<p>${user.name}: ${this[user.job]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = users.iterate(showUser, jobs).join('')
~~~

_____________________________

В об'єктно-орієнтованих мовах ідемпотентність методів практично недосяжна, особливо коли аргументи функції мають посилальний тип даних.

◘◘![ico-20 cap] **12**◘◘

~~~js
const salary = [4000, 3200, 4500, 2800, 3500, 2400, 3700]

const workers = ['Piter', 'Helen', 'Robert', 'Michael', 'Andrew', 'Mary', 'Gregory']

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  index = 0
  for (const item of this) result.push(func.call(context, item, index++))
  return result
}

function showSalary (worker, index) {
  return `<p>${worker}: ${this[index]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = workers.iterate(showSalary, salary).join('')
~~~

__________________________________________

◘◘![ico-20 cap] **13**◘◘

~~~js
const arr = [
  'google',
  'service',
  'user',
  () => Math.round(Math.random() * 1000),
  false
]

function test (elem, index, ref) {
  typeof elem === 'function' && ref.splice(index, 1, elem())
  return ref[index]
}

Array.prototype.iterate = function (func) {
  var res = []
  for (var item of this) res.push(func(item, this.indexOf(item), this))
  return res
}

arr.iterate(test)
~~~
__________________________________________


Оскільки масиви мають посилальний тип даних, то ітеруючі методи масивів від початку працюють із посиланням.

◘◘![ico-20 cap] **14**◘◘

~~~js
const companList = ['Google', 'Mozilla', 'Microsoft']
const browsers = ['Chrome', 'Firefox', 'Edge']

function test (prop, index) {
  this[index] = { [prop] : this[index] }
}

Array.prototype.iterate = function (func, context) {
  var index = index && typeof index === 'number' ? index : 0
  for (var item of this) func.call(context, item, index++)
}

companList.iterate(test, browsers)

console.log(browsers)
~~~

Результат у консолі:

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {Google: "Chrome"}
  ► 1: {Mozilla: "Firefox"}
  ► 2: {Microsoft: "Edge"}
    length: 3
  ► __proto__: Array(0)
~~~

________________________________________________________________


Спробуємо створити ідемпотентний метод:

________________________________________________________________

[![ico-30 hw] Quiz](quiz/arrayIterationMethods)
