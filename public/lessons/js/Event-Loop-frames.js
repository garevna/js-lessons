const out = document.body.appendChild(document.createElement('pre'))

const burst = (schedule, mark, left, after) => {
  const step = () => {
    out.textContent += mark
    --left ? schedule(step) : after()
  }
  schedule(step)
}

let drawing = true

const frame = () => {
  out.textContent += '*'
  if (drawing) requestAnimationFrame(frame)
}

requestAnimationFrame(frame)

burst(queueMicrotask, '.', 30, () => {
  out.textContent += '\n'
  burst(fn => setTimeout(fn), 'o', 30, () => { drawing = false })
})
