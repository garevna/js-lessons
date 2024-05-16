# ![ico-30 icon] Throttling and Debouncing

Некоторые ресурсоемкие функции, 
функции, выполняющиеся достаточно долго, чтобы их частые вызовы отразились на производительности приложения,
а так же функции, "дергающие" сервер ( т.е. отправляющие AJAX запросы )
нежелательно запускать слишком часто

[%%%lodash%%%](https://lodash.com/)

Для ограничения числа вызовов такой функции можно использовать прием "дроссель" ( **throttling** )

_____________________________________________________________

## ![ico-25 icon] Throttling

Задача - ограничить число вызовов функции 
путем установки интервала времени, 
который должен пройти с момента предыдущего вызова

^^Напилим функцию-декоратор :^^

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

Здесь использован паттерн "Декоратор" и прием "замыкание",
позволяющие получить новый экземпляр на базе исходной функции **func** \
( первый формальный параметр ),
который хранит время последнего вызова в собственном свойстве **lastCall**
и обновляет его значение только тогда, когда истек установленный интервал **interval**
( второй формальный параметр )
Функция исполняется только в том случае,
если с момента предыдущего "срабатывания" колбэка прошло не менее **interval** мс

Обратите внимание, что мы не используем здесь "тяжелую артиллерию" таймеров

Теперь создадим, собственно, функцию, которую будем декорировать:

◘◘![ico-20 file] showPicture◘◘

~~~js
function showPicture () {
  const img = document.body.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}
~~~

Создадим новый экземпляр функции **showPictureThrottle** с помощью декоратора **_throttle_**

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

Создадим кнопку, при клике на которой будет вызываться функция **showPictureThrottle**:

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

Теперь можно кликать на кнопке - картинка будет вставляться не чаще 1 раза в секунду ![ico-20 smile]

{{{Throttle-and-Debounce-1.js}}}

_____________________________________________________________

## ![ico-25 icon] Debouncing

Здесь будет незначительное отличие от предыдущего варианта функции-декоратора
Функция **debounce** также проверяет интервал времени, прошедший с момента последнего вызова

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

Если внутри строки встречаются двойные кавычки, то сама строка должна быть завернута в одинарные, и наоброт

◘◘![ico-20 cap] inputHandler◘◘

~~~js
function inputHandler (event) {
  if (!event.target.value) {
    event.target.label.innerText = '...'
    return
  }
  fetch(`https://garevna-json-server.glitch.me/usernames/${event.target.value}`)
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

Теперь создадим экземпляр колбэка, декорированный с помощью функции **debounce**:

~~~js
const inputHandlerDebounced = debounce ( inputHandler, 1000 )
~~~

Этот экземпляр будет посылать запрос на сервер только в том случае, если с момента последнего ввода пользователя прошла 1 секунда
Если вводить символы очень быстро, запрос отправляться не будет

Добавим немного стилей:

~~~js
const style = document.head
  .appendChild(document.createElement('style'))

style.textContent = `
  input {
    padding: 4px 10px;
  }
  label {
    padding-left: 5px;
    font-family: Arial;
    font-style: italic;
    font-size: 0.8rem;
    color: #777;
  }
`
~~~

А теперь объявим функцию, которая создает и вставляет на страницу элемент input,
и вызовем ее:

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

{{{Throttle-and-Debounce-2.js}}}