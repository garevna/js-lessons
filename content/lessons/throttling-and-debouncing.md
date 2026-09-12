# ![ico-30 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

_____________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

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

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

{{s2.p16}}

~~~js
function showPicture () {
  const img = document.body.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}
~~~

{{s2.p17}}

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

{{s2.p18}}

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

{{s2.p19}}

{{{throttling-and-debouncing-1.js}}}

_____________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

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

{{s3.p4}}

{{s3.p5}}

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

{{s3.p6}}

~~~js
const inputHandlerDebounced = debounce(inputHandler, 1000)
~~~

{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

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

{{s3.p10}}
{{s3.p11}}

{{s3.p12}}

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
