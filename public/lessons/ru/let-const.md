# ![ico-30 study] let | const⟪let___const⟫

**ES6 (2015)**

________________________

## ![ico-25 icon] let⟪let⟫

### ![ico-25 icon] Функциональная и блочная области видимости⟪Functional_and_block_scope⟫

Ограничить область видимости переменных, объявленных с помощью директивы **_var_**, можно только "заворачиванием" их в функцию

![ico-25 pin] Блочная область видимости - это ограничение области видимости в пределах фигурных скобок

◘◘![ico-25 cap] **1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

Благодаря этому сборщик мусора освобождает память от ненужных переменных при выходе из блочной области видимости

![ico-25 pin] Следствием блочной области видимости переменных, объявленных с помощью директивы **_let_**, является замыкание значения переменной цикла на каждой итерации блока _for_:

◘◘![ico-25 cap] **2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

___

![ico-20 warn] Обратите внимание, что отсутствие явных фигурных скобок не меняет принцип поведения переменных, объявленных с помощью директивы **_let_**

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

### ![ico-25 icon] Hoisting и "временная мёртвая зона"⟪Hoisting_and_the_‘temporary_dead_zone’⟫

**Hoisting** заключается в том, что переменные "поднимаются" от места их объявления в коде до топа их области видимости

**Hoisting** имеет такое же отношение к переменным, объявленным с помощью директивы **_let_**, как и к объявленным с помощью **_var_**

![ico-20 warn] Однако переменные, объявленные с помощью **_let_**, будут недоступны до тех пор, пока выполнение кода не дойдёт до места фактического объявления переменной

Так появляется **_временная мёртвая зона_**

Поэтому в результате выполнения кода:

◘◘![ico-25 cap] **3**◘◘

~~~js
{
  console.log(x)
  // [временная мёртвая зона]
  let x = 10
}
~~~

будет сгенерировано исключение

~~~console
<p class="error-message">ReferenceError&colon; Cannot access 'x' before initialization</p>
~~~

___

![ico-25 pin] Невозможно повторно объявить переменную с таким же идентификатором в той же области видимости:

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

будет сгенерировано исключение

~~~console
<p class="error-message">Uncaught SyntaxError&colon; Identifier 'figure' has already been declared.</p>
~~~

в цикле сработает, потому что явно присутствует блок {...}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

![ico-25 pin] ~let~ не создает свойств в глобальном объекте

◘◘![ico-25 cap] **5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

___

## ![ico-25 icon] const⟪const⟫

![ico-20 pin] Блочная область видимости ( как у ~let~ )
![ico-20 pin] Невозможно дублирование объявления ( как у ~let~ )
![ico-20 pin] В общем, все, как у ~let~, только:
![ico-20 warn] Изменить значение нельзя

◘◘![ico-25 cap] **6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

будет сгенерировано исключение

~~~console
<p class="error-message">Uncaught TypeError&colon; Assignment to constant variable.</p>
~~~

![ico-20 warn] Обязательно при объявлении инициализировать значение

◘◘![ico-25 cap] **7**◘◘

~~~js
const XXX
~~~

будет сгенерировано исключение

~~~console
<p class="error-message">Uncaught SyntaxError&colon; Missing initializer in const declaration.</p>
~~~

Если константа является объектом, то значения ее свойств могут быть изменены:

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

Аналогично с массивами:

◘◘![ico-25 cap] **9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

___

### ![ico-25 hw] Тесты⟪Tests⟫

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
    privateScope.name = ''Скрытые свойства''
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
→→→ sample.getHiddenProperties()     | Массив, Объект, Строку, 'Скрытые свойства', ReferenceError, undefined | Объект →→→
→→→ sample.getHiddenProperty()       | Массив, Объект, Строку, 'Скрытые свойства', ReferenceError, undefined | undefined →→→
→→→ sample.getHiddenProperty('name') | Массив, Объект, Строку, "''Скрытые свойства''", ReferenceError, undefined | ''Скрытые свойства'' →→→
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

→→→ Что произойдет в результате выполнения кода? | значение elem будет ссылкой на элемент DOM, значение elem будет undefined, ReferenceError, SyntaxError | SyntaxError →→→

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
