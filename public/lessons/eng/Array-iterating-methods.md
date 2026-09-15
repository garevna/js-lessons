# ![ico-35 study] Array iterating methods

These methods teach us to think within the **functional paradigm**.

All array iterating methods are **higher-order functions**.
![ico-20 exclamation] The required first argument of each method is **function**.
![ico-20 warn] If, when calling a method, the first argument is not a function, an exception **TypeError** will be generated.
^^The second argument of the method is optional; it is a reference to the call context of the **function-argument**.^^

Essentially, iterating methods are a functional "wrapper" for the **~for...of~** loop.
Each method sequentially iterates through the elements of the array from the first to the last, and at each iteration calls the **argument-function** passed to it.

The **function-argument** of the method has three optional formal parameters:
1) current array element.
2) index of the current array element.
3) a reference to an iterable array.

[►►►Let's look deeper?►►►](page/Array-iterating-methods-theory.md)

_____________________________________________________

## ![ico-30 icon] forEach()

![ico-20 warn] This method does not return any value.
Let's compare the behaviour of this method with the functioning of the **~for...of~** loop.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const  people = ['Ivan', 'Mary', 'Elena', 'Andrey']

people.forEach(currentName => console.log(currentName))

for (const currentName of people) console.log(currentName)
~~~

^^Here we iterate over the **people** array using the **~forEach~** method.^^
^^The **~forEach~** method is passed an anonymous function as an argument:^^

~~~js
currentName => console.log(currentName)
~~~

In this example, the result of the **~forEach~** method and the **~for...of~** loop operator will be identical.
However, in various situations it is more convenient for us to use either the **~for...of~** operator or the **~forEach~** method.
Since the **~forEach~** method does not return any value, there seems to be no point in using it in chain calculations.
Then what is its advantage over the **~for...of~** operator?

If you learn to think in the functional paradigm, the advantage of the method over the operator will become obvious to you.
But even if we don’t talk about how much more convenient methods are than operators, there are a number of additional advantages of the **~forEach~** method over the **~for...of~** loop.
For example, the **~forEach~** method passes the **function-argument** not only the value of the array element, but also its index.

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

![ico-25 warn] If you are not yet familiar with async-stuff (promises and asynchronous functions), then come back to the next example later.

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

In this example, we simulate the delay associated with retrieving user data from a remote server using the **show** function, which returns a ~promise~.

By passing an asynchronous anonymous function to the **~forEach~** method, we ensure sequential output of user names from the array.

~~~console
Mary
Robert
Stephan
Piter
~~~

Now let's use the **~for...of~** operator:

~~~js
for (const user of users) {
  show(user).then(name => console.log(name))
}
~~~

As we can see, user names are displayed in random order:

~~~console
Stephan
Mary
Robert
Piter
~~~

And in order to preserve the order of user names in accordance with their index in the array, we have to “wrap” the loop operator in an asynchronous function:

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

The question arises, why do this if we already have a functional “wrapper” for the **~for...of~** loop?
_____________________

It should also be noted that sometimes using the loop operator **~for...of~** is more convenient than calling the **~forEach~** method.
For example, if you want to use the **~continue~** | **~break~** operators, then your choice is the **~for...of~** operator.

__________________________________________

The third formal parameter of **function-argument** is quite problematic.
It is a reference to the original array.
And we know that

☼☼☼ reference is a lockpick ☼☼☼

Passing a reference creates the ability to mutate the original array:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const  numbers = [8, 4, 9, 7]

numbers.forEach((numb, ind, res) => res[ind] = numb * 2)

console.log(numbers) // [ 16, 8, 18, 14 ]
~~~

^^those. the original **numbers** array has been modified.^^

By providing the **function-argument** of the method with access to the source array by reference, we create the possibility of **side effects** associated with possible mutations of the source array.

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const users = ['Mary', 'Piter', 'Robert', 'Stephan']

users.forEach((name, index, arr) => console.log(arr.pop()))
~~~

Perhaps you expected to see a complete list of users in the console, but you only saw the last two names from the array:

~~~console
Stephan
Robert
~~~

In this case, only the first two names remain in the **users** array:

~~~js
console.log(users)
~~~

~~~console
► (2) ['Mary', 'Piter']
~~~

This is a side effect of mutating the **users** array.
At each iteration, the length of the array is reduced by 1, and the **~forEach~** method compares the current index value with the length of the array, and stops the loop when the index value becomes equal to the length of the array. After two iterations, the index value will be 2, and the length of the array will also be 2.

___________________________

Mutations of the source array can occur even without passing a reference to the source array. This is due to the fact that if the array elements have a **reference data type**, then the **function-argument** of the method will receive not a value, but a ~reference~, and this creates the possibility of mutations of array elements by ~reference~.

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

### ![ico-25 icon] Function-argument call context

The **~forEach~** method, like almost all other array iterating methods, can take an additional argument - a reference to the ~call context~ to the **function-argument**.

![ico-20 warn] However, the function passed to the method as an argument must not be an arrow function.


◘◘![ico-25 cap] ** 7**◘◘

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(function (interval) { console.log(this) }, intervals)
~~~

^^As a result of executing this code, the console will display an array **~intervals~**.^^
^^In fact, passing a second argument to a method is equivalent to binding the context:^^

~~~js
intervals.forEach(function (interval) { console.log(this) }.bind(intervals))
~~~

^^Therefore, when using an arrow function whose context cannot be changed, we will see the **~window~** object in the console.^^

~~~js
const intervals = [[1, 8], [2, 3], [4, 7], [5, 6]]

intervals.forEach(interval => console.log(this), intervals)
~~~

_____________________

^^Suppose we want to pass a reference to the array **~res~**, where the results of calculations should be placed:^^

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const  numbers = [8, 4, 9, 7]
const res = []

numbers.forEach(function (numb, ind) {
  this.push(numb * ind)
}, res)
~~~

^^Such operations do not make much sense, since for this we have the <a href="#map()">![ico-20 link]**map**</a> method, which will be discussed later.^^

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

### ![ico-20 icon] Examples with the ~map~ method

◘◘![ico-25 cap] **10**◘◘

~~~js
['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .forEach((item, index) => Object.assign(window, {
      [item]: arg => typeof arg === 'function' ? arg(index) : index
  }))
~~~

Go to [![ico-20 link] **_link_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )
"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"

In the new tab console, run the code:
You should get the result:
Go to [![ico-20 link] **_link_**](https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018 )
Now in the new tab console, declare the function:

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

Call the **~getSearchObject~** function.
You should get the result:
The **~filter()~** method iterates the array, checking that the specified condition is satisfied for each element of the array.
The method returns a new array.
The resulting array will contain only those elements that satisfy the filtering condition.
◘◘**Result**◘◘
The method searches the array and returns the first found element that satisfies the given condition.
If there is no such element in the array, returns ~undefined~.

{{{Array-iteration-methods-3.js}}}

____________________

◘◘**Result**◘◘

Like ~find()~ method, it searches the array for the first element that satisfies the specified condition.

~~~js
const callback = rule => console.log(rule)

Array.from(document.styleSheets)
  .forEach(sheet => sheet.href && Array.from(sheet.cssRules).forEach(callback))
~~~

______________________

## ![ico-30 icon] map()

However, it does not return the element itself, but its index.
If no such element is found in the array, returns **-1**.
The obvious advantage over the **~indexOf~** method is that you can work with arrays of elements that have a **reference data type**.

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

In this example, the array elements are objects, and the **~indexOf~** method is not applicable to this array.
Checks the array for elements that **not** satisfy the specified condition.
Returns a boolean value:

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

### ![ico-20 icon] Examples with the reduce() method

Let's reduce an array of strings to an object.

To do this, we definitely need to specify the starting value of the **accumulator variable**, since the value of the first element of the array will be a string, and we want to get an object.

◘◘![ico-25 cap] ** 2**◘◘

~~~js
location.search
  .slice(1).split(',')
  .map(x => ({ [x.split('=')[0]] : x.split('=')[1] }))
~~~

Now let's reduce the array of objects to a string.

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "garevna"}
  ► 1: {date: "10.07.2018"}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________

Now let's count how many times each character appears in the string and return an object:

Now let's count how many residents of each country are on the list.

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

The engine uses the exponential form of representing small numbers, i.e. instead of **~0.0000005~** there will be **~5e-7~**.

For large numbers the same thing happens, i.e. instead of **~5000000000000000000000~** there will be **~5e+21~**.

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

From here:
As in the case of other iterating methods, the **function-argument** is it can take additional arguments - the index of the current array element and a link to the original array itself.
With a reference, we can manipulate the original array, making it mutable.

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

◘◘![ico-20 cap] ** 7**◘◘

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

The library function **~Math.sqrt~** takes only 1 argument (a number), and returns the square root of the received argument.

If we do not pass a second argument to the **~reduce~** method when calling, it will use the value of the first element of the array as the starting value of the **accumulator variable**.

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

At each iteration, this value will be replaced by its square root.

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

The remaining elements of the array will not participate in the calculations, since **~Math.sqrt~** takes only 1 argument, and this will be the current value of the **accumulator variable**.
◘◘![ico-20 cap] ** 8**◘◘

••625 -> 25 -> 5••

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

^^If we add this method **~root~** to the prototype of the **~Array~** constructor, then the result of its call will be the same:^^
◘◘![ico-20 cap] ** 9**◘◘

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

^^Therefore, the number of iterations (that is, how many times the square root of the **accumulator variable** will be extracted) will be equal to the number of array elements.^^

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

### ![ico-20 icon] Math.pow

This function takes two numeric arguments: the number to be raised to the power and the value of the power.
If we do not pass the starting value of the **accumulator variable** as the second argument of the **~reduce~** method, then the value of the first element of the array will be used as this value.


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

The remaining elements of the array will be the values ​​of the power to which the current value of the **accumulator variable** needs to be raised.

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

If we pass the starting value of the **accumulator variable**, then all elements of the array will be considered as the power to which we need to raise the current value of the **accumulator variable**.

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

◘◘![ico-20 cap] ** 10**◘◘

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

### ![ico-25 hw] Tests

What will the following expressions return:

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

◘◘** 1**◘◘

The method sorts the array according to the specified sorting condition.
The sorting condition is checked by the **argument function** passed to the method.
_The **argument function** has two formal parameters whose values ​​are used for comparison._.

The function returns one of three values:

|  0 | elements coincided (equal)            |
|  1 | first argument is greater than second |
| -1 | second argument is greater than first |

Based on the value returned by the function, the method changes the order of the elements in the array.

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

◘◘![ico-20 cap] ** 1**◘◘

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

^^To understand the sorting mechanism, let’s display the values ​​of the array elements being compared at each iteration to the console:^^

~~~console
fond - bonus = 30
payments - fond = 50
credit - payments = 50
income - credit = 120
salary - income = 80
debt - salary = 300
~~~

^^^[Logging]
◘◘**Result**◘◘
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

^^Let's create a **log** array, in which we will log all operations in the process of sorting the array.^^

So, unlike other array iterating methods, the **function-argument** has strictly two formal parameters.

![ico-20 warn] This method cannot be passed a reference to the call context.

__________________________

## ![ico-25 icon] flatMap()

![ico-25 require] Try to draw a block diagram of the algorithm for sorting an array.

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var cookie = 'name=user; token=Jd7-js15/84; interest=javascript'
~~~

There is a line **cookie**:

~~~js
console.log(cookie.split('; ').map(item => item.split('='))
~~~

Let's split the string **cookie** and apply the **~map~** method to the resulting array.

~~~console
▼ (3) [Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "user"]
  ► 1: (2) ["token", "Jd7-js15/84"]
  ► 2: (2) ["interest", "javascript"]
    length: 3
  ► __proto__: Array(0)
~~~

◘◘**^^Result^^**◘◘

We have received an array whose elements are arrays.

~~~js
console.log(cookie.split('; ').flatMap(item => item.split('='))
~~~

Now apply the **~flatMap~** method to the array:

~~~console
► (6) ["name", "user", "token", "Jd7-js15/84", "interest", "javascript"]
~~~

◘◘**^^Result^^**◘◘

We got a "flat" array.

~~~js
function (item) {
  return item.split('=')
}
~~~

So, using the same function:

____________________________________________________

## ![ico-25 icon] keys()

in the first case we received an array of arrays, and in the second we received a “flat” array.
**Generator**.

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

**Returns a _iterator_ object.**.

~~~console
name user
token Jd7-js15/84
interest javascript
~~~


______________________

## ![ico-25 icon] values()

◘◘**^^Result^^**◘◘
**Generator**.

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

**Returns a _iterator_ object.**.

~~~console
► (2) ["name", "user"]
► (2) ["token", "Jd7-js15/84"]
► (2) ["inerest", "javascript"]
~~~

_____________________________________________

## ![ico-30 icon] Examples and tests

_________________________________________

### ![ico-25 cap] Cache amount on cards

Let´s create an array of bank cards and use the **~reduce~** method to calculate the amount of funds on all cards:

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

Let´s create a new card on which we accumulate the account balances of all cards:

~~~js
cards.reduce((result, card) => ({
  num: result.num,
  cash: result.cash + card.cash
}), { num: '457855155', cash: 0 })
~~~

◘◘**^^Result^^**◘◘

~~~console
▼ { num: "457855155", cash: 10300 }
    cash: 10300
    num: "457855155"
  ► __proto__: Object
~~~

For the purity of the result, we will additionally reset the balances on the accounts of other cards:

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

Now the original map array will be:

◘◘**^^Result^^**◘◘

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

### ![ico-25 cap] Clearing duplicates

Let´s assume that we have an array of users, and we decide to get an array of all the specialties that these users have.
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

However, as we see, many specialties will be duplicated, which we absolutely do not need.

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

◘◘**^^specialities^^**◘◘

![ico-20 warn] Let´s immediately note that the easiest way to achieve this is using the **~Set~** constructor:

~~~js
Array.from(new Set(specialities))
~~~

But we decided to take a more difficult path ![ico-25 wink].

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

◘◘**^^Result^^**◘◘

~~~console
▼ (3) ["google", "mozilla", "ie"]
    0: "google"
    1: "mozilla"
    2: "ie"
    length: 3
  ► __proto__: Array(0)
~~~

_________________________________________________

### ![ico-25 cap] Number of nested segments

There are several segments on the number axis:

~~~js
const intervals = [[10, 20], [4, 18], [7, 10], [5, 16], [9, 13], [11, 15], [7, 15], [10, 12], [12, 19]]
~~~

For each segment, you need to count how many segments are inside it.

To simplify the code, add the **~testSegment~** method to the prototype of the **~Array~** constructor:
~~~js
Array.prototype.interior = function (interval = [0, 1]) {
  return this[0] < interval[0] && this[1] > interval[1]
}
~~~
Now you can compare two segments very simply:
~~~js
[18, 35].interior([4, 18]) // false
[18, 35].interior([20, 28]) // true
~~~
Now we can complete the task:
~~~js
intervals
  .map((segment, index, array) => array.filter(interval => segment.interior(interval)).length)
~~~

◘◘**^^Result^^**◘◘
~~~console
► (9) [2, 6, 0, 5, 1, 0, 2, 0, 0]
~~~

__________________________

### ![ico-25 cap] location

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
