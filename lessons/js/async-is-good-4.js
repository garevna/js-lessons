let section = document.body

async function getLogin(resolve, reject) {
  const waitServerAnswer = section.appendChild(document.createElement('p'))
  waitServerAnswer.innerHTML = 'Waiting for server response...'
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()
  waitServerAnswer.remove()

  const logins = Object.keys(users)

  const userInput = Object.assign(section.appendChild(document.createElement('input')), {
    oninput: function (event) {
      const test = logins.filter(login => login.indexOf(event.target.value) !== -1).length > 0

      event.target.style.color = test ? '#090' : '#900'
      event.target.title = test ? 'OK' : 'There are no such user in DB'
    },
    onchange: async event => {
      const res = logins.find(login => login === event.target.value)
      userInput.remove()

      !res ? reject('Not found') : resolve(users[res])
    }
  })
}

const tab = '&nbsp;&nbsp;&nbsp;&nbsp;'
const clear = (string, index) => string.replaceAll('"', index ? '\'' : '')
const test = item => item !== '{' && item !== '}'

function resolve (response) {
  const toPrint = JSON.stringify(response)
    .replace('{', `{<br>${tab}`)
    .replaceAll('","', `,<br>${tab}`)
    .replace('}', '<br>}')
    .split('<br>')
    .map(item => test ? item.split(':').map(clear).join(':') : item)
    .join('<br>')

  section.innerHTML = toPrint
}

function reject (err) {
  section.innerHTML = `<p class="error">${err}</p>`
}

getLogin(resolve, reject)
