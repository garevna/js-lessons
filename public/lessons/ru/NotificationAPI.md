# ![ico-30 study] Notification API

API вывода уведомлений на рабочий стол юзера

![ico-20 warn] Notification API работает только с приложениями, работающими на протоколе **https**

Конструктор **Notification**

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

## ![ico-25 icon] permission

Юзер может запретить отображение уведомлений на рабочем столе
Прежде, чем пытаться вывести уведомление юзеру, стоит проверить, разрешает ли пользователь отображать уведомления
т.е. посмотреть значение свойства **permission** ^^(read-only)^^

**permission** может принимать значения:

![ico-20 green-ok] **denied**  - уведомления запрещены
![ico-20 green-ok] **granted** - уведомления разрешены
![ico-20 green-ok] **default** - значение не установлено, по умолчанию будет **denied**

Если уведомления от приложения отключены, можно запросить разрешение пользователя на показ уведомлений
Для этого Notification API предоставляет метод **requestPermission**
^^(см. Конструктор **Notification**)^^:

◘◘![ico-20 cap] ** 1**◘◘

~~~js
Notification.requestPermission(permission => alert(`Вы ${permission ? 'разрешили' : 'запретили'} показывать уведомления приложению ${location.host}`))
~~~

[:::Live Demo:::](https://garevna.github.io/js-samples/#44)

После того, как разрешение получено, свойству **permission** будет установлено значение **granted**

^^^[Промисифицированная версия]

^^![ico-20 warn] В последней спецификации предложена новая промисифицированная форма метода **requestPermission**^^

~~~js
Notification.requestPermission()
  .then(permission => ...)
~~~

^^однако на момент написания этого материала браузеры поддерживают старую (непромисифицированную) версию^^

^^^
____________________________

## ![ico-25 icon] Экземпляр Notification

С помошью конструктора **Notification** создаем новый экземпляр:

~~~js
const notes = new Notification(title, options)
~~~

который наследует кучу свойств и методов от своего конструктора

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
  ► __proto__: ƒ EventTarget()
~~~~

Разберемся с этой кучей

При создании экземпляра уведомления конструктору передается:
• заголовок уведомления
• объект опций

Заголовок уведомления будет храниться в свойстве **title** ^^(read-only)^^ экземпляра уведомления

Все переданные вторым аргументом опции станут значениями свойств экземпляра:

![ico-20 green-ok] body (read-only) - текст уведомления
![ico-20 question] icon (read-only) - ссылка на файл изображения, которое будет иконкой уведомления
^^корректно отображается только в Mozilla, не отображается в Chrome и Opera^^
![ico-20 green-ok] badge (read-only)
ссылка на маленькое монохромное изображение, отображаемое вместо уведомления на девайсах с маленьким экраном
^^![ico-20 warn] В настоящее время бейдж используется только в Chrome для Android^^
^^В других браузерах вы увидите иконку браузера^^
![ico-20 question] image (read-only) - ссылка на файл изображения, которое, по идее, дожно быть отражено в уведомлении
^^Если вам удастся добиться того, чтобы изображение отображалось в уведомлении, поделитесь опытом^^
^^Мне не удалось заставить ни один из браузеров отобразить картинку в уведомлении^^
![ico-20 green-ok] **requireInteraction** (read-only) - по дефолту ~false~
Обычно уведомление закрывается автоматически через некоторое время
Если вы хотите использовать кнопку "Закрыть" в уведомлении, то значение этой опции нужно установить ~true~
![ico-20 green-ok] silent (read-only) - беззвучный режим
по дефолту ~false~


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

![ico-20 warn] в **worker**-е недоступен метод **requestPermission** конструктора **Notification**

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
