let section = document.body

function store () {
  return Array.from(arguments)
    .reduce((res, item) => res += item)
}

const demo = section
  .appendChild(document.createElement('h3'))

section.onkeypress = function (event) {
  store = store.bind(null, parseInt(event.key) || 0)
  demo.innerText = store()
}

function recurse (num) {
  if (num > 0) {
    section
      .dispatchEvent(Object.assign(new Event('keypress'), {
        key: Math.round(Math.random() * 9)
      }))
    requestAnimationFrame(recurse.bind(null, --num))
  }
}

recurse(200)
