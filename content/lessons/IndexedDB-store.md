# ![ico-30 study] indexedDB

____________________________________________________________

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
| **IDBFactory**              | ![ico-20 green-ok] |
| **IDBDatabase**             | ![ico-20 negation] |

{{s1.p14}}
{{s1.p15}}

{{s1.p16}}
{{s1.p17}}
_______________________________

{{s1.p18}}
{{s1.p19}}
{{s1.p20}}
{{s1.p21}}

{{s1.p22}}
{{s1.p23}}
{{s1.p24}}

{{s1.p25}}
{{s1.p26}}

{{s1.p27}}
{{s1.p28}}
{{s1.p29}}
{{s1.p30}}

{{s1.p31}}

{{s1.p32}}
{{s1.p33}}
{{s1.p34}}
{{s1.p35}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________________________

### ![ico-25 icon] {{s2.h1}}

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

~~~js
const request = indexedDB.open('sampleDB')

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{s2.p15}}

{{s2.p16}}

~~~js
const request = indexedDB.open('sampleDB', 2)

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{s2.p17}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3-1.gif)

______________________________________________________

### ![ico-20 icon] createObjectStore

{{s2.p18}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 3)

request.onupgradeneeded = event => {
  const db = event.target.result
  const store = db.createObjectStore('firstStore')
  console.log(store)
}
~~~

{{s2.p19}}

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

{{s2.p20}}
{{s2.p21}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3.gif)

{{s2.p22}}
{{s2.p23}}
{{s2.p24}}
{{s2.p25}}

{{s2.p26}}

• **~autoIncrement~**
• **~keyPath~**

{{s2.p27}}

• **~indexNames~**

{{s2.p28}}
{{s2.p29}}

• **~transaction~**

{{s2.p30}}

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

{{s2.p31}}
{{s2.p32}}
{{s2.p33}}

{{s2.p34}}

{{s2.p35}}
{{s2.p36}}
{{s2.p37}}

{{s2.p38}}
{{s2.p39}}
{{s2.p40}}

__________________________________

{{s2.p41}}

| add        | put           |
| get        | getAll        |
| delete     | clear         |
| count      |               |
| getKey     | getAllKeys    |
| openCursor | openKeyCursor |

{{s2.p42}}

___________________________________________________________

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

{{s3.p11}}
{{s3.p12}}
{{s3.p13}}

| # | Key            | Value                      |
| 0 | "firstRecord"  | ► { name: "Google" }       |

{{s3.p14}}

{{s3.p15}}

{{s3.p16}}
{{s3.p17}}

____________________________

{{s3.p18}}
{{s3.p19}}
{{s3.p20}}

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

{{s3.p21}}
{{s3.p22}}

~~~js
async function callUsers () {
  const users = await (await fetch('https://garevna-json-server.glitch.me/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

{{s3.p23}}
{{s3.p24}}

**userStore**

| # | Key | Value                                                              |
| 0 | 1   | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |
| 1 | 2   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |

_________________________________________

{{s3.p25}}
{{s3.p26}}
{{s3.p27}}

{{s3.p28}}

~~~js
{
  login: ...,
  userName: ...,
  ...
}
~~~

{{s3.p29}}

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

{{s3.p30}}
{{s3.p31}}

**userStore**

| # | Key       | Value                                                              |
| 0 | "Andry"   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |
| 1 | "Stephan" | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |

__________________________________________________________________________

### ![ico-20 icon] objectStoreNames

{{s3.p32}}
{{s3.p33}}

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

{{s3.p34}}

~~~js
DB.objectStoreNames.contains( "lessonStore" )  // false
~~~

{{s3.p35}}

{{s3.p36}}

◘◘![ico-20 cap] ** 5**◘◘

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => Object.assign(indexedDB.open(nameDB, verDB), {
  onupgradeneeded: event => resolve(event.target.result),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{s3.p37}}
{{s3.p38}}
{{s3.p39}}

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

{{s3.p40}}
{{s3.p41}}
{{s3.p42}}

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

{{s3.p43}}

~~~js
openDB('keywordsDB', 1)
  .then(event => event.target.result.createObjectStore('topicStore'), event => console.warn(event.target.error) || null)
~~~

{{s3.p44}}

••![ico-20 error] DOMException: Failed to execute 'createObjectStore' on 'IDBDatabase': The database is not running a version change transaction.••

{{s3.p45}}

~~~js
let topicStore
const callback = { topicStore = event.target.result.createObjectStore('topicStore') }

openDB('keywordsDB', 2)
  .then(callback, event => console.warn(event.target.error))
~~~

^^^

_____________________________________________________

### ![ico-20 icon] deleteObjectStore

{{s3.p46}}
{{s3.p47}}
{{s3.p48}}

◘◘![ico-20 cap] ** 6**◘◘

~~~js
indexedDB.open('keywordsDB', 3)
  .onupgradeneeded = event => event.target.result.deleteObjectStore('topicStore')
~~~

{{s3.p49}}

~~~js
indexedDB.open('keywordsDB', 4)
  .onupgradeneeded = event => { store = event.target.result.createObjectStore('topicStore, { keyPath: 'topic' }) }
~~~

{{s3.p50}}

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

{{s3.p51}}

~~~js
indexedDB.open('keywordsDB')
  .onsuccess = event => {
    const store = event.target.result
      .transaction(['lessonStore', 'topicStore'], 'readwrite')
      .objectStore('topicStore')
    topics.forEach(item => store.put(item))
  }
~~~

{{s3.p52}}
{{s3.p53}}
{{s3.p54}}

_________________________________________________
