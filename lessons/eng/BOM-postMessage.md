# ![ico-30 study] Browser Object Model⟪Browser_Object_Model⟫

## ![ico-25 icon] window.postMessage()⟪window.postMessage⟫

^^![ico-20 warn] To understand this section, you need to familiarise yourself with the browser’s event model^^
___________________________________________________

^^All properties of the ~window~ object that begin with **~on~** allow you to bind functions to window events^^

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

^^The name of the event type follows **~on~** in the property name^^

#### ![ico-20 icon]  onmessage⟪onmessage⟫

^^The **~message~** event occurs when a window receives a message from another open browser window^^
^^If you 'attach' a function (callback) to the **~onmessage~** property, that function will be called when the **~message~** event occurs^^

~~~js
window.onmessage = function (event) {
  console.log(event)
}
window.postMessage('Hello!')
~~~

^^The current window sends a message to itself: '_Hello!_'^^
^^The event handler will now be called, and we will see something like the following in the console:^^

~~~console

▼ MessageEvent {isTrusted: true, data: "Hello, I'm listening to you", origin: "null", lastEventId: "", source: Window, …}
    isTrusted: true
    bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
  ► currentTarget: null
    data: "Hello!"
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
    lastEventId: ""
    origin: "null"
  ► path: [Window]
  ► ports: []
    returnValue: true
  ► source: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
  ► srcElement: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
  ► target: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
    timeStamp: 5.620000010821968
    type: "message"
    userActivation: null
  ► [[Prototype]]: MessageEvent
~~~

^^As we can see, the event object passed to the handler contains a lot of useful information^^
^^In particular, we can find out which window the message came from (the **_~source~_** property of the **~event~** object)^^
^^We can retrieve the message text from the **_~data~_** property of the **~event~** object^^
^^The **_~target~_** property of the **~event~** object will contain a reference to the window (tab) that received the message^^

^^It’s time to find out how to send a message from one open browser tab to another^^
_____________________________________

**~postMessage()~** – a method that allows you to send a message from one open browser window to another

![ico-25 cap] **Example**

^^Open a blank tab (type **~about:blank~** into the browser’s address bar)^^
^^Let’s set the value '_parentWin_' for the **~name~** property of the active window (tab)^^
^^To do this, run the following code in the console of the active window (tab):^^

~~~js
window.name = "parentWin"
~~~

^^Now let’s set up the event handler **~message~** for the active tab (we’ll bind an anonymous function to the **~onmessage~** property of the ~window~ object):^^

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

^^![ico-20 warn] The event handler must always receive the event object^^
^^(to do this, you need to set the handler’s formal parameter)^^
^^In our example, the formal parameter has the identifier **~event~**, and inside the anonymous handler function, this variable will contain a reference to the event object that triggered the call to this function^^

^^Now let’s open a new (child) window (tab):^^

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

^^As you can see, we have stored a reference to the newly opened tab in the variable **~childWin~**^^
^^Let’s set up the event handler **~onmessage~** for the new tab:^^

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

^^When it receives a message, the tab will display it on the page, specifying its own name (~this.name~) and the name of the window that sent the message (~event.source.name~)^^
^^In addition, the tab will send a reply message with the text “_Welcome any time, my dear!_”^^

^^All that remains is for us to send a message to the new tab we have opened:^^

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

**Full example code**

~~~js
window.name = 'parentWin'

window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}

let childWin = window.open('about:blank', 'childWin')

childWin.onmessage = function (event) {
  event.target.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}

childWin.postMessage('Hello, I\'m listening to you', '*')
~~~
________________________________________________