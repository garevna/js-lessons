# ![ico-30 study] let | const⟪let___const⟫

**ES6 (2015)**

________________________

## ![ico-25 icon] let⟪let⟫

### ![ico-25 icon] Functional and block scope⟪Functional_and_block_scope⟫

The scope of variables declared using the **_var_** directive can only be restricted by ‘wrapping’ them within a function

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

![ico-25 pin] The consequence of block scope for variables declared using the **_let_** directive is that the value of the loop variable is reset on each iteration of the _for_ block:

◘◘![ico-25 cap] **2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

___

![ico-20 warn] Note that the absence of explicit curly brackets does not alter the behaviour of variables declared using the **_let_** directive

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

**Hoisting** applies equally to variables declared using the **_let_** directive as it does to those declared using **_var_**

![ico-20 warn] However, variables declared using **_let_** will remain inaccessible until execution reaches the point where the variable is actually declared

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
<p class="error-message">ReferenceError&colon; Cannot access 'x' before initialization</p>
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
<p class="error-message">Uncaught SyntaxError&colon; Identifier 'figure' has already been declared.</p>
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
<p class="error-message">Uncaught TypeError&colon; Assignment to constant variable.</p>
~~~

![ico-20 warn] You must initialise the value when declaring it

◘◘![ico-25 cap] **7**◘◘

~~~js
const XXX
~~~

an exception will be thrown

~~~console
<p class="error-message">Uncaught SyntaxError&colon; Missing initializer in const declaration.</p>
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
