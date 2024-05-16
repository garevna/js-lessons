const section = document.body

const numbers = [10, 5, 7]

const randomNum = lim => Math.floor(Math.random() * lim)

const summation = () => numbers[randomNum(numbers.length - 1)] = randomNum(20)

const show = () => section.innerHTML += `<p>[${numbers.toString().split(',').join(', ')}]</p>`

const callFunc = () => {
  if (Math.random() > 0.5) {
    summation()
    show ()
  } else {
    show ()
    summation()
  }
}

for (const x of [1, 2, 3, 4, 5]) setTimeout(callFunc, 1000 * x)
