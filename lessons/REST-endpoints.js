const section = document.body

section.style.padding = '0'
section.style.overflow = 'hidden'

const img = section.appendChild(new Image())

const showImage = function () {
  if (section.stop) return
  
  const w = section.offsetWidth, 
    h = section.offsetHeight,
    num = Math.round(Math.random() * 900)
    
    arguments[0].src = `https://picsum.photos/id/${num}/${w}/${h}`
    
    setTimeout(() => requestAnimationFrame(showImage), 1000)
}.bind(null, img)

showImage()