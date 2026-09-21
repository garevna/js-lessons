# ![ico-30 study] Set

**ES6**

**{{common.c7}}**

{{p1}}

{{p2}}

________________________

![ico-25 cap] new Set

~~~js
const sample = new Set([5, 1, 3, 8, 1, 5, 3, 3, 8])

console.log(sample)

// ► Set(4) {5, 1, 3, 8}

console.log(Array.from(sample))

// ► (4) [5, 1, 3, 8]
~~~

{{p3}}

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
  ► [[Prototype]]: Object
~~~~

## ![ico-25 icon] values()

{{p4}}

{{p5}}

~~~js
let done, iterator = sample.values()

while (!done) {
  ({ value: item, done } = iterator.next());
  console.log(item)
}
~~~

{{p6}}

________________________________

## ![ico-25 icon] add()

{{p7}}

{{p8}}

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

{{p9}}

{{p10}}

~~~js
sample.delete(9)
// false

sample.delete(7)
// true

console.log(sample)
// ► Set(4) {5, 1, 3, 8}
~~~

______________________________________

## ![ico-25 cap] {{common.c0}} 1

{{p11}}

{{p12}}
{{p13}}

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

{{p14}}

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

{{p15}}

_______________________________________________________

## ![ico-25 icon] {{common.c0}} 2

{{p16}}

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
  ► [[Prototype]]: Set
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

## ![ico-25 cap] {{common.c0}} 3

{{p17}}

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

{{p18}}

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
//   ► [[Prototype]]: Set
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

{{p19}}

~~~js
console.log(Array.from(createSet('A9h4G8=45*hG///19*74-78')).join(''))

// A9h4G8=5*/17-
~~~
___________________________________________________

{{p20}}

## ![ico-25 cap] {{common.c0}} 4

{{p21}}

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

{{p22}}

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
  ►  [[Prototype]]: Set
  ▼ [[Entries]]: Array(2)
      ▼ 0: "{"name":"Stephan","job":"java-developer"}"
          value: "{"name":"Stephan","job":"java-developer"}"
      ▼ 1: "{"name":"Margaret","job":"markup-developer"}"
          value: "{"name":"Margaret","job":"markup-developer"}"
        length: 2
~~~~

{{p23}}

~~~js
uniqueClients.add(JSON.stringify(clients[0]))
~~~

{{p24}}

{{p25}}

~~~js
for (const item of uniqueClients) console.log(JSON.parse(item))

// ► {name: "Stephan", job: "java-developer"}
// ► {name: "Margaret", job: "markup-developer"}
~~~

{{p26}}

{{p27}}

{{p28}}

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

{{p29}}

{{p30}}

~~~js
testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~

{{p31}}

{{p32}}

{{p33}}

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

{{p34}}

{{p35}}

~~~~js
testObject.delete({ name: 'Google', job: 'developer' })

testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~~

{{p36}}
