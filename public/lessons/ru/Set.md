# ![ico-30 study] Set

**ES6**

**Конструктор**

Создает итерабельный объект с уникальными элементами

из **_итерабельного_** объекта

________________________

![ico-25 cap] new Set

~~~js
const sample = new Set([5, 1, 3, 8, 1, 5, 3, 3, 8])

console.log(sample)

// ► Set(4) {5, 1, 3, 8}

console.log(Array.from(sample))

// ► (4) [5, 1, 3, 8]
~~~

Давайте посмотрим, на что он способен:

~~~~Set.prototype
▼ Set {constructor: ƒ, has: ƒ, add: ƒ, delete: ƒ, clear: ƒ, …}
  ► add: ƒ add()
  ► clear: ƒ clear()
  ► constructor: ƒ Set()
  ► delete: ƒ delete()
  ► entries: ƒ entries()
  ► forEach: ƒ forEach()
  ► has: ƒ has()
  ► keys: ƒ values()
    size: (...)
  ► values: ƒ values()
  ► Symbol(Symbol.iterator): ƒ values()
    Symbol(Symbol.toStringTag): "Set"
  ► get size: ƒ size()
  ► __proto__: Object
~~~~

## ![ico-25 icon] values()

**~sample.values()~** создает и возвращает объект итератора

Создадим итератор и будем вызывать его метод **~next()~** в цикле:

~~~js
let done, iterator = sample.values()

while (!done) {
  ({ value: item, done } = iterator.next());
  console.log(item)
}
~~~

В консоль будут выведены все значения, находящиеся в объекте **~sample~**

________________________________

## ![ico-25 icon] add()

Добавляет новое значение в объект, если его там нет

^^Если такое значение уже существует, то ничего не изменится^^

~~~js
sample.add(1)
console.log(sample)

// ► Set(4) {5, 1, 3, 8}

sample.add(7)
console.log(sample)

// ► Set(4) {5, 1, 3, 8, 7}
~~~

____________________________

## ![ico-25 icon] delete()

Удаляет значение, если оно есть в объекте, и возвращает ~true~

^^Если такого значения нет, то вернет ~false~^^

~~~js
sample.delete(9)
// false

sample.delete(7)
// true

console.log(sample)
// ► Set(4) {5, 1, 3, 8}
~~~

______________________________________

## ![ico-25 cap] Пример 1

Мы знаем, что массивы и объекты передаются по ссылке

Поэтому **~userSet~** будет содержать все объекты из массива **~users~**,
хотя содержимое объектов дублируется

~~~js
const users = [
  {
    name: 'Stephan',
    job: 'java-developer'
  },
  {
    name: 'Margaret',
    job: 'markup-developer'
  },
  {
    name: 'Stephan',
    job: 'java-developer'
  },
  {
    name: 'Margaret',
    job: 'markup-developer'
  }
]

const userSet = new Set(users)

console.log(userSet)
~~~

Однако если мы сделаем так:

~~~js
const user1 = {
  name: 'Stephan',
  job: 'java-developer'
}

const user2 = {
    name: 'Margaret',
    job: 'markup-developer'
}

const usersDoubled = [user1, user2, user1, user1, user2]

const usersNewSet = new Set(usersDoubled)

console.log(usersNewSet)
~~~

то дублирующиеся ссылки будут исключены

_______________________________________________________

## ![ico-25 icon] Пример 2

Создадим итерабельный объект **~human~** и убедимся, что дублирующиеся значения будут исключены:  

~~~js
const human = {
  a: 'Alex',
  b: 'Mary',
  c: 'Helen',
  d: 'Nicolas',
  e: 'Jeck',
  f: 'Henry',
  i: 'Mary',
  g: 'Alex'
}

human[Symbol.iterator] = function* () {
  for (const prop in this) yield this[prop]
}

const humanSet = new Set(human)

console.log(humanSet)
~~~

~~~~humanSet
▼ Set(6) {"Alex", "Mary", "Helen", "Nicolas", "Jeck", …}
    size: 6
  ► __proto__: Set
  ▼ [[Entries]]: Array(6)
     ▼ 0: "Alex"
          value: "Alex"
     ► 1: "Mary"
     ► 2: "Helen"
     ► 3: "Nicolas"
     ► 4: "Jeck"
     ► 5: "Henry"
       length: 6
~~~~

_____________________________________________________________

## ![ico-25 cap] Пример 3

Создадим функцию, которая будет создавать структуру данных с уникальными элементами из переданного ей "материала"

~~~js
function createSet (object = {}) {
  function createIterator () {
    object[Symbol.iterator] = function* () {
      for ( let prop in this ) yield this [prop]
    }
  }
  Array.isArray(object) || object[Symbol.iterator]
    ? null
    : createIterator()

   return new Set(object)
}
~~~

Теперь опробуем ее в действии:

~~~js
console.log(createSet({ a: 1, b: 4, c:5, d: 4, e: 5 }))
// ► Set(3) {1, 4, 5}

console.log(createSet())
// ► Set(0) {}

console.log(createSet([5, 5, 4, 7, 8, 4, 7, 9, 8]))
// ► Set(5) {5, 4, 7, 8, 9}
~~~

~~~js
console.log(createSet('A9h4G8=45*hG///19*74-78'))
~~~

~~~~Result
// ▼ Set(13) {"A", "9", "h", "4", "G", …}
//     size: (...)
//   ► __proto__: Set
//   ▼ [[Entries]]: Array(13)
//       ► 0: "A"
//       ► 1: "9"
//       ► 2: "h"
//       ► 3: "4"
//       ► 4: "G"
//       ► 5: "8"
//       ► 6: "="
//       ► 7: "5"
//       ► 8: "*"
//       ► 9: "/"
//       ► 10: "1"
//       ► 11: "7"
//       ► 12: "-"
//         length: 13
~~~~

Если же мы хотим оставить только уникальные символы в строке, то можно так:

~~~js
console.log(Array.from(createSet('A9h4G8=45*hG///19*74-78')).join(''))

// A9h4G8=5*/17-
~~~
___________________________________________________

Но остается вопрос, как заставить работать Set с объектами в качестве элементов структуры данных

## ![ico-25 cap] Пример 4

Поиграем с массивом объектов **~clients~**

~~~~js
const clients = [
  {
    name: 'Stephan',
    job: 'java-developer'
  },
  {
    name: 'Margaret',
    job: 'markup-developer'
  },
  {
    name: 'Stephan',
    job: 'java-developer'
  },
  {
    name: 'Margaret',
    job: 'markup-developer'
  }
]
~~~~

Напилим функцию, которая возвращает нам структуру данных с уникальными клиентами из массива **~clients~**, но сохраненными в виде JSON-строки:

~~~js
function createSetOfObjects (object = {}) {
  if (!object || (typeof object !== 'object' && typeof object !== 'string')) return new Set({})
  object[Symbol.iterator] = function* () {
    for (const prop in this) yield JSON.stringify(this[prop])
  }
  return new Set(object)
}

const uniqueClients = createSetOfObjects(clients)

console.log(uniqueClients)
~~~

~~~~Результат
▼ Set(2) {"{"name":"Stephan","job":"java-developer"}", "{"name":"Margaret","job":"markup-developer"}"}
    size: 2
  ►  __proto__: Set
  ▼ [[Entries]]: Array(2)
      ▼ 0: "{"name":"Stephan","job":"java-developer"}"
          value: "{"name":"Stephan","job":"java-developer"}"
      ▼ 1: "{"name":"Margaret","job":"markup-developer"}"
          value: "{"name":"Margaret","job":"markup-developer"}"
        length: 2
~~~~

Попробуем добавить запись:

~~~js
uniqueClients.add(JSON.stringify(clients[0]))
~~~

Поскольку такая запись уже существует, добавление не произошло

Давайте выведем записи:

~~~js
for (const item of uniqueClients) console.log(JSON.parse(item))

// ► {name: "Stephan", job: "java-developer"}
// ► {name: "Margaret", job: "markup-developer"}
~~~

Все работает, но, очевидно, нужно писать "обертку" для нашего объекта,

чтобы при добавлении новых объектов они сначала превращались в JSON-строку,

а при итерировании объекта возвращались распарсенные значения

~~~~js
class UnicElements {
  constructor (object = {}) {
    if (!object || (typeof object !== 'object' && typeof object !== 'string')) return new Set({})
    object[Symbol.iterator] = function* () {
      for (const prop in this) yield JSON.stringify(this[prop])
    }
    this.data = new Set(object)
    this.data[Symbol.iterator] = this.data.values()
  }

  next () {
    const current = this.data[Symbol.iterator].next()
    return current.done ? null : JSON.parse(current.value)
  }

  add (newElem) {
    this.data.add(JSON.stringify(newElem))
    this.data[Symbol.iterator] = this.data.values()
  }

  delete (elem) {
    this.data.delete(JSON.stringify(elem))
    this.data[Symbol.iterator] = this.data.values()
  }
}

const testObject = new UnicElements(clients)
~~~~

Теперь опробуем, как работает наш декорированный экземпляр **~testObject~**

Сначала посмотрим на работу итератора:

~~~js
testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~

Все, дошли до конца

Теперь посмотрим, как добавляются новые объекты

Попробуем добавить один и тот же объект несколько раз:

~~~~js
testObject.add({ name: 'Google', job: 'developer' })
testObject.add({ name: 'Google', job: 'developer' })
testObject.add({ name: 'Google', job: 'developer' })

testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// {name: "Google", job: "developer"}
testObject.next()
// null
~~~~

Все норм, объект добавился только один раз

Теперь посмотрим на удаление объектов:

~~~~js
testObject.delete({ name: 'Google', job: 'developer' })

testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~~

Все в порядке, объект благополучно удален ![ico-25 smile]
