const section = document.body

const throttle = function (func, interval) {
  func.lastCall = null
    
  const testInterval = function () {
    let int = new Date().getTime() - this.lastCall
    this.lastCall = !int ? new Date().getTime() : int >= interval ? new Date().getTime() : this.lastCall
        return int ? int >= interval : true
  }.bind(func)
    
  return function (args) {
    const test = testInterval()
    test && this(args)
  }.bind(func)
    
}

function showPicture () {
  const img = new Image()
  let num = Math.round(Math.random() * 900)

  // На страницу картинка попадает загруженной. Раньше её добавляли сразу, и
  // до ответа сервера на месте снимка висел битый квадрат.
  img.onload = function () {
    section.appendChild(img)
    img.width = 100
  }

  // Не всякий id у picsum существует. Берём следующий, вместо того чтобы
  // оставить дыру.
  img.onerror = function () {
    num++
    img.src = `https://picsum.photos/id/${num}/400/300`
  }

  img.src = `https://picsum.photos/id/${num}/400/300`
}

const showPictureThrottle = throttle(showPicture, 1000)

const btn = section.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle