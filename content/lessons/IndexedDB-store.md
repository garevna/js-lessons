# ![ico-30 study] {{s1.h1}}

____________________________________________________________

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
{{s2.p17}}

{{s2.p18}}
{{s2.p19}}
_______________________________

{{s2.p20}}
{{s2.p21}}
{{s2.p22}}
{{s2.p23}}

{{s2.p24}}
{{s2.p25}}
{{s2.p26}}

{{s2.p27}}
{{s2.p28}}

{{s2.p29}}
{{s2.p30}}
{{s2.p31}}
{{s2.p32}}

{{s2.p33}}

{{s2.p34}}
{{s2.p35}}
{{s2.p36}}
{{s2.p37}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________________________

### ![ico-25 icon] {{s3.h1}}

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

~~~js
const request = indexedDB.open('sampleDB')

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{s3.p15}}

{{s3.p16}}

~~~js
const request = indexedDB.open('sampleDB', 2)

request.onupgradeneeded = event => console.log(event.target.result)
~~~

{{s3.p17}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3-1.gif)

______________________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
const request = indexedDB.open('sampleDB', 3)

request.onupgradeneeded = event => {
  const db = event.target.result
  const store = db.createObjectStore('firstStore')
  console.log(store)
}
~~~

{{s4.p3}}

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

{{s4.p4}}
{{s4.p5}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-3.gif)

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}

{{s4.p10}}

{{s4.p11}}
{{s4.p12}}

{{s4.p13}}

{{s4.p14}}

{{s4.p15}}
{{s4.p16}}

{{s4.p17}}

{{s4.p18}}

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

{{s4.p19}}
{{s4.p20}}
{{s4.p21}}

{{s4.p22}}

{{s4.p23}}
{{s4.p24}}
{{s4.p25}}

{{s4.p26}}
{{s4.p27}}
{{s4.p28}}

__________________________________

{{s4.p29}}

{{s4.p30}}
{{s4.p31}}
{{s4.p32}}
{{s4.p33}}
{{s4.p34}}
{{s4.p35}}

{{s4.p36}}

___________________________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}
{{s5.p7}}

{{s5.p8}}

{{s5.p9}}
{{s5.p10}}

{{s5.p11}}

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

{{s5.p12}}
{{s5.p13}}
{{s5.p14}}

{{s5.p15}}
{{s5.p16}}

{{s5.p17}}

{{s5.p18}}

{{s5.p19}}
{{s5.p20}}

____________________________

{{s5.p21}}
{{s5.p22}}
{{s5.p23}}

{{s5.p24}}

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

{{s5.p25}}
{{s5.p26}}

~~~js
async function callUsers () {
  const users = await (await fetch('https://garevna-json-server.glitch.me/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~

{{s5.p27}}
{{s5.p28}}

{{s5.p29}}

{{s5.p30}}
{{s5.p31}}
{{s5.p32}}

_________________________________________

{{s5.p33}}
{{s5.p34}}
{{s5.p35}}

{{s5.p36}}

~~~js
{
  login: ...,
  userName: ...,
  ...
}
~~~

{{s5.p37}}

~~~js
const createStore = function (db, storeName) {
  ...
  return db.createObjectStore(storeName, { keyPath: 'login' })
}
~~~

{{s5.p38}}

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

{{s5.p39}}
{{s5.p40}}

{{s5.p41}}

{{s5.p42}}
{{s5.p43}}
{{s5.p44}}

__________________________________________________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

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

{{s6.p3}}

~~~js
DB.objectStoreNames.contains( "lessonStore" )  // false
~~~

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

~~~js
const openDB = (nameDB, verDB) => new Promise((resolve, reject) => Object.assign(indexedDB.open(nameDB, verDB), {
  onupgradeneeded: event => resolve(event.target.result),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{s6.p7}}
{{s6.p8}}
{{s6.p9}}

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

{{s6.p10}}
{{s6.p11}}
{{s6.p12}}

~~~js
let db, lessonStore

const resolve = event => {
  db = event.target.result
  lessonStore = createStore(event.target.result, 'lessonStore')
}

const reject = event => console.warn(event.target.error)) || null

openDB('keywordsDB', 1).then(resolve, reject)
~~~

^^^[{{s6.spoiler1}}]

{{s6.p13}}

~~~js
openDB('keywordsDB', 1)
  .then(event => event.target.result.createObjectStore('topicStore'), event => console.warn(event.target.error) || null)
~~~

{{s6.p14}}

{{s6.p15}}

{{s6.p16}}

~~~js
let topicStore
const callback = { topicStore = event.target.result.createObjectStore('topicStore') }

openDB('keywordsDB', 2)
  .then(callback, event => console.warn(event.target.error))
~~~

^^^

_____________________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

~~~js
indexedDB.open('keywordsDB', 3)
  .onupgradeneeded = event => event.target.result.deleteObjectStore('topicStore')
~~~

{{s7.p5}}

~~~js
indexedDB.open('keywordsDB', 4)
  .onupgradeneeded = event => { store = event.target.result.createObjectStore('topicStore, { keyPath: 'topic' }) }
~~~

{{s7.p6}}

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

{{s7.p7}}

~~~js
indexedDB.open('keywordsDB')
  .onsuccess = event => {
    const store = event.target.result
      .transaction(['lessonStore', 'topicStore'], 'readwrite')
      .objectStore('topicStore')
    topics.forEach(item => store.put(item))
  }
~~~

{{s7.p8}}
{{s7.p9}}
{{s7.p10}}

_________________________________________________
