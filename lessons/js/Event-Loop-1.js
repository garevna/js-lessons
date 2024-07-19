const section = document.body

function message (text) {
  section.innerHTML += `<small style="user-select: none">${text}</small><br>`
}

let start = new Date().getTime()

setTimeout(() => message(`Timer real time: ${new Date().getTime() - start} ms`), 0)

for (var x = 0; x < 2000000000; x++) continue

message('Loop "for" finished')
