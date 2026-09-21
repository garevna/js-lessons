# ![ico-30 study] Classes⟪Classes⟫

**ES6 (ECMAScript 2015)**

••Proxies to simplify working with the prototype inheritance model••

Since the prototype inheritance model is based on a function (constructor), the proxy object ~**class**~ is, in essence, a wrapper for this constructor function.

This wrapper makes it considerably easier to construct rather complex inheritance chains, thanks to the simpler and more convenient interface of the proxy object.

However, it should be borne in mind that this is merely a layer of 'cellophane' in which the same old constructor has been wrapped.

____________________________________________________________________

## ![ico-25 icon] Syntax⟪Syntax⟫

![ico-20 memo] The 'body' of the class is always enclosed in curly brackets ~{ }~

~~~js
class User {
  ...
}
~~~

![ico-20 memo] The constructor (**~constructor~**) is usually declared within the curly brackets

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

along with the class methods:

~~~js
class User {
  constructor (name) {
    this.name = name
  }

  getUserInfo () {
    console.log(this.name)
  }
}
~~~

••••
![ico-20 warn] Code within the class body is always executed in **_strict mode_**
^^even if you have not used the **_use strict_** directive^^
••••

![ico-20 memo] The **~constructor~** method creates and initialises an instance of the class.

•••• memo
![ico-20 memo] All instance properties must be declared in the constructor **_constructor()_**.
![ico-20 memo] Properties and methods created in the class constructor
can be **private** and **public** ^^(just as in a normal constructor)^^
••••

•••• none
![ico-20 memo]In a normal constructor, the call context for private methods will be the global object **_window_**
![ico-20 warn] In a class constructor, the call context for private methods will be **_undefined_**
••••
____________________________________

♦♦♦1♦♦♦

~~~js
class User {
  constructor (name) {
    const privateVar = prompt('Set privateVar value:')

    function showPrivate () {
      console.log(`Oh dear, my call context is ${this}`)
      console.log(`But I can see the private variable: ${privateVar}`)
    }
    this.name = name || 'Hippopotamus'
    this.show = function () {
      showPrivate ()
    }
  }
}

const user = new User('Crocodile')
user.show()
~~~

{{{Classes-1-class.js}}}

Let’s print an instance of the **User** class to the console:

~~~js
console.log(user)
~~~

~~~console
▼ User {name: 'Crocodile', show: ƒ}
    name: "Crocodile"
  ► show: ƒ ()
  ▼ [[Prototype]]: Object
    ► constructor: class User
    ► [[Prototype]]: Object
~~~

To dispel any misconceptions about "classes" in JS, let’s create a similar instance using a standard constructor:

~~~js

function User (name) {
  const privateVar = prompt('Set privateVar value:')
  function showPrivate () {
    console.log(`Oh dear, my call context is ${this}`)
    console.log(`But I can see the private variable: ${privateVar}`)
  }
  this.name = name || 'Hippopotamus'
  this.show = function () {
    showPrivate ()
  }
}

const user = new User('Crocodile')
user.show()
~~~

{{{Classes-1-function.js}}}

Let’s print an instance of **user**, created using the constructor, to the console and see how it differs from an instance of the class: ![ico-20 smile]

~~~js
console.log(user)
~~~

~~~console
▼ User {name: 'Crocodile', show: ƒ}
    name: "Crocodile"
  ► show: ƒ ()
  ▼ [[Prototype]]: Object
    ► constructor: ƒ User(name)
    ► [[Prototype]]: Object
~~~

_______________________________________________

## ![ico-25 icon] class declaration⟪class_declaration⟫

![ico-20 error] **hoisting**

^^A class must be declared before it is first accessed^^

Classes are special ‘wrapper’ functions that ‘wrap’ the constructor

♦♦♦2♦♦♦

~~~js
class Picture {
  constructor (url, width) {
    this.elem = document.createElement('img')
    this.elem.src = url
    this.elem.width = width
  }
}

const x = new Picture('images/hong-kong-1990268__340.jpg', 200)
document.body.appendChild(x.elem)
~~~

{{{Classes-2.js}}}

•••• none
![ico-20 warn] A declared class cannot be deleted dynamically without reloading the page.
![ico-20 warn] A class identifier cannot be overridden (i.e. you cannot declare a variable with the same name).
![ico-20 warn] Whilst a standard JS constructor can be called both as a function and as a constructor (using the keyword **_new_**), then a class constructor cannot be called without the keyword **_new_** – an exception **_TypeError_** will be thrown

••••

~~~js
const x = Picture('images/hong-kong-1990268__340.jpg', 200)
~~~

~~~console
<p class="error-message">Uncaught TypeError&colon; Class constructor Picture cannot be invoked without 'new'</p>
~~~

~~~js
typeof Picture  // "function"
~~~

__________________________________________________

## ![ico-25 icon] class expression⟪class_expression⟫

**A class expression can be named or anonymous**

### ![ico-20 icon] Examples of named classes⟪Examples_of_named_classes⟫

♦♦♦3♦♦♦

~~~js
const Picture = class {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

~~~console
▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()
~~~

However, if we create an instance of this class and view it in the console, we will see that the class name is missing

~~~js
let sample = new Picture

console.log(sample)
~~~

~~~console
▼ Picture {elem: img}
    elem: img
  ▼ [[Prototype]]:
      ► constructor: class 
      ► [[Prototype]]: Object
~~~

_____________________________________________________________

♦♦♦4♦♦♦

~~~js
const Picture = class Canvas {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

~~~console
▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()
~~~

Now let’s create an instance of this class and print it to the console:

~~~js
const sample = new Picture

console.log(sample)
~~~

~~~console
▼ Canvas {elem: img}
    elem: img
  ▼ [[Prototype]]:
      ► constructor: class Canvas
      ► [[Prototype]]: Object
~~~

~~~js
sample instanceof Picture   // true
~~~

~~~js
sample instanceof Canvas
~~~

~~~console
<p class="error-message">Uncaught ReferenceError&colon; Canvas is not defined</p>
~~~

So, when using a class expression, the class name becomes inaccessible from outside

To be more precise, the only way to access it is as follows:

~~~js
sample.constructor.name
~~~

________________________________________________________________

♦♦♦5♦♦♦

~~~js
const Sample = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
    this.canvas.style.border = '1px solid #000000'
    this.canvas.style.background = '#ffffff'
    this.area = this.canvas.getContext('2d')
  }

  resizeCanvas (event) {
    this.canvas.width = window.innerWidth - 64
    this.canvas.height = window.innerHeight - 64
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const pict = new Sample ()
window.onresize = pict.resizeCanvas.bind(pict)

pict.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
pict.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

{{{Classes-5.js}}}

![ico-20 pin] To retrieve the class name, use its **name** property:

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________

## ![ico-25 icon] get & set⟪get_&_set⟫

To create computed properties, you need to use getters and setters
![ico-20 memo] Using the keyword  **~get~**, you can declare a getter that returns the value of a computed property
![ico-20 memo] Using the keyword **~set~**, you can declare a setter that changes the value of a property

•••• none
^^![ico-20 warn] Properties declared in the constructor will be instance properties^^
^^The getter will be called every time the instance’s property is accessed^^
^^The setter will be called whenever the identifier of the computed property appears on the left-hand side of an assignment statement^^
••••

Let’s look at a simplified example using canvas:

♦♦♦6♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

^^![ico-20 speach] Let’s add a setter for the property  **~history~**^^

^^Note that there is no constructor for this property (nor should there be)^^

~~~js
set history (newHistory) {
  if (!this.canvas.history) this.canvas.history = []
  if (!Array.isArray(newHistory)) {
    console.error('History must be array')
    return
  }
  const __history = newHistory
    .filter(x => x.points && Array.isArray(x.points))
    if (!__history.length) {
      console.error('History must contain points array')
      return
    }

    this.canvas.history = __history
}
~~~

^^This method modifies the contents of the array **canvas._history_** if such a property already exists,^^
^^or creates it otherwise^^

^^![ico-20 speach] Now let’s add a getter for the property  ~history~:^^

~~~js
get history () {
  return this.canvas.history
}
~~~

^^![ico-20 speach] This method returns the array  **canvas._history_**^^

^^![ico-25 paper] The complete code for the example will now look like this:^^

~~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }

  get history () {
    return this.canvas.history
  }

  set history (newHistory) {
    if (!this.canvas.history) this.canvas.history = []
    if (!Array.isArray(newHistory)) {
      console.error('History must be array')
      return
    }
    const __history = newHistory
      .filter(x => x.path && Array.isArray(x.path))
    if (!__history.length) {
      console.error('History must contain path array')
      return
    }
    this.canvas.history = __history
  }
}

let pict = new Canvas()
~~~~

^^![ico-20 speach] Let’s create the property  **_history_**  of the  **pict** instance by passing an array of values:^^

~~~js
pict.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  "***",
  { val: "***" }
]
~~~

~~~console
▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
  ► canvas: canvas
  ▼ history: Array(2)
    ► 0: {path: Array(2), lineColor: "red"}
    ► 1: {path: Array(2), lineColor: "green"}
      length: 2
    ► [[Prototype]]: Array(0)
  ► [[Prototype]]: Object
~~~

^^Only the first two elements made it into the array  **canvas._history_** ^^
^^from the array on the right-hand side of the assignment operator, ^^
^^i.e. the setter was triggered, which filtered the input array^^

^^![ico-20 speach] Let’s try to perform the assignment by passing incorrect values:^^

~~~js
pict.history = ['***']
~~~

**Result – an exception:**

~~~console
<p class="error-message">History must contain path array</p>
~~~

~~~js
pict.history = true
~~~

**Result – an exception:**

~~~console
<p class="error-message">History must be array</p>
~~~

^^![ico-20 speach] The value of the **_history_** property has not changed, ^^
^^and the corresponding error messages were displayed in the console^^

________________________________________________________

## ![ico-25 icon] Loss of context⟪Loss_of_context⟫

![ico-20 pin] In strict mode, implicit call context passing does not occur

![ico-20 warn] Context loss always occurs if a reference to a method is assigned to a new variable:

♦♦♦7♦♦♦

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

An exception will be thrown:

~~~console
<p class="error-message">Uncaught TypeError&colon; Cannot read property 'area' of undefined</p>
~~~

The call context must be passed explicitly:

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

![ico-20 pin] ^^Context loss (~undefined~) occurs because all code within the class body is executed in  **~strict mode~**, even though there is no explicit 'use strict'  directive in the class code.^^
^^In the absence of an explicit reference to the object calling the method:^^
•••• none
in strict mode, _this_ will not be a reference to the global object _window_.
In strict mode, _this_ will be _undefined_
••••

______________________________________________________

♦♦♦8♦♦♦

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    function getProp (prop) {
      this[prop.name] = prop.value
    }

    for (const prop of props) {
      getProp(prop)
    }
  }
}
~~~

•••• none
In this example, the context is lost in the function **_getProp()_**,  declared within the method **_addSomeInfo_**
(an inner function does not inherit the call context of its parent)
••••
^^Let’s create an instance **user** of the **User** class and call the method **~addSomeInfo~** within the context of the **user** object^^

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

~~~console
<p class="error-message">Uncaught TypeError&colon; Cannot set property 'age' of undefined</p>
~~~

^^![ico-20 yes] Inside the **~getProp~** function, the call context (**~this~**) turned out to be ~undefined~^^

^^Now let’s use the arrow function **~getProp~**, which does not lose context ![ico-20 smile]^^

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    props.forEach(prop => prop && prop.name && Object.assign(this, { [prop.name]: prop.value }))
  }
}
~~~

^^Let’s create an instance of **user** and call the **~addSomeInfo~** method^^

~~~js
const user = new User('Grig')

user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: hobby, value: ['football', 'fishing'] },
  {},
  54,
  null
])
console.log(user)
~~~

~~~console
▼ User {name: "Grig", age: 25, hobby: Array(2)}
    age: 25
  ► hobby: (2) ["football", "fishing"]
    name: "Grig"
  ▼ [[Prototype]]:
      ► addSomeInfo: addSomeInfo ( props ) { if ( !Array.isArray ( props ) ) return var getProp = prop => {…}
      ► constructor: class User
      ► [[Prototype]]: Object
~~~

________________________________________________________

## ![ico-25 icon] Inheritance⟪Inheritance⟫

### ![ico-20 icon] extends⟪extends⟫

The keyword **~extends~** is used to create a subclass
In fact, we are passing a reference to the prototype using **~extends~**

^^Let’s declare the **Provider** class^^

♦♦♦9♦♦♦

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

^^Note that in the class constructor, the first thing we do is call the parent class’s constructor using **~super()~**^^

^^Let’s create an instance of the **Provider** class^^

~~~js
let provider = new Provider
~~~

^^Let’s look at the prototype chain ^^

~~~console

▼ Provider(5) ["Google", "Mozilla", "Opera", "Safari", "IE"]
    0: "Google"
    1: "Mozilla"
    2: "Opera"
    3: "Safari"
    4: "IE"
    length: 5
  ▼ [[Prototype]]: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► [[Prototype]]: Array(0)
~~~

^^Now let’s test the instance:^^

~~~js
provider instanceof Provider  // true
provider instanceof Array     // true

provider + 5   // 10
provider * 3   // 15
~~~

______________________________

♦♦♦10♦♦♦

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

let newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])
~~~

••••
Note that the method **_drawCircle()_** is in the instance prototype
(which makes sense, as it is an inherited method)
and method **_drawLine()_** of the parent class **Canvas** is located in the prototype’s prototype
(which corresponds to the prototype model of inheritance – we have obtained a chain of prototypes)
••••

________________________________________________________

### ![ico-20 icon] super⟪super⟫

Methods of the parent class are accessible in the child class via the keyword **~super~**

^^![ico-20 speach] Let’s extend the inherited method **~drawLine()~** of the parent class by adding an argument **_~lineWidth~_** (line thickness)^^

^^![ico-20 speach] To do this, let’s define the ‘extended’ method  ~drawLine()~ within the child class,^^
^^which will call  the method  ~drawLine()~ of the parent class^^
^^using the keyword **super**:^^

~~~js
super.drawLine(points, lineColor)
~~~

^^Now the code will look like this:^^

♦♦♦11♦♦♦

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

^^![ico-20 speach] Now the line will be drawn with the specified thickness^^

____________________________________________

### ![ico-20 icon] super()⟪super⟫

In the previous examples, we did not use the constructor of the derived class

![ico-20 warning] When you need to add your own properties to an instance of the derived class, this cannot be done without a constructor

![ico-20 warning] The first thing you need to do in the constructor of the derived class is to call the **~super()~** method

♦♦♦12♦♦♦

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
<p class="error-message">Uncaught ReferenceError&colon; Must call super constructor in derived class before accessing 'this' or returning from derived constructor</p>
~~~

_________________________________________________________

### ![ico-20 icon] super in object literals⟪super_in_object_literals⟫

The keyword **~super~** can be used without declaring classes
**~super~** is a reference to the object’s prototype
Therefore, it can be used to access the properties and methods of the prototype object

•••• none
![ico-30 speach] _In the examples that follow, we will use objects declared in literal form_
The **human** object will serve as the prototype for the **person** object
••••

^^We will assign the **human** object as the prototype of the **person** object using a method^^

~~~js
Object.setPrototypeOf(person, human)
~~~

^^Following this assignment, within the **person** object, the properties and methods of the **human** object will be accessible using the keyword **~super~**^^

••••
![ico-20 speach] In the following example
we will call the methods **_place()_** and **_say()_** of the **human** prototype
in the methods **_getPlace()_**  and  **_talk()_** of the  **person** object
using the keyword **super**
••••

♦♦♦13♦♦♦

~~~js
const human = {
  place () {
    return Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  },
  say (text) {
    this.place.innerHTML = text
  }
}

const person = {
  getPlace () { this.place = super.place () },
  talk (text) {
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.getPlace()
person.talk('привет!')
~~~

__________________________________________________

♦♦♦14♦♦♦

~~~js
const human = {
  place: () =>
    document.getElementById('demo')
      ? document.getElementById('demo')
      : document.body.appendChild(document.createElement('p')).id = 'demo',

    say (text) {
      this.place.innerHTML = text
    }
}

let person = {
  getPlace () {
    this.place = super.place()
  },
  talk (text) {
    this.getPlace()
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)

person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

••••
In this example
the method **_place()_** of the prototype (of the object **human**) checks for the existence of an element with id === 'demo'
and if such an element is found, it returns a reference to it
otherwise, it creates such an element and adds it to the page
••••

••••
The **person** object does not initially have the  **_place_** property
but has its own method **_getPlace()_**, which creates such a property
by calling the method **_place()_** of the prototype (the **human** object) using the keyword **super**
and assigning the value returned by this method to its own property **_place_**
••••

••••
The method **_talk(text)_** of the object **person** calls the method **_getPlace()_**
before calling the method **_say()_** of the prototype (of the object **human**)
••••

••••
Note that when declaring the method **_place()_** of the object **human** we used an arrow function,
whereas when declaring the method **_say()_** it cannot be used
because within methods declared using arrow functions
the call context will be the global object.
••••

______________________________________________________

♦♦♦15♦♦♦

~~~js
const human = {
  place: (() => {
    const elem = document.getElementById('demo')
    return elem || Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  })(),

  say (text) {
    this.place.innerHTML = text
  }
}

let person = {
  talk ( text ) {
    this.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

^^In this example, the **_place_** property of the prototype (of the **human** object) ^^
^^is no longer a method^^
^^Its value (a reference to an element) ^^
^^will be set when the **human** object is initialised^^

^^This example demonstrates the interchangeability of the keywords **~super~** and **~this~** ^^
^^when  referencing prototype properties^^

![ico-20 speach] ^^The method   **_talk()_**  of the  **person** object ^^
^^calls the  method  **_say()_**  of the prototype^^
^^without the keyword  **~super~**^^
^^(with the keyword  **~this~**)^^

![ico-20 speach] ^^When the method  **_say()_**  is not found in the  **person**  object, ^^
^^the search will continue in the prototype, ^^
^^where it will be successfully found^^

![ico-20 speach] ^^Inside the method   **_say ()_**, called from the method **_talk ()_**, ^^
^^the call context will be the object  **person**^^
^^(i.e.  **~this~**  will  point to the  person object)^^
^^nevertheless, the reference   **~this._place_~**  ^^
^^will be successfully resolved via the prototype chain^^

![ico-20 speach] ^^If, however, the property names of the object and its prototype match, ^^
^^and you need to retrieve the prototype’s property specifically, ^^
^^rather than the object’s own property, ^^
^^then for inherited properties you can use  ~__proto__~^^

~~~js
const person = {
  say (text) {
    console.log(text)
  },
  talk (text) {
    this.__proto__.say(text)
  }
}
~~~

![ico-20 speach] ^^Clearly, in this case, the code:

~~~js
super.say(text)
~~~

is shorter than

~~~js
this.__proto__.say(text)
~~~

and the result is identical ![ico-20 smile]

______________________________________________________________

♦♦♦16♦♦♦

~~~~js
const human = {
  id: '',
  get place () {
    if (this.id) return document.getElementById(this.id)
  },
  set place (newId) {
    this.id = newId
    document.getElementById(this.id) ||
      Object.assign(document.body.appendChild(document.createElement('p')), {
        id: this.id
      })
    },
    get message () {
      return this.place.innerText
    },
    set message (val) {
      this.place.innerText = val
    }
}

const person = {
  talk (text) {
    super.message = text
  },
  get place () {
    return super.place
  },
  set place (newId) {
    super.place = newId
  }
}

Object.setPrototypeOf(person, human)
person.place = 'demo-1'
person.talk('привет!')
person.place = 'demo-2'
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~~

![ico-20 speach] ^^In this example, we use getters and setters for object properties^^
^^For computed properties, this is the most correct way to access their values^^

________________________________________________________

## ![ico-25 icon] static⟪static⟫

Static methods of a class are declared using the **static** keyword

![ico-20 warn] These methods can only be called as class methods

![ico-20 warn] Within a static method, ~this~ refers to the class constructor, not to an instance

♦♦♦17♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas.call(this.canvas)
    this.canvas.style.border = "1px solid #000000"
    this.area = this.canvas.getContext ( "2d" )
  }

  static resizeCanvas (event) {
    this.width = window.innerWidth - 30
    this.height = window.innerHeight - 20
  }

  static drawLine (context, points) {
    context.area.moveTo(points[0].x, points[0].y)
    context.area.lineTo(points[1].x, points[1].y)
    context.area.stroke()
  }
}

let pict = new Canvas()
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
Canvas.drawLine(pict, [{ x: 50, y: 50 }, { x: 250, y: 250 }])
Canvas.drawLine(pict, [{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

![ico-20 pin] Note that the static methods **_~resizeCanvas~_** and **_~drawLine~_**
are called as methods of the **Canvas** class:

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

![ico-20 pin] Inside the constructor,  ~this~  refers to an instance

In this example, in order for ~this~ to refer to the **canvas** object of the instance within the method,
the call to the method **_resizeCanvas_** from the constructor is made with context passing:

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

and when this method is used as the event handler **_~resize~_** for the object **~window~**,
an explicit context binding is performed:

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

When the static method **_~drawLine~_** is called, the call context is passed to it as the first argument

![ico-20 pin] Note:

^^In this case, declaring the method  **~drawLine~**  as static^^
^^creates unnecessary complications with context passing, ^^
^^and it is much simpler to declare it as follows:^^

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

^^so that the call context is an instance created by the constructor^^

________________________________________________________

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

••name: "Canvas"••

Resize the browser window
Now the method **_~resizeCanvas()~_** will be called in the global scope,
and the following will be printed to the console:

••name: ""••

because  ~this~  inside **_~resizeCanvas()~_** now points
to the global object  (~window~)

____________________________________________________________________

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
console.log(svg.namespaceURI)  // "http://www.w3.org/1999/xhtml"

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // "http://www.w3.org/2000/svg"
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

_______________________________________

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

_____________________________________________________

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

________________________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
