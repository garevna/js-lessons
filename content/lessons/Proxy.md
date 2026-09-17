# ![ico-30 study] Proxy

{{p1}}
~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: false,
  config: false
}))
~~~
{{p2}}

{{p3}}
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

{{p4}}
~~~js
const user = new Proxy({
  name: 'Piter',
  age: 30,
  hobby: 'football',
}, handler)
~~~

{{p5}}

{{p6}}

{{p7}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: false
}))
~~~

{{p8}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: true
}))
~~~

{{common.c16}}
{{p9}}

• setPrototypeOf
• defineProperty
• construct

__________________________________

[%%%MDN%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)