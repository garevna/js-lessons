let section = document.body

const circle = section.appendChild(document.createElement('div'))
circle.style = `
  position: absolute;
  top: 64px;
  left: 64px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #09b;
  transition: all .5s;
`

const { width, height } = section.getBoundingClientRect()

circle.addEventListener('click', function (event) {
  event.target
    .style
    .background = Math.random() < 0.5 ? '#09b' : '#fa0'
})

circle.addEventListener('click', function (event) {
  event.target.style.top = Math.max(Math.round(Math.random() * height) - 100, 0) + 'px'
  event.target.style.left = Math.max(Math.round(Math.random() * width) - 100, 0) + 'px'
})
