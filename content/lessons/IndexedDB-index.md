# ![ico-30 study] {{s1.h1}}

______________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

{{s2.p12}}
{{s2.p13}}
{{s2.p14}}
{{s2.p15}}


{{s2.p16}}

~~~js
console.dir(IDBIndex)
~~~

{{s2.p17}}

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

{{s2.p18}}

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}
{{s2.p22}}
{{s2.p23}}
{{s2.p24}}
{{s2.p25}}

{{s2.p26}}

_______________________________

{{s2.p27}}

{{s2.p28}}
{{s2.p29}}
{{s2.p30}}
{{s2.p31}}

___________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}
{{s3.p13}}
{{s3.p14}}

{{s3.p15}}

____________________________________________________________________

{{s3.p16}}

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

{{s3.p17}}
{{s3.p18}}
{{s3.p19}}
{{s3.p20}}
{{s3.p21}}
{{s3.p22}}
{{s3.p23}}
{{s3.p24}}
{{s3.p25}}
{{s3.p26}}
{{s3.p27}}
{{s3.p28}}

{{s3.p29}}
{{s3.p30}}

{{s3.p31}}
{{s3.p32}}

{{s3.p33}}

{{s3.p34}}

{{s3.p35}}
{{s3.p36}}
{{s3.p37}}

{{s3.p38}}

{{s3.p39}}
{{s3.p40}}
{{s3.p41}}

{{s3.p42}}

{{s3.p43}}
{{s3.p44}}
{{s3.p45}}

________________________________________

#### {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}

~~~js
const createUsersDB = users => new Promise((resolve, reject) => {
  ...
    .objectStore
      .createIndex('hobbyIndex', 'hobby', { unique: false, multiEntry: true })
  ...
})
...
~~~

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}

{{s4.p10}}

___________________________________________________________

{{s4.p11}}

{{s4.p12}}
{{s4.p13}}
{{s4.p14}}

{{s4.p15}}

~~~js
fetch('https://garevna-json-server.glitch.me/lessons')
  .then(response => response.json())
  .then(response => console.log(response))
~~~


{{s4.p16}}

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

{{s4.p17}}

{{s4.p18}}

{{s4.p19}}

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

{{s4.p20}}
{{s4.p21}}
{{s4.p22}}
{{s4.p23}}
{{s4.p24}}

~~~js
let DB, data, lessonStore, topicStore
~~~

{{s4.p25}}
{{s4.p26}}

{{s4.p27}}
{{s4.p28}}
{{s4.p29}}
{{s4.p30}}

{{s4.p31}}

{{s4.p32}}

{{s4.p33}}

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

{{s4.p34}}
{{s4.p35}}
{{s4.p36}}

{{s4.p37}}

{{s4.p38}}
{{s4.p39}}
{{s4.p40}}
{{s4.p41}}
{{s4.p42}}

{{s4.p43}}
{{s4.p44}}
{{s4.p45}}
{{s4.p46}}

{{s4.p47}}

~~~js
function pushLesson (lesson) {
  const request = Object.assign(lessonStore.add({ lesson: lesson.id }), {
    onerror: event => console.warn(`Error ${event.target.error.name}: ${lesson.id}`),
    onsuccess: event => lesson.items.forEach(topic => pushTopic(event.target.result, topic))
  })
}
~~~

{{s4.p48}}
{{s4.p49}}
{{s4.p50}}
{{s4.p51}}
{{s4.p52}}
{{s4.p53}}

{{s4.p54}}
{{s4.p55}}
{{s4.p56}}

{{s4.p57}}
{{s4.p58}}
{{s4.p59}}
{{s4.p60}}
{{s4.p61}}
{{s4.p62}}
{{s4.p63}}
{{s4.p64}}
{{s4.p65}}

{{s4.p66}}

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

{{s4.p67}}
{{s4.p68}}

{{s4.p69}}

~~~js
async function createLessonsDB () {
  const data = await (await fetch('https://garevna-json-server.glitch.me/lessons')).json()
  openDB('lessonsDB').then(openDBCallback)
  data.forEach(lesson => pushLesson(lesson))
}

createLessonsDB ()
~~~

{{s4.p70}}
