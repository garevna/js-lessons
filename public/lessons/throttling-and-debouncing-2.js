const section = document.body

const debounce = function (func, interval) {
  let lastCall = null
    
  const testInterval = function () {
    let int = new Date().getTime() - lastCall
    lastCall = !int ? new Date().getTime() : lastCall
    return int ? int >= interval : true
  }.bind(func)
    
  return function (args) {
    let test = testInterval()
    test && this(args)
  }.bind(func)
}

function inputHandler (event) {
  if (!event.target.value) {
    event.target.label.innerText = "..."
    return
  }
  const elem = event.target

  fetch(`https://garevna-json-server.glitch.me/usernames/${event.target.value}`)
    .then(response => response.json())
    .then(response => {
      if (response && response.name) {
        elem.label.innerText = response.name
        elem.style.color = 'green'
      } else {
        elem.style.color = 'red'
      }
    })
}

const inputHandlerDebounced = debounce(inputHandler, 1000)

const style = section.appendChild(document.createElement('style'))

style.textContent = `
    input {
        padding: 4px 10px;
    }
    label {
        padding-left: 5px;
        font-family: Arial;
        font-style: italic;
        font-size: 0.8rem;
        color: #777;
    }
`

const createInput = () => {
  const inp = section.appendChild(document.createElement('input'))
  inp.id = 'usernames'

  inp.oninput = inputHandlerDebounced

  const label = section.appendChild(document.createElement('label'))

  label.for = 'usernames'
  label.innerText = '...'

  inp.label = label
}

createInput ()