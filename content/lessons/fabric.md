# ![ico-30 study] {{p1}}

@@@@
![](illustrations/douglas-crockford.jpg)
«_I think the lack of classes is one of JavaScript's great strengths_» <hr /> [Douglas Crockford](external/crockford)
@@@@

☼☼☼ {{p2}} ☼☼☼

{{p3}}

{{p4}}

~~~js
const creator = (name, age) => ({ name, age })
~~~

{{p5}}
{{p6}}
{{p7}}

{{p8}}
{{p9}}

{{p10}}

◘◘![ico-25 cap] **1**◘◘

~~~js
function creator (name, age) {
  return { name, age }
}
~~~

{{p11}}

~~~demo
> const user = new creator('Piter', 25)
< undefined
> user
< ► {name: 'Piter', age: 25}
> console.log(user instanceof creator)
< false
> console.log(user instanceof Object)
< true
~~~

{{p12}}

{{p13}}

___

◘◘![ico-25 cap] **2**◘◘

~~~js
function creator () {
  return Array.from(arguments)
}
~~~

{{p14}}
{{p15}}

~~~demo
> const obj = new creator(5, 8, 7)
< undefined
> obj
< ► (3) [5, 8, 7]
> obj instanceof creator
< false
> obj instanceof Array
< true
> obj instanceof Object
< true
~~~

___

◘◘![ico-25 cap] **3**◘◘

~~~js
function simple () {
  return Math.min(...arguments)
}
~~~

{{p16}}
{{p17}}

~~~demo
> simple(5, 8, 4, 9)
< 4
> const obj = new simple
< undefined
> obj
< ► simple {}
> obj instanceof simple
< true
~~~

{{p18}}

{{p19}}
___

## ![ico-20 icon] {{p20}}

•••• none
^^_{{p21}}_^^

{{p41}}
{{p42}}
••••

{{objectsBridge}}

{{p23}}

{{p24}}

◘◘![ico-25 cap] **4**◘◘

~~~js
const google = (function (params, pin) {
  return {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Forbidden'
    }
  }
})({
  name: 'Google',
  token: 'A7fgh14-771pd-ufr147'
}, '789541')
~~~

~~~demo
> google
< ► {getVar: ƒ}
> google.getVar('token')
< 'Forbidden'
> google.getVar('name', '789541')
< 'Google'
~~~

{{moduleIsFactory}}

___

{{p26}}
{{p27}}
{{p28}}

◘◘![ico-25 cap] **5**◘◘

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }
}

User.createUser = function (name, params, pin) {
  return Object.assign(new User(name), {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Access denied'
    }
  })
}

const google = User.createUser('Google', {
  token: 'AfG78-1nm*15ph',
  cash: 25000
}, '789451')
~~~

~~~demo
> google
< ► User {name: 'Google', getVar: ƒ}
> google.getVar('token', '789451')
< 'AfG78-1nm*15ph'
> google.getVar('cash', '789451')
< 25000
> google.getVar('cash', '55555')
< 'Access denied'
~~~

___

## ![ico-25 icon] {{p30}}

{{polyWhat}}

◘◘![ico-25 cap] **6**◘◘

~~~js
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, area: () => size ** 2 }

  throw new TypeError(`Unknown shape: ${kind}`)
}

const shapes = [createShape('circle', 1), createShape('square', 2)]

for (const shape of shapes) {
  console.log(shape.kind, shape.area().toFixed(2))
}
~~~

~~~console
circle 3.14
square 4.00
~~~

{{polyLoop}}

___

{{p31}}

{{p32}}

◘◘![ico-25 cap] **7**◘◘

~~~js
function User () {
  this.console = function (key) {
    console.log(`${key}: ${this[key]}`)
  }
  this.output = function (key) {
    for (const id of Object.keys(this[key])) {
      console.log(this[key][id])
    }
  }
}

User.createNewUser = function (params) {
  const user = new this
  for (const key in params) {
    Object.assign(user, { [key]: params[key] })
  }
  return user
}
~~~

{{p33}}

~~~console
▼ ƒ User()
  ► createNewUser: ƒ (params)
    length: 0
    name: "User"
  ► prototype: {constructor: ƒ}
  ► arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

{{p34}}

~~~demo
> const visitor = User.createNewUser({ name: 'visitor', speciality: 'dev' })
< undefined
> visitor.console('name')
< name: visitor
> visitor.console('speciality')
< speciality: dev
~~~

~~~js
const currentUser = User.createNewUser({
  name: prompt('What is your name?'),
  age: prompt('How old are you?'),
  id: Date.now(),
  posts: {},
  registered: new Date().toISOString().slice(0, 10),
  writePost: function (text) {
    this.posts = Object.assign(this.posts, {
      [Date.now()]: text
    })
  }
})
~~~

~~~demo
> currentUser.writePost('Hello, students!')
< undefined
> currentUser.writePost('I like potatoes!')
< undefined
> currentUser.output('posts')
< Hello, students!
< I like potatoes!
~~~

{{p35}}

___

{{p37}}

~~~js
class User {
  constructor () {
    this.console = function (key) {
      console.log(`${key}: ${this[key]}`)
    }
    this.output = function (key) {
      for (const id of Object.keys(this[key])) {
        console.log(this[key][id])
      }
    }
  }

  static createNewUser (params) {
    const user = new this
    for (const key in params) {
      Object.assign(user, { [key]: params[key] })
    }
    return user
  }
}
~~~

{{p38}}

{{newThis}}

◘◘![ico-25 cap] **8**◘◘

~~~js
class Admin extends User {
  rights () {
    return 'all'
  }
}
~~~

~~~demo
> const admin = Admin.createNewUser({ name: 'root' })
< undefined
> admin instanceof Admin
< true
> admin.rights()
< 'all'
> admin.console('name')
< name: root
~~~

{{p40}}

___

## ![ico-25 icon] {{versus}}

{{versusNew}}
{{versusPrivate}}
{{versusKinds}}
{{versusInstanceof}}
{{versusMethods}}

◘◘![ico-25 cap] **9**◘◘

~~~js
const proto = {
  greet () {
    return `Hi, ${this.name}`
  }
}

const make = (name) => Object.assign(Object.create(proto), { name })

const ann = make('Ann')
const bob = make('Bob')
~~~

~~~demo
> ann.greet()
< 'Hi, Ann'
> ann.greet === bob.greet
< true
> Object.keys(ann)
< ► ['name']
~~~

{{versusProto}}

___

## ![ico-25 hw] {{common.tests}}

♣♣♣♣
? {{test01Question}}

~~~js
const creator = (name, age) => ({ name, age })

const user = new creator('Ann', 25)
~~~

+ {{test01Variant1}}
= {{test01Variant1Answer}}

- {{test01Variant2}}
= {{test01Variant2Answer}}

- {{test01Variant3}}
= {{test01Variant3Answer}}

- {{test01Variant4}}
= {{test01Variant4Answer}}

? {{test02Question}}

~~~js
function creator (name) {
  return { name }
}

const user = new creator('Ann')

console.log(user instanceof creator, user instanceof Object)
~~~

+ {{test02Variant1}}
= {{test02Variant1Answer}}

- {{test02Variant2}}
= {{test02Variant2Answer}}

- {{test02Variant3}}
= {{test02Variant3Answer}}

- {{test02Variant4}}
= {{test02Variant4Answer}}

? {{test03Question}}

~~~js
function simple () {
  return 42
}

const obj = new simple()
~~~

+ {{test03Variant1}}
= {{test03Variant1Answer}}

- {{test03Variant2}}
= {{test03Variant2Answer}}

- {{test03Variant3}}
= {{test03Variant3Answer}}

- {{test03Variant4}}
= {{test03Variant4Answer}}

? {{test04Question}}

~~~js
const counter = () => {
  let n = 0
  return { next: () => ++n }
}

const a = counter()
const b = counter()

a.next()
a.next()

console.log(a.next(), b.next(), 'n' in a)
~~~

+ {{test04Variant1}}
= {{test04Variant1Answer}}

- {{test04Variant2}}
= {{test04Variant2Answer}}

- {{test04Variant3}}
= {{test04Variant3Answer}}

- {{test04Variant4}}
= {{test04Variant4Answer}}

? {{test05Question}}

~~~js
class User {
  static create () {
    return new this()
  }
}

class Admin extends User {}

console.log(Admin.create() instanceof Admin)
~~~

+ {{test05Variant1}}
= {{test05Variant1Answer}}

- {{test05Variant2}}
= {{test05Variant2Answer}}

- {{test05Variant3}}
= {{test05Variant3Answer}}

- {{test05Variant4}}
= {{test05Variant4Answer}}

? {{test06Question}}

~~~js
const proto = {
  greet () {
    return `Hi, ${this.name}`
  }
}

const make = (name) => Object.assign(Object.create(proto), { name })

const a = make('Ann')
const b = make('Bob')

console.log(a.greet === b.greet, Object.keys(a))
~~~

+ {{test06Variant1}}
= {{test06Variant1Answer}}

- {{test06Variant2}}
= {{test06Variant2Answer}}

- {{test06Variant3}}
= {{test06Variant3Answer}}

- {{test06Variant4}}
= {{test06Variant4Answer}}

? {{test07Question}}

~~~js
function Person (name) {
  this.name = name
}

const ann = Person('Ann')

console.log(ann)
~~~

+ {{test07Variant1}}
= {{test07Variant1Answer}}

- {{test07Variant2}}
= {{test07Variant2Answer}}

- {{test07Variant3}}
= {{test07Variant3Answer}}

- {{test07Variant4}}
= {{test07Variant4Answer}}
♣♣♣♣

___

## ![ico-25 hw] {{common.quest}}

♠♠♠♠ {{quest01Task}}
function Account (owner, balance) {
  this.owner = owner
  this.balance = balance

  this.deposit = function (sum) {
    this.balance += sum
  }
}

const account = new Account('Ann', 100)

account.balance = 1000000
account.deposit(50)

console.log(account.owner, account.balance)
???
? 3 | {{quest01Check1}}
typeof createAccount === 'function' && createAccount('Bob', 10).owner === 'Bob'

? 3 | {{quest01Check2}}
const account = createAccount('Bob', 10)
account.deposit(5)
account.getBalance() === 15

? 4 | {{quest01Check3}}
const account = createAccount('Bob', 10)
account.balance = 1000000
account.getBalance() === 10

? 2 | {{quest01Check4}}
const ann = createAccount('Ann', 1)
const bob = createAccount('Bob', 2)
ann.deposit(10)
ann.getBalance() === 11 && bob.getBalance() === 2
♠♠♠♠

♠♠♠♠ {{quest02Task}}
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, getArea: () => size ** 2 }
}

const shapes = [createShape('circle', 1), createShape('square', 2), createShape('triangle', 2)]

let total = 0

for (const shape of shapes) total += shape.area()

console.log('total:', total.toFixed(2))
???
? 4 | {{quest02Check1}}
OUTPUT[0] === 'total: 8.87'

? 3 | {{quest02Check2}}
['circle', 'square', 'triangle'].every((kind) => typeof createShape(kind, 1).area === 'function')

? 3 | {{quest02Check3}}
Math.abs(createShape('triangle', 2).area() - Math.sqrt(3)) < 1e-9

? 2 | {{quest02Check4}}
let thrown = null
try { createShape('hexagon', 1) } catch (error) { thrown = error }
thrown instanceof TypeError
♠♠♠♠
