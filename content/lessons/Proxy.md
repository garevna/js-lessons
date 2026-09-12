# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: false,
  config: false
}))
~~~
{{s1.p2}}

{{s1.p3}}
~~~js
const handler = {
  get(target, key) {
    if (JSON.parse(Symbol.keyFor(permissions)).read) {
      return target[key]
    }
    return null
  },
  set(target, key, value) {
    if (JSON.parse(Symbol.keyFor(permissions)).write) {
      target[key] = value
      return true
    }
    return false
  },
  deleteProperty(target, key) {
    if (JSON.parse(Symbol.keyFor(permissions)).config) {
      delete target[key]
      return true
    }
    return false
  }
}
~~~

{{s1.p4}}
~~~js
const user = new Proxy({
  name: 'Piter',
  age: 30,
  hobby: 'football',
}, handler)
~~~

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: false
}))
~~~

{{s1.p8}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: true
}))
~~~

{{s1.p9}}
{{s1.p10}}

{{s1.p11}}
{{s1.p12}}
{{s1.p13}}

__________________________________

{{s1.p14}}