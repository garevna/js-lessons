const section = document.body

let numbers = [10, 5, 7]
let sum = 0

const summation = () => setTimeout(() => {
  while (numbers.length > 0) {
    sum += numbers.shift()
  }
  return sum
}, Math.random() * 2000)

const show = () => setTimeout(() => section.innerHTML += `<p>[ ${numbers.toString()} ] : ${sum}</p>`, Math.random() * 1500)

const callFunc = () => {
  numbers = [10, 5, 7]
  sum = 0
  if (Math.random() > 0.5) {
    summation()
    show ()
  } else {
    show ()
    summation()
  }
}

for (const x of [1, 2, 3, 4, 5]) callFunc()
