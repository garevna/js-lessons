# ![ico-30 study] indexedDB

_____________________________________

^^Indexed Database^^
**NoSQL**
Индексируемая транзакционная объектно-ориентированная база данных
на стороне клиента,
языком запросов которой является JavaScript
__________________________________________

^^База данных - это совокупность хранилищ данных и интерфейсов доступа к ним^^
__________________________________________

![ico-20 speach] Мы начинаем знакомство с низкоуровневым API,
дающим нам возможность хранить на клиенте значительные объемы структурированных данных
Структуры данных могут быть любыми, ![ico-20 warn] если в них нет _циклических ссылок_
^^(можно, в том числе, хранить файлы и blob-объекты)^^
^^"низкоуровневый" означает, что все придется писать много кода, так что готовьтесь к многословным примерам^^

![ico-20 speach] Тот факт, что IndexedDB является объектно-ориентированной базой данных,
означает для нас использования привычных пар "ключ-значение",
когда каждая запись в базе данных однозначно идентифицируется ключом,
как и свойства обычного объекта,
и является, по сути, свойством обычного объекта,
только называть этот объект мы будем _хранилищем_ (store)
![ico-20 speach] В процессе работы с этим API мы будем делать запросы к базе данных, используя JS
^^в отличие от баз данных в виде набора таблиц с языком запросов **SQL**,^^
^^здесь никаких таблиц не будет - только объекты,^^
^^и никакого SQL - сплошной JS^^
^^короче, все родное и бесконечно близкое... ![ico-20 smile]^^

![ico-20 speach] Данное API работает в режиме _same-origin policy_ (политики одного источника)
^^так же, как куки и localStorage, экземпляр indexedDB доступен только с того домена / протокола / порта, с которого был создан^^
^^можно создать несколько баз данных **indexedDB**, но их имена должны быть уникальны в пределах домена^^

![ico-20 speach] Интерфейс IndexedDB работает **асинхронно**
^^приготовьтесь, будет много асинхронных запросов и колбэков ![ico-20 smile]^^

![ico-20 speach] Экземпляр indexedDB является **_транзакционной_** базой данных
^^Все запросы к базе данных выполняются в рамках **транзакций**^^
^^( транзакции можно рассматривать как объекты-контейнеры для объектов-запросов )^^

Но прежде, чем мы продолжим нашу экскурсию по ухабам интерфейса **IDBDatabase**,
давайте посмотрим, как отслеживать наши операции с базой данных в отладчике

___________________________________________________

^^^[Chrome DevTools]

В **Chrome DevTools** есть возможность просматривать данные IndexedDB
( раздел **IndexedDB** вкладки **Application** )

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.png)

^^^

В **Mozilla Firefox** это выглядит так:

^^^[Firefox ( Mozilla )]

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-mozila.png)

^^^
___________________________________________________

## ![ico-25 icon] Интерфейс IDBFactory API

**indexedDB** - это интерфейс **IDBFactory**

Выведем в консоль объект **indexedDB**

~~~console
▼ IDBFactory
  ▼ __proto__: IDBFactory
      ► cmp: ƒ cmp()
      ► databases: ƒ databases()
      ► deleteDatabase: ƒ deleteDatabase()
      ► open: ƒ open()
      ► constructor: ƒ IDBFactory()
        Symbol(Symbol.toStringTag): "IDBFactory"
      ► __proto__: Object
~~~

Этот интерфейс позволяет:

• **open** - установить соединение с базой данных по ее имени
• **databases** - получить перечень имен и версий всех баз данных, существующих для данного домена
• **deleteDatabase** - удалить базу данных по ее имени

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FIDBFactory.gif)

______________________________________________

### ![ico-20 icon] IDBRequest

В процессе работы с базой данных нам придется делать запросы к API

Любой запрос является экземпляром **IDBRequest**, и наследует от него свойства:

| ![ico-20 green-ok] | **^^onsuccess^^** | **^^result^^** |
| ![ico-20 error]    | **^^onerror^^**   | **^^error^^** |

Свойство ![ico-20 green-ok] **result** будет содержать результат запроса,
когда запрос завершится ( произойдет событие **success** )
^^"Ловить" результат запроса нужно в колбэке **onsuccess**^^
^^Если запрос не завершен, попытка прочитать свойство **result**^^
^^будет приводить к исключению^^

Свойство ![ico-20 green-ok] **transaction** объекта запроса
является ссылкой на транзакцию, в рамках которой выполняется запрос

_____________________________________

### ![ico-20 icon] indexedDB.open

Создание запроса на соединение с базой данных
![ico-20 warn] Метод **open** создает _объект запроса_ **IDBOpenDBRequest**
и возвращает ссылку _на него_

![ico-20 green-ok] Первый аргумент метода ( обязательный ) - имя базы данных ( строка )
![ico-20 green-ok] Второй аргумент ( опциональный ) - версия базы данных ( целое число )

В случае благополучного завершения запроса ( ![ico-20 green-ok] событие **success** )
в его свойстве **result** будет ссылка на объект интерфейса **IDBDatabase**,
а в случае ошибки запроса в его свойстве ![ico-20 error] **error** будет объект ошибки

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 1)

request.onsuccess = event => console.log(event.target.result)
request.onerror = event => console.warn(event.target.error)
~~~

Для компактности можно сразу упаковать объект запроса необходимыми колбэками:

~~~js
const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => console.log(event.target.result),
  onerror: event => console.warn(event.target.error)
})
~~~

После успешного завершения запроса (событие **success**) в консоли мы увидим экземпляр **IDBDatabase**:

~~~console
▼ IDBDatabase {name: "sampleDB", version: 1, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
  ► onversionchange: null
    version: 1
  ► __proto__: IDBDatabase
~~~

Экземпляр **IDBDatabase** представляет собой интерфейс, или сервисную оболочку,
за которой "прячется" сама база данных в виде набора именованных хранилищ

т.е. сам экземпляр **IDBDatabase** не хранит данные, а опосредует доступ к ним

^^Данные хранятся на диске пользователя, откуда API их читает и куда записывает^^
^^Поэтому интерфейс ~IDBFactory API~ работает асинхронно:^^
^^дисковые операции чтения / записи  отнюдь не являются "мгновенными",^^
^^и достаточно варьируют в продолжительности^^

_________________________________

#### ![ico-20 icon] upgradeneeded

Объект запроса на соединение с базой данных имеет еще одно событие - ![ico-20 warn] **~upgradeneeded~**
Это событие возникает в двух случаях:
![ico-20 warn] если соединение с базой данных устанавливается впервые,
т.е. такой базы данных еще не существует, и она будет создана в результате запроса
![ico-20 warn] если в запросе указана более высокая версия базы данных,
чем у сохраненной на диске пользователя

Соответствующий коллбэк запроса **onupgradeneeded**
позволяет проводить манипуляции со схемой базы данных,
т.е. создавать (удалять) хранилища и индексы

Аналогичное событие, но с другим названием, есть у экземпляра **IDBDatabase**,
который создается в результате запроса (свойство **result** объекта запроса)
Это событие **~versionchange~**
Соответствующий колбэк этого объекта называется **~onversionchange~**

Разберем эти колбэки на примере

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const callback = event => console.log(event.type)
const errorHandler = event => console.warn(event.target.error)

const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onupgradeneeded: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onerror: errorHandler
})
~~~

После выполнения этого кода в консоли будет два события:

~~~console
upgradeneeded
success
~~~

А теперь выполним в консоли следующий код:

~~~js
Object.assign(indexedDB.open('sampleDB', 2), {
  onsuccess: callback,
  onupgradeneeded: callback,
  onerror: errorHandler
})
~~~

После выполнения этого кода в консоли будет только одно событие:

~~~console
versionchange
~~~

^^Далее экспериментировать не стоит, поскольку API будет блокировать запросы до тех пор, пока мы не закроем соединение с базой данных^^

Итак, мы выяснили, что когда мы запрашиваем соединение с базой данных,
могут "сработать" два колбэка,
в которых можно изменять схему базы данных,
т.е. создавать (удалять) хранилища и индексы

Первый колбэк - это **onupgradeneeded** самого запроса,
а второй - это **onversionchange** интерфейса базы данных, или результата запроса

Давайте посмотрим на этот интерфейс, т.е. на то, что мы получили в свойстве **result** запроса:

~~~console
▼ IDBDatabase { name: "sampleDB", version: 2, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
    onversionchange: null
    version: 2
  ► __proto__: IDBDatabase
~~~

Надо сказать, что сам экземпляр ~IDBDatabase~ не особо содержателен:
• у него есть собственное свойство **objectStoreNames**,
• номер версии базы данных - **version**,
• и свойства-ссылки на обработчиков событий **onabort**, **close**, **error** и **versionchange**...
Интереснее заглянуть ему "под капот",
т.е. посмотреть на унаследованные свойства и методы этого интерфейса:

~~~~console
▼ IDBDatabase {…}
  ► close: ƒ close()
  ► createObjectStore: ƒ createObjectStore()
  ► deleteObjectStore: ƒ deleteObjectStore()
    name: (...)
    objectStoreNames: (...)
    onabort: (...)
    onclose: (...)
    onerror: (...)
    onversionchange: (...)
  ► transaction: ƒ transaction()
    version: (...)
  ► constructor: ƒ IDBDatabase()
    Symbol(Symbol.toStringTag): "IDBDatabase"
  ► get name: ƒ name()
  ► get objectStoreNames: ƒ objectStoreNames()
  ► get onabort: ƒ onabort()
  ► set onabort: ƒ onabort()
  ► get onclose: ƒ onclose()
  ► set onclose: ƒ onclose()
  ► get onerror: ƒ onerror()
  ► set onerror: ƒ onerror()
  ► get onversionchange: ƒ onversionchange()
  ► set onversionchange: ƒ onversionchange()
  ► get version: ƒ version()
  ► __proto__: EventTarget
~~~~

Здесь привлекают внимание следующие методы:

![ico-20 green-ok] метод **close**
![ico-20 green-ok] метод **createObjectStore**
![ico-20 green-ok] метод **deleteObjectStore**
![ico-20 green-ok] метод **transaction**

С методом **close** все предельно просто: он закрывает соединение с базой данных:

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const openDB = dbName => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName), {
  onsuccess: resolve(event.target.result),
  onerror: reject(event.target.error)
}))

openDB().then(db => { console.log(db); db.close() }, err => console.warn(err))
~~~

а вот остальные методы разберем немного позже,
поскольку нужно завершить изучение интерфейса ~IDBFactory~

_______________________________________________

### ![ico-20 icon] indexedDB.databases

Интерфейс ~IDBFactory~ предоставляет нам возможность получить перечень всех баз данных, которые уже существуют для домена:

~~~js
indexedDB.databases()
  .then(response => console.log(response))
~~~

В консоли будет массив с именами и версиями всех существующих баз данных:

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "sampleDB", version: 2}
  ► 1: {name: "users", version: 1}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________________________

### ![ico-20 icon] indexedDB.deleteDatabase

Интерфейс ~IDBFactory~ позволяет сделать запрос на удаление базы данных с указанным именем

~~~js
const callback = event => console.log(event.type)

Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: callback,
  onsuccess: callback,
  onupgradeneeded: callback,
  onblocked: callback
})
~~~

Возвращает объект:

~~~console
▼ IDBOpenDBRequest {onblocked: ƒ, onupgradeneeded: ƒ, source: null, transaction: null, readyState: "pending", …}
    error: null
  ► onblocked: event => console.log ( event.type )
  ► onerror: event => console.log ( event.type )
  ► onsuccess: event => console.log ( event.type )
    onupgradeneeded: event => console.log ( event.type )
    readyState: "done"
    result: undefined
    source: null
    transaction: null
  ► __proto__: IDBOpenDBRequest
~~~

^^это объект запроса на соединение с базой данных, которому мы можем "навешивать" колбэки^^

после чего асинхронно происходит удаление базы данных
Если удаление базы данных завершается успешно,
то на объекте запроса ( IDBOpenDBRequest ) происходит событие ![ico-20 green-ok] **success**,
но свойство **result** при этом будет иметь значение **~undefined~**
Если удаление базы данных завершается ошибкой,
то на объекте запроса ( IDBOpenDBRequest ) происходит событие ![ico-20 error] **error**

![ico-20 warn] Событие **upgradeneeded** является триггером для запуска транзакции **versionchange**
на экземпляре **IDBDatabase**

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const callback = event => console.log(event.type, event.target.result ? event.target.result.name : '...')
const errorHandler = event => console.warn(event.target.error)

const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onupgradeneeded: event => callback,
  onerror: errorHandler
})
~~~

В консоли будет:

~~~console
upgradeneeded sampleDB
success sampleDB
~~~

Давайте теперь без перезагрузки страницы выполним запрос на удаление базы данных **sampleDB**:

~~~js
Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: event => console.log(event.type),
  onsuccess: event => console.log(event.type),
  onupgradeneeded: event => console.log(event.type),
  onblocked: event => console.log(event.type)
})
~~~

Если в момент создания запроса с базой данных было открытое соединение,
то соответствующий экземпляр **IDBDatabase** получит событие **versionchange**

Поэтому консоли мы увидим:

~~~console
versionchange ...
blocked
~~~

Если же после создания базы данных **sampleDB** перезагрузить страницу,
а потом запустить код удаления базы данных,
то в консоли будет только одно событие:

~~~console
success
~~~

_____________________________________________________

Итак, подведем итог:

| **IDBFactory** | **open**  | => | **IDBDatabase** |
| ^^интерфейс^^  | ^^метод^^ |    | ^^интерфейс^^   |
