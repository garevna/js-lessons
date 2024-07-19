# ![ico-35 study] Итерирующие методы массивов

Эти методы учат нас мыслить в рамках **функциональной парадигмы**.

Все итерирующие методы массивов являются **функциями высшего порядка**.
![ico-20 exclamation] Обязательным первым аргументом каждого метода является **функция**.
![ico-20 warn] В случае, если при вызове метода первым аргументом не будет функция, то будет сгенерировано исключение **TypeError**.
^^Второй аргумент метода является опциональным, это ссылка на контекст вызова **функции-аргумента**.^^

По сути, итерирующие методы являются функциональной "оберткой" для цикла **~for...of~**.
Каждый метод последовательно перебирает элементы массива от первого до последнего, и на каждой итерации вызывает переданную ему **функцию-аргумент.**

**Функция-аргумент** метода имеет три опциональных формальных параметра:
1) текущий элемент массива.
2) индекс текущего элемента массива.
3) ссылка на итерируемый массив.

[►►►Заглянем глубже?►►►](page/Array-iterating-methods-theory.md)

_____________________________________________________

## ![ico-30 icon] forEach()

![ico-20 warn] Этот метод не возвращает никакого значения.
Давайте сравним работу этого метода с работой цикла **~for...of~**.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach(currentName => console.log(currentName))

for (const currentName of people) console.log(currentName)
~~~

^^Здесь мы итерируем массив  **people**  с помощью метода  **~forEach~**^^.
^^Методу  **~forEach~**  в качестве аргумента  передается анонимная функция:^^

~~~js
currentName => console.log(currentName)
~~~

В этом примере результат работы метода **~forEach~** и оператора цикла **~for...of~** будет идентичным.
Однако в различных ситуациях нам удобнее использовать либо оператор **~for...of~**, либо метод **~forEach~**.
Поскольку метод **~forEach~** не возвращает никакого значения, использовать его в цепочных вычислениях вроде бы нет смысла.
Тогда в чем же его преимущество перед оператором **~for...of~**?

Если вы научитесь мыслить в функциональной парадигме, то преимущество метода перед оператором станет для вас очевидным.
Но даже если не говорить о том, насколько методы удобнее операторов, есть ряд дополнительных премуществ метода **~forEach~** перед циклом **~for...of~**.
Например, метод **~forEach~** передает **функции-аргументу** не только значение элемента массива, но и его индекс.

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

![ico-25 warn] Если вы еще не знакомы с асинхронщиной (промисами и асинхронными функциями), то вернитесь к следующему примеру позже.

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

В этом примере мы имитируем задержку, связанную с получением данных юзеров с удаленного сервера, с помощью функции **~show~**, которая возвращает промис.

Передавая методу **~forEach~** асинхронную анонимную функцию, мы обеспечиваем последовательный вывод имен юзеров из массива.

~~~console
Mary
Robert
Stephan
Piter
~~~

Теперь воспользуемся оператором **~for...of~**:

~~~js
for (const user of users) {
  show(user).then(name => console.log(name))
}
~~~

Как мы видим, имена юзеров выводятся в произвольном порядке:

~~~console
Stephan
Mary
Robert
Piter
~~~

И для того, чтобы сохранить порядок имен юзеров в соответствии с их индексом в массиве, нам приходится "заворачивать" оператор цикла в асинхронную функцию:

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

Возникает вопрос - а зачем это делать, если у нас уже есть функциональная "обертка" для цикла **~for...of~**?
_____________________

Надо отметить также, что иногда использование оператора цикла **~for...of~** бывает удобнее, чем вызов метода **~forEach~**.
Например, если вы хотите использовать операторы **~continue~** | **~break~**, то ваш выбор - оператор **~for...of~**.

__________________________________________

Третий формальный параметр **функции-аргумента** является довольно проблемным.
Он является ссылкой на исходный массив.
А мы знаем, что

☼☼☼ ссылка - это отмычка ☼☼☼

Передача ссылки создает возможность мутировать исходный массив:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

^^т.е. исходный массив  **numbers**  был изменен^^

Предоставляя **функции-аргументу** метода доступ к исходному массиву по ссылке, мы создаем возможность возникновения **побочных эффектов**, связанных с возможными мутациями исходного массива.

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const users = ['Mary', 'Piter', 'Robert', 'Stephan']

users.forEach((name, index, arr) => console.log(arr.pop()))
~~~

Возможно, вы ожидали увидеть полный список юзеров в консоли, но увидели только два последних имени из массива:

~~~console
Stephan
Robert
~~~

При этом в массиве users остались только два первых имени:

~~~js
console.log(users)
~~~

~~~console
► (2) ['Mary', 'Piter']
~~~

Это побочный эффект мутации массива users.
На каждой итерации длина массива уменьшается на 1, а метод **~forEach~** сравнивает текущее значение индекса с длиной массива, и останавливает цикл, когда значение индекса становится равно длине массива. После двух итераций значение индекса будет 2, и длина массива тоже будет 2.

___________________________

Мутации исходного массива могут возникать даже без передачи ссылки на исходный массив. Это связано с тем, что если элементы массива имеют **ссылочный тип данных**, то **функция-аргумент** метода получит не значение, а ссылку, и это создает возможность мутаций элементов массива по ссылке.

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

### ![ico-25 icon] Контекст вызова функции-аргумента

Метод  **~forEach~**, как, впрочем, и почти все остальные итерирующие методы массивов, может принимать дополнительный аргумент - ссылку на контект вызова **функции-аргумента**.

![ico-20 warn] Однако при этом функция, передаваемая методу в качестве аргумента, не должна быть стрелочной.


◘◘![ico-25 cap] ** 7**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

^^В результате выполнения этого кода в консоли будет массив **~intervals~**.^^
^^Фактически передача методу второго аргумента равносильна биндингу контекста:^^

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

^^Поэтому при использовании стрелочной функции, контекст которой изменить невозможно, в консоли мы увидим объект **~window~**^^

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

_____________________

^^Предположим, мы хотим передавать ссылку на массив **~res~**, куда следует помещать результаты вычислений:^^

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

^^Такие операции лишены особого смысла, поскольку для этого у нас есть метод <a href="#map()">![ico-20 link]**map**</a>, который будет рассмотрен далее.^^

_________________________________

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

### ![ico-20 icon] Примеры с методом forEach

◘◘![ico-25 cap] **10**◘◘

~~~js
['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .forEach((item, index) => Object.assign(window, {
      [item]: arg => typeof arg === 'function' ? arg(index) : index
  }))
~~~

В этом примере мы создаем с помощью метода **forEach** массив функций с именами
"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"

Каждая из этих функций проверяет тип переданного ей аргумента **_arg_**,
и если это ~function~, то вызывает **_arg_**,
передавая ей в качестве аргумента свой порядковый номер (0, 1, 2 ...),
в противном случае возвращает число - свой порядковый номер (0, 1, 2 ...).

{{{Array-iteration-methods-2.js}}}


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

В этом примере мы создаем еще один массив функций с именами "plus", "minus", "divide", "multiply".
Каждая из этих функций имеет два формальных параметра,
поэтому первым делом она проверяет длину объекта arguments,
и если длина равна 2, то выполняет соответствующую операцию с аргументами
(складывает, вычитает, умножает, делит).
В протичном случае возвращает каррированную функцию,
у которой первый аргумент уже "прошит",
и которую можно вызывать с одним (недостающим вторым) аргументом.

{{{Array-iteration-methods-3.js}}}

____________________

![ico-25 memo] Упражнение

^^Разберитесь самостоятельно, что делает следующий код:^^

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

______________________

## ![ico-30 icon] map()

Этот метод возвращает новый массив.
Элементами нового массива будут значения, которые возвращает **функция-аргумент** на каждой итерации.
Функция-аргумент метода должна возвращать новое значение (должен присутствовать оператор  ~return~).

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

Так же, как и в методе **~forEach()~**, в методе **~map()~**, функция-аргумент имеет три опциональных формальных параметра.
![ico-20 green-ok] Аргумент **arr** будет содержать ссылку на исходный массив.
![ico-20 green-ok] Аргумент **index**  - это счетчик итераций, или индекс текущего элемента итерируемого массива.

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

### ![ico-20 icon] Примеры с методом map

Перейдите по [![ico-20 link] **_ссылке_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )

В консоли новой вкладки выполните код:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
location.search
  .slice(1).split(',')
  .map(x => ({ [x.split('=')[0]] : x.split('=')[1] }))
~~~

У вас должен получиться результат:

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "garevna"}
  ► 1: {date: "10.07.2018"}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________

Перейдите по [![ico-20 link] **_ссылке_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )

Теперь в консоли новой вкладки объявите функцию:

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

Вызовите функцию  **~getSearchObject~**.

У вас должен получиться результат:

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

Метод **~filter()~** итерирует массив, проверяя выполнение заданного условия для каждого элемента массива.
Метод возвращает новый массив.
В результирующий массив попадут только те элементы, которые удовлетворяют условию фильтрации.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sourceArray = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Shveik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

var usa = sourceArray.filter(x => x.country === 'USA')

console.log(usa)

~~~

◘◘**Результат**◘◘

~~~console

▼ (3) [{…}, {…}, {…}]
  ► 0: {name: "Duke Shane", country: "USA"}
  ► 1: {name: "Margaret Johnson", country: "USA"}
  ► 2: {name: "Robert Trump", country: "USA"}
    length: 3
  ► __proto__: Array(0)
~~~

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

Метод ищет в массиве и возвращает первый найденный элемент, удовлетворяющий заданному условию.

Если такого элемента в массиве нет, возвращает ~undefined~.

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

◘◘**Результат**◘◘

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

Подобно методу ~find()~, ищет в массиве первый элемент, удовлетворяющий заданному условию.
Однако возвращает не сам элемент, а его индекс.

Если такого элемента в массиве не обнаружено, возвращает **-1**.

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

Очевидное преимущество перед методом **~indexOf~** заключается в том, что можно работать с массивами элементов, имеющих **ссылочный тип данных**.
В данном примере элементами массива являются объекты, и метод **~indexOf~** к этому массиву неприменим.

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

Осуществляет проверку массива на предмет вхождения элементов, **не** удовлетворяющих заданному условию.

Возвращает логическое значение:
  • если все элементы массива благополучно прошли проверку - **~true~**.
  • если хотя бы один элемент не прошел проверку - **~false~**.

Функция, передаваемая методу в качестве первого аргумента, проверяет выполнение заданного условия для каждого элемента массива, и возвращает логическое значение.

Массив итерируется до тех пор, пока функция не вернет значение **~false~**.
В этом случае метод вернет **~false~**.

Если функция вернет **~true~** для всех элементов массива, метод вернет **~true~**.

◘◘![ico-25 cap] **every**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.every(x => x.country === 'Ukraine')

console.log(res)
~~~

^^В этом примере массив  **people**  проверяется на наличие в нем жителей **не** Украины.^^
^^Переменная  **res**  будет иметь значение ~false~, поскольку в массиве есть элементы, не удовлетворяющие заданному условию.^^

______________________________________________

## ![ico-25 icon] some()

Осуществляет проверку массива на предмет вхождения элементов, удовлетворяющих заданному условию.

Возвращает логическое значение (найдено / не найдено).

**Функция-аргумент** проверяет выполнение заданного условия для каждого элемента массива, и возвращает логическое значение.

Массив итерируется до тех пор, пока функция не вернет значение **~true~**.
В этом случае метод вернет  **~true~**.

Если функция вернет **~false~** для всех элементов массива, метод вернет **~false~**.

◘◘![ico-25 cap] **some**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Ukraine' },
  { name: 'Duke Shane', country: 'USA' },
  { name: 'Demid Schweik', country: 'France' },
  { name: 'Семен Картко', country: 'Ukraine' },
  { name: 'Margaret Johnson', country: 'USA' },
  { name: 'Филипп Данько', country: 'Ukraine' },
  { name: 'Robert Trump', country: 'USA' },
]

const res = people.some(x => x.country === 'Pakistan')

console.log(res)
~~~

^^В этом примере массив  **people**  проверяется на наличие в нем жителей Пакистана.^^
^^Переменная  **res**  будет иметь значение ~false~, поскольку таких "персонажей" в массиве нет.^^

^^Метод **some** можно заменить следущим кодом:^^

~~~js
const res = people
  .map(human => human.country)
  .includes('Pakistan')
~~~
или таким:
~~~js
people
  .filter(x => x.country === 'Pakistan')
  .length > 0
~~~

____________________________

## ![ico-25 icon] reduce()

Этот метод отличается от своих "коллег" списком формальных параметров **функции-аргумента**.
Конкретно - первым формальным параметром **функции-аргумента** теперь будет не текущий элемент массива, а **переменная-аккумулятор**.
Значение этой переменной и будет результатом работы метода.

Гибкость и универсальность этого метода заключается в том, что результат его работы может быть чем угодно: числом, массивом, объектом, строкой, логическим значением и т.д.
Этот результат "накапливается" в **переменной-аккумуляторе**.

Как и все уже рассмотренные итерирующие методы массивов, метод **~reduce~** в качестве первого обязательного аргумента получает функцию.
Однако второй аргумент метода не является ссылкой на контекст вызова **функции-аргумента**.
У него совсем другое назначение: он задает стартовое значение **переменной-аккумулятора**.

![ico-20 warn] **Если стартовое значение аккумулятора не установлено, то в качестве стартового значения аккумулятора будет использовано значение первого элемента массива**.

^^Т.е. если мы не передадим методу второй аргумент, то он установит стартовое значение **переменной-аккумулятора** равным значению первого элемента итерируемого массива.^^


![ico-25 cap] Рассмотрим простейший пример:

~~~js
[1, 2, 3, 4, 5].reduce(accumulator => accumulator * 2) // 16
~~~

Поскольку стартовое значение аккумулятора не задано, то оно будет равно значению первого элемента массива, т.е. ** 1**.
Цикл будет "крутиться" до последнего элемента массива, но сами элементы не используются **функцией-аргументом**:

~~~js
accumulator => accumulator * 2
~~~

Поэтому на каждой итерации значение **переменной-аккумулятора** будет просто удваиваться:

•• 1 * 2 * 2 * 2 * 2 = 16 ••

_____________________________________

![ico-25 cap] Теперь пригласим на эту тусовку второй формальный параметр **функции-аргумента**:

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item) // 120
~~~

Стартовое значение **переменной-аккумулятора** будет ** 1** ^^(значение первого элемента массива)^^, но на каждой итерации **переменная-аккумулятор** будет умножаться на значение текущего элемента массива:

•• 1 * 2 * 3 * 4 * 5 = 120 ••

____________________________

![ico-25 cap] Пора ввести в бой стартовое значение **переменной-аккумулятора**:

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => accumulator * item, 5) // 600
~~~

•• 5 * 1 * 2 * 3 * 4 * 5 = 600 ••

Вот такая замечательная машинка теперь в нашем распоряжении.

_________________________________

![ico-25 cap] Копнем глубже. Задействуем третий формальный параметр **функции-аргумента**:

~~~js
[10, 2, 3, 4, 5].reduce((accumulator, item, index) => accumulator * item + index) // 1319
~~~

Здесь метод **~reduce~** выполняет следующую последовательность вычислений:

•• ((((10 + 0) * 2 + 1) * 3 + 2) * 4 + 3) * 5 + 4 = 1319 ••

_________________________________________

До сих пор мы рассматривали массив чисел и числовое значение **переменной-аккумулятора**.

Однако потенциал этого метода гораздо больше, и его возможности гораздо шире.

### ![ico-20 icon] Примеры с методом reduce()

Давайте сведем массив строк к объекту.
Для этого нам обязательно нужно указать стартовое значение аккумулятора, поскольку значением первого элемента массива будет строка, а мы хотим получить объект.


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

Теперь сведем массив объектов к строке.

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

Теперь посчитаем, сколько раз каждый символ встречается в строке, и вернем объект:

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

Теперь посчитаем, сколько жителей каждой страны в списке.

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

Движок использует экспоненциальную форму представления малых чисел, т.е. вместо **~0.0000005~** будет **~5e-7~**.
Для больших чисел происходит то же самое, т.е. вместо **~5000000000000000000000~** будет **~5e+21~**.

Отсюда:

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

Функция, передаваемая методу **reduce** в качестве первого обязательного аргумента,
как и в случае других итерирующих методов, может принимать дополнительные аргументы - индекс текущего элемента массива и ссылку на сам исходный массив.
Благодаря ссылке, мы можем манипулировать исходным массивом, что делает его мутабельным.

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

Проследим, как будет работать метод **~reduce~**, если передать ему первым аргументом **~Math.sqrt~**.
Библиотечная функция **~Math.sqrt~** принимает всего 1 аргумент (число), и возвращает квадратный корень из полученного аргумента.
Если при вызове мы не передаем методу **~reduce~** второй аргумент, он будет использовать в качестве стартового значения аккумулятора значение первого элемента массива.
На каждой итерации это значение будет заменяться его квадратным корнем.
Остальные элементы массива в вычислениях участвовать не будут, поскольку **~Math.sqrt~** принимает всего 1 аргумент, и это будет текущее значение переменной-аккумулятора.

◘◘![ico-20 cap] ** 8**◘◘

~~~js
;[625, 5, 10].reduce(Math.sqrt) // 5
~~~

В этом примере из числа 625 дважды был извлечен квадратный корень:
••625 -> 25 -> 5••

Почему дважды? Потому, что всего элементов в массиве 3, но первый элемент стал стартовым значением переменной-аккумулятора.

Если мы добавим вот такой метод **~root~** в прототип конструктора **~Array~**, то результат его вызова будет тем же:

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

В этом примере мы задаем стартовое значение **переменной-аккумулятора** (625 * 625) вторым аргументом метода **~reduce~**.
Поэтому число итераций (т.е. сколько раз будет извлечен корень квадратный из **переменной-аккумулятора**) будет равно числу элементов массива.

{{{Array-iteration-methods-reduce-7.js}}}

_______________________________

### Math.pow

Теперь будем передавать методу **~reduce~** первым аргументом библиотечную функцию **Math.pow** (возведение в степень).
Эта функция принимает два числовых аргумента: число, которое нужно возвести в степень, и значение степени.

Если мы не передаем стартовое значение **переменной-аккумулятора** вторым аргументом метода **~reduce~**, то в этом качестве будет использовано значение первого элемента массива.
Остальные элементы массива будут значениями степени, в которую нужно возвести текущее значение **переменной-аккумулятора**.

Если же мы передаем стартовое значение **переменной-аккумулятора**, то все элементы массива будут рассматриваться как степень, в которую нужно возвести текущее значение **переменной-аккумулятора**.

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

Если мы добавим в прототип конструктора **~Array~** метод **~pow~**, то этот метод будет работать аналогично методу **~reduce~**, вызванному с библиотечной функцией **~Math.pow~** и без второго аргумента:

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

### ![ico-25 hw] Тесты

Что вернут следующие выражения:

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

Число итераций будет заведомо больше, чем число элементов массива.

Метод сортирует массив согласно заданному условию сортировки.
Условие сортировки проверяет передаваемая методу функция-аргумент.
_Функция-аргумент имеет два формальных параметра, значения которых используются для сравнения_.

Функция возвращает одно из трех значений:

|  0 | элементы совпали (равны)       |
|  1 | первый аргумент больше второго |
| -1 | второй аргумент больше первого |

На основании возвращенного функцией значения метод меняет порядок следования элементов в массиве.

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

◘◘**Результат**◘◘

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

^^Для понимания механизма сортировки выведем в консоль значения сравниваемых элементов массива на каждой итерации:^^

◘◘![ico-20 cap] ** 2**◘◘
~~~js
var resArray = sourceArray
  .sort(function (x, y) {
    console.log(`${x.title} - ${y.title} = ${x.value - y.value}`)
    return  x.value - y.value
  })
~~~

◘◘**Результат**◘◘

~~~console
fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300
~~~

^^^[Логирование]
^^Создадим массив **log**, в котором будем логировать все операции в процессе сортировки массива.^^
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

Итак, в отличие от других итерирующих методов, функция, передаваемая методу в качестве единственного аргумента, принимает строго два параметра.

![ico-20 warn] Этому методу нельзя передать ссылку на контекст вызова.

![ico-20 require] Самостоятельно попробуйте нарисовать блок-схему алгоритма сортировки массива методом  **~sort()~**.

__________________________

## ![ico-25 icon] flatMap()

Есть строка **cookie**:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

Сплитим строку **cookie** и применим метод **~map~** к полученному массиву.

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

Мы получили массив, элементы которого являются массивами

Теперь применим метод **~flatMap~** к массиву **cookie**

~~~js
console.log(cookie.split('; ').flatMap(item => item.split('='))
~~~

◘◘**^^Результат^^**◘◘

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

Мы получили "плоский" массив.

Итак, используя одну и ту же функцию:

~~~js
function (item) {
  return item.split('=')
}
~~~

мы получили в первом случае массив массивов, а во втором - "плоский" массив

____________________________________________________

## ![ico-25 icon] keys()

**Генератор**.
**Возвращает объект _итератора_**.

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
**Возвращает объект _итератора_**.

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

## ![ico-30 icon] Примеры и тесты

_________________________________________

### ![ico-25 cap] Сумма кеша на картах

Создадим массив банковских карт, и с помощью метода **~reduce~** посчитаем сумму средств на всех картах:

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

Создадим новую карту, на которую аккумулируем остатки на счетах все карт:

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

Для чистоты результата дополнительно обнулим остатки на счетах других карт:

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

**Теперь исходный массив карт будет:**

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

### ![ico-25 cap] Чистка от дублей

Предположим, что у нас есть массив юзеров, и мы решили получить массив всех специальностей, которые есть у этих юзеров.
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

Однако, как мы видим, многие специальности будут дублироваться, что нам абсолютно не нужно.

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

Нужно удалить дублирующиеся элементы массива **~specialities~**.

![ico-20 warn] Сразу заметим, что проще всего достичь этого с помощью конструктора **~Set~**:

~~~js
Array.from(new Set(specialities))
~~~

Но мы решили пойти более сложным путем ![ico-25 wink].

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

### ![ico-25 cap] Число отрезков в интервале

Есть несколько отрезков на числовой оси:

~~~js
const intervals = [[10, 20], [4, 18], [7, 10], [5, 16], [9, 13], [11, 15], [7, 15], [10, 12], [12, 19]]
~~~

Для каждого отрезка нужно посчитать, сколько отрезков оказалось внутри него.

Для упрощения кода добавим в прототип конструктора **~Array~** метод **~testSegment~**:
~~~js
Array.prototype.interior = function (interval = [0, 1]) {
  return this[0] < interval[0] && this[1] > interval[1]
}
~~~
Теперь можно сравнить два отрезка обчень просто:
~~~js
[18, 35].interior([4, 18]) // false
[18, 35].interior([20, 28]) // true
~~~
Теперь мы можем выполнить поставленную задачу:
~~~js
intervals
  .map((segment, index, array) => array.filter(interval => segment.interior(interval)).length)
~~~

◘◘**^^Result^^**◘◘
~~~console
► (9) [2, 6, 0, 5, 1, 0, 2, 0, 0]
~~~

__________________________

### ![ico-25 cap] Проверка парных скобок

Задача: проверить парность и правильность расстановки скобок.

Например, валидация строки "({})[([])]" должна пройти нормально (вернуть ~true~),
а валидация строки "({(})[([)])]" должна вернуть ~false~.

Для удобства использования создадим наследуемый метод строк:

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

Перейдите по [**_ссылке_**](https://en.wikipedia.org/wiki/Idempotence ) и в консоли страницы выполните код:

~~~js
Array.from(document.getElementsByClassName('interlanguage-link'))
  .map(item => getComputedStyle(item))
  .forEach(item => console.log(item['font-family']))
~~~

________________________________________________

[![ico-30 hw] **Тесты**](quiz/arrayIterationMethods)
