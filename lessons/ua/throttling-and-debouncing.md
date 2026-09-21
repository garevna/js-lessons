# ![ico-30 icon] Throttling and Debouncing⟪Throttling_and_Debouncing⟫

Деякі ресурсомісткі функції,
функції, виконання яких триває достатньо довго, щоб їх часті виклики вплинули на продуктивність додатка,
а також функції, що «навантажують» сервер (тобто надсилають AJAX-запити)
небажано запускати занадто часто

[%%%lodash%%%](https://lodash.com/)

Для обмеження кількості викликів такої функції можна використовувати прийом «дроселювання» (**throttling**)

_____________________________________________________________

## ![ico-25 icon] Throttling⟪Throttling⟫

Завдання — обмежити кількість викликів функції
шляхом встановлення інтервалу часу,
який має минути з моменту попереднього виклику

^^Напишемо функцію-декоратор :^^

◘◘![ico-20 file] throttle◘◘

~~~js
const throttle = function (func, interval) {
  func.lastCall = null

  func.testInterval = () => {
    const int = new Date().getTime() - this.lastCall
    this.lastCall = !int
      ? new Date().getTime()
      : int >= interval
        ? new Date().getTime()
        : this.lastCall
    return int ? int >= interval : true
  }

  return function (args) {
    const test = this.testInterval()
    test && this(args)
  }.bind(func)
}
~~~

Тут використано патерн «Декоратор» і прийом «замикання»,
що дозволяють отримати новий екземпляр на основі вихідної функції **func** \
(перший формальний параметр),
який зберігає час останнього виклику у власній властивості **lastCall**
та оновлює його значення лише тоді, коли минув встановлений інтервал **interval**
(другий формальний параметр).
Функція виконується лише в тому випадку,
якщо з моменту попереднього «спрацьовування» колбека минуло не менше **interval** мс.

Зверніть увагу, що ми не використовуємо тут «важку артилерію» таймерів.

Тепер створимо, власне, функцію, яку будемо декорувати:

◘◘![ico-20 file] showPicture◘◘

~~~js
function showPicture () {
  const img = document.body.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}
~~~

Створимо новий екземпляр функції **showPictureThrottle** за допомогою декоратора **_throttle_**.

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

Створимо кнопку, при натисканні на яку викликатиметься функція **showPictureThrottle**:

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

Тепер можна натискати на кнопку — зображення вставлятиметься не частіше ніж 1 раз на секунду ![ico-20 smile].

{{{throttling-and-debouncing-1.js}}}

_____________________________________________________________

## ![ico-25 icon] Debouncing⟪Debouncing⟫

Тут буде незначна відмінність від попереднього варіанту функції-декоратора
Функція **debounce** також перевіряє інтервал часу, що минув з моменту останнього виклику

◘◘![ico-20 file] debounce◘◘

~~~js
const debounce = function (func, interval) {
  func.lastCall = null

  func.testInterval = () => {
    const int = new Date().getTime() - this.lastCall
    this.lastCall = !int ? new Date().getTime() : this.lastCall
    return int ? int >= interval : true
  }

  return function (args) {
    const test = this.testInterval()
    test && this(args)
    }.bind(func)

}
~~~

Якщо всередині рядка зустрічаються подвійні лапки, то сам рядок має бути укладений у одинарні лапки, і навпаки

◘◘![ico-20 cap] inputHandler◘◘

~~~js
function inputHandler (event) {
  if (!event.target.value) {
    event.target.label.innerText = '...'
    return
  }
  fetch(`https://js-lessons-sandbox.garevna.workers.dev/json-server/usernames/${event.target.value}`)
    .then(response => response.json())
    .then(response => {
      if (response && response.name) {
        event.target.label.innerText = response.name
        event.target.style.color = 'green'
      } else {
        event.target.style.color = 'red'
      }
    })
}
~~~

Тепер створимо екземпляр колбека, декорований за допомогою функції **debounce**:

~~~js
const inputHandlerDebounced = debounce(inputHandler, 1000)
~~~

Цей екземпляр надсилатиме запит на сервер лише в тому випадку, якщо з моменту останнього введення користувачем минула 1 секунда
Якщо вводити символи дуже швидко, запит не надсилатиметься

Додамо трохи стилів:

~~~js
const style = document.head
  .appendChild(document.createElement('style'))

style.textContent = `
  input {
    padding: 4px 12px;
  }
  label {
    padding-left: 8px;
    font-family: Arial;
    font-style: italic;
    font-size: 0.8rem;
    color: #777;
  }
`
~~~

А тепер оголосимо функцію, яка створює та вставляє на сторінку елемент input,
і викличемо її:

◘◘![ico-20 cap] Запуск◘◘

~~~js
const createInput = () => {
  const inp = document.body
    .appendChild(document.createElement('input'))
  inp.id = 'usernames'

  inp.oninput = inputHandlerDebounced

  const label = document.body
    .appendChild(document.createElement('label'))

  label.for = 'usernames'
  label.innerText = '...'

  inp.label = label
}

createInput()
~~~

{{{throttling-and-debouncing-2.js}}}
