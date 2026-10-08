# ![ico-30 study] Classes⟪Classes⟫

**ES6 (ECMAScript 2015)**

••Proxies to simplify working with the prototype inheritance model••

Since the prototype inheritance model is based on a function (constructor), the proxy object **~class~** is, in essence, a wrapper for this constructor function.

^^This wrapper makes it considerably easier to construct rather complex inheritance chains, thanks to the simpler and more convenient interface of the proxy object.^^

^^However, it should be borne in mind that this is merely a layer of 'cellophane' in which the same old constructor has been wrapped.^^

___________________________________________________

## ![ico-25 icon] Syntax⟪Syntax⟫

![ico-20 memo] The 'body' of the class is always enclosed in curly brackets ~{...}~.

~~~js
class User {
  ...
}
~~~

••![ico-20 warn] **_strict mode_**<br/>Code within the body of a class is always executed in strict mode<br/>(even if you have not used the _use strict_ directive).••

![ico-20 memo] The constructor is usually declared within the curly brackets:

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

•••• pin
![ico-20 memo] Until 2022, the language standard did not provide a syntax for declaring properties within the body of a class. All private properties had to be created strictly within **_constructor()_**.
![ico-20 memo] With the introduction of the **Class Fields** specification, the rules were expanded. Now, any variable (property) declared directly within the class body without the _static_ keyword automatically becomes a private property of every instance created. Under the bonnet, the engine itself ‘moves’ these declarations into the constructor and executes them when _new_ is called, before your code runs.
••••

~~~js
class User {
  constructor (name) {
    this.name = name
  }
  age = 35
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user
< ► User {age: 35, name: 'Piter'}
~~~

___________________________________________________

### ![ico-20 icon] Private class fields⟪Private_class_fields⟫

••The **_#_** symbol before a property or method name declares it as private (_Private class fields_). This is standard **ES2022** syntax.••

♦♦♦1♦♦♦

~~~js
class User {
  #status
  constructor (name = 'Unknown', status) {
    this.name = name
    this.#status = status
    this.getStatus = () => console.log(this.#status)
  }
}
~~~

![ico-25 warn] Please note that to declare a custom private property of an instance, we must first declare it within the body of the class (**~#status~**).<br/>^^Unlike ordinary properties, which can be dynamically added to an object at any time, private properties are rigidly bound to the class structure.<br/>The JavaScript engine must know exactly which private properties the class has in advance (during the code compilation stage) in order to guarantee access safety and optimise the code’s performance.<br/>^^

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...   constructor (name = 'Unknown', status) {
...     this.name = name
...     this.#status = status
...     this.getStatus = () => console.log(this.#status)
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user
< User { name: 'Piter', getStatus: [Function (anonymous)] }
> user.getStatus()
registered
undefined
> user.#status = 'test'
< user.#status = 'test'
<     ^
<
< Uncaught SyntaxError: Private field '#status' must be declared in an enclosing class
~~~

^^![ico-25 warn] Do not attempt to reproduce this code in the browser console or in a snippet, as DevTools executes it in a special extended debugging mode (REPL context). In this mode, the browser deliberately disables syntactic restrictions on private fields.<br/>![ico-25 bash] If you simply type the command **~node~** into the terminal and press Enter, you’ll enter interactive mode (similar to a browser console). There, you can enter any code line by line, and to exit, press Ctrl + C twice.^^

___________________________________________________

### ![ico-25 icon] Class properties and methods⟪Class_properties_and_methods⟫

Everything declared within a class body is categorised into four groups depending on its syntax:

•••• none
![ico-20 pin] Instance fields: ordinary variables (e.g. age = 25) declared outside the constructor. These are created individually for each new object at the moment of its creation.
![ico-20 pin] Prototype methods: ordinary functions declared within the body of the class. They are stored as a single instance in the class’s prototype to save memory, and objects access them via the prototype chain.
![ico-20 pin] Private elements (_Private fields/methods_): properties and methods beginning with **_#_**. They are accessible only to code within the curly brackets of that class. Each instance has its own private properties.
![ico-20 pin] Static elements (_Static fields/methods_): declared using the keyword **_static_**. They belong to the class (or constructor) itself. They can only be accessed via <ClassName>.<property> (such as the _Object.keys()_ method and other static methods of the **Object** constructor).
••••

♦♦♦2♦♦♦

~~~js
class User {
  #status

  constructor (name, status) {
    this.name = name
    this.#status = status
  }

  getStatus () {
    return this.#status
  }

  get status () {
    return this.#status
  }

  set status (newStatus) {
    const allowedStatuses = ['registered', 'admin', 'customer'];
    if (allowedStatuses.includes(newStatus)) {
      this.#status = newStatus
    } else {
      console.error(`Invalid status '${newStatus}'.`)
    }
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...
...   constructor (name, status) {
...     this.name = name
...     this.#status = status
...   }
...
...   getStatus () {
...     return this.#status
...   }
...
...   get status () {
...     return this.#status
...   }
...
...   set status (newStatus) {
...     const allowedStatuses = ['registered', 'admin', 'customer'];
...     if (allowedStatuses.includes(newStatus)) {
...       this.#status = newStatus
...     } else {
...       console.error(`Invalid status '${newStatus}'.`)
...     }
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user.getStatus()
< 'registered'
> user.status
< 'registered'
> user.status = 'figma'
! Invalid status 'figma'.
> user.status = 'hacker'
! Invalid status 'hacker'.
~~~

___________________________________________________

♦♦♦3♦♦♦

~~~js
class Demo {
  publicField = 'I belong to an instance'

  #privateField = 'I am hidden inside an instance'

  static staticField = 'I belong to the Demo class itself'

  constructor (name) {
    this.name = name
  }

  publicMethod () {
    return `Accessing a private field: ${this.#privateField}`
  }

  static staticMethod () {
    return 'I am called as Demo.staticMethod()'
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class Demo {
...   publicField = 'I belong to an instance'
...
...   #privateField = 'I am hidden inside an instance'
...
...   static staticField = 'I belong to the Demo class itself'
...
...   constructor(name) {
...     this.name = name
...   }
...
...   publicMethod () {
...     return `Accessing a private field: ${this.#privateField}`
...   }
...
...   static staticMethod () {
...     return 'I am called as Demo.staticMethod()'
...   }
... }
< undefined
> const instance = new Demo('Test')
< undefined
> instance
< Demo { publicField: 'I belong to an instance', name: 'Test' }
> instance.publicMethod()
< 'Accessing a private field: I am hidden inside an instance'
> Demo.staticMethod()
< 'I am called as Demo.staticMethod()'
> Demo.staticField
< 'I belong to the Demo class itself'
~~~

___________________________________________________

## ![ico-25 icon] Initialisation process⟪Initialisation_process⟫

When creating an instance, the engine performs initialisation strictly from top to bottom, but in two distinct stages. Code written within the body of the class is always executed before the body of the **~constructor~** itself.
**Stage 1**: The engine creates an empty object (the future instance) in memory and immediately begins to initialise the properties declared in the class body, in the order in which they are written:

Let us consider the procedure for initialising class fields using the previous example 3.

•••• none

1. A hidden slot is allocated and the private property **_#privateField_** is written to it;
2. A public property, **_publicField_**, is created with the value  '**I belong to an instance**'

••••

**Stage 2**: Implementing the constructor
Only once all the fields from the class body have been successfully instantiated does the engine proceed to execute the code within the constructor function:

•••• none
3. The line _this.name = name_ is executed, adding another instance property to the instance.
••••

To prove this, let’s do the following: instead of simply assigning string values to properties, we’ll call the ~getValue()~ function, which will print the name of the variable being initialised to the console.

♦♦♦4♦♦♦

~~~js
function getValue (stepName) {
  console.log(`-> In progress: ${stepName}`)
  return 'value'
}
~~~

♦♦♦5♦♦♦

~~~js
class TestOrder {
  firstField = getValue('Class field (firstField)')

  constructor () {
    getValue('Code within the constructor')
    this.secondField = 'created in the constructor'
  }

  thirdField = getValue('Class field (thirdField)')
}

const instance = new TestOrder()
~~~

This will allow us to track the order in which the variables are initialised.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> function getValue(stepName) {
...   console.log(`-> In progress: ${stepName}`)
...   return 'value'
... }
< undefined
> class TestOrder {
...   firstField = getValue('Class field (firstField)')
...
...   constructor() {
...     getValue('Code within the constructor')
...     this.secondField = 'created in the constructor'
...   }
...
...   thirdField = getValue('Class field (thirdField)')
... }
< undefined
> const instance = new TestOrder()
< -> In progress: Class field (firstField)
< -> In progress: Class field (thirdField)
< -> In progress: Code within the constructor
< undefined
~~~

This will allow us to track the order in which the variables are initialised.

___________________________________________________

## ![ico-25 icon] Class expression⟪Class_expression⟫

Declaring classes using a _Class Expression_ works in the same way as a _Function Expression_. This syntax makes classes ‘first-class citizens’ (**First-Class Citizens**) in JavaScript — they can be dynamically passed to functions, returned from them, or assigned to variables.
The main difference lies in the scope of the class name and the ease of debugging.

### ![ico-20 icon] Anonymous class expression⟪Anonymous_class_expression⟫

♦♦♦6♦♦♦

~~~js
const User = class {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

**Class name**: This class does not have its own internal name. However, modern JavaScript engines are clever enough to automatically take the name from the variable in which the class is stored (~User.name === 'User'~).
**Where it is accessible**: Only via the ~User~ variable.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'User'
> const user = new User
< undefined
> user
< User { setName: [Function: setName], getName: [Function: getName] }
> user.getName()
< 'Unknown'
> user.setName('Piter')
< undefined
> user.getName()
< 'Piter'
~~~

___________________________________________________

### ![ico-20 icon] Named class expression⟪Named_class_expression⟫

♦♦♦7♦♦♦

~~~js
const User = class Human {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

**Class name**: The **~name~** property is now strictly bound to the internal name: ~User.name === 'Human'~.
**Name scope**: The name **~Human~** is only accessible within the body of the class itself (in the constructor or methods). You cannot call ~new Human()~ from outside — you will get a **_^^ReferenceError^^_**. From outside, this class is accessible exclusively via the name **~User~**.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class Human {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'Human'
~~~

___________________________________________________

At first glance, creating two different names (**~User~** externally and **~Human~** internally) seems confusing, but this approach serves two important practical purposes:

^^^[Debugging and Stack Trace]
^^If an error occurs inside a constructor or method, you will see the exact class name in the browser console.^^
![ico-20 paperclip] ^^For an anonymous class in complex chains or when passed to other modules, the error stack may display ~&lt;anonymous>~.^^
![ico-20 paperclip] ^^For a named class, the logs will always show the specific name: **~Human.constructor~** or **~Human.myMethod~**.^^

~~~js
let User = class {
  static createDefault() { return new User }
}
~~~

~~~demo
> const Student = User
< undefined
> User = null
< null
> Student.createDefault()
! Uncaught TypeError: User is not a constructor
~~~

^^^

^^^[Recursion and static properties]
^^If you need to access a class’s own static methods or call its constructor recursively from within the class, using the internal name **~Human~** protects the code from external modifications.^^
^^^

___________________________________________________

♦♦♦8♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

~~~demo
> console.log(Picture.name)
< Canvas
~~~

~~~js
const picture = new Picture()

picture.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
picture.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

~~~demo
> picture instanceof Picture
< true
> picture instanceof Canvas
! Uncaught ReferenceError: Canvas is not defined
~~~

{{{Classes-5.js}}}

___________________________________________________

## ![ico-25 icon] get & set⟪get_&_set⟫

To create computed properties, you need to use getters and setters.
![ico-20 memo] Using the keyword **~get~**, you can declare a getter that returns the value of a computed property.
![ico-20 memo] Using the keyword **~set~**, you can declare a setter that changes the value of a property.

•••• none
^^The getter will be called every time the instance’s property is accessed.^^
^^The setter will be called whenever the identifier of the computed property appears on the left-hand side of an assignment statement.^^
••••

Let’s look at an example of the **~Canvas~** class with a computed property called **~history~**:

♦♦♦9♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')

    let history = []

    Object.defineProperty(this, 'history', {
      get: () => Object.freeze(history),

      set: newHistory => {
        if (!Array.isArray(newHistory)) {
          console.error('Invalid value.')
          return
        }

        const tmp = newHistory
          .filter(item => item.path && Array.isArray(item.path))

        if (!tmp.length) {
          console.error('canvas.history is an array of objects with a required `path` property.')
          return
        }

        history = tmp
      },

      enumerable: true,
      configurable: true
    })
  }
}
~~~

Let’s create an instance of this class and print it to the console:

~~~js
const canvas = new Canvas
console.log(canvas)
~~~

~~~console
▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
    history: (...)
  ► get history: () => history
  ► set history: newHistory => {…}
  ▼ [[Prototype]]: Object
      ► constructor: class Canvas
      ► [[Prototype]]: Object
~~~

The instance now has its own computable property **~history~**.
Let’s check how the setter for this property works by assigning a value to the computed property:

~~~js
canvas.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  '***',
  { val: '***' }
]
~~~

We are deliberately passing incorrect data to the setter, which does not match the data schema of the **~history~** object. Now let’s check what the value of this property will be; in other words, let’s use the getter:

~~~js
console.log(canvas.history)
~~~

~~~console
▼ (2) [{…}, {…}]
  ► 0: {path: Array(2), lineColor: 'red'}
  ► 1: {path: Array(2), lineColor: 'green'}
    length: 2
  ► [[Prototype]]: Array(0)
~~~

Great, our setter has filtered the received values, preventing rubbish from getting into the **~history~** array.

Let’s try to perform the assignment by passing incorrect values:

~~~demo
> canvas.history = 'History'
! Invalid value.
> canvas.history = ['***']
! canvas.history is an array of objects with a required `path` property.
~~~

The setter for the computed property prevented us from corrupting the data, and we will see an exception in the console:

Since **~history~** is a **reference data type**, and a reference is like a master key, let’s check that once we’ve retrieved a reference to **~history~** using a getter, we won’t be able to corrupt it:

~~~demo
> canvas.history.push({ x: 10, y: 20 })
! Uncaught TypeError: Cannot add property 2, object is not extensible
> canvas.history.pop()
! Uncaught TypeError: Cannot delete property '1' of [object Array]
~~~

___________________________________________________

## ![ico-25 icon] Loss of context⟪Loss_of_context⟫

![ico-20 pin] In strict mode, implicit call context passing does not occur.

![ico-25 pin] Context loss (~undefined~) occurs because all code within the class body is executed in  **~strict mode~**, even though there is no explicit 'use strict'  directive in the class code.

•••• none
In the absence of an explicit reference to the object calling the method
in strict mode, **_this_** will not be a reference to the global object _window_.
In strict mode, **_this_** will be **_undefined_**.
••••

Let’s go back to Example 5:

~~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const picture = new Picture
~~~~

![ico-20 warn] Context loss always occurs if a reference to a method is assigned to a new variable:

~~~demo
> const drawLine = picture.drawLine
< undefined
> drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
! Uncaught TypeError: Cannot read property 'area' of undefined
~~~

Let’s declare the method **~drawLine~** using an arrow function:

♦♦♦10♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine = (points) => {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

Now, the call context of the inherited method **~drawLine~** is determined at the time the instance is created, and it can no longer be changed.
And at the time the instance is created, as we already know, the call context will be a reference to the instance being created.

Once the **~test~** function has been called, a line will be drawn on the canvas.

~~~demo
> const picture = new Picture()
< undefined
> const test = picture.drawLine
< undefined
> test([{ x: 50, y: 50 }, { x: 250, y: 250 }])
< undefined
~~~

___________________________________________________

♦♦♦11♦♦♦

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    function setProp (prop) {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
! Cannot set properties of undefined (setting 'country')
~~~

•••• none
In this example, the context is lost in the function **_setProp()_**,  declared within the method **_addProperties_**
(an inner function does not inherit the call context of its parent).
••••

Let’s make a few changes to the example code: let’s turn **~setProp()~** into an arrow function:

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    const setProp = (prop) => {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

The arrow function **~setProp()~** is declared within the **~addProperties~** method, the call context of which is a reference to an instance. At the time of declaration, the arrow function receives the call context from the **~addProperties~** method, and this context cannot be changed thereafter.

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
< undefined
> user
< ► User {name: 'Piter', country: 'UA'}
~~~

___________________________________________________

## ![ico-25 icon] Inheritance⟪Inheritance⟫

### ![ico-20 icon] extends⟪extends⟫

The keyword **~extends~** is used to create a subclass.

•••• none
![ico-20 smile] The nightmare of creating a chain of prototypes is now a thing of the past. <br />You no longer need to manually perform a whole host of operations using _Object.create_ and _Object.setPrototypeOf_.<br />You no longer need to rack your brains over why a child class loses its _prototype.constructor_ property and why the parent class’s static properties aren’t inherited.
The **_extends_** keyword makes the process of creating a prototype chain declarative, safe and monolithic, transforming complex, low-level ‘manual’ assembly into a concise and straightforward construct. <br />The **_extends_** syntax hides several mandatory steps under the bonnet, which you would otherwise have to write yourself when using _Object.create_ or _Object.setPrototypeOf_.
••••

^^^[]
![ico-20 warn] ^^~Object.create~ only links the prototype of the child to that of the parent. The parent’s static methods are not automatically inherited by the child class.^^
![ico-20 warn] ^^Using ~Object.setPrototypeOf~ to change the prototype of an already created object is an extremely slow operation in JavaScript. It breaks the engine’s internal optimisations (hidden classes) for all subsequent operations on that object.^^
![ico-20 warn] ^^When overwriting the prototype via ~Object.create(Parent.prototype)~, the ~Child.prototype.constructor~ property is completely erased. Unless it is restored manually, a check on ~instance.constructor~ will incorrectly return ~Parent~.^^
^^^

♦♦♦12♦♦♦

~~~js
class Provider extends Array {
  constructor () {
    super();
    ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
      .forEach((item, index) => { this[index] = item })
  }

  valueOf () {
    return this.length
  }
}
~~~

![ico-25 warn] ^^Note that in the class constructor, the first thing we do is call the parent class’s constructor using **~super()~**.^^

^^Let’s create an instance of the **Provider** class^^

~~~js
let provider = new Provider
~~~

^^Let’s look at the prototype chain:^^

~~~console

▼ Provider(5) ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
    0: 'Google'
    1: 'Mozilla'
    2: 'Opera'
    3: 'Safari'
    4: 'IE'
    length: 5
  ▼ [[Prototype]]: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► [[Prototype]]: Array(0)
~~~

^^Now let’s test the instance:^^

~~~demo
> provider instanceof Provider
< true
> provider instanceof Array
< true

> provider + 5
< 10
> provider * 3
< 15
~~~

___________________________________________________

♦♦♦13♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.height = '400'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawCircle (center, radius) {
    this.area.beginPath()
    this.area.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    this.area.stroke()
  }
}

const newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])

console.log(newCanvas)
~~~

~~~console
▼ ExtendedCanvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
  ▼ [[Prototype]]: Canvas
    ► constructor: class ExtendedCanvas
    ► drawCircle: ƒ drawCircle(center, radius)
    ▼ [[Prototype]]: Object
      ► constructor: class
      ► drawLine: ƒ drawLine(points)
      ► [[Prototype]]: Object
~~~

••••
Обратите внимание, что метод **_drawCircle()_** находится в прототипе экземпляра
(что логично, поскольку это собственный метод дочернего класса)
а унаследованный метод **_drawLine()_** родительского класса **Canvas** находится в прототипе прототипа
(which corresponds to the prototype model of inheritance – we have obtained a chain of prototypes).
••••

___________________________________________________

### ![ico-20 icon] super⟪super⟫

Methods of the parent class are accessible in the child class via the keyword **~super~**.

^^![ico-20 speach] Let’s extend the inherited method **~drawLine()~** of the parent class by adding an argument **_~lineWidth~_** (line thickness)^^

^^![ico-20 speach] To do this, let’s define the ‘extended’ method ~drawLine()~ within the child class which will call the method ~drawLine()~ of the parent class using the keyword **~super~**:^^



~~~js
super.drawLine(points)
~~~

^^Now the code will look like this:^^

♦♦♦14♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.style.border = '1px solid #ddd'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawLine (points, lineColor, lineWidth) {
    this.area.lineWidth = lineWidth || 3
    this.area.strokeStyle = lineColor
    super.drawLine(points)
  }
}
~~~

^^![ico-20 speach] Let’s create an instance of the child class:^^

~~~js
let newCanvas = new ExtendedCanvas()
~~~

^^![ico-20 speach] and call its method **~drawLine()~**^^

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

^^![ico-20 speach] Now the line will be drawn with the specified thickness.^^

___________________________________________________

### ![ico-20 icon] super()⟪super⟫

In the previous examples, we did not use the constructor of the derived class

![ico-20 warning] When you need to add your own properties to an instance of the derived class, this cannot be done without a constructor.

![ico-20 warning] The first thing you need to do in the constructor of the derived class is to call the **~super()~** method

♦♦♦15♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  constructor () {
    super ()
    this.history = []
  }
}
~~~

Otherwise, an exception will be thrown:

~~~console
! Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

___________________________________________________


^^![ico-25 pin] Ключевое слово **~super~** работает и без классов — в обычных
объектах, через их прототип. Это отдельная тема, и она вынесена на свою
страницу:^^

[%%%super в литералах объектов%%%](page/super-in-object-literals)

## ![ico-25 icon] static⟪static⟫

Static methods of a class are declared using the **~static~** keyword.

•••• warn
![ico-25 warn] These methods can only be called as class methods
![ico-25 warn] Within a static method, **_this_** refers to the class constructor, not to an instance.
••••

♦♦♦16♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = Canvas.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: 'background: #ddd; margin-inline: 32px'
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

In this example, the static method **~createCanvas~** of the **~Canvas~** class creates a canvas and inserts it into the document body, and adds a **~resize~** event listener to it.
Once an instance has been created and the **~resize~** event listener has been attached to the global ~window~ object, the instance will respond to changes in the width of the browser window.

~~~js
const picture = new Canvas()
window.onresize = function () {
  picture.canvas.dispatchEvent(new Event('resize'))
}
~~~

Let’s refine this example a little. Let’s add a static property called **~instances~** to the **~Canvas~** class, in which all created instances will be registered, as well as a static property called **~listener~**, which will be set to ~true~ if a listener for the ~resize~ event is attached to the global ~window~ object.
Let’s also add a static method called **~setListener~** to the **~Canvas~** class, which sets a listener for the ~resize~ event on the global ~window~ object if the static property **~listener~** is set to ~false~.

♦♦♦17♦♦♦

~~~js
class Canvas {
  constructor () {
    this.constructor.instances.add(this)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static instances = new Set()
  static listener = false

  static setListener () {
    if (this.listener) {
      console.log('The listener is already enabled.')
      return
    }
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.instances
        .forEach(instance => instance.canvas.dispatchEvent(event))
    }
    this.listener = true
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

Please note that the ~resize~ event listener for the global ~window~ object, which is set using the **~setListener~** class’s static method, creates and dispatches the ~resize~ event for all registered instances of the **~Canvas~** class.
In the instance constructor, we register the instance in the class’s static property **~instances~**, and call the class’s static method **~createCanvas~**, which creates a ~canvas~ and adds a ~resize~ event listener to it.
![ico-25 warn] In the example above, there is a serious risk of memory leaks.

^^^[Memory leaks]

To ensure that objects are properly registered in the class registry, whilst allowing them to be bypassed without causing memory leaks, use **~FinalizationRegistry~** is used, together with ~Set~ and **~WeakRef~**. This allows references to objects to be automatically removed from the registry as soon as they are collected by the garbage collector.^^
^^For a Canvas instance to be collected by the garbage collector, you must:<br/>• Call the clear method (remove the element from the DOM tree);<br/>• Set all variables that reference this instance to null.^^


| [![ico-20 link] **~FinalizationRegistry~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) | [![ico-20 link] **~WeakRef~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) |

~~~js
class Canvas {
  constructor () {
    const ref = new WeakRef(this)
    Canvas.#registry.add(ref)
    Canvas.#cleaner.register(this, ref)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
    
    Canvas.setListener()
  }

  static #registry = new Set()
  static #listener = false

  static #cleaner = new FinalizationRegistry((ref) => {
    Canvas.#registry.delete(ref)
    console.log('The object has been removed from memory; the registry has been cleared!')
  })

  static setListener () {
    if (this.#listener) return // Если слушатель уже есть, ничего не делаем
    
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.#registry.forEach(ref => {
        const instance = ref.deref()
        if (instance && instance.canvas) {
          instance.canvas.dispatchEvent(event)
        }
      })
    }
    this.#listener = true
  }

  static getAliveInstances() {
    const alive = []
    for (const ref of this.#registry) {
      const obj = ref.deref()
      if (obj) alive.push(obj)
    }
    return alive
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }

  destroy () {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    this.canvas = null
    this.area = null
  }
}

const first = new Canvas()
const second = new Canvas()
~~~

^^^

___________________________________________________

♦♦♦18♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas ()
  }

  static resizeCanvas (event) {
    console.log(`name: '${this.name}'`)
  }
}

var pict = new Canvas()
window.onresize = Canvas.resizeCanvas
~~~

When the method **_~resizeCanvas()~_** is called from the constructor, it will output the following to the console:

••name: 'Canvas'••

Resize the browser window
Now the method **_~resizeCanvas()~_** will be called in the global scope,
and the following will be printed to the console:

••name: ''••

because  ~this~  inside **_~resizeCanvas()~_** now points
to the global object  (~window~)

___________________________________________________

## ![ico-25 cap] Example⟪Example⟫

In this example, we will be working with [svg](external/svg) graphics

#### ![ico-20 icon] createElementNS()⟪createElementNS⟫

![ico-20 warn] To dynamically create SVG elements, you must use the **~createElementNS()~** method
specifying a namespace reference ( **_NS_** )

This is necessary for the browser to correctly interpret and display _svg_ elements

SVG is a type of XML markup that has its own namespace, which can be embedded within HTML5

![ico-20 green-ok] The first argument of the **~createElementNS()~** method is a reference to the namespace
( ~http://www.w3.org/2000/svg~ )
![ico-20 green-ok] The second argument is the name of the element’s tag within that namespace

![ico-20 warn] If you use the standard method  ~createElement()~, the browser will interpret it within the HTML namespace
(by default)

![ico-20 warn] For SVG elements to work correctly, the browser must interpret them within the SVG namespace

^^For example, to correctly create a container for an SVG graphic:^^

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

**Let’s check in the console:**

~~~js
const svg = document.createElement('svg')
console.log(svg.namespaceURI)  // 'http://www.w3.org/1999/xhtml'

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // 'http://www.w3.org/2000/svg'
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

___________________________________________________

#### ![ico-20 icon] Base class⟪Base_class⟫

Let’s create a class **~DrawFigures~**, which will create an SVG element
with two methods: **~setSize()~** and **~drawFigure()~**

•••• none
![ico-20 speach] The **_setSize()_** method will change the dimensions of the SVG element
![ico-20 speach] The **_drawFigure()_** method will add elements to the SVG container
^^The element name will be passed as the first argument to the method (figure)^^
^^Possible values are “line”, “circle”, “path”, “rect”, etc.^^
^^The shape parameters will be passed as the second argument to the method (params)^^
••••

••••
![ico-20 speach] As each  svg  element has its own set of attributes, we create a property  **_attrs_** (an object), whose properties will be the names of the svg elements, and whose values will be an array of attributes for each svg element
When creating an SVG element, its attributes will be set using the **_setAttribute()_** method
••••

~~~js
const DrawFigures = class SVG {
  constructor (w, h) {
    this.canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(this.canvas)
    this.setSize(w, h)
    this.attrs = {
      line: ['x1', 'y1', 'x2', 'y2'],
      circle: ['cx', 'cy', 'r']
    }
  }

  setSize (w, h) {
    this.canvas.setAttribute ('width', w)
    this.canvas.setAttribute ('height', h)
  }

  drawFigure (figure, params) {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    this.canvas.appendChild(elem)
    for (const attr of this.attrs[figure]) {
      elem.setAttribute(attr, params[attr])
    }
    return elem
  }
}
~~~

You can test the class as follows:

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

•••• none
![ico-20 speach] Calling the method **_drawFigure()_** will create a &lt;line&gt; element and return a reference to it,
but this element will not be displayed on the page, as the array **_attrs.line_** lacks the _stroke_ attribute, which specifies the line colour.

••••

•••• none
![ico-20 speach] To see this element on the page, we need to set the value of the _stroke_ attribute after calling the **_drawFigure()_** method:

••••

~~~js
setAttribute('stroke', 'red')
~~~

![ico-20 speach] Now we can draw other shapes and customise their attributes:

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

[![ico-25 cap] Example](samples/18)

___________________________________________________

#### ![ico-20 icon] Subclass⟪Subclass⟫

![ico-20 speach] Now let’s create a subclass **~ColouredFigures~** which extends the functionality of the parent class **~DrawFigures~** by adding
• attributes for lines and fills (~stroke~, ~style~, ~fill~)
• the method for deleting an element **~erase~**



![ico-20 speach] In the constructor of the child class, we’ll call the method **~super()~** to create an &lt;svg&gt; container with the required dimensions

and declare the instance property  **~figures~**.

••••
![ico-20 speach] The method **_super()_** must be called first in the constructor, as the value of _this_ will not be defined.
••••


within the constructor until it is called

![ico-20 speach] Furthermore, we’ll extend the functionality of the base class **DrawFigures**,
by adding the attributes “~stroke~”, “~style~” and “~fill~”
We’ll do this in the constructor of the  **ColoredFigures** class as well

~~~js
class ColoredFigures extends DrawFigures {
  constructor () {
    super(window.innerWidth - 20, window.innerHeight - 20)
    this.figures = []
    for (const attr in this.attrs) {
      this.attrs[attr].push('stroke', 'style', 'fill')
    }
  }

  line (params, line) {
    this.draw('line', params)
  }

  circle (params, line, fill) {
    this.draw('circle', params)
  }

  draw (figure, params) {
    if (params.strokeWidth) {
      Object.assign(params, {
        style: `stroke-width: ${ params.strokeWidth }`
      })
      delete params.strokeWidth
    }
    this.figures.push(this.drawFigure(figure, params))
  }

  erase (figureIndex) {
    if (figureIndex > this.figures.length - 1 || figureIndex < 0) return
    this.figures[figureIndex].remove()
    this.figures.splice(figureIndex, 1)
  }
}
~~~

![ico-20 speach] Let’s check how the extended class  **ColoredFigures** works

~~~js
const canvas = new ColoredFigures(400, 500)

canvas.line({
  x1: 10,
  y1: 250,
  x2: 250,
  y2: 50,
  stroke: 'green',
  strokeWidth: 5
})
canvas.circle({
  cx: 150,
  cy: 150,
  r: 100,
  fill: '#ff00ff90',
  stroke: '#909',
  strokeWidth: 10
})
~~~

![ico-20 speach] Of course, we can create elements by calling the method of the base class  **~drawFigure()~**:

~~~js
canvas.drawFigure('line', {
  x1: 200,
  y1: 150,
  x2: 50,
  y2: 100,
  stroke: 'blue',
  style: 'stroke-width: 10'
})
~~~

![ico-20 speach] but then the SVG elements created will not be added to the array  **~figures~**
and they cannot be removed using the method  **~erase()~**

![ico-20 speach] Furthermore, calling the method  **~line()~**  or  **~circle()~**  is more concise

![ico-25 speach] Please note that the **ColoredFigures** class has a **prototype** property, which an instance does not have (and cannot have)
The **~prototype~** property of the **ColoredFigures** class contains the methods **~circle()~**, **~line()~**, **~draw()~** and **~erase()~**

![ico-25 speach] The **ColoredFigures** class also has a property **~__proto__~**
This is a reference to the parent class **SVG**

![ico-25 speach] As you might expect, the parent class also has a property **~prototype~**,
and this property contains the methods **~drawFigure()~** and **~setSize()~**

![ico-25 speach] Neither the **ColoredFigures** class nor the **SVG** class has the properties **~attrs~**, **~canvas~** and **~figures~**
These are only present in an instance of this class

___________________________________________________

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? Which of the following statements is true of a class expression?

+ It can be either named or anonymous, and is not subject to hoisting.
= That’s right! A class expression can be anonymous or have a name that is only accessible within the class itself. Until its own line is reached, the class is in a temporal dead zone, and attempting to access it results in a **ReferenceError**.

- It must have a unique name in the global scope.
= Incorrect. A class expression can be completely anonymous.

- It is automatically hoisted to the very top of the scope.
= Incorrect. Classes (both declarations and expressions) are in the temporal dead zone until they are initialised in the code.

- It cannot be assigned to a variable or passed as a function argument.
= Incorrect. The main feature of a Class Expression is the ability to assign it to variables and pass it anywhere as a normal value.

? What special symbol is used in modern JavaScript syntax to declare truly private properties and methods within a class?

- The keyword **private** before the property name.
= Incorrect. In JavaScript, the keyword **private** is not used at the field syntax level for encapsulation.

- An underscore **_** at the start of the name.
= Incorrect. The underscore **_** is merely a convention amongst developers, which in no way prevents external access to the property.

+ The hash symbol **#** at the start of a property or method name.
= Correct! The **#** prefix makes fields and methods truly private at the JavaScript engine level.

- A dollar sign **$** before the name.
= Incorrect. The **$** symbol has no special built-in meaning for privacy in classes (although it is sometimes used in libraries such as jQuery).

? Which of the following statements about static methods (**static**) in JavaScript classes is correct?

- Static methods are automatically copied to every new instance of the class that is created.
= Incorrect. Static methods belong to the class itself (the constructor), not to its individual instances.

+ Static methods are called on the class itself, not on its instances, and **_this_** within them refers to the class constructor.
= Correct! You call them via the class name (_Class.method()_), and the keyword **_this_** within a static method refers to the class itself.

- Static methods cannot be called unless at least one instance of the class has been created in the code.
= Incorrect. On the contrary, static methods exist independently of whether any instances have been created.

- Static methods are always private by default.
= Incorrect. By default, static methods are public unless the **#** symbol is explicitly placed before their name.

? What happens if you detach a method of a normal class from its instance and call it as a normal function (for example, `_const fn = instance.method; fn()_`)?

- **_this_** within the method will automatically remain bound to the class instance.
= Incorrect. When a method is separated from its object, it loses its reference to its original object (‘context loss’).

- A syntax error will occur as early as the script compilation stage.
= Incorrect. Syntactically, passing a method as a function is perfectly valid; the problem will only become apparent at runtime.

- **_this_** inside a method will always point to the global **window** object in all execution modes.
= Incorrect. Class bodies in JS always execute in strict mode, so when context is lost, **_this_** does not become a reference to the global object.

+ **_this_** inside a method will lose its context and, in strict mode, will become **_undefined_**.
= Correct! As classes operate in _strict mode_, when a method is called as a regular function, the value of **_this_** is lost and becomes **_undefined_**, which will result in an exception when attempting to access properties via **_this_**.

? Where in modern JS syntax is it permitted to declare public class instance fields?

+ Directly within the class body (outside methods and the constructor).
= Correct! The **Class Fields** standard allows public properties to be declared directly within the class body without using `this` or the constructor.

- Only within the _constructor_ method, with the **_this_** keyword required.
= Incorrect. Although historically this was done in this way, modern syntax allows the initialisation of fields to be moved outside the constructor.

- Exclusively in the class prototype after it has been fully declared using a dot.
= That is incorrect. A property on the _prototype_ is a single value shared by all instances, rather than a property of a specific instance, and has nothing to do with the syntax of class properties.

- Only within the special static block **_static_** {}.
= Incorrect. The static block is intended for initialising static class variables, not public instance fields.

♣♣♣♣

## ![ico-25 hw] Quest⟪Quest⟫

♠♠♠♠ Клик по кнопке должен менять надпись на ней самой, но обработчик теряет контекст. Почини его.
class CustomButton {
  constructor (label) {
    this.label = label
    this.clicks = 0
    
    this.elem = document.createElement('button')
    this.elem.textContent = this.label
    
    this.elem.addEventListener('click', this.handleClick)
    document.body.appendChild(this.elem)
  }

  handleClick () {
    this.clicks++
    this.textContent = `Clicked: ${this.clicks}`
  }
}

const btn = new CustomButton('Click me!')
???
? 2 | кнопка появилась на странице
document.querySelector('button') !== null

? 4 | клик увеличивает счётчик
document.querySelector('button').click()
btn.clicks === 1

? 4 | надпись меняется на самой кнопке
document.querySelector('button').textContent === 'Clicked: 1'

? 2 | контекст связан полем-стрелкой, а не bind
/handleClick\s*=\s*[(\w$]/.test(SOURCE) && !/\.bind\s*\(/.test(SOURCE)
♠♠♠♠

___________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
