const section = document.body

fetch('http://api.ipstack.com/134.201.250.155?access_key=e3f9d2a948e477f33986eb0ad4bf0815')
  .then(response => response.json())
  .then(response => Object.keys(response).forEach(prop => {
    console.log(prop)
    section.appendChild(document.createElement('p'))
      .innerHTML = `<span style='#09b'>${prop}</span>: ${response[prop]}`
  }))