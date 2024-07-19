# ![ico-30 study] let | const

**ES6 ( 2015 )**

________________________

## ![ico-25 icon] let

### ![ico-25 icon] Функциональная и блочная области видимости

Ограничить область видимости переменных, объявленных с помощью директивы **_var_**, можно только "заворачиванием" их в функцию

![ico-25 pin] Блочная область видимости - это ограничение области видимости в пределах фигурных скобок

◘◘![ico-25 cap] ** 1**◘◘

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

◘◘![ico-25 cap] ** 2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(() => console.log(i), 1000 * i)
}
~~~

__________________________________________________________

![ico-20 warn] Обратите внимание, что отсутствие явных фигурных скобок не меняет принцип поведения переменных, объявленных с помощью директивы **_let_**

◘◘![ico-25 cap] **var**◘◘

~~~js
const funcs = []

for (var item of ['alpha', 'sigma', 'omega']) {
  funcs.push(() => console.log(item))
}
funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~

◘◘![ico-25 cap] **let**◘◘

~~~js
const funcs = []

for (const item of ['alpha', 'sigma', 'omega']) {
  funcs.push(() => console.log(item))
}

funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~
_______________________

### ![ico-25 icon] Hoisting и "временная мёртвая зона"

**Hoisting** заключается в том, что переменные "поднимаются" от места их объявления в коде до топа их области видимости

**Hoisting** имеет такое же отношение к переменным, объявленным с помощью директивы **_let_**, как и к объявленным с помощью **_var_**

![ico-20 warn] Однако переменные, объявленные с помощью **_let_**, будут недоступны до тех пор, пока выполнение кода не дойдёт до места фактического объявления переменной

Так появляется **_временная мёртвая зона_**

Поэтому в результате выполнения кода:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
{
  console.log(x)
  // [ временная мёртвая зона ]
  let x = 10
}
~~~

будет сгенерировано исключение:

••![ico-25 err] ReferenceError: Cannot access 'x' before initialization••

_________________________


![ico-25 pin] Невозможно повторно объявить переменную с таким же идентификатором в той же области видимости:

◘◘![ico-25 cap] ** 4**◘◘

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

Будет сгенерировано исключение:

![ico-20 err] ~Uncaught SyntaxError: Identifier 'figure' has already been declared~

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

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] const

![ico-20 pin] Блочная область видимости ( как у ~let~ )
![ico-20 pin] Невозможно дублирование объявления ( как у ~let~ )
![ico-20 pin] В общем, все, как у ~let~, только:
![ico-20 warn] Изменить значение нельзя

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

Будет сгенерировано исключение:

![ico-20 err] ~Uncaught TypeError: Assignment to constant variable.~

![ico-20 warn] Обязательно при объявлении инициализировать значение

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const XXX
~~~

Будет сгенерировано исключение:

••![ico-20 err] Uncaught SyntaxError: Missing initializer in const declaration••

Если константа является объектом, то значения ее свойств могут быть изменены:

◘◘![ico-25 cap] ** 8**◘◘

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

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLScPBbEkpMk9CNH935pToTh_BmyE1vqk2rnzu3Mhw9F-D-7V_w/viewform)
