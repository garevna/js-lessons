# ![ico-30 icon] Throttling and Debouncing⟪Throttling_and_Debouncing⟫

Certain resource-intensive functions,
functions that take long enough to execute that frequent calls to them would affect the application’s performance,
as well as functions that jerk the server (i.e. send AJAX requests)
should not be called too frequently

[%%%lodash%%%](https://lodash.com/)

To limit the number of calls to such a function, you can use the **throttling** technique

_____________________________________________________________

## ![ico-25 icon] Throttling⟪Throttling⟫

The aim is to limit the number of function calls
by setting a time interval,
which must elapse since the previous call

^^Let’s write a decorator function:^^

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

Here, the ‘Decorator’ pattern and the ‘closing’ technique are used,
which allow us to obtain a new instance based on the original function **func** \
(the first formal parameter),
which stores the time of the last call in its own property **lastCall**
and updates its value only when the specified interval **interval**
(the second formal parameter) has elapsed.
The function is executed only if
at least **interval** ms have passed since the previous ‘trigger’ of the callback.

Note that we are not using the ‘heavy artillery’ of timers here.

Now let’s create the actual function that we’re going to decorate:

◘◘![ico-20 file] showPicture◘◘

~~~js
function showPicture () {
  const img = document.body.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}
~~~

Let’s create a new instance of the **showPictureThrottle** function using the **_throttle_** decorator.

~~~js
const showPictureThrottle = throttle(showPicture, 1000)
~~~

Let’s create a button which, when clicked, will call the **showPictureThrottle** function:

~~~js
const btn = nav.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle
~~~

You can now click the button – the image will be displayed no more than once per second ![ico-20 smile].

{{{throttling-and-debouncing-1.js}}}

_____________________________________________________________

## ![ico-25 icon] Debouncing⟪Debouncing⟫

There will be a slight difference here from the previous version of the decorator function
The **debounce** function also checks the time interval that has elapsed since the last call

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

If double quotes appear within a string, the string itself must be enclosed in single quotes, and vice versa

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

Now let’s create an instance of the callback, decorated using the **debounce** function:

~~~js
const inputHandlerDebounced = debounce(inputHandler, 1000)
~~~

This instance will only send a request to the server if 1 second has elapsed since the user’s last input
If you type very quickly, the request will not be sent

Let’s add some styling:

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

Now let’s declare a function that creates and inserts an `input` element onto the page,
and call it:

◘◘![ico-20 cap] Run◘◘

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
