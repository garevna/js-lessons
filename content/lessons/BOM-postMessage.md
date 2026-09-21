# ![ico-30 study] Browser Object Model

## ![ico-25 icon] window.postMessage()

{{p1}}
___________________________________________________

{{p2}}

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

{{p3}}

#### ![ico-20 icon]  onmessage

{{p4}}
{{p5}}

~~~js
window.onmessage = function (event) {
  console.log(event)
}
window.postMessage('Hello!')
~~~

{{p6}}
{{p7}}

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

{{p8}}
{{p9}}
{{p10}}
{{p11}}

{{p12}}
_____________________________________

{{p13}}

![ico-25 cap] **{{common.c0}}**

{{p14}}
{{p15}}
{{p16}}

~~~js
window.name = "parentWin"
~~~

{{p17}}

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

{{p18}}
{{p19}}
{{p20}}

{{p21}}

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

{{p22}}
{{p23}}

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

{{p24}}
{{p25}}

{{p26}}

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

{{p27}}

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