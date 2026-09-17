# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}
{{p4}}
{{p5}}
{{p6}}

{{p7}}

{{p8}}

{{p9}}
{{p10}}
{{p11}}
{{p12}}

{{p13}}
{{p14}}
{{p15}}
{{p16}}


{{p17}}

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

{{p18}}

{{p19}}

{{p20}}
{{p21}}
{{p22}}
{{p23}}
{{p24}}

{{p25}}

_______________________________

{{p26}}

| **count**      |                   |
| **get**        | **getAll**        |
| **getKey**     | **getAllKeys**    |
| **openCursor** | **openKeyCursor** |

___________________________________________

### ![ico-20 icon] {{p27}}

{{p28}}

{{p29}}
{{p30}}
{{p31}}
{{p32}}
{{p33}}

^^^[{{p34}}]
{{p35}}
• **multiEntry** (true / false)
{{p36}}
{{p37}}
{{p38}}
{{p39}}
{{p40}}

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
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

^^^[{{p41}}]
{{p42}}
{{p43}}
{{p44}}
{{p45}}
{{p46}}
{{p47}}
{{p48}}
{{p49}}
{{p50}}
{{p51}}
{{p52}}

{{p53}}
{{p54}}

{{p55}}
{{p56}}

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

{{p57}}
{{p58}}
{{p59}}

~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  ...
    .objectStore
      .createIndex('hobbyIndex', 'hobby', { unique: false, multiEntry: true })
  ...
})
...
~~~

{{p60}}

**hobbyIndex**

| # | Key(keyPath:"hobby") | Primary key | Value                                                                 |
| 0 | "dancing"            | 2           | ► { name: "Andry",birthYear: 1998, family: {...}, hobby: Array(1) }   |
| 1 | "fising"             | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |
| 1 | "footbal"            | 1           | ► { name: "Stephan",birthYear: 1995, family: {...}, hobby: Array(2) } |

{{p61}}

___________________________________________________________

{{p62}}

{{p63}}
{{p64}}
{{p65}}

{{p66}}

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/lessons')
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
  data = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/lessons')).json()
  openDB('lessonsDB').then(openDBCallback)
}

createLessonsDB()
~~~


^^^[{{p67}}]

{{p68}}

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

{{p69}}
{{p70}}
{{p71}}
{{p72}}
{{p73}}

~~~js
let DB, data, lessonStore, topicStore
~~~

{{p74}}
{{p75}}

{{p76}}
{{p77}}
{{p78}}
{{p79}}

{{p80}}

{{p81}}

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

{{p82}}
{{p83}}
{{p84}}

{{p85}}

{{p86}}
{{p87}}
{{p88}}
{{p89}}
{{p90}}

{{p91}}
{{p92}}
{{p93}}
{{p94}}

◘◘**pushLesson**◘◘

~~~js
function pushLesson (lesson) {
  const request = Object.assign(lessonStore.add({ lesson: lesson.id }), {
    onerror: event => console.warn(`Error ${event.target.error.name}: ${lesson.id}`),
    onsuccess: event => lesson.items.forEach(topic => pushTopic(event.target.result, topic))
  })
}
~~~

{{p95}}
{{p96}}
{{p97}}
{{p98}}
{{p99}}
{{p100}}

{{p101}}
{{p102}}
{{p103}}

{{p104}}
{{p105}}
{{p106}}
{{p107}}
{{p108}}
{{p109}}
{{p110}}
{{p111}}
{{p112}}

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

{{p113}}
{{p114}}

◘◘**createLessonsDB**◘◘

~~~js
async function createLessonsDB () {
  const data = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/lessons')).json()
  openDB('lessonsDB').then(openDBCallback)
  data.forEach(lesson => pushLesson(lesson))
}

createLessonsDB ()
~~~

^^^
