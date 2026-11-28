# ![ico-30 study] Factory methods⟪Factory_methods⟫

@@@@
![](illustrations/douglas-crockford.jpg)
«_I think the lack of classes is one of JavaScript's great strengths_» <hr /> [Douglas Crockford](external/crockford)
@@@@

☼☼☼ Just say ‘new’ and (almost) every function will return an object. ☼☼☼

The keyword **~new~** before a function call turns that function into a constructor, and such a call will always return an object, regardless of whether or not the function body contains the ~return~ statement.

If it does this without using the keyword **_~new~_**, then such a function is a **factory**:

~~~js
const creator = (name, age) => ({ name, age })
~~~

In this example we use an arrow function, and it cannot be a constructor at all: it has no internal **[[Construct]]** method, and calling it with **~new~** throws a **~TypeError~**. It has no **~prototype~** property either, but that is not the reason: an ordinary function whose ~prototype~ has been taken away is called with ~new~ as if nothing had happened.
It is a factory because it returns an object.
And this object will know nothing about the function **~creator~**. It will be an instance of **~Object~**.

![ico-20 warn] A function can be either a factory or a constructor.
Let’s prove this statement.

A necessary but insufficient (![ico-20 warn]) condition for a function to be a factory is the presence of the operator **~return~**.

◘◘![ico-25 cap] **1**◘◘

~~~js
function creator (name, age) {
  return { name, age }
}
~~~

In this example, the function **~creator~** returns an object. Great, let’s see what it returns if we call it with the keyword **~new~**:

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

The function **~creator~** can no longer be a constructor, and using the keyword **~new~** has no effect on its behaviour.

The function **~creator~** creates instances of the constructor **~Object~**.

___

◘◘![ico-25 cap] **2**◘◘

~~~js
function creator () {
  return Array.from(arguments)
}
~~~

In this example, the function **~creator~** returns an array.
However, an array is an object, so the function **~creator~** is destined to be a factory and can never become a constructor.

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

The function **~simple~** returns a number (possibly NaN or ~Infinity~). Can we say that it is a factory? – No, because it returns **not an object**.
When called with the keyword **~new~**, it returns an instance of **~simple~**.

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

The same applies if the function returns a string, or ~null~, or ~undefined~. You can check this for yourself.

In other words, the function is a factory only if it returns an object — any object: a literal, an array, a function — and not a primitive.
___

## ![ico-20 icon] OOP objects and data structures⟪OOP_objects_and_data_structures⟫

•••• none
^^_Robert Martin, ‘Clean Code’:_^^

Objects provide behaviour and hide data.
Data structures provide data but do not possess any significant behaviour
••••

A factory can return either. A constructor puts the data into **~this~**, where everybody can see it. A factory can leave it in a closure and hand out only the behaviour — which makes an object in Martin’s sense of the word. That is how the ‘Module’ pattern works:

**The ‘_Module_’ pattern**

^^In this example, an IIFE and closure are used to create an object whose data is hidden from direct access and is only accessible via an interface provided by the _**getVar**_ method^^

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

The IIFE here is the same factory, only called once, on the spot. Call it twice and you get two objects, each with hidden data of its own: every call of a factory has a closure of its own.

___

^^In this example the same thing is done by a static method of the _User_ class^^
^^The class’s constructor creates a public property _name_^^
^^The class’s factory method _createUser_ makes an instance and fills it in at once: the hidden data stays in the closure, and the interface — the _**getVar**_ method — is the way to it^^

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

## ![ico-25 icon] Polymorphism⟪Polymorphism⟫

Polymorphism is one and the same call working on objects of different kinds, each of them answering it in its own way. The code that calls **~shape.area()~** does not know, and has no need to know, whether it holds a circle or a square. Which object is born is decided in one place — the factory.

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

The loop calls **~area()~** on every shape without asking what it is. Adding a triangle takes one more branch in the factory, and the loop stays as it is.

___

A factory method can also live on the constructor itself, as a static method. It then makes instances of that constructor, but with different sets of properties and methods.

In the following example, the **~User~** constructor has a factory method **~createNewUser~** which allows instances of the class to be created with different sets of properties and methods.

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

We have obtained an _enumerable_ static method **~createNewUser~** from the constructor.

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

Let’s create two instances of the **~User~** class with different sets of properties and methods using this factory method.

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

The instances **~visitor~** and **~currentUser~** are made by one and the same **~User~** constructor, and yet their properties and methods differ.

___

Let’s do the same using a class:

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

In this case, the class’s static method **~createNewUser~** will be non-enumerable whilst everything else will be similar to the constructor-based variant

Notice the **~new this~** inside the method. **~this~** here is whichever constructor the method was called on. Call it on a subclass and you get an instance of the subclass, though the method itself is written once, in the parent. That is the polymorphism of a factory method:

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

^^And ‘under the bonnet’ a class is the same constructor, with the same prototype-based inheritance at work.^^

___

## ![ico-25 icon] A factory or a constructor?⟪A_factory_or_a_constructor?⟫

![ico-20 green-ok] a factory is called without **~new~**, so there is no forgetting it. A constructor called without **~new~** returns **~undefined~**, and in sloppy mode quietly writes its properties into the global object besides;
![ico-20 green-ok] the data can be hidden in a closure instead of being put out on **~this~**;
![ico-20 green-ok] a factory can return an object of any kind — that is its polymorphism;
![ico-20 warn] **~instanceof~** has nothing to say about a factory: the literal it returned is an instance of **~Object~**;
![ico-20 warn] methods declared in the returned literal belong to each object separately. To make them shared, as an instance’s methods are, the factory makes the object with **~Object.create(proto)~**:

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

There is one **~greet~** method for all the objects — it lives in the prototype, and the objects themselves have only **~name~**.

___

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? What will happen?

~~~js
const creator = (name, age) => ({ name, age })

const user = new creator('Ann', 25)
~~~

+ **~TypeError: creator is not a constructor~**
= Yes. An arrow function has no internal **[[Construct]]** method, and it cannot be called with **~new~**. It can be a factory, never a constructor.

- **~user~** is **~{ name: 'Ann', age: 25 }~**
= That is what you would get without **~new~**. With it, the body of the function is never reached.

- **~user~** is an empty instance **~creator {}~**
= No: an instance of an arrow function cannot be made at all.

- **~user~** is **~undefined~**
= No: the assignment never happens, the call throws.

? What will the code print?

~~~js
function creator (name) {
  return { name }
}

const user = new creator('Ann')

console.log(user instanceof creator, user instanceof Object)
~~~

+ **~false true~**
= Yes. The function returned an object, and **~new~** hands over that object rather than the instance it had started to make. It is a literal; it knows nothing about **~creator~** and is an instance of **~Object~**.

- **~true true~**
= No: a function that returns an object is a factory, and **~new~** does not change that.

- **~true false~**
= No: every object literal is an instance of **~Object~**.

- **~false false~**
= No: a literal is an instance of **~Object~**.

? What will **~obj~** hold?

~~~js
function simple () {
  return 42
}

const obj = new simple()
~~~

+ an empty instance **~simple {}~**
= Yes. A number is a primitive, and **~new~** pays it no attention: it returns the instance it made itself. A function that returns a primitive is no factory.

- **~42~**
= That is what an ordinary call, without **~new~**, would return.

- **~Number {42}~**
= No: **~new~** does not wrap the returned primitive; it throws it away.

- **~undefined~**
= No: a call with **~new~** always gives an object.

? What will the code print?

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

+ **~3 1 false~**
= Yes. Every call of the factory has a closure of its own: **~a~** has counted to three, **~b~** started its own count from zero. And the object has no **~n~** — it lives in the closure, out of reach.

- **~3 4 false~**
= No: **~a~** and **~b~** do not share a count — every call of **~counter()~** starts an **~n~** of its own.

- **~3 1 true~**
= No: the object has only **~next~**, and **~n~** stayed in the closure.

- **~1 1 false~**
= No: **~a.next()~** has been called twice already, and **~n~** remembers that between calls.

? What will the code print?

~~~js
class User {
  static create () {
    return new this()
  }
}

class Admin extends User {}

console.log(Admin.create() instanceof Admin)
~~~

+ **~true~**
= Yes. **~this~** in a static method is the class the method was called on — here **~Admin~**. The method is written once, in **~User~**, and makes instances of any subclass.

- **~false~**: the method is written in **~User~** and makes a **~User~**
= That would be so with **~new User()~**. **~new this()~** makes an instance of whatever the method was called on.

- **~TypeError~**
= No: static methods are inherited, and **~Admin~** has **~create~**.

- **~undefined~**
= No: **~instanceof~** answers only **~true~** or **~false~**.

? What will the code print?

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

+ **~true~** and **~['name']~**
= Yes. **~greet~** lives in the prototype, one for all of them, and the objects themselves have only **~name~** — **~Object.keys~** shows own properties alone.

- **~false~** and **~['name']~**
= No: the method is not copied into the objects; there is one, in the prototype.

- **~true~** and **~['name', 'greet']~**
= No: **~greet~** is not an own property of the object but an inherited one.

- **~false~** and **~['name', 'greet']~**
= That is what you would get if **~greet~** were declared right in the literal the factory returns.

? What will the code print?

~~~js
function Person (name) {
  this.name = name
}

const ann = Person('Ann')

console.log(ann)
~~~

+ **~undefined~**
= Yes. Without **~new~** a constructor is an ordinary function with no **~return~**. And **~this~** in sloppy mode is the global object, so **~name~** went there quietly; in strict mode the call would have thrown a **~TypeError~**. A factory cannot be broken this way: it is called without **~new~** to begin with.

- **~Person {name: 'Ann'}~**
= That is what you would get with **~new~**.

- **~{name: 'Ann'}~**
= No: the function returns nothing, and no object comes from anywhere.

- **~TypeError~**
= So it would be in strict mode, where **~this~** without **~new~** is **~undefined~**. In sloppy mode there is no error.
♣♣♣♣

___

## ![ico-25 hw] Quest⟪Quest⟫

♠♠♠♠ The account balance lives in **~this~**, and anyone can rewrite it behind **~deposit~**’s back. Rewrite the **~Account~** constructor as a factory **~createAccount(owner, balance)~** that is called without **~new~**. It returns an object with **~owner~**, a **~deposit(sum)~** method and a **~getBalance()~** method, and keeps the balance itself in a closure, so that it cannot be changed from outside.
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
? 3 | an account is made by calling createAccount, without new
typeof createAccount === 'function' && createAccount('Bob', 10).owner === 'Bob'

? 3 | money goes in, and the balance is read by a method
const account = createAccount('Bob', 10)
account.deposit(5)
account.getBalance() === 15

? 4 | the balance cannot be rewritten from outside
const account = createAccount('Bob', 10)
account.balance = 1000000
account.getBalance() === 10

? 2 | every account has a balance of its own
const ann = createAccount('Ann', 1)
const bob = createAccount('Bob', 2)
ann.deposit(10)
ann.getBalance() === 11 && bob.getBalance() === 2
♠♠♠♠

♠♠♠♠ The loop adds up the area of the shapes and falls over: the square answers **~getArea()~** instead of **~area()~**, and the factory does not know a triangle at all. Repair the **~createShape~** factory so that every shape answers one and the same **~area()~** and the loop needs no change. Add an equilateral triangle with side **~size~** (its area is √3 / 4 · size²), and make the factory throw a **~TypeError~** for a shape it does not know.
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, getArea: () => size ** 2 }
}

const shapes = [createShape('circle', 1), createShape('square', 2), createShape('triangle', 2)]

let total = 0

for (const shape of shapes) total += shape.area()

console.log('total:', total.toFixed(2))
???
? 4 | the loop has added up the total area: total: 8.87
OUTPUT[0] === 'total: 8.87'

? 3 | every shape has one and the same area() method
['circle', 'square', 'triangle'].every((kind) => typeof createShape(kind, 1).area === 'function')

? 3 | the triangle’s area is right
Math.abs(createShape('triangle', 2).area() - Math.sqrt(3)) < 1e-9

? 2 | the factory throws a TypeError for a shape it does not know
let thrown = null
try { createShape('hexagon', 1) } catch (error) { thrown = error }
thrown instanceof TypeError
♠♠♠♠
