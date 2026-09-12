# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

☼☼☼ {{s1.slogan1}} ☼☼☼

## ![ico-30 icon] {{s2.h1}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

![](illustrations/Error-constructor.png)

{{s3.p2}}

{{s3.p3}}
{{s3.p4}}

{{s3.p5}}

~~~js
var err = new Error('Arguments are not valid')
console.dir(err)
~~~

![](illustrations/Error-example-01.png)

{{s3.p6}}

{{s3.p7}}

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

{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

### ![ico-20 icon] {{s4.h1}}

![](illustrations/SyntaxError.png)

{{s4.p1}}

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

### ![ico-20 icon] {{s5.h1}}

![](illustrations/ReferenceError.png)

{{s5.p1}}

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

### ![ico-20 icon] {{s6.h1}}

![](illustrations/TypeError.png)

{{s6.p1}}

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

## ![ico-30 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

{{s7.p3}}

{{s7.p4}}

{{s7.p5}}

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

throw syntaxError
~~~

![](illustrations/SyntaxError-example-02.png)

{{s7.p6}}

{{s7.p7}}

________________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

{{s8.p2}}

{{s8.p3}}

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

{{s8.p4}}

~~~js
var x = obj.name
~~~

{{s8.p5}}

{{s8.p6}}

__________________________________

{{s8.p7}}

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

{{s8.p8}}

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


{{s8.p9}}

{{s8.p10}}

~~~js
var obj = null

try {
  var x = obj.name
} catch {
  x = null
}
~~~

{{s8.p11}}

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

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
{{s9.p3}}

{{s9.p4}}

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

{{s9.p5}}

{{s9.p6}}

____________________________

{{s9.p7}}

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

{{s9.p8}}

~~~js
try {
  throw({ name: 'Hi', message: 'It\'s a joke' } )
} catch (err) {
  console.log(err.name, err.message)
}
~~~

_________________

{{s9.p9}}

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

## {{s10.h1}}

{{s10.p1}}

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

{{s10.p2}}
