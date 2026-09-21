const section = document.body

// Same as Classes-1-class.js: console.log has to land on the page.
const print = (...args) => {
  section.appendChild(document.createElement('div')).textContent = args.join(' ')
}

// Built with new Function rather than written out, because a function made
// this way is sloppy whatever the code around it is — and sloppy is the whole
// example. A plain call inside a constructor function sees the global object;
// the same call inside a class sees undefined, because a class body is always
// strict. Written straight into this file the difference would depend on the
// bundle that evaluates it, and would quietly disappear the day that bundle
// turned strict.
//
// console is a parameter for the same reason: a function built this way sees
// the globals and nothing else, so the page's console has to be handed to it.
const run = new Function('console', `
  function User (name) {
    const privateVar = prompt('Set privateVar value:')
    function showPrivate () {
      console.log(\`Oh dear, my call context is \${this}\`)
      console.log(\`But I can see the private variable: \${privateVar}\`)
    }
    this.name = name || 'Hippopotamus'
    this.show = function () {
      showPrivate ()
    }
  }

  const user = new User('Crocodile')
  user.show()
`)

run({ log: print })
