# ![ico-30 study] indexedDB

_____________________________________

^^Indexed Database^^
**NoSQL**
{{p1}}
{{p2}}
{{p3}}
__________________________________________

{{p4}}
__________________________________________

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
{{p18}}
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

___________________________________________________

^^^[Chrome DevTools]

{{p31}}
{{p32}}


^^^

{{p33}}

^^^[Firefox ( Mozilla )]


^^^
___________________________________________________

## ![ico-25 icon] {{p34}}

{{p35}}

{{p36}}

~~~console
▼ IDBFactory
  ▼ [[Prototype]]: IDBFactory
      ► cmp: ƒ cmp()
      ► databases: ƒ databases()
      ► deleteDatabase: ƒ deleteDatabase()
      ► open: ƒ open()
      ► constructor: ƒ IDBFactory()
        Symbol(Symbol.toStringTag): "IDBFactory"
      ► [[Prototype]]: Object
~~~

{{p37}}

{{p38}}
{{p39}}
{{p40}}


______________________________________________

### ![ico-20 icon] IDBRequest

{{p41}}

{{p42}}

| ![ico-20 green-ok] | **^^onsuccess^^** | **^^result^^** |
| ![ico-20 error]    | **^^onerror^^**   | **^^error^^** |

{{p43}}
{{p44}}
{{p45}}
{{p46}}
{{p47}}

{{p48}}
{{p49}}

_____________________________________

### ![ico-20 icon] indexedDB.open

{{p50}}
{{p51}}
{{p52}}

{{p53}}
{{p54}}

{{p55}}
{{p56}}
{{p57}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const request = indexedDB.open('sampleDB', 1)

request.onsuccess = event => console.log(event.target.result)
request.onerror = event => console.warn(event.target.error)
~~~

{{p58}}

~~~js
const request = Object.assign(indexedDB.open('sampleDB'), {
  onsuccess: event => console.log(event.target.result),
  onerror: event => console.warn(event.target.error)
})
~~~

{{p59}}

~~~console
▼ IDBDatabase {name: "sampleDB", version: 1, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
  ► onversionchange: null
    version: 1
  ► [[Prototype]]: IDBDatabase
~~~

{{p60}}
{{p61}}

{{p62}}

{{p63}}
{{p64}}
{{p65}}
{{p66}}

_________________________________

#### ![ico-20 icon] upgradeneeded

{{p67}}
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
{{p78}}
{{p79}}

{{p80}}

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

{{p81}}

~~~console
upgradeneeded
success
~~~

{{p82}}

~~~js
Object.assign(indexedDB.open('sampleDB', 2), {
  onsuccess: callback,
  onupgradeneeded: callback,
  onerror: errorHandler
})
~~~

{{p83}}

~~~console
versionchange
~~~

{{p84}}

{{p85}}
{{p86}}
{{p87}}
{{p88}}

{{p89}}
{{p90}}

{{p91}}

~~~console
▼ IDBDatabase { name: "sampleDB", version: 2, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    name: "sampleDB"
  ► objectStoreNames: DOMStringList {length: 0}
    onabort: null
    onclose: null
    onerror: null
    onversionchange: null
    version: 2
  ► [[Prototype]]: IDBDatabase
~~~

{{p92}}
{{p93}}
{{p94}}
{{p95}}
{{p96}}
{{p97}}

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
  ► [[Prototype]]: EventTarget
~~~~

{{p98}}

{{p99}}
{{p100}}
{{p101}}
{{p102}}

{{p103}}

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const openDB = dbName => new Promise((resolve, reject) => Object.assign(indexedDB.open(dbName), {
  onsuccess: resolve(event.target.result),
  onerror: reject(event.target.error)
}))

openDB().then(db => { console.log(db); db.close() }, err => console.warn(err))
~~~

{{p104}}
{{p105}}

_______________________________________________

### ![ico-20 icon] indexedDB.databases

{{p106}}

~~~js
indexedDB.databases()
  .then(response => console.log(response))
~~~

{{p107}}

~~~console
▼ (2) [{…}, {…}]
  ► 0: {name: "sampleDB", version: 2}
  ► 1: {name: "users", version: 1}
    length: 2
  ► [[Prototype]]: Array(0)
~~~

______________________________________________________________

### ![ico-20 icon] indexedDB.deleteDatabase

{{p108}}

~~~js
const callback = event => console.log(event.type)

Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: callback,
  onsuccess: callback,
  onupgradeneeded: callback,
  onblocked: callback
})
~~~

{{p109}}

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

{{p110}}

{{p111}}
{{p112}}
{{p113}}
{{p114}}
{{p115}}
{{p116}}

{{p117}}
{{p118}}

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

{{p119}}

~~~console
upgradeneeded sampleDB
success sampleDB
~~~

{{p120}}

~~~js
Object.assign(indexedDB.deleteDatabase('sampleDB'), {
  onerror: event => console.log(event.type),
  onsuccess: event => console.log(event.type),
  onupgradeneeded: event => console.log(event.type),
  onblocked: event => console.log(event.type)
})
~~~

{{p121}}
{{p122}}

{{p123}}

~~~console
versionchange ...
blocked
~~~

{{p124}}
{{p125}}
{{p126}}

~~~console
success
~~~

_____________________________________________________

{{p127}}

| **IDBFactory** | **open**  | => | **IDBDatabase** |
{{p128}}
