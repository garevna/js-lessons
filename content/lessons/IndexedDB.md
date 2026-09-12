# ![ico-30 study] {{s1.h1}}

_____________________________________

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
__________________________________________

{{s1.p6}}
__________________________________________

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
{{s1.p17}}
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

___________________________________________________

{{s1.p33}}

{{s1.p34}}
{{s1.p35}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.png)

{{s1.p36}}

{{s1.p37}}

{{s1.p38}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-mozila.png)

{{s1.p39}}
___________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~console
▼ IDBFactory
  ▼ __proto__: IDBFactory
      ► cmp: ƒ cmp()
      ► databases: ƒ databases()
      ► deleteDatabase: ƒ deleteDatabase()
      ► open: ƒ open()
      ► constructor: ƒ IDBFactory()
        Symbol(Symbol.toStringTag): "IDBFactory"
      ► __proto__: Object
~~~

{{s2.p3}}

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FIDBFactory.gif)

______________________________________________

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

_____________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}

{{s4.p4}}
{{s4.p5}}

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}

{{s4.p9}}

~~~js
const request = indexedDB.open('sampleDB', 1)

request.onsuccess = event => console.log(event.target.result)
request.onerror = event => console.warn(event.target.error)
~~~

{{s4.p10}}

~~~js
const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => console.log(event.target.result),
  onerror: event => console.warn(event.target.error)
})
~~~

{{s4.p11}}

~~~console
▼ IDBDatabase {name: "sampleDB", version: 1, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
  ► onversionchange: null
    version: 1
  ► __proto__: IDBDatabase
~~~

{{s4.p12}}
{{s4.p13}}

{{s4.p14}}

{{s4.p15}}
{{s4.p16}}
{{s4.p17}}
{{s4.p18}}

_________________________________

#### ![ico-20 icon] {{s5.h1}}

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
{{s5.p12}}
{{s5.p13}}

{{s5.p14}}

{{s5.p15}}

~~~js
const callback = event => console.log(event.type)
const errorHandler = event => console.warn(event.target.error)

const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onupgradeneeded: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onerror: errorHandler
})
~~~

{{s5.p16}}

~~~console
upgradeneeded
success
~~~

{{s5.p17}}

~~~js
Object.assign(indexedDB.open('sampleDB', 2), {
  onsuccess: callback,
  onupgradeneeded: callback,
  onerror: errorHandler
})
~~~

{{s5.p18}}

~~~console
versionchange
~~~

{{s5.p19}}

{{s5.p20}}
{{s5.p21}}
{{s5.p22}}
{{s5.p23}}

{{s5.p24}}
{{s5.p25}}

{{s5.p26}}

~~~console
▼ IDBDatabase { name: "sampleDB", version: 2, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
    onversionchange: null
    version: 2
  ► __proto__: IDBDatabase
~~~

{{s5.p27}}
{{s5.p28}}
{{s5.p29}}
{{s5.p30}}
{{s5.p31}}
{{s5.p32}}

~~~~console
▼ IDBDatabase {…}
  ► close: ƒ close()
  ► createObjectStore: ƒ createObjectStore()
  ► deleteObjectStore: ƒ deleteObjectStore()
    name: (...)
    objectStoreNames: (...)
    onabort: (...)
    onclose: (...)
    onerror: (...)
    onversionchange: (...)
  ► transaction: ƒ transaction()
    version: (...)
  ► constructor: ƒ IDBDatabase()
    Symbol(Symbol.toStringTag): "IDBDatabase"
  ► get name: ƒ name()
  ► get objectStoreNames: ƒ objectStoreNames()
  ► get onabort: ƒ onabort()
  ► set onabort: ƒ onabort()
  ► get onclose: ƒ onclose()
  ► set onclose: ƒ onclose()
  ► get onerror: ƒ onerror()
  ► set onerror: ƒ onerror()
  ► get onversionchange: ƒ onversionchange()
  ► set onversionchange: ƒ onversionchange()
  ► get version: ƒ version()
  ► __proto__: EventTarget
~~~~

{{s5.p33}}

{{s5.p34}}
{{s5.p35}}
{{s5.p36}}
{{s5.p37}}

{{s5.p38}}

{{s5.p39}}

~~~js
const openDB = dbName => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName), {
  onsuccess: resolve(event.target.result),
  onerror: reject(event.target.error)
}))

openDB().then(db => { console.log(db); db.close() }, err => console.warn(err))
~~~

{{s5.p40}}
{{s5.p41}}

_______________________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

~~~js
indexedDB.databases()
  .then(response => console.log(response))
~~~

{{s6.p2}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "sampleDB", version: 2}
  ► 1: {name: "users", version: 1}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

~~~js
const callback = event => console.log(event.type)

Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: callback,
  onsuccess: callback,
  onupgradeneeded: callback,
  onblocked: callback
})
~~~

{{s7.p2}}

~~~console
▼ IDBOpenDBRequest {onblocked: ƒ, onupgradeneeded: ƒ, source: null, transaction: null, readyState: "pending", …}
    error: null
  ► onblocked: event => console.log ( event.type )
  ► onerror: event => console.log ( event.type )
  ► onsuccess: event => console.log ( event.type )
    onupgradeneeded: event => console.log ( event.type )
    readyState: "done"
    result: undefined
    source: null
    transaction: null
  ► __proto__: IDBOpenDBRequest
~~~

{{s7.p3}}

{{s7.p4}}
{{s7.p5}}
{{s7.p6}}
{{s7.p7}}
{{s7.p8}}
{{s7.p9}}

{{s7.p10}}
{{s7.p11}}

{{s7.p12}}

~~~js
const callback = event => console.log(event.type, event.target.result ? event.target.result.name : '...')
const errorHandler = event => console.warn(event.target.error)

const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => {
    callback(event)
    event.target.result.onversionchange = callback
  },
  onupgradeneeded: event => callback,
  onerror: errorHandler
})
~~~

{{s7.p13}}

~~~console
upgradeneeded sampleDB
success sampleDB
~~~

{{s7.p14}}

~~~js
Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: event => console.log(event.type),
  onsuccess: event => console.log(event.type),
  onupgradeneeded: event => console.log(event.type),
  onblocked: event => console.log(event.type)
})
~~~

{{s7.p15}}
{{s7.p16}}

{{s7.p17}}

~~~console
versionchange ...
blocked
~~~

{{s7.p18}}
{{s7.p19}}
{{s7.p20}}

~~~console
success
~~~

_____________________________________________________

{{s7.p21}}

{{s7.p22}}
{{s7.p23}}
