# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}
{{s1.p8}}
{{s1.p9}}

{{s1.p10}}

~~~js
const symbol = Symbol('Я - новый символ, который ты только что создал')

console.log(`Тип данных: ${typeof symbol}`)
console.log(`Description: ${symbol.description}`)
console.log(`toString: ${symbol.toString()}`)
~~~

~~~console
Тип данных: symbol
Description: Я - новый символ, который ты только что создал
toString: Symbol(Я - новый символ, который ты только что создал)
~~~

_____________________________________

## ![ico-25 study] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

{{s2.p6}}

~~~js
const symb = Symbol('users')

const obj = {
  name: 'Google',
  [symb]: () => console.log('Hello')
}

for (const prop in obj) console.log(obj[prop])

console.log(Object.keys(obj))

console.log(Object.getOwnPropertyNames(obj))
~~~

~~~console
Google

▼ ["name"]
    0: "name"
    length: 1
  ► __proto__: Array(0)
  
▼ ["name"]
    0: "name"
    length: 1
  ► __proto__: Array(0)
~~~

~~~js
obj[symb]()    // Hello
~~~

{{s2.p7}}

{{s2.p8}}

~~~js
console.log(JSON.parse(JSON.stringify(obj)))
~~~

~~~console
▼ {name: "Google"}
    name: "Google"
  ► __proto__: Object
~~~

___________________________________________

## ![ico-25 study] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

~~~js
Symbol.for('Google')
~~~

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

{{s3.p7}}
{{s3.p8}}

~~~js
Symbol.for('Google')
Symbol.keyFor(Symbol.for('Google'))  // Google
~~~

~~~js
const google = Symbol.for('Google')
Symbol.keyFor(google)                // Google
~~~

{{s3.p9}}

~~~js
const calcSessionEnd = seconds => new Date(new Date().getTime() + seconds * 1000)

const user = {
  name: 'Stephan',
  sessionStart: new Date(),
  sessionEnd: calcSessionEnd(3600)
}

const session = Symbol.for(JSON.stringify(user))
~~~

{{s3.p10}}

~~~js
const source = [
  { name: 'Stephan', age: 30, works: 7, children: 2 },
  { name: 'Georg', age: 25, works: 2, children: 1 },
  { name: 'Mary', age: 34, works: 10, children: 1 },
  { name: 'Piter', age: 50, works: 25, children: 3 },
  { name: 'Helen', age: 40, works: 20, children: 3 },
  { name: 'Michael', age: 38, works: 16, children: 2 },
  { name: 'Andry', age: 45, works: 20, children: 2 }
]

const symUser = Symbol.for('users')
~~~

{{s3.p11}}

~~~js
const usersInterface = {
  [symUser]: Symbol.for(JSON.stringify(source)),
  get users () {
    return JSON.parse(Symbol.keyFor(this[symUser]))
  }
}

console.log(usersInterface)
~~~

{{s3.p12}}

~~~console
▼ {Symbol(users): Symbol([{"name":"Stephan","age":30,"works":7,"children":2},{"name":"Georg","age":25,"works":2,"chil…}
    users: (...)
    Symbol(users): Symbol([{"name":"Stephan","age":30,"works":7,"children":2},{"name":"Georg","age":25,"works":2,"children":1},{"name":"Mary","age":34,"works":10,"children":1},{"name":"Piter","age":50,"works":25,"children":3},{"name":"Helen","age":40,"works":20,"children":3},{"name":"Michael","age":38,"works":16,"children":2},{"name":"Andry","age":45,"works":20,"children":2}])
  ► get users: ƒ users()
  ► __proto__: Object
~~~


~~~js
console.log(usersInterface.users)
~~~

{{s3.p13}}

~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {name: "Stephan", age: 30, works: 7, children: 2}
  ► 1: {name: "Georg", age: 25, works: 2, children: 1}
  ► 2: {name: "Mary", age: 34, works: 10, children: 1}
  ► 3: {name: "Piter", age: 50, works: 25, children: 3}
  ► 4: {name: "Helen", age: 40, works: 20, children: 3}
  ► 5: {name: "Michael", age: 38, works: 16, children: 2}
  ► 6: {name: "Andry", age: 45, works: 20, children: 2}
    length: 7
  ► __proto__: Array(0)
~~~
__________________________


{{s3.p14}}

~~~js
usersInterface = {
  [symUser]: null,
  get users () {
    return this[symUser] ? JSON.parse(Symbol.keyFor(this[symUser])) : null
  },
  set users (arrayOfUsers) {
    this[symUser] = Symbol.for(JSON.stringify(arrayOfUsers))
  }
}

console.log(usersInterface.users)  // null
~~~

{{s3.p15}}
{{s3.p16}}

~~~js
usersInterface.users = source

console.log(usersInterface.users)
~~~

{{s3.p17}}

~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {name: "Andry", age: 45, works: 20, children: 2}
  ► 1: {name: "Georg", age: 25, works: 2, children: 1}
  ► 2: {name: "Helen", age: 40, works: 20, children: 3}
  ► 3: {name: "Mary", age: 34, works: 10, children: 1}
  ► 4: {name: "Michael", age: 38, works: 16, children: 2}
  ► 5: {name: "Piter", age: 50, works: 25, children: 3}
  ► 6: {name: "Stephan", age: 30, works: 7, children: 2}
    length: 7
  ► __proto__: Array(0)
~~~

____________________________________________

