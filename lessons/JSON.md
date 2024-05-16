# ![ico-30 study] JSON

Формат хранения объектов JS  в виде текстовой строки удобен с точки зрения обмена данными с сервером и хранения данных сложной структры

Он является более компактной альтернативой формату **XML** (e**X**tensible **M**arkup **L**anguage)

**~JSON~** - это встроенный нативный объект (![ico-20 warn] не конструктор)

Имеет всего два метода:

![ico-20 green-ok] **JSON.stringify()**
![ico-20 green-ok] **JSON.parse()**

^^^[JSON]
~~~console
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
~~~
^^^

_____________________

## ![ico-25 icon] JSON.stringify()

Единственный обязательный аргумент метода - ссылка на объект или массив, причем глубина структуры данных не ограничена
Два дополнительных формальных параметра являются опциональными.
Возвращаемое значение -  JSON-строка

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

![ico-25 cap] ** 2**

Второй (опциональный) формальный параметр может быть использован, например, следующим образом:

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

![ico-25 cap] ** 3**

Третий (опциональный) формальный параметр нужен для форматирования результата:

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

### Ограничения

Делов в том, что сериализация объектов не всегда возможна. 
Есть так называемые несериализуемые объекты, содержащие циклические ссылки.

Например, при попытке сериализовать объект **window** мы получим _TypeError_:

![ico-25 cap] ** 4**

~~~js
console.log(JSON.stringify(window, null, 2))
~~~

••![ico-20 error] Uncaught TypeError: Converting circular structure to JSON••

Попробуем сериализовать объект, содержащий следующие свойства:

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

Как видно из примера, **Infinity**, **undefined** и **Symbol**, а так же методы объекта отбрасываются при сериализации.

_____________________

## ![ico-25 icon] JSON.parse()

Единственный обязательный аргумент метода - JSON-строка
Возвращаемое значение - структура данных JS ( массив или объект )

![ico-20 warn] В строке  JSON  все строчные значения ( включая имена свойств )  заключаются в **двойные** кавычки
![ico-20 warn] Числовые и логические значения, массивы и объекты в кавычки не заключаются

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

## ![ico-25 icon] Глубокое копирование

Известно, что массивы и объекты передаются по ссылке

Если объект имеет плоскую структуру, то получить точную копию этого объекта можно с помощью метода **~Object.assign()~**

Однако если свойства объекта являются объектами или массивами, то **~Object.assign()~** скопирует ссылки на эти вложенные объекты

Если же выполнить сначала **~JSON.stringify()~**, а затем **~JSON.parse()~**, то в результате мы получим точную копию объекта, а не ссылку

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

В переменной **sample** теперь находится точная копия объекта **obj**, включая значения элементов массива **position**, а не ссылка на него

Сравним результаты  **~Object.assign()~** и  **~JSON.stringify()~** → **~JSON.parse ()~**

~~~js
var test = Object.assign({}, obj)
~~~

Логическое выражение

~~~js
test.position === obj.position
~~~
возвращает ~true~, поскольку значение свойства  **test.position** является ссылкой на объект **obj.position**

А вот логическое выражение

~~~js
sample.position === obj.position
~~~

вернет  ~false~, потому что **sample.position** является другим объектом, ссылка на который не совпадает со ссылкой на объект **obj.position**

------------------------------------

## ![ico-25 icon] Лайфхак

Поставим задачу сериализации объекта, включая его методы.

![ico-25 cap] ** 8**

Для этого, прежде всего, добавим конструктору Function в prototype метод **toJSON**:

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

Теперь сериализация объекта пройдет нормально, но метод будет включен в json-строку как текстовая строка:

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

Запишем объявление метода несколько иначе:

~~~js
var user = {
  name: 'Jack',
  age: 25,
  hobby: 'football',
  getName: function getName () {
    console.log(this.name)
  }
}
~~~

и добавим метод **parseFuncs** объекту **JSON**:

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

Теперь мы можем смело сериализовать объект _user_ и затем парсить результат методом **parseFuncs**:

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
