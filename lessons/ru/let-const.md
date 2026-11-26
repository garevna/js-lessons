# ![ico-30 study] let | const⟪let___const⟫

**ES6 (2015)**

________________________

## ![ico-25 icon] let⟪let⟫

### ![ico-25 icon] Функциональная и блочная области видимости⟪Functional_and_block_scope⟫

Ограничить область видимости переменных, объявленных с помощью директивы **_~var~_**, можно только "заворачиванием" их в функцию

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

![ico-25 pin] Следствием блочной области видимости переменных, объявленных с помощью директивы **_~let~_**, является замыкание значения переменной цикла на каждой итерации блока _for_:

◘◘![ico-25 cap] **2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

___

![ico-20 warn] Обратите внимание, что отсутствие явных фигурных скобок не меняет принцип поведения переменных, объявленных с помощью директивы **_~let~_**

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

**Hoisting** имеет такое же отношение к переменным, объявленным с помощью директивы **_~let~_**, как и к объявленным с помощью **_~var~_**

![ico-20 warn] Однако переменные, объявленные с помощью **_~let~_**, будут недоступны до тех пор, пока выполнение кода не дойдёт до места фактического объявления переменной

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
! ReferenceError: Cannot access 'x' before initialization
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
! Uncaught SyntaxError: Identifier 'figure' has already been declared.
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
! Uncaught TypeError: Assignment to constant variable.
~~~

![ico-20 warn] Обязательно при объявлении инициализировать значение

◘◘![ico-25 cap] **7**◘◘

~~~js
const XXX
~~~

будет сгенерировано исключение

~~~console
! Uncaught SyntaxError: Missing initializer in const declaration.
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

___

## ![ico-25 hw] Тесты⟪Tests_2⟫

♣♣♣♣
? Цикл по трём строкам складывает в массив три функции, каждая печатает **item**. С **var** все три печатают **omega**, с **let** — **alpha**, **sigma**, **omega**. Почему?

- **let** копирует значение в каждую функцию, а **var** передаёт его по ссылке.
= Неверно. Ни та, ни другая директива ничего не копирует в функцию: функция запоминает не значение, а переменную. Дело в том, сколько этих переменных.

+ С **let** на каждой итерации создаётся своя переменная, а с **var** она одна на весь цикл.
= Верно! Это и есть следствие блочной области видимости: блок цикла — своя область на каждом проходе, и каждая функция замыкает свою переменную. С **var** переменная одна, все три функции замкнули её, а к моменту вызова в ней лежит последнее значение.

- **setTimeout** и **push** по-разному работают с **var** и **let**.
= Неверно. Ни **push**, ни **setTimeout** о директивах объявления ничего не знают — разница возникает раньше, при создании переменной.

- С **var** функции вызываются до окончания цикла, а с **let** — после.
= Неверно. Вызываются они в обоих случаях одинаково — после цикла. Отличается то, какую переменную каждая из них помнит.

? Что из этого разрешено с **const user = { login: 'admin' }**?

- Разрешено всё: **const** — это только подсказка читателю кода.
= Неверно. Это не подсказка, а запрет: присваивание константе бросает **TypeError** и в обычном коде, и в строгом режиме.

- Ничего: объект, объявленный через **const**, неизменяем целиком.
= Неверно. **const** запрещает менять переменную, а не объект, на который она указывает. Заморозить сам объект — это **Object.freeze()**, другая работа.

+ **user.login = 'student'** — можно, **user = {}** — нельзя.
= Верно! Константа — это ссылка, которую нельзя переназначить. Что лежит по этой ссылке, меняется свободно: свойства объекта, элементы массива. Попытка присвоить новое значение самой константе даёт **TypeError: Assignment to constant variable**.

- **user = {}** — можно, **user.login = 'student'** — нельзя.
= Неверно, всё наоборот: запрещено именно присваивание самой константе, а свойства меняются свободно.

? Чем **let** отличается от **var** при hoisting?

- Разницы нет: обе до объявления равны **undefined**.
= Неверно. **undefined** до объявления — это поведение **var**. Обращение к **let** до её строки — исключение, а не значение.

- **let** поднимается только внутри функций, а в блоках — нет.
= Неверно. Поднимается она до верха своей области видимости, а для **let** область — это именно блок.

- Переменные **let** не поднимаются вовсе, поэтому до объявления их не существует.
= Неверно — и разница тонкая, но видная. Если бы переменной не существовало, обращение к ней дало бы **ReferenceError: x is not defined**. А оно даёт **Cannot access 'x' before initialization** — значит, движок про переменную знает.

+ Поднимаются обе, но **let** недоступна до строки объявления — это временная мёртвая зона.
= Верно! Переменная поднята, но не инициализирована, и до своей строки трогать её нельзя: **ReferenceError: Cannot access 'x' before initialization**. У **var** на том же месте было бы **undefined** — тихо и потому опаснее.

? На верхнем уровне скрипта: **var x = 25; let z = 15**. Чему равны **window.x** и **window.z**?

+ **25** и **undefined**
= Верно! **var** на верхнем уровне кладёт переменную в глобальный объект, **let** — нет: она живёт в области видимости скрипта, а не в **window**. Сама **z** при этом прекрасно доступна по имени.

- **undefined** и **15**
= Неверно, наоборот: в глобальный объект попадает именно **var**.

- Оба **undefined**
= Неверно. **var** свойство создаёт — именно поэтому его и ругают: так в глобальный объект попадает всё подряд.

- **25** и **15**
= Неверно. Свойство глобального объекта создаёт только **var**; **let** этого не делает.

? Что будет с **const XXX** без присваивания значения?

- Ничего: объявление без значения допустимо.
= Неверно. Допустимо оно у **var** и **let** — им значение можно присвоить позже. Константе нельзя, поэтому и объявлять её без значения бессмысленно.

- Константа получит **undefined**.
= Неверно. **undefined** было бы значением — а константе значение потом не присвоить, так что от такой константы не было бы никакого толку. Язык и не даёт её объявить.

+ **SyntaxError**
= Верно! **Missing initializer in const declaration** — и это ошибка разбора, то есть не выполнится весь скрипт целиком, а не только эта строка.

- **TypeError** при первом обращении
= Неверно. **TypeError** бросает присваивание уже объявленной константе. Здесь до выполнения дело не доходит вовсе.

? Почему **for (const item of ['alpha', 'sigma', 'omega'])** работает, хотя **item** на каждом проходе другой?

- **for...of** не присваивает, а передаёт значение в блок.
= Неверно. Присваивание есть, иначе в **item** ничего бы не оказалось. Важно, что оно каждый раз достаётся новой переменной — первое и единственное для неё.

- Массив строк неизменяем, поэтому **const** не нарушается.
= Неверно. **const** вообще не про то, что лежит в переменной, а про то, можно ли присвоить ей другое значение. Массив здесь ни при чём.

- В цикле **const** ведёт себя как **let** — это исключение из правила.
= Неверно. Никакого исключения нет: правило соблюдается полностью — просто каждая константа живёт один проход.

+ На каждой итерации создаётся новая константа, и ни одна не переприсваивается.
= Верно! Это та же блочная область видимости, что и у **let**: тело цикла — своя область на каждом проходе, и **item** в ней объявляется заново. А вот **for (const i = 0; i < 3; i++)** не заработает: там переменная одна и её увеличивают.

♣♣♣♣
