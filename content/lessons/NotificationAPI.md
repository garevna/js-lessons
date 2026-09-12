# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

~~~console
▼ ƒ Notification()
    maxActions: (...)
    permission: (...)
  ► requestPermission: ƒ ()
    arguments: null
    caller: null
    length: 1
    name: "Notification"
  ► prototype: Notification {…}
  ► get maxActions: ƒ maxActions()
  ► get permission: ƒ permission()
  ► __proto__: ƒ EventTarget()
~~~

___________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}
{{s2.p6}}
{{s2.p7}}

{{s2.p8}}
{{s2.p9}}
{{s2.p10}}

{{s2.p11}}

~~~js
Notification.requestPermission(permission => alert(`Вы ${permission ? 'разрешили' : 'запретили'} показывать уведомления приложению ${location.host}`))
~~~

{{s2.p12}}

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

~~~js
Notification.requestPermission()
  .then(permission => ...)
~~~

{{s2.p16}}

{{s2.p17}}
____________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

~~~js
const notes = new Notification(title, options)
~~~

{{s3.p2}}

{{s3.p3}}

~~~~console
▼ Notification()
    actions: (...)
    badge: (...)
    body: (...)
  ► close: ƒ close()
    data: (...)
    dir: (...)
    icon: (...)
    image: (...)
    lang: (...)
    onclick: (...)
    onclose: (...)
    onerror: (...)
    onshow: (...)
    renotify: (...)
    requireInteraction: (...)
    silent: (...)
    tag: (...)
    timestamp: (...)
    title: (...)
    vibrate: (...)
  ► constructor: ƒ Notification()
    Symbol(Symbol.toStringTag): "Notification"
  ► get actions: ƒ actions()
  ► get badge: ƒ badge()
  ► get body: ƒ body()
  ► get data: ƒ data()
  ► get dir: ƒ dir()
  ► get icon: ƒ icon()
  ► get image: ƒ image()
  ► get lang: ƒ lang()
  ► get onclick: ƒ onclick()
  ► set onclick: ƒ onclick()
  ► get onclose: ƒ onclose()
  ► set onclose: ƒ onclose()
  ► get onerror: ƒ onerror()
  ► set onerror: ƒ onerror()
  ► get onshow: ƒ onshow()
  ► set onshow: ƒ onshow()
  ► get renotify: ƒ renotify()
  ► get requireInteraction: ƒ requireInteraction()
  ► get silent: ƒ silent()
  ► get tag: ƒ tag()
  ► get timestamp: ƒ timestamp()
  ► get title: ƒ title()
  ► get vibrate: ƒ vibrate()
  ► __proto__: ƒ EventTarget()
~~~~

{{s3.p4}}

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

{{s3.p8}}

{{s3.p9}}

{{s3.p10}}
{{s3.p11}}
{{s3.p12}}
{{s3.p13}}
{{s3.p14}}
{{s3.p15}}
{{s3.p16}}
{{s3.p17}}
{{s3.p18}}
{{s3.p19}}
{{s3.p20}}
{{s3.p21}}
{{s3.p22}}
{{s3.p23}}
{{s3.p24}}


{{s3.p25}}

~~~js
Notification
  .requestPermission(permission => showNotification({
    icon: 'https://garevna.github.io/js-course/images/my-photo.png',
    image: 'https://cn.opendesktop.org/img/b/2/d/5/cfd19f550736133723633e53ba0b05def2e4.jpg',
    message: 'Hello, students! Welcome to JS!',
    title: 'garevna'
}) )

function showNotification (data) {
  new Notification(data.title, {
    icon: data.icon,
    image: data.image,
    body: data.message,
    requireInteraction: true,
    silent: true
  })
}
~~~

{{s3.p26}}
______________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
const messageWorker = new Worker('./js/notification-worker.js')

messageWorker
  .postMessage({
    icon: 'https://garevna.github.io/js-course/ico/bash-20.png',
    image: 'https://garevna.github.io/js-course/images/lessons/smoke-monkey.gif',
    message: 'Hello, students! Do you like JS ?',
    title: 'garevna'
})

const addElem = tag => document.body
  .appendChild(document.createElement(tag))

const addImage = url => addElem('img').src = url

messageWorker.onmessage = function (event) {
  if (event.data.messageType === 'images') {
    addImage(event.data.image)
    addImage(event.data.icon)
  } else addElem('p').innerText = event.data.text

  messageWorker.terminate()
}
~~~

{{s4.p3}}

~~~js
onmessage = function (event) {
  showNotification(event.data)
}

function showNotification (data) {
  const notification = new Notification(data.title, {
    icon: data.icon,
    image: data.image,
    body: data.message,
    requireInteraction: true,
    silent: true
  })

  notification.onshow = function (event) {
    postMessage({
      messageType: 'images',
      image: notification.image,
      icon: notification.icon
    })
  }

  notification.onclose = function (event) {
    postMessage ({
      messageType: 'text',
      text: 'I\'m worker. Notification has been closed'
    })
  }
}
~~~

{{{Notification-with-worker-1.js}}}

{{s4.p4}}
