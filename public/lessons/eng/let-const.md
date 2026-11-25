# ![ico-30 study] let | const⟪let___const⟫

**ES6 (2015)**

________________________

## ![ico-25 icon] let⟪let⟫

### ![ico-25 icon] Functional and block scope⟪Functional_and_block_scope⟫

The scope of variables declared using the **_~var~_** directive can only be restricted by ‘wrapping’ them within a function

![ico-25 pin] Block scope is the restriction of scope within curly brackets

◘◘![ico-25 cap] **1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

As a result, the garbage collector frees up memory by removing unnecessary variables upon exiting the block scope

![ico-25 pin] The consequence of block scope for variables declared using the **_~let~_** directive is that the value of the loop variable is reset on each iteration of the _for_ block:

◘◘![ico-25 cap] **2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

___

![ico-20 warn] Note that the absence of explicit curly brackets does not alter the behaviour of variables declared using the **_~let~_** directive

◘◘![ico-25 cap] **var**◘◘

~~~js
const funcs = []

for (var item of ['alpha', 'sigma', 'omega']) {
  funcs.push(function () {
    console.log(item)
  })
}
funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~

~~~console
omega
omega
omega
~~~

◘◘![ico-25 cap] **let**◘◘

~~~js
const funcs = []

for (const item of ['alpha', 'sigma', 'omega']) {
  funcs.push(function () {
    console.log(item)
  })
}

funcs[0]()  // alpha
funcs[1]()  // sigma
funcs[2]()  // omega
~~~

~~~console
alpha
sigma
omega
~~~

___

### ![ico-25 icon] Hoisting and the ‘temporary dead zone’⟪Hoisting_and_the_‘temporary_dead_zone’⟫

**Hoisting** means that variables are ‘hoisted’ from their point of declaration in the code to the top of their scope

**Hoisting** applies equally to variables declared using the **_~let~_** directive as it does to those declared using **_~var~_**

![ico-20 warn] However, variables declared using **_~let~_** will remain inaccessible until execution reaches the point where the variable is actually declared

This is how a **_temporary dead zone_** arises

Therefore, as a result of executing the code:

◘◘![ico-25 cap] **3**◘◘

~~~js
{
  console.log(x)
  // [temporary dead zone]
  let x = 10
}
~~~

an exception will be thrown

~~~console
! ReferenceError: Cannot access 'x' before initialization
~~~

___

![ico-25 pin] It is not possible to re-declare a variable with the same identifier within the same scope:

◘◘![ico-25 cap] **4**◘◘

~~~js
function sample () {
  let figure = {
    name: 'Radius',
    size: 50
  }

  console.log(figure)

  let figure = 10
  console.log(figure)
}
sample ()
~~~

an exception will be thrown

~~~console
! Uncaught SyntaxError: Identifier 'figure' has already been declared.
~~~

It will run in the loop because the block {...} is clearly present

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

![ico-25 pin] ~let~ does not create properties in the global object

◘◘![ico-25 cap] **5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

___

## ![ico-25 icon] const⟪const⟫

![ico-20 pin] Block scope (as with ~let~)
![ico-20 pin] Duplicate declarations are not permitted (as with ~let~)
![ico-20 pin] Generally, everything is the same as with ~let~, except:
![ico-20 warn] The value cannot be changed

◘◘![ico-25 cap] **6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

an exception will be thrown

~~~console
! Uncaught TypeError: Assignment to constant variable.
~~~

![ico-20 warn] You must initialise the value when declaring it

◘◘![ico-25 cap] **7**◘◘

~~~js
const XXX
~~~

an exception will be thrown

~~~console
! Uncaught SyntaxError: Missing initializer in const declaration.
~~~

If a constant is an object, the values of its properties can be changed:

◘◘![ico-25 cap] **8**◘◘

~~~js
const user = {
  login: 'admin',
  role: 'admin',
  status: 'active',
  rights: ['read', 'write', 'delete']
}

user.login = 'student'
user.role = 'user'
user.rights = ['read']
~~~

The same applies to arrays:

◘◘![ico-25 cap] **9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

___

### ![ico-25 hw] Tests⟪Tests⟫

~~~js
let getPrivate, setPrivate
{
  let privateVar
  setPrivate = function (newValue) {
    privateVar = newValue
  }
  getPrivate = function () {
    return privateVar
  }
}

setPrivate('exist')
~~~

~~~tests
→→→ getPrivate() | 'exist', ReferenceError, undefined | exist →→→
→→→ console.log(privateVar)  | 'exist', ReferenceError, undefined | ReferenceError →→→
~~~

___

~~~js
let Sample

{
  let privateScope = {}
  Sample = function () {
    privateScope.name = ''Hidden properties''
  }
  Sample.prototype.addHiddenProperty = function (newPropName, newPropValue) {
    privateScope[newPropName] = newPropValue
  }
  Sample.prototype.getHiddenProperties = function () {
    return privateScope
  }             
  Sample.prototype.getHiddenProperty = function (prop) {
    return privateScope[prop]
  }
}

var sample = new Sample()
~~~

~~~tests
→→→ sample.getHiddenProperties()     | Array, Object, String, 'Hidden properties', ReferenceError, undefined | Object →→→
→→→ sample.getHiddenProperty()       | Array, Object, String, 'Hidden properties', ReferenceError, undefined | undefined →→→
→→→ sample.getHiddenProperty('name') | Array, Object, String, "''Hidden properties''", ReferenceError, undefined | ''Hidden properties'' →→→
~~~

___

~~~js
switch (figure) {
  case 'circle':
    let elem = createElement('div')
    break
  case 'picture':
    let elem = createElement('img')
    break
  default:
    let elem = undefined
    break
}
~~~

→→→ What will happen when the code is executed? | The value of elem will be a reference to a DOM element, The value of elem will be undefined, ReferenceError, SyntaxError | SyntaxError →→→

___

~~~js
function test (varName) {
  {
    var x = 55
    let y = 17
  }
  if (varName === 'x') {
    console.log(x)
  } else if (varName === 'y') {
    console.log(y)
  } else {
    console.error('Invalid variable name.')
  }
}
~~~

~~~tests
→→→ test('x') | 55, 17, ReferenceError, SyntaxError, '"Invalid variable name."' | 55 →→→
→→→ test('y') | 55, 17, ReferenceError, SyntaxError, '"Invalid variable name."' | ReferenceError →→→
~~~

___

~~~js
function test (varName) {
  console.log(varName === 'x' ? x : varName === 'y' ? y : 'Invalid variable name.')
  var x = 55
  let y = 17
}
~~~

~~~tests
→→→ test('x') | 55, 17, ReferenceError, SyntaxError, undefined | undefined →→→
→→→ test('y') | 55, 17, ReferenceError, SyntaxError, undefined | ReferenceError →→→
~~~

___

~~~js
let s = 0
for (let x of [1, 2, 3]) {
  s += x++
}
~~~

→→→ console.log(x) | 3, 4, ReferenceError, SyntaxError, undefined | ReferenceError →→→

___

♣♣♣♣
? A loop over three strings pushes three functions into an array, each printing **item**. With **var** all three print **omega**; with **let** they print **alpha**, **sigma**, **omega**. Why?

- **let** copies the value into each function, while **var** passes it by reference.
= Incorrect. Neither keyword copies anything into the function: a function remembers the variable, not the value. The difference is in how many variables there are.

+ With **let** each iteration gets a variable of its own; with **var** there is one for the whole loop.
= That’s right! This follows from block scope: the loop body is a fresh scope on every pass, and each function closes over its own variable. With **var** there is a single variable, all three functions close over it, and by the time they are called it holds the last value.

- **setTimeout** and **push** treat **var** and **let** differently.
= Incorrect. Neither **push** nor **setTimeout** knows anything about declaration keywords — the difference arises earlier, when the variable is created.

- With **var** the functions are called before the loop ends, with **let** afterwards.
= Incorrect. They are called the same way in both cases — after the loop. What differs is which variable each of them remembers.

? Which of these is allowed with **const user = { login: 'admin' }**?

- Everything is allowed: **const** is only a hint to whoever reads the code.
= Incorrect. It is not a hint but a prohibition: assigning to a constant throws a **TypeError**, in ordinary code and in strict mode alike.

- Nothing: an object declared with **const** cannot be changed at all.
= Incorrect. **const** forbids changing the variable, not the object it points to. Freezing the object itself is **Object.freeze()**, a different job.

+ **user.login = 'student'** is allowed, **user = {}** is not.
= That’s right! A constant is a reference that cannot be reassigned. What lies behind that reference changes freely: an object’s properties, an array’s elements. Assigning to the constant itself gives **TypeError: Assignment to constant variable**.

- **user = {}** is allowed, **user.login = 'student'** is not.
= Incorrect, it is the other way round: assigning to the constant is what is forbidden, while the properties change freely.

? How does **let** differ from **var** when it comes to hoisting?

- There is no difference: both are **undefined** before the declaration.
= Incorrect. **undefined** before the declaration is what **var** does. Touching a **let** before its line is an exception, not a value.

- **let** is hoisted inside functions only, not inside blocks.
= Incorrect. It is hoisted to the top of its own scope, and for **let** that scope is precisely the block.

- Variables declared with **let** are not hoisted at all, so before the declaration they do not exist.
= Incorrect — and the difference is subtle but visible. If the variable did not exist, touching it would give **ReferenceError: x is not defined**. It gives **Cannot access 'x' before initialization** instead, so the engine does know about it.

+ Both are hoisted, but a **let** variable is unavailable until its declaration line — the temporal dead zone.
= That’s right! The variable is hoisted but not initialised, and until its own line it may not be touched: **ReferenceError: Cannot access 'x' before initialization**. A **var** in the same place would be **undefined** — quietly, and therefore more dangerously.

? At the top level of a script: **var x = 25; let z = 15**. What are **window.x** and **window.z**?

+ **25** and **undefined**
= That’s right! At the top level **var** puts the variable on the global object; **let** does not: it lives in the script’s own scope, not in **window**. **z** itself is perfectly reachable by name all the same.

- **undefined** and **15**
= Incorrect, the other way round: it is **var** that lands on the global object.

- Both **undefined**
= Incorrect. **var** does create the property — which is exactly what it is blamed for: that is how everything ends up on the global object.

- **25** and **15**
= Incorrect. Only **var** creates a property on the global object; **let** does not.

? What happens with **const XXX** and no value assigned?

- Nothing: a declaration without a value is fine.
= Incorrect. That is fine for **var** and **let** — they can be assigned later. A constant cannot, so declaring one without a value is pointless.

- The constant will hold **undefined**.
= Incorrect. **undefined** would be a value — and a constant cannot be assigned to afterwards, so such a constant would be of no use at all. The language does not allow it to be declared.

+ A **SyntaxError**
= That’s right! **Missing initializer in const declaration** — and it is a parse error, so the whole script fails to run, not just this line.

- A **TypeError** on first use
= Incorrect. A **TypeError** comes from assigning to a constant already declared. Here execution never starts at all.

? Why does **for (const item of ['alpha', 'sigma', 'omega'])** work, when **item** is different on every pass?

- **for...of** does not assign, it passes the value into the block.
= Incorrect. There is an assignment, or **item** would hold nothing. What matters is that each one goes to a new variable — its first and only.

- The array of strings is immutable, so **const** is not broken.
= Incorrect. **const** is not about what is in the variable at all, but about whether another value may be assigned to it. The array has nothing to do with it.

- In a loop **const** behaves like **let** — an exception to the rule.
= Incorrect. There is no exception: the rule holds in full — each constant simply lives for one pass.

+ Each iteration creates a new constant, and none of them is ever reassigned.
= That’s right! It is the same block scope as **let** has: the loop body is its own scope on every pass, and **item** is declared anew in it. But **for (const i = 0; i < 3; i++)** will not work: there the variable is one and it is being increased.

♣♣♣♣
