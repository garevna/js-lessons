# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] Индекс

| ^^Итак, мы уже поняли, что при создании хранилища мы определяем, как будут идентифицироваться записи в хранилище по ключам:<br>либо ключи будут указываться каждый раз при записи данных,<br>либо мы предоставим это дело API, чтобы он автоматически генерировал уникальный целочисленный ключ для каждой записи ( в этом случае наше хранилище будет подобно массиву ),<br>либо мы укажем в свойстве ~keyPath~ имя одного из ключей записи базы данных ( в этом случае записи в хранилище должны быть объектами, каждый из которых просто обязан иметь такое свойство )^^ |

Однако один-единственный ключ сильно сужает наши возможности в плане поиска нужных данных
Тем более, что ключ записи обязательно должен быть уникальным
Нам нужно больше ключей,
мы хотим получить гибкий интерфейс доступа к записям в хранилищах

Для этого нужны специальные объекты - **индексы**

Каждый такой объект:

| ![ico-20 speach] | всегда связан с конкретным хранилищем базы данных |
| ![ico-20 speach] | является и сам хранилищем, но служебным ( обслуживающим определенное хранилище базы данных ) |
| ![ico-20 speach] | хранит упорядоченные ( отсортированные ) значения ключа и ссылку на запись с таким значением ключа |
| ![ico-20 speach] | допускает дублирующиеся значения ключей |

| ![ico-20 warn] | Каждый индекс имеет имя |
| ![ico-20 warn] | Для каждого ключа, по которому вы хотите индексировать хранилище, создается отдельный индекс |
| ![ico-20 warn] | Каждое хранилище может иметь несколько индексов |
| ![ico-20 warn] | Ссылка на хранилище, которое "обслуживает" индекс, находится в его свойстве **objectStore** |


Давайте посмотрим на объект индекса повнимательнее

~~~js
console.dir(IDBIndex)
~~~

^^^[IDBIndex]

~~~console
▼ ƒ IDBIndex()
    arguments: null
    caller: null
    length: 0
    name: "IDBIndex"
  ▼ prototype: IDBIndex
      ► count: ƒ count()
      ► get: ƒ ()
      ► getAll: ƒ getAll()
      ► getAllKeys: ƒ getAllKeys()
      ► getKey: ƒ getKey()
        keyPath: (...)
        multiEntry: (...)
        name: (...)
        objectStore: (...)
      ► openCursor: ƒ openCursor()
      ► openKeyCursor: ƒ openKeyCursor()
        unique: (...)
      ► constructor: ƒ IDBIndex()
        Symbol(Symbol.toStringTag): "IDBIndex"
      ► get keyPath: ƒ keyPath()
      ► get multiEntry: ƒ multiEntry()
      ► get name: ƒ name()
      ► set name: ƒ name()
      ► get objectStore: ƒ objectStore()
      ► get unique: ƒ unique()
      ► __proto__: Object
  ► __proto__: ƒ ()
~~~

^^^

Мы видим в свойстве ~prototype~:

Вычисляемые свойства:

| **name**        | ~string~  | имя индекса |
| **keyPath**     | ~string~  | имя ключевого поля, по которому будет индексироваться хранилище |
| **unique**      | ~boolean~ | должен ли ключ быть уникальным |
| **multiEntry**  | ~boolean~ | если ключ является массивом, использовать ли каждый элемент массива как отдельный ключ |
| **objectStore** | ~string~  | хранилище, которое обслуживает индекс |

^^Их значения будут установлены в момент создания индекса^^

_______________________________

Унаследованные методы экземпляра **IDBIndex** частично "перекрывают" унаследованные методы экземпляра **IDBObjectStore**:

| **count**      |                   |
| **get**        | **getAll**        |
| **getKey**     | **getAllKeys**    |
| **openCursor** | **openKeyCursor** |

___________________________________________

### ![ico-20 icon] Создание индексов

Создать индекс можно с помощью метода хранилища **createIndex**

![ico-20 green-ok] Первый аргумент метода **createIndex** - это имя индекса,
![ico-20 green-ok] Второй аргумент - это имя ключа, значения которого буду храниться в объекте индекса
^^(это будет значением свойства **keyPath** индекса)^^
^^имя ключа - это имя свойства объекта ( записи ) в хранилище, которое обслуживает индекс^^
![ico-20 green-ok] Третий аргумент - объект опций:

^^^[Опции]
• **unique** (true / false) - должно ли значение ключа быть уникальным
• **multiEntry** (true / false)
^^для ситуаций, когда ключ (**~keyPath~**) является массивом ^^
^^если ~true~, в индекс будет добавлена запись для каждого элемента массива^^
^^если ~false~, то в индекс будет добавлена одна запись, содержащая массив^^
• **locale** - языковой стандарт, который будет использоваться при сортировке значений
^^(ну, сами понимаете, _en-US_ там, или _auto_, если хотите как в настройках юзера)^^

^^^

____________________________________________________________________

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  Object.assign(indexedDB.open('users'), {
    onupgradeneeded: function (event) {
      if (event.target.result.objectStoreNames.contains('userStore')) {
        return event.target.result.objectStore('userStore')
      }
        
      const store = event.target.result
        .createObjectStore('userStore', { autoIncrement: true })
        .createIndex('nameIndex', 'name', { unique: false })
        .objectStore
        .createIndex('hobbyIndex', 'hobby', { unique: false })
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
~~~

^^^[Описание]
Функция **createUsersDB** получает в качестве аргумента ссылку на масив **users**
и возвращает промис
Промис резолвится ссылкой на экземпляр интерфейса базы данных
При первом первом подключении к базе данных создается хранилище **userStore** с автоматической генерацией ключей записей
Эта операция возвращает ссылку на объект хранилища, поэтому можно сразу вызывать метод **createIndex**, что мы и делаем
в результате получаем ссылку на объект индекса, у которого есть свойство **objectStore** - ссылка на хранилище, которое обслуживает индекс
С помощью этой ссылки опять возращаемся к хранилищу, чтобы создать второй индекс
Итак, теперь у нас есть хранилище с двумя индексами: **nameIndex** и **hobbyIndex**
Из названия индексов понятно, что первый будет индексировать записи по ключу **name**, а второй - по ключу **hobby**,
( причем позже вы увидите, что свойство **hobby** - это массив )
Осталось добавить данные в хранилище **userStore** из массива **users**, ссылка на который получена аргументом

Для получения данных ( массива **users** ) нужно сделать запрос на сервер,
в результате которого мы также получим промис

Поэтому "заворачиваем" эти два промиса в асинхронную функцию **callUsers**
Осталось только вызывать **callUsers**

^^^

**userStore**

| # | Key | Value                                                               |
| 0 | 1   | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |
| 1 | 2   | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |

**nameIndex**

| # | Key(keyPath:"name") | Primary key | Value                                                                 |
| 0 | Andry               | 2           | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |
| 1 | Stephan             | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |

**hobbyIndex**

| # | Key(keyPath:"hobby")   | Primary key | Value                                                                 |
| 0 | ► ["dancing"]          | 2           | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |
| 1 | ► ["footbal","fising"] | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |

________________________________________

#### multiEntry

Удалите базу данных во вкладке **Application** Chrome DevTools
Повторим создание базы данных, но теперь внесем незначительные изменения в код предыдущего примера,
а именно - создадим второй индекс с опцией **multiEntry** (~true~):

~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  ...
    .objectStore
      .createIndex('hobbyIndex', 'hobby', { unique: false, multiEntry: true })
  ...
})
...
~~~

Теперь посмотрим на результат:

**hobbyIndex**

| # | Key(keyPath:"hobby") | Primary key | Value                                                                 |
| 0 | "dancing"            | 2           | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |
| 1 | "fising"             | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |
| 1 | "footbal"            | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |

![ico-20 warn] Теперь каждое значение из массива **hobby** входит в индекс отдельным ключом

___________________________________________________________

В нашем распоряжении есть endpoint: **~https://garevna-json-server.glitch.me/lessons~**

Задача:
создать базу данных с хранилищами **lessonStore** и **topicStore** с индексами
и поместить туда данные, полученные с удаленного сервера

^^Чтобы посмотреть структуру исходных данных, вы можете получить их и вывести в консоль:^^

~~~js
fetch('https://garevna-json-server.glitch.me/lessons')
  .then(response => response.json())
  .then(response => console.log(response))
~~~


◘◘![ico-20 cap] ** 2**◘◘

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => {
  const request = indexedDB.open(nameDB, verDB)
  request.onupgradeneeded = 
  request.onversionchange = request.onsuccess = event => resolve(event)
  request.onerror = event => reject(event.target.error.name)
})

let DB, data, lessonStore, topicStore

const openDBCallback = event => {
  DB = event.target.result

  lessonStore = DB.createObjectStore('lessonStore', { autoIncrement: true })
  lessonStore.createIndex('lesson', 'lesson', { unique: true })

  topicStore = DB.createObjectStore('topicStore', { autoIncrement: true })
  topicStore.createIndex('topic', 'topic', { unique: true })
  topicStore.createIndex('lesson', 'lesson', { unique: false })

  data.forEach(lesson => pushLesson(lesson))
}


function pushLesson (lesson) {
  const request = lessonStore.add({ lesson: lesson.id })
  request.onerror = event => console.warn ( `Error ${event.target.error.name}: ${lesson.id}` )
  request.onsuccess = event => {
    const lessonIndex = event.target.result
    lesson.items.forEach(topic => pushTopic(lessonIndex, topic))
  }
}

function pushTopic (lessonIndex, topic) {
  const request = topicStore.add({
    topic: topic.title,
    ref: topic.ref,
    lesson: lessonIndex
  })
  request.onerror = event => console.warn(`Error ${event.target.error.name}:\n${topic.title} (${lessonIndex})`)
  request.onsuccess = event => console.log(`success ${lessonIndex}: ${topic.title}`)
}


async function createLessonsDB () {
  data = await (await fetch('https://garevna-json-server.glitch.me/lessons')).json()
  openDB('lessonsDB').then(openDBCallback)
}

createLessonsDB()
~~~

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-index-1.gif)

^^^[Описание]

Для создания базы данных мы будем использовать промисифицированную функцию **openDB**:

◘◘**openDB**◘◘

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => {
  Object.assign(indexedDB.open(nameDB, verDB), {
    onupgradeneeded: event => resolve(event),
    onversionchange: event => resolve(event),
    onsuccess: event => resolve(event),
    onerror: event => reject(event.target.error.name)
  })
})
~~~

Теперь объявим переменные, в которых будут доступные для любого колбэка ссылки:
• на интерфейс базы данных ( переменная **DB** )
• на исходные данные, которые мы получим с удаленного сервера и будем помещать в базу данных ( переменная **data** )
• на хранилище **lessonStore** ( переменная **lessonStore** )
• на хранилище **topicStore** ( переменная **topicStore** )

~~~js
let DB, data, lessonStore, topicStore
~~~

В хранилище **lessonStore** будут простые объекты с одним свойством - **_lesson_** ( строка )
Там будет храниться значение свойства **id** объекта из массива **lessons**

В хранилище **topicStore** будут объекты со свойствами:
• **_topic_** (строка) - название темы
• **_ref_** (строка) - ссылка на файл темы
• **_lesson_** (индекс) - ссылка на запись в хранилище **lessonStore**

Ссылка на запись в хранилище **lessons** нужна, чтобы избежать дублирования строки **_lesson_** в каждой записи хранилища

Создадим колбэк-функцию, которая будет обработчиком события **~success~** объекта запроса на создание (открытие) базы данных:

◘◘**openDBCallback**◘◘

~~~js
const openDBCallback = event => {
  const db = event.target.result

  lessonStore = db.createObjectStore('lessonStore', { autoIncrement: true })
  lessonStore.createIndex('lesson', 'lesson', { unique: true })

  topicStore = db.createObjectStore('topicStore', { autoIncrement: true })
  topicStore.createIndex('topic', 'topic', { unique: true })
  topicStore.createIndex('lesson', 'lesson', { unique: false })
}
~~~

При открытии базы данных создаются хранилища **lessonStore** и **topicStore**
Записи в хранилищах будут иметь целочисленные ключи, значения которых будут генерироваться автоматически при добавлении записи
При добавлении новой записи в хранилище **lessonStore** будет автоматически генерироваться целочисленный ключ этой записи, значение которого можно использовать в качестве ссылки в записях хранилища **topicStore**

Для каждого хранилища с помощью метода **createIndex** создаются индексы

Для хранилища **lessonStore**:
Чтобы иметь возможность найти ключ записи в хранилище **lessonStore** по значению записи, создаем индекс **lesson**
Для хранилища **topicStore**:
Чтобы иметь возможность найти ключ записи в хранилище **topicStore** по значению свойства **topic** записи, создаем индекс **topic**
Чтобы иметь возможность найти записи в хранилище **topicStore** по значению свойства **lesson** записи, создаем индекс **lesson**

Последняя строчка функции **openDBCallback** итерирует массив **data**
( в котором к этому моменту уже должны быть данные, полученные с удаленного сервера )
и сохраняет каждый элемент массива **data** в базу данных
с помощью функции **pushLesson**:

◘◘**pushLesson**◘◘

~~~js
function pushLesson (lesson) {
  const request = Object.assign(lessonStore.add({ lesson: lesson.id }), {
    onerror: event => console.warn(`Error ${event.target.error.name}: ${lesson.id}`),
    onsuccess: event => lesson.items.forEach(topic => pushTopic(event.target.result, topic))
  })
}
~~~

Эта функция:
• получает в качестве аргумента текущий элемент массива **data**
(это объект со свойствами **id** и **items**)
• создает объект запроса на добавление новой записи в хранилище **lessonStore**
(запись будет содержать только свойство **id** элемента массива **data**)
• устанавливает колбэки запроса **onerror** и **onsuccess**

Когда запрос завершится успешно,
в его свойстве **result** будет уникальный целочисленный ключ добавленной записи,
который мы и сохраняем в переменной **lessonIndex** в колбэке **onsuccess** запроса

В хранилище **lessonStore** добавляется только свойство **id**,
но в исходном элементе массива **data** есть еще свойство **items**,
и это массив объектов
В колбэке **onsuccess** объекта запроса мы итерируем этот массив,
и для каждого элемента массива **items** вызываем функцию **pushTopic**
Цель - поместить элементы массива **items** в хранилище **topicStore**,
но каждой записи в хранилище **topicStore** добавить ссылку на запись в хранилище **lessonStore**
Поэтому при вызове функции **pushTopic** мы передаем ей первым аргументом значение переменной **lessonIndex**
Второй аргумент - очередной элемент массива **items**

◘◘**pushTopic**◘◘

~~~js
function pushTopic (lessonIndex, topic) {
  const request = topicStore.add({
    topic: topic.title,
    ref: topic.ref,
    lesson: lessonIndex
  })
  request.onerror = event => console.warn(`Error ${event.target.error.name}:\n${topic.title} (${lessonIndex})`)
  request.onsuccess = event => console.log(`success ${lessonIndex}: ${topic.title}`)
}
~~~

Осталось только получить данные с сервера и вызвать функцию **openDB**
Для этого создадим асинхронную функцию **createLessonsDB** и вызовем ее:

◘◘**createLessonsDB**◘◘

~~~js
async function createLessonsDB () {
  const data = await (await fetch('https://garevna-json-server.glitch.me/lessons')).json()
  openDB('lessonsDB').then(openDBCallback)
  data.forEach(lesson => pushLesson(lesson))
}

createLessonsDB ()
~~~

^^^
