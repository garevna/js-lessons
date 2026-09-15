# ![ico-30 icon] Throttling and Debouncing

{{s0.p1}}
{{s0.p2}}
{{s0.p3}}
{{s0.p4}}

[%%%lodash%%%](https://lodash.com/)

{{s0.p5}}

_____________________________________________________________

## ![ico-25 icon] Throttling

{{s0.p6}}
{{s0.p7}}
{{s0.p8}}

{{s0.p9}}

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

{{s0.p10}}
{{s0.p11}}
{{s0.p12}}
{{s0.p13}}
{{s0.p14}}
{{s0.p15}}
{{s0.p16}}
{{s0.p17}}

{{s0.p18}}

{{s0.p19}}

◘◘![ico-20 file] showPicture◘◘

~~~js
function showPicture () {
  const img = document.body.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}
~~~

{{s0.p20}}

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

{{s0.p21}}

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

{{s0.p22}}

{{{throttling-and-debouncing-1.js}}}

_____________________________________________________________

## ![ico-25 icon] Debouncing

{{s0.p23}}
{{s0.p24}}

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

{{s0.p25}}

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

{{s0.p26}}

~~~js
const inputHandlerDebounced = debounce(inputHandler, 1000)
~~~

{{s0.p27}}
{{s0.p28}}

{{s0.p29}}

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

{{s0.p30}}
{{s0.p31}}

◘◘![ico-20 cap] {{common.c193}}◘◘

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
