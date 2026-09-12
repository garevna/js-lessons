# ![ico-30 study] {{s1.h1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
___________________________________________________

{{s2.p2}}

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

{{s2.p3}}

#### ![ico-20 icon]  {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

~~~js
window.onmessage = function (event) {
  console.log(event)
}
~~~

{{s3.p3}}
{{s3.p4}}

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

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}
{{s3.p8}}

{{s3.p9}}
_____________________________________

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}
{{s3.p13}}
{{s3.p14}}

~~~js
window.name = "parentWin"
~~~

{{s3.p15}}

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}

{{s3.p19}}

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

{{s3.p20}}
{{s3.p21}}

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

{{s3.p22}}
{{s3.p23}}

{{s3.p24}}

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

{{s3.p25}}

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