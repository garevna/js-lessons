# ![ico-30 study] JS objects

_____________________________________________

## ![ico-25 icon] Native and host JS objects

Native objects are defined by the language specification

Native objects are represented by **built-in objects**

^^^[Built-in objects]

**Objects**
     ^^Math^^
     ^^JSON^^
**Constructors**
     ^^Array^^
     ^^Boolean^^
     ^^Number^^
     ^^String^^
     ^^Function^^
     ^^Object^^
     ^^Date^^
     ^^Error^^
     ^^Map^^
     ^^Set^^
     ^^FormData^^
     ^^Promise^^
     ^^Proxy^^
     ^^RegExp^^
     ...
^^^

and objects created whilst the code is running

~~~js
var obj = {
  name: 'Google',
  show: false
}
~~~

**Host objects** are objects of the environment in which the code operates

Host objects include **BOM** and **DOM** objects

^^^[Host objects]
**Objects**
     ^^window^^
     ^^document^^
     ^^history^^
     ^^location^^
     ^^console^^
     ...
**Constructors**
     ^^Event^^
     ^^HTMLElement^^
     ^^XMLHttpRequest^^
     ...
^^^

![ico-20 warn] ^^As constructors are functions, you must use the **~console.dir~** method (rather than ~console.log~) to retrieve their property tree^^

~~~js
console.dir(Promise)
console.dir(XMLHttpRequest)
~~~

There are two ways to create a native JS object:

![ico-20 green-ok] Using an object literal
![ico-20 green-ok] Using a constructor

_________________________________

## ![ico-25 icon] arguments

In literal notation, an object is defined within a block of curly brackets:

![ico-25 cap]

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

All these properties are accessible from outside:

~~~js
console.log(figure.type)
console.log(figure.radius)
console.log(figure.color)
~~~

or like this:

~~~js
console.log(figure['type'])
console.log(figure['radius'])
console.log(figure['color'])
~~~

![ico-20 pin] The properties of objects defined using a literal are **public**, as they are accessible from outside

![ico-25 cap] Although there’s always a way round it ![ico-25 smile]

^^^[Closure]

~~~js
var sample = {
  path: 'https://garevna.github.io/js-lessons/icons/',

  testToken: (function (token) {
    return function () {
      return prompt('Input Your Token: ') === token
    }
  })(prompt('Set Your Token: ')),

  page: function () {
    const ico = this.testToken() ? 'green-ok.png' : 'no_entry.png'
    document.write(`<img src="${this.path}${ico}">`)
  }
}

sample.page()
~~~

^^In this example, when creating the object, you’re prompted to enter an access token, which will be stored in the body of the **testToken** method^^

^^When attempting to access the page (the **page** property), the **testToken** method will be called, which will request an access token and verify it against the value stored in the closure^^

^^If the values match, ![ico-25 green-ok] will be displayed on the page^^

^^Otherwise, ![ico-25 err] will be displayed on the page^^

^^^

____________________________________________


### ![ico-20 icon] Inherent properties

Instance properties are _encapsulated_ within the instance

For example, the instance **~figure~** acts as a ‘capsule’ in which the properties **~type~**, **~size~** and **~color~**  are separated from the same properties of other instances

It is possible to create an object **~figure2~** with the same set of properties, but with different values for those properties:

◘◘![ico-25 cap] 1◘◘

~~~js
var figure2 = {
  type: 'triangle',
  size: 150,
  color: 'blue'
}
~~~

The instances **~figure~** and **~figure2~** have the same set of properties (the property names are the same)

However, the values of these properties differ in each instance

Therefore, **_an instance’s own properties are the properties encapsulated within that instance_**

^^The properties  **_~type~_**,  **_~size~_**  and  **_~color~_**  are **own** properties of the instances  **~figure~**  and  ** ~figure2~** because their values are localised within the ‘capsule’ under the instance’s name )^^

~~~js
figure.type       // "circle"
figure2.type      // "triangle"
~~~

__________________________________________

### ![ico-20 icon] Iterable properties

**Iterable** properties of an instance are properties that can be iterated over using the loop operator  **~for...in~**

![ico-20 warn] By default, the properties of native objects created during code execution are iterable
![ico-20 warn] Properties of built-in native objects are non-iterable

~~~js
for (var prop in figure) console.log(prop)
~~~

The following will be printed to the console

~~~console
type
size
color
~~~

![ico-20 pin] So, using an object literal, you can create **public, own, enumerable** properties of an instance

Clearly, each of these terms has an antonym; that is, there must be _private_, _non-ownership_ and _non-enumerable_ properties

![ico-20 pin] **Private properties** can be created using a **constructor**
![ico-20 pin] _Non-ownership properties_ are **inherited** properties
^^As for creating **_non-enumerable_** properties – we’ll come back to this topic later^^

________________________

### ![ico-20 icon] Inherited properties

◘◘![ico-25 cap] 2◘◘

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

If you ‘unpack’ an instance of **figure** in the console, then in addition to its own enumerable properties ~color~, ~size~ and ~type~, we will see the property **~&#95;&#95;proto&#95;&#95;~**, which was not printed to the console when we iterated over the object using the ~for...in~ statement

~~~console
▼{ type: "Окружность", radius: 100, color: "red" }
    color:"red"
    radius:100
    type:"Окружность"
  ► __proto__:Object
~~~

The output is a **non-enumerable** property

Let’s examine whether this is an intrinsic property

The value of this property is a reference to a built-in native object (constructor) **~Object~**

If we expand the property **~&#95;&#95;proto&#95;&#95;~**, we will see the following in the console:

^^^[__proto__]

~~~console
▼ __proto__
   ► constructor: ƒ Object()
   ► hasOwnProperty: ƒ hasOwnProperty()
   ► isPrototypeOf: ƒ isPrototypeOf()
   ► propertyIsEnumerable: ƒ propertyIsEnumerable()
   ► toLocaleString: ƒ toLocaleString()
   ► toString: ƒ toString()
   ► valueOf: ƒ valueOf()
   ► __defineGetter__ ƒ __defineGetter__)
   ► __defineSetter__ ƒ __defineSetter__)
   ► __lookupGetter__ ƒ __lookupGetter__)
   ► __lookupSetter__: ƒ __lookupSetter__()
   ► get __proto__: ƒ __proto__()
   ► set __proto__: ƒ __proto__()
~~~

^^^

The first thing that catches the eye is that our instance was created by the constructor **~Object~**:

~constructor: ƒ Object()~

Let’s expand **~Object~** in the console

^^To do this, we’ll use the method ~console.dir~, as **~Object()~** is a constructor—i.e. a function—and the method ~console.log()~ will return ••_ ƒ_ Object() { [native code] }••^^

Note the **_~prototype~_** property of the **~Object~** constructor

This is an object

Let’s unpack this object and look at its contents:

~~~console
▼ prototype:
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

![ico-20 warn] it is exactly the same as what we found earlier in the **~&#95;&#95;proto&#95;&#95;~** property of the **figure** instance

Let’s move on and take a look at the **figure2** instance

There, we’ll also find the **~&#95;&#95;proto&#95;&#95;~** property

and its contents will be exactly the same as those of the **figure** instance

Let’s create an empty object

~~~js
var obj = {}
~~~

and log it to the console

Lo and behold! Familiar faces all round! ![ico-25 smile]

We see the very same **~&#95;&#95;proto&#95;&#95;~** property

All native JS objects have this property by default

![ico-20 warn] The **~&#95;&#95;proto&#95;&#95;~** property of JS objects created using a _literal_ is a reference to the **_~prototype~_** property of the **~Object~** constructor

But what about _built-in_ native objects?

Log the **Array** object to the console

~~~js
console.dir(Array)
~~~

and you’ll see a chain of prototypes

The final ‘link’ in the prototype chain will always be **~Object~**

~~~js
console.dir(Array.__proto__.__proto__)  // Object
~~~

The ‘full stop’ at the end of the prototype chain is **~null~**

The same pattern applies to any built-in constructor

![ico-20 pin] For built-in objects that are not constructors (such as _Math_), the prototype chain will be shorter: the property **~&#95;&#95;proto&#95;&#95;~** will be a reference to **~Object~**

____________________________

![ico-25 hw] **Exercise**

Print all native built-in objects to the console and trace the reference to **~Object~** in the prototype chain

_________________________

## ![ico-25 icon] Call context

It’s time to get to grips with what a constructor actually is

![ico-25 warn] It is a function (_which means you can hide something inside it_)
![ico-25 warn] For it to act as a **constructor**, you must prefix its name with the keyword **~new~** when calling it; in this case:
![ico-20 green-ok] it does not require the ~return~ statement, but it will return an **instance** of the object
![ico-20 green-ok] inside it, **~this~** will refer not to the _global object_, but to the returned **instance**
![ico-20 green-ok] all variables and functions declared within it will be _encapsulated_ in the created **instance** (_i.e. they will be the instance’s own properties and methods_)
![ico-20 green-ok] it will have a property **~prototype~** (_which only functions have_)
![ico-20 green-ok] Whatever we place in the property **~prototype~** will be _inherited_ by all instances

![ico-25 warn] It is customary for constructor names to begin with a capital letter

___________________________________

◘◘![ico-25 cap] 3◘◘

~~~js
function Sample (params) {}

var obj = new Sample()
~~~

Let’s print the instance **obj** to the console:

~~~console
▼ Sample {}
    ▼ __proto__:
        ► constructor: ƒ Sample( params )
        ► __proto__: Object
~~~

• We have created an empty object of the **Sample** class ^^(more precisely, we have created an instance of the object)^^
• It has no properties of its own ^^(because nothing has been declared in the constructor)^^
• It has a _prototype chain_ – these are properties nested one within the other  **~&#95;&#95;proto&#95;&#95;~**
• The first ‘link’ in the prototype chain is a reference to the property **~prototype~** of the **Sample** constructor function
• The property **~prototype~** of the constructor function **Sample** is an object
• This means that it also has a property **~&#95;&#95;proto&#95;&#95;~**
• This is the nested property **~&#95;&#95;proto&#95;&#95;~** – the next ‘link’ in the prototype chain
• It is a reference to **Object**

~~~js
Sample.prototype
~~~

~~~console
▼ {constructor: ƒ}
    ► constructor: ƒ Sample(params)
    ► __proto__: Object
~~~

We can add properties to **~prototype~** of the **Sample** constructor

~~~js
Sample
  .prototype
  .setNewProperty = function (propName, propValue) {
    this[propName] = propValue
  }
~~~

If we now print the instance **obj** to the console, we will find a new enumerable property **_~setNewProperty~_** (_inherited method_) in its **~&#95;&#95;proto&#95;&#95;~** property

Let’s call this method:

~~~js
obj.setNewProperty('name', 'Petro')
~~~

and we’ll find that the **obj** instance now has a new _own enumerable_ property **name**

![ico-20 warn] When accessing a property, it is first searched for amongst the instance’s own properties; if not found, the search continues amongst the prototype’s properties, and so on, until the prototype chain ends

![ico-25 pin] The constructor allows you to create instances of objects that have not only public but also private properties and methods

___________________________________________

**The Function Constructor**

◘◘![ico-20 cap] 4◘◘

~~~js
var funcText = `
  var x = 'Hello'
  var y = 'baby'
  console.log(x + ', ' + y)
`

var func = new Function(funcText)

console.log(func)
func()
~~~

**Result:**

~~~console
ƒ anonymous(
) {
   var x = 'Hello'
   var y = 'baby'
   console.log(x + ', ' + y)
}
Hello, baby
~~~

___________________________________

## ![ico-25 icon] Public and private properties

A constructor is a function; it follows, therefore, that a constructor can be used to ‘hide’ variables and functions
Where can they be hidden? – Within an instance created using that constructor

As we already know, a constructor creates **_its own_** properties and methods for instances by declaring variables and functions

![ico-25 pin] All properties declared in the constructor with the keyword  **~this~** will be **_public_**

![ico-25 pin] All properties declared in the constructor using the keyword  **~var~** or **~function~** will be **_private_**

An instance’s public properties and methods are always accessible from the external environment

Simply use _instance name_ + “.” + _property name_ (_method name_)
^^When calling a method, you must also add round brackets after its name^^

An instance’s private properties (and methods) are not accessible from outside

They are not displayed in the console when the object is printed

◘◘![ico-25 cap] 5◘◘

~~~js
var  Girl = function (name = 'Jane', age = 25) {
  this.name = name
  this.age = age

  function showName (name) {
    console.log(`My name is ${name}`)
  }

  this.changeName = function (newName) {
    this.name = newName
    showName(this.name)
  }
}

var lena = new Girl('Helen', 18)
lena.changeName('Mary')
~~~

In this example, **_~defaultName~_** and **_~showName~_** are **_private_** properties of the instance **~lena~**

**_~name~_**, **_~age~_** and **_~changeName~_** are **_public_** properties of the instance **~lena~**

In the public methods of the instance (**_~changeName~_**),  **~this~**  will be a reference to the instance (**~lena~**)

![ico-20 warn] In the instance’s private methods (**_~showName~_**), the call context will be the *global object* **~window~**

(i.e. within the method **_~showName~_** ** ~this~**  will be a reference to the object **~window~**)

___________________________________

◘◘![ico-25 cap] 6◘◘

~~~js
var girls = []

girls[0] = new Girl('Helen', 18)
girls[1] = new Girl('Mary', 20)
~~~

◘◘![ico-25 cap] 7◘◘

~~~js
var Bag = function (keyword) {
  var money = 3000

  var documents = [
    'Passport',
    'Driver license',
    'University Diploma'
  ]

  var accessories = [
    'Keys',
    'Movie tickets',
    'Medicine'
  ]

  this.content = null

  function getMoney (sum) {
    money -= sum
  }

  this.payment = function (sum) {
    if (prompt('Who are you?') !== keyword) return '⛔️'
    getMoney(sum)
    console.info(`Money left in wallet: ${money} uah`)
    return `Paid: ${sum} uah`
  }

  this.rummage = function () {
    this.content = [
      documents,
      accessories,
      money
    ]
    console.log(`Search protocol. Bag contents: ${this.content}`)
  }
}

var myCase = new Bag('it\'s me, your mistress')
~~~

^^The constructor **~Bag~**  creates an object with private properties  **~money~**,  **~documents~** and **~accessories~**^^

^^We use it to create an instance of **myCase**^^

^^When creating the instance, we pass it the key phrase to access the contents of the handbag: ‘_it’s me, your mistress_’^^

^^As the properties **~money~**, **~documents~** and **~accessories~** are private, “the handbag is locked”^^

^^Outsiders have no access to its contents^^

^^The public property **~content~** initially has the value  **~null~**^^

^^That’s all you can see in the closed handbag^^

^^If the owner of the bag agrees to show its contents, these will be placed in the public property **~content~** for viewing^^

^^The function **~getMoney()~** for accessing the money (the private property **~money~**) is also private, as no one other than the owner should be able to take money from the bag^^

^^And there are two public methods:^^

^^• **payment (_sum_, _key_)** – payment^^
^^• **rummage ()** – customs inspection^^

^^When a payment is made using the public method **payment**^^

~~~js
console.log(myCase.payment(2000))
~~~

^^A key phrase is requested, checked against the one set when the instance was created, and if the values match, the private method **~getMoney~** is called, which decrements the private property ** ~money~** by the amount of the payment,  whereupon  the public method **~pay()~** returns the withdrawn amount with a clear conscience^^

^^If an incorrect passphrase is entered, the request will be rejected and ![ico-20 err]^^ will be returned

^^In the event of a customs inspection, the public method **rummage()** is called^^

~~~js
myCase.rummage ()
~~~

^^which ‘displays’ the contents of the handbag (placing them in the public property **~content~**)^^

^^Now customs officers can view the contents:^^

~~~js
console.log(myCase.content)
~~~

_________________________________________

Thus, private and public properties and methods are placed within a ‘capsule’ – an object (instance)

This is what encapsulation (**_encapsulation_**) is

The names of properties and methods inside the ‘capsule’ belong to the object’s namespace

We have aggregated under a single name (the object’s name) the entire set of variables and functions that define and modify its (the object’s) state
