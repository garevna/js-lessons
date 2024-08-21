const section = document.body

section.style.fontFamily = 'monospace'

let stop = false

// section.onclick = () => { stop = true }
document.body.onclick = () => { stop = true }

const showTime = function () {
  section.innerHTML = `<h3>${Date.now()}</h3>`
  !stop && requestAnimationFrame(showTime)
}

showTime()
