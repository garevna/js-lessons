# ![ico-30 icon] {{p1}}

••••
{{p2}}
••••

{{p3}}
{{p4}}

[%%%lodash%%%](https://lodash.com/)

{{p5}}

_____________________________________________________________

## ![ico-25 icon] Throttling

{{p6}}
{{p7}}
{{p8}}

{{p9}}

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

{{p10}}
{{p11}}
{{p12}}
{{p13}}
{{p14}}
{{p15}}
{{p16}}
{{p17}}

{{p18}}

{{p19}}

◘◘![ico-20 file] showPicture◘◘

~~~js
function showPicture () {
  const img = new Image()
  let num = Math.round(Math.random() * 900)
  img.onload = function () {
    document.body.appendChild(img)
    img.width = 100
  }
  img.onerror = function () {
    num++
    img.src = `https://picsum.photos/id/${num}/400/300`
  }
  
  img.src = `https://picsum.photos/id/${num}/400/300`
}
~~~

{{p20}}

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

{{p21}}

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

{{p22}}

{{{throttling-and-debouncing-1.js}}}

_____________________________________________________________

## ![ico-25 icon] Debouncing

{{p23}}
{{p24}}

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

{{p25}}

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

{{p26}}

~~~js
const inputHandlerDebounced = debounce(inputHandler, 1000)
~~~

{{p27}}
{{p28}}

{{p29}}

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

{{p30}}
{{p31}}

{{p32}}

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
