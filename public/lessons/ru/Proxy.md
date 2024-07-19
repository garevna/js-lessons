# ![ico-30 study] Proxy

Поместим в глобальный реестр символов символ ~permissions~, в котором будут описаны права текущего пользователя:
~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: false,
  config: false
}))
~~~
С помощью этого символа мы будем контролировать доступ к свойствам проксируемого объекта

Для проксирования доступа к некоему объекту ~target~ нам нужен объект ~handler~ с набором методов доступа:
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

А теперь создадим проксируемый объект:
~~~js
const user = new Proxy({
  name: 'Piter',
  age: 30,
  hobby: 'football',
}, handler)
~~~

Теперь можно "читать" содержимое объекта user, но изменить что-то в этом объекте нельзя

Однако если изменить символ ~permissions~, то можно предоставить права на измение содержимого объекта

Например, можно предоставить доступ на перезапись свойств:

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: false
}))
~~~

или полный доступ к объекту:

~~~js
const permissions = Symbol.for(JSON.stringify({
  read: true,
  write: true,
  config: true
}))
~~~

Примечание:
для обеспечения полного проксирования объекта стоит включить в ~handler~:

• setPrototypeOf
• defineProperty
• construct

__________________________________

[%%%MDN%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)