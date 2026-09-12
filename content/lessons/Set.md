# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

________________________

{{s1.p5}}

~~~js
const sample = new Set([5, 1, 3, 8, 1, 5, 3, 3, 8])

console.log(sample)

// ► Set(4) {5, 1, 3, 8}

console.log(Array.from(sample))

// ► (4) [5, 1, 3, 8]
~~~

{{s1.p6}}

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

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
let done, iterator = sample.values()

while (!done) {
  ({ value: item, done } = iterator.next());
  console.log(item)
}
~~~

{{s2.p3}}

________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
sample.add(1)
console.log(sample)

// ► Set(4) {5, 1, 3, 8}

sample.add(7)
console.log(sample)

// ► Set(4) {5, 1, 3, 8, 7}
~~~

____________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
sample.delete(9)
// false

sample.delete(7)
// true

console.log(sample)
// ► Set(4) {5, 1, 3, 8}
~~~

______________________________________

## ![ico-25 cap] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}

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

{{s5.p4}}

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

{{s5.p5}}

_______________________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

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

## ![ico-25 cap] {{s7.h1}}

{{s7.p1}}

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

{{s7.p2}}

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

{{s7.p3}}

~~~js
console.log(Array.from(createSet('A9h4G8=45*hG///19*74-78')).join(''))

// A9h4G8=5*/17-
~~~
___________________________________________________

{{s7.p4}}

## ![ico-25 cap] {{s8.h1}}

{{s8.p1}}

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

{{s8.p2}}

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

{{s8.p3}}

~~~js
uniqueClients.add(JSON.stringify(clients[0]))
~~~

{{s8.p4}}

{{s8.p5}}

~~~js
for (const item of uniqueClients) console.log(JSON.parse(item))

// ► {name: "Stephan", job: "java-developer"}
// ► {name: "Margaret", job: "markup-developer"}
~~~

{{s8.p6}}

{{s8.p7}}

{{s8.p8}}

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

{{s8.p9}}

{{s8.p10}}

~~~js
testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~

{{s8.p11}}

{{s8.p12}}

{{s8.p13}}

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

{{s8.p14}}

{{s8.p15}}

~~~~js
testObject.delete({ name: 'Google', job: 'developer' })

testObject.next()
// {name: "Stephan", job: "java-developer"}
testObject.next()
// {name: "Margaret", job: "markup-developer"}
testObject.next()
// null
~~~~

{{s8.p16}}
