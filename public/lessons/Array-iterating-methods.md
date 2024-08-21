# ![ico-30 study] Итерирующие методы массивов

_____________________________________________________

[►►►Принцип работы►►►](page/Array-iteration-methods-theory.md)

_____________________________________________________

### ![ico-25 icon] forEach()

![ico-20 warn] Этот метод не возвращает никакого значения
Он просто вызывает переданную ему функцию с каждым элементом массива
^^Функция-аргумент метода имеет три формальных параметра^^
^^Первый - обязательный, два других - опциональные^^
^^1) текущий элемент массива^^
^^2) идекс текущего элемента массива^^
^^3) сам итерируемый массив^^

____________

^^Рассмотрим самый простой вариант использования метода **~forEach()~**^^

◘◘![ico-20 cap] **forEach (1)**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach((currentValue, index, array) => console.log(`${index}: ${currentValue}`))
~~~

^^Здесь мы итерируем массив  **people**  с помощью метода  **~forEach~**^^
^^Методу  **~forEach~**  в качестве аргумента  передается анонимная функция:^^

~~~js
(currentValue, index, array) => console.log(`${index}: ${currentValue}`)
~~~

^^У этой анонимной функции может быть  три аргумента:^^
^^1) текущий элемент массива^^
^^2) идекс текущего элемента массива^^
^^3) сам итерируемый массив^^

^^Обязательным является только первый аргумент^^

^^Например, чтобы вывести в консоль все элементы массива  **people**, мы можем использовать метод  **~forEach~** следующим образом:^^

~~~js
people.forEach(x => console.log(x))
~~~

Результат работы предыдущего кода будет идентичен результату работы обычного оператора ~for ... of~:

~~~js
for (const x of people) console.log(x)
~~~

__________________________________________

^^Для чего могут понадобиться второй и третий аргументы анонимной функции:^^

^^предположим, нам нужно произвести вычисления с участием индекса элемента массива^^
^^при этом мы хотим добавить результаты вычислений в исходный массив ( изменить его )^^

◘◘![ico-25 cap] **forEach (2)**◘◘

~~~js
const  numbers = [8, 4, 9, 7], res = []

numbers.forEach((numb, ind, res) => res.push(numb * ind))

console.log(numbers) // [ 8, 4, 9, 7, 0, 4, 18, 21 ]
~~~

^^или мы хотим удвоить все значения элементов масива:^^

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

^^т.е. исходный массив  **numbers**  был изменен^^
^^Теперь получим результаты вычислений в новый массив  **res**^^

~~~js
const  numbers = [8, 4, 9, 7], res = []

numbers.forEach((numb, ind) => res.push(numb * ind))

console.log(res)
console.log(numbers)
~~~

^^Теперь  результаты вычислений будут помещены в массив  **res**,  а исходный  массив  **numbers**  останется неизмененным^^

_________________________________________________

^^^[Контекст вызова]

Метод  **~forEach~**  может принимать дополнительный аргумент - ссылку на контект вызова
![ico-20 warn] Однако при этом функция, передаваемая методу в качестве аргумента, не должна быть стрелочной


◘◘![ico-25 cap] **forEach (3)**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

^^В результате выполнения этого кода в консоли будет массив **~intervals~**^^
^^Фактически передача методу второго аргумента равносильна биндингу контекста:^^

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

^^Поэтому при использовании стрелочной функции:^^

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

^^контекст которой изменить невозможно, в консоли мы увидим объект **~window~**^^

^^^

_____________________

^^^[forEach (4)]

^^Предположим, мы хотим передавать ссылку на массив **~res~**, куда следует помещать результаты вычислений:^^

~~~js
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

^^Чтобы обеспечить гибкость, т.е. возможность динамически изменять контекст вызова, а не устанавливать его единожды и навеки, завернем метод **~forEach~** в функцию  **~createNewArray~**^^

^^У функции **~createNewArray~** будет два формальных параметра:^^
^^   - исходный массив     ( **_~sourseArray~_** )^^
^^   - массив результатов ( **_~resultArray~_** )^^

^^Функция **~createNewArray~** будет передавать методу **~forEach~** не только функцию, которая будет вызвана на каждой итерации цикла, но и ссылку на контекст вызова этой функции ( ~this~ )^^

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

function createNewArray (sourseArray, resultArray) {
  sourseArray.forEach(function (numb, ind) {
    this.push(numb * ind)
  }, resultArray)
}

createNewArray(numbers, res)
console.log(res)
console.log(numbers)
~~~

^^В момент вызова значение формального параметра **~resultArray~** будет ссылкой на массив **~res~**^^
^^Таким образом, в результате вызова:^^

~~~js
createNewArray(numbers, res)
~~~

^^внутри функции, передаваемой методу **~forEach~** в качестве первого аргумента, ~this~  будет указывать на массив  **~res~**^^

^^Теперь функция  **~createNewArray~**  может быть применена к различным массивам:^^

~~~js
const bug = [10, 1, 3, 8]
const fug = []

createNewArray(bug, fug)
~~~

^^^

_____________________

^^^[forEach (5)]

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
в противном случае возвращает число - свой порядковый номер (0, 1, 2 ...)

~~~js
zero(Math.sin)  // 0
zero(Math.cos)  // 1

four(Math.sqrt) // 2
nine(Math.sqrt) // 3

nine()  // 9
~~~

^^^


^^^[forEach (6)]

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

В этом примере мы создаем еще один массив функций с именами "plus", "minus", "divide", "multiply"
Каждая из этих функций имеет два формальных параметра,
поэтому первым делом она проверяет длину объекта arguments,
и если длина равна 2, то выполняет соответствующую операцию с аргументами
(складывает, вычитает, умножает, делит),

~~~js
minus(7, 2)    // 5

divide(9, 3)   // 3

multiply(5, 3) // 15
~~~

в протичном случае возвращает каррированную функцию,
у которой первый аргумент уже "прошит",
и которую можно вызывать с одним (недостающим вторым) аргументом

~~~js
multiply(5)(3)  // 15

divide(9)(3)
~~~

Теперь мы можем использовать первую группу функций в сочетании с функциями второй группы:

~~~js
seven(plus(two()))        // 9

five(minus(nine()))       // 4

three(multiply(eight()))  // 24
~~~

^^^
____________________

^^^[Упражнение (forEach)]

^^Разберитесь самостоятельно, что делает следующий код:^^

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

^^^

______________________

### ![ico-25 icon] map()

Этот метод вызвращает новый массив, полученный из элементов исходного массива  после применения к каждому из них  функции, переданной методу в качестве аргумента

Функция, передаваемая в качестве аргумента метода, должна возвращать новое значение ( обязательно должен присутствовать оператор  ~return~ )

Значение, возвращаемое функцией на каждой итерации, будет помещаться в результирующий массив

◘◘![ico-20 cap] **map (1)**◘◘

~~~js
var first = [8, 4, 9, 7]

var res = first.map(currentValue => currentValue * 2)

console.log(res)
~~~

^^В этом примере в массив  **res**  попадут все удвоенные значения элементов исходного массива  **first**^^

Так же, как и в методе **~forEach()~**,  в  методе  **~map()~**  передаваемая методу в качестве аргумента  функция может принимать три аргумента

~~~js
function (currentValue, index, arr) {
  console.log(arr)
  return  currentValue * index
}
~~~

Второй  и третий  аргументы необязательны, и имеют то же содержание, что и в методе **~forEach()~**

![ico-20 green-ok] Аргумент  **arr**  будет содержать ссылку на исходный массив, к которому применяется метод
![ico-20 green-ok] Аргумент  **index**  - это счетчик итераций, или индекс текущего элемента итерируемого массива

______________________________________________

Перейдите по [![ico-20 link] **_ссылке_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018)

В консоли новой вкладки выполните код:

◘◘![ico-20 cap] **map (2)**◘◘

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

Перейдите по [![ico-20 link] **_ссылке_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018)

Теперь в консоли новой вкладки объявите функцию:

◘◘![ico-20 cap] **map (3)**◘◘

~~~js
function getSearchObject () {
  var obj = {}
  location.search.slice(1).split(',')
    .map(x => x.split('='))
    .map (function (item) { this[item[0]] = item[1] }, obj)
  return obj
}
~~~

Вызовите функцию  **getSearchObject()**

У вас должен получиться результат:

~~~console
▼ {name: "garevna", date: "10.07.2018"}
    date: "10.07.2018"
    name: "garevna"
  ► __proto__: Object
~~~

______________________________________________

◘◘![ico-20 cap] **map (4)**◘◘

~~~js
['plus', 'minus', 'divide', 'multiply']
  .map((item, index) => window[item] = function () {
    const operations = ['+', '-', '/', '*']

    return arguments.length === 2
      ? eval(`arguments[0] ${operations[index]} arguments[1]`)
      : window[item].bind(null, arguments[0])
  })
~~~

______________________________________________

◘◘![ico-20 cap] **map (5)**◘◘

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

### ![ico-25 icon] filter()

Метод **~filter()~** итерирует массив, проверяя выполнение заданного условия для каждого элемента массива
Метод возвращает новый массив
В результирующий массив попадут только те элементы, которые удовлетворяют условию фильтрации

◘◘![ico-20 cap] **filter**◘◘

~~~js
var sourceArray = [
  { name: 'Николай Василенко', country: 'Украина' },
  { name: 'Дюк Шейн', country: 'США' },
  { name: 'Демид Швейк', country: 'Франция' },
  { name: 'Семен Картко', country: 'Украина' },
  { name: 'Маргарет Джонсон', country: 'США' },
  { name: 'Филипп Данько', country: 'Украина' },
  { name: 'Роберт Трамп', country: 'США' },
]

var usa = sourceArray.filter(x => x.country === 'США')

console.log(usa)

~~~

◘◘**Результат**◘◘

~~~console

▼ (3) [{…}, {…}, {…}]
  ► 0: {name: "Дюк Шейн", country: "США"}
  ► 1: {name: "Маргарет Джонсон", country: "США"}
  ► 2: {name: "Роберт Трамп", country: "США"}
    length: 3
  ► __proto__: Array(0)
~~~

_________________________________

### ![ico-25 icon] find()

Метод ищет в массиве и возвращает первый найденный элемент, удовлетворяющий заданному условию

Если такого элемента в массиве нет, возвращает ~undefined~

◘◘![ico-20 cap] **find (1)**◘◘

~~~js
var cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.find(card => card.cash > 4000)
~~~

^^Этот код вернет объект^^

◘◘**Результат**◘◘

~~~console

▼ { num: "457811714", cash: 5000 }
    cash: 5000
    num: "457811714"
  ► __proto__: Object

~~~

___________________________

Попробуйте самостоятельно разобраться, что будет делать функция **getTransactionMode**:

◘◘![ico-20 cap] **find (2)**◘◘

~~~js
const getTransactionMode = (() => {
  const operations = {
    readwrite: ['add', 'put', 'delete', 'clear'],
    readonly: ['get', 'getAll', 'getKey', 'getAllKeys']
  }
  return function (operation) {
    for (const mode in operations) {
      const res = operations[mode]
        .find(item => item === operation)
      if (res) return mode
    }
    return null
  }
})()

getTransactionMode('add')          // 'readwrite'
getTransactionMode('getAllKeys')  // 'readonly'
~~~

_________________________

### ![ico-25 icon] findIndex()

Подобно методу ~find()~, ищет в массиве первый элемент, удовлетворяющий заданному условию
Однако возвращает не сам элемент, а его индекс

Если такого элемента в массиве не обнаружено, возвращает **-1**

◘◘![ico-20 cap] **findIndex**◘◘

~~~js
const cards = [
  { num: '457892425', cash: 1100 },
  { num: '457812840', cash: 3000 },
  { num: '457855780', cash: 1200 },
  { num: '457811714', cash: 5000 }
]

cards.findIndex(card => card.cash > 1500)  // 1
~~~

_______________________

### ![ico-25 icon] every()

Осуществляет проверку массива на предмет вхождения элементов, не удовлетворяющих заданному условию

Возвращает логическое значение:
  • если все элементы массива благополучно прошли проверку - ~true~
  • если хотя бы один элемент не прошел проверку - ~false~

Функция, передаваемая методу в качестве первого аргумента, проверяет выполнение заданного условия для каждого элемента массива, и возвращает логическое значение

Массив итерируется до тех пор, пока функция не вернет значение ~false~
В этом случае метод вернет ~false~

Если функция вернет ~true~ для всех элементов массива, метод вернет ~true~

◘◘![ico-20 cap] **every**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Украина' },
  { name: 'Дюк Шейн', country: 'США' },
  { name: 'Демид Швейк', country: 'Франция' },
  { name: 'Семен Картко', country: 'Украина' },
  { name: 'Маргарет Джонсон', country: 'США' },
  { name: 'Филипп Данько', country: 'Украина' },
  { name: 'Роберт Трамп', country: 'США' },
]

const res = people.every(x => x.country === 'Украина')

console.log(res)
~~~

^^В этом примере массив  **people**  проверяется на наличие в нем жителей не Украины^^
^^Переменная  **res**  будет иметь значение ~false~, поскольку в массиве есть элементы, не удовлетворяющие заданному условию^^

______________________________________________

### ![ico-25 icon] some()

Осуществляет поиск в массиве по заданному условию

Возвращает логическое значение (найдено / не найдено)

Функция, передаваемая методу в качестве первого аргумента, проверяет выполнение заданного условия для каждого элемента массива, и возвращает логическое значение

Массив итерируется до тех пор, пока функция не вернет значение ~true~
В этом случае метод вернет  ~true~

Если функция вернет ~false~ для всех элементов массива, метод вернет ~false~

◘◘![ico-20 cap] **some**◘◘

~~~js
const people = [
  { name: 'Николай Василенко', country: 'Украина' },
  { name: 'Дюк Шейн', country: 'США' },
  { name: 'Демид Швейк', country: 'Франция' },
  { name: 'Семен Картко', country: 'Украина' },
  { name: 'Маргарет Джонсон', country: 'США' },
  { name: 'Филипп Данько', country: 'Украина' },
  { name: 'Роберт Трамп', country: 'США' },
]

const res = people.some(x => x.country === 'Пакистан')

console.log(res)
~~~

^^В этом примере массив  **people**  проверяется на наличие в нем жителей Пакистана^^
^^Переменная  **res**  будет иметь значение `false`, поскольку таких "персонажей" в массиве нет^^

^^Метод **some** можно заменить следущим кодом:^^

~~~js
const res = people
  .map(human => human.country)
  .includes('Украина')
~~~

____________________________

### ![ico-25 icon] reduce()

Сводит массив к новому результату

Этот метод получает два аргумента:
  • обязательный первый аргумент - функция, которая будет вызвана для каждого элемента массива
  • опциональный второй аргумент - стартовое значение переменной-аккумулятора

Функция, которая передается методу в качестве первого ( обязательного ) аргумента, имеет два обязательных формальных параметра:

• первый: имя переменной-аккумулятора, в которой будет накапливаться результат работы метода
• второй: текущий элемент массива

![ico-20 warn] Если стартовое значение аккумулятора не установлено,
в качестве стартового значения аккумулятора будет использовано значение первого элемента массива,
и на каждой итерации второй аргумент будет следующим элементом массива

◘◘![ico-20 cap] **reduce (1)**◘◘

~~~js
[1, 2, 3, 4, 5].reduce((accumulator, item) => {
  document.body.innerHTML += `<p>${accumulator} : ${item}</p>`
  return accumulator += item
})
~~~

{{{Array-iteration-methods-reduce-1.js}}}

___________________


Метод может возвращать данные любого типа, например, объект:

◘◘![ico-20 cap] **reduce (2)**◘◘

~~~js
['first', 'second', 'third', 'fourth']
  .reduce((res, item, index) => {
    res[item] = index + 1
    return res
  }, {})
~~~

{{{Array-iteration-methods-reduce-2.js}}}


или массив:

◘◘![ico-20 cap] **reduce (3)**◘◘

~~~js
console.log(['first', 'second', 'third', 'fourth']
  .reduce((res, item, index, arr) => {
    res[index] = arr[arr.length - index - 1]
    return res
  }, []))
~~~

{{{Array-iteration-methods-reduce-3.js}}}

_____________________________

Функция, передаваемая методу **reduce** в качестве первого обязательного аргумента,
как и в случае других итерирующих методов, может принимать дополнительные аргументы -
индекс текущего элемента массива и ссылку на сам исходный массив
Благодаря ссылке, мы можем манипулировать исходным массивом, что делает его мутабельным
Посмотрим, что будет происходить, если в процессе итерирования массива мы будем изменять его длину:

◘◘![ico-20 cap] **reduce (4)**◘◘

~~~js
console.log(['first', 'second', 'third', 'fourth']
  .reduce((res, item, index, arr) => {
    res.push(arr.pop())
    return res
  }, []))
~~~

{{{Array-iteration-methods-reduce-4.js}}}

◘◘![ico-20 cap] **reduce (5)**◘◘

~~~js
console.log(['first', 'second', 'third', 'fourth']
  .reduce((res, item, index, arr) => {
    res.push(arr.shift())
    return res
  }, []))
~~~

{{{Array-iteration-methods-reduce-5.js}}}

_____________________________________

Проследим, как будет работать метод **reduce**, если передать ему первым аргументом **Math.sqrt**
Библиотечная функция **Math.sqrt** принимает всего 1 аргумент ( число ), и возвращает квадратный корень из полученного числа
Если мы не передаем методу **reduce** стартовое значение аккумулятора, он будет использовать значение первого элемента массива
На каждой итерации это значение будет заменяться его квадратным корнем
Остальные элементы массива в вычислениях участвовать не будут, поскольку **Math.sqrt** принимает всего 1 аргумент, и это будет текущее значение переменной-аккумулятора
Итераций будет столько, сколько элементов в массиве
Таким образом, результатом работы метода **reduce** будет квадратный корень из квадратного корня... и т.д. первого элемента исходного массива


◘◘![ico-20 cap] **reduce (6)**◘◘

~~~js
console.log([625, 5, 10].reduce(Math.sqrt))
console.log([625, 8, 3].reduce(Math.sqrt))
console.log([625, 4].reduce(Math.sqrt))
console.log([81, 7, 5].reduce(Math.sqrt))
console.log([81, 0, 0].reduce(Math.sqrt))
~~~

{{{Array-iteration-methods-reduce-7.js}}}

Первый и второй вариант - из числа 625 дважды извлечен квадратный корень:
••625 -> 25 -> 5••
^^Значения второго и третьего элементов массива не влияют на результат, поскольку не участвуют в вычислениях^^
Третий вариант - квадратный корень будет извлечен всего один раз
••625 -> 25••
В четвертом и пятом вариантах из числа 81 будет дважды извлечен квадратный корень:
••81 -> 9 -> 3••
^^Значения второго и третьего элементов массива опять-таки не влияют на результат, поскольку не участвуют в вычислениях^^

_______________________________

Теперь будем передавать методу **reduce** первым аргументом библиотечную функцию **Math.pow** (возведение в степень)
Эта функция принимает два аргумента: число, которое нужно возвести в степень, и значение степени числа

◘◘![ico-20 cap] **reduce (7)**◘◘

~~~js
console.log([3, 2, 2].reduce(Math.pow))    // 81

console.log(Math.pow(Math.pow(3, 2), 2))   // 81

console.log([2, 3, 3].reduce(Math.pow))    // 512

console.log(Math.pow(Math.pow(2, 3), 3))   // 512

console.log([2, 3, 4].reduce(Math.pow, 2)) // 16777216

Math.pow(Math.pow(Math.pow(2, 2), 3), 4)   // 16777216
~~~

Если мы не передаем стартовое значение аккумулятора вторым аргументом метода **reduce**, то в этом качестве будет использовано значение первого элемента массива
Остальные элементы массива будут значениями степени, в которую нужно возвести текущее значение аккумулятора

Если же мы передаем стартовое значение аккумулятора, то все элементы массива будут рассматриваться как степень, в которую нужно возвести текущее значение аккумулятора
На каждой итерации значение аккумулятора будет уже результатом операции возведения в степень предыдущей итерации

![ico-25 hw] Тесты

Что вернут следующие выражения:

◘◘** 1**◘◘

~~~js
[].reduce(Math.pow)
~~~

◘◘** 2**◘◘

~~~js
[].reduce(Math.sqrt, 'Google')
~~~

◘◘** 3**◘◘

~~~js
[1].reduce(Math.sqrt, 'Google')
~~~

◘◘** 4**◘◘

~~~js
[-10, -20, 5].reduce(Math.abs)
~~~

◘◘** 5**◘◘

~~~js
[-10, -20, 5].reduce(Math.abs)
~~~

Объясните, почему.

_________________________________

Создадим массив банковских карт, и с помощью метода **reduce** посчитаем сумму средств на всех картах:

◘◘![ico-25 cap] **reduce (8)**◘◘

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

◘◘![ico-25 cap] **reduce (8.1)**◘◘

~~~js
cards.reduce((result, card) => ({
  num: result.num,
  cash: result.cash + card.cash
}), { num: '457855155', cash: 0 })
~~~

◘◘**Результат**◘◘

~~~console

▼ { num: "457855155", cash: 10300 }
    cash: 10300
    num: "457855155"
  ► __proto__: Object

~~~

_________________________________________________

Для чистоты результата дополнительно обнулим остатки на счетах других карт:

◘◘![ico-25 cap] **reduce (8.2)**◘◘

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

◘◘**Результат**◘◘

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

Удалим дублирующиеся элементы массива:

◘◘![ico-25 cap] **reduce (8.3)**◘◘

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

arr.reduce((result, item) => {
  result.indexOf(item) < 0 ? result.push(item) : null
  return result
}, [])
~~~

◘◘**Результат**◘◘

~~~console

▼ (3) ["google", "mozilla", "ie"]
    0: "google"
    1: "mozilla"
    2: "ie"
    length: 3
  ► __proto__: Array(0)

~~~

_________________________________________________

![ico-25 cap] **reduce (9)**

Задача посложнее:

Есть несколько отрезков на числовой оси, таких, что начало и конец отрезков не совпадают

~~~js
const segments = [[1, 8], [2, 3], [4, 7], [5, 6]]
~~~

Для каждого отрезка нужно посчитать, сколько отрезков лежит внутри него

**Решение**

Нужно напилить код функции, которая будет:

![ico-20 green-ok] получать в качестве аргумента исходный массив отрезков
![ico-20 green-ok] перебирать полученный массив
![ico-20 green-ok] для каждого отрезка в этом массиве считать число вложенных в него отрезков
![ico-20 green-ok] возвращать результат в виде массива чисел

Каркас функции:

~~~js
function countInnerIntervals (intervals) {
  const results = []
  intervals.forEach(...)
  return results
}
~~~

Внутри функции объявляется пустой массив **~results~**, куда мы будем помещать результаты подсчетов

Когда итерирование исходного массива будет завершено, функция вернет массив результатов **~results~**

Теперь методу **~forEach~** нужно передать функцию, которая будет "работать" с очередным отрезком

Это будет первый формальный параметр функции (назовем его **~segment~**)

Но нам нужно будет внутри функции опять итерировать исходный массив, чтобы искать в нем отрезки, которые попадают в текущий отрезок **~segment~**

Для этого нам необходим третий аргумент - ссылка на исходный массив

Поэтому у функции будет три параметра: **~segment~**, **~index~**, **~array~**

Параметр **~array~** будет содержать ссылку на исходный массив

~~~js
intervals.forEach(function (segment, index, array) {
  ...
}, results)
~~~

Обратите внимание, что методу **~forEach~** мы передаем обыную (не стрелочную!) функцию, поскольку мы биндим ей контекст вызова - **~results~**

Это позволит нам внутри функции пушить результаты в массив **~results~**, используя ключевое слово ~this~

~~~js
intervals.forEach(function (segment, index, array) {
  this.push(...)
}, results)
~~~

Если мы используем стрелочную функцию, то ее контекст вызова изменить будет невозможно, поэтому нам придется обращаться к массиву **~results~** непосредственно:

~~~js
intervals.forEach((segment, index, array) => results.push(...))
~~~

Теперь вопрос - что пушить в массив **~results~**

Очевидно, что на каждой итерации это должно быть число, а не массив

Но мы итерируем исходный массив, ссылку на который получаем в параметре **~array~**

Итак, в параметре **~segment~** у нас ссылка на отрезок, для которого мы подсчитываем число входящих в него отрезков

В параметре **~array~** у нас ссылка на исходный массив отрезков

На каждой итерации нам нужно сравнить концы отрезка **~segment~** с концами каждого из отрезков массива **~array~**, чтобы понять, находится ли последний внутри отрезка **~segment~**

Для этого можно использовать метод **~filter~**:

~~~js
array
  .filter(item => item [0] > segment[0] && item [1] < segment[1])
~~~

Результатом будет массив отрезков, попавших в заданный отрезок **~segment~**

Нам осталось только получить длину массива:

~~~js
array
  .filter(item => item [0] > segment[0] && item [1] < segment[1])
  .length
~~~

Это и будет число отрезков, находящихся внутри отрезка **~segment~**

Итак, полный код функции, передаваемой методу **~forEach~**:

~~~js
intervals
  .forEach((segment, index, array) => results.push(array.filter(item => item [0] > segment[0] && item [1] < segment[1]).length))
~~~

Теперь полный код функции **~countInnerIntervals~** готов:

~~~~js
function countInnerIntervals (intervals) {
  const results = []
  intervals
    .forEach((segment, index, array) => results.push(array.filter(item => item [0] > segment[0] && item [1] < segment[1]).length))
  return results
}
~~~~

А теперь та же функция, но с использованием метода **~reduce~**:

~~~~js
function countInnerIntervals (intervals) {
  const results = []
  intervals
    .forEach((segment, index, array) => results.push(array.reduce((result, item) => result + (item [0] > segment[0] && item [1] < segment[1]), 0)))
  return results
}
~~~~

А теперь заменим метод **~forEach~** на метод **~map~**

~~~~js
function countInnerIntervals (intervals) {
  return intervals
    .map((segment, index, array) => array.reduce((result, item) => result + (item [0] > segment[0] && item [1] < segment[1]), 0))
}
~~~~

или с использованием стрелочной функции:

~~~~js
const countInnerIntervals = intervals => intervals
  .map(segment => intervals.reduce((result, item) => result + (item [0] > segment[0] && item [1] < segment[1]), 0))
~~~~

Можно использовать замыкание для вспомогательных функций, тогда код становится более читабельным:

~~~js
const countInnerIntervals = (function () {
  const test = (segment, interval) => interval[0] > segment[0] && interval[1] < segment[1]
  const filter = (intervals, segment) => intervals.filter(interval => test(segment, interval))

  return function (intervals) {
    const results = []
    const filterInterval = filter.bind(null, intervals)

    intervals
      .forEach(segment => results.push(filterInterval(segment).length))
    return results
  }
})()
~~~

Осталось только вызвать функцию:

~~~js
console.log(countInnerIntervals(segments))
~~~

__________________________

### ![ico-25 icon] sort()

В полном смысле слова этот метод нельзя назвать методом итерирования массива, поскольку число итераций больше чем число элементов массива

Однако итерации имеют место быть
И перебор элементов массива налицо

Метод сортирует массив согласно заданному условию сортировки
Условие сортировки проверяет передаваемая методу функция
_Функция получает два аргумента для попарного сравнения_

Функция возвращает одно из трех значений:

|  0 | совпадение элементов           |
|  1 | первый аргумент больше второго |
| -1 | второй аргумент больше первого |


На основании возвращенного функцией значения метод меняет порядок следования элементов в массиве

◘◘![ico-20 cap] **sort (1)**◘◘

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


Для понимания механизма сортировки выведем в консоль значения сравниваемых элементов массива на каждой итерации:

◘◘![ico-20 cap] **sort (2)**◘◘

~~~~js
var resArray = sourceArray
  .sort(function (x, y) {
    console.log ( `${x.title} - ${y.title} = ${x.value - y.value}` )
    return  x.value - y.value
  })
~~~~

◘◘**Результат**◘◘

~~~console

fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300

~~~

или так:

~~~~js
var tmp =[]
var resArray = sourceArray
  .sort(function (x, y) {
    tmp.push({
      id: x.title + " > " + y.title,
      res: x.value > y.value
    })
    return  x.value - y.value
  })
~~~~

^^^[tmp]

~~~console

▼ (13) [...]
  ► 0: "salary - fond = 300"
  ► 1: "bonus - salary = -330"
  ► 2: "bonus - salary = -330"
  ► 3: "bonus - fond = -30"
  ► 4: "debt - fond = 600"
  ► 5: "debt - salary = 300"
  ► 6: "credit - salary = -200"
  ► 7: "credit - fond = 100"
  ► 8: "payments - credit = -50"
  ► 9: "payments - fond = 50"
  ► 10: "income - credit = 120"
  ► 11: "income - debt = -380"
  ► 12: "income - salary = -80"
    length: 13
  ► __proto__: Array(0)

~~~

^^^

Итак, в отличие от других итерирующих методов, функция, передаваемая методу в качестве единственного аргумента, принимает строго два параметра

![ico-20 warn] Этому методу нельзя передать ссылку на контекст вызова
![ico-20 warn] Число итераций будет заведомо больше числа элементов массива

![ico-20 require] Самостоятельно попробуйте нарисовать блок-схему алгоритма сортировки массива методом  **~sort()~**

__________________________

### ![ico-25 icon] flatMap()

Есть строка **cookie**:

◘◘![ico-20 cap] **flatMap**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

Сплитим строку **cookie** и применим метод **~map~** к полученному массиву

~~~js
console.log(cookie.split('; ').map(item => item.split('='))
~~~

◘◘**Результат**◘◘

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

◘◘**Результат**◘◘

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

Мы получили "плоский" массив

Итак, используя одну и ту же функцию:

~~~js
function (item) {
  return item.split('=')
}
~~~

мы получили в первом случае массив массивов, а во втором - "плоский" массив

____________________________________________________

### ![ico-25 icon] keys()

**Генератор**
**Возвращает объект _итератора_**

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

◘◘**Результат**◘◘

~~~console

name user
token Jd7-js15/84
interest javascript

~~~


______________________

### ![ico-25 icon] values()

**Генератор**
**Возвращает объект _итератора_**

◘◘![ico-20 cap] **values**◘◘

~~~js
const iterator = 'name=user; token=Jd7-js15/84; inerest=javascript'
  .split ('; ')
  .map(item => item.split('=')).values()

do {
  var { value, done } = iterator.next()
  done || console.log(value)
} while (!done)
~~~

◘◘**Результат**◘◘

~~~console

► (2) ["name", "user"]
► (2) ["token", "Jd7-js15/84"]
► (2) ["inerest", "javascript"]

~~~

_____________________________________________


## ![ico-25 icon] Примеры и тесты

^^Спасибо **Антону Бурчак** за эту задачку ![ico-20 smile]^^

Задача: проверить парность и правильность расстановки скобок

Например, валидация строки "({})[([])]" должна пройти нормально ( вернуть ~true~ )
а валидация строки "({(})[([)])]" должна вернуть ~false~

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

◘◘![ico-20 cap] **map**◘◘

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

Перейдите по [**_ссылке_**](https://en.wikipedia.org/wiki/Idempotence) и в консоли страницы выполните код:

◘◘![ico-22 cap] **getComputedStyle**◘◘

~~~js
Array.from(document.getElementsByClassName('interlanguage-link'))
  .map(item => getComputedStyle(item))
  .forEach(item => console.log(item['font-family']))
~~~

________________________________________________

[![ico-30 hw] Тесты](quiz/arrayIterationMethods)
