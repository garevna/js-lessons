const section = document.body

section.style = `font-size: 13px; font-family: monospace;`

const validStrategyNames = [
  'sum-of-all-numeric-fields',
  'array-field-length',
  'key'
]

function strategyError () {
  const stack = `
    Valid strategy names:<br>
      • sum-of-all-numeric-fields<br>
      • array-field-length<br>
      • key (key name should be third argument.)
  `
  throw Object.assign(new Error('Invalid strategy.'), {
    name: 'Invalid strategy.',
    message: 'First argument should be the name of strategy.',
    stack
  })
}

function dataError () {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Source data error.',
    message: 'Invalid source data.',
    stack: 'Source data should be the array of objects.'
  })
}

function keyError () {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Sorting key error.',
    message: 'Empty key field.',
    stack: 'Third argument should be the name of key field.'
  })
}

function keyPropError (key) {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Sorting error.',
    message: `Invalid key ${key}.`,
    stack: `There is no prop  in source data.`
  })
}

function arrayFieldError () {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Invalid source data or sorting algorithm.',
    message: 'The sorting algorithm is not suitable for the source data.',
    stack: 'There are no array fields in source data records.'
  })
}

function testStrategy (strategyName, data, key) {
  console.log(strategyName, key)
  console.log(data)
  if (!validStrategyNames.includes(strategyName)) return strategyError()

  if (!Array.isArray(data)) return dataError()

  if (strategyName === 'key' && !key) return keyError()

  if (strategyName === 'key' && !data.filter(record => record[key]).length) {
    return keyPropError(key)
  }

  if (strategyName === 'array-field-length') {
    const tmp = data
      .filter(record => Object.keys(record).filter(key => Array.isArray(record[key])).length)
      .length

    if (!tmp) arrayFieldError()
  }
}

class SortStrategy  {
  constructor () {
    Object.assign(this, {
      strategy: null,
      testStrategy
    })
  }

  sort (algorithm, data, key) {
    this.testStrategy(algorithm, data, key)

    this[algorithm](data, key)

    data.forEach((record, index, arr) => {
      let current = index, prev = index
      while (--prev >= 0) {
        if (arr[current] + 0 < arr[prev] + 0) {
          ;[arr[prev], arr[current]] = [arr[current], arr[prev]]
          current = prev
        }
      }
    })
  }

  'sum-of-all-numeric-fields' (arrayOfObjects) {
    return arrayOfObjects
      .map(item => item.valueOf = function () {
         return Object.keys(this)
           .reduce((res, prop) => res += Number(this[prop]) || 0, 0)
      })
  }

  'array-field-length' (arrayOfObjects) {
    return arrayOfObjects
      .map(item => item.valueOf = function () {
        const propName = Object.keys(this)
          .find(prop => Array.isArray(this[prop]))
        return this[propName].length
      })
  }

  'key' (arrayOfObjects, keyField) {
    return arrayOfObjects
      .map((item, index, array) => Object.assign(array[index], {
        valueOf () { return this[keyField] }
      }))
  }
}

const sortStrategy = new SortStrategy

function show (data) {
  demo.innerText = ''
  data.forEach((record, index) => {
    demo.innerText += `► ${index}: {`
    Object.keys(record)
      .forEach(prop => prop === 'valueOf' ? null : demo.innerText += ` ${prop}: ${record[prop]},`)
    demo.innerText = demo.innerText.slice(0,-1) + ` }\n`
  })
}

function showError (error) {
  demo.innerHTML = `
    <h4 style="color: #a00">
      ${error.name}<br>
      ${error.message}<br>
      ${error.stack}
    </h4>
  `
}

function sort (algorithm, data, key) {
  try {
    sortStrategy.sort(algorithm, data, key)
    show(data)
  } catch (error) {
    showError(error)
  }
}

const salary = [
  { name: 'Stephan', jan: 5000, fab: 5200, mar: 5800, apr: 4950, may: 4700, jun: 5100, jul: 5300, aug: 5000, sep: 4900, nov: 4800, dec: 5500 },
  { name: 'Georg', jan: 2000, fab: 2200, mar: 2500, apr: 2550, may: 2400, jun: 2800, jul: 2100, aug: 2000, sep: 2200, nov: 2450, dec: 2700 },
  { name: 'Mary', jan: 3100, fab: 3200, mar: 3000, apr: 3400, may: 3000, jun: 3300, jul: 3400, aug: 3700, sep: 3800, nov: 3700, dec: 3900 },
  { name: 'Piter', jan: 2000, fab: 2250, mar: 1800, apr: 1950, may: 2100, jun: 2100, jul: 2700, aug: 2500, sep: 2900, nov: 2800, dec: 4000 },
  { name: 'Helen', jan: 2000, fab: 2100, mar: 1700, apr: 1900, may: 2000, jun: 2000, jul: 2500, aug: 2000, sep: 2400, nov: 2700, dec: 3500 },
  { name: 'Michael', jan: 3000, fab: 3200, mar: 2800, apr: 2950, may: 2700, jun: 3100, jul: 3300, aug: 4000, sep: 3900, nov: 3800, dec: 4500 },
  { name: 'Andry', jan: 2800, fab: 2700, mar: 2800, apr: 2750, may: 2700, jun: 2500, jul: 2800, aug: 2700, sep: 2700, nov: 2800, dec: 3000 }
]

const workers = [
  { name: 'Stephan', payments: [5000, 5200, 5800, 4950, 4700, 5100, 5300, 5000, 4900, 4800, 5500] },
  { name: 'Georg', payments: [2000, 2200, 2500, 2550, 2400, 2800, 2100, 2000, 2200] },
  { name: 'Mary', payments: [900, 700, 1000, 1200, 200, 400, 250] },
  { name: 'Piter', payments: [1000, 2050, 1800, 700, 300, 500] },
  { name: 'Helen', payments: [200, 210, 170, 190, 200] },
  { name: 'Michael', payments: [3000, 3200, 2800, 2950] },
  { name: 'Andry', payments: [1000, 1000, 900, 950] }
]

const users = [
  { name: 'Stephan', age: 30, works: 7, children: 2 },
  { name: 'Georg', age: 25, works: 2, children: 1 },
  { name: 'Mary', age: 34, works: 10, children: 1 },
  { name: 'Piter', age: 50, works: 25, children: 3 },
  { name: 'Helen', age: 40, works: 20, children: 3 },
  { name: 'Michael', age: 38, works: 16, children: 2 },
  { name: 'Andry', age: 45, works: 20, children: 2 }
]

const addElem = (tagName, container = section) => container.appendChild(document.createElement(tagName))

const strategySelector = Object.assign(addElem('select'), {
  onchange (event) {
    input.style.display = event.target.value === 'key' ? 'inline-block' : 'none'
    sort(event.target.value, dataSelector.getData(), input.value)
  }
})

for (const item of validStrategyNames.concat(['invalid-strategy'])) {
  const option = Object.assign(addElem('option', strategySelector), {
    innerText: item
  })
}

const input = Object.assign(addElem('input'), {
  value: 'name',
  style: `display: none`,
  onchange: function (event) {
    sort(strategySelector.value, dataSelector.getData(), event.target.value)
  }
})

const dataSelector = Object.assign(addElem('select'), {
  getData () {
    return { users, salary, workers, other: null }[this.value]
  },
  onchange (event) {
    sort(strategySelector.value, this.getData(), input.value)
  }
})

for (const item of ['users', 'salary', 'workers', 'other']) {
  const option = Object.assign(addElem('option', dataSelector), {
    innerText: item
  })
}

const demo = addElem('figure')

const styles = Object.assign(addElem('style'), {
  textContent: `
  select, option {
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 16px;
    font-weight: bold;
    background: #eee;
    color: #079;
  }

  input {
    border: solid 1px #ddd;
    border-radius: 4px;
    padding: 8px 16px;
  }

  figure {
    border: solid 1px #ddd;
    border-radius: 4px;
    padding: 16px;
    margin: 16px 0;
    font-size: 13px;
    font-family: monospace;
  }
`
})

sort(strategySelector.value, dataSelector.getData(), input.value)
