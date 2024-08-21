const section = document.body

const createPromise = async message => resolve => resolve(message)

function recurse (demo, message) {
  const array = message.split('')
  const char = array.shift()

  if (char) {
    demo.textContent += char
    requestAnimationFrame(recurse.bind(null, demo, array.join('')))
  }
}

const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]

messages
  .forEach(message => {
    const demo = section
      .appendChild(document.createElement('h3'))
    requestAnimationFrame(recurse.bind(null, demo, message))
  })
