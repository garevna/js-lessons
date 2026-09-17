# ![ico-30 study] indexedDB

____________________________________________________________

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
| **IDBFactory**              | ![ico-20 green-ok] |
| **IDBDatabase**             | ![ico-20 negation] |

{{p15}}
{{p16}}

{{p17}}
{{p18}}
_______________________________

{{p19}}
{{p20}}
{{p21}}
{{p22}}

{{p23}}
{{p24}}
{{p25}}

{{p26}}
{{p27}}

{{p28}}
{{p29}}
{{p30}}
{{p31}}

{{p32}}

{{p33}}
{{p34}}
{{p35}}
{{p36}}


_________________________________________________

### ![ico-25 icon] {{p37}}

{{p38}}

{{p39}}
{{p40}}
{{p41}}

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

~~~js
const request = indexedDB.open('sampleDB')

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{p52}}

{{p53}}

~~~js
const request = indexedDB.open('sampleDB', 2)

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{p54}}


______________________________________________________

### ![ico-20 icon] createObjectStore

{{p55}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 3)

request.onupgradeneeded = event => {
  const db = event.target.result
  const store = db.createObjectStore('firstStore')
  console.log(store)
}
~~~

{{p56}}

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

{{p57}}
{{p58}}


{{p59}}
{{p60}}
{{p61}}
{{p62}}

{{p63}}

• **~autoIncrement~**
• **~keyPath~**

{{p64}}

• **~indexNames~**

{{p65}}
{{p66}}

• **~transaction~**

{{p67}}

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

{{p68}}
{{p69}}
{{p70}}

{{p71}}

{{p72}}
{{p73}}
{{p74}}

{{p75}}
{{p76}}
{{p77}}

__________________________________

{{p78}}

| add        | put           |
| get        | getAll        |
| delete     | clear         |
| count      |               |
| getKey     | getAllKeys    |
| openCursor | openKeyCursor |

{{p79}}

___________________________________________________________

### ![ico-20 icon] {{p80}}

{{p81}}
{{p82}}

{{p83}}
{{p84}}
{{p85}}

{{p86}}
{{p87}}

{{p88}}

{{p89}}
{{p90}}

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

{{p91}}
{{p92}}
{{p93}}

| # | Key            | Value                      |
| 0 | "firstRecord"  | ► { name: "Google" }       |

{{p94}}

{{p95}}

{{p96}}
{{p97}}

____________________________

{{p98}}
{{p99}}
{{p100}}

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

{{p101}}
{{p102}}

~~~js
async function callUsers () {
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

{{p103}}
{{p104}}

**userStore**

| # | Key | Value                                                              |
| 0 | 1   | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |
| 1 | 2   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |

_________________________________________

{{p105}}
{{p106}}
{{p107}}

{{p108}}

~~~js
{
  login: ...,
  userName: ...,
  ...
}
~~~

{{p109}}

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
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

{{p110}}
{{p111}}

**userStore**

| # | Key       | Value                                                              |
| 0 | "Andry"   | ► {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}   |
| 1 | "Stephan" | ► {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)} |

__________________________________________________________________________

### ![ico-20 icon] objectStoreNames

{{p112}}
{{p113}}

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

{{p114}}

~~~js
DB.objectStoreNames.contains( "lessonStore" )  // false
~~~

{{p115}}

{{p116}}

◘◘![ico-20 cap] ** 5**◘◘

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => Object.assign(indexedDB.open(nameDB, verDB), {
  onupgradeneeded: event => resolve(event.target.result),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{p117}}
{{p118}}
{{p119}}

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

{{p120}}
{{p121}}
{{p122}}

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

{{p123}}

~~~js
openDB('keywordsDB', 1)
  .then(event => event.target.result.createObjectStore('topicStore'), event => console.warn(event.target.error) || null)
~~~

{{p124}}

••![ico-20 error] DOMException: Failed to execute 'createObjectStore' on 'IDBDatabase': The database is not running a version change transaction.••

{{p125}}

~~~js
let topicStore
const callback = { topicStore = event.target.result.createObjectStore('topicStore') }

openDB('keywordsDB', 2)
  .then(callback, event => console.warn(event.target.error))
~~~

^^^

_____________________________________________________

### ![ico-20 icon] deleteObjectStore

{{p126}}
{{p127}}
{{p128}}

◘◘![ico-20 cap] ** 6**◘◘

~~~js
indexedDB.open('keywordsDB', 3)
  .onupgradeneeded = event => event.target.result.deleteObjectStore('topicStore')
~~~

{{p129}}

~~~js
indexedDB.open('keywordsDB', 4)
  .onupgradeneeded = event => { store = event.target.result.createObjectStore('topicStore, { keyPath: 'topic' }) }
~~~

{{p130}}

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

{{p131}}

~~~js
indexedDB.open('keywordsDB')
  .onsuccess = event => {
    const store = event.target.result
      .transaction(['lessonStore', 'topicStore'], 'readwrite')
      .objectStore('topicStore')
    topics.forEach(item => store.put(item))
  }
~~~

{{p132}}
{{p133}}
{{p134}}

_________________________________________________
