# ![ico-30 study] Browser Object Model

## ![ico-25 icon] window.postMessage()

{{s0.p1}}
___________________________________________________

{{s0.p2}}

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

{{s0.p3}}

#### ![ico-20 icon]  onmessage

{{s0.p4}}
{{s0.p5}}

~~~js
window.onmessage = function (event) {
  console.log(event)
}
~~~

{{s0.p6}}
{{s0.p7}}

~~~console

▼ MessageEvent {isTrusted: true, data: "Hello, I'm listening to you", origin: "null", lastEventId: "", source: Window, …}
    bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
  ► currentTarget: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
    data: "Hello, I'm listening to you"
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
  ► __proto__: MessageEvent
~~~

{{s0.p8}}
{{s0.p9}}
{{s0.p10}}
{{s0.p11}}

{{s0.p12}}
_____________________________________

{{s0.p13}}

![ico-25 cap] **{{common.c0}}**

{{s0.p15}}
{{s0.p16}}
{{s0.p17}}

~~~js
window.name = "parentWin"
~~~

{{s0.p18}}

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

{{s0.p19}}
{{s0.p20}}
{{s0.p21}}

{{s0.p22}}

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

{{s0.p23}}
{{s0.p24}}

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

{{s0.p25}}
{{s0.p26}}

{{s0.p27}}

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

{{s0.p28}}

~~~js
window.name = 'parentWin'

window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}

let childWin = window.open('about:blank', 'childWin')

childWin.onmessage = function (event) {
  event.target.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!'', '*')
}

childWin.postMessage('Hello, I\'m listening to you', '*')
~~~
________________________________________________