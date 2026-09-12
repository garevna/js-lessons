# ![ico-30 study] Proxy

{{s0.p1}}
~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: false,
  config: false
}))
~~~
{{s0.p2}}

{{s0.p3}}
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

{{s0.p4}}
~~~js
const user = new Proxy({
  name: 'Piter',
  age: 30,
  hobby: 'football',
}, handler)
~~~

{{s0.p5}}

{{s0.p6}}

{{s0.p7}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: false
}))
~~~

{{s0.p8}}

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: true
}))
~~~

{{s0.p9}}
{{s0.p10}}

• setPrototypeOf
• defineProperty
• construct

__________________________________

[%%%MDN%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)