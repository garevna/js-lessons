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
  const img = section.appendChild(new Image())
  const num = Math.round(Math.random() * 900)
  img.src = `https://picsum.photos/id/${num}/400/300`
  img.width = 100
}

const showPictureThrottle = throttle(showPicture, 1000)

const btn = section.appendChild(document.createElement('button'))

btn.innerText = 'Add picture once per 1 sec'
btn.onclick = showPictureThrottle