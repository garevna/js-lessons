const section = document.body

// The lesson's output is a console, and the reader is not looking at one. Every
// console.log below goes into the black block on the page instead — which is
// the point of running this rather than printing a made-up result: whatever
// you type into the prompt is what you see.
const print = (...args) => {
  section.appendChild(document.createElement('div')).textContent = args.join(' ')
}

const console = { log: print }

class User {
  constructor (name) {
    const privateVar = prompt('Set privateVar value:')

    function showPrivate () {
      console.log(`Oh dear, my call context is ${this}`)
      console.log(`But I can see the private variable: ${privateVar}`)
    }
    this.name = name || 'Hippopotamus'
    this.show = function () {
      showPrivate ()
    }
  }
}

const user = new User('Crocodile')
user.show()
