const section = document.body

section.style.padding = 0

section.style.overflow = 'hidden'

const canvas = section
  .appendChild(document.createElement('canvas'));

[canvas.width, canvas.height] = [section.offsetWidth, section.offsetHeight]

const ctx = canvas.getContext('2d')

canvas[Symbol.iterator] = function* () {
  let counter = 0

  do {
    const imageData = ctx.getImageData(0, counter, canvas.width, 1)
    const row = imageData.data
    for (let x = 0; x < row.length; x += 4) {
      for (let index = 0; index < 4; index++) row[x + index] = Math.round(Math.random() * 255)
    }
    yield ctx.putImageData(imageData, 0, counter)
  } while (counter++ < canvas.height)
}

for (const x of canvas) {}