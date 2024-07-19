let section = document.body

var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(https://cdn2.iconfinder.com/data/icons/user-23/512/User_Yuppie_2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 5px 10px 5px 30px;
`
section.appendChild(btn)

const callback = event => section.innerHTML += `<p>target: <span style="color:#092">${ event.currentTarget.tagName === 'SECTION' ? 'BODY' : event.currentTarget.tagName }</span> eventPhase: <span style="color:#092">${event.eventPhase}</span></p><hr>`

btn.addEventListener('click', callback, true)

section.addEventListener('click', callback, true)
