# ![ico-30 study] Factory methods⟪Factory_methods⟫

| ![](illustrations/douglas-crockford.jpg) | «_I think the lack of classes is one of JavaScript's great strengths_»<hr>[Douglas Crockford](external/crockford) |

☼☼☼ Just say ‘new’ and every function will return an object ☼☼☼

^^It doesn’t matter whether or not the function body contains the ~return~ operator.^^

If it does this without using the keyword **_~new~_**, then such a function is a **factory**:

~~~js
const creator = (name, age) => ({ name, age })
~~~

In this example, we are using an arrow function, which by definition cannot be a constructor as it lacks the **~prototype~** property.
It is a factory because it returns an object.
And this object will know nothing about the function **~creator~**. It will be an instance of **~Object~**.

![ico-20 warn] A function can be either a factory or a constructor.
Let’s prove this statement.

A necessary but insufficient (![ico-20 warn]) condition for a function to be a factory is the presence of the operator **~return~**.

![ico-25 cap] ** 1**

~~~js
function creator = (name, age) {
  return { name, age }
}
~~~

In this example, the function **~creator~** returns an object. Great, let’s see what it returns if we call it with the keyword **~new~**:

~~~js
const user = new creator('Piter', 25)

console.log(user instanceof creator) // false

console.log(user instanceof Object) // true
~~~

The function **~creator~** can no longer be a constructor, and using the keyword **~new~** has no effect on its behaviour.

The function **~creator~** creates instances of the constructor **~Object~**.

____________________________

![ico-25 cap] ** 2**

~~~js
function creator () {
  return Array.from(arguments)
}

const obj = new creator(5, 8, 7)

obj instanceof creator  // false
~~~

In this example, the function **~creator~** returns an array.
However, an array is an object, so the function **~creator~** is destined to be a factory and can never become a constructor.

____________________________

![ico-25 cap] ** 3**

~~~js
function simple () {
  return Math.min(...arguments)
}

const obj = new simple

obj instanceof simple  // true
~~~

The function **~simple~** returns a number (possibly NaN or ~Infinity~). Can we say that it is a factory? – No, because it returns **not an object**.
When called with the keyword **~new~**, it returns an instance of **~simple~**.

The same applies if the function returns a string, or ~null~, or ~undefined~. You can check this for yourself.

In other words, the function will be a factory only if it returns an instance of **~Object~**.
______________________________

## ![ico-20 icon] OOP objects and data structures⟪OOP_objects_and_data_structures⟫

••^^Robert Martin, ‘Clean Code’:^^••
•••• none
_Objects provide behaviour and hide data
Data structures provide data,
but do not possess any significant behaviour_
••••

![ico-25 cap] ** 4**

**The ‘_Module_’ pattern**

^^In this example, an IIFE and closure are used to create an object whose data is hidden from direct access and is only accessible via an interface provided by the _**getVar**_ method^^

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

console.log(google.getVar('token'))            // No access
console.log(google.getVar('name', '789541'))   // Google
~~~

^^Let’s print the **google** object to the console:^^

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ► [[Prototype]]: Object

~~~

_____________________________

![ico-25 cap] ** 5**

^^In this example, we do the same thing, but using a subclass of the _User_ class^^
^^The class’s constructor creates a public property _name_^^
^^The class’s factory method _updateUser_ allows us to extend the class’s functionality and create hidden data accessible via an interface (the _**getVar**_ method)^^

~~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }
}

User.updateUser = function (user, params, pin) {
  return Object.assign(user, {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Access denied'
    }
  })
}

const google = User.updateUser(new User('Google'), {
  token: 'AfG78-1nm*15ph',
  cash: 25000
}, '789451')

google.getVar('token', '789451')  // "AfG78-1nm*15ph"
google.getVar('cash', '789451')   // 25000
~~~~

^^Let’s print the **google** object to the console:^^

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ▼ [[Prototype]]:
      ▼ constructor: class User
          ► updateUser: ƒ ( user, params, pin )
            arguments: (...)
            caller: (...)
            length: 1
            name: "User"
            prototype: {constructor: ƒ}
          ► [[Prototype]]: ƒ ()
      ► [[Prototype]]: Object

~~~

__________________________________

## ![ico-25 icon] Polymorphism⟪Polymorphism⟫

Factory methods make it possible to extend the functionality of the constructor, ensuring its polymorphism.

In the following example, the **User** constructor has a factory method **_createNewUser_**,
which allows instances of the class to be created with different sets of properties and methods.

Instances of **visitor** and **currentUser**, created by the **User** constructor,
have different properties and methods.

![ico-25 cap] ** 6**

~~~~js
function User () {
  this.talk = function (key) {
    document.write(`<p>${key}: <b>${this[key]}</b></p>`)
  }
}

User.createNewUser = function (params) {
  const user = new this
  for (const key in params) user[key] = params[key]
  return user
}

const visitor = User.createNewUser({
  name: 'migrant',
  timeVisit: new Date().toLocaleString()
})

visitor.talk('name')
visitor.talk('timeVisit')

const currentUser = User.createNewUser({
  name: prompt('What is your name?'),
  age: prompt('How old are you?'),
  id: Date.now(),
  posts: {},
  registered: new Date().toISOString().slice(0, 10),
  write: function (text) {
    this.posts = Object.assign(this.posts, {
      [new Date().toLocaleString()] : text
    })
  }
})

currentUser.talk('name')
currentUser.talk('registered')
currentUser.write(`I'm here since ${new Date().toLocaleString()}`)
~~~~

_____________________________

~~~console

▼ User {talk: ƒ, name: "migrant", timeVisit: "01.11.2018, 13:40:41"}
    name: "migrant"
  ► talk: ƒ ( key )
    timeVisit: "01.11.2018, 13:40:41"
  ► [[Prototype]]: Object

~~~

______________________________

~~~console

▼ User {talk: ƒ, name: "Nick", age: "25", id: 80661698, posts: {…}, …}
    age: "25"
    id: 80661698
    name: "Nick"
  ▼ posts:
        01.11.2018, 13:40:51: "I'm here since 01.11.2018, 13:40:51"
      ► [[Prototype]]: Object
  ► registered: (2) ["01.11.2018", "13:40:51"]
  ► talk: ƒ ( key )
  ► write: ƒ ( text )
  ► [[Prototype]]: Object

~~~

_________________________________________

~~~js
console.dir(currentUser.__proto__.constructor)
~~~

~~~console

▼ ƒ User()
    createNewUser: ƒ ( params )
    arguments: null
    caller: null
    length: 0
    name: "User"
    prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()

~~~

We have obtained an _enumerable_ static method **_createNewUser_** from the constructor.

Let’s do the same using a class:

~~~js
class User {
  constructor () {
    this.talk = function (key) {
      document.write(`<p>${key}: <b>${this[key]}</b></p>`)
    }
  }

  static createNewUser (params) {
    const user = new this
    for (const key in params) user[key] = params[key]
    return user
  }
}
~~~
In this case, the class’s static method **_createNewUser_** will be non-enumerable,<br/>
whilst everything else will be similar to the constructor-based variant<br/>
^^So, ‘under the bonnet’, it’s still the same prototype-based inheritance at work, just with a few cosmetic ‘additions’.^^
