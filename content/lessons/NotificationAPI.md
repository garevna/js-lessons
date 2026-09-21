# ![ico-30 study] Notification API

{{p1}}

{{p2}}

{{p3}}

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
  ► [[Prototype]]: ƒ EventTarget()
~~~

___________________________________________

## ![ico-25 icon] permission

{{p4}}
{{p5}}
{{p6}}

{{p7}}

{{p8}}
{{p9}}
{{p10}}

{{p11}}
{{p12}}
{{p13}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
Notification.requestPermission(permission => alert(`Вы ${permission ? 'разрешили' : 'запретили'} показывать уведомления приложению ${location.host}`))
~~~

[:::Live Demo:::](https://garevna.github.io/js-samples/#44)

{{p14}}

^^^[{{p15}}]

{{p16}}

~~~js
Notification.requestPermission()
  .then(permission => ...)
~~~

{{p17}}

^^^
____________________________

## ![ico-25 icon] {{p18}}

{{p19}}

~~~js
const notes = new Notification(title, options)
~~~

{{p20}}

**Notification.prototype**

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
  ► [[Prototype]]: ƒ EventTarget()
~~~~

{{p21}}

{{p22}}
{{p23}}
{{p24}}

{{p25}}

{{p26}}

{{p27}}
{{p28}}
{{p29}}
![ico-20 green-ok] badge (read-only)
{{p30}}
{{p31}}
{{p32}}
{{p33}}
{{p34}}
{{p35}}
{{p36}}
{{p37}}
{{p38}}
{{p39}}
{{p40}}


◘◘![ico-20 cap] ** 2**◘◘

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

[:::Live Demo:::](https://garevna.github.io/js-samples/#45)
______________________________________________________________

## ![ico-25 icon] Notification from Worker

{{p41}}

◘◘![ico-20 cap] ** 3**◘◘

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

◘◘![ico-20 cap] worker.js◘◘

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

[:::Live Demo:::](https://garevna.github.io/js-samples/#46)
