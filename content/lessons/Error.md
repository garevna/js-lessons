# ![ico-30 study] Exceptions

{{p1}}
{{p2}}

{{p3}}

{{p4}}

☼☼☼ {{p5}} ☼☼☼

## ![ico-30 icon] {{p6}}

### ![ico-20 icon] Error

{{p7}}

![](illustrations/Error-constructor.png)

{{p8}}

{{p9}}
{{p10}}

![ico-25 cap] ** 1**

~~~js
var err = new Error('Arguments are not valid')
console.dir(err)
~~~

![](illustrations/Error-example-01.png)

{{p11}}

![ico-25 cap] ** 2**

~~~js
var error = Object.assign(new Error('Hello'), {
  fileName: 'figure',
  lineNumber: 11,
  stack: 'Welcome'
})

console.dir(error)
console.error(error)
~~~

![](illustrations/Error-example-02.png)

_________________

{{p12}}
{{p13}}
{{p14}}

### ![ico-20 icon] SyntaxError

![](illustrations/SyntaxError.png)

![ico-25 cap] ** 3**

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

console.dir(syntaxError)
console.error(syntaxError)
~~~

![](illustrations/SyntaxError-example-01.png)

_________________________

### ![ico-20 icon] ReferenceError

![](illustrations/ReferenceError.png)

![ico-25 cap] ** 4**

~~~js
const referenceError = Object.assign(new ReferenceError(), {
  message: 'We do not know such a person.',
  name: 'Identification Error.',
  stack: 'Search for person failed.'
})
console.dir(referenceError)
console.error(referenceError)
~~~

![](illustrations/ReferenceError-example-01.png)
________________________

### ![ico-20 icon] TypeError

![](illustrations/TypeError.png)

![ico-25 cap] ** 5**

~~~js
const typeError = Object.assign(new TypeError(), {
  message: 'Invalid pincode',
  name: 'Custom Error',
  stack: 'Look here...'
})

console.dir(typeError)
console.error(typeError)
~~~

![](illustrations/TypeError-example-01.png)

____________________________

## ![ico-30 icon] {{p15}}

{{p16}}

{{p17}}

{{p18}}

{{p19}}

![ico-25 cap] ** 6**

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

throw syntaxError
~~~

![](illustrations/SyntaxError-example-02.png)

{{p20}}

{{p21}}

________________________

## ![ico-25 icon] try ... catch

{{p22}}

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

{{p23}}

![ico-25 cap] ** 7**

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

{{p24}}

~~~js
var x = obj.name
~~~

{{p25}}

{{p26}}

__________________________________

![ico-25 cap] ** 8**

~~~js
function outerFunc () {
  return innerFunc()
}

function innerFunc () {
  try {
    return sample()
  } catch (err) {
    console.group(err.name)
    console.warn(err.message)
    console.groupEnd(err.name)
    return err.name === 'ReferenceError' ? 1 : 2
  }
}

console.log('Result:', outerFunc())
~~~

![](illustrations/Error-example-reference-error-01.png)

![ico-25 cap] ** 9**

~~~js
sample = 5

function outerFunc () {
  return innerFunc()
}

function innerFunc () {
  try {
    return sample()
  } catch (err) {
    console.group(err.name)
    console.warn(err.message)
    console.groupEnd(err.name)
    return err.name === 'ReferenceError' ? 1 : 2
  }
}

console.log('Result:', outerFunc())
~~~

![](illustrations/Error-example-type-error-01.png)

_________________________


^^^[ES 2019]

{{p27}}

~~~js
var obj = null

try {
  var x = obj.name
} catch {
  x = null
}
~~~

^^^

### ![ico-20 icon] finally

{{p28}}

![ico-25 cap] **10**

~~~js
try {
  throw({
    name: 'Hi',
    message: 'It\'s a joke',
    stack: `
      Hello,
      sorry for the interruption,
      I really wanted to say hello 😉
    `
  })
} catch (err) {
    console.error(err.stack)
} finally {
   console.info('try...catch completed')
}
~~~

![](illustrations/try-catch-finally-01.png)

____________________________
![ico-25 cap] **11**

{{p29}}

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

{{p30}}

••![ico-20 error] Error: Arguments not valid••

____________________________

![ico-25 cap] **12**

~~~js
var num = {}

try {
  if (typeof num !== 'number') {
    var err = new Error('Arguments not valid')
    err.name = 'ValidationError'
    throw err
  }
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}

console.dir(err)
~~~

![](illustrations/Error-example-12.png)

_________________

![ico-25 cap] **13**

~~~js
try {
  throw({ name: 'Hi', message: 'It\'s a joke' } )
} catch (err) {
  console.log(err.name, err.message)
}
~~~

_________________

![ico-25 cap] **14**

~~~js
try {
  throw({
    name: 'Hi',
    message: 'It\'s a joke',
    stack: `
      Привет,
      извините за вмешательство,
      очень хотелось поздороваться 😉
    `
  })
} catch (err) { console.error(err.stack) }

~~~

_________________________

## AggregateError

![ico-25 cap] **15**

~~~js
const array = [5, 'hero', false, 9, { type: 0 }, [], 11, 34.5, 8.5, 77]

function parseArray (array, errors = []) {
  if (!Array.isArray(array)) {
    errors.push(new TypeError('Argument should be an array'))
    return errors
  }
  const name = 'Parse Array Error'
  array.forEach((item, index) => !Number.isInteger(item) &&
    errors
      .push(Object.assign(new SyntaxError(), { name, stack: `Array element ${index} is not an integer.` })))
  return errors
}

const aggregatedError = new AggregateError(parseArray(array))

Object.assign(aggregatedError, {
  stack: 'Parse Array Errors:\n' + aggregatedError.errors.map(err => '    ' + err.stack).join('\n')
})

throw aggregatedError
~~~

![](illustrations/AggregateError-example-01.png)

__________________________________

※※※exercises ⟦f11⟧※※※
