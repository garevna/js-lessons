const section = document.body

const icon = '<img src="https://www.webfx.com/assets/emoji-cheat-sheet/img/graphics/emojis/warning.png" width="20" style="vertical-align:text-bottom" />'

function* testArgGenerator (x) {
  section.innerHTML += `<p><small>I receive: x = ${x}</small></p>`
  const y = yield x + 1
  section.innerHTML += `<p><small>I remember: x = ${x}</small></p><p><small>I receive: y = ${y}</small></p>`
  const z = yield y * 2
  section.innerHTML += `<p><small>I remember: x = ${x}, y = ${y}</small></p><p><small>I receive: z = ${z}</small></p>`
  return x + y + z
}

var testArg = testArgGenerator(10)

for (const num of [0, 15, 6]) {
  const val = testArg.next(num).value
  section.innerHTML += `
    <p style="background-color: #ffff0050; color: #fd5; padding: 2px 4px; text-shadow: 1px 1px 2px #000;">
      ${icon} <small style="color: #999;">►</small> Emitted value: ${val}
    </p>`
}