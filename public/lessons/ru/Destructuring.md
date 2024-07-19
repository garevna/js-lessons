# ![ico-40 icon] Деструктуризация

**ES6**

_Деструктуризация - это разложение структуры данных на элементарные составляющие_

**Структура данных** - это совокупность элементов, объединенных под одним именем и организованных по определенному принципу

Фактически структура данных - это именованная капсюла с четким протоколом доступа к ее содержимому:
    в массиве - по индексу элемента массива,
    в объекте - по имени свойства

Структуру данных можно "рассыпать" в отдельные переменные

Это и есть **деструктуризация**

![ico-20 warn] Как правило, при деструктуризации имеет место присваивание

В левой части оператора присваивания будет перечень переменных в квадратных или фигурных скобках ( в зависимости от того, что деструктурируем ), в правой - массив или объект, который мы деструктурируем

_______________________________________________________________

## ![ico-25 icon] Массивы

При деструктуризации массива переменные в левой части оператора присваивания должны перечисляться в **квадратных** скобках

◘◘![ico-20 cap] 1◘◘

~~~js
const fruits = ['банан', 'апельсин', 'киви']
const [var1, var2, var3] = fruits

console.info(var1)   // "банан"
console.info(var2)   // "апельсин"
console.info(var3)   // "киви"

// функция getArr возвращает массив

const getArr = deg => [Math.sin(deg), Math.cos(deg)]

// Получим результат ее работы в переменные  sin30  и  cos30

const [sin30, cos30] = getArr(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.info(cos30)  // 0.5
~~~

___________________________________________________________

### ![ico-20 icon] Обмен значениями

(деструктурирующее присваивание)

Деструктуризация позволяет одной строкой выполнить обмен значениями между переменными:

◘◘![ico-20 cap] 2◘◘

~~~js
let x = 5, y = 7, z = 9;

[x, y, z] = [y, z, x];

console.info(x)  // 7
console.info(y)  // 9
console.info(z)  // 5
~~~

___________________________________________________________

### ![ico-20 icon] Выборка отдельных значений из массива

Пусть функция **_getAngleData_** возвращает массив

Вызовем эту функцию, но "пропустим" возвращаемое ею значение тангенса угла:

◘◘![ico-20 cap] 3◘◘

~~~js
const getAngleData = deg => ([
  Math.sin(deg),
  Math.cos(deg),
  Math.tan(deg),
  Math.atan(deg)
])

const [sin30, cos30, , arctg30] = getAngleData(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.info(cos30)  // 0.5
console.info(arctg30)  // 0.808448792630022
~~~

~~~js
const calcAngleData = (funcs => deg => funcs.map(func => Math[func](deg)))(['sin', 'cos', 'tan', 'atan'])
console.log(calcAngleData(Math.PI/3))
~~~

___________________________

### ![ico-20 icon] Сортировка массива

Объявим массив чисел:

~~~js
const array = [5, 1, 4, 9, 3, 8, 0]
~~~

Выполним следующий код:

◘◘![ico-20 cap] 4◘◘

~~~js
array.forEach((item, index, arr) => {
  let [current, prev] = [index, index]
  while (--prev >= 0) {
    if (arr[current] < arr[prev]) {
      [arr[prev], arr[current]] = [arr[current], arr[prev]];
      current = prev
    }
  }
})
~~~

В результате исходный массив array станет таким:

~~~console
[0, 1, 3, 4, 5, 8, 9]
~~~

Теперь изменим исходный массив:

~~~js
const array = ['undefined', 'number', 'boolean', 'string', 'function', 'symbol', 'object']
~~~

и выполним тот же код

В результате исходный массив станет таким:

~~~console
["boolean", "function", "number", "object", "string", "symbol", "undefined"]
~~~

_____________________________________________________________

## ![ico-25 icon] Date()

~~~js
new Date(...new Date().toLocaleDateString().split('.').reverse())
~~~

Предположим, в базе данных дата рождения юзера хранится в виде строки:

~~~js
user.birthday = new Date(...).toLocaleDateString()
~~~

или:

~~~js
user.birthday = '27.05.2001'
~~~

Для вычисления количества дней, оставшихся до дня рождения юзера, нужно эту строку опять превратить в объект класса ~Date~:

~~~js
const userBirthday = new Date(...user.birthday.split('.').reverse())
~~~

_____________________________________________________________

## ![ico-25 icon] Объекты

Если мы деструктурируем объект, то переменные в левой части оператора присваивания будут перечисляться в **фигурных** скобках

![ico-20 warn] При этом имена переменных должны совпадать с именами свойств объекта<br/>
( порядок следования не имеет значения )

◘◘![ico-20 cap] 5◘◘

~~~js
const user = {
  name: 'Georg',
  role: 'admin',
  stars: 5
}

const { name, role, stars } = user

console.info(name)   // "Georg"
console.info(role)   // "admin"
console.info(stars)  // 5
~~~

![ico-25 warn] Если при деструктуризации объекта переменные в левой части оператора присваивания были объявлены ранее, то все выражение нужно заключить в круглые скобки:

~~~js
let name, age

({ name, age } = { name: 'Ivan', age: 25 })
~~~

В противном случае будет сгенерировано исключение

~~~console
⛔️ Uncaught SyntaxError: Unexpected token =
~~~

![ico-25 warn] Если мы хотим присвоить значение переменной с именем, отличающимся от имени свойства деструктурируемого объекта,
то при перечислении имен свойств в левой части оператора присваивания через двоеточие можно указать новое имя переменной:

◘◘![ico-20 cap] 6◘◘

~~~js
const user = {
  login: 'Ivan',
  age: 42,
  works: true
}

const {
  login: userName,
  works: employed
} = user

console.log(userName)   // "Ivan"
console.log(employed)   // true
~~~

![ico-25 warn] При деструктуризации объектов можно устанавливать значения переменных по умолчанию

(на случай, если такого свойства в объекте нет)

____________________________________________________________________

◘◘![ico-20 cap] 7◘◘

~~~js
const {
  login = 'Сергей',
  speciality = 'слесарь'
} = { login: 'Ivan', age: 42 }

console.log(login)       // "Ivan"
console.log(speciality)  // "слесарь"
~~~

----------------------------------------------------------------------

## ![ico-25 icon] Деструктуризация глубоких структур данных

◘◘![ico-20 cap] 8◘◘

~~~js
const humans = [
  {
    name: 'Stephan',
    age: 38,
    speciality: 'worker'
  },
  {
    name: 'Mary',
    age: 45,
    speciality: 'teacher'
  },
  {
    name: 'Peter',
    age: 18,
    speciality: 'student'
  }
]

const [, , { name, age, speciality }] = humans

console.log(name, age, speciality)  // Peter 18 student
~~~

◘◘![ico-20 cap] 9◘◘

~~~ js
const user = {
  name: 'Peter',
  age: 30,
  hobby: ['football', 'fishing', 'sleeping'],
  family: {
    mother: {
      name: 'Mary',
      age: 55,
      hobby: ['flowers', 'walks']
    },
    father: {
      name: 'Joseph',
      age: 60,
      hobby: ['safari', 'run']
    }
  }
}

const { hobby: [, , last] } = user

console.log(last)  // sleeping

const { family: { mother } } = user

console.log(mother) // { name: 'Mary', age: 55, hobby: Array(2) }

const { family: { mother: { name: motherName } } } = user

console.log(motherName)  // Mary

const { family: { mother: { hobby: [, motherLastHobby] } } } = user

console.log(motherLastHobby)  // walks
~~~

____________________________________________________________________


## ![ico-25 icon] spread и rest (...)

Оператор **...** позволяет получить:
• результат деструктуризации массива или объекта (spread)
• остаток от дестуктурированного массива или объекта (rest)

◘◘![ico-20 cap] 10◘◘

~~~js
const getAngleData = deg => (['sin', 'cos', 'tan', 'atan'].map(func => Math[func](deg)))

const show = function () {
  for (const arg of arguments) {
    console.log(arg)
  }
}

show(...getAngleData(Math.PI/3))
~~~

~~~console
0.8660254037844386
0.5000000000000001
1.7320508075688767
0.808448792630022
~~~

Мы использовали оператор ~spread~ для передачи аргументов функции ~show~

Теперь получим остаток массива, возвращаемого функцией **~getAngleData~**, в массив **~rest30~**
с помощью оператора ~rest~

~~~js
const [sin30, ...rest30] = getAngleData(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.log(rest30)
~~~

~~~console
(3) [0.5000000000000001, 1.7320508075688767, 0.808448792630022]
~~~

_______________________________________

### ![ico-20 icon] Оператор rest (...) в применении к объекту

◘◘![ico-20 cap] 11◘◘

~~~js
const user = {
  name: 'Piter',
  pass: 'xYc9-8a/bbb',
  age: 25,
  email: 'piter@gmail.com',
  hobby: 'football'
}
~~~

~~~js
const { pass, ...userWithoutPass } = user

console.log(pass)   // xYc9-8a/bbb
console.log (userWithoutPass)
~~~

~~~console
▼ {name: "Piter", age: 25, email: "piter@gmail.com", hobby: "football"}
    age: 25
    email: "piter@gmail.com"
    hobby: "football"
    name: "Piter"
  ► __proto__: Object
~~~

_______________________________________

### ![ico-20 icon] Клонирование "плоского" массива

Массивы (как и все объекты) передаются по ссылке,
но иногда нужно клонировать массив,
и в этом случае самый лаконичный способ - использовать конструктор **Array** для создания нового массива,
но с элементами исходного экземпляра
Оператор spread ( ... ) позволяет сделать короткую запись при передаче элементов исходного массива конструктору:

◘◘![ico-20 cap] 12◘◘

~~~js
const array = [1, 2, 3, 4, 5]

const clone = new Array(...array)
~~~

![ico-20 warn] Однако следует помнить, что это не глубокое копирование,
т.е. если элементами исходного массива являются объекты (массивы),
то элементы клона будут ссылками на те же объекты (массивы)

~~~js
const first = [1, 2, 3, 4, 5]
const second = [10, 20, 30]

const clone = new Array(...first, ...second)
~~~

___________________________

## ![ico-20 icon] Immutability

Предположим, у нас есть функция, возвращающая "дефектную" фунцию
(с побочным эффектом - изменение данных внешнего окружения),
которая получает массив в качестве аргумента
и суммирует его элементы следующим образом:

◘◘![ico-20 cap] 13◘◘

~~~js
const numbers = [10, 5, 7]
const result = 0

const summation = () => {
  let result = 0
  return array => {
    while (array.length) result += array.shift()
    return result
  }
}
~~~

а мы не хотим, чтобы массив **numbers** опустошался после передачи ссылки на него в качестве аргумента,
можно использовать оператор **~spread~** так:

~~~js
console.log((summation())([...numbers]))
console.log(numbers)
console.log(result)
~~~

____________________________________________________________

Деструктурировать можно не только массивы, но любые **итерабельные** структуры данных

Деструктурируем ~NodeList~ и ~HTMLCollection~

◘◘![ico-20 cap] 14 (html)◘◘

~~~html
<body>
  <p class="paragraph">1</p>
  <p class="paragraph">2</p>
  <p class="paragraph">3</p>
  <p class="paragraph">4</p>
</body>
~~~

◘◘![ico-20 cap] 14 (JS)◘◘

~~~js
const [first, second, third, forth] = document.querySelectorAll('.paragraph')

console.log(first)   // <p class="paragraph">1</p>
console.log(second)  // <p class="paragraph">2</p>
console.log(third)   // <p class="paragraph">3</p>
console.log(forth)   // <p class="paragraph">4</p>
~~~

____________________________________________________________________

Посмотрим, как с помощью деструктуризации можно сократь код:

Разметка

◘◘![ico-20 cap] 15 (html)◘◘

~~~html
<body>
    <button id="registration">Регистрация</button>
    <button id="sign-in">Вход</button>
    <h3 id="title">Hello</h3>
    <div id="demo">
        <p>User name:</p>
        <input id="name"/>
        <p>password:</p>
        <input id="pass" type="password"/>
        <button>Submit</button>
    </div>
</body>
~~~

Получить элементы по **~id~**

◘◘![ico-20 cap] 15 (JS)◘◘

~~~js
const demo = document.getElementById('demo')
const btnReg = document.getElementById('registration')
const btnSignIn = document.getElementById('sign-in')
const nameElem = document.getElementById('name')
const passElem = document.getElementById('pass')
const title = document.getElementById('title')
~~~

◘◘Альтернативный вариант◘◘

~~~js
const [demo, btnReg, btnSignIn, nameElem, passElem, title] = ['demo', 'registration', 'sign-in', 'name', 'pass', 'title']
  .map(id => document.getElementById(id))
~~~

_______________________________________________________________________

Посчитаем, сколько раз встречается каждый символ в строке

Результат поместим в объект, где имя каждого свойства будет буквой, а значение - числом, сколько раз этот символ встречается в строке ~str~

◘◘![ico-20 cap] 16◘◘

~~~js
const lettersCounter = str => Object.assign({}, ...str
  .split('')
  .map(letter => ({ [letter]: str.match(eval(`/${letter}/g`)).length })))
}))

lettersCounter('htkolkhlfottko')
~~~

**результат**

~~~console
▼ {h: 2, t: 3, k: 3, o: 3, l: 2, …}
    f: 1
    h: 2
    k: 3
    l: 2
    o: 3
    t: 3
  ► __proto__: Object
~~~

___________________________________________________________________

### ![ico-30 icon] Other samples

Если любой объект сделать итерабельным, то к нему можно применять оператор ~spread~

◘◘![ico-20 cap] 17◘◘

~~~js
function func (a, b, c) {
  console.log(a + b + c)
}

const user = {
  a: 5,
  b: 8,
  c: 13,
  [Symbol.iterator]: function* () {
    for (const key of Object.keys(this)) yield this[key]
  }
}

func(...user)   // 26
~~~

______________________________________________________________

◘◘![ico-20 cap] 18◘◘

~~~js
console.log([...'012345'])
~~~
~~~console
► (6) ['0', '1', '2', '3', '4', '5']
~~~

~~~js
console.log({ ...'012345' })
~~~
~~~console
► {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'}
~~~

~~~js
function func (a, b, c) {
  console.log(a*1 + b*1 + c*1)
}

func(...'578')  // 20


function test ({ a, b, c } = { a: 3, b: 4, c: 5 }) {
  console.log(a + b + c)
}

test()  // 12

test({ a: 5, b: 7, c: 8 })  // 20
~~~

_________________________

### ![ico-30 hw] Упражнение

Что может вернуть следующий код (все варианты):

~~~js
function first () {
  return Math.random() > 0.5 ? 'First' : ''
}

function second () {
  return Math.random() < 0.5 ? 'second' : ''
}

second() || console.log(...[first(), second()])
~~~

_______________________________________________________________________________


[![ico-25 hw] Quiz](quiz/destructuring)

_______________________________________________________________________________
