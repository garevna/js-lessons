const section = document.body

section.style['white-space'] = 'pre-wrap'

let stop = false

const show = resp => section.innerText += resp

const promise = message => new Promise(resolve => {
  const time = Math.round(Math.random() * 3000)
  setTimeout(() => resolve(`\n${message}: ${time}`), time)
})

async function test () {
  const res = await promise(await promise(await promise('start')))
  stop = true
  return res
}

test().then(show)

function draw () {
  show('.')
  !stop && requestAnimationFrame(draw)
}

draw()
