# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] transaction

^^Переход к интерфейсу "третьего уровня"^^
|                | _open_                |                 | _transaction_         |                    |
| **IDBFactory** | ![ico-25 arrow-right] | **IDBDatabase** | ![ico-25 arrow-right] | **IDBObjectStore** |

Посмотрим на конструктор транзакций в консоли:

~~~js
console.dir(IDBTransaction)
~~~

~~~~console
▼ ƒ IDBTransaction()
    arguments: null
    caller: null
    length: 0
    name: "IDBTransaction"
  ▼ prototype: IDBTransaction
      ► abort: ƒ abort()
      ► commit: ƒ commit()
        db: (...)
        error: (...)
        mode: (...)
      ► objectStore: ƒ objectStore()
        objectStoreNames: (...)
        onabort: (...)
        oncomplete: (...)
        onerror: (...)
      ► constructor: ƒ IDBTransaction()
        Symbol(Symbol.toStringTag): "IDBTransaction"
      ► get db: ƒ db()
      ► get error: ƒ error()
      ► get mode: ƒ mode()
      ► get objectStoreNames: ƒ objectStoreNames()
      ► get onabort: ƒ onabort()
      ► set onabort: ƒ onabort()
      ► get oncomplete: ƒ oncomplete()
      ► set oncomplete: ƒ oncomplete()
      ► get onerror: ƒ onerror()
      ► set onerror: ƒ onerror()
      ► __proto__: EventTarget
  ► __proto__: ƒ EventTarget()
~~~~

Транзакция - это объект:

| Свойства             |                                                                                                     |
| **db**               | ссылка на базу данных, в которой выполняется транзакция                                             |
| **objectStoreNames** | перечень хранилищ, с которыми можно работать в пределах данной транзакции                           |
| **mode**             | тип транзакции ( readonly - только чтение, readwrite - чтение и запись )                            |
| Методы               |                                                                                                     |
| **objectStore**      | возвращает ссылку на хранилище, имя которого указано аргументом                                     |
| **abort**            | прерывает выполнение транзакции с откатом всех изменений                                            |
| События              |                                                                                                     |
| **complete**         | все запросы в пределах транзакции благополучно завершены                                            |
| **error**            | один из запросов в пределах транзакции завершился с ошибкой, или транзакция не может быть завершена |
| **abort**            | текущая транзакция была прервана с помощью метода **abort**                                         |

^^Свойства **objectStoreNames** и **mode** транзакции устанавливаются при ее создании^^
___________________________________________________________

### ![ico-20 icon] Транзакция versionchange

Эта транзакция не может быть создана нами
Она создается автоматически при подключении к базе данных
В рамках транзакции **versionchange** можно удалять и создавать хранилища и индексы

^^Давайте посмотрим на примере, как использовать транзакцию **versionchange** для удаления индексов хранилища^^

^^Воспользуемся базой данных **users**, которую мы создали в примере 1 темы "Индексы"^^

~~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  Object.assign(indexedDB.open('users'), {
    onupgradeneeded: function (event) {
      if (event.target.result.objectStoreNames.contains('userStore')) {
        return event.target.result.objectStore('userStore')
      }
      const store = event.target.result
        .createObjectStore('userStore, { autoIncrement: true })
        .createIndex('nameIndex', 'name', { unique: false })
        .objectStore
        .createIndex('hobbyIndex', 'hobby', { unique: false, multiEntry: true })
        .objectStore

      users.forEach(user => store.put(user))
    },
    onsuccess: event => resolve(event.target.result),
    onerror: event => reject(event.target.error)
  })
})

async function callUsers () {
  const users = await (await fetch('https://garevna-json-server.glitch.me/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~~

Если база данных **users** еще не существует,
после создания запроса на подключение номер версии базы данных **users** будет 1
Запрос всегда содержит ссылку на транзакцию, в рамках которой он создан
Эта ссылка находится в свойстве **transaction** объекта запроса
Объект транзакции имеет метод **objectStore**,
с помощью которого можно получить ссылку на интерфейс хранилища,
если это хранилище "охвачено" транзакцией
Поскольку транзакция **versionchange** является самой "мощной", или самой "обширной" по возможностям,
она "охватывает" все хранилища базы данных

______________________________________________

#### ![ico-20 icon] deleteIndex

Напилим функцию, которая делает запрос на соединение с базой данных по ее имени и номеру версии,
и в случае апгрейда возвращает ссылку на хранилище, имя которого передано третьим аргументом:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const openDB = (dbName, ver, storeName) => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName, ver), {
  onupgradeneeded: event => resolve(event.target.transaction.objectStore(storeName)),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

Функция **openDB** возвращает промис, который резолвится:
• если мы открываем текущую версию базы данных, то ссылкой на интерфейс **IDBDatabase**
• в противном случае - ссылкой на интерфейс **IDBObjectStore**

Сделаем запрос на соединение с версией 2 базы данных **users**:

~~~js
openDB('users', 2, 'userStore')
  .then(response => console.log(response))
~~~

В консоли мы получили объект хранилища **userStore**:

~~~console
▼ IDBObjectStore {name: "userStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: true}
    autoIncrement: true
  ► indexNames: DOMStringList {0: "hobbyIndex", 1: "nameIndex", length: 2}
    keyPath: null
    name: "userStore"
  ► transaction: IDBTransaction {objectStoreNames: DOMStringList, mode: "versionchange", db: IDBDatabase, error: null, onabort: null, …}
  ► __proto__: IDBObjectStore
~~~

________________________________________________

Давайте удалим индекс **hobbyIndex**:

~~~js
openDB('users', 3, 'userStore')
  .then(store =>  store instanceof IDBObjectStore && store.deleteIndex('hobbyIndex')
)
~~~

^^Аналогично можно создавать индексы^^

___________________________________________

Итак, транзакция типа **versionchange** идет с самого верхнего уровня (**IDBFactory**) и до самого нижнего уровня (**IDBObjectStore**)
она охватывает все хранилища базы данных
и все операции интерфейсов как второго (**IDBDatabase**), так и третьего (**IDBObjectStore**) уровня

т.е. можно сказать, что это самая "мощная" транзакция ![ico-20 smile]
_____________________________________________

### ![ico-20 icon] Метод transaction

Метод **~transaction~** интерфейса **IDBDatabase** дает возможность создать объект транзакции,
т.е. обеспечить доступ к интерфейсу "третьего уровня" **IDBObjectStore**  

Пока транзакция активна, мы можем создавать сколько угодно запросов
Транзакция будет асинхронным "контейнером" для этих асинхронных запросов
Каждый запрос завершается либо удачно ( событие **success** ), либо нет ( событие **error** )
Транзакция "контролирует" ситуацию, поскольку "ловит" все эти события на всплытии
___________________________

^^Можно провести аналогию с элементами в контейнере,^^
^^когда обработчики события ( например, click ) есть как у элементов в контейнере, так и у самого контейнера^^
^^Что происходит, когда юзер кликает на элементе в контейнере? - событие всплывает,^^
^^т.е. контейнер тоже отреагирует на событие click любого вложенного элемента^^
_________________________________

^^Что касается транзакции, если хотя бы один из запросов сыграет в ящик ( **error** ),^^
^^и вы не "поймаете" исключение до того, как его поймает колбэк **onerror** транзакции,^^
^^то произойдет событие **abort** объекта транзакции, транзакция "откатится" назад,^^
^^т.е. все выполненные до этого момента запросы в пределах транзакции будут аннулированы^^
________________________________

При создании объекта транзакции методу **transaction** нужно передать два аргумента:

![ico-20 green-ok] массив имен хранилищ, которые будут задействованы в транзакции
( значение свойства **~objectStoreNames~** объекта транзакции )

![ico-20 green-ok] тип транзакции
(значение свойства **~mode~** объекта транзакции)

Транзакции уровня интерфейса **IDBDatabase** бывают двух типов:

• **readonly** (только чтение)
• **readwrite** (чтение и запись)

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________

#### ![ico-20 icon] get

Вернемся к исходному состоянию базы данных **users** из предыдущего примера,
т.е. к версии 1 с одним хранилищем и двумя индексами

"Вытянем" из хранилища **users** запись по ключу 2:

◘◘![ico-20 cap] ** 2**◘◘

~~~js
indexedDB.open('users').onsuccess = event => {
  const store = event.target.result
    .transaction(['userStore'])
    .objectStore('userStore')
  const request = Object.assign(store.get(2), {
    onsuccess: event => console.log(event.target.result),
    onerror: event => console.warn(event.target.error)
  })
}
~~~

В результате выполнения запроса в консоли мы увидим:

~~~console
▼ {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}
    birthYear: 1998
  ► family: {mother: {…}, father: {…}}
  ► hobby: ["dancing"]
    name: "Andry"
  ► __proto__: Object
~~~

__________________________________________________

#### ![ico-20 icon] add

Создадим объект **user**:

~~~js
const user = {
  name: 'Piter',
  birthYear: 2001,
  family: {
    father: {
      birthYear: 1980,
      name: 'Philip',
      speciality: 'worker',
    },
    mother: {
      birthYear: 1981,
      name: 'Jane',
      speciality: 'painter'
    }
  },
  hobby: ['travelling', 'fishing']
}
~~~

и добавим нового юзера в базу данных:
( при создании транзакции нужно установить режим **~readwrite~** )

◘◘![ico-20 cap] ** 3**◘◘

~~~js
indexedDB.open('users')
  .onsuccess = event => {
    const store = event.target.result
      .transaction(['userStore'], 'readwrite')
      .objectStore('userStore')
    const request = Object.assign(store.add(user), {
      onsuccess: event => console.log(event.target.result),
      onerror: event => console.warn(event.target.error)
    })
  }
~~~

В консоли мы увидим ключ добавленной записи (3)

__________________________________________________

#### ![ico-20 icon] getAll

◘◘![ico-20 cap] ** 4**◘◘

~~~js
indexedDB.open('users').onsuccess = event => {
  const store = event.target.result
    .transaction(['userStore'], 'readwrite')
    .objectStore('userStore')
  const request = Object.assign(store.getAll(), {
    onsuccess: event => console.log(event.target.result),
    onerror: event => console.warn(event.target.error)
  })
}
~~~

В консоли мы увидим

~~~console
▼  (3) [{…}, {…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}
  ► 2: {name: "Piter", birthYear: 2001, family: {…}, hobby: Array(2)}
    length: 3
  ► __proto__: Array(0)
~~~

_____________________________________________________

#### ![ico-20 icon] delete

Теперь удалим запись с ключом 2, используя метод **delete** хранилища
( при создании транзакции нужно установить режим **~readwrite~** )

◘◘![ico-20 cap] ** 5**◘◘

~~~js
indexedDB.open('users')
  .onsuccess = event => {
    const store = event.target.result
       .transaction(['userStore'], 'readwrite')
       .objectStore('userStore')
    const request = Object.assign(store.delete(2), {
      onsuccess: event => console.log(event.target.result),
      onerror: event => console.warn(event.target.error)
    })
  }
~~~

____________________________________________________

### ![ico-20 icon] Интерфейс IDBIndex

Для получения ссылки на объект индекса хранилища по его имени
интерфейс **IDBObjectStore**
предоставляет нам метод **~index~**

◘◘![ico-20 cap] ** 6**◘◘

~~~js
indexedDB.open('users').onsuccess = event => {
  const index = event.target.result
    .transaction(['userStore'], 'readwrite')
    .objectStore('userStore')
    .index('hobbyIndex')
  console.log(index)
}
~~~

В переменной **index** мы получили ссылку на объект интерфейса **IDBIndex**:

~~~console
▼ IDBIndex {name: "hobbyIndex", objectStore: IDBObjectStore, keyPath: "hobby", multiEntry: true, unique: false}
    keyPath: "hobby"
    multiEntry: true
    name: "hobbyIndex"
  ► objectStore: IDBObjectStore {name: "userStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: true}
    unique: false
  ► __proto__: IDBIndex
~~~

Как мы уже знаем, у этого объекта есть унаследованные методы **count**, **get**, **getAll**, **getKey**, **getAllKeys**, **openCursor** и **openKeyCursor**

Для того, чтобы лучше изучить работу этого интерфейса, добавим еще несколько записей в базу данных, у которых в массиве **hobby** будет значение **footbal**

~~~js
const user = {
  name: 'Иван',
  birthYear: 2004,
  family: {
    father: {
      birthYear: 1981,
      name: 'Василий',
      speciality: 'безработный',
    },
    mother: {
      birthYear: 1982,
      name: 'Маргарита',
      speciality: 'швея'
    }
  },
  hobby: ['fishing', 'footbal']
}

indexedDB.open('users').onsuccess = event => {
  const store = event.target.result
    .transaction(['userStore'], 'readwrite')
    .objectStore('userStore')
  const request = Object.assign(store.add(user), {
    onsuccess: event => console.log(event.target.result),
    onerror: event => console.warn(event.target.error)
  })
}
~~~

**hobbyIndex**

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-index-2.png)

Когда ссылка на объект индекса "в наших руках", мы можем воспользоваться интерфейсом этого объекта

Напилим функцию **getDataByIndex**

~~~js
const **getDataByIndex** = (indexName, method, keyVal) => indexedDB.open('users')
  .onsuccess = event => {
    const index = event.target.result
      .transaction(['userStore'], 'readwrite')
      .objectStore('userStore')
      .index(indexName)
    Object.assign(index[method](keyVal), {
      onsuccess: event => console.log(event.target.result),
      onerror: event => console.warn(event.target.error)
    })
  }
~~~

Эта функция принимает три агрумента:
• имя объекта индекса
• метод интерфейса **IDBIndex**
• значение ключа индекса, по которому будут выбираться данные их хранилища

____________________________

Используем метод **get** интерфейса **IDBIndex**
для получения _первой_ из всех записей в хранилище **userStore**,
в которых в массиве **hobby** есть значение **footbal**:

◘◘![ico-20 cap] ** 7**◘◘

~~~js
getDataByIndex('hobbyIndex', 'get', 'footbal')
~~~

В консоли мы увидим:

~~~console
▼ {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
    birthYear: 1995
  ► family: {mother: {…}, father: {…}}
  ► hobby: (2) ["footbal", "fishing"]
    name: "Stephan"
  ► __proto__: Object
~~~

____________________________

А теперь используем метод **getAll** интерфейса **IDBIndex**
для получения всех записей в хранилище **userStore**,
у которых в массиве **hobby** есть значение **footbal**:

◘◘![ico-20 cap] ** 8**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAll', 'footbal')
~~~

В консоли мы увидим:

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Иван", birthYear: 2004, family: {…}, hobby: Array(2)}
    length: 2
  ► __proto__: Array(0)
~~~
____________________________

Получим **ключ** первой из всех записей в хранилище **userStore**,
в которых в массиве **hobby** есть значение **footbal**:

◘◘![ico-20 cap] ** 9**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getKey', 'footbal')
~~~

В консоли мы увидим число 1 - это ключ записи
____________________________________________________

С помощью метода **getAllKeys** интерфейса **IDBIndex**
получим ключи всех записей в хранилище **userStore**,
в которых в массиве **hobby** есть значение **footbal**:

◘◘![ico-20 cap] **10**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAllKeys', 'footbal')
~~~

В консоли мы увидим ключи:

~~~console
▼ (2) [1, 4]
~~~

________________________________________