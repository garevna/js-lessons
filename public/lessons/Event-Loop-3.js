const section = document.body

section.onclick = (() => {
  let counter = 0
  return event => counter++ && message(`body clicked ${counter - 1} times`)
})()

function message (text) {
  section.innerHTML += `<small style="user-select: none">${text}</small><br>`
}

function getUser(since, index = 1) {
  return fetch(`https://api.github.com/users?since=${since}`)
    .then(response => response.json())
    .then(users => message(`github user ${index}: ${users[0].login}`))
}

message('start')

setTimeout(() => message('timeout 0'), 3000)

getUser(10)

setTimeout(() => message('timeout 1'), 2000)

getUser(250, 2)

setTimeout(() => message('timeout 2'), 100)

getUser(300, 3)

setTimeout(() => message('timeout 3'), 50)

section.dispatchEvent(new Event('click'))
