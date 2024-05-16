# ![ico-30 study] Вычисляемые имена свойств

**ES6**

________________________________________________

![ico-25 warn] В качестве имени свойства можно использовать выражение:

![ico-25 cap] **Пример 1**

~~~js
var bag = {
  ['prop' + 1]: '👜',
  ['prop' + 2]:  '🍄',
  ['prop' + 3]:  '🎓',
}
console.log(bag.prop1)  // 👜
console.log(bag.prop2)  // 🍄
console.log(bag.prop3)  // 🎓
~~~

__________________________________________

![ico-25 cap] **Пример 2**

~~~js
var prop = 'prop'
var id = '____'
var num = [1, 2, 3]
var bag = {
  [prop + id + num[0]]: '👜',
  [prop + id + num[1]]:  '🍄',
  [prop + id + num[2]]:  '🎓',
}
console.log(bag.prop____1)  // 👜
console.log(bag.prop____2)  // 🍄
console.log(bag.prop____3)  // 🎓
~~~

__________________________________________

![ico-25 cap] **Пример 3**

~~~js
var prop = ['smile', 'clock', 'book']
var bag = {
  [`____${prop [ 0 ]}` ]: '😉',
  [ `____${prop [ 1 ]}` ]:  '⏰',
  [ `____${prop [ 2 ]}` ]:  '📖',
}
console.log ( bag.____smile )  // 😉
console.log ( bag.____clock )  // ⏰
console.log ( bag.____book )   // 📖
~~~

__________________________________________

![ico-25 cap] **Пример 4**

~~~js
var sample = {}
var props = [ 
  { prop: 'mouse', val: '🐭' },
  { prop: 'monkey', val: '🐒' },
  { prop: 'chicken', val: '🐥' }
]
for (var item of props) {
  // Object.assign(sample, { [item.prop] : item.val } )
  sample[item.prop] = item.val
}
console.log(sample.mouse)
console.log(sample.monkey)
console.log(sample.chicken)
~~~

__________________________________________

![ico-25 cap] **Пример 5**

~~~js
var things = [
  { name: 'Rose', val: '🌹' },
  { name: 'Flower', val: '🌸' },
  { name: 'Mashroom', val: '🍄' }
]
var bag = {
  name: '👜',
  putContent: (function (things) {
    return function () {
      for (var item of things) {
        this[`get${item.name}`] = function () {
          return item.val
        }
      }
      delete this.putContent
    }
  })(things)
}

console.log(bag)
bag.putContent()
console.log(bag)
console.log(bag.getRose())
console.log(bag.getFlower())
console.log(bag.getMashroom())
~~~

**Результат**

~~~console

► {name: "👜", putContent: ƒ}
► {name: "👜", getRose: ƒ, getFlower: ƒ, getMashroom: ƒ}
🌹
🌸
🍄
~~~

![ico-25 question] Почему в цикле **~let item~** нельзя заменить на **~var item~** ?