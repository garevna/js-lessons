# ![ico-30 study] {{s1.h1}}

______________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

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
___________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

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

{{s3.p6}}
{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}
{{s3.p13}}
{{s3.p14}}

______________________________________________

#### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

~~~js
const openDB = (dbName, ver, storeName) => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName, ver), {
  onupgradeneeded: event => resolve(event.target.transaction.objectStore(storeName)),
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.error)
}))
~~~

{{s4.p4}}
{{s4.p5}}
{{s4.p6}}

{{s4.p7}}

~~~js
openDB('users', 2, 'userStore')
  .then(response => console.log(response))
~~~

{{s4.p8}}

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

{{s4.p9}}

~~~js
openDB('users', 3, 'userStore')
  .then(store =>  store instanceof IDBObjectStore && store.deleteIndex('hobbyIndex')
)
~~~

{{s4.p10}}

___________________________________________

{{s4.p11}}
{{s4.p12}}
{{s4.p13}}

{{s4.p14}}
_____________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}
___________________________

{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}
_________________________________

{{s5.p11}}
{{s5.p12}}
{{s5.p13}}
{{s5.p14}}
________________________________

{{s5.p15}}

{{s5.p16}}
{{s5.p17}}

{{s5.p18}}
{{s5.p19}}

{{s5.p20}}

{{s5.p21}}
{{s5.p22}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.gif)

_________________________________

#### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

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

{{s6.p5}}

~~~console
▼ {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}
    birthYear: 1998
  ► family: {mother: {…}, father: {…}}
  ► hobby: ["dancing"]
    name: "Andry"
  ► __proto__: Object
~~~

__________________________________________________

#### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

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

{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

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

{{s7.p5}}

__________________________________________________

#### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

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

{{s8.p2}}

~~~console
▼  (3) [{…}, {…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Andry", birthYear: 1998, family: {…}, hobby: Array(1)}
  ► 2: {name: "Piter", birthYear: 2001, family: {…}, hobby: Array(2)}
    length: 3
  ► __proto__: Array(0)
~~~

_____________________________________________________

#### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}
{{s9.p2}}

{{s9.p3}}

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

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}

{{s10.p4}}

~~~js
indexedDB.open('users').onsuccess = event => {
  const index = event.target.result
    .transaction(['userStore'], 'readwrite')
    .objectStore('userStore')
    .index('hobbyIndex')
  console.log(index)
}
~~~

{{s10.p5}}

~~~console
▼ IDBIndex {name: "hobbyIndex", objectStore: IDBObjectStore, keyPath: "hobby", multiEntry: true, unique: false}
    keyPath: "hobby"
    multiEntry: true
    name: "hobbyIndex"
  ► objectStore: IDBObjectStore {name: "userStore", keyPath: null, indexNames: DOMStringList, transaction: IDBTransaction, autoIncrement: true}
    unique: false
  ► __proto__: IDBIndex
~~~

{{s10.p6}}

{{s10.p7}}

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

{{s10.p8}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-index-2.png)

{{s10.p9}}

{{s10.p10}}

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

{{s10.p11}}
{{s10.p12}}
{{s10.p13}}
{{s10.p14}}

____________________________

{{s10.p15}}
{{s10.p16}}
{{s10.p17}}

{{s10.p18}}

~~~js
getDataByIndex('hobbyIndex', 'get', 'footbal')
~~~

{{s10.p19}}

~~~console
▼ {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
    birthYear: 1995
  ► family: {mother: {…}, father: {…}}
  ► hobby: (2) ["footbal", "fishing"]
    name: "Stephan"
  ► __proto__: Object
~~~

____________________________

{{s10.p20}}
{{s10.p21}}
{{s10.p22}}

{{s10.p23}}

~~~js
getDataByIndex('hobbyIndex', 'getAll', 'footbal')
~~~

{{s10.p24}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "Stephan", birthYear: 1995, family: {…}, hobby: Array(2)}
  ► 1: {name: "Иван", birthYear: 2004, family: {…}, hobby: Array(2)}
    length: 2
  ► __proto__: Array(0)
~~~
____________________________

{{s10.p25}}
{{s10.p26}}

{{s10.p27}}

~~~js
getDataByIndex('hobbyIndex', 'getKey', 'footbal')
~~~

{{s10.p28}}
____________________________________________________

{{s10.p29}}
{{s10.p30}}
{{s10.p31}}

{{s10.p32}}

~~~js
getDataByIndex('hobbyIndex', 'getAllKeys', 'footbal')
~~~

{{s10.p33}}

~~~console
▼ (2) [1, 4]
~~~

________________________________________