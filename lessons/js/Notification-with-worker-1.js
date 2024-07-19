const section = document.body

Notification.requestPermission(permission => {
  if (permission) {
    const messageWorker = new Worker('/src/lessons/Notification-worker-1.js')

    messageWorker.postMessage({
      icon: 'https://garevna.github.io/js-course/images/github.png',
      image: 'https://garevna.github.io/js-course/images/my-photo.png',
      message: 'Hello, students! Do you like JS ?',
      title: 'garevna'
    })

    const addElem = tag => section.appendChild(document.createElement(tag))

    const addImage = url => Object.assign(addElem('img'), { src: url })

    messageWorker.onmessage = function (event) {
      if (event.data.messageType === 'images') {
        Object.assign(addImage(event.data.image), {
          height: 100
        })
        addImage(event.data.icon).width = 30
      } else addElem('p').innerText = event.data.text

      messageWorker.terminate()
    }
  }
})
                               
                               



