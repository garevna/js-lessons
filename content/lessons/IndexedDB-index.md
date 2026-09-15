# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}

{{s1.p12}}
{{s1.p13}}
{{s1.p14}}
{{s1.p15}}


{{s1.p16}}

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

{{s1.p17}}

{{s1.p18}}

{{s1.p19}}
{{s1.p20}}
{{s1.p21}}
{{s1.p22}}
{{s1.p23}}

{{s1.p24}}

_______________________________

{{s1.p25}}

| **count**      |                   |
| **get**        | **getAll**        |
| **getKey**     | **getAllKeys**    |
| **openCursor** | **openKeyCursor** |

___________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

^^^[{{s2.spoiler1}}]
{{s2.p7}}
• **multiEntry** (true / false)
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}

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

^^^[{{s2.spoiler2}}]
{{s2.p13}}
{{s2.p14}}
{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}
{{s2.p19}}
{{s2.p20}}
{{s2.p21}}
{{s2.p22}}
{{s2.p23}}

{{s2.p24}}
{{s2.p25}}

{{s2.p26}}
{{s2.p27}}

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

{{s2.p28}}
{{s2.p29}}
{{s2.p30}}

~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  ...
    .objectStore
      .createIndex('hobbyIndex', 'hobby', { unique: false, multiEntry: true })
  ...
})
...
~~~

{{s2.p31}}

**hobbyIndex**

| # | Key(keyPath:"hobby") | Primary key | Value                                                                 |
| 0 | "dancing"            | 2           | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |
| 1 | "fising"             | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |
| 1 | "footbal"            | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |

{{s2.p32}}

___________________________________________________________

{{s2.p33}}

{{s2.p34}}
{{s2.p35}}
{{s2.p36}}

{{s2.p37}}

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

^^^[{{s2.spoiler3}}]

{{s2.p38}}

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

{{s2.p39}}
{{s2.p40}}
{{s2.p41}}
{{s2.p42}}
{{s2.p43}}

~~~js
let DB, data, lessonStore, topicStore
~~~

{{s2.p44}}
{{s2.p45}}

{{s2.p46}}
{{s2.p47}}
{{s2.p48}}
{{s2.p49}}

{{s2.p50}}

{{s2.p51}}

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

{{s2.p52}}
{{s2.p53}}
{{s2.p54}}

{{s2.p55}}

{{s2.p56}}
{{s2.p57}}
{{s2.p58}}
{{s2.p59}}
{{s2.p60}}

{{s2.p61}}
{{s2.p62}}
{{s2.p63}}
{{s2.p64}}

◘◘**pushLesson**◘◘

~~~js
function pushLesson (lesson) {
  const request = Object.assign(lessonStore.add({ lesson: lesson.id }), {
    onerror: event => console.warn(`Error ${event.target.error.name}: ${lesson.id}`),
    onsuccess: event => lesson.items.forEach(topic => pushTopic(event.target.result, topic))
  })
}
~~~

{{s2.p65}}
{{s2.p66}}
{{s2.p67}}
{{s2.p68}}
{{s2.p69}}
{{s2.p70}}

{{s2.p71}}
{{s2.p72}}
{{s2.p73}}

{{s2.p74}}
{{s2.p75}}
{{s2.p76}}
{{s2.p77}}
{{s2.p78}}
{{s2.p79}}
{{s2.p80}}
{{s2.p81}}
{{s2.p82}}

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

{{s2.p83}}
{{s2.p84}}

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
