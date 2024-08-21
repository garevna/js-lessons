const section = document.body

const demo = section.appendChild(document.createElement('pre'))

const create = placeholder => new Promise(resolve => {
  const input = document.body
    .appendChild(document.createElement('input'))
  Object.assign(input, {
    placeholder,
    style: `
      padding: 4px 8px;
      font-size: 1rem;
      color: #09b;
    `,
    onchange (event) {
      resolve(event.target.value)
      event.target.remove()
    }
  })
})

const func = async () => {
  const user = {}
  const props = ['name', 'hobby', 'speciality']

  const responses = await Promise.all(props.map(prop => create(prop)))

  responses
    .forEach((val, index) => Object.assign(user, {
        [props[index]] : val
    }))
  return user
}

const show = object => Object.assign(demo, {
  innerText: JSON.stringify(object, null, '  ')
    .replace('"name"', 'name')
    .replace('"hobby"', 'hobby')
    .replace('"speciality"', 'speciality')
})

func().then(show)
