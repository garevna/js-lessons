# ![ico-30 study] The JS inheritance model

The **_JS_** inheritance model is based on the concept of a **prototype**

A **prototype** is an **object**

^^The predecessor to JavaScript in terms of the prototype-based inheritance model is the language^^ [<img src="assets/self-logo.png" width="80"/>](http://www.selflanguage.org/)

^^The desire to make JavaScript’s syntax resemble **Java** led to the emergence of ‘vestiges’ in the language, such as the keyword **~new~**, which serves no practical purpose in languages with a prototype-based inheritance model and creates the illusion of classes^^

A class is an abstraction; an object is an instantiation

_________________________

@@@@

![](createPath("images", "smoke-monkey.gif"))
![ico-25 yes] Ladies and gentlemen<br>Smoking is harmful to your health,<br>and smoking specifically in this block of flats could seriously undermine it

@@@@

__________________________________


![ico-25 speach] **Class and object**
^^A cup is an abstraction,^^
^^but the cup from which you are currently drinking tea is a concrete instantiation of the abstraction ‘cup’^^
^^To create a concrete instance of the ‘cup’ class in the classical model, the keyword **~new~** is used^^

![ico-25 speach] **Inheritance in the classical model**
^^The abstraction ‘cup’ is nested within another abstraction – ‘container’ – since a saucepan, a tank and a flask are also containers^^
^^Thus, the ‘cup’ class inherits from the ‘container’ class^^


So here’s the thing:

![ico-25 yes] **In JS, inheritance occurs from an _object_, not a _class_**,

**i.e. from a _specific instance_, not from an abstraction**

In other words, **JS** is a very concrete language ![ico-25 smile]

_____________________________________________________________

## ![ico-25 icon] prototype

To create an object in JS, we simply need to do the following:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sample = {
  name: 'master'
}
~~~

When we do this, our object ‘magically’ acquires a property called **_~&#95;&#95;proto&#95;&#95;~_**:

~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__: Object
~~~

This property is a reference to the object **~prototype~**, which actually exists

within the built-in native object **~Object~**

In my view, this corresponds quite well with reality:
![ico-20 question] Is it possible to inherit from the _class_ “grandfather”?

______________________

@@@@

![](createPath("images", "cat-no.gif"))
Even a cat would understand that only a **specific** grandfather can leave you an inheritance

@@@@

__________________________

Thus, **~sample~** inherited from **~Object~**

To see what exactly **~sample~** inherited from **~Object~**, let’s expand its property **_~&#95;&#95;proto&#95;&#95;~_** in the console:

~~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__:
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
~~~~

The “grandfather” **~Object~** itself is not an inheritance

It stands to reason that the “grandfather’s” inheritance is stored somewhere…

It is stored in the **~prototype~** property of the “grandfather” (the **~Object~** object)

Let’s check:

^^^[Object.prototype]
~~~console
▼ {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
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

For example, the “inheritance” includes the method **_~hasOwnProperty~_**

Let’s try using it:

~~~js
sample.hasOwnProperty('name')   // true
~~~

Oops, we’ve got ~true~, i.e. the method works!

So, inheritance has been successfully implemented ![ico-25 smile]

![ico-25 question] Why do we even need the keyword **~new~**?

So, let’s summarise:

![ico-20 green-ok] ‘inheritance’ is stored in the **~prototype~** property of the ‘grandfather’
![ico-20 green-ok] the ‘heir’ receives the **_~&#95;&#95;proto&#95;&#95;~_** property
![ico-20 green-ok] the property **_~&#95;&#95;proto&#95;&#95;~_** is a reference to the  chest containing the inheritance (the object **~prototype~**)

_________________________________________________________________

## ![ico-25 icon] constructor

Now let’s look at the first thing we see in the constructor’s **~prototype~** object and in the instance’s **_~&#95;&#95;proto&#95;&#95;~_** property

This is the **~constructor~** property

Its value is ••_ ƒ_ Object()••

The letter ~ ƒ~ tells us that this is a function

~Object()~ tells us that this function is the constructor **~Object~**

So, we have established that the built-in native object **~Object~**:

• is a function
• acts as **~constructor~**

Thus, in the inheritance chest (the **~prototype~** object) there is a reference to the ‘grandfather’ from whom inheritance is derived

Furthermore, the ‘grandfather’ is a **function**

And ‘grandad’ has a very specific role – he is **~constructor~**

Now the question is: what made him a **_constructor_**?

___________________________________________________________________

Let’s try the following ‘trick’:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
console.dir(function Sigma () {})
~~~

and note the presence of the property **~prototype~**,

which contains the property **~constructor~**

~~~console
▼ ƒ Sigma()
    arguments: null
    caller: null
    length: 0
    name: "Sigma"
  ▼ prototype:
    ► constructor: ƒ Sigma()
    ► __proto__: Object
  ► __proto__: ƒ ()
~~~

Where does the property **~constructor~** point to? – to the function **_~Sigma~_**

In other words, by default, it is already a constructor

It has everything it needs to act as a ‘grandfather’

Let’s refer to such objects as “**constructors**” rather than “_grandfathers_” – this is closer to the semantics of the language

And once again, I draw your attention to the fact that everything here is entirely concrete; there are no abstractions, no classes – only objects (functions are objects too)

The entirely concrete function **_~Sigma~_** is already ready to pass on its entirely concrete object **~prototype~** to its descendants as inheritance

All that remains is to call it using the keyword **~new~**:

~~~js
var obj = new Sigma
~~~

and we’ll get a descendant...

But is it possible to pass on inheritance without **~new~**?

~~~js
function Sigma () {}

Sigma.prototype.say = function () {
  console.log('I\'m the instance of Sigma: ', this instanceof Sigma)
}
var obj = {}
obj.__proto__ = Sigma.prototype
~~~

And we’re all set!

One line:

~~~js
obj.__proto__ = Sigma.prototype
~~~

made the object **~obj~** a descendant of **~Sigma~**

Moreover, the statement _~instanceof~_ quite correctly returns ~true~ to us, as if **~obj~** were an instance of the class **~Sigma~**:

~~~js
obj.say()
~~~

**Result in the console:** ••I'm the instance of Sigma:  true••

But there is no such class as **~Sigma~** – as you will quite rightly point out

And you’d be quite right! [ico-20 smile]

**~Sigma~** is simply a function, not a class

^^We gave it a name starting with a capital letter to give it a ‘sense of class’ – it’s a complete sham^^

In reality, all that happened was that a reference to the object **_~prototype~_** of the function **~Sigma~** was placed in the property **_~&#95;&#95;proto&#95;&#95;~_** of the object **~obj~**

^^Why imitate the class model, hiding the true nature of inheritance in JS ‘under the bonnet’?^^

^^This is confusing and leads to a misunderstanding of the true nature of what is happening^^

In this example, we’ve encountered another important concept – **_~this~_**

We’ve previously come across the keyword **_~this~_** in the context of function execution

Let’s take another look

_________________________________________________________________________

## ![ico-25 icon] this

So, we’ve already understood that any function in JS is essentially a constructor, as it has a container for ‘inheritance’ – the **_~prototype~_** property

But what else do we know about JS functions?

We know that when they are called, they acquire a reference to the call context – **~this~**

Did you notice that in the example above, this keyword is used inside the function **~say~**?

The function **~say~** itself is contained within the **_~prototype~_** object of the function **~Sigma~**

Let’s modify the function **~say~** without changing anything else:

~~~js
Sigma.prototype.say = function () {
  console.log(`My name is ${this.name}`)
}
~~~

and let’s add the property **_~name~_** to the object **~obj~**:

~~~js
obj.name = 'Google'
~~~

Now let’s call the method **~say~**, which the object **~obj~** has inherited:

~~~js
obj.say()   // My name is  Google
~~~

Oops, _~this.name~_ turned out to be ‘Google’!

In other words, ~this~ is a reference to **~obj~**!

How is that possible?

It’s all correct and logical:

• Firstly, the method **_~say~_** is available to the object **~obj~** because it is inherited
• Secondly, when calling ~obj.say()~, we explicitly specified the call context

In other words, when one of the subclasses calls an inherited method, the call context for that method will be that specific subclass

**~this~** will refer to the caller within the method

After all, **~this~** is a reference to the **call context**

In other words, every subclass can make use of it, and at the moment it does so, this method belongs to it

Got it? ![ico-25 smile]

__________________________________________________________________________

## ![ico-25 icon] The prototype chain

Please note that in the previous example, we created an object **~obj~** with two nested properties **_~&#95;&#95;proto&#95;&#95;~_**

~~~console
▼ Sigma {name: "Google"}
    name: "Google"
  ▼ __proto__:
    ► say: ƒ ()
    ► constructor: ƒ Sigma()
    ► __proto__: Object
~~~

The first property **_~&#95;&#95;proto&#95;&#95;~_** is a reference to **_an object_**, which contains:

• the property **_~say~_**
• a function that prints the value of _~this.name~_ to the console
• the property **_~constructor~_**
• a reference to the function **~Sigma~**
• another property **_~&#95;&#95;proto&#95;&#95;~_**
• a reference to the object **_~prototype~_** of the constructor **~Object~**

So, our prototype chain now consists of two links

There may be significantly more of these links

What does this mean?

It means that when accessing any property (or method) of the instance **~obj~**, the search will proceed downwards along the prototype chain

This means that if a property with that name exists at several levels, the value located higher up in the prototype chain will be used

________________________________________________________

## ![ico-25 icon] The Object constructor

**~Object~** is the ‘Adam’ of all objects in JS

The root from which everything grows

A reference to its **_~prototype~_** property will be the final link in any prototype chain, before the ‘fat dot’ at the end – **~null~**

However, you have complete freedom to be creative

You can create an object without a prototype, for example, like this:

~~~js
var obj = Object.create(null)
~~~

^^(we’ve put the ‘dot’ straight away)^^

or like this:

~~~js
var obj = {}
obj.__proto__ = null
~~~

_____________________________________________________


### ![ico-20 icon] Static properties of Object

**constructor’s own properties ~Object~**

Properties and methods of the **Object** object that are not contained within the **~prototype~** property are not inherited by instances, and can only be accessed as properties and methods of the **Object** object:

~~~~console
▼ Object()
    arguments: (...)
  ► assign: ƒ assign()
    caller: (...)
  ► create: ƒ create()
  ► defineProperties: ƒ defineProperties()
  ► defineProperty: ƒ defineProperty()
  ► entries: ƒ entries()
  ► freeze: ƒ freeze()
  ► fromEntries: ƒ fromEntries()
  ► getOwnPropertyDescriptor: ƒ getOwnPropertyDescriptor()
  ► getOwnPropertyDescriptors: ƒ getOwnPropertyDescriptors()
  ► getOwnPropertyNames: ƒ getOwnPropertyNames()
  ► getOwnPropertySymbols: ƒ getOwnPropertySymbols()
  ► getPrototypeOf: ƒ getPrototypeOf()
  ► is: ƒ is()
  ► isExtensible: ƒ isExtensible()
  ► isFrozen: ƒ isFrozen()
  ► isSealed: ƒ isSealed()
  ► keys: ƒ keys()
    length: 1
    name: "Object"
  ► preventExtensions: ƒ preventExtensions()
  ► prototype: {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
  ► seal: ƒ seal()
  ► setPrototypeOf: ƒ setPrototypeOf()
  ► values: ƒ values()
  ► __proto__: ƒ ()
~~~~

As they are not passed to instances, they are referred to as **_static_**

____________________________________

Let’s use the method **~Object.create~** to create a new instance of the object:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var sample = Object.create({ type: 'figure' })
sample.name = 'circle'
~~~

and print it to the console:

~~~console
▼ { name: "circle" }
    name: "circle"
  ▼ __proto__:
        type: "figure"
      ► __proto__: Object
~~~

As you can see, we have once again managed without the keyword **~new~**,
and have successfully created an instance **~sample~**,
whose first link in the prototype chain is a reference to the unnamed object ~{ type: "figure" }~,
followed by a reference to the **_~prototype~_** property of the **~Object~** constructor

_________________________________________

Let’s use the method **~Object.setPrototypeOf()~**:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
var sample = {
  name: 'circle'
}
var sample = Object.setPrototypeOf(sample, { type: 'figure' })
~~~

The result will be exactly the same as in the previous example, and once again we have managed without the keyword **~new~**

Let’s ‘tinker’ a bit further:

~~~js
var test = Object.create(sample)
test.draw = function () {
  console.log(this.name)
}
~~~

The new instance ~test~ inherits everything from the object ~sample~, including its prototype chain:

~~~console
▼ { draw: ƒ }
    draw: ƒ ()
  ▼ __proto__:
        name: "circle"
      ► __proto__:
            type: "figure"
          ► __proto__: Object
~~~

Admittedly, we don’t have any class emulation here (the **~constructor~** property is missing from the prototype chain) and the **~instanceof~** statement becomes useless

But at least it’s all above board! [ico-25 smile]

_______________________________________________________________________

### ![ico-20 icon] Object.&#95;&#95;proto&#95;&#95;

Let’s print the **_~&#95;&#95;proto&#95;&#95;~_** property of the **~Object~** constructor to the console

~~~~console
▼ __proto__: ƒ ()
    ► apply: ƒ ()
      arguments: (...)
    ► bind: ƒ ()
    ► call: ƒ ()
      caller: (...)
    ► constructor: ƒ ()
      length: 0
      name: ""
    ► toString: ƒ ()
    ► Symbol(Symbol.hasInstance): ƒ ()
    ► get arguments: ƒ ()
    ► set arguments: ƒ ()
    ► get caller: ƒ ()
    ► set caller: ƒ ()
    ► __proto__: Object
~~~~

and now let’s print the **~prototype~** property of the **Function** constructor to the console

~~~~console
▼ prototype: ƒ ()
    ► apply: ƒ ()
      arguments: (...)
    ► bind: ƒ ()
    ► call: ƒ ()
      caller: (...)
    ► constructor: ƒ ()
      length: 0
      name: ""
    ► toString: ƒ ()
    ► Symbol(Symbol.hasInstance): ƒ ()
    ► get arguments: ƒ ()
    ► set arguments: ƒ ()
    ► get caller: ƒ ()
    ► set caller: ƒ ()
    ► __proto__: Object
~~~~

It is clear that **~Object~** inherits from **~Function~**, which makes sense, since **~Object~** is a constructor, i.e. a function

~~~js
console.dir( Object.__proto__.constructor.name)
// Function
~~~

At the same time, the object **~Function.prototype~** inherits from **~Object~**

(the property **~Function.prototype.&#95;&#95;proto&#95;&#95;~** is a reference to **~Object.prototype~**)

Now that’s what I call ‘Siamese twins’! [ico-25 smile]

| ^^Property^^ | ^^link to^^ |
| ~Object.&#95;&#95;proto&#95;&#95;~ | ~Function.prototype~ |
| ~Function.prototype.&#95;&#95;proto&#95;&#95;~ | ~Object.prototype~ |

_____________________________________________________

## ![ico-25 cap] Example

The host object  **~console~**  has properties   ~log~,  ~dir~,  ~info~,  ~warn~,  ~error~...

^^To retrieve all the enumerable properties of the host object ~console~, use the  for...in^^ statement

~~~js
for (var prop in console) console.log(prop)
~~~

We can access these properties as elements of an associative array:

~~~js
console['log']
console['dir']
console['info']
console['warn']
console['error']
~~~

The listed properties have the data type  ‘**~function~**’

This means that they are methods of the object ~console~

^^To call a method, you must use round brackets, which may (or may not) contain arguments^^

The listed methods are called with an argument

~~~js
console['log']('Привет!')
~~~

^^The console will display “Hello!”^^

Let’s create a **presence** object with the following structure:

~~~~js
var presence = {
  'Артюх Илья' : true,
  'Боднарь Михаил' : true,
  'Гончар Виктор' : true,
  'Дмитренко Пётр' : true,
  'Дорошенко Дмитрий' : true,
  'Калашников Григорий' : true,
  'Кержакова Марина' : true,
  'Москаленко Андрей' : true,
  'Ничипоренко Иван' : true,
  'Опрышкин Дмитрий' : true,
  'Подобреева Юлия' : true,
  'Саратова Ольга' : false,
  'Алескерова Евгения' : false
}
~~~~

Now let’s print the names of all the properties of the **presence** object to the console as follows:

• if a property has the value  _~true~_, then we’ll print the property name  to the console using the **~console.info~** method

• and if a property has the value  _~false~_, then we’ll print the property’s name  to the console  using the method **~console.error~**

To determine the name of the object’s method  ~console~, we’ll use a ternary operator:

~~~js
presence[student] ? 'info' : 'error'
~~~

which will return the value **‘info’** if  ~presence[student]~ is **~true~**, or the value **‘error’** if  ~presence[student]~ is **~false~**

~~~js
for (var student in presence) {
  console[presence[student] ? 'info' : 'error'](student)
}
~~~

Now let’s create a group log:

~~~~js
var group = [
  {
    name: 'Артюх Илья',
    present: []
  },
  {
    name: 'Боднарь Михаил',
    present: []
  },
  {
    name: 'Гончар Виктор',
    present: []
  },
  {
    name: 'Дмитренко Пётр',
    present: []
  },
  {
    name: 'Дорошенко Дмитрий',
    present: []
  },
  {
    name: 'Калашников Григорий',
    present: []
  },
  {
    name: 'Кержакова Марина',
    present: []
  },
  {
    name: 'Москаленко Андрей',
    present: []
  },
  {
    name: 'Ничипоренко Иван',
    present: []
  },
  {
    name: 'Опрышкин Дмитрий',
    present: []
  },
  {
    name: 'Подобреева Юлия',
    present: []
  },
  {
    name: 'Саратова Ольга',
    present: []
  },
  {
    name: 'Алескерова Евгения',
    present: []
  }
]
~~~~
and run the loop:

~~~js
var lessonDate = new Date().toLocaleString().split(', ')[0]

for (var student of group) {
  student.present.push({
    data: lessonDate,
    name: presence[student.name]
  })
}
~~~

Print the result to the console

_____________________________________________________

※※※exercises https://docs.google.com/forms/d/e/1FAIpQLSf-i0cr7AEXzSJrggqS1AgZz-OBW5ES-l_ntO1R4Q7XZqZaEw/viewform※※※

__________________________________________________

[![ico-20 link] ^^Global_Objects^^](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects)
[![ico-20 link] ^^Object-Oriented JavaScript^^](https://developer.mozilla.org/ru/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
