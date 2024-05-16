# ![ico-30 study] Design Patterns

_____________________________________

### ![ico-20 icon] Strategy

Это **поведенческий** паттерн

Он позволяет описать несколько стратегий поведения объекта с возможностью выбора нужной стратегии

_______________________________

![ico-25 cap] ** 1**

Создадим класс **SortStrategy**
Экземпляр этого класса будет сортировать полученный массив объектов в соответствии с указанной стратегией
В данном примере экземпляр может использовать три стратегии сортировки:

• **Key** - сортировка по заданному ключу
^^Каждый элемент массива (объект) должен иметь свойство с соответствующим названием^^
• **SumOfAllNumericFields** - сортировка по сумме всех числовых свойств объекта
^^Все чсиловые свойства объекта, являющегося элементом исходного (сортируемого) массива, будут суммироваться^^
^^Сортировка исходного массива будет выполняться по сумме числовых свойств объектов^^
• **ArrayFieldLength** - сортировка по длине свойства-массива
^^Все объекты, являющиеся элементами исходного (сортируемого) массива, должны иметь свойство-массив^^
^^Сортировка исходного массива будет выполняться по длине массива-свойства^^

Экземпляр этого класса будет наследовать методы:

• **testStrategy** - проверка, что запрошенная стратегия поддерживается экземпляром
^^В противном случае будет сгенерировано исключение^^
• **testData** - проверка, что переданные данные являются массивом
^^В противном случае будет сгенерировано исключение^^
• **setBySumOfAllNumericFields** - установка ~valueOf~ для стратегии **SumOfAllNumericFields**
• **setByArrayFieldLength** - установка ~valueOf~ для стратегии **ArrayFieldLength**
• **setByKey** - установка ~valueOf~ для стратегии **Key**
• **sort** - непосредственно метод **sort**, который использует заданную стратегию для сортировки массива объектов

~~~js
class SortStrategy  {
  constructor () {
    this.strategy = null
  }

  testStrategy (algorithm, key) {
    this.strategy = this[`setBy${algorithm}`]

    if (!(this.strategy instanceof Function)) {
      console.warn(`Valid strategy names: "SumOfAllNumericFields", "ArrayFieldLength", "Key" (here should be third argument - key name)`)
      const error = new Error('First argument should be the name of strategy')
      error.name = 'Invalid strategy'
      throw error
    }

    if (this.strategy === this.setByKey && !key) {
      const error = new Error('Third argument should be the name key field')
      error.name = 'Invalid key'
      throw error
    }
  }

  testData (data) {
    if (!(data instanceof Array)) {
      const error = new Error('Second argument should be array of objects')
      error.name = 'Invalid source data'
      throw error
      return false
    }
  }

  sort (algorithm, data, key) {
    this.testData(data)
    this.testStrategy(algorithm, key)
    this.strategy(data, key)
        
    data.forEach((item, index, arr) => {
      let current = index, prev = index
      while (--prev >= 0) {
        if (arr[current] < arr[prev]) {
          ;[arr[prev], arr[current]] = [arr[current], arr[prev]];
          current = prev
        }
      }
    })
  }

  setBySumOfAllNumericFields (arrayOfObjects) {
    return arrayOfObjects.map(item => Object.assign(item, {
      valueOf: function () {
        let res = 0
        Object.keys(this)
          .forEach(prop => res += typeof this[prop] === 'number' ? this[prop] : 0)
        return res
      }
    }))
  }

  setByArrayFieldLength (arrayOfObjects) {
    return arrayOfObjects
      .map(item => Object.assign(item, {
        valueOf: function () {
          const propName = Object.keys(this)
            .find(prop => Array.isArray(this[prop]))
          return this[propName].length
        }
      }))
  }

  setByKey (arrayOfObjects, keyField) {
    return arrayOfObjects
      .map((item, index, array) => array[index].valueOf = function () { return this[keyField] })
  }
}

const sortStrategy = new SortStrategy
~~~

Посмотрим, как работает экземпляр **sortStrategy**

Используем стратегию **Key** для сортировки массива **users**:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const users = [
  { name: 'Stephan', age: 30, works: 7, children: 2 },
  { name: 'Georg', age: 25, works: 2, children: 1 },
  { name: 'Mary', age: 34, works: 10, children: 1 },
  { name: 'Piter', age: 50, works: 25, children: 3 },
  { name: 'Helen', age: 40, works: 20, children: 3 },
  { name: 'Michael', age: 38, works: 16, children: 2 },
  { name: 'Andry', age: 45, works: 20, children: 2 }
]

sortStrategy.sort('Key', users, 'name')
console.log(users)
~~~

~~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {name: "Andry", age: 45, works: 20, children: 2, valueOf: ƒ}
  ► 1: {name: "Georg", age: 25, works: 2, children: 1, valueOf: ƒ}
  ► 2: {name: "Helen", age: 40, works: 20, children: 3, valueOf: ƒ}
  ► 3: {name: "Mary", age: 34, works: 10, children: 1, valueOf: ƒ}
  ► 4: {name: "Michael", age: 38, works: 16, children: 2, valueOf: ƒ}
  ► 5: {name: "Piter", age: 50, works: 25, children: 3, valueOf: ƒ}
  ► 6: {name: "Stephan", age: 30, works: 7, children: 2, valueOf: ƒ}
    length: 7
  ► __proto__: Array(0)
~~~~

{{{pattern-strategy-1.js}}}

__________________________________________


◘◘![ico-20 cap] ** 2**◘◘

~~~js
const salary = [
  { name: 'Stephan', jan: 5000, fab: 5200, mar: 5800, apr: 4950, may: 4700, jun: 5100, jul: 5300, aug: 5000, sep: 4900, nov: 4800, dec: 5500 },
  { name: 'Georg', jan: 2000, fab: 2200, mar: 2500, apr: 2550, may: 2400, jun: 2800, jul: 2100, aug: 2000, sep: 2200, nov: 2450, dec: 2700 },
  { name: 'Mary', jan: 3100, fab: 3200, mar: 3000, apr: 3400, may: 3000, jun: 3300, jul: 3400, aug: 3700, sep: 3800, nov: 3700, dec: 3900 },
  { name: 'Piter', jan: 2000, fab: 2250, mar: 1800, apr: 1950, may: 2100, jun: 2100, jul: 2700, aug: 2500, sep: 2900, nov: 2800, dec: 4000 },
  { name: 'Helen', jan: 2000, fab: 2100, mar: 1700, apr: 1900, may: 2000, jun: 2000, jul: 2500, aug: 2000, sep: 2400, nov: 2700, dec: 3500 },
  { name: 'Michael', jan: 3000, fab: 3200, mar: 2800, apr: 2950, may: 2700, jun: 3100, jul: 3300, aug: 4000, sep: 3900, nov: 3800, dec: 4500 },
  { name: 'Andry', jan: 2800, fab: 2700, mar: 2800, apr: 2750, may: 2700, jun: 2500, jul: 2800, aug: 2700, sep: 2700, nov: 2800, dec: 3000 }
]

sortStrategy.sort('SumOfAllNumericFields', salary)
console.log(salary)
~~~

~~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {name: "Helen", jan: 2000, fab: 2100, mar: 1700, apr: 1900, …}
  ► 1: {name: "Georg", jan: 2000, fab: 2200, mar: 2500, apr: 2550, …}
  ► 2: {name: "Piter", jan: 2000, fab: 2250, mar: 1800, apr: 1950, …}
  ► 3: {name: "Andry", jan: 2800, fab: 2700, mar: 2800, apr: 2750, …}
  ► 4: {name: "Michael", jan: 3000, fab: 3200, mar: 2800, apr: 2950, …}
  ► 5: {name: "Mary", jan: 3100, fab: 3200, mar: 3000, apr: 3400, …}
  ► 6: {name: "Stephan", jan: 5000, fab: 5200, mar: 5800, apr: 4950, …}
    length: 7
  ► __proto__: Array(0)
~~~~

{{{pattern-strategy-2.js}}}

____________________________________

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const workers = [
  { name: 'Stephan', payments: [ 5000, 5200, 5800, 4950, 4700, 5100, 5300, 5000, 4900, 4800, 5500 ] },
  { name: 'Georg', payments: [ 2000, 2200, 2500, 2550, 2400, 2800, 2100, 2000, 2200 ] },
  { name: 'Mary', payments: [ 900, 700, 1000, 1200, 200, 400, 250 ] },
  { name: 'Piter', payments: [ 1000, 2050, 1800, 700, 300, 500 ] },
  { name: 'Helen', payments: [ 200, 210, 170, 190, 200 ] },
  { name: 'Michael', payments: [ 3000, 3200, 2800, 2950 ] },
  { name: 'Andry', payments: [ 1000, 1000, 900, 950 ] }
]

sortStrategy.sort('ArrayFieldLength', workers)
console.log(workers)
~~~

~~~~console
▼ (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  ► 0: {name: "Michael", payments: Array(4), valueOf: ƒ}
  ► 1: {name: "Andry", payments: Array(4), valueOf: ƒ}
  ► 2: {name: "Helen", payments: Array(5), valueOf: ƒ}
  ► 3: {name: "Piter", payments: Array(6), valueOf: ƒ}
  ► 4: {name: "Mary", payments: Array(7), valueOf: ƒ}
  ► 5: {name: "Georg", payments: Array(9), valueOf: ƒ}
  ► 6: {name: "Stephan", payments: Array(11), valueOf: ƒ}
    length: 7
  ► __proto__: Array(0)
~~~~

{{{pattern-strategy-3.js}}}