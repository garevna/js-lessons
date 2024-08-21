const section = document.body

function addElem (tagName, container = section) {
  return container
    .appendChild(document.createElement(tagName))
}

function createAnimated (title, container) {
  return Object.assign(addElem('div', container), {
    title,
    style: `
      position: absolute;
      width: ${container.size}px;
      height: ${container.size}px;
      background: ${container.randomColor()};
      top: ${container.randomY()}px;
      left: ${container.randomX()}px;
    `,
    targetY: null,
    targetX: null,
    setTarget () {
      Object.assign(this, {
        targetY: container.randomY(),
        targetX: container.randomX()
      })
    },
    resetTarget () {
      Object.assign(this, { targetX: null, targetY: null })
    },

    setDistance () {
      Object.assign(this, {
        distanceX: this.targetX - parseInt(this.style.left),
        distanceY: this.targetY - parseInt(this.style.top)
      })
    },

    movieClip () {
      if (container.stop) return

      if (!this.targetY && !this.targetX) this.setTarget()
      else {
        this.setDistance()
        if (!this.distanceY && !this.distanceX) this.resetTarget()
        else {
          Object.assign(this.style, {
            top: parseInt(this.style.top) + Math.sign(this.distanceY) + 'px',
            left: parseInt(this.style.left) + Math.sign(this.distanceX) + 'px'
          })
        }
      }

      requestAnimationFrame(this.movieClip.bind(this))
    }
  })
}

const demo = Object.assign(addElem('section'), {
  size: 40,
  stop: true,
  style: `
    position: absolute;
    width: 95%;
    height: 300px;
    background-color: #000;
  `,
  random: (maxVal, minVal = 0) => Math.max(minVal, Math.round(Math.random() * maxVal)),
  randomX () {
    return this.random(this.offsetWidth - this.size)
  },
  randomY () {
    return this.random(this.offsetHeight - this.size)
  },
  randomColor () {
    return `rgb(${this.random(255, 100)}, ${this.random(255, 100)}, ${this.random(255, 100)})`
  }
})

Object.assign(demo, {
  elems: [1, 2, 3, 4].map(num => createAnimated(num, demo)),

  onclick: function (event) {
    this.stop = !this.stop
    !this.stop &&
      this.elems.forEach(elem => requestAnimationFrame(elem.movieClip.bind(elem)))
  }.bind(demo)
})

demo.dispatchEvent(new Event('click'))
