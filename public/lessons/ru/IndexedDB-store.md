# ![ico-30 study] indexedDB

____________________________________________________________

## ![ico-25 icon] Хранилища данных

Экземпляр **IDBDatabase** - это интерфейс "второго уровня", обеспечивающий доступ к базе данных

Этот интерфейс позволяет нам:

| ![ico-20 green-ok] | создавать и удалять хранилища базы данных и индексы хранилищ |
| ![ico-20 green-ok] | создавать транзакции для работы с хранилищами |
| ![ico-20 green-ok] | ну и, конечно же, закрыть соединение с базой данных |

Что следует понимать:

| ![ico-20 speach] | Каждое хранилище имеет уникальное имя |
| ![ico-20 speach] | Каждое хранилище является, по сути, объектом, содержащим записи с уникальными ключами |
| ![ico-20 speach] | В базе данных может быть много хранилищ |
| ![ico-20 speach] | Каждое хранилище имеет собственный интерфейс для работы с данными |
| ![ico-20 speach] | Чтобы получить доступ к интерфейсу хранилища, нужна транзакция |

![ico-25 speach] Есть два уровня доступа к хранилищам:

| Уровень создания транзакции | **versionchange**  |
| **IDBFactory**              | ![ico-20 green-ok] |
| **IDBDatabase**             | ![ico-20 negation] |

^^На уровне интерфейса **IDBFactory** может быть создана транзакция типа **versionchange**,^^
^^но транзакции, создаваемые на уровне интерфейса **IDBDatabase**, не могут иметь тип **versionchange**^^

Создание транзакций на уровне интерфейса **IDBDatabase** мы рассмотрим чуть позже,
а пока сосредоточимся на транзакциях "верхнего уровня" ( **IDBFactory** )
_______________________________

Итак, транзакция типа **versionchange** "рождается" только на уровне **IDBFactory**,
т.е. только при запросе на установление соединения с базой данных ( **indexedDB.open(...)** )
Однако обратное не верно,
т.е. отнюдь не при каждом запросе на соединение с базой данных создается транзакция типа **versionchange**

Транзакция типа **versionchange** создается в случае, если:
| ![ico-20 green-ok] | соединение с базой данных устанавливается впервые<br>( т.е. такой базы данных еще не существует ) |
| ![ico-20 green-ok] | мы пытаемся установить соединение с более высокой версией базы данных, которой, опять-таки, еще не существует<br>( т.е. последняя сохраненная на диске пользователя база данных имеет номер версии меньше )<br>^^это означает, что мы собираемся сделать апгрейд базы данных^^ |

Именно в рамках этой транзакции "верхнего уровня" мы можем проводить операции по созданию и удалению хранилищ
^^( а так же создавать ключи и индексы, добавлять данные в хранилище, и т.д. - но об этом чуть позже )^^

Итак, мы создаём асинхронный запрос на соединение с базой данных,
и если этот запрос удовлетворяет одному из перечисленных выше условий,
то на объекте запроса произойдет событие **upgradeneeded**
и будет автоматически создана транзакция типа **versionchange**

При этом в свойстве **result** объекта запроса будет ссылка на экземпляр **IDBDatabase**

А дальше будет вызван колбэк **upgradeneeded** объекта запроса,
( если вы, конечно, предварительно его создали )
В этом колбэке мы и будем создавать хранилища,
используя полученную ссылку на объект интерфейса - экземпляр **IDBDatabase**

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________________________

### ![ico-25 icon] Запросы

Запрос - это объект, у которого есть:

| ![ico-20 green-ok] | состояние | **pending** / **done** |
| ![ico-20 green-ok] | события   | **~success~** / **~error~** |
| ![ico-20 green-ok] | свойство **result** |          |

Когда состояние объекта запроса меняется, на объекте запроса происходит либо событие **~success~**, либо событие **~error~**

![ico-25 warn] У запроса "_верхнего уровня_"
( создаваемого методом **open** интерфейса **IDBFactory** )
кроме "стандартных" событий **~success~** и **~error~**
есть также собственное "специфическое" событие ![ico-20 green-ok] **~upgradeneeded~**
![ico-25 warn] После того, как соединение с базой данных установлено,
свойство **result** объекта запроса содержит ссылку на экземпляр **IDBDatabase**

Экземпляр **IDBDatabase** является интерфейсом конкретной базы данных,
имя которой было указано при открытии соединения

После выполнения следующего кода:

~~~js
const request = indexedDB.open('sampleDB')

request.onupgradeneeded = event => console.log(event.target.result)
~~~

мы ничего не увидим в консоли, поскольку база данных **sampleDB** уже существует, и событие **upgradeneeded** не произойдет

Сделаем запрос на соединение с новой версией (2) базы данных **sampleDB**

~~~js
const request = indexedDB.open('sampleDB', 2)

request.onupgradeneeded = event => console.log(event.target.result)
~~~

Теперь мы увидим в консоли объект интерфейса базы данных **sampleDB**

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3-1.gif)

______________________________________________________

### ![ico-20 icon] createObjectStore

Теперь создадим первое хранилище:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 3)

request.onupgradeneeded = event => {
  const db = event.target.result
  const store = db.createObjectStore('firstStore')
  console.log(store)
}
~~~

В консоли мы увидим созданный нами объект хранилища:

~~~~console
▼ IDBObjectStore {name: "firstStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: false}
    autoIncrement: false
  ► indexNames: DOMStringList {length: 0}
    keyPath: null
    name: "firstStore"
  ► transaction: IDBTransaction {objectStoreNames: DOMStringList, mode: "versionchange", db: IDBDatabase, error: null, onabort: null, …}
  ► __proto__: IDBObjectStore
      ► add: ƒ add()
        autoIncrement: (...)
      ► clear: ƒ clear()
      ► count: ƒ count()
      ► createIndex: ƒ createIndex()
      ► delete: ƒ delete()
      ► deleteIndex: ƒ deleteIndex()
      ► get: ƒ ()
      ► getAll: ƒ getAll()
      ► getAllKeys: ƒ getAllKeys()
      ► getKey: ƒ getKey()
      ► index: ƒ index()
        indexNames: (...)
        keyPath: (...)
        name: (...)
      ► openCursor: ƒ openCursor()
      ► openKeyCursor: ƒ openKeyCursor()
      ► put: ƒ put()
        transaction: (...)
      ► constructor: ƒ IDBObjectStore()
        Symbol(Symbol.toStringTag): "IDBObjectStore"
      ► get autoIncrement: ƒ autoIncrement()
      ► get indexNames: ƒ indexNames()
      ► get keyPath: ƒ keyPath()
      ► get name: ƒ name()
      ► set name: ƒ name()
      ► get transaction: ƒ transaction()
      ► __proto__: Object
~~~~

... и это опять интерфейс!
мы получили интерфейс третьего уровня ![ico-20 smile]

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3.gif)

Итак, двигаясь последовательно ( "сверху вниз" ):
**первый уровень**: мы использовали интерфейс **~IDBFactory~**, чтобы установить соединение с базой данных **_sampleDB_**, в результате чего получили ссылку на объект интерфейса **~IDBDatabase~**
**второй уровень**: мы использовали интерфейс **~IDBDatabase~**, чтобы создать хранилище **_firstStore_**, и получили объект интерфейса **IDBObjectStore**
**третий уровень**: мы можем использовать интерфейс **IDBObjectStore**, чтобы работать с данными в хранилище

Обратим внимание на такие собственные свойства интерфейса **IDBObjectStore**:

• **~autoIncrement~**
• **~keyPath~**

Оба эти свойства имеют значение ~null~, потому что при создании хранилища мы не определили их значения

• **~indexNames~**

итерабельный объект, который будет содержать имена всех индексов хранилища
^^пустой, потому что мы еще не создали ни одного индекса для этого хранилища^^

• **~transaction~**

если в данный момент происходит транзакция, в которой задействовано данное хранилище, то в этом свойстве будет ссылка на объект транзакции

~~~console
▼ IDBObjectStore {name: "First Store", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: false}
    autoIncrement: false
    indexNames: DOMStringList {length: 0}
    keyPath: null
    name: "First Store"
  ► transaction: IDBTransaction
      ► db: IDBDatabase {name: "sampleDB", version: 3, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
        error: null
        mode: "versionchange"
      ► objectStoreNames: DOMStringList {0: "First Store", length: 1}
        onabort: null
        oncomplete: null
        onerror: null
      ► __proto__: IDBTransaction
  ► __proto__: IDBObjectStore
~~~

Свойство **~mode~** транзакции имеет значение **_~versionchange~_**
в рамках этой транзакции мы создали хранилище, и эта транзакция все еще активна,
и сейчас мы можем делать запросы к хранилищу, используя интерфейс **IDBObjectStore**

Свойство **db** объекта **transaction** является ссылкой на интерфейс базы данных **IDBDatabase**

Итак, в рамках транзакции **_~versionchange~_** мы получили ссылку на интерфейс хранилища **IDBObjectStore**
и этот интерфейс имеет ссылку на объект транзакции, которая его открыла
а объект транзакции имеет ссылку на интерфейс базы данных **IDBDatabase**, в которой происходит транзакция

^^Для того, чтобы транзакция оставалась активной,^^
^^ее нельзя прерывать какими-либо "внешними" асинхронными операциями^^
^^но можно делать сколько угодно запросов к базе данных или ее хранилищам^^

__________________________________

А теперь посмотрим, какие методы унаследовал интерфейс хранилища **IDBObjectStore**:

| add        | put           |
| get        | getAll        |
| delete     | clear         |
| count      |               |
| getKey     | getAllKeys    |
| openCursor | openKeyCursor |

Эти методы позволяют работать с данными в хранилище ( добавлять, удалять и обновлять, находить и считывать данные из хранилища )

___________________________________________________________

### ![ico-20 icon] Ключи записей

База данных - это способ организации данных как коллекции записей,
каждая из которых идентифицируется **_уникальным ключом_**

Сама запись может быть при этом чем угодно:
строкой, числом, массивом, объектом... это не суть важно
Важно, чтобы у нее был ключ, который ее однозначно идентифицирует

**Ключ записи** - это некое уникальное в пределах хранилища значение,
идентифицирующее запись и позволяющее извлечь запись из хранилища по ключу

Есть три варианта создания ключей для хранилища данных:

![ico-20 icon] задавать вручную каждый раз при добавлении записей в хранилище,
как мы и сделали в предыдущем примере

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const request = indexedDB.open('sampleDB', 4)

request.onupgradeneeded = event => {
  const db = event.target.result
  const store = db.createObjectStore('secondStore')
  Object.assign(store.put({ name: 'Google' }, 'firstRecord'), {
    onsuccess: event => console.log(event.target.result),
    onerror: event => console.warn(event.target.error)
  })
}
~~~

Если теперь заглянуть во вкладку **Application** Chrome DevTools,
то мы увидим новое хранилище **secondStore** в базе данных **sampleDB**,
а в нем:

| # | Key            | Value                      |
| 0 | "firstRecord"  | ► { name: "Google" }       |

Мы создали первую запись в хранилище **secondStore** базы данных **sampleDB**

Эта запись представляет собой пару ~Key~ | ~Value~ ( ключ - значение )

Первым аргументом при вызове метода **put** мы передали ~Value~ ( объект ),
а вторым аргументом - значение ключа записи

____________________________

![ico-20 icon] установить при создании хранилища значение ~true~ опции **autoIncrement**,
тогда для всех добавляемых в хранилище записей будут автоматически генерироваться
уникальные целочисленные ключи

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const createUsersDB = users => new Promise((resolve, reject) => Object.assign(indexedDB.open('usersDB'), {
  onupgradeneeded: event => {
    const store = event.target.result
      .createObjectStore('userStore', { autoIncrement: true })

    users.forEach(user => store.put(user))
  },
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

Для начала нужно получить данные в массив **users** с удаленного сервера,
после чего можно вызывать функцию **createUsersDB**

~~~js
async function callUsers () {
  const users = await (await fetch('https://garevna-json-server.glitch.me/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

Заглянем во вкладку **Application** Chrome DevTools,
в хранилище **userStore** базы данных **usersDB**:

**userStore**

| # | Key | Value                                                              |
| 0 | 1   | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |
| 1 | 2   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |

_________________________________________

![ico-20 icon] использовать один из ключей ( свойств ) объекта, добавляемого в хранилище,
в качестве ключа записи
Для этого нужно при создании хранилища установить значение опции **~keyPath~**

если записи в хранилище будут объектами с определенным набором свойств, например:

~~~js
{
  login: ...,
  userName: ...,
  ...
}
~~~

то одно из этих свойств можно использовать в качестве ключа:

~~~js
const createStore = function (db, storeName) {
  ...
  return db.createObjectStore(storeName, { keyPath: 'login' })
}
~~~

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const createUsersDB = users => new Promise((resolve, reject) => Object.assign(indexedDB.open('usersDB'), {
  onupgradeneeded: event => {
    const store = event.target.result
      .createObjectStore('userStore', { keyPath: 'name' })
    users.forEach(user => store.put(user))
  },
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))

async function callUsers () {
  const users = await (await fetch('https://garevna-json-server.glitch.me/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

Заглянем во вкладку **Application** Chrome DevTools,
в хранилище **userStore** базы данных **usersDB**:

**userStore**

| # | Key       | Value                                                              |
| 0 | "Andry"   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |
| 1 | "Stephan" | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |

__________________________________________________________________________

### ![ico-20 icon] objectStoreNames

Имена всех хранилищ базы данных находятся в собственном свойстве **objectStoreNames** экземпляра **IDBDatabase**
Заглянем "под капот" объекта **objectStoreNames**:

~~~console
▼ DOMStringList {length: 0}
    length: 0
  ▼ __proto__: DOMStringList
      ► contains: ƒ contains()
      ► item: ƒ item()
        length: (...)
      ► constructor: ƒ DOMStringList()
        Symbol(Symbol.iterator): ƒ values()
        Symbol(Symbol.toStringTag): "DOMStringList"
      ► get length: ƒ length()
      ► __proto__: Object
~~~

Метод **contains** проверяет наличие в базе данных хранилища, имя которого указано аргументом:

~~~js
DB.objectStoreNames.contains( "lessonStore" )  // false
~~~

т.е. в нашей базе данных нет хранилища с именем **lessonStore**

Создадим промисифицированную версию запроса на открытие базы данных:

◘◘![ico-20 cap] ** 5**◘◘

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => Object.assign(indexedDB.open(nameDB, verDB), {
  onupgradeneeded: event => resolve(event.target.result),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

Объявим функцию **_createStore_**,
которая проверяет наличие в базе данных хранилища с указанным именем,
и если такого нет, то создает его:

~~~js
const createStore = function (db, storeName) {
  if (!db || !db instanceof IDBFactory) {
    console.error('Database is not defined')
    return null
  }
  if (db.objectStoreNames.contains(storeName)) {
    console.warn(`Store ${storeName} already exists`)
    return null
  }
  return db.createObjectStore(storeName)
}
~~~

Теперь объявим переменную **DB**, в которой будет храниться ссылка на интерфейс **IDBDatabase**,
переменную **lessonStore**, в которой будет храниться ссылка на хранилище,
и вызовем **_openDB_**:

~~~js
let db, lessonStore

const resolve = event => {
  db = event.target.result
  lessonStore = createStore(event.target.result, 'lessonStore')
}

const reject = event => console.warn(event.target.error)) || null

openDB('keywordsDB', 1).then(resolve, reject)
~~~

^^^[DOMException]

Если теперь попробовать создать еще одно хранилище без изменения версии базы данных:

~~~js
openDB('keywordsDB', 1)
  .then(event => event.target.result.createObjectStore('topicStore'), event => console.warn(event.target.error) || null)
~~~

то мы получим исключение:

••![ico-20 error] DOMException: Failed to execute 'createObjectStore' on 'IDBDatabase': The database is not running a version change transaction.••

![ico-20 warn] Чтобы добавить новое хранилище, увеличим номер версии БД:

~~~js
let topicStore
const callback = { topicStore = event.target.result.createObjectStore('topicStore') }

openDB('keywordsDB', 2)
  .then(callback, event => console.warn(event.target.error))
~~~

^^^

_____________________________________________________

### ![ico-20 icon] deleteObjectStore

Удалим хранилище **topicStore**
Для этого нужно открыть соединение с базой данных с более высоким номером версии,
чтобы автоматически было создана транзакция типа ~versionchange~

◘◘![ico-20 cap] ** 6**◘◘

~~~js
indexedDB.open('keywordsDB', 3)
  .onupgradeneeded = event => event.target.result.deleteObjectStore('topicStore')
~~~

Теперь создадим его заново, но с ключом **topic**

~~~js
indexedDB.open('keywordsDB', 4)
  .onupgradeneeded = event => { store = event.target.result.createObjectStore('topicStore, { keyPath: 'topic' }) }
~~~

Создадим массив данных, которые будем записывать в хранилище **topicStore**

~~~~js
const topics = [
  {
    topic: Google",
    content: 'About',
    picture: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
  },
  {
    topic: 'Google',
    content: 'Products',
    picture: 'https://sm.ign.com/ign_sr/screenshot/default/6546_jec8.jpg'
  },
  {
    topic: 'Mozilla',
    content: 'About',
    picture: 'https://www.mozilla.org/media/img/mozorg/mozilla-256.4720741d4108.jpg'
  },
  {
    topic: 'Mozilla',
    content: 'Products',
    picture: 'http://www.brandemia.org/sites/default/files/inline/images/mozilla_nuevo_logo_despues.jpg'
  }
]
~~~~

Теперь выполним следующий код:

~~~js
indexedDB.open('keywordsDB')
  .onsuccess = event => {
    const store = event.target.result
      .transaction(['lessonStore', 'topicStore'], 'readwrite')
      .objectStore('topicStore')
    topics.forEach(item => store.put(item))
  }
~~~

Перейдите во вкладку **Application** дебаггера Chrome DevTools и посмотрите на результат
Записи с одинаковым значением ключа не дублируются, а перезаписывают друг друга
Т.е. значения ключей должны быть уникальными

_________________________________________________
