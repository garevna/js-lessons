# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] transaction

{{p1}}
|                | _open_                |                 | _transaction_         |                    |
| **IDBFactory** | ![ico-25 arrow-right] | **IDBDatabase** | ![ico-25 arrow-right] | **IDBObjectStore** |

{{p2}}

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
___________________________________________________________

### ![ico-20 icon] {{p16}}

{{p17}}
{{p18}}
{{p19}}

{{p20}}

{{p21}}

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
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/json-server/users')).json()
  return await createUsersDB(users).catch(error => console.warn(error))
}

callUsers().then(resp => console.log(resp))
~~~~

{{p22}}
{{p23}}
{{p24}}
{{p25}}
{{p26}}
{{p27}}
{{p28}}
{{p29}}
{{p30}}

______________________________________________

#### ![ico-20 icon] deleteIndex

{{p31}}
{{p32}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const openDB = (dbName, ver, storeName) => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName, ver), {
  onupgradeneeded: event => resolve(event.target.transaction.objectStore(storeName)),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{p33}}
{{p34}}
{{p35}}

{{p36}}

~~~js
openDB('users', 2, 'userStore')
  .then(response => console.log(response))
~~~

{{p37}}

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

{{p38}}

~~~js
openDB('users', 3, 'userStore')
  .then(store =>  store instanceof IDBObjectStore && store.deleteIndex('hobbyIndex')
)
~~~

{{p39}}

___________________________________________

{{p40}}
{{p41}}
{{p42}}

{{p43}}
_____________________________________________

### ![ico-20 icon] {{p44}}

{{p45}}
{{p46}}

{{p47}}
{{p48}}
{{p49}}
{{p50}}
___________________________

{{p51}}
{{p52}}
{{p53}}
{{p54}}
_________________________________

{{p55}}
{{p56}}
{{p57}}
{{p58}}
________________________________

{{p59}}

{{p60}}
{{p61}}

{{p62}}
{{p63}}

{{p64}}

{{p65}}
{{p66}}


_________________________________

#### ![ico-20 icon] get

{{p67}}
{{p68}}

{{p69}}

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

{{p70}}

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

{{p71}}

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

{{p72}}
{{p73}}

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

{{p74}}

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

{{topic.t9}}

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

{{p75}}
{{p76}}

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

### ![ico-20 icon] {{p77}}

{{p78}}
{{p79}}
{{p80}}

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

{{p81}}

~~~console
▼ IDBIndex {name: "hobbyIndex", objectStore: IDBObjectStore, keyPath: "hobby", multiEntry: true, unique: false}
    keyPath: "hobby"
    multiEntry: true
    name: "hobbyIndex"
  ► objectStore: IDBObjectStore {name: "userStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: true}
    unique: false
  ► __proto__: IDBIndex
~~~

{{p82}}

{{p83}}

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


{{p84}}

{{p85}}

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

{{p86}}
{{p87}}
{{p88}}
{{p89}}

____________________________

{{p90}}
{{p91}}
{{p92}}

◘◘![ico-20 cap] ** 7**◘◘

~~~js
getDataByIndex('hobbyIndex', 'get', 'footbal')
~~~

{{topic.t10}}

~~~console
▼ {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
    birthYear: 1995
  ► family: {mother: {…}, father: {…}}
  ► hobby: (2) ["footbal", "fishing"]
    name: "Stephan"
  ► __proto__: Object
~~~

____________________________

{{p93}}
{{p94}}
{{p95}}

◘◘![ico-20 cap] ** 8**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAll', 'footbal')
~~~

{{topic.t10}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Иван", birthYear: 2004, family: {…}, hobby: Array(2)}
    length: 2
  ► __proto__: Array(0)
~~~
____________________________

{{p96}}
{{p97}}

◘◘![ico-20 cap] ** 9**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getKey', 'footbal')
~~~

{{p98}}
____________________________________________________

{{p99}}
{{p100}}
{{p101}}

◘◘![ico-20 cap] **10**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAllKeys', 'footbal')
~~~

{{p102}}

~~~console
▼ (2) [1, 4]
~~~

________________________________________