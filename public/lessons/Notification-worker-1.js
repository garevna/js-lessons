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
    postMessage({
      messageType: 'text',
      text: 'I\'m worker. Notification has been closed'
    })
  }
}
