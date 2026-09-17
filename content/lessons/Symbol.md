# ![ico-30 study] Symbol

**^^ES6 (2015)^^**

{{p1}}
{{p2}}
{{p3}}
{{p4}}
{{p5}}
{{p6}}
{{p7}}
{{p8}}

◘◘![ico-20 cap] ** 1**◘◘

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

## ![ico-25 study] {{p9}}

{{p10}}

{{p11}}
{{p12}}
{{p13}}
{{p14}}

◘◘![ico-20 cap] ** 2**◘◘

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

{{p15}}

◘◘![ico-20 cap] ** 3**◘◘

~~~js
console.log(JSON.parse(JSON.stringify(obj)))
~~~

~~~console
▼ {name: "Google"}
    name: "Google"
  ► __proto__: Object
~~~

___________________________________________

## ![ico-25 study] Symbol.for

{{p16}}
{{p17}}

{{p18}}

~~~js
Symbol.for('Google')
~~~

{{p19}}
{{p20}}
{{p21}}

{{p22}}
{{p23}}

~~~js
Symbol.for('Google')
Symbol.keyFor(Symbol.for('Google'))  // Google
~~~

~~~js
const google = Symbol.for('Google')
Symbol.keyFor(google)                // Google
~~~

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const calcSessionEnd = seconds => new Date(new Date().getTime() + seconds * 1000)

const user = {
  name: 'Stephan',
  sessionStart: new Date(),
  sessionEnd: calcSessionEnd(3600)
}

const session = Symbol.for(JSON.stringify(user))
~~~

{{p24}}

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

◘◘![ico-20 cap] ** 5**◘◘

~~~js
const usersInterface = {
  [symUser]: Symbol.for(JSON.stringify(source)),
  get users () {
    return JSON.parse(Symbol.keyFor(this[symUser]))
  }
}

console.log(usersInterface)
~~~

◘◘usersInterface◘◘

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

◘◘usersInterface.users◘◘

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


◘◘![ico-20 cap] ** 6**◘◘

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

{{p25}}
{{p26}}

~~~js
usersInterface.users = source

console.log(usersInterface.users)
~~~

◘◘usersInterface.users◘◘

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

