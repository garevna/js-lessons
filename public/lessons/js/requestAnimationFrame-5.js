const section = document.body

const createPromise = async message => resolve => resolve(message)
const demo = section
  .appendChild(document.createElement('h3'))

function recurse (message) {
  const array = message.split('')
  const char = array.shift()

  if (char) {
    demo.textContent += char
    requestAnimationFrame(recurse.bind(null, array.join('')))
  }
}

requestAnimationFrame(recurse.bind(null, 'Old ECMAScript versions was named by numbers: ES5 and ES6.'))
