// Именованное классовое выражение.
//
// Снаружи класс известен как Picture, внутри — как Sketch, и внутреннее имя
// здесь работает: статический of() создаёт экземпляр именно по нему.

const Picture = class Sketch {
  constructor (area) {
    this.area = area
    this.lines = []
  }

  addLine (from, to) {
    this.lines.push({ from, to })

    this.area.beginPath()
    this.area.moveTo(from.x, from.y)
    this.area.lineTo(to.x, to.y)
    this.area.stroke()

    return this
  }

  static of (area, ...lines) {
    return lines.reduce((sketch, line) => sketch.addLine(...line), new Sketch(area))
  }
}

// Одна канва на демо, а не по канве на каждый запуск: демо запускают
// кнопкой, и сколько раз нажали — столько элементов осталось бы в документе.
// И никакого window.onresize: он держал бы экземпляр столько, сколько живёт
// страница, а размер здесь и так постоянный.
const canvas = document.querySelector('#sketch-demo') || Object.assign(
  document.body.appendChild(document.createElement('canvas')),
  {
    id: 'sketch-demo',
    width: 320,
    height: 280,
    style: 'border: 1px solid #aaa; background: #fff'
  }
)

const area = canvas.getContext('2d')
area.clearRect(0, 0, canvas.width, canvas.height)

const picture = Picture.of(
  area,
  [{ x: 50, y: 30 }, { x: 250, y: 200 }],
  [{ x: 250, y: 200 }, { x: 50, y: 200 }],
  [{ x: 50, y: 200 }, { x: 50, y: 30 }]
)

console.log(Picture.name, picture.lines)
