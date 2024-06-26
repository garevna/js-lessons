# ![ico-30 study] Объекты JS

_____________________________________________

## ![ico-25 icon] Нативные и хост-объекты JS

Нативные объекты определяются спецификацией языка

Нативные объекты представлены **встроенными объектами**

^^^[Встроенные объекты]

**Объекты**
     ^^Math^^
     ^^JSON^^
**Конструкторы**
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

и объектами, которые создаются в процессе работы кода

~~~js
var obj = {
  name: 'Google',
  show: false
}
~~~

**host-объекты** - это объекты среды, в которой функционирует код

К   host-объектам относятся объекты **BOM** и **DOM**

^^^[host-объекты]
**Объекты**
     ^^window^^
     ^^document^^
     ^^history^^
     ^^location^^
     ^^console^^
     ...
**Конструкторы**
     ^^Event^^
     ^^HTMLElement^^
     ^^XMLHttpRequest^^
     ...
^^^

![ico-20 warn] ^^Поскольку конструкторы - это функции, для получения дерева их свойств нужно использовать метод **~console.dir~** ( а не ~console.log~ )^^

~~~js
console.dir(Promise)
console.dir(XMLHttpRequest)
~~~

Создать нативный объект JS можно двумя способами:

![ico-20 green-ok] С помощью литерала объекта
![ico-20 green-ok] С помощью конструктора

_________________________________

## ![ico-25 icon] Литерал объекта

В литеральной нотации объект описывается внутри блока фигурных скобок:

![ico-25 cap]

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

Все эти свойства доступны извне:

~~~js
console.log(figure.type)
console.log(figure.radius)
console.log(figure.color)
~~~

или так:

~~~js
console.log(figure['type'])
console.log(figure['radius'])
console.log(figure['color'])
~~~

![ico-20 pin] Свойства объектов, заданных литералом, являются **публичными**, поскольку они доступны извне

![ico-25 cap] Хотя всегда есть способ это обойти ![ico-25 smile]

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

^^В этом примере при создании объекта запрашивается ввод токена доступа, который будет сохранен в замыкании метода **testToken**^^

^^при попытке получения доступа к странице (свойству **page**) будет вызван метод **testToken**, который запросит токен доступа и сверит его со значением, хранящимся в замыкании^^

^^Если значения совпадут, то на страницу будет выведено ![ico-25 green-ok]^^

^^В противном случае на страницу будет выведено ![ico-25 err]^^

^^^

____________________________________________


### ![ico-20 icon] Собственные свойства

Собственные свойства _инкапсулированы_ в экземпляре

Например, экземпляр **~figure~** выступает в роли "капсюлы", в которой свойства **~type~**,  **~size~**  и  **~color~**  отделены от таких же свойств других экземпляров

Можно создать объект  **~figure2~**  с таким же набором свойств, но с другими значениями этих свойств:

◘◘![ico-25 cap] 1◘◘

~~~js
var figure2 = {
  type: 'triangle',
  size: 150,
  color: 'blue'
}
~~~

У экземпляров **~figure~** и **~figure2~** одинаковый набор свойств ( имена свойств совпадают )

Однако значения этих свойств в каждом экземпляре отличаются

Итак, **_собственные свойства экземпляра - это свойства, инкапсюлированные в этом экземпляре_**

^^свойства  **_~type~_**,  **_~size~_**  и  **_~color~_**  являются **собственными** свойствами экземпляров  **~figure~**  и  **~figure2~** потому, что их значения локализованы внутри "капсюлы" под именем экземпляра )^^

~~~js
figure.type       // "circle"
figure2.type      // "triangle"
~~~

__________________________________________

### ![ico-20 icon] Перечислимые свойства

**Перечислимые** свойства экземпляра - это свойства, которые итерируются оператором цикла  **~for...in~**

![ico-20 warn] По умолчанию свойства нативных объектов, создаваемых в процессе выполнения кода, являются перечислимыми
![ico-20 warn] Свойства встроенных нативных объектов являются неперечислимыми

~~~js
for (var prop in figure) console.log(prop)
~~~

В консоль будут выведены

~~~console
type
size
color
~~~

![ico-20 pin] Итак, с помощью литерала объекта можно создать **публичные собственные перечислимые** свойства экземпляра

Очевидно, у каждого из этих терминов есть антоним, т.е. должны существовать _приватные_, _несобственные_ и _неперечислимые_ свойства

![ico-20 pin] **Приватные свойства** можно создать с помощью **конструктора**
![ico-20 pin] _Несобственные свойства_ - это **унаследованные** свойства
^^Что касается создания **_неперечислимых_** свойств - мы еще вернемся к этой теме далее^^

________________________

### ![ico-20 icon] Унаследованные свойства

◘◘![ico-25 cap] 2◘◘

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

Если "развернуть" экземпляр **figure** в консоли, то помимо собственных перечислимых свойств ~color~, ~size~ и ~type~ мы увидим свойство **~&#95;&#95;proto&#95;&#95;~**, которое не было выведено в консоль, когда мы итерировали объект оператором ~for...in~

~~~console
▼{ type: "Окружность", radius: 100, color: "red" }
    color:"red"
    radius:100
    type:"Окружность"
  ► __proto__:Object
~~~

Вывод - это свойство **неперечислимое**

Разберемся, является ли это свойство собственным

Значением этого свойства является ссылка на встроенный нативный объект (конструктор) **~Object~**

Если развернуть свойство **~&#95;&#95;proto&#95;&#95;~**, то в консоли мы увидим следующую картину:

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

Первое, что обращает внимание - наш экземпляр создан конструктором **~Object~**:

~constructor: ƒ Object()~

Давайте развернем **~Object~** в консоли

^^для этого используем метод ~console.dir~, поскольку **~Object()~** - это конструктор, т.е. функция, и метод ~console.log()~ вернет нам ••_ ƒ_ Object() { [native code] }••^^

Обратите внимание на свойство **_~prototype~_** конструктора **~Object~**

Это объект

Развернем этот объект, и посмотрим на его содержимое:

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

![ico-20 warn] оно полностью совпадает с тем, что мы обнаружили ранее в свойстве **~&#95;&#95;proto&#95;&#95;~** экземпляра **figure**

Пойдем далее, и заглянем в экземпляр **figure2**

Там мы тоже обнаружим свойство **~&#95;&#95;proto&#95;&#95;~**

и его содержимое будет точно таким же, как у экземпляра **figure**

Создадим пустой объект

~~~js
var obj = {}
~~~

и развернем его в консоли

Ба! знакомые все лица! ![ico-25 smile]

Мы видим все то же свойство **~&#95;&#95;proto&#95;&#95;~**

У всех нативных объектов JS по умолчанию есть это свойство

![ico-20 warn] Свойство **~&#95;&#95;proto&#95;&#95;~** создаваемых _литералом_ объектов JS - это ссылка на свойство **_~prototype~_** конструктора **~Object~**

А что там со _встроенными_ нативными объектами?

Разверните в консоли объект **Array**

~~~js
console.dir(Array)
~~~

и вы увидите цепочку протипов

Последним "звеном" в цепочке прототипов всегда будет **~Object~**

~~~js
console.dir(Array.__proto__.__proto__)  // Object
~~~

"Жирная точка" в конце цепочки прототипов - **~null~**

Аналогичная картина будет с любым встроенным конструктором

![ico-20 pin] У встроенных объектов, которые не являются конструкторами ( типа _Math_ ) цепочка протипов будет короче: свойство **~&#95;&#95;proto&#95;&#95;~** будет ссылкой на **~Object~**

____________________________

![ico-25 hw] **Упражнение**

выведите в консоль все нативные встроенные объекты и отследите в цепочке прототипов ссылку на **~Object~**

_________________________

## ![ico-25 icon] Конструктор

Настало время разобраться с тем, что же такое конструктор

![ico-25 warn] Это функция (_отсюда следует, что там можно что-то спрятать_)
![ico-25 warn] Чтобы она работала как **конструктор**, при вызове  перед ее именем нужно указать ключевое слово **~new~**, и в этом случае:
![ico-20 green-ok] ей не нужен оператор ~return~, но при этом она вернет **экземпляр** объекта
![ico-20 green-ok] внутри нее **~this~** будет указывать не на _глобальный объект_, а на возвращаемый **экземпляр**
![ico-20 green-ok] все объявленные внутри нее переменные и функции будут _инкапсюлированы_ в созданном **экземпляре** (_т.е. будут собственными свойствами и методами экземпляра_)
![ico-20 green-ok] у нее будет свойство **~prototype~** (_которое бывает только у функций_)
![ico-20 green-ok] то, что мы поместим в свойство **~prototype~**, _унаследуют_ все экземпляры

![ico-25 warn] Имена конструкторов принято начинать с заглавной литеры

___________________________________

◘◘![ico-25 cap] 3◘◘

~~~js
function Sample (params) {}

var obj = new Sample()
~~~

Выведем в консоль экземпляр **obj**:

~~~console
▼ Sample {}
    ▼ __proto__:
        ► constructor: ƒ Sample( params )
        ► __proto__: Object
~~~

• мы создали пустой объект класса **Sample** ^^(точнее, мы создали экземпляр объекта)^^
• у него нет собственных свойств ^^(потому что в конструкторе ничего не объявлено)^^
• у него есть _цепочка прототипов_ - это вложенные одно в другое свойства  **~&#95;&#95;proto&#95;&#95;~**
• первое "звено" в цепочке прототипов - это ссылка на свойство **~prototype~** функции-конструктора **Sample**
• свойство **~prototype~**  функции-конструктора **Sample**  является объектом
• это значит, что у него тоже есть свойство **~&#95;&#95;proto&#95;&#95;~**
• это вложенное свойство **~&#95;&#95;proto&#95;&#95;~** - следующее "звено" в цепочке прототипов
• оно является ссылкой на **Object**

~~~js
Sample.prototype
~~~

~~~console
▼ {constructor: ƒ}
    ► constructor: ƒ Sample(params)
    ► __proto__: Object
~~~

Мы можем добавить свойства в **~prototype~** конструктора **Sample**

~~~js
Sample
  .prototype
  .setNewProperty = function (propName, propValue) {
    this[propName] = propValue
  }
~~~

Если теперь вывести в консоль экземпляр **obj**, то в его свойстве **~&#95;&#95;proto&#95;&#95;~** мы обнаружим новое перечислимое свойство **_~setNewProperty~_** (_унаследованный метод_)

Вызовем этот метод:

~~~js
obj.setNewProperty('name', 'Petro')
~~~

и обнаружим, что у экземпляра **obj** появилось новое _собственное перечислимое_ свойство **name**

![ico-20 warn] При обращении к свойству сначала оно ищется среди собственных свойств экземпляра, и если не будет найдено, то поиск будет продолжен среди свойств прототипа, и так далее, пока не закончится цепочка прототипов

![ico-25 pin] Конструктор позволяет создавать экземпляры объектов, имеющих не только публичные, но и приватные свойства и методы

___________________________________________

**Конструктор Function**

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

## ![ico-25 icon] Публичные и приватные свойства

Конструктор - это функция, из чего следует, что с помощью конструктора можно "спрятать" переменные и функции
где спрятать? - в экземпляре, созданном с помощью этого конструктора

Как мы уже знаем, конструктор создает **_собственные_** свойства и методы экземпляров путем объявления переменных и функций

![ico-25 pin] Все свойства, объявленные в конструкторе с ключевым словом  **~this~**, будут **_публичными_**

![ico-25 pin] Все свойства, объявленные в конструкторе с ключевым словом  **~var~** или **~function~**, будут **_приватными_**

К публичным свойствам и методам экземпляра всегда есть доступ из внешнего окружения

Достаточно использовать _имя экземпляра_ + "." + _имя свойства_ (_метода_)
^^при вызове метода нужно еще добавить круглые скобки после его имени^^

Приватные свойства (и методы) экземпляра недоступны извне

Они не отображаются в консоли при выводе объекта

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

В этом примере **_~defaultName~_**  и **_~showName~_** являются **_приватными_** свойствами экземпляра **~lena~**

**_~name~_**, **_~age~_** и **_~changeName~_** являются **_публичными_** свойствами экземпляра **~lena~**

В публичных методах экземпляра (**_~changeName~_**)  **~this~**  будет ссылкой на экземпляр (**~lena~**)

![ico-20 warn] в приватных методах (**_~showName~_**) экземпляра контекстом вызова будет *глобальный объект* **~window~**

(т.е. внутри метода **_~showName~_** **~this~**  будет ссылкой на объект **~window~**)

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

^^Конструктор **~Bag~**  создает объект с приватными свойствами  **~money~**,  **~documents~** и  **~accessories~**^^

^^С его помощью создаем экземпляр **myCase**^^

^^При создании экземпляра передаем ему ключевую фразу для доступа к содержимому сумочки '_это я, твоя хозяйка_'^^

^^Поскольку свойства  **~money~**,  **~documents~** и  **~accessories~** приватные,  "сумка закрыта"^^

^^Посторонним нет доступа к ее содержимому^^

^^Публичное свойство **~content~** изначально имеет значение  **~null~**^^

^^Это все, что вы можете увидеть в закрытой сумке^^

^^Если хозяин сумки согласится показать ее содержимое, то оно будет помещено в публичное свойство **~content~** для обозрения^^

^^Функция **~getMoney()~** доступа к деньгам  (приватному свойству **~money~**) также является приватной, поскольку никто, кроме хозяина, не должен иметь возможность взять деньги из сумки^^

^^И есть два публичных метода:^^

^^• **payment (_sum_, _key_)** - оплата^^
^^• **rummage ()** - таможенный досмотр^^

^^В случае совершения платежа с помощью публичного метода  **payment**^^

~~~js
console.log(myCase.payment(2000))
~~~

^^запрашивается ключевая фраза, сверяется с установленной при создании экземпляра, и если значения совпали, то вызывается приватный метод **~getMoney~**, который уменьшает приватное свойство **~money~** на сумму платежа,  после  чего публичный метод **~pay()~** с чистой совестью возвращает изъятую сумму^^

^^Если будет введена неправильная ключевая фраза, то запрос будет отклонен с возвратом ![ico-20 err]^^

^^В случае таможенного досмотра вызывается публичный метод **rummage()**^^

~~~js
myCase.rummage ()
~~~

^^который "выкладывает на обозрение" содержимое сумочки (помещает его в публичное свойство **~content~**)^^

^^Теперь работники таможни могут посмотреть содержимое:^^

~~~js
console.log(myCase.content)
~~~

_________________________________________

Таким образом, приватные и публичные свойства и методы помещаются в "капсулу" - объект (экземпляр)

Это и есть инкапсуляция (**_encapsultion_**)

Имена свойств и методов внутри "капсулы" принадлежат к пространству имен объекта

Мы агрегировали под одним именем (именем объекта) всю совокупность переменных и функций, определяющих и изменяющих его (объекта) состояние
