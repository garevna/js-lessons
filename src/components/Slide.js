const { createElem } = require('../helpers').default

export const Slide = function (imageURL, container) {
  console.log(imageURL)
  const elem = Object.assign(createElem('div', container), {
    style: `background-image: url(${imageURL});`
  })

  Object.assign(this, {
    imageURL,
    init: x => Object.assign(elem.style, { left: x + '%' }),
    setPicture (imageURL) {
      Object.assign(this, { imageURL })
      Object.assign(elem.style, { backgroundImage: `url(${imageURL})` })
    },
    mcFromTo: (from, to, finalOpacity) => {
      Object.assign(elem.style, {
        transition: 'none',
        left: from + '%',
        opacity: 1 - finalOpacity
      })
      setTimeout(() => Object.assign(elem.style, {
        transition: 'all 0.8s',
        left: to + '%',
        opacity: finalOpacity
      }), 50)
    }
  })
}
