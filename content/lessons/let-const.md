# ![ico-30 study] let | const

**ES6 (2015)**

________________________

## ![ico-25 icon] let

### ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}

◘◘![ico-25 cap] **1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

{{p4}}

{{p5}}

◘◘![ico-25 cap] **2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

___

{{p6}}

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

### ![ico-25 icon] {{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}

{{p12}}

◘◘![ico-25 cap] **3**◘◘

~~~js
{
  console.log(x)
  // [{{p23}}]
  let x = 10
}
~~~

{{common.exception}}

~~~console
! ReferenceError: Cannot access 'x' before initialization
~~~

___

{{p13}}

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

{{common.exception}}

~~~console
! Uncaught SyntaxError: Identifier 'figure' has already been declared.
~~~

{{p14}}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

{{p15}}

◘◘![ico-25 cap] **5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

___

## ![ico-25 icon] const

{{p16}}
{{p17}}
{{p18}}
{{p19}}

◘◘![ico-25 cap] **6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

{{common.exception}}

~~~console
! Uncaught TypeError: Assignment to constant variable.
~~~

{{p20}}

◘◘![ico-25 cap] **7**◘◘

~~~js
const XXX
~~~

{{common.exception}}

~~~console
! Uncaught SyntaxError: Missing initializer in const declaration.
~~~

{{p21}}

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

{{p22}}

◘◘![ico-25 cap] **9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

___

### ![ico-25 hw] {{common.tests}}

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
    privateScope.name = '{{p28}}'
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
→→→ sample.getHiddenProperties()     | {{p25}}, {{p26}}, {{p27}}, {{p28}}, ReferenceError, undefined | {{p26}} →→→
→→→ sample.getHiddenProperty()       | {{p25}}, {{p26}}, {{p27}}, {{p28}}, ReferenceError, undefined | undefined →→→
→→→ sample.getHiddenProperty('name') | {{p25}}, {{p26}}, {{p27}}, "'{{p28}}'", ReferenceError, undefined | '{{p28}}' →→→
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

→→→ {{p29}} | {{p30}}, {{p31}}, ReferenceError, SyntaxError | SyntaxError →→→

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

## ![ico-25 hw] {{common.tests}}

♣♣♣♣
? {{test01Question}}

- {{test01Variant1}}
= {{test01Variant1Answer}}

+ {{test01Variant2}}
= {{test01Variant2Answer}}

- {{test01Variant3}}
= {{test01Variant3Answer}}

- {{test01Variant4}}
= {{test01Variant4Answer}}

? {{test02Question}}

- {{test02Variant1}}
= {{test02Variant1Answer}}

- {{test02Variant2}}
= {{test02Variant2Answer}}

+ {{test02Variant3}}
= {{test02Variant3Answer}}

- {{test02Variant4}}
= {{test02Variant4Answer}}

? {{test03Question}}

- {{test03Variant1}}
= {{test03Variant1Answer}}

- {{test03Variant2}}
= {{test03Variant2Answer}}

- {{test03Variant3}}
= {{test03Variant3Answer}}

+ {{test03Variant4}}
= {{test03Variant4Answer}}

? {{test04Question}}

+ {{test04Variant1}}
= {{test04Variant1Answer}}

- {{test04Variant2}}
= {{test04Variant2Answer}}

- {{test04Variant3}}
= {{test04Variant3Answer}}

- {{test04Variant4}}
= {{test04Variant4Answer}}

? {{test05Question}}

- {{test05Variant1}}
= {{test05Variant1Answer}}

- {{test05Variant2}}
= {{test05Variant2Answer}}

+ {{test05Variant3}}
= {{test05Variant3Answer}}

- {{test05Variant4}}
= {{test05Variant4Answer}}

? {{test06Question}}

- {{test06Variant1}}
= {{test06Variant1Answer}}

- {{test06Variant2}}
= {{test06Variant2Answer}}

- {{test06Variant3}}
= {{test06Variant3Answer}}

+ {{test06Variant4}}
= {{test06Variant4Answer}}

♣♣♣♣
