# ![ico-30 study] indexedDB

______________________________________________________

## ![ico-25 icon] transaction

{{s0.p1}}
|                | _open_                |                 | _transaction_         |                    |
| **IDBFactory** | ![ico-25 arrow-right] | **IDBDatabase** | ![ico-25 arrow-right] | **IDBObjectStore** |

{{s0.p2}}

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

{{s0.p3}}

{{s0.p4}}
{{s0.p5}}
{{s0.p6}}
{{s0.p7}}
{{s0.p8}}
{{s0.p9}}
{{s0.p10}}
{{s0.p11}}
{{s0.p12}}
{{s0.p13}}
{{s0.p14}}

{{s0.p15}}
___________________________________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

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

{{s1.p6}}
{{s1.p7}}
{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}
{{s1.p12}}
{{s1.p13}}
{{s1.p14}}

______________________________________________

#### ![ico-20 icon] deleteIndex

{{s1.p15}}
{{s1.p16}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const openDB = (dbName, ver, storeName) => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName, ver), {
  onupgradeneeded: event => resolve(event.target.transaction.objectStore(storeName)),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{s1.p17}}
{{s1.p18}}
{{s1.p19}}

{{s1.p20}}

~~~js
openDB('users', 2, 'userStore')
  .then(response => console.log(response))
~~~

{{s1.p21}}

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

{{s1.p22}}

~~~js
openDB('users', 3, 'userStore')
  .then(store =>  store instanceof IDBObjectStore && store.deleteIndex('hobbyIndex')
)
~~~

{{s1.p23}}

___________________________________________

{{s1.p24}}
{{s1.p25}}
{{s1.p26}}

{{s1.p27}}
_____________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}
{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
___________________________

{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
_________________________________

{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}
________________________________

{{s2.p15}}

{{s2.p16}}
{{s2.p17}}

{{s2.p18}}
{{s2.p19}}

{{s2.p20}}

{{s2.p21}}
{{s2.p22}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________

#### ![ico-20 icon] get

{{s2.p23}}
{{s2.p24}}

{{s2.p25}}

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

{{s2.p26}}

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

{{s2.p27}}

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

{{s2.p28}}
{{s2.p29}}

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

{{s2.p30}}

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

{{s2.p31}}

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

{{s2.p32}}
{{s2.p33}}

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

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}

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

{{s3.p4}}

~~~console
▼ IDBIndex {name: "hobbyIndex", objectStore: IDBObjectStore, keyPath: "hobby", multiEntry: true, unique: false}
    keyPath: "hobby"
    multiEntry: true
    name: "hobbyIndex"
  ► objectStore: IDBObjectStore {name: "userStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: true}
    unique: false
  ► __proto__: IDBIndex
~~~

{{s3.p5}}

{{s3.p6}}

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

{{s3.p7}}

{{s3.p8}}

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

{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}

____________________________

{{s3.p13}}
{{s3.p14}}
{{s3.p15}}

◘◘![ico-20 cap] ** 7**◘◘

~~~js
getDataByIndex('hobbyIndex', 'get', 'footbal')
~~~

{{s3.p16}}

~~~console
▼ {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
    birthYear: 1995
  ► family: {mother: {…}, father: {…}}
  ► hobby: (2) ["footbal", "fishing"]
    name: "Stephan"
  ► __proto__: Object
~~~

____________________________

{{s3.p17}}
{{s3.p18}}
{{s3.p19}}

◘◘![ico-20 cap] ** 8**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAll', 'footbal')
~~~

{{s3.p20}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Иван", birthYear: 2004, family: {…}, hobby: Array(2)}
    length: 2
  ► __proto__: Array(0)
~~~
____________________________

{{s3.p21}}
{{s3.p22}}

◘◘![ico-20 cap] ** 9**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getKey', 'footbal')
~~~

{{s3.p23}}
____________________________________________________

{{s3.p24}}
{{s3.p25}}
{{s3.p26}}

◘◘![ico-20 cap] **10**◘◘

~~~js
getDataByIndex('hobbyIndex', 'getAllKeys', 'footbal')
~~~

{{s3.p27}}

~~~console
▼ (2) [1, 4]
~~~

________________________________________