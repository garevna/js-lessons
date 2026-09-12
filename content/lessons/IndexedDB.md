# ![ico-30 study] indexedDB

_____________________________________

^^Indexed Database^^
**NoSQL**
{{s0.p1}}
{{s0.p2}}
{{s0.p3}}
__________________________________________

{{s0.p4}}
__________________________________________

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
{{s0.p16}}
{{s0.p17}}
{{s0.p18}}
{{s0.p19}}
{{s0.p20}}

{{s0.p21}}
{{s0.p22}}
{{s0.p23}}

{{s0.p24}}
{{s0.p25}}

{{s0.p26}}
{{s0.p27}}
{{s0.p28}}

{{s0.p29}}
{{s0.p30}}

___________________________________________________

^^^[Chrome DevTools]

{{s0.p31}}
{{s0.p32}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-1.png)

^^^

{{s0.p33}}

^^^[Firefox ( Mozilla )]

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FindexedDB-mozila.png)

^^^
___________________________________________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

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

{{s1.p3}}

{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FIDBFactory.gif)

______________________________________________

### ![ico-20 icon] IDBRequest

{{s1.p7}}

{{s1.p8}}

| ![ico-20 green-ok] | **^^onsuccess^^** | **^^result^^** |
| ![ico-20 error]    | **^^onerror^^**   | **^^error^^** |

{{s1.p9}}
{{s1.p10}}
{{s1.p11}}
{{s1.p12}}
{{s1.p13}}

{{s1.p14}}
{{s1.p15}}

_____________________________________

### ![ico-20 icon] indexedDB.open

{{s1.p16}}
{{s1.p17}}
{{s1.p18}}

{{s1.p19}}
{{s1.p20}}

{{s1.p21}}
{{s1.p22}}
{{s1.p23}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 1)

request.onsuccess = event => console.log(event.target.result)
request.onerror = event => console.warn(event.target.error)
~~~

{{s1.p24}}

~~~js
const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => console.log(event.target.result),
  onerror: event => console.warn(event.target.error)
})
~~~

{{s1.p25}}

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

{{s1.p26}}
{{s1.p27}}

{{s1.p28}}

{{s1.p29}}
{{s1.p30}}
{{s1.p31}}
{{s1.p32}}

_________________________________

#### ![ico-20 icon] upgradeneeded

{{s1.p33}}
{{s1.p34}}
{{s1.p35}}
{{s1.p36}}
{{s1.p37}}
{{s1.p38}}

{{s1.p39}}
{{s1.p40}}
{{s1.p41}}

{{s1.p42}}
{{s1.p43}}
{{s1.p44}}
{{s1.p45}}

{{s1.p46}}

◘◘![ico-20 cap] ** 2**◘◘

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

{{s1.p47}}

~~~console
upgradeneeded
success
~~~

{{s1.p48}}

~~~js
Object.assign(indexedDB.open('sampleDB', 2), {
  onsuccess: callback,
  onupgradeneeded: callback,
  onerror: errorHandler
})
~~~

{{s1.p49}}

~~~console
versionchange
~~~

{{s1.p50}}

{{s1.p51}}
{{s1.p52}}
{{s1.p53}}
{{s1.p54}}

{{s1.p55}}
{{s1.p56}}

{{s1.p57}}

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

{{s1.p58}}
{{s1.p59}}
{{s1.p60}}
{{s1.p61}}
{{s1.p62}}
{{s1.p63}}

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

{{s1.p64}}

{{s1.p65}}
{{s1.p66}}
{{s1.p67}}
{{s1.p68}}

{{s1.p69}}

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const openDB = dbName => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName), {
  onsuccess: resolve(event.target.result),
  onerror: reject(event.target.error)
}))

openDB().then(db => { console.log(db); db.close() }, err => console.warn(err))
~~~

{{s1.p70}}
{{s1.p71}}

_______________________________________________

### ![ico-20 icon] indexedDB.databases

{{s1.p72}}

~~~js
indexedDB.databases()
  .then(response => console.log(response))
~~~

{{s1.p73}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "sampleDB", version: 2}
  ► 1: {name: "users", version: 1}
    length: 2
  ► __proto__: Array(0)
~~~

______________________________________________________________

### ![ico-20 icon] indexedDB.deleteDatabase

{{s1.p74}}

~~~js
const callback = event => console.log(event.type)

Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: callback,
  onsuccess: callback,
  onupgradeneeded: callback,
  onblocked: callback
})
~~~

{{s1.p75}}

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

{{s1.p76}}

{{s1.p77}}
{{s1.p78}}
{{s1.p79}}
{{s1.p80}}
{{s1.p81}}
{{s1.p82}}

{{s1.p83}}
{{s1.p84}}

◘◘![ico-20 cap] ** 4**◘◘

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

{{s1.p85}}

~~~console
upgradeneeded sampleDB
success sampleDB
~~~

{{s1.p86}}

~~~js
Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: event => console.log(event.type),
  onsuccess: event => console.log(event.type),
  onupgradeneeded: event => console.log(event.type),
  onblocked: event => console.log(event.type)
})
~~~

{{s1.p87}}
{{s1.p88}}

{{s1.p89}}

~~~console
versionchange ...
blocked
~~~

{{s1.p90}}
{{s1.p91}}
{{s1.p92}}

~~~console
success
~~~

_____________________________________________________

{{s1.p93}}

| **IDBFactory** | **open**  | => | **IDBDatabase** |
{{s1.p94}}
