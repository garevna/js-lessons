# ![ico-30 study] Элементы функционального программирования в JS

![ico-20 green-ok] **Чистая функция** - это функция, которая:
• при одних и тех же значениях аргументов возвращает один и тот же результат ( предсказуемое поведение )
• не влияет на внешнее окружение, т.е. не изменяет значения внешних переменных ( не создает "побочных эффектов" )
• не зависит от состояния окружения, потому что не использует внешние переменные в своих вычислениях

__________________________________________

![ico-20 green-ok] **Ссылочная прозрачность** ( **_~referential transparency~_** ) - это возможность заменить вызов функции с заданным набором аргументов результатом ее вызова

~~~js
const func = (x, y, z) => x + y - z
~~~

^^Вызов функции ~func(3, 4, 2)~ всегда возвращает 5,^^
^^поэтому можно заменить ~func(3, 4, 2)~ значением 5^^

^^А вот такая функция не будет обладать свойством **_~referential transparency~_**,^^
^^поскольку результат ее работы будет псевдо-случайным числом:^^

~~~js
const func = (x, y, z) => x + y - z * Math.random()
~~~

^^В следующем примере функция **counter** также не будет ссылочно-прозрачной, поскольку каждый вызов этой функции будет возвращать новый результат:^^

~~~js
const makeCounter = () => {
  let counter = 0
  return () => counter++
}

const counter = makeCounter()
~~~

Что обеспечивает ссылочная прозрачность? - оптимизацию

Движок может "запомнить" уже вычисленное значение функции с заданным набором аргументов,
и при повторном вызове функции с тем же набором аргументов вернуть уже вычисленное ранее значение

___________________________________________________________

![ico-20 green-ok] **Иммутабельность** ( **_~immutability~_** ) - это устойчивость к изменениям

Иммутабельные данные - это данные, которые не меняются с течением времени

^^В следующем примере переменные **~number~** и **~sum~** трижды меняют свое значение в процессе выполнения цикла:^^

~~~js
const numbers = [10, 5, 7]
let sum = 0

for (const number of array) {
  sum += number
}
~~~

^^А если использовать функцию **summation**:^^

~~~js
const summation = array => {
  return (function recurse (index = 0, sum = 0) {
    sum += array[index++]
    return index < array.length ? recurse (index, sum) : sum
  })()
}
~~~

^^то после вызова^^

~~~js
const numbers = [10, 5, 7]

summation(numbers)  // 22
~~~

^^массив **~numbers~** и переменная **~sum~** не изменятся, т.е. функция **summation** не производит внешних эффектов^^

^^А такой вариант функции **summation**:^^

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
  }
  return sum
}
~~~

^^производит "внешние эффекты", поскольку в результате вызова функции:^^

~~~js
summation()
~~~

^^изменяются значения внешних переменных **~numbers~** и **~sum~**^^

Посмотрим, к чему это может привести

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const numbers = [10, 5, 7]

const show = (numbers, sum) => setTimeout(() => console.log(`[${numbers.toString()}] : ${sum}`), Math.random() * 2500)

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
    show(numbers, sum)
  }
  return sum
}
~~~

Теперь будем несколько раз подряд повторять вызовы функций **summation** и **show**

~~~js
numbers = [10, 5, 7]

summation()
~~~

{{{functionality.js}}}

Непредсказуемость результата работы функции **show** вызвана тем, что **~numbers~** и **~sum~** не иммутабельны,
и и если колбэк таймера функции **summation** попадет в Call Stack раньше, чем колбэк таймера функции **show**,
то в консоли мы увидим уже совсем другие данные...

Итак, результат работы функции **show** не является предсказуемым, поскольку данные **~numbers~** и **~sum~** не иммутабельны, а функция не является "чистой", поскольку зависит от внешнего состояния

Функция **summation** не является "чистой", поскольку производит "побочные эффекты"

Все это делает работу приложения неустойчивой, затрудняет процесс отладки и тестирования

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const numbers = [10, 5, 7]

const randomNum = lim => Math.floor(Math.random() * lim)

const summation = () => numbers[randomNum(numbers.length - 1)] = randomNum(20)

const show = () => console.log(`[${numbers.toString()}]`)

const callFunc = () => {
  if (Math.random() > 0.5) {
    summation()
    show ()
  } else {
    show ()
    summation()
  }
}
~~~

В этом примере легко отследить, как мутируют данные

{{{functionality-1.js}}}

_______________________________________________________

**_Функция высшего порядка_** — это функция, принимающая в качестве аргументов другие функции или возвращающая другую функцию в качестве результата

Поскольку функции в JS являются объектами, действовать с ними можно абсолютно так же, как с любым объектом:

![ico-20 green-ok] собирать в структуры ( массивы, объекты )
![ico-20 green-ok] передавать в качестве аргумента
![ico-20 green-ok] возвращать в качестве результата ( что, собственно, и делает конструктор **~Function~** )

Одним словом, все, что мы можем делать с объектами, можно делать с функциями, поскольку функции - это всего лишь объекты класса **~Function~**

## ![ico-25 icon] Функция-аргумент

◘◘![ico-25 cap] ** 3**◘◘

~~~js
function frog () {
  console.log('frog')
}
function elefant () {
  console.log('elefant')
}

function animal (func) {
  func()
}
~~~

В этом примере функция **animal** получает в качестве аргумента ссылку на функцию, которую и вызывает

Мы можем передавать функции **animal** различные функции

Вызовем функцию **animal**:

~~~js
animal(frog)
animal(elefant)
~~~

и в консоли мы увидим:

~~~console
frog
elefant
~~~

Однако если аргумент функции **animal** окажется не функцией, то при попытке его вызова ( с круглыми скобками ) будет сгенерировано исключение ( **~TypeError~** )

![](https://lh3.googleusercontent.com/3GB6A4pHq6LgFdRGD31bjB5sEUMgWCTYJHf9JmNjOX-r-6PMN54s6-vRTL5d73Nw7lKkAntT_2d0Ea4kcEpenX-gTm8nuNXGXvgJ0DKxw82A36E8hZbr-Zmggh9N7ZJbK4G5TkfTDDY5DHw)

Во избежание этого немного изменим код функции **animal**, добавив проверку типа аргумента:

~~~js
function animal (func) {
  typeof func === 'function' ? func() : null
}
~~~

Создадим элемент ~div~  и  добавим его в  ~document.body~

Установим свойство  _~id~_  этого элемента  равным "_sample_"

Изменим код функций **frog()** и **elefant()**:

~~~js
function frog () {
  return 'frog'
}
function elefant () {
  return 'elefant'
}
~~~

Теперь объявим функцию  **newFunc()**, которая будет создавать новый элемент ~ p~, вставлять его в контейнер с идентификатором  _elemId_ и устанавливать его содержимое ( _~innerHTML~_ ) с помощью функции, переданной аргументом:

~~~js
function newFunc (func, elemId) {
  const elem = document.getElementById(elemId)

  if (!elem || !elem.nodeType || elem.nodeType !== 1) return

  function makeElem () {
    const el = document.createElement('p')
    elem.appendChild(el)
    el.innerHTML = func()
    console.log(el)
  }

  typeof func === 'function' && makeElem(func, elem)
}
~~~

Вызовем  функцию **newFunc**, передав ей функцию **frog** в качестве первого аргумента, а вторым аргументом передадим ей  ~id~ созданного нами элемента ( "_sample_" ):

~~~js
newFunc(frog, 'sample')
~~~

В результате на странице появится новый элемент с текстом, который возвращает функция **frog()**

Теперь вызовем  функцию **newFunc()**, передав ей функцию **elefant()**:

~~~js
newFunc(elefant, 'sample')
~~~

В результате на странице появится новый элемент с текстом, который возвращает функция  **elefant()**

________________________________

## ![ico-25 icon] Функция-возвращаемое значение

Теперь объявим функцию  **createFunction()**,  которая будет возвращать функцию:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function createFunction (param) {
  return function () {
    console.log('function ', param)
  }
}
~~~

и создадим с ее помощью две новые функции: **firstFunc()**  и  **secondFunc()**:

~~~js
var firstFunc = createFunction('First')
var secondFunc = createFunction('Second')
~~~

Вызовем каждую из этих функций:

~~~js
firstFunc()
secondFunc()
~~~

В консоли мы увидим:

~~~console
function  First
function  Second
~~~
