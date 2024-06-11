# Принцип работы итерирующих методов
[◄◄◄ Итерирующие методы массивов ◄◄◄](page/Array-iteration-methods.md)

Выведя в консоль свойство **_~prototype~_** конструктора массивов, можно убедиться, что эти структуры данных наследуют много методов, и некоторые из них мы уже знаем

^^^[Array.prototype]

~~~console
▼ [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
  ► concat: ƒ concat()
  ► constructor: ƒ Array()
  ► copyWithin: ƒ copyWithin()
  ► entries: ƒ entries()
  ► every: ƒ every()
  ► fill: ƒ fill()
  ► filter: ƒ filter()
  ► find: ƒ find()
  ► findIndex: ƒ findIndex()
  ► flat: ƒ flat()
  ► flatMap: ƒ flatMap()
  ► forEach: ƒ forEach()
  ► includes: ƒ includes()
  ► indexOf: ƒ indexOf()
  ► join: ƒ join()
  ► keys: ƒ keys()
  ► lastIndexOf: ƒ lastIndexOf()
    length: 0
  ► map: ƒ map()
  ► pop: ƒ pop()
  ► push: ƒ push()
  ► reduce: ƒ reduce()
  ► reduceRight: ƒ reduceRight()
  ► reverse: ƒ reverse()
  ► shift: ƒ shift()
  ► slice: ƒ slice()
  ► some: ƒ some()
  ► sort: ƒ sort()
  ► splice: ƒ splice()
  ► toLocaleString: ƒ toLocaleString()
  ► toString: ƒ toString()
  ► unshift: ƒ unshift()
  ► values: ƒ values()
  ► Symbol(Symbol.iterator): ƒ values()
  ► Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
  ► __proto__: Object
~~~

^^^

Часть методов, с которыми мы уже знакомы, выполняют какую-то операцию с массивом
(добавляют элемент в массив, удаляют или заменяют элементы в массиве, объединяют несколько массивов в один и т.д.)

Итерирующие методы перебирают элементы массива один за другим строго в порядке возрастания их индексов
^^(за исключением ~reduceRight~, который осуществляет перебор справа налево)^^


^^^[Методы массивов]

| Обычные               | Итерирующие     |
| ~concat~              | ~entries~       |
| ~copyWithin~          | ~every~         |
| ~fill~                | ~filter~        |
| ~flat~ ![ico-20 warn] | ~find~          |
| ~includes~            | ~findIndex~     |
| ~indexOf~             | ~flatMap~ ![ico-20 warn] |
| ~join~                | ~forEach~       |
| ~lastIndexOf~         | ~keys~          |
| ~pop~                 | ~map~           |
| ~push~                | ~reduce~        |
| ~reverse~             | ~reduceRight~   |
| ~shift~               | ~some~          |
| ~slice~               | ~sort~          |
| ~splice~              | ~values~        |
| ~unshift~             |                 |

^^^

Еще одно важное отличие итерирующих методов:

_^^Группа итерирующих методов массивов - пример реализации функциональной парадигмы в ООП^^_

![ico-20 warn] **Обязательным** аргументом итерирующих методов является функция

![ico-20 warn] У этой функции должен быть как минимум один формальный параметр

• метод будет перебирать элементы масива один за другим, пока не дойдет до конца массива
• на каждой итерации метод будет вызывать переданную ему функцию
• при вызове функции метод будет передавать ей значение текущего элемента массива

_____________________________________________

## ![ico-25 icon] Декоратор цикла

Использование функции-декоратора позволяет избежать внешних эффектов, т.е.
когда мы "заворачиваем" цикл в функцию, никакие внешние переменные не мутируют
в процессе работы цикла

Можно интерпретировать итерирующие методы как "обертки" для цикла ~for...of~:

_____________________________________________

◘◘![ico-20 cap] ** 1**◘◘

~~~js
Array.prototype.customMethod = function (func) {
  for (const item of this) func(item)
}

[7, 4, 1].customMethod(item => console.log(item))
~~~

В этом примере мы создали кастомный унаследованный метод массивов **customMethod**
с формальным параметром **_func_** ( ~function~ ),
который перебирает в цикле ~for...of~ исходный массив
и на каждой итерации вызывает **_func_**,
передавая ей очередной элемент исходного массива

В этом примере **customMethod** ничего не возвращает,
и он не мутирует исходный массив, т.е. не производит внешних эффектов

Того же эффекта можно добиться с помощью рекурсии:

~~~js
Array.prototype.customMethod = function (func, index) {
  if (typeof func !== 'function') return
  let number = typeof index === 'number' ? index : 0
  func(this[number])
  number++ < this.length - 1 && this.customMethod.call(this, func, number)
}

[7, 4, 1].customMethod(item => console.log(item))
~~~

_____________________________________________

Если мы хотим, чтобы метод возвращал новый массив, достаточно сделать следующее:

_____________________________________________

◘◘![ico-20 cap] ** 2**◘◘

~~~js   
Array.prototype.customMethod = (function () {
  const res = []
  return function (func) {
    for (const item of this) res.push(typeof func === 'function' ? func(item) : item)
    return res
  }
})()
~~~

т.е. мы использовали паттерн "Модуль", чтобы поместить в замыкание переменную **res**
В результате кастомный метод **customMethod** будет "собирать" в массив **res**
результаты вызова функции **_func_** на каждой итерации,
и возвращать массив **res**

~~~js
[7, 4, 1].customMethod(item => item * 2)
~~~

Результат:

~~~console
► (3) [ 14, 8, 2 ]
~~~

_____________________________________________

Мы можем напилить кастомный метод, фильтрующий исходный массив в соответствии с заданным условием
Теперь функция **_func_** должна возвращать логическое значение
Если для очередного элемента массива функция **_func_** вернет ~true~, то этот элемент попадет в результирующий массив **res**
В противном случае - нет
_____________________________________________

◘◘![ico-20 cap] ** 3**◘◘

~~~js
Array.prototype.customFilter = (function () {
  const res = []
  return function (func) {
    for (const item of this) func(item) && res.push(item)
    return res
  }
})()
~~~

Используем метод **customFilter**:

~~~js   
[7, 4, 1, 20, 8].customFilter(item => item > 5)
~~~

Результат:

~~~console
► (3) [7, 20, 8]
~~~

_____________________________________________

## ![ico-25 icon] Передача контекста

Кроме обязательного аргумента-функции, мы можем передать методу второй (опциональный) аргумент - контекст вызова этой функции
Понятное дело, что при этом мы не можем передавать методу стрелочные функции, поскольку нам предстоит менять контекст вызова
Следующий пример показывает, как это работает


◘◘![ico-20 cap] ** 4**◘◘

~~~~js
const numbers = [8, 4, 9, 7]
const alter = ['google', 5, 'figure', 11]

Array.prototype.sampleMethod = function (callback, context) {
  const res = []
  for (const item of this) {
    res.push(callback.call(context, item, this.indexOf(item), this))
  }
  return res
}

const sample = numbers.sampleMethod(function (item, index, arr) {
  console.log(this[index])
  console.log(arr)
}, alter)
~~~~

^^Функция **sample** получает в переменной **_arr_** ссылку на исходный массив **numbers**, а **_~this~_** внутри функции **sample** указывает на массив **alter**^^

___________________________________________________

## ![ico-25 icon] Side effects

![ico-20 warn] Итерирующие методы, вообще говоря, не порождают внешних эффектов, т.е. не мутируют никакие внешние переменные

Это их отличает от обычных методов массивов, таких как ~push()~, ~concat()~ и т.д.

Но мы уже показали в предыдущем примере, что это можно "исправить" ![ico-20 smile] с помощью передачи контекста вызова функции-аргумента

Посмотрим еще раз:

◘◘![ico-20 cap] ** 5**◘◘

~~~js
const user = {
  name: 'Stephan',
  hobby: []
}

Array.prototype.customMethod = function (func, context) {
  for (const item of this) func.call(context, item)
};

['football', 'fishing', 'dancing', 'aeronautics', 'cooking']
  .customMethod (function (item) {
    this.hobby.push(item)
  }, user)
~~~

В этом примере метод **customMethod** имеет два формальных параметра:
первый, как и ранее, - это функция, которая будет вызвана для каждого элемента итерируемого массива,
а второй - это ссылка на контекст вызова этой функции
При вызове **func** мы "подсовываем" ей контекст с помощью метода **~call~**

у нас есть объект **user**, ссылку на который мы передаем методу **customMethod** вторым аргументом
В результате выполнения кода объект **user** будет таким:

~~~console
▼ {name: "Stephan", hobby: Array(5)}
  ▼ hobby: Array(5)
      0: "football"
      1: "fishing"
      2: "dancing"
      3: "aeronautics"
      4: "cooking"
      length: 5
    ► __proto__: Array(0)
    name: "Stephan"
  ► __proto__: Object
~~~

Мы мутировали объект **user**, т.е. **customMethod** уже не является "чистой" функцией

Итак, side effects возникают за счет передачи контекста вызова вторым аргументом метода

Если вы хотите, чтобы метод не создавал "внешние эффекты", т.е. не мутировал данные окружения, просто не используйте второй аргумент метода

_____________________________________________

Следующий пример показывает, что можно мутировать и саму функцию-аргумент:

◘◘![ico-20 cap] ** 6**◘◘

~~~js
var browsers = ['Chrome', 'FireFox', 'Opera', 'Safari', 'IE']

const showSample = function (item, index, arr) {
  this.history = Array.isArray(this.history) ? this.history : []
  this.history.push(item)
}

Array.prototype.sampleMethod = function (func, context) {
    for (var item of this) func.call(context, item)
}

browsers.sampleMethod(showSample, showSample)

console.dir(showSample)
~~~

Результат в консоли:

~~~console
▼ ƒ showSample( item, index, arr )
  ▼ history: Array(5)
      0: "Chrome"
      1: "FireFox"
      2: "Opera"
      3: "Safari"
      4: "IE"
      length: 5
    ► __proto__: Array(0)
    arguments: null
    caller: null
    length: 3
    name: "showSample"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

_____________________________________________

## ![ico-25 icon] Идемпотентность

Если метод при одном и том же значении аргументов возвращает один и тот же результат, то он **_идемпотентен_**

^^т.е. при повторном вызове метода с одним и тем же массивом и функцией результат всегда будет одним и тем же^^
^^( здесь имеется в виду, что постоянной должна быть не ссылка на массив, а именно содержимое массива )^^

В предыдущем примере (5) метод был идемпотентным, хотя и мутировал функцию **showSample**
(изменял ее свойство **_history_**)

Посмотрим, всегда ли итерирующие методы массивов идемпотентны, и от чего это зависит

◘◘![ico-20 cap] ** 7**◘◘

~~~js
Array.prototype.customMethod = (function () {
  const res = []
  return function (func) {
    for (const item of this) res.push(func(item))
    return res
  }
})();

[7, 4, 1, 20, 8].customMethod(item => item * Math.random())
~~~

В этом примере видно, что если функция, которую мы передаем методу **customMethod**, не является _идемпотентной_,
то и результат работы метода будет варьировать,
т.е. идемпотентность метода напрямую зависит от идемпотентности функции-аргумента

_____________________________________________

(further in work...)

### ![ico-25 icon] Опциональные параметры функции-аргумента

Итак, обязательный первый аргумент, передаваемый методу в момент вызова - **функция**
Эта функция будет вызвана на каждой итерации ( для каждого элемента массива )
В примере 4 мы увидели, что кроме первого аргумента ( функции ) метод может получить и второй аргумент - ссылку на контекст вызова этой функции
Это порождает внешние эффекты, т.е. в результате работы метода могут мутировать внешние переменные

Что же касается самой функции-аргумента:
У этой функции может быть три формальных параметра: первый - обязательный, два других - опциональные
Обязательный формальный параметр функции - текущее значение элемента массива,
и мы уже с этим разобрались
Но давайте разберемся с двумя оставшимися пока без внимания опциональными параметрами

Второй (опциональный) параметр - это индекс текущего элемента массива:

◘◘![ico-20 cap] ** 8**◘◘

~~~~js
const arr = ['google', 'service', 'user']

function test (elem, index) {
  return `${index}: ${elem}`
}

Array.prototype.sampleMethod = function (callback) {
  const res = []
  for (const item of this) res.push(callback(item, this.indexOf(item)))
  return res
}

console.log(arr.sampleMethod(test))
~~~~

__________________________________________

Третий (опциональный) параметр - ссылка на исходный массив

◘◘![ico-20 cap] ** 9**◘◘

~~~~js
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

Array.prototype.sampleMethod = function (callback) {
  var res = []
  for (var item of this) {
    res.push(callback(item, this.indexOf(item), this))
  }
  return res
}

arr.sampleMethod(test)
~~~~

В этом примере функция **test** мутирует исходный массив
__________________________________________


Используем второй и третий опицональные параметры функции-аргумента:

◘◘![ico-20 cap] **10**◘◘

~~~js
const source = ['Google', 'Mozilla', 'Microsoft']
const target = ['Chrome', 'Firefox', 'IE']

function test (prop, index) {
  this[index] = { [prop] : this[index] }
}

Array.prototype.sampleMethod = function (func, context) {
  var index = index && typeof index === 'number' ? index : 0
  for ( var item of this ) func.call(context, item, index++)
}

source.sampleMethod(test, target)

console.log(target)
~~~

Результат в консоли:

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {Google: "Chrome"}
  ► 1: {Mozilla: "Firefox"}
  ► 2: {Microsoft: "IE"}
    length: 3
  ► __proto__: Array(0)
~~~

________________________________________________________________

Ну, вот мы и разобрались, как "устроены" итерирующие методы
Нам не придется писать их самим, как в предыдущих примерах - они уже есть в ~Array.prototype~
Теперь, когда мы понимаем механизм их работы, можно переходить к использованию этих методов

[◄◄◄Итерирующие методы массивов◄◄◄](page/Array-iteration-methods.md)

________________________________________________________________

[![ico-30 hw] Тесты](quiz/arrayIterationMethods)
