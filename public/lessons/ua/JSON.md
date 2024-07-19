# ![ico-30 study] JSON

Формат зберігання JS-об'єктів у вигляді текстового рядка зручний з точки зору обміну даними з сервером і зберігання даних складної структури.

Це більш компактна альтернатива формату **XML** (e<b>X</b>tensible ** M**arkup ** L**anguage).

**~JSON~** - є вбудованим нативним об'єктом (![ico-20 warn] не конструктор).

У нього всього два методи:

![ico-20 green-ok] **JSON.stringify()**
![ico-20 green-ok] **JSON.parse()**

~~~~console
▼ JSON
    ► parse: ƒ parse()
    ► stringify: ƒ stringify()
      Symbol(Symbol.toStringTag): "JSON"
    ▼ __proto__:
        ► constructor: ƒ Object()
        ► hasOwnProperty: ƒ hasOwnProperty()
        ► isPrototypeOf: ƒ isPrototypeOf()
        ► propertyIsEnumerable: ƒ propertyIsEnumerable()
        ► toLocaleString: ƒ toLocaleString()
        ► toString: ƒ toString()
        ► valueOf: ƒ valueOf()
        ► __defineGetter__: ƒ __defineGetter__()
        ► __defineSetter__: ƒ __defineSetter__()
        ► __lookupGetter__: ƒ __lookupGetter__()
        ► __lookupSetter__: ƒ __lookupSetter__()
        ► get __proto__: ƒ __proto__()
        ► set __proto__: ƒ __proto__()
~~~~

_____________________

## ![ico-25 icon] JSON.stringify()

Обов'язковим аргументом методу є посилання на об'єкт або масив, а глибина структури даних не обмежена.
^^Два додаткові формальні параметри є необов'язковими.^^
Значення, що повертається - рядок JSON.

![ico-25 cap] ** 1**

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

JSON.stringify(obj)
~~~

~~~console
'{"name":"sample","type":"figure","color":"green","size":200,"position":[250,250]}'
~~~

_____________________

![ico-25 cap] ** 2**

Другий (необов'язковий) формальний параметр можна використовувати, наприклад, наступним чином:

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

JSON.stringify(obj, ['name', 'type', 'color'])
~~~

~~~console
'{"name":"sample","type":"figure","color":"green"}'
~~~

__________________________________

![ico-25 cap] ** 3**

Третій (необов'язковий) формальний параметр потрібен для форматування результату:

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

console.log(JSON.stringify(obj, null, 2))
~~~

~~~console
{
  "name": "sample",
  "type": "figure",
  "color": "green",
  "size": 200,
  "position": [
    250,
    250
  ]
}
~~~

### ![ico-20 icon] Обмеження

Справа в тому, що серіалізація об'єктів не завжди можлива.
Є так звані об'єкти, що не серіалізуються, тому що містять циклічні посилання.

Наприклад, при спробі серіалізувати об'єкт **window** ми отримаємо _TypeError_:

![ico-25 cap] ** 4**

~~~js
console.log(JSON.stringify(window, null, 2))
~~~

••![ico-20 error] Uncaught TypeError: Converting circular structure to JSON••

___________________

Спробуємо серіалізувати об'єкт, що містить такі властивості:

![ico-25 cap] ** 5**

~~~js
var user = {
  name: 'Jack',
  age: Infinity,
  hobby: 'football',
  [Symbol.for('user-pay')]: 45,
  job: undefined,
  getName () {
    console.log(this.name)
  }
}

console.log(JSON.stringify(user, null, 2))
~~~

~~~console
{
  "name": "Jack",
  "age": 25,
  "hobby": "football"
}
~~~

Як видно з прикладу, **Infinity**, **undefined** та **Symbol**, а також **методи** об'єкта відкидаються при серіалізації.

_____________________

## ![ico-25 icon] JSON.parse()

Єдиний обов'язковий аргумент методу – JSON-рядок.
Значення, що повертається - структура даних JS (масив або об'єкт).

![ico-20 warn] У рядку JSON всі малі значення (включаючи назви властивостей) заключені в **подвійні** лапки.
![ico-20 warn] Числові та логічні значення, масиви й об'єкти в лапки не беруться.

![ico-25 cap] ** 6**

~~~js
var x = `{
  "name": "sample",
  "type": "figure",
  "attrs": {
    "color": "green",
    "size": 200,
    "position": [250, 250]
  }
}`

JSON.parse(x)
~~~

~~~console
▼ {name: "sample", type: "figure", attrs: {…}}
  ▼ attrs:
        color: "green"
      ► position: (2) [250, 250]
        size: 200
      ► __proto__: Object
    name: "sample"
    type: "figure"
  ► __proto__: Object
~~~

___________________

## ![ico-25 icon] Глибоке копіювання

Відомо, що масиви та об'єкти передаються за посиланням.

Якщо об'єкт має плоску структуру, отримати точну копію цього об'єкта можна за допомогою методу **~Object.assign()~**.

Однак якщо властивості об'єкта є об'єктами або масивами, **~Object.assign()~** скопіює посилання на ці вкладені об'єкти.

Якщо ж виконати спочатку **~JSON.stringify()~**, а потім **~JSON.parse()~**, то в результаті ми отримаємо клони вкладених об'єктів і масивів, а не посилання на них.

![ico-25 cap] ** 7**

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}
var sample = JSON.parse(JSON.stringify(obj))
~~~

У змінній **sample** тепер знаходиться точна копія об'єкта **obj**, включаючи значення елементів масиву **position**, а не посилання на нього.

Порівняємо результати  **~Object.assign()~** та **~JSON.stringify()~** → **~JSON.parse ()~**

~~~js
var test = Object.assign({}, obj)
~~~

Логічний вираз:

~~~js
test.position === obj.position
~~~
повертає ~true~, оскільки значення властивості  **test.position** є посиланням на об'єкт **obj.position**.

А ось логічний вираз:

~~~js
sample.position === obj.position
~~~

поверне ~false~, тому що **sample.position** є іншим об'єктом, посилання на який не збігається з посиланням на об'єкт **obj.position**.

------------------------------------

## ![ico-25 icon] Лайфхак

Поставимо завдання серіалізації об'єкта, включаючи його методи.

![ico-25 cap] ** 8**

Для цього, перш за все, додамо конструктору **~Function~** у prototype метод **toJSON**:

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

Тепер серіалізація об'єкта пройде нормально, але метод буде включений в json-рядок як текстовий рядок:

~~~js
var user = {
  name: 'Jack',
  age: 25,
  hobby: 'football',
  getName () {
    console.log(this.name)
  }
}

console.log(JSON.stringify(user, null, 2))
~~~

~~~console
{
  "name": "Jack",
  "age": 25,
  "hobby": "football",
  "getName": "getName () {\n    console.log(this.name)\n  }"
}
~~~

Запишемо оголошення методу трохи інакше:

~~~js
var user = {
  name: 'Jack',
  age: 25,
  hobby: 'football',
  getName () {
    console.log(this.name)
  }
}
~~~

і додамо метод **~parseFuncs~** до об'єкту **JSON**:

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

Тепер ми можем з впевненістю серіалізувати об'єкт **user**, а потім розібрати результат за допомогою методу **~parseFuncs~**:

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
