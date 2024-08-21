const section = document.body

section.style.fontFamily = 'monospace'

function showTime () {
  const demo = section
    .appendChild(document.createElement('h3'))
  Object.assign(demo, {
    start: Date.now(),
    timer: setInterval(() => {
      demo.innerHTML = 'Timer for 1000ms:  <span style="color: #f50">' + (Date.now() - demo.start) + '</span>'
      demo.start = Date.now()
    }, 1000)
  })

  section.onclick = function () {
    clearInterval(demo.timer)
    clearInterval(interval)
  }

  section.onmouseover = function () {
    for (let i = 0; i < 100000; i++) continue
  }
}

showTime()

var interval = setInterval(() => {
  for (let i = 0; i < 10000; i++) {
    section.dispatchEvent(new Event('mouseover'))
  }
}, 5)
